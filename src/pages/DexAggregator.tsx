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
  console.log('DexAggregatorContent: Component starting to render...');
  
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('1');
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Create the Supabase-based API instance
  const api = useMemo(() => new SupabaseChangellyAPI(), []);

  // Test connection on mount
  useEffect(() => {
    let isMounted = true;
    
    const testConnection = async () => {
      try {
        console.log('DexAggregatorContent: Starting connection test...');
        
        const result = await api.testDexConnection();
        console.log('DexAggregatorContent: DEX connection test result:', result);
        
        if (!isMounted) return;
        
        if (result.success) {
          console.log('DexAggregatorContent: DEX connection successful via Supabase');
          setUseMockData(false);
          setApiError(null);
          toast({
            title: "Connected",
            description: "DEX API connected successfully via Supabase",
            variant: "default",
          });
        } else {
          console.warn('DexAggregatorContent: DEX connection failed, using mock data');
          setUseMockData(true);
          setApiError(result.message);
          toast({
            title: "Demo Mode",
            description: result.message || "DEX API unavailable, showing demo interface",
            variant: "default",
          });
        }
      } catch (error) {
        console.error('DexAggregatorContent: Connection test failed:', error);
        if (isMounted) {
          setUseMockData(true);
          setApiError(error instanceof Error ? error.message : 'Connection failed');
          toast({
            title: "Demo Mode Active",
            description: "Using demo data due to API connection issues",
            variant: "default",
          });
        }
      } finally {
        if (isMounted) {
          setIsInitialized(true);
        }
      }
    };

    const timer = setTimeout(testConnection, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [api]);

  // Fetch supported chains
  const { data: chains, isLoading: chainsLoading } = useQuery({
    queryKey: ['dex-chains'],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching chains...');
      if (useMockData) {
        console.log('DexAggregatorContent: Using mock chains data');
        return MOCK_CHAINS;
      }
      
      try {
        const result = await api.getDexChains();
        console.log('DexAggregatorContent: Chains result:', result);
        return result || MOCK_CHAINS;
      } catch (error) {
        console.warn('DexAggregatorContent: Chains API failed, using mock data:', error);
        return MOCK_CHAINS;
      }
    },
    enabled: isInitialized,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch tokens for selected chain
  const { data: tokens, isLoading: tokensLoading } = useQuery({
    queryKey: ['dex-tokens', selectedChain],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching tokens for chain:', selectedChain);
      if (useMockData) {
        console.log('DexAggregatorContent: Using mock tokens data');
        return MOCK_TOKENS;
      }
      
      try {
        const result = await api.getDexTokens(parseInt(selectedChain));
        console.log('DexAggregatorContent: Tokens result:', result);
        return result || MOCK_TOKENS;
      } catch (error) {
        console.warn('DexAggregatorContent: Tokens API failed, using mock data:', error);
        return MOCK_TOKENS;
      }
    },
    enabled: !!selectedChain && isInitialized,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // Get quote
  const { data: quote, isLoading: quoteLoading, refetch: refetchQuote } = useQuery({
    queryKey: ['dex-quote', fromToken, toToken, fromAmount, selectedChain, slippage],
    queryFn: async () => {
      console.log('DexAggregatorContent: Fetching quote with params:', {
        fromToken,
        toToken,
        amount: fromAmount,
        chainId: parseInt(selectedChain),
        slippage: parseFloat(slippage),
        userAddress: userAddress || undefined
      });
      
      if (useMockData) {
        console.log('DexAggregatorContent: Using mock quote data');
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
        
        console.log('DexAggregatorContent: Quote result:', result);
        return result;
      } catch (error) {
        console.warn('DexAggregatorContent: Quote API failed, using mock data:', error);
        return {
          toAmount: (parseFloat(fromAmount) * 0.95).toString(),
          rate: '0.95',
          estimatedGas: '21000',
          priceImpact: '0.5',
          protocols: ['Demo Protocol']
        };
      }
    },
    enabled: !!(fromToken && toToken && fromAmount && parseFloat(fromAmount) > 0 && isInitialized),
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

    if (useMockData) {
      toast({
        title: "Demo Mode",
        description: "This is a demo. In production, your swap transaction would be prepared here.",
        variant: "default",
      });
      return;
    }

    try {
      console.log('DexAggregatorContent: Creating swap transaction...');
      
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

  // Show loading state during initialization
  if (!isInitialized) {
    console.log('DexAggregatorContent: Showing loading state');
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <p className="text-muted-foreground">Initializing DEX aggregator...</p>
          </div>
        </div>
      </section>
    );
  }

  console.log('DexAggregatorContent: Rendering main content');
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
