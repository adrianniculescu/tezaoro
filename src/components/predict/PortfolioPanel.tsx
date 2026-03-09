
import React from 'react';
import type { UserPosition, TxRecord } from '@/data/predictionMarkets';
import { mockMarkets } from '@/data/predictionMarkets';
import { Wallet, History, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PortfolioPanelProps {
  balance: number;
  positions: UserPosition[];
  transactions: TxRecord[];
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ balance, positions, transactions }) => {
  const totalInvested = positions.reduce((sum, p) => sum + p.avgPrice * p.shares, 0);

  return (
    <div className="dex-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Wallet className="w-5 h-5 text-accent" />
        <h2 className="font-semibold text-foreground">Portfolio</h2>
      </div>

      {/* Balance */}
      <div className="bg-muted/10 rounded-xl p-4 space-y-1">
        <p className="text-xs text-muted-foreground">Mock Wallet Balance</p>
        <p className="text-2xl font-bold text-foreground">${balance.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">Invested: ${totalInvested.toFixed(2)}</p>
      </div>

      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="w-full bg-muted/20">
          <TabsTrigger value="positions" className="flex-1 text-xs"><BarChart3 className="w-3 h-3 mr-1" />Positions</TabsTrigger>
          <TabsTrigger value="history" className="flex-1 text-xs"><History className="w-3 h-3 mr-1" />History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="mt-3 space-y-2">
          {positions.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No positions yet</p>
          ) : (
            positions.map((pos, i) => {
              const market = mockMarkets.find(m => m.id === pos.marketId);
              if (!market) return null;
              return (
                <div key={i} className="bg-muted/10 rounded-lg p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground truncate">{market.emoji} {market.question}</p>
                  <div className="flex justify-between text-xs">
                    <span className={pos.side === 'yes' ? 'text-green-400' : 'text-red-400'}>
                      {pos.shares.toFixed(2)} {pos.side.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">@ {(pos.avgPrice * 100).toFixed(0)}¢</span>
                  </div>
                </div>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-3 space-y-2 max-h-60 overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">No transactions yet</p>
          ) : (
            transactions.slice().reverse().map(tx => {
              const market = mockMarkets.find(m => m.id === tx.marketId);
              return (
                <div key={tx.id} className="bg-muted/10 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-foreground">{market?.emoji} {tx.action.toUpperCase()} {tx.shares.toFixed(2)} {tx.side.toUpperCase()}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(tx.timestamp).toLocaleString()}</p>
                  </div>
                  <span className="text-xs font-mono text-foreground">-${tx.amount.toFixed(2)}</span>
                </div>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioPanel;
