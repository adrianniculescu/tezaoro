
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRightLeft, CreditCard, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const TradingSolutionsSection = () => {
  const handleLinkClick = (path: string) => {
    console.log(`TradingSolutionsSection: Attempting to navigate to ${path}`);
  };

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Integrated <span className="text-gradient">Trading Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access powerful trading tools and payment solutions seamlessly integrated into Tezaoro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="glass-card bg-card p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightLeft className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Exchange</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Swap between 500+ cryptocurrencies instantly with competitive rates
              </p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center gap-2 text-xs">
                <Zap className="h-3 w-3 text-green-500" />
                <span>Lightning fast</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <span>Best rates</span>
              </div>
            </div>

            <Link to="/exchange" onClick={() => handleLinkClick('/exchange')}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Start Trading
              </Button>
            </Link>
          </Card>

          <Card className="glass-card bg-card p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fiat Gateway</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Buy and sell crypto with credit cards and bank transfers
              </p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center gap-2 text-xs">
                <CreditCard className="h-3 w-3 text-green-500" />
                <span>Instant cards</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <TrendingUp className="h-3 w-3 text-blue-500" />
                <span>40+ currencies</span>
              </div>
            </div>

            <Link to="/fiat-gateway" onClick={() => handleLinkClick('/fiat-gateway')}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Buy Crypto
              </Button>
            </Link>
          </Card>

          <Card className="glass-card bg-card p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">DEX Aggregator</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Access the best prices across 200+ decentralized exchanges
              </p>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center gap-2 text-xs">
                <BarChart3 className="h-3 w-3 text-green-500" />
                <span>200+ DEXs</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <Zap className="h-3 w-3 text-blue-500" />
                <span>MEV protection</span>
              </div>
            </div>

            <Link to="/dex-aggregator" onClick={() => handleLinkClick('/dex-aggregator')}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Swap Now
              </Button>
            </Link>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Seamlessly integrated with our algorithmic trading platform
          </p>
          <div className="flex justify-center gap-4">
            <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
              No Additional Accounts
            </span>
            <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
              Unified Dashboard
            </span>
            <span className="text-sm bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">
              Single Sign-On
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingSolutionsSection;
