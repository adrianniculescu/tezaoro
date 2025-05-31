
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, TrendingUp, Shield, Zap, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DexStatusBanner from '@/components/dex/DexStatusBanner';
import { useChangellyExchange } from '@/hooks/useChangellyExchange';

const Exchange = () => {
  console.log('Exchange component rendering...');
  
  // Hooks must be called at the top level - not in try-catch
  const { toast } = useToast();
  
  let hookData;
  let hookError = null;
  
  try {
    console.log('Exchange: About to call useChangellyExchange hook');
    hookData = useChangellyExchange();
    console.log('Exchange: useChangellyExchange hook successful', hookData);
  } catch (err) {
    console.error('Exchange: Error in useChangellyExchange hook:', err);
    hookError = err;
  }
  
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [currencies, setCurrencies] = useState<string[]>(['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc', 'bch', 'xlm', 'xrp']);
  const [apiStatus, setApiStatus] = useState<'connected' | 'error' | 'loading'>('loading');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  
  // If hook failed, render fallback
  if (hookError) {
    console.error('Exchange: Hook error, rendering fallback');
    return (
      <PageLayout title="Crypto Exchange">
        <PageHeader 
          title="Instant Crypto Exchange" 
          description="Trade cryptocurrencies instantly with competitive rates and zero hidden fees"
        />
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Card className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Exchange Temporarily Unavailable</h2>
              <p className="text-muted-foreground">
                We're experiencing technical difficulties. Please try again later.
              </p>
            </Card>
          </div>
        </section>
      </PageLayout>
    );
  }
  
  const { loading, error, getCurrencies, getExchangeAmount } = hookData;
  
  // Mock exchange rates for fallback
  const mockRates: Record<string, Record<string, number>> = {
    btc: { eth: 15.5, usdt: 45000, bnb: 150, ada: 50000 },
    eth: { btc: 0.065, usdt: 2900, bnb: 9.5, ada: 3200 },
    usdt: { btc: 0.000022, eth: 0.00034, bnb: 0.0033, ada: 1.1 },
    bnb: { btc: 0.0067, eth: 0.105, usdt: 300, ada: 330 },
    ada: { btc: 0.00002, eth: 0.00031, usdt: 0.91, bnb: 0.003 }
  };

  useEffect(() => {
    console.log('Exchange useEffect running...');
    initializeExchange();
  }, []);

  const initializeExchange = async () => {
    try {
      console.log('Exchange: Initializing exchange...');
      setApiStatus('loading');
      const availableCurrencies = await getCurrencies();
      
      if (availableCurrencies && availableCurrencies.length > 0) {
        setCurrencies(availableCurrencies);
        setApiStatus('connected');
        setUseMockData(false);
        setApiError(null);
        console.log('Exchange: Connected to live API');
        
        toast({
          title: "Exchange Ready",
          description: "Connected to live exchange rates",
        });
      } else {
        throw new Error('No currencies received from API');
      }
    } catch (err) {
      console.error('Failed to initialize exchange:', err);
      setApiStatus('error');
      setUseMockData(true);
      setApiError('Live exchange temporarily unavailable - using demo data');
      
      toast({
        title: "Demo Mode",
        description: "Using sample data while connecting to live rates",
        variant: "destructive",
      });
    }
  };

  const handleExchange = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log(`Calculating exchange: ${amount} ${fromCurrency} to ${toCurrency}`);
    
    try {
      if (useMockData) {
        // Use mock data as fallback
        const rate = mockRates[fromCurrency]?.[toCurrency] || 1;
        const result = (parseFloat(amount) * rate).toFixed(6);
        setExchangeAmount(result);
        
        toast({
          title: "Demo Exchange Rate",
          description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()} (Demo)`,
        });
      } else {
        // Use real API
        const result = await getExchangeAmount(fromCurrency, toCurrency, amount);
        setExchangeAmount(result);
        
        toast({
          title: "Live Exchange Rate",
          description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
        });
      }
    } catch (err) {
      console.error('Exchange calculation failed:', err);
      setExchangeAmount('Error calculating exchange');
      
      toast({
        title: "Calculation Failed",
        description: error || "Could not calculate exchange rate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount('');
    setExchangeAmount('');
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected':
        return 'Connected to live exchange rates';
      case 'error':
        return apiError || 'Connection failed - using demo data';
      case 'loading':
        return 'Connecting to exchange API...';
      default:
        return 'Checking connection...';
    }
  };

  console.log('Exchange component about to render main JSX...');

  return (
    <PageLayout title="Crypto Exchange">
      <PageHeader 
        title="Instant Crypto Exchange" 
        description="Trade cryptocurrencies instantly with competitive rates and zero hidden fees"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Status Banner */}
          <DexStatusBanner apiError={apiError} useMockData={useMockData} />

          {/* API Status Card */}
          <Card className="glass-card bg-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Exchange API Status</h3>
              {getStatusIcon()}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{getStatusText()}</p>
            <div className="flex gap-2">
              <Button 
                onClick={initializeExchange} 
                variant="outline" 
                size="sm"
                disabled={loading || apiStatus === 'loading'}
              >
                {loading || apiStatus === 'loading' ? 'Connecting...' : 'Reconnect'}
              </Button>
            </div>
          </Card>

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
                <p className="text-muted-foreground">
                  {useMockData ? 'Demo exchange with sample data' : 'Live exchange with real-time rates'}
                </p>
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
                  <p>{useMockData ? 'Demo rates update every 15 seconds' : 'Live rates update in real-time'} • No account required</p>
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
