
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowDownUp, BarChart3, ChevronRight } from 'lucide-react';

interface DexSwapInterfaceProps {
  fromAmount: string;
  setFromAmount: (value: string) => void;
  fromToken: string;
  setFromToken: (value: string) => void;
  toToken: string;
  setToToken: (value: string) => void;
  selectedChain: string;
  setSelectedChain: (value: string) => void;
  slippage: string;
  setSlippage: (value: string) => void;
  userAddress: string;
  setUserAddress: (value: string) => void;
  chains: any[];
  tokens: any[];
  quote: any;
  chainsLoading: boolean;
  tokensLoading: boolean;
  quoteLoading: boolean;
  useMockData: boolean;
  onSwapTokens: () => void;
  onGetQuote: () => void;
  onCreateSwap: () => void;
}

const DexSwapInterface = ({
  fromAmount,
  setFromAmount,
  fromToken,
  setFromToken,
  toToken,
  setToToken,
  selectedChain,
  setSelectedChain,
  slippage,
  setSlippage,
  userAddress,
  setUserAddress,
  chains,
  tokens,
  quote,
  chainsLoading,
  tokensLoading,
  quoteLoading,
  useMockData,
  onSwapTokens,
  onGetQuote,
  onCreateSwap
}: DexSwapInterfaceProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">DEX Swap</h3>
      </div>

      <div className="space-y-4">
        {/* Chain Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Network</label>
          {chainsLoading ? (
            <div className="text-sm text-muted-foreground">Loading networks...</div>
          ) : (
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger>
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {chains?.map((chain: any) => (
                  <SelectItem key={chain.chainId || chain.id} value={(chain.chainId || chain.id).toString()}>
                    {chain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* From Token */}
        <div>
          <label className="text-sm font-medium mb-2 block">From</label>
          <div className="flex gap-2">
            <Input
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              type="number"
              className="flex-1"
            />
            {tokensLoading ? (
              <div className="w-32 text-xs text-muted-foreground flex items-center justify-center">Loading...</div>
            ) : (
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.map((token: any) => (
                    <SelectItem key={token.address || token.symbol} value={token.address || token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onSwapTokens}
            className="rounded-full"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div>
          <label className="text-sm font-medium mb-2 block">To</label>
          <div className="flex gap-2">
            <Input
              placeholder="0.0"
              value={quote?.toAmount || ''}
              readOnly
              className="flex-1 bg-muted"
            />
            {tokensLoading ? (
              <div className="w-32 text-xs text-muted-foreground flex items-center justify-center">Loading...</div>
            ) : (
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens?.map((token: any) => (
                    <SelectItem key={token.address || token.symbol} value={token.address || token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Slippage (%)</label>
            <Input
              placeholder="1.0"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Your Address</label>
            <Input
              placeholder="0x..."
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Button onClick={onGetQuote} className="w-full" disabled={quoteLoading || !fromToken || !toToken || !fromAmount}>
            {quoteLoading ? 'Getting Quote...' : 'Get Quote'}
          </Button>
          
          {quote && (
            <Button onClick={onCreateSwap} className="w-full bg-green-600 hover:bg-green-700">
              {useMockData ? 'Demo Swap' : 'Create Swap'} <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DexSwapInterface;
