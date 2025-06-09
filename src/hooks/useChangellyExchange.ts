import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ExchangeQuote {
  from: string;
  to: string;
  amount: string;
  rate: string;
  result: string;
  fee: string;
  networkFee: string;
}

interface Transaction {
  id: string;
  status: string;
  from: string;
  to: string;
  amount: string;
  expectedAmount: string;
  payinAddress: string;
  payoutAddress: string;
  createdAt: string;
}

export const useChangellyExchange = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrencies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const requestStartTime = Date.now();
      console.log('🔄 [Hook] Requesting currencies from Changelly API...');
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getCurrencies'
        }
      });

      const requestTime = Date.now() - requestStartTime;
      console.log(`📡 [Hook] Supabase function response received in ${requestTime}ms:`, { 
        hasData: !!data, 
        hasError: !!supabaseError,
        dataKeys: data ? Object.keys(data) : [],
        errorDetails: supabaseError
      });

      if (supabaseError) {
        console.error('❌ [Hook] Supabase function error:', supabaseError);
        const errorMessage = `API Connection Failed: ${supabaseError.message}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      if (data?.error) {
        console.error('❌ [Hook] Changelly API error from edge function:', data.error);
        let errorMessage = 'API Configuration Error';
        
        // Check for specific error types
        if (data.error.includes('401') || data.error.includes('Unauthorized')) {
          errorMessage = 'Invalid API credentials - please check your Changelly API keys';
        } else if (data.error.includes('placeholder') || data.error.includes('your_')) {
          errorMessage = 'Placeholder API credentials detected - please update with real Changelly keys';
        } else if (data.error.includes('timeout') || data.error.includes('timed out')) {
          errorMessage = 'API request timed out - please try again';
        } else if (data.error.includes('Network error')) {
          errorMessage = 'Network connection failed - check your internet connection';
        } else {
          errorMessage = data.error.details || data.error || 'Failed to get currencies';
        }
        
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data?.result) {
        const errorMessage = 'No currencies returned from Changelly API';
        console.warn('⚠️ [Hook]', errorMessage, 'Full response:', data);
        setError(errorMessage);
        return [];
      }

      console.log('✅ [Hook] Successfully retrieved currencies:', {
        count: data.result?.length || 0,
        sampleCurrencies: data.result?.slice(0, 5),
        debugInfo: data.debugInfo,
        totalRequestTime: requestTime
      });
      
      setError(null);
      return data.result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get currencies';
      console.error('❌ [Hook] getCurrencies error:', {
        error: err,
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined
      });
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getExchangeAmount = async (from: string, to: string, amount: string): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const requestStartTime = Date.now();
      console.log(`🔄 [Hook] Calculating exchange: ${amount} ${from} -> ${to}`);
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getExchangeAmount',
          from,
          to,
          amount
        }
      });

      const requestTime = Date.now() - requestStartTime;
      console.log(`📡 [Hook] Exchange amount response received in ${requestTime}ms:`, { 
        hasData: !!data, 
        hasError: !!supabaseError,
        dataKeys: data ? Object.keys(data) : []
      });

      if (supabaseError) {
        console.error('❌ [Hook] Supabase function error:', supabaseError);
        const errorMessage = `API Connection Failed: ${supabaseError.message}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }
      
      if (data?.error) {
        console.error('❌ [Hook] Changelly API error:', data.error);
        let errorMessage = 'API Configuration Error';
        
        if (data.error.includes('401') || data.error.includes('Unauthorized')) {
          errorMessage = 'Invalid API credentials - please check your Changelly API keys';
        } else if (data.error.includes('placeholder') || data.error.includes('your_')) {
          errorMessage = 'Placeholder API credentials detected - please update with real Changelly keys';
        } else if (data.error.includes('timeout') || data.error.includes('timed out')) {
          errorMessage = 'API request timed out - please try again';
        } else {
          errorMessage = data.error.details || data.error || 'Failed to get exchange amount';
        }
        
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data?.result && data?.result !== 0) {
        const errorMessage = 'No exchange amount returned from API';
        console.warn('⚠️ [Hook]', errorMessage, 'Full response:', data);
        setError(errorMessage);
        return '0';
      }

      console.log('✅ [Hook] Successfully calculated exchange amount:', {
        result: data.result,
        debugInfo: data.debugInfo,
        totalRequestTime: requestTime
      });
      
      setError(null);
      return String(data.result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate exchange';
      console.error('❌ [Hook] getExchangeAmount error:', {
        error: err,
        message: errorMessage
      });
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (
    from: string, 
    to: string, 
    amount: string, 
    address: string, 
    refundAddress?: string
  ): Promise<Transaction> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔄 Creating transaction: ${amount} ${from} -> ${to} to ${address}`);
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'createTransaction',
          from,
          to,
          amount,
          address,
          refundAddress
        }
      });

      console.log('📡 Supabase function response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('❌ Supabase function error:', supabaseError);
        throw new Error(`Function invocation failed: ${supabaseError.message}`);
      }
      
      if (data?.error) {
        console.error('❌ Changelly API error:', data.error);
        throw new Error(data.error.details || data.error || 'Failed to create transaction');
      }

      if (!data?.result) {
        console.warn('⚠️ No transaction data returned from API');
        throw new Error('No transaction data received');
      }

      console.log('✅ Successfully created transaction:', data.result);
      return data.result;
    } catch (err) {
      console.error('❌ createTransaction error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create transaction';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionStatus = async (transactionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔄 Getting status for transaction: ${transactionId}`);
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getStatus',
          id: transactionId
        }
      });

      console.log('📡 Supabase function response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('❌ Supabase function error:', supabaseError);
        throw new Error(`Function invocation failed: ${supabaseError.message}`);
      }
      
      if (data?.error) {
        console.error('❌ Changelly API error:', data.error);
        throw new Error(data.error.details || data.error || 'Failed to get transaction status');
      }

      console.log('✅ Successfully retrieved transaction status:', data.result);
      return data.result;
    } catch (err) {
      console.error('❌ getTransactionStatus error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get transaction status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getCurrencies,
    getExchangeAmount,
    createTransaction,
    getTransactionStatus
  };
};
