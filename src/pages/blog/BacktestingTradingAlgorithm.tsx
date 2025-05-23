
import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BacktestingTradingAlgorithm = () => {
  return (
    <PageLayout title="Backtesting 101: How to Validate Your Trading Algorithm">
      <Helmet>
        <title>Backtesting 101: How to Validate Your Trading Algorithm</title>
        <meta name="description" content="Learn how to backtest trading algorithms effectively. Avoid overfitting and ensure your strategy works in real markets." />
        <meta name="keywords" content="backtesting trading algorithms, trading strategy validation, algorithm testing, trading backtesting tools" />
        <link rel="canonical" href="https://tezaoro.com/guide/backtesting-trading-algorithm" />
      </Helmet>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Strategy Testing</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Tezaoro Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Backtesting 101: How to Validate Your Trading Algorithm
            </h1>
            
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-8 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png" 
                alt="Tezaoro - Backtesting Guide"
                className="max-w-xs h-auto"
              />
            </div>
          </div>

          <Card className="glass-card bg-card p-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Before risking real capital, it's crucial to test your trading algorithm on historical data—a process known as backtesting. Proper backtesting reveals how your strategy would have performed and helps you avoid costly mistakes.
              </p>

              <h2 className="text-2xl font-bold mb-4">What Is Backtesting and Why It Matters</h2>
              <p className="mb-6">
                Backtesting simulates your algorithm's trades using past market data. This allows you to analyze performance, identify weaknesses, and refine your approach before going live.
              </p>

              <h2 className="text-2xl font-bold mb-4">Common Backtesting Mistakes to Avoid</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Overfitting:</strong> Designing a strategy that performs well only on past data but fails in real markets.</li>
                <li><strong>Ignoring Slippage and Fees:</strong> Always include realistic trading costs and execution delays in your tests.</li>
                <li><strong>Small Sample Size:</strong> Test over various market conditions and timeframes for reliable results.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Step-by-Step Backtesting with Tezaoro</h2>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Select your algorithm and the asset you want to test.</li>
                <li>Choose a historical period that includes different market conditions.</li>
                <li>Run the backtest and review key metrics: total return, drawdown, win rate, and Sharpe ratio.</li>
                <li>Adjust parameters and repeat until you achieve consistent, robust results.</li>
              </ol>

              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="mb-6">
                Backtesting is an essential part of algorithmic trading. By validating your strategies with Tezaoro's tools, you can trade with greater confidence and reduce the risk of unexpected losses.
              </p>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Learn more about trading strategies</p>
                <div className="flex gap-4">
                  <Link to="/guide/choose-algorithmic-trading-platform" className="text-primary hover:underline">Choose a Platform</Link>
                  <Link to="/guide/building-first-trading-bot" className="text-primary hover:underline">Build Your First Bot</Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </PageLayout>
  );
};

export default BacktestingTradingAlgorithm;
