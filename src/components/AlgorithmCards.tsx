
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Cpu, LineChart, Timer, BarChart2 } from 'lucide-react';

interface AlgorithmCardProps {
  name: string;
  description: string;
  performance: number;
  risk: 'Low' | 'Medium' | 'High';
  timeframe: string;
  markets: string[];
  isPopular?: boolean;
}

const AlgorithmCard = ({ name, description, performance, risk, timeframe, markets, isPopular }: AlgorithmCardProps) => {
  const riskColor = {
    Low: 'bg-green-500/10 text-green-500',
    Medium: 'bg-yellow-500/10 text-yellow-500',
    High: 'bg-red-500/10 text-red-500',
  }[risk];
  
  return (
    <div className="relative bg-card glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {isPopular && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-accent text-white">Popular</Badge>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Performance</div>
            <div className={`text-lg font-bold flex items-center ${performance >= 0 ? 'text-profit' : 'text-loss'}`}>
              {performance >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {performance > 0 ? '+' : ''}{performance}%
            </div>
          </div>
          <div className="bg-background/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
            <div className={`text-sm font-medium py-1 px-2 rounded-full inline-block ${riskColor}`}>
              {risk}
            </div>
          </div>
          <div className="bg-background/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Timeframe</div>
            <div className="text-sm font-medium flex items-center">
              <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
              {timeframe}
            </div>
          </div>
          <div className="bg-background/40 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Markets</div>
            <div className="flex flex-wrap gap-1">
              {markets.map((market, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {market}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Button className="w-full bg-primary hover:bg-primary/90">
          Deploy Algorithm
        </Button>
      </div>
    </div>
  );
};

const AlgorithmCards = () => {
  const algorithms = [
    {
      name: "Momentum Alpha",
      description: "Capitalizes on sustained price movements across multiple timeframes.",
      performance: 32.7,
      risk: "Medium" as const,
      timeframe: "Daily",
      markets: ["Crypto", "Forex"],
      isPopular: true
    },
    {
      name: "Volatility Harvester",
      description: "Profits from price volatility while maintaining strict risk controls.",
      performance: 24.5,
      risk: "High" as const,
      timeframe: "Hourly",
      markets: ["Crypto", "Stocks"],
    },
    {
      name: "Mean Reversion Pro",
      description: "Exploits temporary price deviations from statistical averages.",
      performance: 18.9,
      risk: "Low" as const,
      timeframe: "Daily/Weekly",
      markets: ["Stocks", "ETFs"],
    },
    {
      name: "Trend Follower AI",
      description: "AI-powered algorithm that identifies and follows established market trends.",
      performance: 27.3,
      risk: "Medium" as const,
      timeframe: "4H/Daily",
      markets: ["Crypto", "Commodities"],
      isPopular: true
    },
  ];
  
  return (
    <section id="algorithms" className="py-20 relative overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-background/50 z-[-1]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Trading <span className="text-gradient">Algorithms</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our library of battle-tested algorithms or customize your own strategy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {algorithms.map((algo, index) => (
            <AlgorithmCard
              key={index}
              name={algo.name}
              description={algo.description}
              performance={algo.performance}
              risk={algo.risk}
              timeframe={algo.timeframe}
              markets={algo.markets}
              isPopular={algo.isPopular}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Algorithms
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmCards;
