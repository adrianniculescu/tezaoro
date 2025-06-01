
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ExchangeStatusBannerProps {
  apiError: string | null;
  useMockData: boolean;
}

const ExchangeStatusBanner = ({ apiError, useMockData }: ExchangeStatusBannerProps) => {
  // Show live mode status when everything is working
  if (!apiError && !useMockData) {
    return (
      <Card className="p-4 mb-8 border-green-200 bg-green-50">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Live Exchange Rates Active</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Connected to Changelly API for real-time cryptocurrency exchange rates.
        </p>
      </Card>
    );
  }

  // Show demo mode or error status
  const isDemo = useMockData && !apiError;
  const borderColor = isDemo ? 'border-blue-200' : 'border-orange-200';
  const bgColor = isDemo ? 'bg-blue-50' : 'bg-orange-50';
  const textColor = isDemo ? 'text-blue-700' : 'text-orange-700';
  const descColor = isDemo ? 'text-blue-600' : 'text-orange-600';
  
  return (
    <Card className={`p-4 mb-8 ${borderColor} ${bgColor}`}>
      <div className={`flex items-center gap-2 ${textColor}`}>
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">
          {isDemo ? 'Demo Mode' : 'Limited Connectivity'}
        </span>
      </div>
      <p className={`text-sm ${descColor} mt-1`}>
        {isDemo 
          ? 'Using sample data for testing purposes.'
          : apiError || 'Some features may be temporarily limited.'
        }
      </p>
    </Card>
  );
};

export default ExchangeStatusBanner;
