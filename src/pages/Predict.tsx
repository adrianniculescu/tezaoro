
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import MarketCard from '@/components/predict/MarketCard';
import TradeModal from '@/components/predict/TradeModal';
import PortfolioPanel from '@/components/predict/PortfolioPanel';
import { mockMarkets, categories, type PredictionMarket, type UserPosition, type TxRecord } from '@/data/predictionMarkets';
import { Activity, Search, Filter } from 'lucide-react';

type FilterType = 'all' | 'trending' | 'new' | 'resolved';

const Predict = () => {
  const [category, setCategory] = useState('all');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<PredictionMarket | null>(null);
  const [walletBalance, setWalletBalance] = useState(500);
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [transactions, setTransactions] = useState<TxRecord[]>([]);

  const filtered = useMemo(() => {
    let markets = [...mockMarkets];
    if (category !== 'all') markets = markets.filter(m => m.category === category);
    if (search) markets = markets.filter(m => m.question.toLowerCase().includes(search.toLowerCase()));

    switch (filterType) {
      case 'trending': markets = markets.filter(m => m.trending); break;
      case 'new': markets = markets.filter(m => !m.resolved).sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()); break;
      case 'resolved': markets = markets.filter(m => m.resolved); break;
    }

    return markets;
  }, [category, filterType, search]);

  const handleTrade = (tx: TxRecord, position: UserPosition) => {
    setWalletBalance(prev => prev - tx.amount);
    setTransactions(prev => [...prev, tx]);
    setPositions(prev => {
      const existing = prev.findIndex(p => p.marketId === position.marketId && p.side === position.side);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = position;
        return updated;
      }
      return [...prev, position];
    });
    setSelectedMarket(null);
  };

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: '🌐 All' },
    { id: 'trending', label: '🔥 Trending' },
    { id: 'new', label: '🆕 Ending Soon' },
    { id: 'resolved', label: '✅ Resolved' },
  ];

  const totalVolume = mockMarkets.reduce((sum, m) => sum + m.volume, 0);

  return (
    <PageLayout title="Prediction Markets">
      <Helmet>
        <meta name="description" content="Tezaoro Prediction Markets — bet on crypto, tech, and music outcomes. Buy Yes/No shares in Polymarket-style markets with mock wallet." />
      </Helmet>

      <div className="dex-gradient-bg min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-400" />
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="dex-text-glow">Prediction Markets</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{mockMarkets.length} markets</span>
              <span>•</span>
              <span>${(totalVolume / 1_000_000).toFixed(1)}M total volume</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.id
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filters + Search */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search markets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-muted/30 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/50"
              />
            </div>
            <div className="flex gap-2">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    filterType === f.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'bg-muted/20 text-muted-foreground hover:bg-muted/40 border border-transparent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Markets grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(market => (
                <MarketCard key={market.id} market={market} onSelect={setSelectedMarket} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-2 text-center py-16 text-muted-foreground">
                  <Filter className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>No markets found</p>
                </div>
              )}
            </div>

            {/* Portfolio sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <PortfolioPanel balance={walletBalance} positions={positions} transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trade modal */}
      {selectedMarket && (
        <TradeModal
          market={selectedMarket}
          positions={positions}
          onClose={() => setSelectedMarket(null)}
          onTrade={handleTrade}
          walletBalance={walletBalance}
        />
      )}
    </PageLayout>
  );
};

export default Predict;
