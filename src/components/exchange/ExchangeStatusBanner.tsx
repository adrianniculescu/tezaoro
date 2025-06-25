
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

interface ExchangeStatusBannerProps {
  apiError: string | null;
  useMockData: boolean;
}

const ExchangeStatusBanner = ({ apiError, useMockData }: ExchangeStatusBannerProps) => {
  // Show live mode status when everything is working
  if (!apiError && !useMockData) {
    return (
      <Card className="p-4 mb-8 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <CheckCircle className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <span className="font-medium">Live Exchange Rates Active</span>
        </div>
        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
          Connected to Changelly API for real-time cryptocurrency exchange rates.
        </p>
      </Card>
    );
  }

  // Show demo mode or error status
  const isDemo = useMockData && !apiError;
  const borderColor = isDemo ? 'border-blue-200 dark:border-blue-800' : 'border-orange-200 dark:border-orange-800';
  const bgColor = isDemo ? 'bg-blue-50 dark:bg-blue-950' : 'bg-orange-50 dark:bg-orange-950';
  const textColor = isDemo ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300';
  const descColor = isDemo ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400';
  
  return (
    <Card className={`p-4 mb-8 ${borderColor} ${bgColor}`}>
      <div className={`flex items-center gap-2 ${textColor}`}>
        <AlertCircle className="h-4 w-4" />
        <WifiOff className="h-4 w-4" />
        <span className="font-medium">
          {isDemo ? 'Demo Mode' : 'API Connection Issue'}
        </span>
      </div>
      <p className={`text-sm ${descColor} mt-1`}>
        {isDemo 
          ? 'Using sample data for testing purposes. Connect your Changelly API keys for live rates.'
          : apiError || 'Unable to connect to Changelly API. Please check your configuration.'
        }
      </p>
    </Card>
  );
};

export default ExchangeStatusBanner;
