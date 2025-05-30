
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import DexStatusBanner from '@/components/dex/DexStatusBanner';
import DexSwapInterface from '@/components/dex/DexSwapInterface';
import DexQuoteDisplay from '@/components/dex/DexQuoteDisplay';
import DexFeaturesSection from '@/components/dex/DexFeaturesSection';
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
  const [selectedChain, setSelectedChain] = useState('1');
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(true);

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
          <DexStatusBanner apiError={apiError} useMockData={useMockData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DexSwapInterface
              fromAmount={fromAmount}
              setFromAmount={setFromAmount}
              fromToken={fromToken}
              setFromToken={setFromToken}
              toToken={toToken}
              setToToken={setToToken}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              slippage={slippage}
              setSlippage={setSlippage}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
              chains={chains || []}
              tokens={tokens || []}
              quote={quote}
              chainsLoading={chainsLoading}
              tokensLoading={tokensLoading}
              quoteLoading={quoteLoading}
              useMockData={useMockData}
              onSwapTokens={handleSwapTokens}
              onGetQuote={handleGetQuote}
              onCreateSwap={handleCreateSwap}
            />

            <DexQuoteDisplay quote={quote} useMockData={useMockData} />
          </div>

          <DexFeaturesSection />
        </div>
      </section>
    </PageLayout>
  );
};

export default DexAggregator;
