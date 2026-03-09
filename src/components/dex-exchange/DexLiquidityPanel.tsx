import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Loader2, CheckCircle2, Info } from 'lucide-react';
import DexTokenSelector from './DexTokenSelector';
import { DexToken, DEX_TOKENS, formatPrice } from '@/data/dexTokens';
import { useToast } from '@/hooks/use-toast';
import type { useDexWallet } from '@/hooks/useDexWallet';

interface DexLiquidityPanelProps {
  wallet: ReturnType<typeof useDexWallet>;
}

const DexLiquidityPanel = ({ wallet }: DexLiquidityPanelProps) => {
  const { toast } = useToast();
  const [tokenA, setTokenA] = useState<DexToken | null>(DEX_TOKENS.find(t => t.symbol === 'ETH')!);
  const [tokenB, setTokenB] = useState<DexToken | null>(DEX_TOKENS.find(t => t.symbol === 'USDC')!);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [removePercent, setRemovePercent] = useState(50);
  const [processing, setProcessing] = useState(false);
  const [chain] = useState<'ethereum' | 'solana'>('ethereum');

  // Auto-calculate paired amount
  const handleAmountAChange = (val: string) => {
    setAmountA(val);
    if (tokenA && tokenB && val && !isNaN(Number(val))) {
      const usdVal = Number(val) * tokenA.price;
      setAmountB((usdVal / tokenB.price).toFixed(6));
    } else {
      setAmountB('');
    }
  };

  const handleAmountBChange = (val: string) => {
    setAmountB(val);
    if (tokenA && tokenB && val && !isNaN(Number(val))) {
      const usdVal = Number(val) * tokenB.price;
      setAmountA((usdVal / tokenA.price).toFixed(6));
    } else {
      setAmountA('');
    }
  };

  const poolShare = useMemo(() => {
    if (!amountA || !tokenA) return 0;
    const usdVal = Number(amountA) * tokenA.price * 2;
    // Mock pool size ~$10M
    return (usdVal / 10_000_000) * 100;
  }, [amountA, tokenA]);

  const totalLiquidity = useMemo(() => {
    if (!amountA || !tokenA) return 0;
    return Number(amountA) * tokenA.price * 2;
  }, [amountA, tokenA]);

  const handleAddLiquidity = async () => {
    if (!wallet.wallet.connected) {
      wallet.connect(chain);
      return;
    }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    toast({
      title: '✅ Liquidity Added!',
      description: `Added ${amountA} ${tokenA?.symbol} + ${amountB} ${tokenB?.symbol} to pool`,
    });
    setAmountA('');
    setAmountB('');
  };

  const handleRemoveLiquidity = async () => {
    if (!wallet.wallet.connected) {
      wallet.connect(chain);
      return;
    }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    toast({
      title: '✅ Liquidity Removed!',
      description: `Removed ${removePercent}% of your LP position`,
    });
  };

  // Mock existing positions
  const mockPositions = [
    { tokenA: 'ETH', tokenB: 'USDC', valueUsd: 12450.80, share: 0.0012, apr: 18.4 },
    { tokenA: 'ETH', tokenB: 'DAI', valueUsd: 3200.50, share: 0.0003, apr: 12.7 },
  ];

  return (
    <Card className="dex-card p-5 space-y-4">
      <Tabs defaultValue="add">
        <TabsList className="w-full bg-background/40 border border-white/5">
          <TabsTrigger value="add" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Plus className="h-3.5 w-3.5" /> Add
          </TabsTrigger>
          <TabsTrigger value="remove" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Minus className="h-3.5 w-3.5" /> Remove
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4 mt-4">
          {/* Token A */}
          <div className="bg-background/30 rounded-2xl p-4 border border-white/5">
            <span className="text-xs text-muted-foreground mb-2 block">Token A</span>
            <div className="flex items-center gap-3">
              <Input
                placeholder="0"
                value={amountA}
                onChange={e => handleAmountAChange(e.target.value)}
                type="number"
                className="text-2xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <DexTokenSelector selectedToken={tokenA} onSelect={setTokenA} chain={chain} excludeToken={tokenB} />
            </div>
            {amountA && tokenA && (
              <div className="text-xs text-muted-foreground mt-1">${(Number(amountA) * tokenA.price).toFixed(2)}</div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-card border border-white/10 flex items-center justify-center">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Token B */}
          <div className="bg-background/30 rounded-2xl p-4 border border-white/5">
            <span className="text-xs text-muted-foreground mb-2 block">Token B</span>
            <div className="flex items-center gap-3">
              <Input
                placeholder="0"
                value={amountB}
                onChange={e => handleAmountBChange(e.target.value)}
                type="number"
                className="text-2xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <DexTokenSelector selectedToken={tokenB} onSelect={setTokenB} chain={chain} excludeToken={tokenA} />
            </div>
            {amountB && tokenB && (
              <div className="text-xs text-muted-foreground mt-1">${(Number(amountB) * tokenB.price).toFixed(2)}</div>
            )}
          </div>

          {/* Pool info */}
          {amountA && amountB && tokenA && tokenB && (
            <div className="bg-background/20 rounded-xl p-3 space-y-2 text-xs border border-white/5">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Liquidity</span>
                <span className="text-foreground">${totalLiquidity.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Pool Share</span>
                <span className="text-foreground">{poolShare.toFixed(6)}%</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Rate</span>
                <span className="text-foreground">1 {tokenA.symbol} = {(tokenA.price / tokenB.price).toFixed(6)} {tokenB.symbol}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Est. APR</span>
                <span className="text-green-400">~{(Math.random() * 20 + 5).toFixed(1)}%</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleAddLiquidity}
            disabled={processing || (wallet.wallet.connected && (!amountA || !amountB))}
            className="w-full h-12 font-semibold bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-500 hover:to-green-400 border-0 rounded-2xl"
          >
            {processing ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Adding...</> 
              : !wallet.wallet.connected ? 'Connect Wallet' 
              : 'Add Liquidity'}
          </Button>
        </TabsContent>

        <TabsContent value="remove" className="space-y-4 mt-4">
          {/* Existing positions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Your LP Positions (Mock)</span>
            </div>
            {mockPositions.map((pos, i) => (
              <div key={i} className="bg-background/30 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">{pos.tokenA}/{pos.tokenB}</span>
                  <span className="text-green-400 text-xs">APR: {pos.apr}%</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Value: <span className="text-foreground">${pos.valueUsd.toFixed(2)}</span></div>
                  <div>Share: <span className="text-foreground">{pos.share}%</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Remove slider */}
          <div className="bg-background/30 rounded-xl p-4 border border-white/5">
            <label className="text-xs text-muted-foreground mb-3 block">Remove Amount</label>
            <div className="text-4xl font-bold text-foreground text-center mb-4">{removePercent}%</div>
            <input
              type="range"
              min="0"
              max="100"
              value={removePercent}
              onChange={e => setRemovePercent(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between mt-2 gap-2">
              {[25, 50, 75, 100].map(v => (
                <button key={v} onClick={() => setRemovePercent(v)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${removePercent === v ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-background/40 text-muted-foreground border border-white/5'}`}
                >{v}%</button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleRemoveLiquidity}
            disabled={processing || removePercent === 0}
            className="w-full h-12 font-semibold bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 border-0 rounded-2xl"
          >
            {processing ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Removing...</> : `Remove ${removePercent}% Liquidity`}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default DexLiquidityPanel;
