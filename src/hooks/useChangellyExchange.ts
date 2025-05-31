
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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
      const { data, error } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getCurrencies'
        }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to get currencies');
      }

      return data.result;
    } catch (err) {
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
      const { data, error } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getExchangeAmount',
          from,
          to,
          amount
        }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to get exchange amount');
      }

      return data.result;
    } catch (err) {
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
      const { data, error } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'createTransaction',
          from,
          to,
          amount,
          address,
          refundAddress
        }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to create transaction');
      }

      return data.result;
    } catch (err) {
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
      const { data, error } = await supabase.functions.invoke('changelly-exchange', {
        body: {
          action: 'getStatus',
          id: transactionId
        }
      });

      if (error) throw error;
      
      if (data.error) {
        throw new Error(data.error.message || 'Failed to get transaction status');
      }

      return data.result;
    } catch (err) {
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
