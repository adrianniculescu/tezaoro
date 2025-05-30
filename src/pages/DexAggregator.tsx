
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import DexStatusBanner from '@/components/dex/DexStatusBanner';
import DexSwapInterface from '@/components/dex/DexSwapInterface';
import DexQuoteDisplay from '@/components/dex/DexQuoteDisplay';
import DexFeaturesSection from '@/components/dex/DexFeaturesSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import { toast } from '@/hooks/use-toast';

// Static demo data
const DEMO_CHAINS = [
  { chainId: 1, id: 1, name: 'Ethereum' },
  { chainId: 56, id: 56, name: 'BSC' },
  { chainId: 137, id: 137, name: 'Polygon' }
];

const DEMO_TOKENS = [
  { address: '0x...eth', symbol: 'ETH' },
  { address: '0x...usdt', symbol: 'USDT' },
  { address: '0x...usdc', symbol: 'USDC' },
  { address: '0x...wbtc', symbol: 'WBTC' }
];

const DexAggregatorContent = () => {
  console.log('DexAggregatorContent: Starting render');
  
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [selectedChain, setSelectedChain] = useState('1');
  const [slippage, setSlippage] = useState('1.0');
  const [userAddress, setUserAddress] = useState('');
  const [quote, setQuote] = useState<any>(null);

  const chains = DEMO_CHAINS;
  const tokens = DEMO_TOKENS;
  const useMockData = true;
  const apiError = null;

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

    // Generate demo quote
    const demoQuote = {
      toAmount: (parseFloat(fromAmount) * 0.95).toString(),
      rate: '0.95',
      estimatedGas: '21000',
      priceImpact: '0.5',
      protocols: ['Demo Protocol']
    };
    
    setQuote(demoQuote);
    
    toast({
      title: "Quote Generated",
      description: "Demo quote calculated successfully",
      variant: "default",
    });
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

    toast({
      title: "Demo Mode",
      description: "This is a demo. In production, your swap transaction would be prepared here.",
      variant: "default",
    });
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
              chains={chains}
              tokens={tokens}
              quote={quote}
              chainsLoading={false}
              tokensLoading={false}
              quoteLoading={false}
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
