import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { useChangellyExchange } from '@/hooks/useChangellyExchange';
import ExchangeStatusBanner from '@/components/exchange/ExchangeStatusBanner';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import ExchangeInfoCards from '@/components/exchange/ExchangeInfoCards';

const Exchange = () => {
  console.log('Exchange component: Rendering');
  
  const { toast } = useToast();
  const { loading, error, getCurrencies, getExchangeAmount } = useChangellyExchange();
  
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [currencies, setCurrencies] = useState(['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc']);
  const [useMockData, setUseMockData] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Fallback mock rates for when API is unavailable
  const mockRates: Record<string, Record<string, number>> = {
    btc: { eth: 15.5, usdt: 45000, bnb: 150, ada: 50000 },
    eth: { btc: 0.065, usdt: 2900, bnb: 9.5, ada: 3200 },
    usdt: { btc: 0.000022, eth: 0.00034, bnb: 0.0033, ada: 1.1 }
  };

  // Load available currencies on component mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        console.log('🚀 Starting currency load...');
        const availableCurrencies = await getCurrencies();
        if (availableCurrencies && Array.isArray(availableCurrencies)) {
          setCurrencies(availableCurrencies.slice(0, 20)); // Limit to first 20 currencies
          setUseMockData(false);
          setApiError(null);
          console.log('✅ Successfully loaded currencies from API');
          
          toast({
            title: "Live Exchange Rates Active",
            description: "Connected to Changelly API successfully",
          });
        }
      } catch (err) {
        console.log('❌ Failed to load currencies from API:', err);
        setUseMockData(true);
        
        // Provide clearer error messaging for placeholder credentials
        let errorMessage = error || (err instanceof Error ? err.message : 'Unable to connect to live exchange rates');
        
        if (errorMessage.includes('placeholder') || errorMessage.includes('your_')) {
          errorMessage = 'Please update your Changelly API credentials in the project settings to enable live rates';
        }
        
        setApiError(errorMessage);
        
        toast({
          title: "Using Demo Mode",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };

    loadCurrencies();
  }, [getCurrencies, error, toast]);

  const handleExchange = async () => {
    console.log('Exchange: Calculate button clicked');
    
    if (!amount || !fromCurrency || !toCurrency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (useMockData) {
      // Use mock data
      const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
      const result = (parseFloat(amount) * rate).toFixed(6);
      setExchangeAmount(result);
      
      toast({
        title: "Demo Exchange Rate",
        description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
      });
      return;
    }

    // Use real API
    try {
      const result = await getExchangeAmount(fromCurrency, toCurrency, amount);
      setExchangeAmount(result);
      
      toast({
        title: "Live Exchange Rate",
        description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
      });
    } catch (err) {
      console.error('Exchange calculation failed:', err);
      
      // Fall back to mock data if API fails
      setUseMockData(true);
      const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
      const result = (parseFloat(amount) * rate).toFixed(6);
      setExchangeAmount(result);
      
      toast({
        title: "Using Demo Rate",
        description: "API unavailable - showing sample rate",
        variant: "destructive",
      });
    }
  };

  const swapCurrencies = () => {
    console.log('Exchange: Swap currencies');
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount('');
    setExchangeAmount('');
  };

  return (
    <PageLayout title="Crypto Exchange">
      <PageHeader 
        title="Instant Crypto Exchange" 
        description="Trade cryptocurrencies instantly with competitive rates"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ExchangeStatusBanner apiError={apiError} useMockData={useMockData} />

          <ExchangeForm
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={amount}
            exchangeAmount={exchangeAmount}
            currencies={currencies}
            onFromCurrencyChange={setFromCurrency}
            onToCurrencyChange={setToCurrency}
            onAmountChange={setAmount}
            onSwapCurrencies={swapCurrencies}
            onCalculateRate={handleExchange}
            loading={loading}
          />

          <ExchangeInfoCards />
        </div>
      </section>
    </PageLayout>
  );
};

export default Exchange;
