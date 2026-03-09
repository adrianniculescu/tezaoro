
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { generateMockPairs, type ScreenerPair } from '@/data/screenerPairs';

export interface LivePair {
  id: string;
  token: string;
  tokenName: string;
  tokenAddress: string;
  quoteToken: string;
  chain: string;
  chainId: string;
  dexId: string;
  price: number;
  priceNative: number;
  change24h: number;
  change1h: number;
  change5m: number;
  volume24h: number;
  volume1h: number;
  liquidity: number;
  fdv: number;
  pairAge: number;
  txCount24h: number;
  buys24h: number;
  sells24h: number;
  url: string;
  imageUrl: string;
  // For sparkline compatibility
  emoji: string;
  sparkline5m: number[];
  sparkline1h: number[];
  sparkline6h: number[];
}

const mockPairs = generateMockPairs();

function generateSparklineFromChange(change: number): number[] {
  const points: number[] = [];
  let val = 50;
  for (let i = 0; i < 12; i++) {
    val += (change / 12) + (Math.random() - 0.5) * 5;
    points.push(Math.max(1, val));
  }
  return points;
}

const EMOJIS = ['🔥', '🚀', '💎', '⚡', '🌙', '🦊', '🐸', '🐕', '🎮', '🌊', '💫', '⭐', '🔮', '🎯', '🏆'];

function apiPairToLivePair(pair: any, index: number): LivePair {
  return {
    ...pair,
    emoji: pair.imageUrl ? '🪙' : EMOJIS[index % EMOJIS.length],
    sparkline5m: generateSparklineFromChange(pair.change5m || 0),
    sparkline1h: generateSparklineFromChange(pair.change1h || 0),
    sparkline6h: generateSparklineFromChange(pair.change24h || 0),
  };
}

// Convert mock pairs to LivePair format
function mockToLivePair(pair: ScreenerPair): LivePair {
  return {
    id: pair.id,
    token: pair.token,
    tokenName: pair.token,
    tokenAddress: '',
    quoteToken: pair.quoteToken,
    chain: pair.chain,
    chainId: pair.chain.toLowerCase(),
    dexId: 'mock',
    price: pair.price,
    priceNative: 0,
    change24h: pair.change24h,
    change1h: pair.change24h * 0.3,
    change5m: pair.change24h * 0.05,
    volume24h: pair.volume24h,
    volume1h: pair.volume24h / 24,
    liquidity: pair.liquidity,
    fdv: pair.fdv,
    pairAge: pair.pairAge,
    txCount24h: pair.txCount24h,
    buys24h: Math.floor(pair.txCount24h * 0.55),
    sells24h: Math.floor(pair.txCount24h * 0.45),
    url: '',
    imageUrl: '',
    emoji: pair.emoji,
    sparkline5m: pair.sparkline5m,
    sparkline1h: pair.sparkline1h,
    sparkline6h: pair.sparkline6h,
  };
}

export function useDexScreener() {
  const [pairs, setPairs] = useState<LivePair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPairs = useCallback(async (query = 'ETH') => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('dex-screener', {
        body: null,
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      });

      // supabase.functions.invoke doesn't support query params well, use fetch directly
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!projectId || !anonKey) {
        throw new Error('Missing Supabase config');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/dex-screener?action=search&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      
      const result = await response.json();
      
      if (result.pairs && result.pairs.length > 0) {
        const livePairs = result.pairs.map(apiPairToLivePair);
        setPairs(livePairs);
        setIsLive(true);
        setError(null);
      } else {
        throw new Error('No pairs returned');
      }
    } catch (err) {
      console.warn('Live API unavailable, using mock data:', err);
      setPairs(mockPairs.map(mockToLivePair));
      setIsLive(false);
      setError(null); // Don't show error, gracefully fallback
    } finally {
      setLoading(false);
      setLastUpdate(new Date());
    }
  }, []);

  const searchPairs = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      fetchPairs('ETH');
      return;
    }

    setLoading(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!projectId || !anonKey) throw new Error('Missing config');

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/dex-screener?action=search&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${anonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw new Error(`Search error: ${response.status}`);
      const result = await response.json();

      if (result.pairs && result.pairs.length > 0) {
        setPairs(result.pairs.map(apiPairToLivePair));
        setIsLive(true);
      } else {
        // Filter mock data as fallback
        const filtered = mockPairs
          .filter(p => p.token.toLowerCase().includes(query.toLowerCase()))
          .map(mockToLivePair);
        setPairs(filtered.length > 0 ? filtered : mockPairs.map(mockToLivePair));
        setIsLive(false);
      }
    } catch {
      const filtered = mockPairs
        .filter(p => p.token.toLowerCase().includes(query.toLowerCase()))
        .map(mockToLivePair);
      setPairs(filtered.length > 0 ? filtered : mockPairs.map(mockToLivePair));
      setIsLive(false);
    } finally {
      setLoading(false);
      setLastUpdate(new Date());
    }
  }, [fetchPairs]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    fetchPairs();
    intervalRef.current = setInterval(() => fetchPairs(), 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchPairs]);

  return { pairs, loading, error, isLive, lastUpdate, searchPairs, refresh: fetchPairs };
}

// Mock WebSocket price alerts
export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    token: string;
    message: string;
    type: 'pump' | 'dump' | 'volume' | 'new';
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    const tokens = ['PEPE', 'WIF', 'BONK', 'DOGE', 'SHIB', 'SOL', 'ETH', 'BTC', 'ONDO', 'JUP'];
    const types = ['pump', 'dump', 'volume', 'new'] as const;
    const messages = {
      pump: (t: string) => `🚀 ${t} pumping +${(5 + Math.random() * 50).toFixed(1)}% in 5min`,
      dump: (t: string) => `📉 ${t} dropping -${(3 + Math.random() * 30).toFixed(1)}% in 1h`,
      volume: (t: string) => `💰 ${t} volume spike $${(Math.random() * 10).toFixed(1)}M`,
      new: (t: string) => `🆕 New ${t}/WETH pair detected on Uniswap`,
    };

    const interval = setInterval(() => {
      const token = tokens[Math.floor(Math.random() * tokens.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      setAlerts(prev => [{
        id: `alert-${Date.now()}`,
        token,
        message: messages[type](token),
        type,
        timestamp: new Date(),
      }, ...prev].slice(0, 20));
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, []);

  return alerts;
}
