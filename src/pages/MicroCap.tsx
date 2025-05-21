
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, ChartLine, CircleDollarSign, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

const MicroCap = () => {
  return (
    <PageLayout title="Micro-Cap Crypto Token Market Making">
      <PageHeader 
        title="Unlock Sustainable Growth for Your Micro-Cap Token" 
        description="AI-Powered Market Making for $10M–$100M Projects"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Liquidity Engine for Micro-Caps:</span> Stability, Growth, & Trust
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            AI-Powered Market Making for $10M–$100M Projects | <span className="font-bold text-tezaoro-400">$799/Month</span>
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* The Micro-Cap Challenge */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">The Micro-Cap Challenge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-tezaoro-400 to-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <TrendingDown className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>High Volatility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Unpredictable price swings creating investor uncertainty
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <DollarSign className="h-12 w-12 mx-auto text-tezaoro-400 mb-4" />
                <CardTitle>Liquidity Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Hinder exchange listings and damage investor trust
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <ChartLine className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <CardTitle>Investor Attraction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Difficulty attracting institutional and serious retail investors
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center pb-2">
                <CircleDollarSign className="h-12 w-12 mx-auto text-destructive mb-4" />
                <CardTitle>Inefficient Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manual market making is expensive and resource-intensive
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Without deep, stable liquidity, your project risks being overlooked by both exchanges and investors."</p>
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
              <CardTitle className="text-gradient text-center">AI-Driven Market Making for Micro-Caps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">24/7 Liquidity Provision</h3>
                    <p className="text-muted-foreground">Automated, continuous liquidity across top CEXs & DEXs</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <CircleDollarSign className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tight Spreads & Depth</h3>
                    <p className="text-muted-foreground">Deep order books that attract volume and confidence</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <ChartLine className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Customizable Strategies</h3>
                    <p className="text-muted-foreground">Tailored approaches for different market conditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">Real-time monitoring for complete transparency and control</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Performance Reviews</h3>
                    <p className="text-muted-foreground">Quarterly assessments with actionable insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-tezaoro-500/20 p-2 rounded-full">
                    <TrendingDown className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Volatility Management</h3>
                    <p className="text-muted-foreground">Smart algorithms that mitigate extreme price movements</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg font-semibold text-gradient">Key Differentiator:</p>
            <p className="text-lg">"Enterprise-grade algorithms, tailored for micro-cap ambitions."</p>
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
                <p className="text-center">Connect your token's exchange APIs with multi-exchange support</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <CardTitle>Define Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Set your liquidity and risk parameters for optimal performance</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <CardTitle>AI Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Our AI bots manage spreads, depth, and volatility mitigation</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <CardTitle>Monitor Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Track performance with live dashboards and monthly reports</p>
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
                  <p>Funds remain in your exchange wallets</p>
                </div>
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
                  <p>Smart contract escrow for quarterly payments</p>
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
                  <p>Audit-ready logs for compliance</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Transparent reporting and compliance support</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-tezaoro-500/20 p-1 rounded-full">
                    <div className="w-2 h-2 bg-profit rounded-full"></div>
                  </div>
                  <p>Full visibility into market making activities</p>
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
              <h3 className="text-2xl font-bold text-gradient">$799/Month</h3>
              <p className="text-muted-foreground">(Quarterly Billing: $2,397)</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold mb-2">VS Competitors:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CiaoAI</span>
                    <span className="font-mono">$2,500+/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manual MM teams</span>
                    <span className="font-mono">$10k+/month</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Tezaoro Solution</span>
                    <span className="font-mono text-tezaoro-400">$799/month</span>
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
                    <span>Multi-exchange coverage</span>
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
                    <span>Monthly and quarterly analytics reviews</span>
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
            <h2 className="text-3xl font-bold mb-4">Case Study – Project Y</h2>
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
                  <span className="font-mono">$35M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono">$3,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-loss">7%</span>
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
                  <span className="font-mono">$35M</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Volume</span>
                  <span className="font-mono text-profit">$60,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Spreads</span>
                  <span className="font-mono text-profit">2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Listings</span>
                  <span className="font-mono text-profit">+2 new exchanges</span>
                </div>
                <div className="h-32 w-full bg-card/60 rounded-lg mt-4 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Chart visualization of improved metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 p-4 bg-card/60 rounded-lg max-w-2xl mx-auto">
            <p className="italic text-lg">"Our token became attractive to both exchanges and serious investors."</p>
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
                <CardTitle>Proven AI Tech</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Adapted from top-tier market makers with enterprise-grade algorithms</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Micro-Cap Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Strategies specifically tuned for $10M–$100M tokens</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>No Lock-ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Cancel or scale anytime with no long-term contracts</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="text-center">
                <CardTitle>Dedicated Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Personalized onboarding and quarterly strategic reviews</p>
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
              <CardTitle className="text-center">Boost Your Liquidity in 72 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Sign Up</h3>
                  <p className="text-muted-foreground">Register at YourPlatform.com</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Connect APIs</h3>
                  <p className="text-muted-foreground">Link your exchange accounts</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Launch</h3>
                  <p className="text-muted-foreground">Set parameters and start your market making</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-card/60 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gradient">Special Offer</h3>
              <p className="text-lg">20% off your first quarter for new Q3 2025 sign-ups</p>
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                Sign Up Now
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
          <p className="text-2xl font-bold text-gradient">"Transform your micro-cap from overlooked to overachieving—let liquidity fuel your next stage of growth."</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MicroCap;
