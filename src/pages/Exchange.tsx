import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, TrendingUp, Shield, Zap, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SecureChangellyAPI } from '@/utils/changelly/secureApi';
import { useToast } from '@/components/ui/use-toast';
import DexStatusBanner from '@/components/dex/DexStatusBanner';

const Exchange = () => {
  console.log('Exchange component rendering...');
  
  const [fromCurrency, setFromCurrency] = useState('btc');
  const [toCurrency, setToCurrency] = useState('eth');
  const [amount, setAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');
  const [connectionTest, setConnectionTest] = useState<string>('');
  const [apiError, setApiError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  const { toast } = useToast();

  const secureApi = new SecureChangellyAPI();

  // Test API connection on component mount
  useEffect(() => {
    console.log('Exchange useEffect running...');
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    console.log('Testing secure Changelly API connection...');
    setConnectionTest('Testing secure connection...');
    setApiError(null);
    setUseMockData(false);
    
    try {
      const result = await secureApi.testConnection();
      
      if (result.success && result.data) {
        setApiStatus('connected');
        setConnectionTest(`✅ Securely connected! Retrieved ${result.data.length} currencies`);
        setCurrencies(result.data.slice(0, 20)); // Limit to top 20 for demo
        
        toast({
          title: "Secure API Connection Successful",
          description: "Successfully connected to Changelly API via Supabase",
        });
      } else {
        throw new Error(result.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('Secure Changelly API Connection Error:', error);
      setApiStatus('error');
      setApiError(error instanceof Error ? error.message : 'Unknown connection error');
      setConnectionTest(`❌ Secure connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Fallback currencies for testing UI
      setCurrencies(['btc', 'eth', 'usdt', 'bnb', 'ada', 'dot', 'ltc', 'bch']);
      setUseMockData(true);
      
      toast({
        title: "Secure API Connection Failed",
        description: "Could not connect to Changelly API via Supabase. Using fallback data.",
        variant: "destructive",
      });
    }
  };

  const validateApiKeys = async () => {
    console.log('Validating API keys securely...');
    setLoading(true);
    
    try {
      // Test with a simple API call that requires authentication
      const minAmount = await secureApi.getMinAmount('btc', 'eth');
      console.log('Secure API Key validation successful:', minAmount);
      
      toast({
        title: "API Keys Valid",
        description: "Your Changelly API keys are working correctly via Supabase",
      });
      
      return true;
    } catch (error) {
      console.error('Secure API Key validation failed:', error);
      
      toast({
        title: "API Keys Invalid",
        description: "Please check your Changelly API keys in Supabase secrets",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
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

    setLoading(true);
    console.log(`Calculating exchange securely: ${amount} ${fromCurrency} to ${toCurrency}`);
    
    try {
      const result = await secureApi.getExchangeAmount(fromCurrency, toCurrency, amount);
      console.log('Secure exchange calculation result:', result);
      
      setExchangeAmount(result.toString());
      
      toast({
        title: "Exchange Rate Calculated",
        description: `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Secure exchange calculation failed:', error);
      setExchangeAmount('Error calculating exchange');
      
      toast({
        title: "Calculation Failed",
        description: "Could not calculate exchange rate. Please try again.",
        variant: "destructive",
      });
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

  console.log('Exchange component about to render JSX...');

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
              <h3 className="text-lg font-semibold">Secure API Connection Status</h3>
              {getStatusIcon()}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{connectionTest}</p>
            <div className="flex gap-2">
              <Button 
                onClick={testApiConnection} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                Test Secure Connection
              </Button>
              <Button 
                onClick={validateApiKeys} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                Validate API Keys
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
                    disabled={!amount || loading || apiStatus === 'error'}
                    className="w-full"
                    variant="outline"
                  >
                    {loading ? 'Calculating...' : 'Get Exchange Rate'}
                  </Button>
                  
                  <Button
                    disabled={!exchangeAmount || exchangeAmount.includes('Error') || apiStatus === 'error'}
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
