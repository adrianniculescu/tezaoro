
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import ScreenerHeader from '@/components/screener/ScreenerHeader';
import PairRow from '@/components/screener/PairRow';
import { generateMockPairs, type Chain } from '@/data/screenerPairs';

const allPairs = generateMockPairs();

type TimeFrame = '5m' | '1h' | '6h';

const Screener = () => {
  const [chain, setChain] = useState<Chain | 'All'>('All');
  const [filter, setFilter] = useState('trending');
  const [timeframe, setTimeframe] = useState<TimeFrame>('1h');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let pairs = [...allPairs];

    if (chain !== 'All') pairs = pairs.filter(p => p.chain === chain);
    if (search) pairs = pairs.filter(p => p.token.toLowerCase().includes(search.toLowerCase()));

    switch (filter) {
      case 'new': pairs.sort((a, b) => a.pairAge - b.pairAge); break;
      case 'gainers': pairs.sort((a, b) => b.change24h - a.change24h); break;
      case 'volume': pairs.sort((a, b) => b.volume24h - a.volume24h); break;
      case 'trending': pairs.sort((a, b) => b.txCount24h - a.txCount24h); break;
    }

    return pairs;
  }, [chain, filter, search]);

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

          {/* Search + Timeframe */}
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Search token..."
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
          </div>

          {/* Table */}
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

            {/* Mobile cards / Desktop rows */}
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
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Mobile card component
const MobilePairCard: React.FC<{ pair: ReturnType<typeof generateMockPairs>[0]; rank: number; timeframe: TimeFrame }> = ({ pair, rank, timeframe }) => {
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
        <SparklineChartInline data={sparkline} positive={isPositive} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div><span className="text-muted-foreground">Vol</span> <span className="text-foreground">{formatCompact(pair.volume24h)}</span></div>
        <div><span className="text-muted-foreground">Liq</span> <span className="text-foreground">{formatCompact(pair.liquidity)}</span></div>
        <div><span className="text-muted-foreground">FDV</span> <span className="text-foreground">{formatCompact(pair.fdv)}</span></div>
      </div>
    </div>
  );
};

// Inline sparkline for mobile
import SparklineChart from '@/components/screener/SparklineChart';
const SparklineChartInline: React.FC<{ data: number[]; positive: boolean }> = ({ data, positive }) => (
  <SparklineChart data={data} positive={positive} width={200} height={40} />
);

export default Screener;
