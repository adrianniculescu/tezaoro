
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface DexStatusBannerProps {
  apiError: string | null;
  useMockData: boolean;
}

const DexStatusBanner = ({ apiError, useMockData }: DexStatusBannerProps) => {
  // Don't show banner if everything is working normally
  if (!apiError && !useMockData) return null;

  // Determine the appropriate message and styling
  let message = '';
  let description = '';
  
  if (useMockData && !apiError) {
    // Demo mode
    message = 'Demo Environment - Explore with sample data';
    description = 'Experience the interface with demo data while we prepare the full functionality.';
  } else if (apiError) {
    // Partial issues
    message = 'Some features temporarily limited';
    description = apiError;
  }

  return (
    <Card className="p-4 mb-6 border-blue-200 bg-blue-50">
      <div className="flex items-center gap-2 text-blue-700">
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">{message}</span>
      </div>
      <p className="text-sm text-blue-600 mt-1">
        {description}
      </p>
    </Card>
  );
};

export default DexStatusBanner;
