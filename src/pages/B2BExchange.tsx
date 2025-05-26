
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, TrendingUp, Shield, BarChart3, Headphones } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const B2BExchange = () => {
  const [tradingVolume, setTradingVolume] = useState('');
  const [businessType, setBusinessType] = useState('exchange');

  const businessTypes = [
    { value: 'exchange', label: 'Cryptocurrency Exchange' },
    { value: 'broker', label: 'Crypto Broker' },
    { value: 'wallet', label: 'Wallet Provider' },
    { value: 'fintech', label: 'Fintech Company' },
    { value: 'bank', label: 'Traditional Bank' }
  ];

  return (
    <PageLayout title="B2B Exchange Solutions">
      <PageHeader 
        title="Enterprise Exchange Solutions" 
        description="Institutional-grade cryptocurrency exchange infrastructure for businesses"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card bg-card p-6 text-center">
              <Building className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enterprise Grade</h3>
              <p className="text-muted-foreground">Built for high-volume institutional trading</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">Real-time reporting and trading insights</p>
            </Card>
            <Card className="glass-card bg-card p-6 text-center">
              <Headphones className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
              <p className="text-muted-foreground">24/7 priority support for enterprise clients</p>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="glass-card bg-card p-8 max-w-4xl mx-auto mb-12">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="contact">Get Started</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">B2B Exchange Solutions</h2>
                  <p className="text-muted-foreground">Complete white-label exchange infrastructure for enterprises</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Core Features</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• High-frequency trading support</li>
                        <li>• Advanced order types</li>
                        <li>• Real-time market data</li>
                        <li>• Multi-currency support</li>
                        <li>• API integration</li>
                        <li>• White-label solutions</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Security & Compliance</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Multi-signature wallets</li>
                        <li>• Cold storage integration</li>
                        <li>• KYC/AML compliance</li>
                        <li>• Regulatory reporting</li>
                        <li>• Audit trail</li>
                        <li>• Risk management tools</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
                      <h4 className="font-semibold mb-4">Performance Metrics</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Order Processing:</span>
                          <span className="text-green-500">{'<'}10ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>System Uptime:</span>
                          <span className="text-green-500">99.99%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peak Throughput:</span>
                          <span className="text-blue-500">1M+ orders/sec</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Supported Pairs:</span>
                          <span className="text-primary">500+</span>
                        </div>
                      </div>
                    </Card>

                    <div>
                      <h4 className="font-semibold mb-3">Integration Options</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">REST API</Badge>
                        <Badge variant="secondary">WebSocket</Badge>
                        <Badge variant="secondary">FIX Protocol</Badge>
                        <Badge variant="secondary">GraphQL</Badge>
                        <Badge variant="secondary">SDK</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Enterprise Pricing</h2>
                  <p className="text-muted-foreground">Flexible pricing models for different business needs</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 border">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Starter</h3>
                      <p className="text-2xl font-bold mt-2">0.1%</p>
                      <p className="text-sm text-muted-foreground">per transaction</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Up to $1M monthly volume</li>
                      <li>• Basic API access</li>
                      <li>• Email support</li>
                      <li>• Standard reporting</li>
                    </ul>
                  </Card>

                  <Card className="p-6 border-2 border-primary">
                    <div className="text-center mb-4">
                      <div className="inline-block bg-primary text-primary-foreground px-2 py-1 rounded text-xs mb-2">
                        Most Popular
                      </div>
                      <h3 className="text-lg font-semibold">Professional</h3>
                      <p className="text-2xl font-bold mt-2">0.05%</p>
                      <p className="text-sm text-muted-foreground">per transaction</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Up to $10M monthly volume</li>
                      <li>• Advanced API features</li>
                      <li>• Priority support</li>
                      <li>• Custom reporting</li>
                      <li>• White-label options</li>
                    </ul>
                  </Card>

                  <Card className="p-6 border">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Enterprise</h3>
                      <p className="text-2xl font-bold mt-2">Custom</p>
                      <p className="text-sm text-muted-foreground">volume-based</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Unlimited volume</li>
                      <li>• Full API access</li>
                      <li>• Dedicated support</li>
                      <li>• Custom integrations</li>
                      <li>• SLA guarantees</li>
                    </ul>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">Get Started Today</h2>
                  <p className="text-muted-foreground">Contact our enterprise team to discuss your requirements</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Type</label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Monthly Volume (USD)</label>
                    <Input
                      type="text"
                      placeholder="e.g., $1,000,000"
                      value={tradingVolume}
                      onChange={(e) => setTradingVolume(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input placeholder="Your Company Name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Email</label>
                    <Input type="email" placeholder="business@company.com" />
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Request Enterprise Demo
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Our team will contact you within 24 hours
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Why Choose Our B2B Solution?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Proven track record with 50+ enterprise clients</li>
                <li>• Scalable infrastructure handling billions in volume</li>
                <li>• Regulatory compliance across multiple jurisdictions</li>
                <li>• Custom integrations and white-label solutions</li>
                <li>• 24/7 dedicated enterprise support</li>
              </ul>
            </Card>

            <Card className="glass-card bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Implementation Timeline</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Initial Setup:</span>
                  <span className="text-blue-500">1-2 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Custom Integration:</span>
                  <span className="text-blue-500">2-4 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Testing & QA:</span>
                  <span className="text-blue-500">1 week</span>
                </div>
                <div className="flex justify-between">
                  <span>Go Live:</span>
                  <span className="text-green-500">4-6 weeks total</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default B2BExchange;
