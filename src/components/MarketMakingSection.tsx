
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChartLine, CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketMakingSection = () => {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-gradient">Market Making Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized liquidity solutions tailored for projects of all sizes, focusing on stability and sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="glass-card col-span-1 lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-tezaoro-500/20 flex items-center justify-center">
                    <CircleDollarSign className="h-8 w-8 text-tezaoro-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Crypto Token Market Making for Nano-Cap Projects
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Turn nano-cap volatility into sustainable growth with our specialized market making solution. Starting at just $299/month, our AI-powered service helps projects with $1M-$10M market cap achieve stability, growth, and investor trust.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">24/7 Liquidity</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">Multi-Exchange Support</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">From $299/Month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card flex items-center">
            <CardContent className="p-6 flex flex-col justify-center items-center h-full w-full">
              <ChartLine className="h-12 w-12 text-tezaoro-400 mb-4" />
              <h3 className="text-xl font-bold mb-4 text-center">Liquidity Engine for Nano-Caps</h3>
              <p className="text-muted-foreground text-center mb-6">
                Stability, Growth, & Trust for your token project
              </p>
              <Button className="w-full" asChild>
                <Link to="/market-making">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketMakingSection;
