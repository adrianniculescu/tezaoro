
import { CHANGELLY_CONFIG } from './config';
import { FiatProvider, DexQuoteParams, DexSwapParams, FiatQuoteParams, FiatOrderParams } from './types';
import { FIAT_PROVIDERS } from './providers';

export class ChangellyAPI {
  private baseUrl: string;
  private fiatApiUrl: string;
  private dexApiUrl: string;

  constructor(sandbox = false) {
    this.baseUrl = sandbox ? CHANGELLY_CONFIG.sandboxUrl : CHANGELLY_CONFIG.baseUrl;
    this.fiatApiUrl = CHANGELLY_CONFIG.fiatApiUrl;
    this.dexApiUrl = CHANGELLY_CONFIG.dexApiUrl;
    
    console.log('Changelly API initialized (legacy - use SecureChangellyAPI instead):', {
      sandbox,
      baseUrl: this.baseUrl,
      fiatApiUrl: this.fiatApiUrl,
      dexApiUrl: this.dexApiUrl
    });
  }

  private async makeRequest(method: string, params: any = {}, useFiatApi = false) {
    throw new Error('Direct API calls are no longer supported. Please use SecureChangellyAPI instead for secure API calls via Supabase edge functions.');
  }

  private async makeDexRequest(endpoint: string, params: any = {}) {
    throw new Error('Direct DEX API calls are no longer supported. Please use SecureChangellyAPI instead for secure API calls via Supabase edge functions.');
  }

  // Crypto Exchange Methods - All deprecated
  async getCurrencies() {
    throw new Error('Please use SecureChangellyAPI.getCurrencies() instead for secure API calls.');
  }

  async getExchangeAmount(from: string, to: string, amount: string) {
    throw new Error('Please use SecureChangellyAPI.getExchangeAmount() instead for secure API calls.');
  }

  async getMinAmount(from: string, to: string) {
    throw new Error('Please use SecureChangellyAPI.getMinAmount() instead for secure API calls.');
  }

  async createTransaction(from: string, to: string, amount: string, address: string) {
    throw new Error('Please use SecureChangellyAPI.createTransaction() instead for secure API calls.');
  }

  // Fiat Gateway Methods - All deprecated
  async getFiatProviders() {
    throw new Error('Please use SecureChangellyAPI for secure fiat API calls.');
  }

  async getFiatQuote(params: FiatQuoteParams) {
    throw new Error('Please use SecureChangellyAPI for secure fiat API calls.');
  }

  async createFiatOrder(params: FiatOrderParams) {
    throw new Error('Please use SecureChangellyAPI for secure fiat API calls.');
  }

  async getFiatOrderStatus(orderId: string) {
    throw new Error('Please use SecureChangellyAPI for secure fiat API calls.');
  }

  // DEX Aggregator Methods - All deprecated
  async getDexQuote(params: DexQuoteParams) {
    throw new Error('Please use SecureChangellyAPI for secure DEX API calls.');
  }

  async getDexSwapTransaction(params: DexSwapParams) {
    throw new Error('Please use SecureChangellyAPI for secure DEX API calls.');
  }

  async getDexTokens(chainId?: number) {
    throw new Error('Please use SecureChangellyAPI for secure DEX API calls.');
  }

  async getDexChains() {
    throw new Error('Please use SecureChangellyAPI for secure DEX API calls.');
  }

  async getDexProtocols(chainId?: number) {
    throw new Error('Please use SecureChangellyAPI for secure DEX API calls.');
  }

  // Utility Methods
  getBestProvider(currency: string, paymentMethod: string, amount: number): FiatProvider | null {
    const availableProviders = FIAT_PROVIDERS.filter(provider => 
      provider.available && 
      provider.supportedMethods.some(method => method.toLowerCase().includes(paymentMethod.toLowerCase()))
    );

    if (availableProviders.length === 0) return null;

    // Sort by non-KYC limit (higher is better) and then by fees (lower is better)
    return availableProviders.sort((a, b) => {
      if (amount <= a.nonKycLimit && amount > b.nonKycLimit) return -1;
      if (amount <= b.nonKycLimit && amount > a.nonKycLimit) return 1;
      return b.nonKycLimit - a.nonKycLimit;
    })[0];
  }

  // Test methods - All deprecated
  async testConnection() {
    return {
      success: false,
      message: 'Legacy ChangellyAPI is deprecated. Please use SecureChangellyAPI instead for secure API calls via Supabase edge functions.',
      data: null
    };
  }

  async testFiatConnection() {
    return {
      success: false,
      message: 'Legacy ChangellyAPI is deprecated. Please use SecureChangellyAPI instead for secure fiat API calls.',
      data: null
    };
  }

  async testDexConnection() {
    return {
      success: false,
      message: 'Legacy ChangellyAPI is deprecated. Please use SecureChangellyAPI instead for secure DEX API calls.',
      data: null
    };
  }
}
