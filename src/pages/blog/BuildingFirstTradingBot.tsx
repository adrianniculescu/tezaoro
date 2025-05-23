
import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuildingFirstTradingBot = () => {
  return (
    <PageLayout title="Building Your First Trading Bot Without Coding Skills">
      <Helmet>
        <title>Building Your First Trading Bot Without Coding Skills</title>
        <meta name="description" content="Create your first crypto trading bot with no coding experience. Step-by-step guide using intuitive platforms." />
        <meta name="keywords" content="no code trading bot, build trading bot, crypto bot creation, trading automation for beginners" />
        <link rel="canonical" href="https://tezaoro.com/guide/building-first-trading-bot" />
      </Helmet>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Getting Started</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Tezaoro Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>9 min read</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Building Your First Trading Bot Without Coding Skills
            </h1>
            
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-8 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png" 
                alt="Tezaoro - Build Trading Bot"
                className="max-w-xs h-auto"
              />
            </div>
          </div>

          <Card className="glass-card bg-card p-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                You don't need to be a programmer to build a powerful trading bot. Modern platforms like Tezaoro let anyone automate their strategies with simple, intuitive tools. Here's how to get started.
              </p>

              <h2 className="text-2xl font-bold mb-4">Why No-Code Trading Bots Are Revolutionizing Finance</h2>
              <p className="mb-6">
                No-code platforms democratize algorithmic trading, making it accessible to everyone. You can build, test, and deploy bots using drag-and-drop interfaces or simple configuration screens.
              </p>

              <h2 className="text-2xl font-bold mb-4">Choosing the Right Strategy for Your Bot</h2>
              <p className="mb-6">
                Start with a basic, proven strategy such as mean reversion, momentum, or dollar cost averaging. Define your entry and exit criteria, risk management rules, and asset preferences.
              </p>

              <h2 className="text-2xl font-bold mb-4">Deploying and Monitoring Your Bot on Tezaoro</h2>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Sign up and access the bot builder in your dashboard.</li>
                <li>Select a pre-built strategy or create your own using the visual editor.</li>
                <li>Set your parameters: trading pair, capital allocation, stop-loss, and take-profit levels.</li>
                <li>Test your bot in paper trading mode to ensure it works as expected.</li>
                <li>Deploy your bot live and monitor its performance with real-time analytics.</li>
              </ol>

              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="mb-6">
                Building a trading bot without coding is now possible for everyone. Start simple, test thoroughly, and use Tezaoro's tools to refine your approach and grow your trading skills.
              </p>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Continue learning about trading automation</p>
                <div className="flex gap-4">
                  <Link to="/guide/backtesting-trading-algorithm" className="text-primary hover:underline">Backtesting Guide</Link>
                  <Link to="/guide/risk-management-algorithmic-trading" className="text-primary hover:underline">Risk Management</Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </article>
    </PageLayout>
  );
};

export default BuildingFirstTradingBot;
