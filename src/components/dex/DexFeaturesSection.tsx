
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Zap, BarChart3 } from 'lucide-react';

const DexFeaturesSection = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-center mb-8">DEX Aggregator Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
          <h4 className="font-semibold mb-2">MEV Protection</h4>
          <p className="text-sm text-muted-foreground">
            Advanced protection against maximal extractable value attacks
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
          <h4 className="font-semibold mb-2">Gas Optimization</h4>
          <p className="text-sm text-muted-foreground">
            Smart routing to minimize gas fees and maximize efficiency
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
          <h4 className="font-semibold mb-2">200+ DEXs</h4>
          <p className="text-sm text-muted-foreground">
            Access aggregated liquidity from hundreds of decentralized exchanges
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DexFeaturesSection;
