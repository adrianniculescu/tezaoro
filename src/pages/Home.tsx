
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AlgorithmCards from '@/components/AlgorithmCards';
import PerformanceChart from '@/components/PerformanceChart';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import MarketMakingSection from '@/components/MarketMakingSection';
import TokenListingSection from '@/components/TokenListingSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, CreditCard, TrendingUp, Zap } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    document.title = "Nano-Cap Crypto Market Making & Algorithmic Trading Platform | Tezaoro";
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Helmet>
        <title>Nano-Cap Crypto Market Making & Algorithmic Trading Platform | Tezaoro</title>
        <meta name="description" content="Boost liquidity for nano-cap tokens ($1M–$10M) with AI-powered market making, DEX aggregation, and secure non-custodial trading. Regulatory-ready infrastructure." />
        <meta name="keywords" content="nano-cap crypto, market making, algorithmic trading, DEX aggregation, token liquidity, non-custodial trading" />
        <link rel="canonical" href="https://tezaoro.com/" />
        
        {/* Schema Markup for SoftwareApplication */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tezaoro",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "AI-powered market making and algorithmic trading platform for nano-cap cryptocurrency tokens",
            "offers": {
              "@type": "Offer",
              "price": "99",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "ratingCount": "142"
            }
          }`}
        </script>
      </Helmet>
      <Navbar />
      <MvpBadge />
      <main>
        <Hero />
        <Features />
        <AlgorithmCards />
        <PerformanceChart />

        {/* New Trading Features Section */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Integrated <span className="text-gradient">Trading Solutions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access powerful trading tools and fiat gateways seamlessly integrated into the Tezaoro platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="glass-card bg-card p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRightLeft className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Instant Exchange</h3>
                  <p className="text-muted-foreground mb-6">
                    Swap between 500+ cryptocurrencies instantly with competitive rates and zero hidden fees
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span>Lightning fast trades</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>Best market rates</span>
                  </div>
                </div>

                <Link to="/exchange">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Start Trading
                  </Button>
                </Link>
              </Card>

              <Card className="glass-card bg-card p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Fiat Gateway</h3>
                  <p className="text-muted-foreground mb-6">
                    Buy and sell cryptocurrencies with credit cards and bank transfers in 40+ fiat currencies
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-green-500" />
                    <span>Instant card payments</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>Global currency support</span>
                  </div>
                </div>

                <Link to="/fiat-gateway">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Buy Crypto
                  </Button>
                </Link>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Seamlessly integrated with our algorithmic trading platform
              </p>
              <div className="flex justify-center gap-4">
                <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                  No Additional Accounts
                </span>
                <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  Unified Dashboard
                </span>
                <span className="text-sm bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
                  Single Sign-On
                </span>
              </div>
            </div>
          </div>
        </section>

        <MarketMakingSection />
        <TokenListingSection />

        {/* FAQ Section for SEO */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            
            <Card className="glass-card bg-card p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-semibold">
                    What is algorithmic trading?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Algorithmic trading is the process of using computer programs and algorithms to automatically execute trades in financial markets based on pre-defined criteria such as price, timing, or mathematical models. These algorithms can analyze market data, identify trading opportunities, and execute trades at optimal prices and speeds that would be impossible for human traders.</p>
                    <p className="mt-2">Tezaoro's platform provides sophisticated algorithmic trading capabilities accessible to traders of all experience levels, with built-in risk management and performance analytics.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-semibold">
                    How to choose the best algorithmic trading platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>When selecting an algorithmic trading platform, consider these important factors:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Performance and backtesting capabilities</li>
                      <li>Available algorithms and strategy customization options</li>
                      <li>Risk management features and failsafes</li>
                      <li>User interface and ease of use</li>
                      <li>Support for your preferred markets (crypto, stocks, etc.)</li>
                      <li>Reliability and uptime guarantees</li>
                      <li>Security measures and data protection</li>
                      <li>Pricing structure and transparency</li>
                    </ul>
                    <p className="mt-2">Tezaoro offers comprehensive features across these areas, with particular strengths in AI-powered algorithms, real-time analytics, and intuitive controls for both beginners and professional traders.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-semibold">
                    What are the benefits of automated trading software?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Automated trading software offers numerous advantages over manual trading:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Elimination of emotional decision-making</li>
                      <li>Ability to execute trades 24/7 without constant monitoring</li>
                      <li>Simultaneous monitoring of multiple markets</li>
                      <li>Faster trade execution at optimal prices</li>
                      <li>Backtesting strategies against historical data</li>
                      <li>Consistent application of trading rules</li>
                      <li>Reduced transaction costs through efficient execution</li>
                      <li>Diversification across multiple strategies and asset classes</li>
                    </ul>
                    <p className="mt-2">Tezaoro's platform is designed to maximize these benefits while minimizing the technical expertise required to achieve them.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-semibold">
                    How do I get started with algorithmic trading on Tezaoro?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Getting started with Tezaoro is simple:</p>
                    <ol className="list-decimal pl-6 mt-2 space-y-1">
                      <li>Join our waitlist to be notified when we launch</li>
                      <li>Choose a subscription plan that fits your needs</li>
                      <li>Set up your account and connect to your preferred exchanges</li>
                      <li>Select from our pre-built algorithms or customize your own</li>
                      <li>Run backtests to validate your strategy</li>
                      <li>Deploy your algorithm with your desired risk parameters</li>
                      <li>Monitor performance through our analytics dashboard</li>
                    </ol>
                    <p className="mt-2">Our <Link to="/platform" className="text-primary hover:underline">comprehensive platform guides</Link> will walk you through each step of the process.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-semibold">
                    Are crypto trading bots profitable?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <p>Crypto trading bots can be profitable when properly configured and monitored, but results vary based on market conditions, strategy selection, and risk management. Key factors affecting profitability include:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Market volatility and overall trends</li>
                      <li>Algorithm quality and sophistication</li>
                      <li>Proper backtesting and optimization</li>
                      <li>Risk management settings</li>
                      <li>Transaction fees and technical infrastructure</li>
                    </ul>
                    <p className="mt-2">Tezaoro's platform incorporates advanced AI and machine learning techniques to adapt to changing market conditions, with built-in risk controls designed to preserve capital during adverse market conditions. Our <Link to="/performance" className="text-primary hover:underline">performance metrics</Link> provide transparent reporting on historical results.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
            
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Want to learn more about algorithmic trading and how Tezaoro can help you achieve your financial goals?
              </p>
              <Link to="/how-it-works" className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                Explore How It Works
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
