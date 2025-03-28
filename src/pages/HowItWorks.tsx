
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import { Card } from "@/components/ui/card";
import { 
  BarChart2, 
  Code, 
  Database, 
  LineChart, 
  Shield, 
  Terminal, 
  TrendingUp, 
  Cpu, 
  Zap,
  ArrowRight
} from 'lucide-react';

const HowItWorks = () => {
  useEffect(() => {
    document.title = "How It Works | Tezaoro";
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <MvpBadge />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              How <span className="text-gradient">Tezaoro</span> Works
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Discover how our AI-powered algorithmic trading platform transforms market data into profitable trading strategies.
            </p>

            {/* Process Steps */}
            <div className="space-y-16 mb-20">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-2xl font-bold mb-4">1. Data Collection & Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Our system continuously gathers vast amounts of market data from multiple sources. This includes:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-3">
                        <Database className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Historical price data across multiple timeframes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <LineChart className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Market volatility metrics and order book data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <BarChart2 className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Economic indicators and sentiment analysis</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-card/20 p-8 rounded-lg shadow-inner flex items-center justify-center">
                  <Database className="h-24 w-24 text-tezaoro-400" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-card/20 p-8 rounded-lg shadow-inner flex items-center justify-center">
                  <Cpu className="h-24 w-24 text-tezaoro-400" />
                </div>
                <div>
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-2xl font-bold mb-4">2. AI Model Training</h3>
                    <p className="text-muted-foreground mb-4">
                      Our proprietary AI models are trained on this vast dataset to identify patterns and generate trading signals. The AI system:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-3">
                        <Code className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Uses multiple machine learning approaches including deep learning and reinforcement learning</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Terminal className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Continuously retrains with new market data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Adapts to changing market conditions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="glass-card p-8 h-full">
                    <h3 className="text-2xl font-bold mb-4">3. Strategy Implementation</h3>
                    <p className="text-muted-foreground mb-4">
                      The trading signals generated by our AI models are converted into executable trading strategies with built-in risk management:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-3">
                        <TrendingUp className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Strategies diversified across different asset classes and timeframes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Automated risk management with position sizing and stop-loss mechanisms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-tezaoro-400 shrink-0 mt-1" />
                        <span>Real-time execution with minimal latency</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-card/20 p-8 rounded-lg shadow-inner flex items-center justify-center">
                  <TrendingUp className="h-24 w-24 text-tezaoro-400" />
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Platform <span className="text-gradient">Features</span></h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass-card p-6">
                  <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Risk Management</h3>
                  <p className="text-muted-foreground">
                    Advanced risk controls to protect your capital with customizable stop-loss settings and position sizing.
                  </p>
                </Card>
                <Card className="glass-card p-6">
                  <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                  <p className="text-muted-foreground">
                    Comprehensive analytics dashboard to monitor your strategies' performance in real-time.
                  </p>
                </Card>
                <Card className="glass-card p-6">
                  <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-tezaoro-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
                  <p className="text-muted-foreground">
                    Cutting-edge artificial intelligence continuously learning and adapting to market conditions.
                  </p>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
              <div className="space-y-6">
                <Card className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-2">How much capital do I need to start?</h3>
                  <p className="text-muted-foreground">
                    We recommend starting with at least $5,000 to properly diversify across multiple strategies, though you can begin with as little as $1,000 for select algorithms.
                  </p>
                </Card>
                <Card className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-2">Do I need trading experience?</h3>
                  <p className="text-muted-foreground">
                    No experience is necessary. Our platform is designed to be user-friendly for beginners while offering advanced features for experienced traders.
                  </p>
                </Card>
                <Card className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-2">What are the expected returns?</h3>
                  <p className="text-muted-foreground">
                    Historical performance shows an average annual return of 25.7%, though past performance is not indicative of future results. Returns vary based on market conditions and risk settings.
                  </p>
                </Card>
                <Card className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-2">When will the platform be available?</h3>
                  <p className="text-muted-foreground">
                    The platform is currently in testing mode with a limited group of beta users. We expect to open access to the public in Q3 2023. Join our waitlist to be notified when we launch.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
