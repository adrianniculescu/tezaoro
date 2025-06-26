
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { useChangellyExchange } from '@/hooks/useChangellyExchange';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import ExchangeInfoCards from '@/components/exchange/ExchangeInfoCards';
import ExchangeStatusBanner from '@/components/exchange/ExchangeStatusBanner';
import ApiTestButton from '@/components/exchange/ApiTestButton';
import ChangellyApiKeyForm from '@/components/exchange/ChangellyApiKeyForm';

const Exchange = () => {
  console.log('Exchange component: Rendering');
  
  const { toast } = useToast();
  const { loading, error, getCurrencies, getExchangeAmount } = useChangellyExchange();
  
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [currencies, setCurrencies] = useState(['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc']);
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  
  // Load available currencies on component mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        console.log('🚀 Starting currency load...');
        const availableCurrencies = await getCurrencies();
        if (availableCurrencies && Array.isArray(availableCurrencies)) {
          setCurrencies(availableCurrencies.slice(0, 20)); // Limit to first 20 currencies
          console.log('✅ Successfully loaded currencies from API');
          setApiError(null);
          setUseMockData(false);
          setShowApiKeyForm(false);
          
          toast({
            title: "Live Exchange Rates Active",
            description: "Connected to Changelly API successfully",
          });
        }
      } catch (err) {
        console.log('❌ Failed to load currencies from API:', err);
        const errorMessage = error || (err instanceof Error ? err.message : 'Unable to connect to exchange API');
        setApiError(errorMessage);
        setUseMockData(true);
        
        // Show API key form if it's a placeholder key error
        if (errorMessage.includes('placeholder') || errorMessage.includes('PLACEHOLDER')) {
          setShowApiKeyForm(true);
        }
        
        toast({
          title: "API Connection Failed",
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

    try {
      const result = await getExchangeAmount(fromCurrency, toCurrency, amount);
      setExchangeAmount(result);
      
      toast({
        title: "Exchange Rate Calculated",
        description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
      });
    } catch (err) {
      console.error('Exchange calculation failed:', err);
      
      toast({
        title: "Calculation Failed",
        description: "Unable to calculate exchange rate. Please check your API configuration.",
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
          <div className="mb-6 flex justify-center">
            <ApiTestButton />
          </div>
          
          <ExchangeStatusBanner 
            apiError={apiError}
            useMockData={useMockData}
          />
          
          {showApiKeyForm && (
            <ChangellyApiKeyForm />
          )}
          
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
