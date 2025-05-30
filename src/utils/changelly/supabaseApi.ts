
import { supabase } from '@/lib/supabase'

export class SupabaseChangellyAPI {
  private async callEdgeFunction(functionName: string, payload: any) {
    console.log(`Calling Supabase Edge Function: ${functionName}`, payload)
    
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: payload,
    })

    if (error) {
      console.error(`Edge function ${functionName} error:`, error)
      throw new Error(`Function error: ${error.message}`)
    }

    if (data?.error) {
      console.error(`API error from ${functionName}:`, data.error)
      throw new Error(data.error)
    }

    return data
  }

  // DEX API methods
  async getDexQuote(params: any) {
    return this.callEdgeFunction('dex-api', {
      endpoint: '/quote',
      params
    })
  }

  async getDexSwapTransaction(params: any) {
    return this.callEdgeFunction('dex-api', {
      endpoint: '/swap',
      params
    })
  }

  async getDexTokens(chainId?: number) {
    return this.callEdgeFunction('dex-api', {
      endpoint: '/tokens',
      params: chainId ? { chainId } : {}
    })
  }

  async getDexChains() {
    return this.callEdgeFunction('dex-api', {
      endpoint: '/chains',
      params: {}
    })
  }

  async getDexProtocols(chainId?: number) {
    return this.callEdgeFunction('dex-api', {
      endpoint: '/protocols',
      params: chainId ? { chainId } : {}
    })
  }

  // Crypto exchange methods
  async getCurrencies() {
    const response = await this.callEdgeFunction('changelly-api', {
      method: 'getCurrencies',
      params: {}
    })
    return response.result
  }

  async getExchangeAmount(from: string, to: string, amount: string) {
    const response = await this.callEdgeFunction('changelly-api', {
      method: 'getExchangeAmount',
      params: { from, to, amount }
    })
    return response.result
  }

  async getMinAmount(from: string, to: string) {
    const response = await this.callEdgeFunction('changelly-api', {
      method: 'getMinAmount',
      params: { from, to }
    })
    return response.result
  }

  async createTransaction(from: string, to: string, amount: string, address: string) {
    const response = await this.callEdgeFunction('changelly-api', {
      method: 'createTransaction',
      params: { from, to, amount, address }
    })
    return response.result
  }

  // Test methods
  async testDexConnection() {
    try {
      console.log('Testing DEX connection via Supabase Edge Function...')
      const chains = await this.getDexChains()
      return {
        success: true,
        message: `Successfully connected to Changelly DEX API via Supabase. Retrieved ${chains?.length || 0} supported chains.`,
        data: chains
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown DEX connection error',
        data: null
      }
    }
  }

  async testConnection() {
    try {
      console.log('Testing Changelly connection via Supabase Edge Function...')
      const currencies = await this.getCurrencies()
      return {
        success: true,
        message: `Successfully connected to Changelly API via Supabase. Retrieved ${currencies?.length || 0} currencies.`,
        data: currencies
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown connection error',
        data: null
      }
    }
  }
}
