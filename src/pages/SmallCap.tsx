
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, ChartLine, CircleDollarSign, DollarSign, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react';

const SmallCap = () => {
  return (
    <PageLayout title="Small-Cap Liquidity Solutions">
      <PageHeader 
        title="Elevate Your Small-Cap Token to Major League Liquidity" 
        description="AI-Driven Market Making for $100M–$1B Tokens | $1,999/Month"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* The Small-Cap Challenge */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">The Small-Cap Challenge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <CardTitle>High Expectations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Exchanges and institutional investors expect professional-grade liquidity
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <DollarSign className="h-12 w-12 mx-auto text-tezaoro-400 mb-4" />
                <CardTitle>Depth Required</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Need for deep, stable liquidity to support large trades
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <ChartLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <CardTitle>Intense Competition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Competing for listings and market share against established players
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <CircleDollarSign className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>Legacy Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manual MM solutions are costly and lack the agility of AI
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Without robust, adaptive liquidity, even the best projects risk stagnation and missed growth opportunities."</p>
          </div>
        </div>

        {/* Our Solution */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-gradient text-center">AI-Enhanced Market Making for Small-Caps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Enterprise-Grade Liquidity</h3>
                    <p className="text-muted-foreground">24/7 provision across top global exchanges</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <CircleDollarSign className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ultra-Tight Spreads</h3>
                    <p className="text-muted-foreground">Deep order books to attract whales and institutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <ChartLine className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Customizable Strategies</h3>
                    <p className="text-muted-foreground">Data-driven approach for dynamic market conditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Advanced Dashboard</h3>
                    <p className="text-muted-foreground">Full transparency and control over operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quarterly Reviews</h3>
                    <p className="text-muted-foreground">Strategic reviews with actionable insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Institution-Ready</h3>
                    <p className="text-muted-foreground">Compliance and reporting for serious investors</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg font-semibold text-gradient">Key Differentiator:</p>
            <p className="text-lg">"The agility of a boutique desk, the power of institutional-grade AI."</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Link your token's APIs on all major exchanges</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Configure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Set liquidity, risk, and compliance parameters</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Optimize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">AI bots optimize spreads, depth, and volatility in real time</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <CardTitle>Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Track performance with live dashboards and quarterly strategy sessions</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Security & Trust</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Non-custodial Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Your funds remain in your exchange accounts</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>No withdrawal permissions ever required</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Smart contract escrow for secure, quarterly payments</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Comprehensive Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Audit-ready logs and reporting</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Full compliance support</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Dedicated account manager for enterprise clients</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Pricing</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <Card className="max-w-xl mx-auto glass-card overflow-hidden">
            <div className="bg-primary/20 p-4 text-center">
              <h3 className="text-2xl font-bold text-gradient">$1,999/Month</h3>
              <p className="text-muted-foreground">(Quarterly Billing: $5,997)</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold mb-2">VS Competitors:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CiaoAI</span>
                    <span className="font-mono">$5,000+/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Traditional MM desks</span>
                    <span className="font-mono">$15k+/month</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tezaoro Solution</span>
                    <span className="font-mono text-tezaoro-400">$1,999/month</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>All major CEX/DEX coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>24/7 expert support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>Monthly and quarterly performance reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <div className="p-6 bg-card/60 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow w-full">
                Schedule a Demo
              </Button>
            </div>
          </Card>
        </div>

        {/* Case Study */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Case Study – Project Z</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Before</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Market Cap</span>
                  <span className="font-mono">$250M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono">$25k</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-loss">2.8%</span>
                </div>
                <div className="h-32 w-full bg-card/60 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Chart visualization of initial state</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>After 3 Months</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-profit">0.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono text-profit">$350k</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Listings</span>
                  <span className="font-mono text-profit">+3 tier-1 exchanges</span>
                </div>
                <div className="flex justify-between">
                  <span>New Partners</span>
                  <span className="font-mono text-profit">Institutional investors</span>
                </div>
                <div className="h-32 w-full bg-card/60 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Chart visualization of improved metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Our liquidity profile now matches the ambitions of our project and our investors."</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Institutional-Grade AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Trusted by leading exchanges and funds</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Small-Cap Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Strategies tailored for $100M–$1B tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>No Lock-In</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Flexible, transparent, and scalable solutions</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>White-Glove Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Dedicated onboarding and ongoing expert assistance</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Next Steps</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-center">Upgrade Your Liquidity in 72 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Sign Up</h3>
                  <p className="text-muted-foreground">Create your enterprise account</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Connect APIs</h3>
                  <p className="text-muted-foreground">Link to all your exchange accounts</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Go Live</h3>
                  <p className="text-muted-foreground">Begin enterprise-grade market making</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card/60 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gradient">Special Offer</h3>
              <p className="text-lg">Complimentary liquidity audit for new Q3 2025 clients</p>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                Request Your Liquidity Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> enterprise@tezaoro.com</p>
              <p><span className="font-semibold">Telegram:</span> @TezaoroEnterprise</p>
            </div>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-gradient">"Empower your small-cap token with liquidity that opens doors to exchanges, investors, and exponential growth."</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default SmallCap;
