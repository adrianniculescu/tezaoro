
import React from 'react';
import type { Chain } from '@/data/screenerPairs';
import { CHAINS } from '@/data/screenerPairs';
import { Activity } from 'lucide-react';

interface ScreenerHeaderProps {
  activeChain: Chain | 'All';
  onChainChange: (chain: Chain | 'All') => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  pairCount: number;
}

const chainIcons: Record<string, string> = {
  All: '🌐',
  ETH: '⟠',
  Solana: '◎',
  Base: '🔵',
  Pulse: '💚',
};

const filters = [
  { id: 'trending', label: '🔥 Trending' },
  { id: 'new', label: '🆕 New Pairs' },
  { id: 'gainers', label: '📈 Gainers' },
  { id: 'volume', label: '💰 Volume 24h' },
];

const ScreenerHeader: React.FC<ScreenerHeaderProps> = ({
  activeChain, onChainChange, activeFilter, onFilterChange, pairCount
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-green-400" />
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="dex-text-glow">DEX Screener</span>
          </h1>
          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            {pairCount} pairs
          </span>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      {/* Chain tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['All', ...CHAINS] as const).map(chain => (
          <button
            key={chain}
            onClick={() => onChainChange(chain)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeChain === chain
                ? 'bg-accent/20 text-accent border border-accent/30'
                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-transparent'
            }`}
          >
            {chainIcons[chain]} {chain}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => onFilterChange(f.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeFilter === f.id
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-muted/20 text-muted-foreground hover:bg-muted/40 border border-transparent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScreenerHeader;
