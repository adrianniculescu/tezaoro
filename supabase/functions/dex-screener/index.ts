import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const DEX_API = 'https://api.dexscreener.com';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'top';
    const query = url.searchParams.get('q') || '';
    const chain = url.searchParams.get('chain') || '';

    let apiUrl: string;

    switch (action) {
      case 'search':
        apiUrl = `${DEX_API}/latest/dex/search?q=${encodeURIComponent(query)}`;
        break;
      case 'tokens':
        // Get token profiles
        apiUrl = `${DEX_API}/latest/dex/tokens/${encodeURIComponent(query)}`;
        break;
      case 'pairs':
        // Get pairs by chain
        if (chain && query) {
          apiUrl = `${DEX_API}/latest/dex/pairs/${encodeURIComponent(chain)}/${encodeURIComponent(query)}`;
        } else {
          apiUrl = `${DEX_API}/latest/dex/search?q=${encodeURIComponent(query || 'USDC')}`;
        }
        break;
      case 'top':
      default:
        // Search for popular tokens to get top pairs
        apiUrl = `${DEX_API}/latest/dex/search?q=${encodeURIComponent(query || 'ETH')}`;
        break;
    }

    console.log(`DexScreener proxy: ${action} -> ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Tezaoro/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`DexScreener API error [${response.status}]: ${await response.text()}`);
    }

    const data = await response.json();

    // Normalize the response
    const pairs = data.pairs || [];
    
    const normalized = pairs.slice(0, 50).map((pair: any) => ({
      id: pair.pairAddress || pair.url,
      token: pair.baseToken?.symbol || 'UNKNOWN',
      tokenName: pair.baseToken?.name || '',
      tokenAddress: pair.baseToken?.address || '',
      quoteToken: pair.quoteToken?.symbol || 'UNKNOWN',
      chain: mapChainId(pair.chainId),
      chainId: pair.chainId,
      dexId: pair.dexId,
      price: parseFloat(pair.priceUsd || '0'),
      priceNative: parseFloat(pair.priceNative || '0'),
      change24h: pair.priceChange?.h24 || 0,
      change1h: pair.priceChange?.h1 || 0,
      change5m: pair.priceChange?.m5 || 0,
      volume24h: pair.volume?.h24 || 0,
      volume1h: pair.volume?.h1 || 0,
      liquidity: pair.liquidity?.usd || 0,
      fdv: pair.fdv || 0,
      pairAge: pair.pairCreatedAt ? Math.floor((Date.now() - pair.pairCreatedAt) / 3600000) : 0,
      txCount24h: (pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0),
      buys24h: pair.txns?.h24?.buys || 0,
      sells24h: pair.txns?.h24?.sells || 0,
      url: pair.url || '',
      imageUrl: pair.info?.imageUrl || '',
    }));

    return new Response(JSON.stringify({ pairs: normalized, total: pairs.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('DexScreener proxy error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg, pairs: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function mapChainId(chainId: string): string {
  const map: Record<string, string> = {
    ethereum: 'ETH',
    solana: 'Solana',
    base: 'Base',
    pulsechain: 'Pulse',
    bsc: 'BSC',
    arbitrum: 'Arbitrum',
    polygon: 'Polygon',
    avalanche: 'Avalanche',
    optimism: 'Optimism',
  };
  return map[chainId] || chainId;
}
