
import React from 'react';
import type { PredictionMarket } from '@/data/predictionMarkets';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';

interface MarketCardProps {
  market: PredictionMarket;
  onSelect: (market: PredictionMarket) => void;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onSelect }) => {
  const noOdds = 100 - market.yesOdds;

  return (
    <div
      className="dex-card p-5 space-y-4 cursor-pointer hover:border-accent/30 transition-all group"
      onClick={() => onSelect(market)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-2xl mt-0.5">{market.emoji}</span>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground leading-tight group-hover:text-accent transition-colors">
              {market.question}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{market.endDate}</span>
              {market.trending && <span className="text-amber-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" />Trending</span>}
            </div>
          </div>
        </div>
        {market.resolved && (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            market.resolution === 'yes' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {market.resolution === 'yes' ? 'Resolved YES' : 'Resolved NO'}
          </span>
        )}
      </div>

      {/* Odds bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-green-400">Yes {market.yesOdds}¢</span>
          <span className="text-red-400">No {noOdds}¢</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden bg-muted/30 flex">
          <div
            className="bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500 rounded-l-full"
            style={{ width: `${market.yesOdds}%` }}
          />
          <div
            className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500 rounded-r-full"
            style={{ width: `${noOdds}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{formatCompact(market.volume)} vol</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{market.participants.toLocaleString()}</span>
      </div>

      {/* Quick buy buttons */}
      {!market.resolved && (
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/20"
            onClick={e => { e.stopPropagation(); onSelect(market); }}
          >
            Buy Yes {market.yesOdds}¢
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
            onClick={e => { e.stopPropagation(); onSelect(market); }}
          >
            Buy No {noOdds}¢
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarketCard;
