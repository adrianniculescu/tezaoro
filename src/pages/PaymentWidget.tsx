
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Code, Settings, Zap, Shield, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PaymentWidget = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('btc');
  const [widgetStyle, setWidgetStyle] = useState('modern');

  const cryptocurrencies = [
    { value: 'btc', label: 'Bitcoin (BTC)' },
    { value: 'eth', label: 'Ethereum (ETH)' },
    { value: 'usdt', label: 'Tether (USDT)' },
    { value: 'bnb', label: 'BNB (BNB)' },
    { value: 'ada', label: 'Cardano (ADA)' }
  ];

  return (
    <PageLayout title="Payment Widget">
      <PageHeader 
        title="Cryptocurrency Payment Widget" 
        description="Accept crypto payments seamlessly with our embeddable widget solution"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card bg-card p-6 text-center">
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">Simple JavaScript embed with customizable styling</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Instant Payments</h3>
              <p className="text-muted-foreground">Real-time payment processing and notifications</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customizable UI</h3>
              <p className="text-muted-foreground">Match your brand with flexible theming options</p>
            </Card>
          </div>

          {/* Widget Demo */}
          <Card className="glass-card bg-card p-8 max-w-4xl mx-auto mb-12">
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="demo">Live Demo</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
              </TabsList>
              
              <TabsContent value="demo" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Payment Widget Demo</h2>
                  <p className="text-muted-foreground">Experience how customers will interact with your payment widget</p>
                </div>

                <div className="max-w-md mx-auto">
                  <Card className="p-6 border-2 border-primary/20">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Complete Your Purchase</h3>
                      <p className="text-sm text-muted-foreground">Pay with cryptocurrency</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Payment Currency</label>
                        <Select value={currency} onValueChange={setCurrency}>
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

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Pay {amount || '0.00'} {currency.toUpperCase()}
                      </Button>

                      <div className="text-center text-xs text-muted-foreground">
                        Powered by Tezaoro • Secure Payment
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="customize" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Widget Customization</h2>
                  <p className="text-muted-foreground">Customize the widget to match your brand</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Widget Style</label>
                      <Select value={widgetStyle} onValueChange={setWidgetStyle}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Primary Color</label>
                      <Input type="color" defaultValue="#3b82f6" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Border Radius</label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="p-4 bg-muted/50">
                      <h4 className="font-semibold mb-3">Integration Code</h4>
                      <div className="text-sm font-mono bg-background p-3 rounded border">
                        <div className="text-muted-foreground">{'<script src="https://widget.tezaoro.com/v1/widget.js"></script>'}</div>
                        <div className="text-muted-foreground">{'<div id="tezaoro-widget"'}</div>
                        <div className="text-muted-foreground ml-4">{'data-style="' + widgetStyle + '"'}</div>
                        <div className="text-muted-foreground ml-4">{'data-currency="' + currency + '"'}</div>
                        <div className="text-muted-foreground">{'></div>'}</div>
                      </div>
                    </Card>

                    <Button className="w-full" variant="outline">
                      Copy Integration Code
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Supported Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 100+ cryptocurrency support</li>
                <li>• Real-time payment notifications</li>
                <li>• Customizable UI themes</li>
                <li>• Mobile-responsive design</li>
                <li>• Webhook integration</li>
                <li>• Multi-language support</li>
              </ul>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Integration Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• No merchant account required</li>
                <li>• Instant settlement</li>
                <li>• Low transaction fees</li>
                <li>• Global accessibility</li>
                <li>• Fraud protection</li>
                <li>• 24/7 support</li>
              </ul>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Widget Size:</span>
                  <span className="text-muted-foreground">~50KB</span>
                </div>
                <div className="flex justify-between">
                  <span>Load Time:</span>
                  <span className="text-muted-foreground">{'<'}100ms</span>
                </div>
                <div className="flex justify-between">
                  <span>API Response:</span>
                  <span className="text-muted-foreground">{'<'}200ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="text-green-500">99.9%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PaymentWidget;
