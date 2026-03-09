
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import ScreenerHeader from '@/components/screener/ScreenerHeader';
import PairRow from '@/components/screener/PairRow';
import SparklineChart from '@/components/screener/SparklineChart';
import { useDexScreener, usePriceAlerts, type LivePair } from '@/hooks/useDexScreener';
import type { Chain } from '@/data/screenerPairs';
import { Bell, Wifi, WifiOff, Loader2 } from 'lucide-react';

type TimeFrame = '5m' | '1h' | '6h';

const Screener = () => {
  const { pairs, loading, isLive, lastUpdate, searchPairs } = useDexScreener();
  const alerts = usePriceAlerts();

  const [chain, setChain] = useState<Chain | 'All'>('All');
  const [filter, setFilter] = useState('trending');
  const [timeframe, setTimeframe] = useState<TimeFrame>('1h');
  const [search, setSearch] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length >= 2) {
        searchPairs(search);
      } else if (search.length === 0) {
        searchPairs('');
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, searchPairs]);

  // Convert LivePairs to PairRow-compatible format
  const pairRowData = useMemo(() => {
    return pairs.map(p => ({
      id: p.id,
      token: p.token,
      quoteToken: p.quoteToken,
      chain: p.chain as Chain,
      price: p.price,
      change24h: p.change24h,
      volume24h: p.volume24h,
      liquidity: p.liquidity,
      fdv: p.fdv,
      sparkline5m: p.sparkline5m,
      sparkline1h: p.sparkline1h,
      sparkline6h: p.sparkline6h,
      pairAge: p.pairAge,
      txCount24h: p.txCount24h,
      emoji: p.emoji,
    }));
  }, [pairs]);

  const filtered = useMemo(() => {
    let data = [...pairRowData];

    if (chain !== 'All') data = data.filter(p => p.chain === chain);

    switch (filter) {
      case 'new': data.sort((a, b) => a.pairAge - b.pairAge); break;
      case 'gainers': data.sort((a, b) => b.change24h - a.change24h); break;
      case 'volume': data.sort((a, b) => b.volume24h - a.volume24h); break;
      case 'trending': data.sort((a, b) => b.txCount24h - a.txCount24h); break;
    }

    return data;
  }, [pairRowData, chain, filter]);

  return (
    <PageLayout title="DEX Screener">
      <Helmet>
        <meta name="description" content="Real-time DEX pair screener. Track new pairs, gainers, volume and trending tokens across Ethereum, Solana, Base and PulseChain." />
      </Helmet>

      <div className="dex-gradient-bg min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-6">
          <ScreenerHeader
            activeChain={chain}
            onChainChange={setChain}
            activeFilter={filter}
            onFilterChange={setFilter}
            pairCount={filtered.length}
          />

          {/* Status bar + Search + Timeframe */}
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search token (e.g. ETH, PEPE, SOL)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-muted/30 border border-border/50 rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 w-64"
            />
            <div className="flex gap-1 bg-muted/20 rounded-lg p-1">
              {(['5m', '1h', '6h'] as TimeFrame[]).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    timeframe === tf
                      ? 'bg-accent/20 text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Live status */}
            <div className="flex items-center gap-2 ml-auto text-xs">
              {isLive ? (
                <span className="flex items-center gap-1.5 text-green-400">
                  <Wifi className="w-3.5 h-3.5" />
                  Live API
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <WifiOff className="w-3.5 h-3.5" />
                  Mock Data
                </span>
              )}
              <span className="text-muted-foreground">
                {lastUpdate.toLocaleTimeString()}
              </span>

              {/* Alerts toggle */}
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className={`relative p-1.5 rounded-lg transition-all ${
                  showAlerts ? 'bg-accent/20 text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Bell className="w-4 h-4" />
                {alerts.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Alerts panel */}
          {showAlerts && (
            <div className="dex-card p-4 max-h-48 overflow-y-auto space-y-2">
              <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-accent" />
                Live Alerts (Mock WebSocket)
              </h3>
              {alerts.length === 0 ? (
                <p className="text-xs text-muted-foreground">Waiting for alerts...</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-foreground">{alert.message}</span>
                    <span className="text-muted-foreground text-[10px] whitespace-nowrap ml-3">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Loading state */}
          {loading && pairs.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="ml-3 text-muted-foreground">Loading pairs...</span>
            </div>
          )}

          {/* Table */}
          {(!loading || pairs.length > 0) && (
            <div className="dex-card overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-[40px_minmax(140px,1.2fr)_80px_100px_90px_130px_100px_100px_100px_80px] items-center gap-2 px-4 py-3 border-b border-border text-xs text-muted-foreground font-medium bg-muted/10">
                <span>#</span>
                <span>Pair</span>
                <span>Price</span>
                <span>24h %</span>
                <span>Age</span>
                <span className="text-center">Chart</span>
                <span>Volume</span>
                <span>Liquidity</span>
                <span>FDV</span>
                <span></span>
              </div>

              {/* Desktop rows */}
              <div className="hidden md:block max-h-[70vh] overflow-y-auto">
                {filtered.map((pair, i) => (
                  <PairRow key={pair.id} pair={pair} rank={i + 1} timeframe={timeframe} />
                ))}
              </div>

              {/* Mobile view */}
              <div className="md:hidden divide-y divide-border/50">
                {filtered.map((pair, i) => (
                  <MobilePairCard key={pair.id} pair={pair} rank={i + 1} timeframe={timeframe} />
                ))}
              </div>

              {filtered.length === 0 && !loading && (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  No pairs found. Try a different search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

// Mobile card component
const MobilePairCard: React.FC<{ pair: any; rank: number; timeframe: TimeFrame }> = ({ pair, rank, timeframe }) => {
  const isPositive = pair.change24h >= 0;
  const sparkline = timeframe === '5m' ? pair.sparkline5m : timeframe === '1h' ? pair.sparkline1h : pair.sparkline6h;

  const formatCompact = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toFixed(0)}`;
  };

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">#{rank}</span>
          <span className="text-lg">{pair.emoji}</span>
          <div>
            <span className="font-semibold text-foreground">{pair.token}</span>
            <span className="text-muted-foreground text-xs">/{pair.quoteToken}</span>
          </div>
        </div>
        <span className={`font-mono font-semibold text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{pair.change24h.toFixed(1)}%
        </span>
      </div>
      <div className="flex justify-center">
        <SparklineChart data={sparkline} positive={isPositive} width={200} height={40} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div><span className="text-muted-foreground">Vol</span> <span className="text-foreground">{formatCompact(pair.volume24h)}</span></div>
        <div><span className="text-muted-foreground">Liq</span> <span className="text-foreground">{formatCompact(pair.liquidity)}</span></div>
        <div><span className="text-muted-foreground">FDV</span> <span className="text-foreground">{formatCompact(pair.fdv)}</span></div>
      </div>
    </div>
  );
};

export default Screener;
