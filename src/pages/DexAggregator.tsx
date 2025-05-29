
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowDownUp, BarChart3, Shield, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { ChangellyAPI } from '@/utils/changelly';
import { toast } from '@/hooks/use-toast';

const DexAggregator = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('1'); // Ethereum mainnet
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');

  const changelly = new ChangellyAPI();

  // Fetch supported chains
  const { data: chains, isLoading: chainsLoading } = useQuery({
    queryKey: ['dex-chains'],
    queryFn: () => changelly.getDexChains(),
  });

  // Fetch tokens for selected chain
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ['dex-tokens', selectedChain],
    queryFn: () => changelly.getDexTokens(parseInt(selectedChain)),
    enabled: !!selectedChain,
  });

  // Get quote when parameters are set
  const { data: quote, isLoading: quoteLoading, refetch: refetchQuote } = useQuery({
    queryKey: ['dex-quote', fromToken, toToken, fromAmount, selectedChain, slippage],
    queryFn: () => changelly.getDexQuote({
      fromToken,
      toToken,
      amount: fromAmount,
      chainId: parseInt(selectedChain),
      slippage: parseFloat(slippage),
      userAddress: userAddress || undefined
    }),
    enabled: !!(fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0),
  });

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleGetQuote = () => {
    if (!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Missing Information",
        description: "Please select tokens and enter an amount to get a quote.",
        variant: "destructive",
      });
      return;
    }
    refetchQuote();
  };

  const handleCreateSwap = async () => {
    if (!userAddress) {
      toast({
        title: "Wallet Address Required",
        description: "Please enter your wallet address to create a swap transaction.",
        variant: "destructive",
      });
      return;
    }

    try {
      const swapData = await changelly.getDexSwapTransaction({
        fromToken,
        toToken,
        amount: fromAmount,
        chainId: parseInt(selectedChain),
        userAddress,
        slippage: parseFloat(slippage)
      });

      toast({
        title: "Swap Transaction Ready",
        description: "Your swap transaction has been prepared. Please sign it in your wallet.",
      });

      console.log('Swap transaction data:', swapData);
    } catch (error) {
      console.error('Failed to create swap:', error);
      toast({
        title: "Swap Failed",
        description: error instanceof Error ? error.message : "Failed to create swap transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <PageLayout title="DEX Aggregator">
      <PageHeader 
        title="DEX Aggregator" 
        description="Access the best prices across 200+ decentralized exchanges with MEV protection and gas optimization"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Swap Interface */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">DEX Swap</h3>
              </div>

              <div className="space-y-4">
                {/* Chain Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Network</label>
                  <Select value={selectedChain} onValueChange={setSelectedChain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      {chains?.map((chain: any) => (
                        <SelectItem key={chain.chainId} value={chain.chainId.toString()}>
                          {chain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens?.map((token: any) => (
                          <SelectItem key={token.address} value={token.address}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSwapTokens}
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
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens?.map((token: any) => (
                          <SelectItem key={token.address} value={token.address}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <Button onClick={handleGetQuote} className="w-full" disabled={quoteLoading}>
                    {quoteLoading ? 'Getting Quote...' : 'Get Quote'}
                  </Button>
                  
                  {quote && (
                    <Button onClick={handleCreateSwap} className="w-full bg-green-600 hover:bg-green-700">
                      Create Swap <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Quote Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Quote Details</h3>
              </div>

              {quote ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Exchange Rate</span>
                    <span className="font-medium">{quote.rate || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Estimated Gas</span>
                    <span className="font-medium">{quote.estimatedGas || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price Impact</span>
                    <Badge variant={parseFloat(quote.priceImpact || '0') > 5 ? 'destructive' : 'secondary'}>
                      {quote.priceImpact || '0'}%
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Route</span>
                    <span className="text-xs text-muted-foreground">{quote.protocols?.join(' → ') || 'Direct'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter swap details to get a quote</p>
                </div>
              )}
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">DEX Aggregator Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">MEV Protection</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced protection against maximal extractable value attacks
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Gas Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Smart routing to minimize gas fees and maximize efficiency
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">200+ DEXs</h4>
                <p className="text-sm text-muted-foreground">
                  Access aggregated liquidity from hundreds of decentralized exchanges
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DexAggregator;
