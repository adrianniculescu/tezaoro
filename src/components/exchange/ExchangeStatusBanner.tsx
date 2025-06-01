
import React from 'react';
import { Card } from '@/components/ui/card';

const ExchangeStatusBanner = () => {
  return (
    <Card className="p-4 mb-8 border-blue-200 bg-blue-50">
      <div className="text-blue-700">
        <span className="font-medium">Demo Mode</span>
        <p className="text-sm text-blue-600 mt-1">
          This is a demo exchange using sample data for testing purposes.
        </p>
      </div>
    </Card>
  );
};

export default ExchangeStatusBanner;
