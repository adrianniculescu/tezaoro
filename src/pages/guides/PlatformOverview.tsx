
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';

const PlatformOverview = () => {
  return (
    <PageLayout title="Platform Overview">
      <GuideContent title="Platform Overview">
        <div className="prose prose-invert max-w-none">
          <h2>Get familiar with the Tezaoro platform interface and key features</h2>
          
          <p className="text-lg mb-6">
            Welcome to Tezaoro, the advanced AI-powered algorithmic trading platform designed for traders of all levels.
            This guide will help you navigate our interface and understand the core features available to you.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Dashboard Overview</h3>
          <p>
            Your personalized dashboard is the command center for all your trading activities. Here's what you'll find:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Portfolio Summary:</strong> Real-time overview of your assets, performance metrics, and allocation.</li>
            <li><strong>Active Algorithms:</strong> Status and performance of your currently deployed trading algorithms.</li>
            <li><strong>Market Overview:</strong> Current market conditions, key indicators, and trending assets.</li>
            <li><strong>Quick Actions:</strong> Deploy algorithms, manage settings, and access support with one click.</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Key Platform Sections</h3>
          
          <h4 className="text-lg font-medium mt-6 mb-3">1. Algorithm Marketplace</h4>
          <p>
            Browse and select from our library of trading algorithms, each designed for specific market conditions and asset classes.
            Filter by performance metrics, risk levels, and strategy types to find the perfect algorithm for your trading goals.
          </p>
          
          <h4 className="text-lg font-medium mt-6 mb-3">2. Performance Analytics</h4>
          <p>
            Track the performance of your algorithms with advanced analytics tools:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Historical performance charts and metrics</li>
            <li>Risk-adjusted returns analysis</li>
            <li>Drawdown analysis and volatility measurements</li>
            <li>Comparison tools to benchmark against market indices</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">3. Risk Management Center</h4>
          <p>
            Our platform includes sophisticated risk management tools to protect your capital:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Portfolio-wide risk analysis</li>
            <li>Customizable stop-loss and take-profit settings</li>
            <li>Exposure management across different assets</li>
            <li>Volatility-based position sizing recommendations</li>
          </ul>
          
          <h4 className="text-lg font-medium mt-6 mb-3">4. Backtesting Environment</h4>
          <p>
            Test your strategies against historical market data before deploying real capital:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Access to years of historical price data across multiple markets</li>
            <li>Customizable testing parameters and timeframes</li>
            <li>Detailed performance reports and optimization suggestions</li>
            <li>Monte Carlo simulations for robust strategy evaluation</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Navigation Tips</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Global Search:</strong> Use the search bar at the top of the platform to quickly find specific features or information.</li>
            <li><strong>Favorites:</strong> Star your most-used algorithms and reports for quick access from your dashboard.</li>
            <li><strong>Notifications:</strong> Configure alerts for trade executions, performance milestones, and system updates.</li>
            <li><strong>User Menu:</strong> Access your account settings, support resources, and documentation from the user icon in the top right.</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Platform Status</h3>
          <p className="bg-amber-500/10 border border-amber-500/50 text-amber-200 p-4 rounded">
            <strong>Important:</strong> Tezaoro is currently in MVP mode. The platform is open for customers by invitation only! Some features may still be under development, and we welcome your feedback to improve the platform.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Next Steps</h3>
          <p>
            Now that you're familiar with the platform layout, we recommend reviewing these guides:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><a href="/platform/account-setup" className="text-primary hover:underline">Account Setup</a> - Configure your security settings and preferences</li>
            <li><a href="/platform/deploying-first-algorithm" className="text-primary hover:underline">Deploying Your First Algorithm</a> - Start trading with your first algorithm</li>
          </ul>
          
          <p className="mt-8 text-muted-foreground">
            Need help? Contact our support team at <a href="mailto:office@tezaoro.com" className="text-primary">office@tezaoro.com</a>
          </p>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default PlatformOverview;
