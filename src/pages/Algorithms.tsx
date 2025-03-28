
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, BarChart2, CandlestickChart, Waves, 
  Zap, Timer, Cpu, Activity, AlertTriangle
} from 'lucide-react';

interface AlgorithmDetailsProps {
  name: string;
  type: string;
  description: string;
  useCase: string;
  performanceRange: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  timeframe: string;
  icon: React.ReactNode;
}

const AlgorithmDetails = ({ 
  name, type, description, useCase, performanceRange, riskLevel, timeframe, icon 
}: AlgorithmDetailsProps) => {
  const riskColor = {
    Low: 'bg-green-500/10 text-green-500',
    Medium: 'bg-yellow-500/10 text-yellow-500',
    High: 'bg-red-500/10 text-red-500',
  }[riskLevel];
  
  return (
    <Card className="glass-card bg-card p-8 mb-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 flex flex-col items-center md:items-start">
          <div className="p-6 bg-primary/10 rounded-full mb-4">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <Badge className="mb-4">{type}</Badge>
          
          <div className="w-full space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Performance Range</div>
              <div className="text-lg font-bold flex items-center text-primary">
                {performanceRange}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
              <div className={`text-sm font-medium py-1 px-2 rounded-full inline-block ${riskColor}`}>
                {riskLevel}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Timeframe</div>
              <div className="text-sm font-medium flex items-center">
                <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
                {timeframe}
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/4">
          <h4 className="text-lg font-semibold mb-3">Algorithm Description</h4>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <h4 className="text-lg font-semibold mb-3">Ideal Use Cases</h4>
          <p className="text-muted-foreground mb-6">{useCase}</p>
          
          <div className="bg-background/40 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-accent" />
              <h4 className="text-lg font-semibold">Important Consideration</h4>
            </div>
            <p className="text-muted-foreground">
              Past performance is not indicative of future results. All algorithmic trading involves risk. 
              The performance ranges listed are based on historical backtests and live trading results, 
              but actual performance may vary depending on market conditions.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Algorithms = () => {
  const algorithms = [
    {
      name: "Momentum Alpha",
      type: "Trend Following",
      description: "The Momentum Alpha algorithm capitalizes on sustained price movements across multiple timeframes. By analyzing the strength and duration of price trends, it identifies assets with strong momentum and enters positions in the direction of the trend. The algorithm incorporates volume analysis and volatility filters to validate momentum signals and avoid false breakouts.",
      useCase: "Ideal for trending markets with clear directional movements. Particularly effective in stocks, commodities, and crypto markets during strong bull or bear phases. Can be deployed across multiple assets simultaneously to capture sector or market-wide momentum.",
      performanceRange: "25-35% annually",
      riskLevel: "Medium" as const,
      timeframe: "Daily",
      icon: <TrendingUp className="h-12 w-12 text-primary" />
    },
    {
      name: "Volatility Harvester",
      type: "Market Neutral",
      description: "The Volatility Harvester algorithm is designed to profit from price volatility while maintaining strict risk controls. It identifies periods of expected increased volatility and employs various options strategies or volatility-based trades. The algorithm adapts to changing volatility regimes and can take both long and short volatility positions depending on market conditions.",
      useCase: "Particularly effective around major economic announcements, earnings releases, and during periods of market uncertainty. Can be used as a portfolio hedge during turbulent markets or as a standalone strategy to generate alpha regardless of market direction.",
      performanceRange: "20-30% annually",
      riskLevel: "High" as const,
      timeframe: "Hourly",
      icon: <Activity className="h-12 w-12 text-primary" />
    },
    {
      name: "Mean Reversion Pro",
      type: "Statistical Arbitrage",
      description: "The Mean Reversion Pro algorithm exploits temporary price deviations from statistical averages. It identifies when assets have moved significantly away from their historical means and takes positions anticipating a return to average values. The algorithm utilizes advanced statistical methods to determine overbought and oversold conditions with high probability of mean reversion.",
      useCase: "Best suited for range-bound markets and assets with established trading ranges. Performs well in sideways markets where trend-following strategies struggle. Can be applied to various asset classes including stocks, ETFs, and certain forex pairs with mean-reverting tendencies.",
      performanceRange: "15-25% annually",
      riskLevel: "Low" as const,
      timeframe: "Daily/Weekly",
      icon: <Waves className="h-12 w-12 text-primary" />
    },
    {
      name: "Trend Follower AI",
      type: "Machine Learning",
      description: "The Trend Follower AI is our most advanced algorithm that employs deep learning neural networks to identify and follow established market trends. Unlike traditional trend following systems, it can adapt to changing market dynamics and recognize complex patterns that would be invisible to conventional technical analysis. The AI continually learns from market data and adjusts its parameters to optimize performance.",
      useCase: "Versatile strategy that works across various market conditions, though it excels in trending markets. The adaptive nature makes it suitable for changing market regimes. Deployed primarily in liquid markets like major forex pairs, popular cryptocurrencies, and large-cap stocks where data quality is highest.",
      performanceRange: "25-40% annually",
      riskLevel: "Medium" as const,
      timeframe: "4H/Daily",
      icon: <Cpu className="h-12 w-12 text-primary" />
    },
    {
      name: "Quantitative Value",
      type: "Fundamental",
      description: "The Quantitative Value algorithm combines fundamental analysis with quantitative methods to identify undervalued assets with strong growth potential. It analyzes financial statements, growth metrics, and various valuation ratios to select assets trading below their intrinsic value. The algorithm employs a systematic ranking system to prioritize the most attractive opportunities.",
      useCase: "Designed for long-term investors seeking capital appreciation with moderate risk. Works best in traditional equity markets where fundamental data is abundant and reliable. Can be used as a core investment strategy with lower turnover compared to more active algorithms.",
      performanceRange: "15-25% annually",
      riskLevel: "Low" as const,
      timeframe: "Weekly/Monthly",
      icon: <BarChart2 className="h-12 w-12 text-primary" />
    },
    {
      name: "Pattern Scanner",
      type: "Technical",
      description: "The Pattern Scanner algorithm identifies and capitalizes on recurring chart patterns across multiple timeframes. It uses computer vision and pattern recognition technology to detect formations like head and shoulders, double tops/bottoms, triangles, and other high-probability patterns. The algorithm calculates the statistical likelihood of pattern completion and sizes positions accordingly.",
      useCase: "Applicable across most markets and timeframes, though particularly effective in liquid markets with clear technical patterns. Can be used as a standalone strategy or as a confirmation tool alongside other algorithms. Provides specific entry, stop-loss, and take-profit levels based on the identified patterns.",
      performanceRange: "20-30% annually",
      riskLevel: "Medium" as const,
      timeframe: "Hourly/Daily",
      icon: <CandlestickChart className="h-12 w-12 text-primary" />
    },
  ];

  return (
    <PageLayout title="Algorithms">
      <PageHeader 
        title="Our Trading Algorithms" 
        description="Discover our suite of advanced trading algorithms designed to navigate complex markets"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-gradient">AI-Powered</span> Algorithms
            </h2>
            <p className="text-lg text-muted-foreground">
              Our algorithms combine sophisticated mathematical models with machine learning to identify 
              trading opportunities across various market conditions. Each algorithm is rigorously 
              backtested and continuously optimized to deliver consistent performance.
            </p>
          </div>
          
          <div className="space-y-8">
            {algorithms.map((algo, index) => (
              <AlgorithmDetails
                key={index}
                name={algo.name}
                type={algo.type}
                description={algo.description}
                useCase={algo.useCase}
                performanceRange={algo.performanceRange}
                riskLevel={algo.riskLevel}
                timeframe={algo.timeframe}
                icon={algo.icon}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Custom Algorithm Development</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Need a specialized algorithm for your unique trading requirements? Our team of quants and machine 
              learning engineers can develop custom algorithms tailored to your specific needs.
            </p>
            <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
              Inquire About Custom Algorithms (Coming Soon)
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Algorithms;
