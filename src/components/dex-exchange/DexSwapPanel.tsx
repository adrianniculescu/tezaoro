import React, { useState, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowDownUp, Settings2, Zap, Route, Loader2, CheckCircle2 } from 'lucide-react';
import DexTokenSelector from './DexTokenSelector';
import { DexToken, DEX_TOKENS, formatPrice, calculateSwap } from '@/data/dexTokens';
import { useToast } from '@/hooks/use-toast';
import type { useDexWallet } from '@/hooks/useDexWallet';

interface DexSwapPanelProps {
  wallet: ReturnType<typeof useDexWallet>;
}

const DexSwapPanel = ({ wallet }: DexSwapPanelProps) => {
  const { toast } = useToast();
  const [fromToken, setFromToken] = useState<DexToken | null>(DEX_TOKENS.find(t => t.symbol === 'ETH')!);
  const [toToken, setToToken] = useState<DexToken | null>(DEX_TOKENS.find(t => t.symbol === 'USDC')!);
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [deadline, setDeadline] = useState('20');
  const [chain, setChain] = useState<'ethereum' | 'solana'>('ethereum');
  const [swapping, setSwapping] = useState(false);
  const [txHash, setTxHash] = useState('');

  const swapResult = useMemo(() => {
    if (!fromToken || !toToken || !fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) return null;
    return calculateSwap(fromToken, toToken, Number(fromAmount));
  }, [fromToken, toToken, fromAmount]);

  const fromUsdValue = useMemo(() => {
    if (!fromToken || !fromAmount || isNaN(Number(fromAmount))) return 0;
    return Number(fromAmount) * fromToken.price;
  }, [fromToken, fromAmount]);

  const handleSwapTokens = useCallback(() => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  }, [fromToken, toToken]);

  const handleChainSwitch = useCallback((newChain: 'ethereum' | 'solana') => {
    setChain(newChain);
    const defaultFrom = newChain === 'solana' ? DEX_TOKENS.find(t => t.symbol === 'SOL')! : DEX_TOKENS.find(t => t.symbol === 'ETH')!;
    const defaultTo = DEX_TOKENS.find(t => t.symbol === 'USDC' && t.chain === newChain) || DEX_TOKENS.find(t => t.symbol === 'USDC')!;
    setFromToken(defaultFrom);
    setToToken(defaultTo);
    setFromAmount('');
    if (wallet.wallet.connected) wallet.switchChain(newChain);
  }, [wallet]);

  const handleSwap = useCallback(async () => {
    if (!wallet.wallet.connected) {
      wallet.connect(chain);
      return;
    }
    setSwapping(true);
    setTxHash('');
    await new Promise(r => setTimeout(r, 2500));
    const mockHash = chain === 'ethereum'
      ? `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      : Array.from({ length: 88 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
    setTxHash(mockHash);
    setSwapping(false);
    toast({
      title: '✅ Swap Successful!',
      description: `Swapped ${fromAmount} ${fromToken?.symbol} → ${swapResult?.toAmount.toFixed(6)} ${toToken?.symbol}`,
    });
  }, [wallet, chain, fromAmount, fromToken, toToken, swapResult, toast]);

  return (
    <Card className="dex-card p-5 space-y-4">
      {/* Chain + Settings row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-background/40 rounded-lg p-1">
          {(['ethereum', 'solana'] as const).map(c => (
            <button
              key={c}
              onClick={() => handleChainSwitch(c)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${chain === c ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {c === 'ethereum' ? '⟠ Ethereum' : '◎ Solana'}
            </button>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <Settings2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 bg-card/95 backdrop-blur-xl border-white/10" align="end">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Slippage Tolerance</label>
                <div className="flex gap-2">
                  {['0.1', '0.5', '1.0'].map(v => (
                    <button key={v} onClick={() => setSlippage(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${slippage === v ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-background/40 text-muted-foreground border border-white/5'}`}
                    >{v}%</button>
                  ))}
                  <Input value={slippage} onChange={e => setSlippage(e.target.value)} className="w-16 h-8 text-xs bg-background/40 border-white/10" placeholder="Custom" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Tx Deadline (min)</label>
                <Input value={deadline} onChange={e => setDeadline(e.target.value)} className="h-8 text-xs bg-background/40 border-white/10" type="number" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* FROM */}
      <div className="bg-background/30 rounded-2xl p-4 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">You pay</span>
          {wallet.wallet.connected && fromToken && (
            <button className="text-xs text-primary hover:underline" onClick={() => setFromAmount(wallet.wallet.balance)}>
              Balance: {wallet.wallet.balance}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="0"
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            type="number"
            className="text-3xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <DexTokenSelector selectedToken={fromToken} onSelect={setFromToken} chain={chain} excludeToken={toToken} />
        </div>
        {fromUsdValue > 0 && (
          <div className="text-xs text-muted-foreground mt-1">${fromUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        )}
      </div>

      {/* Swap arrow */}
      <div className="flex justify-center -my-2 z-10 relative">
        <button
          onClick={handleSwapTokens}
          className="h-10 w-10 rounded-xl bg-card border-2 border-white/10 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all group"
        >
          <ArrowDownUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* TO */}
      <div className="bg-background/30 rounded-2xl p-4 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">You receive</span>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="0"
            value={swapResult ? swapResult.toAmount.toFixed(6) : ''}
            readOnly
            className="text-3xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/30"
          />
          <DexTokenSelector selectedToken={toToken} onSelect={setToToken} chain={chain} excludeToken={fromToken} />
        </div>
        {swapResult && toToken && (
          <div className="text-xs text-muted-foreground mt-1">
            ${(swapResult.toAmount * toToken.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        )}
      </div>

      {/* Quote details */}
      {swapResult && fromToken && toToken && (
        <div className="bg-background/20 rounded-xl p-3 space-y-2 text-xs border border-white/5">
          <div className="flex justify-between text-muted-foreground">
            <span>Rate</span>
            <span className="text-foreground">1 {fromToken.symbol} = {swapResult.rate.toFixed(6)} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Price Impact</span>
            <span className={swapResult.priceImpact > 0.3 ? 'text-yellow-400' : 'text-green-400'}>{swapResult.priceImpact.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Min. received</span>
            <span className="text-foreground">{swapResult.minReceived.toFixed(6)} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Fee (0.3%)</span>
            <span className="text-foreground">${swapResult.feeUsd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="flex items-center gap-1"><Route className="h-3 w-3" /> Route</span>
            <span className="text-foreground">{swapResult.route}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Est. Gas</span>
            <span className="text-foreground">{swapResult.estimatedGas} {chain === 'ethereum' ? 'ETH' : 'SOL'}</span>
          </div>
        </div>
      )}

      {/* Swap / Connect button */}
      <Button
        onClick={handleSwap}
        disabled={swapping || (wallet.wallet.connected && (!fromToken || !toToken || !fromAmount || Number(fromAmount) <= 0))}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-500 hover:to-green-400 border-0 rounded-2xl transition-all"
        size="lg"
      >
        {swapping ? (
          <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Swapping...</>
        ) : !wallet.wallet.connected ? (
          <><Wallet className="h-5 w-5 mr-2" /> Connect Wallet</>
        ) : !fromToken || !toToken ? (
          'Select tokens'
        ) : !fromAmount || Number(fromAmount) <= 0 ? (
          'Enter an amount'
        ) : (
          `Swap ${fromToken.symbol} → ${toToken.symbol}`
        )}
      </Button>

      {/* Tx hash */}
      {txHash && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-xs">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-green-400 font-medium">Transaction Confirmed</div>
            <div className="text-muted-foreground truncate">{txHash}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

// Need to import Wallet icon
import { Wallet } from 'lucide-react';

export default DexSwapPanel;
