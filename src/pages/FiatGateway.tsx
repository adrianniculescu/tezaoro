
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building, Shield, CheckCircle, Globe, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FiatGateway = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [cryptocurrency, setCryptocurrency] = useState('btc');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const fiatCurrencies = [
    { value: 'usd', label: 'USD - US Dollar' },
    { value: 'eur', label: 'EUR - Euro' },
    { value: 'gbp', label: 'GBP - British Pound' },
    { value: 'jpy', label: 'JPY - Japanese Yen' },
    { value: 'cad', label: 'CAD - Canadian Dollar' }
  ];

  const cryptocurrencies = [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'usdt', label: 'Tether (USDT)' },
    { value: 'bnb', label: 'BNB (BNB)' },
    { value: 'ada', label: 'Cardano (ADA)' }
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'bank', label: 'Bank Transfer', icon: Building }
  ];

  return (
    <PageLayout title="Fiat Gateway">
      <PageHeader 
        title="Buy & Sell Cryptocurrency" 
        description="Convert between traditional currencies and cryptocurrencies with ease"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
          <Card className="glass-card bg-card p-8 max-w-4xl mx-auto">
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="buy">Buy Crypto</TabsTrigger>
                <TabsTrigger value="sell">Sell Crypto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Buy Cryptocurrency</h2>
                  <p className="text-muted-foreground">Purchase crypto with your credit card or bank transfer</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                          <SelectTrigger className="w-32">
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
                      <div className="grid grid-cols-2 gap-2">
                        {paymentMethods.map((method) => (
                          <Button
                            key={method.value}
                            variant={paymentMethod === method.value ? "default" : "outline"}
                            onClick={() => setPaymentMethod(method.value)}
                            className="flex items-center gap-2 h-12"
                          >
                            <method.icon className="h-4 w-4" />
                            <span className="text-sm">{method.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4 bg-muted/50">
                      <h4 className="font-semibold mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span>{amount || '0.00'} {currency.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Processing Fee:</span>
                          <span>2.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Network Fee:</span>
                          <span>~$2.00</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>You Receive:</span>
                          <span>~0.00123 {cryptocurrency.toUpperCase()}</span>
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Wallet Address</label>
                      <Input placeholder="Enter your wallet address" />
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                  Continue to Payment
                </Button>

                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 Support</span>
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

          {/* Info Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Supported Currencies</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'].map((curr) => (
                    <Badge key={curr} variant="secondary">{curr}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  And 30+ more fiat currencies supported globally
                </p>
              </div>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Processing Times</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Credit/Debit Card:</span>
                  <span className="text-green-500">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Transfer:</span>
                  <span className="text-blue-500">1-3 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Crypto Delivery:</span>
                  <span className="text-green-500">5-30 min</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Security & Compliance</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• KYC/AML verified transactions</li>
                <li>• PCI DSS compliant payments</li>
                <li>• Multi-signature wallets</li>
                <li>• Insurance protection</li>
                <li>• 24/7 fraud monitoring</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FiatGateway;
