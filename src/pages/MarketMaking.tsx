import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, ChartLine, CircleDollarSign, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const MarketMaking = () => {
  return (
    <PageLayout title="Crypto Token Market Making Service">
      <PageHeader 
        title="Crypto Token Market Making Service for Nano-Cap Projects" 
        description="Turn Nano-Cap Volatility into Sustainable Growth"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Liquidity Engine for Nano-Caps:</span> Stability, Growth, & Trust
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-Powered Market Making for $1M–$10M Tokens | <span className="font-bold text-tezaoro-400">$299/Month</span>
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
            Request Invitation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* The Nano-Cap Challenge */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">The Nano-Cap Challenge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <TrendingDown className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>Extreme Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Leads to investor distrust and hesitation, limiting long-term growth potential
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <DollarSign className="h-12 w-12 mx-auto text-tezaoro-400 mb-4" />
                <CardTitle>Low Liquidity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Results in high slippage and wide spreads, deterring both retail and institutional investors
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <ChartLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <CardTitle>Visibility Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Creates stagnant trading volume, preventing project growth and new exchange listings
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Without liquidity, even innovative projects fail to attract holders or listings."</p>
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
              <CardTitle className="text-gradient text-center">AI-Driven Market Making for Nano-Caps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Automated Liquidity Provision</h3>
                    <p className="text-muted-foreground">Tighten spreads, reduce slippage and create a healthier trading environment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <CircleDollarSign className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">24/7 Multi-Exchange Support</h3>
                    <p className="text-muted-foreground">Comprehensive coverage across Binance, KuCoin, PancakeSwap, and more</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <ChartLine className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transparency Dashboard</h3>
                    <p className="text-muted-foreground">Real-time analytics and complete fund control with intuitive reporting tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Volatility Safeguards</h3>
                    <p className="text-muted-foreground">Dynamic price stabilization algorithms that respond to market conditions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg font-semibold text-gradient">Key Differentiator:</p>
            <p className="text-lg">"Tezaoro's proven tech, scaled for nano-cap budgets."</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Connect your token's exchange API (CEX/DEX) with our secure platform</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Customize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Set your parameters including spread percentage, order depth and risk tolerance</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>Activate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Our AI bots provide 24/7 liquidity with anti-manipulation checks and real-time risk alerts</p>
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
                <CardTitle>Your Funds, Your Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>No withdrawal permissions required</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Funds stay in your exchange wallet</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Smart contract escrow for quarterly payments</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Audit-ready logs for transparency</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Full compliance with exchange requirements</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Quarterly performance and transparency reports</p>
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
              <h3 className="text-2xl font-bold text-gradient">$299/Month</h3>
              <p className="text-muted-foreground">(Quarterly Billing: $897)</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold mb-2">VS Competitors:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Traditional Market Makers</span>
                    <span className="font-mono">$10k+/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enterprise-tier Solutions</span>
                    <span className="font-mono">$5k+/month</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tezaoro Solution</span>
                    <span className="font-mono text-tezaoro-400">$299/month</span>
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
                    <span>Full exchange coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>24/7 support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>Monthly performance reviews</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <div className="p-6 bg-card/60 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow w-full">
                Schedule an Initial Meeting
              </Button>
            </div>
          </Card>
        </div>

        {/* Case Study */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Case Study – TokenX</h2>
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
                  <span className="font-mono">$2M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono">$500</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-loss">15%</span>
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
                  <span>Market Cap</span>
                  <span className="font-mono">$2.8M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono text-profit">$15k</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-profit">5%</span>
                </div>
                <div className="h-32 w-full bg-card/60 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Chart visualization of improved metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Liquidity built trust – our community doubled and we were listed on 2 tier-2 exchanges."</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Proven AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Adapted from Tezaoro's institutional-grade system with years of market experience</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Nano-Cap Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Strategies specifically tailored for low-volume tokens and early-stage projects</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>No Lock-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Flexible terms with no long-term contracts required - cancel anytime</p>
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
              <CardTitle className="text-center">Activate Liquidity Through Our Exclusive Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Request Invitation</h3>
                  <p className="text-muted-foreground">Contact us for an initial assessment</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Strategy Discussion</h3>
                  <p className="text-muted-foreground">Meet with our team for a tailored approach</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Onboarding</h3>
                  <p className="text-muted-foreground">Begin your market making journey with us</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card/60 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gradient">Limited-Time Offer</h3>
              <p className="text-lg">First month 50% off for Q2 2024 sign-ups</p>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                Request an Invitation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> office@tezaoro.com</p>
            </div>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-gradient">"From nano to notable – liquidity unlocks your token's potential."</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MarketMaking;
