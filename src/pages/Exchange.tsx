
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
          
          {/* Demo Notice */}
          <Card className="p-4 mb-8 border-blue-200 bg-blue-50">
            <div className="text-blue-700">
              <span className="font-medium">Demo Mode</span>
              <p className="text-sm text-blue-600 mt-1">
                This is a demo exchange using sample data for testing purposes.
              </p>
            </div>
          </Card>

          {/* Exchange Widget */}
          <Card className="glass-card bg-card p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Exchange Cryptocurrencies</h2>
                <p className="text-muted-foreground">Demo exchange with sample data</p>
              </div>

              <div className="space-y-4">
                {/* From Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">You Send</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency.toUpperCase()}
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
                    onClick={swapCurrencies}
                    className="rounded-full p-2"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">You Receive</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={exchangeAmount}
                        readOnly
                        className="text-lg bg-muted"
                      />
                    </div>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleExchange}
                    disabled={!amount}
                    className="w-full"
                    variant="outline"
                  >
                    Get Exchange Rate
                  </Button>
                  
                  <Button
                    disabled={!exchangeAmount}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Start Exchange (Demo)
                  </Button>
                </div>

                {/* Info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Demo rates for testing • No real transactions</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Cards */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Demo Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Sample exchange rates</li>
                <li>• No real transactions</li>
                <li>• Test the interface</li>
                <li>• Experience the flow</li>
              </ul>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Live exchange rates</li>
                <li>• Real transactions</li>
                <li>• 500+ cryptocurrencies</li>
                <li>• Competitive fees</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Exchange;
