
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, ChartLine, CircleDollarSign, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const NanoCap = () => {
  return (
    <PageLayout title="Nano-Cap Crypto Token Market Making">
      <PageHeader 
        title="Unlock Sustainable Growth for Your Nano-Cap Token" 
        description="AI-Powered Market Making for $1M–$10M Projects"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Liquidity Engine for Nano-Caps:</span> Stability, Growth, & Trust
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-Powered Market Making for $1M–$10M Projects | <span className="font-bold text-tezaoro-400">$299/Month</span>
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* The Nano-Cap Challenge */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">The Nano-Cap Challenge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <TrendingDown className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>Extreme Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Wild price swings creating significant investor uncertainty
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <DollarSign className="h-12 w-12 mx-auto text-tezaoro-400 mb-4" />
                <CardTitle>Minimal Liquidity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Prevents exchange listings and erodes investor confidence
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <ChartLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <CardTitle>Credibility Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Struggle to attract and retain early investors
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <CircleDollarSign className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>Budget Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Traditional market making solutions are prohibitively expensive
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Without proper liquidity, your nano-cap token will struggle to gain traction with both exchanges and investors."</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">24/7 Basic Liquidity</h3>
                    <p className="text-muted-foreground">Continuous market presence on key exchanges</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <CircleDollarSign className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Stabilized Spreads</h3>
                    <p className="text-muted-foreground">Reduced volatility for improved investor confidence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <ChartLine className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Starter Strategies</h3>
                    <p className="text-muted-foreground">Essential algorithms for nano-cap tokens</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Basic Dashboard</h3>
                    <p className="text-muted-foreground">Simple monitoring tools for transparency</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Monthly Reviews</h3>
                    <p className="text-muted-foreground">Regular performance updates and guidance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingDown className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Volatility Control</h3>
                    <p className="text-muted-foreground">Basic protection against extreme price movements</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg font-semibold text-gradient">Key Differentiator:</p>
            <p className="text-lg">"Affordable market making solution designed specifically for nano-cap tokens."</p>
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
                <p className="text-center">Link your token's exchange API to our platform</p>
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
                <p className="text-center">Set basic parameters for your token's liquidity needs</p>
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
                <p className="text-center">Our AI algorithms begin providing basic liquidity</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <CardTitle>Track</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Monitor performance through our simple dashboard</p>
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
                <CardTitle>Non-Custodial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Your funds stay in your exchange accounts</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>No withdrawal access needed</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Monthly billing with no long-term commitments</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Basic activity logs</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Monthly performance reports</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Simple monitoring dashboard</p>
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
                    <span>Basic Services</span>
                    <span className="font-mono">$1,000+/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manual MM teams</span>
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
                    <span>Single exchange support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="bg-tezaoro-500/20 p-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                    </div>
                    <span>Email support</span>
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
                Start Your Free Consultation
              </Button>
            </div>
          </Card>
        </div>

        {/* Case Study */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Case Study – Project X</h2>
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
                  <span className="font-mono">$5M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono">$500</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-loss">12%</span>
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
                  <span className="font-mono">$5M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono text-profit">$10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-profit">5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Listings</span>
                  <span className="font-mono text-profit">+1 new exchange</span>
                </div>
                <div className="h-32 w-full bg-card/60 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Chart visualization of improved metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Our token finally achieved the stability needed to start serious growth."</p>
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
                <CardTitle>Affordable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Starting at just $299/month, designed for nano-cap budgets</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Nano-Cap Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Specifically optimized for $1M–$10M market cap tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Zero Commitment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Monthly billing with no long-term contracts</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Simple Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Easy onboarding process with guided assistance</p>
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
              <CardTitle className="text-center">Start Building Liquidity in 48 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Register</h3>
                  <p className="text-muted-foreground">Create your account at tezaoro.com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Connect API</h3>
                  <p className="text-muted-foreground">Link your exchange account</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Go Live</h3>
                  <p className="text-muted-foreground">Begin automated market making</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card/60 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gradient">Limited-Time Offer</h3>
              <p className="text-lg">First month at $199 for early sign-ups</p>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Email:</span> support@tezaoro.com</p>
              <p><span className="font-semibold">Telegram:</span> @TezaoroMM</p>
            </div>
          </div>
        </div>

        {/* Closing Tagline */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-gradient">"From nano-cap struggles to sustainable growth—affordable liquidity solutions that grow with you."</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default NanoCap;
