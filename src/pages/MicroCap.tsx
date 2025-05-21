
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartLine, CircleDollarSign, ShieldCheck, Zap } from 'lucide-react';

const MicroCap = () => {
  return (
    <PageLayout title="Micro-Cap Liquidity Solutions">
      <div className="container mx-auto px-4 py-12">
        <PageHeader
          title="Micro-Cap Token Market Making"
          description="Professional liquidity provision for emerging crypto projects with market caps between $10M-$50M."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
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
                    Micro-Cap Market Making Strategy
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Drive sustainable growth and market stability with our professional market making solution for projects with $10M-$50M market cap. Our AI-powered service provides consistent liquidity, tighter spreads, and strategic price support starting at $699/month.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">Enhanced Liquidity Depth</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">Smart Exchange Coverage</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/60 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-profit rounded-full"></div>
                      <span className="text-sm">From $699/Month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card flex items-center">
            <CardContent className="p-6 flex flex-col justify-center items-center h-full w-full">
              <ChartLine className="h-12 w-12 text-tezaoro-400 mb-4" />
              <h3 className="text-xl font-bold mb-4 text-center">Advanced Liquidity Solutions</h3>
              <p className="text-muted-foreground text-center mb-6">
                Tailored market making for emerging projects
              </p>
              <Button className="w-full">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 glass-card">
            <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-tezaoro-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Enhanced Liquidity</h3>
            <p className="text-muted-foreground">
              Our algorithms maintain consistent order book depth and tight spreads across multiple exchanges, improving trading conditions for your token.
            </p>
          </Card>

          <Card className="p-6 glass-card">
            <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
              <ChartLine className="h-6 w-6 text-tezaoro-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Price Stability</h3>
            <p className="text-muted-foreground">
              Advanced volatility dampening mechanisms help maintain price stability during both bullish and bearish market conditions.
            </p>
          </Card>

          <Card className="p-6 glass-card">
            <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-tezaoro-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Investment Protection</h3>
            <p className="text-muted-foreground">
              Our market making strategies are designed to promote natural price discovery while preventing manipulation and protecting your investors.
            </p>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Start from $699 per month
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Tailored for projects with market caps between $10M-$50M. Custom solutions available for specific requirements.
          </p>
          <Button size="lg">
            Request a Free Consultation
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default MicroCap;
