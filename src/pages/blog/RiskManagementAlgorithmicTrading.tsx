
import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RiskManagementAlgorithmicTrading = () => {
  return (
    <PageLayout title="Risk Management in Algorithmic Trading">
      <Helmet>
        <title>Risk Management in Algorithmic Trading: Essential Strategies</title>
        <meta name="description" content="Master risk management for algorithmic trading. Learn stop-loss strategies, position sizing, and volatility control." />
        <meta name="keywords" content="algorithmic trading risk management, stop loss strategies, position sizing, trading risk control" />
        <link rel="canonical" href="https://tezaoro.com/guide/risk-management-algorithmic-trading" />
      </Helmet>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Risk Management</Badge>
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
              Risk Management in Algorithmic Trading: Essential Strategies
            </h1>
            
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-8 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png" 
                alt="Tezaoro - Risk Management Guide"
                className="max-w-xs h-auto"
              />
            </div>
          </div>

          <Card className="glass-card bg-card p-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Effective risk management is the backbone of successful algorithmic trading. Without it, even the best strategies can lead to significant losses. This guide covers proven risk management techniques to help you protect your capital and trade with confidence.
              </p>

              <h2 className="text-2xl font-bold mb-4">Why Risk Management Matters in Algorithmic Trading</h2>
              <p className="mb-6">
                Algorithmic trading can execute hundreds of trades automatically, amplifying both gains and losses. Proper risk controls ensure that a single bad trade or market event doesn't wipe out your gains.
              </p>

              <h2 className="text-2xl font-bold mb-4">Key Risk Metrics</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Drawdown:</strong> The largest drop from a peak to a trough in your portfolio value.</li>
                <li><strong>Volatility:</strong> Measures how much your returns fluctuate.</li>
                <li><strong>Sharpe Ratio:</strong> Compares your returns to the risk taken.</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4">Setting Stop-Loss and Take-Profit Levels</h2>
              <p className="mb-6">
                Stop-loss orders automatically close a losing trade at a predetermined level, while take-profit orders lock in gains. Both are essential for automated strategies.
              </p>

              <h2 className="text-2xl font-bold mb-4">Position Sizing and Diversification</h2>
              <p className="mb-6">
                Never risk more than a small percentage of your capital on a single trade. Diversify across assets and strategies to reduce overall risk.
              </p>

              <h2 className="text-2xl font-bold mb-4">Tezaoro's Built-In Risk Management Tools</h2>
              <p className="mb-6">
                Tezaoro offers advanced risk controls, including customizable stop-loss, take-profit, and position sizing features. Real-time monitoring and alerts help you stay on top of your portfolio's risk profile.
              </p>

              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="mb-6">
                Risk management isn't optional—it's essential. By applying these strategies and using Tezaoro's built-in tools, you can trade more confidently and sustainably.
              </p>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Learn more about risk management tools</p>
                <div className="flex gap-4">
                  <Link to="/performance" className="text-primary hover:underline">Performance Metrics</Link>
                  <Link to="/features" className="text-primary hover:underline">Platform Features</Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </PageLayout>
  );
};

export default RiskManagementAlgorithmicTrading;
