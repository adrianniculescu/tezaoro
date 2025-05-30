import { CHANGELLY_CONFIG } from './config';
import { FiatProvider, DexQuoteParams, DexSwapParams, FiatQuoteParams, FiatOrderParams } from './types';
import { FIAT_PROVIDERS } from './providers';

export class ChangellyAPI {
  private publicKey: string;
  private privateKey: string;
  private baseUrl: string;
  private fiatApiUrl: string;
  private dexApiUrl: string;
  private dexApiKey: string;

  constructor(sandbox = false) {
    this.publicKey = CHANGELLY_CONFIG.publicKey;
    this.privateKey = CHANGELLY_CONFIG.privateKey;
    this.baseUrl = sandbox ? CHANGELLY_CONFIG.sandboxUrl : CHANGELLY_CONFIG.baseUrl;
    this.fiatApiUrl = CHANGELLY_CONFIG.fiatApiUrl;
    this.dexApiUrl = CHANGELLY_CONFIG.dexApiUrl;
    this.dexApiKey = CHANGELLY_CONFIG.dexApiKey;
    
    console.log('Changelly API initialized:', {
      sandbox,
      baseUrl: this.baseUrl,
      fiatApiUrl: this.fiatApiUrl,
      dexApiUrl: this.dexApiUrl,
      publicKeyLength: this.publicKey.length,
      privateKeyLength: this.privateKey.length,
      dexApiKeyLength: this.dexApiKey.length
    });
  }

  private async makeRequest(method: string, params: any = {}, useFiatApi = false) {
    const payload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    };

    const apiUrl = useFiatApi ? this.fiatApiUrl : this.baseUrl;
    console.log('Making Changelly API request:', { method, params, url: apiUrl, useFiatApi });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.publicKey,
          'X-API-Sign': this.privateKey // Note: In production, this should be a proper HMAC signature
        },
        body: JSON.stringify(payload)
      });

      console.log('Changelly API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Changelly API HTTP error:', { status: response.status, statusText: response.statusText, body: errorText });
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Changelly API response data:', data);

      if (data.error) {
        console.error('Changelly API error response:', data.error);
        throw new Error(`API Error: ${data.error.message || 'Unknown error'}`);
      }

      return data.result;
    } catch (error) {
      console.error('Changelly API request failed:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Changelly API. Please check your internet connection.');
      }
      
      throw error;
    }
  }

  private async makeDexRequest(endpoint: string, params: any = {}) {
    const url = `${this.dexApiUrl}${endpoint}`;
    console.log('Making Changelly DEX API request:', { endpoint, params, url });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.dexApiKey
        },
        body: JSON.stringify(params)
      });

      console.log('Changelly DEX API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Changelly DEX API HTTP error:', { status: response.status, statusText: response.statusText, body: errorText });
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Changelly DEX API response data:', data);

      if (data.error) {
        console.error('Changelly DEX API error response:', data.error);
        throw new Error(`DEX API Error: ${data.error.message || 'Unknown error'}`);
      }

      return data.result || data;
    } catch (error) {
      console.error('Changelly DEX API request failed:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to Changelly DEX API. Please check your internet connection.');
      }
      
      throw error;
    }
  }

  // Crypto Exchange Methods
  async getCurrencies() {
    console.log('Fetching available currencies...');
    return this.makeRequest('getCurrencies');
  }

  async getExchangeAmount(from: string, to: string, amount: string) {
    console.log(`Getting exchange amount: ${amount} ${from} -> ${to}`);
    return this.makeRequest('getExchangeAmount', { from, to, amount });
  }

  async getMinAmount(from: string, to: string) {
    console.log(`Getting minimum amount for: ${from} -> ${to}`);
    return this.makeRequest('getMinAmount', { from, to });
  }

  async createTransaction(from: string, to: string, amount: string, address: string) {
    console.log(`Creating transaction: ${amount} ${from} -> ${to} to ${address}`);
    return this.makeRequest('createTransaction', { from, to, amount, address });
  }

  // Fiat Gateway Methods
  async getFiatProviders() {
    console.log('Fetching available fiat providers...');
    return this.makeRequest('getProviders', {}, true);
  }

  async getFiatQuote(params: FiatQuoteParams) {
    console.log('Getting fiat quote:', params);
    return this.makeRequest('getQuote', params, true);
  }

  async createFiatOrder(params: FiatOrderParams) {
    console.log('Creating fiat order:', params);
    return this.makeRequest('createOrder', params, true);
  }

  async getFiatOrderStatus(orderId: string) {
    console.log(`Getting order status for: ${orderId}`);
    return this.makeRequest('getOrderStatus', { orderId }, true);
  }

  // DEX Aggregator Methods
  async getDexQuote(params: DexQuoteParams) {
    console.log('Getting DEX quote:', params);
    return this.makeDexRequest('/quote', params);
  }

  async getDexSwapTransaction(params: DexSwapParams) {
    console.log('Getting DEX swap transaction:', params);
    return this.makeDexRequest('/swap', params);
  }

  async getDexTokens(chainId?: number) {
    console.log('Fetching DEX supported tokens:', { chainId });
    return this.makeDexRequest('/tokens', chainId ? { chainId } : {});
  }

  async getDexChains() {
    console.log('Fetching DEX supported chains...');
    return this.makeDexRequest('/chains', {});
  }

  async getDexProtocols(chainId?: number) {
    console.log('Fetching DEX protocols:', { chainId });
    return this.makeDexRequest('/protocols', chainId ? { chainId } : {});
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

  // Test methods
  async testConnection() {
    console.log('Testing Changelly API connection...');
    try {
      const currencies = await this.getCurrencies();
      return {
        success: true,
        message: `Successfully connected to Changelly API. Retrieved ${currencies?.length || 0} currencies.`,
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

  async testFiatConnection() {
    console.log('Testing Changelly Fiat API connection...');
    try {
      const providers = await this.getFiatProviders();
      return {
        success: true,
        message: `Successfully connected to Changelly Fiat API. Retrieved ${providers?.length || 0} providers.`,
        data: providers
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown fiat connection error',
        data: null
      };
    }
  }

  async testDexConnection() {
    console.log('Testing Changelly DEX API connection...');
    try {
      // Try a simpler endpoint first, just to check connectivity
      const response = await fetch(`${this.dexApiUrl}/chains`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.dexApiKey
        },
        body: JSON.stringify({})
      });
      
      console.log('Changelly DEX API test response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Changelly DEX API test error:', { status: response.status, body: errorText });
        return {
          success: false,
          message: `API error: ${response.status} - ${errorText || 'Unknown error'}`,
          data: null
        };
      }
      
      const data = await response.json();
      console.log('Changelly DEX API test data:', data);
      
      if (data.error) {
        return {
          success: false,
          message: `API error: ${data.error.message || 'Unknown error'}`,
          data: null
        };
      }
      
      const chains = data.result || [];
      return {
        success: true,
        message: `Successfully connected to Changelly DEX API. Retrieved ${chains.length} supported chains.`,
        data: chains
      };
    } catch (error) {
      console.error('Changelly DEX API test failed:', error);
      return {
        success: false,
        message: error instanceof Error ? 
          `Connection error: ${error.message}` : 
          'Unknown DEX connection error',
        data: null
      };
    }
  }
}
