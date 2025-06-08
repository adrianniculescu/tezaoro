
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface DexStatusBannerProps {
  apiError: string | null;
  useMockData: boolean;
}

const DexStatusBanner = ({ apiError, useMockData }: DexStatusBannerProps) => {
  // Show success banner when everything is working
  if (!apiError && !useMockData) {
    return (
      <Card className="p-4 mb-6 border-green-200 bg-green-50">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Live DEX Aggregation Active</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Connected to 200+ decentralized exchanges with real-time pricing.
        </p>
      </Card>
    );
  }

  // Show demo mode banner
  if (useMockData && !apiError) {
    return (
      <Card className="p-4 mb-6 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-2 text-blue-700">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Demo Environment - Explore with sample data</span>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Experience the interface with demo data while we prepare the full functionality.
        </p>
      </Card>
    );
  }

  // Show error banner
  if (apiError) {
    return (
      <Card className="p-4 mb-6 border-yellow-200 bg-yellow-50">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">Some features temporarily limited</span>
        </div>
        <p className="text-sm text-yellow-600 mt-1">
          {apiError}
        </p>
      </Card>
    );
  }

  return null;
};

export default DexStatusBanner;
