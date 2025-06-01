
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import TradingSolutionsSection from '@/components/home/TradingSolutionsSection';

const TradingTools = () => {
  return (
    <PageLayout title="Trading Tools | Tezaoro">
      <PageHeader 
        title="Professional Trading Tools" 
        description="Access our complete suite of integrated trading solutions"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TradingSolutionsSection />
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose Our Trading Tools?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
                <p className="text-muted-foreground">
                  All tools work together within a single platform, sharing data and providing unified analytics.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Real-time market analysis, performance tracking, and AI-powered insights across all your trades.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Professional Grade</h3>
                <p className="text-muted-foreground">
                  Enterprise-level security, reliability, and performance trusted by professional traders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TradingTools;
