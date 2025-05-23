
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';
import { LineChart, BarChart } from 'lucide-react';

const PerformanceDashboardGuide = () => {
  return (
    <PageLayout title="Performance Dashboard Guide">
      <GuideContent title="Performance Dashboard Guide">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">
            The Performance Dashboard is your central hub for monitoring and analyzing your algorithm's results.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Dashboard Overview:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-10">
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Portfolio Value Chart</h3>
              </div>
              <p>
                Visualizes your portfolio's growth over time, with options to zoom in on specific periods.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Key Metrics Panel</h3>
              </div>
              <p>
                Displays real-time values for total return, Sharpe ratio, drawdown, and more.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <LineChart className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Trade History Table</h3>
              </div>
              <p>
                Lists every executed trade with details such as entry/exit time, asset, position size, P&L, and fees.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <BarChart className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Risk Heatmap</h3>
              </div>
              <p>
                Highlights periods of high risk or volatility, helping you spot patterns and potential issues.
              </p>
            </div>
          </div>
          
          <div className="bg-card/50 p-6 rounded-lg border border-border mb-10">
            <h3 className="text-xl font-bold mb-4">Customizable Widgets:</h3>
            <p>
              Add, remove, or rearrange dashboard elements to focus on the data that matters most to you.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How to Use:</h2>
          
          <ol className="space-y-4 list-decimal ml-6 my-6">
            <li>Select your algorithm or portfolio from the dropdown menu.</li>
            <li>Adjust the date range to analyze specific periods.</li>
            <li>Hover over charts for detailed data points.</li>
            <li>Export data for offline analysis or reporting.</li>
          </ol>
          
          <p className="text-lg mt-6">
            The dashboard updates in real-time, ensuring you always have the latest insights at your fingertips.
          </p>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default PerformanceDashboardGuide;
