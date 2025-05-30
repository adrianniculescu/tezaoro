
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import DexStatusBanner from '@/components/dex/DexStatusBanner';
import DexSwapInterface from '@/components/dex/DexSwapInterface';
import DexQuoteDisplay from '@/components/dex/DexQuoteDisplay';
import DexFeaturesSection from '@/components/dex/DexFeaturesSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import { SupabaseChangellyAPI } from '@/utils/changelly/supabaseApi';
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

const DexAggregatorContent = () => {
  console.log('DexAggregatorContent: Starting render');
  
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('1');
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(true);

  // Create the API instance safely
  const api = useMemo(() => {
    console.log('DexAggregatorContent: Creating API instance');
    try {
      return new SupabaseChangellyAPI();
    } catch (error) {
      console.error('DexAggregatorContent: API creation failed:', error);
      return null;
    }
  }, []);

  // Test connection on mount
  useEffect(() => {
    console.log('DexAggregatorContent: Testing API connection');
    
    const testConnection = async () => {
      if (!api) {
        console.log('DexAggregatorContent: No API, using mock data');
        setUseMockData(true);
        setApiError('Failed to initialize API');
        return;
      }

      try {
        const result = await api.testDexConnection();
        console.log('DexAggregatorContent: Connection test result:', result);
        
        if (result.success) {
          setUseMockData(false);
          setApiError(null);
          toast({
            title: "Connected",
            description: "DEX API connected successfully",
            variant: "default",
          });
        } else {
          setUseMockData(true);
          setApiError(result.message);
          toast({
            title: "Demo Mode",
            description: "Using demo data",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('DexAggregatorContent: Connection test failed:', error);
        setUseMockData(true);
        setApiError('Connection failed');
        toast({
          title: "Demo Mode",
          description: "Using demo data due to connection issues",
          variant: "default",
        });
      }
    };

    testConnection();
  }, [api]);

  // Fetch supported chains
  const { data: chains, isLoading: chainsLoading } = useQuery({
    queryKey: ['dex-chains'],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching chains');
      if (useMockData || !api) {
        return MOCK_CHAINS;
      }
      
      try {
        const result = await api.getDexChains();
        return result || MOCK_CHAINS;
      } catch (error) {
        console.warn('DexAggregatorContent: Chains API failed:', error);
        return MOCK_CHAINS;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch tokens for selected chain
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ['dex-tokens', selectedChain],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching tokens for chain:', selectedChain);
      if (useMockData || !api) {
        return MOCK_TOKENS;
      }
      
      try {
        const result = await api.getDexTokens(parseInt(selectedChain));
        return result || MOCK_TOKENS;
      } catch (error) {
        console.warn('DexAggregatorContent: Tokens API failed:', error);
        return MOCK_TOKENS;
      }
    },
    enabled: !!selectedChain,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get quote
  const { data: quote, isLoading: quoteLoading, refetch: refetchQuote } = useQuery({
    queryKey: ['dex-quote', fromToken, toToken, fromAmount, selectedChain, slippage],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching quote');
      
      if (useMockData || !api) {
        return {
          toAmount: (parseFloat(fromAmount) * 0.95).toString(),
          rate: '0.95',
          estimatedGas: '21000',
          priceImpact: '0.5',
          protocols: ['Demo Protocol']
        };
      }
      
      try {
        const result = await api.getDexQuote({
          fromToken,
          toToken,
          amount: fromAmount,
          chainId: parseInt(selectedChain),
          slippage: parseFloat(slippage),
          userAddress: userAddress || undefined
        });
        
        return result;
      } catch (error) {
        console.warn('DexAggregatorContent: Quote API failed:', error);
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
    console.log('DexAggregatorContent: Swapping tokens');
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleGetQuote = () => {
    console.log('DexAggregatorContent: Getting quote manually');
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

    if (useMockData || !api) {
      toast({
        title: "Demo Mode",
        description: "This is a demo. In production, your swap transaction would be prepared here.",
        variant: "default",
      });
      return;
    }

    try {
      console.log('DexAggregatorContent: Creating swap transaction');
      
      const swapData = await api.getDexSwapTransaction({
        fromToken,
        toToken,
        amount: fromAmount,
        chainId: parseInt(selectedChain),
        userAddress,
        slippage: parseFloat(slippage)
      });

      console.log('DexAggregatorContent: Swap transaction data:', swapData);
      toast({
        title: "Swap Transaction Ready",
        description: "Your swap transaction has been prepared. Please sign it in your wallet.",
      });
    } catch (error) {
      console.error('DexAggregatorContent: Failed to create swap:', error);
      toast({
        title: "Swap Failed",
        description: error instanceof Error ? error.message : "Failed to create swap transaction",
        variant: "destructive",
      });
    }
  };

  console.log('DexAggregatorContent: Rendering content');
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <DexStatusBanner apiError={apiError} useMockData={useMockData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ErrorBoundary>
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
          </ErrorBoundary>

          <ErrorBoundary>
            <DexQuoteDisplay quote={quote} useMockData={useMockData} />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <DexFeaturesSection />
        </ErrorBoundary>
      </div>
    </section>
  );
};

const DexAggregator = () => {
  console.log('DexAggregator: Main component rendering');
  
  return (
    <ErrorBoundary>
      <PageLayout title="DEX Aggregator">
        <PageHeader 
          title="DEX Aggregator" 
          description="Access the best prices across 200+ decentralized exchanges with MEV protection and gas optimization"
        />
        <DexAggregatorContent />
      </PageLayout>
    </ErrorBoundary>
  );
};

export default DexAggregator;
