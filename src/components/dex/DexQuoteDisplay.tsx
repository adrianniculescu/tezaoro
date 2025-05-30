
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface DexQuoteDisplayProps {
  quote: any;
  useMockData: boolean;
}

const DexQuoteDisplay = ({ quote, useMockData }: DexQuoteDisplayProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Quote Details</h3>
      </div>

      {quote ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Exchange Rate</span>
            <span className="font-medium">{quote.rate || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Estimated Gas</span>
            <span className="font-medium">{quote.estimatedGas || 'N/A'}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price Impact</span>
            <Badge variant={parseFloat(quote.priceImpact || '0') > 5 ? 'destructive' : 'secondary'}>
              {quote.priceImpact || '0'}%
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Route</span>
            <span className="text-xs text-muted-foreground">{quote.protocols?.join(' → ') || 'Direct'}</span>
          </div>

          {useMockData && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600">
                Demo data shown for interface testing
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Enter swap details to get a quote</p>
        </div>
      )}
    </Card>
  );
};

export default DexQuoteDisplay;
