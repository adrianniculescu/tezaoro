
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';

const DeployingFirstAlgorithm = () => {
  return (
    <PageLayout title="Deploying Your First Algorithm">
      <GuideContent title="Deploying Your First Algorithm">
        <div className="prose prose-invert max-w-none">
          <h2>Your First Trading Algorithm on Tezaoro</h2>
          
          <p className="text-lg mb-6">
            This guide will walk you through selecting, configuring, and deploying your first trading algorithm on our platform.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 1: Browse the Algorithm Library</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Accessing Algorithms</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Navigate to the "Algorithms" section in your dashboard</li>
            <li>Use filters to narrow down strategies by:
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Asset class (Crypto, Forex, Stocks)</li>
                <li>Risk level (Conservative, Moderate, Aggressive)</li>
                <li>Expected returns and maximum drawdown</li>
                <li>Minimum capital requirements</li>
              </ul>
            </li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Algorithm Analysis</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Review historical performance data</li>
            <li>Examine backtesting results over different market conditions</li>
            <li>Check algorithm ratings and user reviews</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 2: Algorithm Selection</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Recommended for Beginners:</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Grid Trading Bot: Profits from market volatility</li>
            <li>DCA (Dollar Cost Averaging): Reduces timing risk</li>
            <li>Simple Moving Average Crossover: Classic trend-following strategy</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Key Metrics to Consider:</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Sharpe ratio (risk-adjusted returns)</li>
            <li>Maximum drawdown</li>
            <li>Win rate and average trade duration</li>
            <li>Capital requirements</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 3: Configuration</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Basic Settings</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Select your trading pair (e.g., BTC/USDT)</li>
            <li>Set initial capital allocation</li>
            <li>Choose your connected exchange account</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Risk Parameters</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Maximum position size (% of portfolio)</li>
            <li>Stop-loss percentage</li>
            <li>Take-profit targets</li>
            <li>Maximum daily loss limits</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Advanced Settings (Optional)</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Custom indicator parameters</li>
            <li>Rebalancing frequency</li>
            <li>Market condition filters</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 4: Paper Trading (Recommended)</h3>
          <p>Before deploying real capital:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Enable "Paper Trading" mode</li>
            <li>Run the algorithm for 7-14 days</li>
            <li>Monitor performance and adjust parameters</li>
            <li>Gain confidence in the strategy</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 5: Live Deployment</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Final Checks</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Verify all settings and parameters</li>
            <li>Ensure sufficient account balance</li>
            <li>Confirm risk management rules are active</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Deployment Process</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Click "Deploy Algorithm"</li>
            <li>Confirm your settings in the popup</li>
            <li>Enter your 2FA code</li>
            <li>Monitor initial trades closely</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Step 6: Monitoring and Management</h3>
          <h4 className="text-lg font-medium mt-6 mb-3">Daily Monitoring</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Check algorithm performance in real-time</li>
            <li>Review trade history and P&L</li>
            <li>Monitor risk metrics and exposure</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">Optimization</h4>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Analyze performance after 30 days</li>
            <li>Adjust parameters based on market conditions</li>
            <li>Consider scaling successful strategies</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Important Reminders</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Start with small capital allocation (1-5% of portfolio)</li>
            <li>Never deploy algorithms you don't understand</li>
            <li>Regularly monitor and review performance</li>
            <li>Have an exit strategy prepared</li>
          </ul>
          
          <div className="bg-card/50 p-6 rounded-lg mt-8">
            <p className="font-medium">Need Help? Contact us at <a href="mailto:office@tezaoro.com" className="text-primary">office@tezaoro.com</a></p>
            
            <p className="text-muted-foreground mt-4">
              Note: Since Tezaoro is in MVP phase, features and interfaces may evolve. We'll notify all users of significant updates and improvements.
            </p>
          </div>
          
          <div className="border-t border-border mt-8 pt-8">
            <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><a href="/platform/platform-overview" className="text-primary hover:underline">Platform Overview</a> - Get familiar with the Tezaoro interface</li>
              <li><a href="/platform/account-setup" className="text-primary hover:underline">Account Setup</a> - Configure your security settings and preferences</li>
            </ul>
          </div>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default DeployingFirstAlgorithm;
