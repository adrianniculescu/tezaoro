
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Cpu, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-hero-pattern grid-pattern"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Revolutionary <span className="text-gradient">Algorithmic Trading</span> For Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Access sophisticated trading algorithms powered by artificial intelligence. Tezaoro combines quantitative analysis with machine learning to deliver exceptional trading results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2">
                <div className="bg-tezaoro-500/20 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-tezaoro-400" />
                </div>
                <span className="text-muted-foreground">25.7% Avg Return</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-tezaoro-500/20 p-2 rounded-full">
                  <Cpu className="h-5 w-5 text-tezaoro-400" />
                </div>
                <span className="text-muted-foreground">5+ AI Models</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-tezaoro-500/20 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-tezaoro-400" />
                </div>
                <span className="text-muted-foreground">Real-time Analysis</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float hidden lg:block">
            <div className="relative bg-card glass-card rounded-lg p-4 shadow-xl">
              <div className="absolute -top-4 -right-4 bg-tezaoro-500 text-white text-xs font-bold px-2 py-1 rounded">LIVE</div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">BTC/USD Strategy</h3>
                <p className="text-sm text-muted-foreground">Momentum-based algorithm</p>
              </div>
              <div className="bg-card/60 rounded p-3 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Performance (30d)</span>
                  <span className="text-profit font-bold">+18.4%</span>
                </div>
                <div className="h-24 w-full bg-card/60 rounded overflow-hidden flex items-end">
                  {/* Simplified chart representation */}
                  <div className="flex-1 h-full flex items-end gap-1 px-1">
                    {[40, 35, 60, 45, 55, 70, 65, 75, 60, 80, 75, 90].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-tezaoro-500/80 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/60 rounded p-2">
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                  <div className="text-lg font-bold">68.5%</div>
                </div>
                <div className="bg-card/60 rounded p-2">
                  <div className="text-xs text-muted-foreground">Trades</div>
                  <div className="text-lg font-bold">143</div>
                </div>
                <div className="bg-card/60 rounded p-2">
                  <div className="text-xs text-muted-foreground">Drawdown</div>
                  <div className="text-lg font-bold">4.2%</div>
                </div>
                <div className="bg-card/60 rounded p-2">
                  <div className="text-xs text-muted-foreground">Sharpe</div>
                  <div className="text-lg font-bold">2.31</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-16 -left-16 z-[-1] w-64 h-64 bg-tezaoro-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -right-8 z-[-1] w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
