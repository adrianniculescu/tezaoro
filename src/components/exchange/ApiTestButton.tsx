
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useChangellyExchange } from '@/hooks/useChangellyExchange';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ApiTestButton = () => {
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const { getCurrencies } = useChangellyExchange();
  const { toast } = useToast();

  const testApiConnection = async () => {
    setIsTestingApi(true);
    setTestResult(null);

    try {
      console.log('🧪 Testing Changelly API connection...');
      const currencies = await getCurrencies();
      
      if (currencies && Array.isArray(currencies) && currencies.length > 0) {
        console.log('✅ API test successful:', currencies.length, 'currencies found');
        setTestResult('success');
        toast({
          title: "API Connection Successful! 🎉",
          description: `Connected to Changelly API - Found ${currencies.length} available currencies`,
        });
      } else {
        throw new Error('No currencies returned from API');
      }
    } catch (error) {
      console.error('❌ API test failed:', error);
      setTestResult('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast({
        title: "API Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={testApiConnection}
        disabled={isTestingApi}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isTestingApi ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : testResult === 'success' ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : testResult === 'error' ? (
          <AlertCircle className="h-4 w-4 text-red-600" />
        ) : null}
        {isTestingApi ? 'Testing API...' : 'Test API Connection'}
      </Button>
      
      {testResult === 'success' && (
        <span className="text-sm text-green-600 font-medium">API Working!</span>
      )}
      {testResult === 'error' && (
        <span className="text-sm text-red-600 font-medium">API Failed</span>
      )}
    </div>
  );
};

export default ApiTestButton;
