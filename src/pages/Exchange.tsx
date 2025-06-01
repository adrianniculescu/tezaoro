
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { useToast } from '@/hooks/use-toast';
import ExchangeStatusBanner from '@/components/exchange/ExchangeStatusBanner';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import ExchangeInfoCards from '@/components/exchange/ExchangeInfoCards';

const Exchange = () => {
  console.log('Exchange component: Starting render');
  
  const { toast } = useToast();
  
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  
  const currencies = ['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc'];
  
  // Simple mock rates
  const mockRates: Record<string, Record<string, number>> = {
    btc: { eth: 15.5, usdt: 45000, bnb: 150, ada: 50000 },
    eth: { btc: 0.065, usdt: 2900, bnb: 9.5, ada: 3200 },
    usdt: { btc: 0.000022, eth: 0.00034, bnb: 0.0033, ada: 1.1 }
  };

  const handleExchange = () => {
    console.log('Exchange: Calculate button clicked');
    
    if (!amount || !fromCurrency || !toCurrency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
    const result = (parseFloat(amount) * rate).toFixed(6);
    setExchangeAmount(result);
    
    toast({
      title: "Demo Exchange Rate",
      description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
    });
  };

  const swapCurrencies = () => {
    console.log('Exchange: Swap currencies');
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount('');
    setExchangeAmount('');
  };

  console.log('Exchange component: About to return JSX');

  return (
    <PageLayout title="Crypto Exchange">
      <PageHeader 
        title="Instant Crypto Exchange" 
        description="Trade cryptocurrencies instantly with competitive rates"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ExchangeStatusBanner />

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
          />

          <ExchangeInfoCards />
        </div>
      </section>
    </PageLayout>
  );
};

export default Exchange;
