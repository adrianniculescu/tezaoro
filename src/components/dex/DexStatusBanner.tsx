
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface DexStatusBannerProps {
  apiError: string | null;
  useMockData: boolean;
}

const DexStatusBanner = ({ apiError, useMockData }: DexStatusBannerProps) => {
  if (!apiError && !useMockData) return null;

  return (
    <Card className="p-4 mb-6 border-yellow-200 bg-yellow-50">
      <div className="flex items-center gap-2 text-yellow-700">
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">{useMockData ? 'Demo Mode Active' : 'Service Notice'}</span>
      </div>
      <p className="text-sm text-yellow-600 mt-1">
        {useMockData 
          ? 'Using demo data for interface testing. API connection will be restored soon.'
          : apiError
        }
      </p>
    </Card>
  );
};

export default DexStatusBanner;
