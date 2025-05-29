
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building, Shield, CheckCircle, Globe, Clock, Smartphone, Zap, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ChangellyAPI, FIAT_PROVIDERS, PAYMENT_METHODS } from '@/utils/changelly';
import { useToast } from '@/hooks/use-toast';
import FiatProviderCard from '@/components/FiatProviderCard';

const FiatGateway = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [cryptocurrency, setCryptocurrency] = useState('btc');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');
  const { toast } = useToast();

  const api = new ChangellyAPI(true); // Using sandbox for development

  // Test Fiat API connection on component mount
  useEffect(() => {
    testFiatApiConnection();
  }, []);

  const testFiatApiConnection = async () => {
    console.log('Testing Changelly Fiat API connection...');
    
    try {
      const result = await api.testFiatConnection();
      
      if (result.success) {
        setApiStatus('connected');
        toast({
          title: "Fiat API Connected",
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Fiat API Connection Error:', error);
      setApiStatus('error');
      
      toast({
        title: "Fiat API Connection Failed",
        description: "Using demo data for interface testing",
        variant: "destructive",
      });
    }
  };

  const fiatCurrencies = [
    { value: 'usd', label: 'USD - US Dollar' },
    { value: 'eur', label: 'EUR - Euro' },
    { value: 'gbp', label: 'GBP - British Pound' },
    { value: 'jpy', label: 'JPY - Japanese Yen' },
    { value: 'cad', label: 'CAD - Canadian Dollar' },
    { value: 'aud', label: 'AUD - Australian Dollar' },
    { value: 'brl', label: 'BRL - Brazilian Real' }
  ];

  const cryptocurrencies = [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'usdt', label: 'Tether (USDT)' },
    { value: 'bnb', label: 'BNB (BNB)' },
    { value: 'ada', label: 'Cardano (ADA)' }
  ];

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return CreditCard;
      case 'apple_pay': case 'google_pay': return Smartphone;
      case 'sepa': case 'faster_payments': case 'ach': return Building;
      case 'pix': return Zap;
      case 'skrill': return Wallet;
      default: return CreditCard;
    }
  };

  const selectedPaymentMethodData = PAYMENT_METHODS.find(method => method.id === paymentMethod);
  const supportedProviders = FIAT_PROVIDERS.filter(provider => 
    provider.supportedMethods.some(method => 
      method.toLowerCase().includes(selectedPaymentMethodData?.name.toLowerCase() || '') ||
      selectedPaymentMethodData?.name.toLowerCase().includes(method.toLowerCase())
    )
  );

  const calculateFees = () => {
    const baseAmount = parseFloat(amount) || 0;
    const changellyFee = baseAmount * 0.02; // 2% Changelly fee
    const provider = FIAT_PROVIDERS.find(p => p.id === selectedProvider);
    
    if (!provider) return { providerFee: 0, changellyFee, total: baseAmount + changellyFee };
    
    // Simplified fee calculation (in practice, you'd get this from the API)
    const providerFeePercent = 0.025; // Example: 2.5%
    const providerFee = baseAmount * providerFeePercent;
    
    return {
      providerFee,
      changellyFee,
      total: baseAmount + providerFee + changellyFee
    };
  };

  const handleGetQuote = async () => {
    if (!amount || !selectedProvider) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount and select a provider",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const quote = await api.getFiatQuote({
        from: currency,
        to: cryptocurrency,
        amount,
        provider: selectedProvider,
        paymentMethod
      });
      
      console.log('Fiat quote received:', quote);
      
      toast({
        title: "Quote Retrieved",
        description: `Quote generated for ${amount} ${currency.toUpperCase()} to ${cryptocurrency.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Failed to get quote:', error);
      
      toast({
        title: "Quote Failed",
        description: "Could not retrieve quote. Using demo calculation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fees = calculateFees();

  return (
    <PageLayout title="Fiat Gateway">
      <PageHeader 
        title="Buy & Sell Cryptocurrency" 
        description="Convert between traditional currencies and cryptocurrencies with Changelly's integrated fiat providers"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* API Status */}
          <Card className="glass-card bg-card p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Fiat API Status:</span>
                {apiStatus === 'connected' ? (
                  <Badge variant="default" className="bg-green-500">Connected</Badge>
                ) : apiStatus === 'error' ? (
                  <Badge variant="destructive">Disconnected</Badge>
                ) : (
                  <Badge variant="secondary">Testing...</Badge>
                )}
              </div>
              <Button 
                onClick={testFiatApiConnection} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                Test Connection
              </Button>
            </div>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card bg-card p-6 text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Global Support</h3>
              <p className="text-muted-foreground">Support for 40+ fiat currencies worldwide</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
              <p className="text-muted-foreground">Instant card payments, quick bank transfers</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground">KYC/AML compliant with bank-grade security</p>
            </Card>
          </div>

          {/* Main Widget */}
          <Card className="glass-card bg-card p-8 max-w-6xl mx-auto">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="buy">Buy Crypto</TabsTrigger>
                <TabsTrigger value="sell">Sell Crypto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Buy Cryptocurrency</h2>
                  <p className="text-muted-foreground">Purchase crypto using Changelly's integrated fiat providers</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Order Configuration */}
                  <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">You Pay</label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="flex-1"
                            />
                            <Select value={currency} onValueChange={setCurrency}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fiatCurrencies.map((curr) => (
                                  <SelectItem key={curr.value} value={curr.value}>
                                    {curr.value.toUpperCase()}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">You Get</label>
                          <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {cryptocurrencies.map((crypto) => (
                                <SelectItem key={crypto.value} value={crypto.value}>
                                  {crypto.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Payment Method</label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PAYMENT_METHODS.map((method) => {
                                const Icon = getPaymentMethodIcon(method.id);
                                return (
                                  <SelectItem key={method.id} value={method.id}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-4 w-4" />
                                      {method.name}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedPaymentMethodData && (
                          <div className="text-xs text-muted-foreground p-3 bg-muted rounded">
                            <p><strong>Processing Time:</strong> {selectedPaymentMethodData.processingTime}</p>
                            <p><strong>Supported:</strong> {selectedPaymentMethodData.currencies.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Order Summary */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Cost Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>{amount || '0.00'} {currency.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Provider Fee:</span>
                          <span>${fees.providerFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Changelly Fee (2%):</span>
                          <span>${fees.changellyFee.toFixed(2)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total Cost:</span>
                          <span>${fees.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-primary">
                          <span>You Receive:</span>
                          <span>~{((parseFloat(amount) || 0) / 45000).toFixed(6)} {cryptocurrency.toUpperCase()}</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Provider Selection */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">
                      Choose Provider ({supportedProviders.length} available for {selectedPaymentMethodData?.name})
                    </h3>
                    
                    <div className="grid gap-4 mb-6">
                      {supportedProviders.map((provider) => (
                        <FiatProviderCard
                          key={provider.id}
                          provider={provider}
                          selectedMethod={selectedPaymentMethodData?.name || ''}
                          onSelect={setSelectedProvider}
                          isSelected={selectedProvider === provider.id}
                        />
                      ))}
                    </div>

                    {supportedProviders.length === 0 && (
                      <Card className="p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          No providers support the selected payment method
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try selecting a different payment method to see available providers
                        </p>
                      </Card>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        onClick={handleGetQuote}
                        disabled={!amount || !selectedProvider || loading}
                        className="w-full"
                        variant="outline"
                      >
                        {loading ? 'Getting Quote...' : 'Get Quote'}
                      </Button>
                      
                      <Button
                        disabled={!selectedProvider}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Proceed to Payment
                      </Button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                      <p>Powered by Changelly • Secure & Regulated</p>
                      <div className="flex justify-center gap-2 mt-2">
                        <Badge variant="secondary">6 Providers</Badge>
                        <Badge variant="secondary">40+ Currencies</Badge>
                        <Badge variant="secondary">KYC Optional</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Sell Cryptocurrency</h2>
                  <p className="text-muted-foreground">Convert your crypto to fiat currency</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">You Send</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Select value={cryptocurrency} onValueChange={setCryptocurrency}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {cryptocurrencies.map((crypto) => (
                              <SelectItem key={crypto.value} value={crypto.value}>
                                {crypto.value.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">You Receive</label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fiatCurrencies.map((curr) => (
                            <SelectItem key={curr.value} value={curr.value}>
                              {curr.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Payout Method</label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="card">Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4 bg-muted/50">
                      <h4 className="font-semibold mb-3">Payout Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Crypto Value:</span>
                          <span>~${amount || '0.00'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span>1.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Fee:</span>
                          <span>~$1.50</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>You Receive:</span>
                          <span>~{currency.toUpperCase()} 0.00</span>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bank Details</label>
                      <Input placeholder="Account Number" />
                      <Input placeholder="Routing Number" />
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                  Start Sell Order
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Provider Information */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Integrated Providers</h3>
              <div className="space-y-3">
                {FIAT_PROVIDERS.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between">
                    <span className="font-medium">{provider.name}</span>
                    <Badge variant="outline">${provider.nonKycLimit} limit</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
              <div className="space-y-2">
                {PAYMENT_METHODS.slice(0, 6).map((method) => {
                  const Icon = getPaymentMethodIcon(method.id);
                  return (
                    <div key={method.id} className="flex items-center gap-2 text-sm">
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{method.name}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• No KYC up to $1,000</li>
                <li>• Competitive fees from 0%</li>
                <li>• Multiple fiat currencies</li>
                <li>• Instant to 3-day processing</li>
                <li>• Regulated providers</li>
                <li>• 24/7 support</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FiatGateway;
