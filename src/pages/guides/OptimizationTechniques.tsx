
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';
import { Settings, Activity, BarChart4, Layers, Bell, Lightbulb } from 'lucide-react';

const OptimizationTechniques = () => {
  return (
    <PageLayout title="Optimization Techniques">
      <GuideContent title="Optimization Techniques">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">
            Optimization is the process of refining your algorithms to achieve better returns, lower risk, or improved consistency. Tezaoro provides several techniques and best practices for ongoing improvement:
          </p>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">1. Parameter Tuning:</h3>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Adjust key variables (e.g., stop-loss, take-profit, moving averages) and backtest the results.</li>
              <li>Use grid search or automated optimization tools to find the best parameter combinations.</li>
            </ul>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">2. Walk-Forward Analysis:</h3>
            </div>
            <p>
              Test your algorithm on a rolling basis, using past data to optimize parameters and then validating on unseen data to avoid overfitting.
            </p>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart4 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">3. Risk Management Adjustments:</h3>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Experiment with different position sizing, leverage, and risk limits.</li>
              <li>Monitor how changes impact drawdown, volatility, and overall returns.</li>
            </ul>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">4. Diversification:</h3>
            </div>
            <p>
              Combine multiple algorithms or asset classes to reduce overall risk and smooth returns.
            </p>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">5. Performance Monitoring:</h3>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Regularly review dashboard metrics and reports to identify underperformance or drift.</li>
              <li>Set alerts for key metrics (e.g., drawdown exceeds threshold) to take timely action.</li>
            </ul>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">6. Continuous Learning:</h3>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>Stay informed about market changes and new trading techniques.</li>
              <li>Incorporate feedback from live and paper trading to refine your approach.</li>
            </ul>
          </div>
          
          <div className="bg-amber-500/10 border-amber-500/30 p-4 rounded-md mt-10">
            <p className="font-medium text-amber-200">
              Note: Always validate optimizations with out-of-sample data before deploying changes to live trading.
            </p>
          </div>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default OptimizationTechniques;
