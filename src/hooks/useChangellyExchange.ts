
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
      console.log('🔄 Requesting currencies from Changelly API...');
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getCurrencies'
        }
      });

      console.log('📡 Supabase function response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('❌ Supabase function error:', supabaseError);
        throw new Error(`Function invocation failed: ${supabaseError.message}`);
      }
      
      if (data?.error) {
        console.error('❌ Changelly API error:', data.error);
        throw new Error(data.error.details || data.error || 'Failed to get currencies');
      }

      if (!data?.result) {
        console.warn('⚠️ No currencies returned from API');
        return [];
      }

      console.log('✅ Successfully retrieved currencies:', data.result?.length || 0);
      return data.result;
    } catch (err) {
      console.error('❌ getCurrencies error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get currencies';
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
      console.log(`🔄 Calculating exchange: ${amount} ${from} -> ${to}`);
      
      const { data, error: supabaseError } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getExchangeAmount',
          from,
          to,
          amount
        }
      });

      console.log('📡 Supabase function response:', { data, error: supabaseError });

      if (supabaseError) {
        console.error('❌ Supabase function error:', supabaseError);
        throw new Error(`Function invocation failed: ${supabaseError.message}`);
      }
      
      if (data?.error) {
        console.error('❌ Changelly API error:', data.error);
        throw new Error(data.error.details || data.error || 'Failed to get exchange amount');
      }

      if (!data?.result) {
        console.warn('⚠️ No exchange amount returned from API');
        return '0';
      }

      console.log('✅ Successfully calculated exchange amount:', data.result);
      return data.result;
    } catch (err) {
      console.error('❌ getExchangeAmount error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate exchange';
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
