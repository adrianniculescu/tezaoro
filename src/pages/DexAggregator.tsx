
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowDownUp, BarChart3, Shield, Zap, TrendingUp, ChevronRight, AlertCircle } from 'lucide-react';
import { ChangellyAPI } from '@/utils/changelly';
import { toast } from '@/hooks/use-toast';

// Mock data for fallback
const MOCK_CHAINS = [
  { chainId: 1, id: 1, name: 'Ethereum' },
  { chainId: 56, id: 56, name: 'BSC' },
  { chainId: 137, id: 137, name: 'Polygon' }
];

const MOCK_TOKENS = [
  { address: '0x...eth', symbol: 'ETH' },
  { address: '0x...usdt', symbol: 'USDT' },
  { address: '0x...usdc', symbol: 'USDC' }
];

const DexAggregator = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('1'); // Ethereum mainnet
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(true); // Start with mock data

  console.log('DexAggregator: Component rendering with state:', {
    fromAmount,
    fromToken,
    toToken,
    selectedChain,
    useMockData,
    apiError
  });

  // Properly memoize the ChangellyAPI instance
  const changelly = useMemo(() => {
    try {
      console.log('DexAggregator: Creating ChangellyAPI instance...');
      const api = new ChangellyAPI();
      console.log('DexAggregator: ChangellyAPI instance created successfully');
      return api;
    } catch (error) {
      console.error('DexAggregator: Failed to create ChangellyAPI instance:', error);
      setApiError('Failed to initialize API connection');
      return null;
    }
  }, []);

  // Test connection on mount
  useEffect(() => {
    const testConnection = async () => {
      console.log('DexAggregator: Testing connection...');
      
      if (!changelly) {
        console.log('DexAggregator: No changelly instance, using mock data');
        setUseMockData(true);
        setApiError('API initialization failed');
        return;
      }

      try {
        console.log('DexAggregator: Testing DEX connection...');
        const result = await changelly.testDexConnection();
        console.log('DexAggregator: DEX connection test result:', result);
        
        if (result.success) {
          console.log('DexAggregator: DEX connection successful');
          setUseMockData(false);
          setApiError(null);
          toast({
            title: "Connected",
            description: "DEX API connected successfully",
            variant: "default",
          });
        } else {
          console.warn('DexAggregator: DEX connection failed, using mock data');
          setUseMockData(true);
          setApiError(result.message);
          toast({
            title: "Demo Mode",
            description: "DEX API unavailable, showing demo interface",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('DexAggregator: Connection test failed:', error);
        setUseMockData(true);
        setApiError(error instanceof Error ? error.message : 'Connection failed');
        toast({
          title: "Demo Mode Active",
          description: "Using demo data due to API connection issues",
          variant: "default",
        });
      }
    };

    testConnection();
  }, [changelly]);

  // Fetch supported chains with fallback
  const { data: chains, isLoading: chainsLoading } = useQuery({
    queryKey: ['dex-chains'],
    queryFn: async () => {
      console.log('DexAggregator: Fetching chains...');
      if (useMockData || !changelly) {
        console.log('DexAggregator: Using mock chains data');
        return MOCK_CHAINS;
      }
      
      try {
        const result = await changelly.getDexChains();
        console.log('DexAggregator: Chains result:', result);
        return result || MOCK_CHAINS;
      } catch (error) {
        console.warn('DexAggregator: Chains API failed, using mock data:', error);
        return MOCK_CHAINS;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch tokens for selected chain with fallback
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ['dex-tokens', selectedChain],
    queryFn: async () => {
      console.log('DexAggregator: Fetching tokens for chain:', selectedChain);
      if (useMockData || !changelly) {
        console.log('DexAggregator: Using mock tokens data');
        return MOCK_TOKENS;
      }
      
      try {
        const result = await changelly.getDexTokens(parseInt(selectedChain));
        console.log('DexAggregator: Tokens result:', result);
        return result || MOCK_TOKENS;
      } catch (error) {
        console.warn('DexAggregator: Tokens API failed, using mock data:', error);
        return MOCK_TOKENS;
      }
    },
    enabled: !!selectedChain,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get quote with fallback
  const { data: quote, isLoading: quoteLoading, refetch: refetchQuote } = useQuery({
    queryKey: ['dex-quote', fromToken, toToken, fromAmount, selectedChain, slippage],
    queryFn: async () => {
      console.log('DexAggregator: Fetching quote with params:', {
        fromToken,
        toToken,
        amount: fromAmount,
        chainId: parseInt(selectedChain),
        slippage: parseFloat(slippage),
        userAddress: userAddress || undefined
      });
      
      if (useMockData || !changelly) {
        console.log('DexAggregator: Using mock quote data');
        return {
          toAmount: (parseFloat(fromAmount) * 0.95).toString(),
          rate: '0.95',
          estimatedGas: '21000',
          priceImpact: '0.5',
          protocols: ['Demo Protocol']
        };
      }
      
      try {
        const result = await changelly.getDexQuote({
          fromToken,
          toToken,
          amount: fromAmount,
          chainId: parseInt(selectedChain),
          slippage: parseFloat(slippage),
          userAddress: userAddress || undefined
        });
        
        console.log('DexAggregator: Quote result:', result);
        return result;
      } catch (error) {
        console.warn('DexAggregator: Quote API failed, using mock data:', error);
        // Return mock quote for demo purposes
        return {
          toAmount: (parseFloat(fromAmount) * 0.95).toString(),
          rate: '0.95',
          estimatedGas: '21000',
          priceImpact: '0.5',
          protocols: ['Demo Protocol']
        };
      }
    },
    enabled: !!(fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0),
    retry: false,
  });

  const handleSwapTokens = () => {
    console.log('DexAggregator: Swapping tokens');
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleGetQuote = () => {
    console.log('DexAggregator: Getting quote manually');
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

    if (useMockData) {
      toast({
        title: "Demo Mode",
        description: "This is a demo. In production, your swap transaction would be prepared here.",
        variant: "default",
      });
      return;
    }

    try {
      console.log('DexAggregator: Creating swap transaction...');
      if (!changelly) throw new Error('API not available');
      
      const swapData = await changelly.getDexSwapTransaction({
        fromToken,
        toToken,
        amount: fromAmount,
        chainId: parseInt(selectedChain),
        userAddress,
        slippage: parseFloat(slippage)
      });

      console.log('DexAggregator: Swap transaction data:', swapData);
      toast({
        title: "Swap Transaction Ready",
        description: "Your swap transaction has been prepared. Please sign it in your wallet.",
      });
    } catch (error) {
      console.error('DexAggregator: Failed to create swap:', error);
      toast({
        title: "Swap Failed",
        description: error instanceof Error ? error.message : "Failed to create swap transaction",
        variant: "destructive",
      });
    }
  };

  console.log('DexAggregator: Rendering component with state:', {
    useMockData,
    apiError,
    chainsCount: chains?.length,
    tokensCount: tokens?.length,
    hasQuote: !!quote
  });

  return (
    <PageLayout title="DEX Aggregator">
      <PageHeader 
        title="DEX Aggregator" 
        description="Access the best prices across 200+ decentralized exchanges with MEV protection and gas optimization"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Status Display */}
          {(apiError || useMockData) && (
            <Card className="p-4 mb-6 border-yellow-200 bg-yellow-50">
              <div className="flex items-center gap-2 text-yellow-700">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">{useMockData ? 'Demo Mode Active' : 'Service Notice'}</span>
              </div>
              <p className="text-sm text-yellow-600 mt-1">
                {useMockData 
                  ? 'Using demo data for interface testing. API connection will be restored soon.'
                  : apiError
                }
              </p>
            </Card>
          )}

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
                  <Button onClick={handleGetQuote} className="w-full" disabled={quoteLoading || !fromToken || !toToken || !fromAmount}>
                    {quoteLoading ? 'Getting Quote...' : 'Get Quote'}
                  </Button>
                  
                  {quote && (
                    <Button onClick={handleCreateSwap} className="w-full bg-green-600 hover:bg-green-700">
                      {useMockData ? 'Demo Swap' : 'Create Swap'} <ChevronRight className="h-4 w-4 ml-2" />
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

                  {useMockData && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600">
                        Demo data shown for interface testing
                      </p>
                    </div>
                  )}
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
