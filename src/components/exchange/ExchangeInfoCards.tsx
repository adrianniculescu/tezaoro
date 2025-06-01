
import React from 'react';
import { Card } from '@/components/ui/card';

const ExchangeInfoCards = () => {
  return (
    <div className="mt-12 grid md:grid-cols-2 gap-8">
      <Card className="glass-card bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Demo Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Sample exchange rates</li>
          <li>• No real transactions</li>
          <li>• Test the interface</li>
          <li>• Experience the flow</li>
        </ul>
      </Card>

      <Card className="glass-card bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Live exchange rates</li>
          <li>• Real transactions</li>
          <li>• 500+ cryptocurrencies</li>
          <li>• Competitive fees</li>
        </ul>
      </Card>
    </div>
  );
};

export default ExchangeInfoCards;
