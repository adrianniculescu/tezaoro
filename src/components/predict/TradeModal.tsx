import React, { useState } from 'react';
import type { PredictionMarket, UserPosition, TxRecord } from '@/data/predictionMarkets';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface TradeModalProps {
  market: PredictionMarket;
  positions: UserPosition[];
  onClose: () => void;
  onTrade: (tx: TxRecord, position: UserPosition) => void;
  walletBalance: number;
}

const TradeModal: React.FC<TradeModalProps> = ({ market, positions, onClose, onTrade, walletBalance }) => {
  const [side, setSide] = useState<'yes' | 'no'>('yes');
  const [amount, setAmount] = useState(10);

  const price = side === 'yes' ? market.yesOdds / 100 : (100 - market.yesOdds) / 100;
  const shares = amount / price;
  const potentialPayout = shares * 1; // $1 per share if resolved in your favor
  const profit = potentialPayout - amount;

  const existingPosition = positions.find(p => p.marketId === market.id && p.side === side);

  const handleBuy = () => {
    if (amount > walletBalance) {
      toast.error('Insufficient balance');
      return;
    }
    if (amount < 1 || amount > 100) {
      toast.error('Amount must be between $1 and $100');
      return;
    }

    const tx: TxRecord = {
      id: `tx-${Date.now()}`,
      marketId: market.id,
      action: 'buy',
      side,
      amount,
      shares: Math.round(shares * 100) / 100,
      price: Math.round(price * 100) / 100,
      timestamp: new Date().toISOString(),
    };

    const position: UserPosition = {
      marketId: market.id,
      side,
      shares: (existingPosition?.shares || 0) + shares,
      avgPrice: existingPosition
        ? ((existingPosition.avgPrice * existingPosition.shares) + (price * shares)) / (existingPosition.shares + shares)
        : price,
      timestamp: new Date().toISOString(),
    };

    onTrade(tx, position);
    toast.success(`Bought ${Math.round(shares * 100) / 100} ${side.toUpperCase()} shares for $${amount}`);
  };

  const quickAmounts = [5, 10, 25, 50, 100];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="dex-card w-full max-w-md p-6 space-y-5" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{market.emoji}</span>
            <h3 className="font-semibold text-foreground leading-tight text-lg">{market.question}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setSide('yes')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              side === 'yes'
                ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40'
                : 'bg-muted/20 text-muted-foreground border-2 border-transparent hover:bg-muted/30'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-1.5" />
            Yes {market.yesOdds}¢
          </button>
          <button
            onClick={() => setSide('no')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
              side === 'no'
                ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40'
                : 'bg-muted/20 text-muted-foreground border-2 border-transparent hover:bg-muted/30'
            }`}
          >
            <TrendingDown className="w-4 h-4 inline mr-1.5" />
            No {100 - market.yesOdds}¢
          </button>
        </div>

        {/* Amount input */}
        <div className="space-y-3">
          <label className="text-sm text-muted-foreground">Amount ($1 - $100)</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAmount(Math.max(1, amount - 5))}
              className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-foreground hover:bg-muted/50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Math.min(100, Math.max(1, Number(e.target.value))))}
                className="w-full bg-muted/20 border border-border/50 rounded-xl px-8 py-3 text-center text-xl font-bold text-foreground focus:outline-none focus:border-accent/50"
              />
            </div>
            <button
              onClick={() => setAmount(Math.min(100, amount + 5))}
              className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-foreground hover:bg-muted/50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            {quickAmounts.map(qa => (
              <button
                key={qa}
                onClick={() => setAmount(qa)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  amount === qa
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                }`}
              >
                ${qa}
              </button>
            ))}
          </div>
        </div>

        {/* Trade summary */}
        <div className="bg-muted/10 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price per share</span>
            <span className="text-foreground font-mono">{(price * 100).toFixed(0)}¢</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shares</span>
            <span className="text-foreground font-mono">{shares.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Potential payout</span>
            <span className="text-green-400 font-mono font-semibold">${potentialPayout.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Potential profit</span>
            <span className="text-green-400 font-mono">+${profit.toFixed(2)} ({((profit / amount) * 100).toFixed(0)}%)</span>
          </div>
        </div>

        {/* Existing position */}
        {existingPosition && (
          <div className="bg-accent/5 rounded-xl p-3 text-xs text-muted-foreground">
            Existing position: <span className="text-foreground font-medium">{existingPosition.shares.toFixed(2)} {side.toUpperCase()} shares</span> @ avg {(existingPosition.avgPrice * 100).toFixed(0)}¢
          </div>
        )}

        {/* Buy button */}
        <Button
          className={`w-full py-6 text-base font-bold ${
            side === 'yes'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
          onClick={handleBuy}
          disabled={market.resolved}
        >
          {market.resolved ? 'Market Resolved' : `Buy ${side.toUpperCase()} — $${amount}`}
        </Button>

        <p className="text-[10px] text-muted-foreground text-center">
          Balance: ${walletBalance.toFixed(2)} • Mock trading only
        </p>
      </div>
    </div>
  );
};

export default TradeModal;
