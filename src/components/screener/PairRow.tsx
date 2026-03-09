
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SparklineChart from './SparklineChart';
import type { ScreenerPair } from '@/data/screenerPairs';

interface PairRowProps {
  pair: ScreenerPair;
  rank: number;
  timeframe: '5m' | '1h' | '6h';
}

function formatPrice(p: number): string {
  if (p < 0.0001) return `$${p.toExponential(2)}`;
  if (p < 1) return `$${p.toFixed(6)}`;
  if (p < 1000) return `$${p.toFixed(2)}`;
  return `$${p.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

const chainColors: Record<string, string> = {
  ETH: 'bg-blue-500/20 text-blue-400',
  Solana: 'bg-purple-500/20 text-purple-400',
  Base: 'bg-sky-500/20 text-sky-400',
  Pulse: 'bg-green-500/20 text-green-400',
};

const PairRow: React.FC<PairRowProps> = ({ pair, rank, timeframe }) => {
  const navigate = useNavigate();
  const isPositive = pair.change24h >= 0;
  const sparkline = timeframe === '5m' ? pair.sparkline5m : timeframe === '1h' ? pair.sparkline1h : pair.sparkline6h;

  return (
    <div className="grid grid-cols-[40px_minmax(140px,1.2fr)_80px_100px_90px_130px_100px_100px_100px_80px] items-center gap-2 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors text-sm">
      <span className="text-muted-foreground font-mono text-xs">{rank}</span>

      <div className="flex items-center gap-2 min-w-0">
        <span className="text-lg">{pair.emoji}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground truncate">{pair.token}</span>
            <span className="text-muted-foreground text-xs">/{pair.quoteToken}</span>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${chainColors[pair.chain]}`}>
            {pair.chain}
          </span>
        </div>
      </div>

      <span className="font-mono text-foreground text-xs">{formatPrice(pair.price)}</span>

      <span className={`font-mono font-semibold text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{pair.change24h.toFixed(2)}%
      </span>

      <span className="text-muted-foreground text-xs">{pair.pairAge < 24 ? `${pair.pairAge}h` : `${Math.floor(pair.pairAge / 24)}d`}</span>

      <div className="flex justify-center">
        <SparklineChart data={sparkline} positive={isPositive} width={100} height={32} />
      </div>

      <span className="font-mono text-xs text-muted-foreground">{formatCompact(pair.volume24h)}</span>
      <span className="font-mono text-xs text-muted-foreground">{formatCompact(pair.liquidity)}</span>
      <span className="font-mono text-xs text-muted-foreground">{formatCompact(pair.fdv)}</span>

      <Button
        size="sm"
        variant="ghost"
        className="h-7 px-2 text-xs text-green-400 hover:text-green-300 hover:bg-green-500/10"
        onClick={() => navigate('/dex')}
      >
        Buy <ExternalLink className="w-3 h-3 ml-1" />
      </Button>
    </div>
  );
};

export default PairRow;
