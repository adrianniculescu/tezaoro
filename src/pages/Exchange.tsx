
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChangellyAPI } from '@/utils/changelly';

const Exchange = () => {
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);

  const api = new ChangellyAPI(true); // Using sandbox for development

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const currencyList = await api.getCurrencies();
        setCurrencies(currencyList.slice(0, 20)); // Limit to top 20 for demo
      } catch (error) {
        console.error('Failed to load currencies:', error);
        // Fallback currencies
        setCurrencies(['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc', 'bch']);
      }
    };

    loadCurrencies();
  }, []);

  const handleExchange = async () => {
    if (!amount || !fromCurrency || !toCurrency) return;

    setLoading(true);
    try {
      const result = await api.getExchangeAmount(fromCurrency, toCurrency, amount);
      setExchangeAmount(result.toString());
    } catch (error) {
      console.error('Exchange calculation failed:', error);
      setExchangeAmount('Error calculating exchange');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount('');
    setExchangeAmount('');
  };

  return (
    <PageLayout title="Crypto Exchange">
      <PageHeader 
        title="Instant Crypto Exchange" 
        description="Trade cryptocurrencies instantly with competitive rates and zero hidden fees"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Features Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="glass-card bg-card p-4 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Instant</h3>
              <p className="text-sm text-muted-foreground">Lightning fast trades</p>
            </Card>
            <Card className="glass-card bg-card p-4 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-muted-foreground">Bank-grade security</p>
            </Card>
            <Card className="glass-card bg-card p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Best Rates</h3>
              <p className="text-sm text-muted-foreground">Competitive pricing</p>
            </Card>
            <Card className="glass-card bg-card p-4 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Low Fees</h3>
              <p className="text-sm text-muted-foreground">Transparent costs</p>
            </Card>
          </div>

          {/* Exchange Widget */}
          <Card className="glass-card bg-card p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Exchange Cryptocurrencies</h2>
                <p className="text-muted-foreground">Swap your crypto instantly with our secure exchange</p>
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
                    disabled={!amount || loading}
                    className="w-full"
                    variant="outline"
                  >
                    {loading ? 'Calculating...' : 'Get Exchange Rate'}
                  </Button>
                  
                  <Button
                    disabled={!exchangeAmount || exchangeAmount.includes('Error')}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Start Exchange
                  </Button>
                </div>

                {/* Info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>Rate updates every 15 seconds • No account required</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="secondary">500+ Coins</Badge>
                    <Badge variant="secondary">0.25% Fee</Badge>
                    <Badge variant="secondary">No KYC</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Why Choose Our Exchange?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• No registration required for instant exchanges</li>
                <li>• Support for 500+ cryptocurrencies</li>
                <li>• Competitive rates with transparent fees</li>
                <li>• 24/7 customer support</li>
                <li>• Advanced security measures</li>
              </ul>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">How It Works</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li>1. Select currencies and enter amount</li>
                <li>2. Review exchange rate and fees</li>
                <li>3. Provide your wallet address</li>
                <li>4. Send your cryptocurrency</li>
                <li>5. Receive exchanged funds instantly</li>
              </ol>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Exchange;
