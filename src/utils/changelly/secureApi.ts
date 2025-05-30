
import { supabase } from '@/lib/supabase';

export class SecureChangellyAPI {
  private async callEdgeFunction(method: string, params: any = {}) {
    console.log('Calling secure Changelly API:', { method, params });

    try {
      const { data, error } = await supabase.functions.invoke('changelly-api', {
        body: { method, params }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Unknown API error');
      }

      console.log('Secure API response:', data.data);
      return data.data;
    } catch (error) {
      console.error('Secure API call failed:', error);
      throw error;
    }
  }

  // Crypto Exchange Methods
  async getCurrencies() {
    console.log('Fetching available currencies securely...');
    return this.callEdgeFunction('getCurrencies');
  }

  async getExchangeAmount(from: string, to: string, amount: string) {
    console.log(`Getting exchange amount securely: ${amount} ${from} -> ${to}`);
    return this.callEdgeFunction('getExchangeAmount', { from, to, amount });
  }

  async getMinAmount(from: string, to: string) {
    console.log(`Getting minimum amount securely for: ${from} -> ${to}`);
    return this.callEdgeFunction('getMinAmount', { from, to });
  }

  async createTransaction(from: string, to: string, amount: string, address: string) {
    console.log(`Creating transaction securely: ${amount} ${from} -> ${to} to ${address}`);
    return this.callEdgeFunction('createTransaction', { from, to, amount, address });
  }

  // Test method
  async testConnection() {
    console.log('Testing secure Changelly API connection...');
    try {
      const currencies = await this.getCurrencies();
      return {
        success: true,
        message: `Successfully connected to Changelly API via Supabase. Retrieved ${currencies?.length || 0} currencies.`,
        data: currencies
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown connection error',
        data: null
      };
    }
  }
}
