
// Changelly API configuration and utilities
export const CHANGELLY_CONFIG = {
  publicKey: 'MIIBCgKCAQEAtxe+pT5CPBFhRzCxuqP8viLU3ZGuYFezHuiGEWdTIsA9D7cXiyfzf49Z9qbpNKM8ZigiIe6lalJWjNL+X4egvqael5xUwT3gRfdB0J9gP2dChEIkcPl7l8mVTZiIeIuMmwmRidQkRwffk8QxMq/7E4YVvOmV7TIF6JMskRIBcmlnSiSGt9TsELcmnBZ66AIMD5LDAO7wNfHsRp9QjxYPSCKg/EDDmbWDwv5tpL8LmE0SfHfkW90lFl/qmE2VhR5uy/dJcpoc6Xp5r4HnjRxcBdRi/M84AVfQuu85oZOnT5HFp7geKCEVRWaYeK78vEZ+AqhgpAKTnNXYfpOmMKsMwIDAQAB',
  apiKey: '8auRm15UetLugurylNMt2fM41onv+VJS0QN35Gke4EU=',
  baseUrl: 'https://api.changelly.com',
  sandboxUrl: 'https://api-sandbox.changelly.com'
};

export interface ChangellyProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  apiEndpoint: string;
}

export const CHANGELLY_PRODUCTS: ChangellyProduct[] = [
  {
    id: 'instant-exchange',
    name: 'Instant Exchange',
    description: 'Seamless cryptocurrency exchange with competitive rates and instant transactions',
    features: [
      'Real-time exchange rates',
      'Support for 500+ cryptocurrencies',
      'Instant transactions',
      'No account required',
      'Competitive fees'
    ],
    apiEndpoint: '/v2/exchange'
  },
  {
    id: 'fiat-gateway',
    name: 'Fiat Gateway',
    description: 'Buy and sell cryptocurrencies with traditional payment methods',
    features: [
      'Credit/debit card payments',
      'Bank transfers',
      'Multiple fiat currencies',
      'KYC/AML compliance',
      'Secure transactions'
    ],
    apiEndpoint: '/v2/fiat'
  },
  {
    id: 'payment-widget',
    name: 'Payment Widget',
    description: 'Accept cryptocurrency payments directly on your platform',
    features: [
      'Easy integration',
      'Multiple payment options',
      'Real-time notifications',
      'Customizable UI',
      'Low fees'
    ],
    apiEndpoint: '/v2/payments'
  },
  {
    id: 'b2b-exchange',
    name: 'B2B Exchange',
    description: 'Enterprise-grade exchange solutions for businesses',
    features: [
      'High-volume trading',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'Institutional rates'
    ],
    apiEndpoint: '/v2/b2b'
  }
];

export class ChangellyAPI {
  private apiKey: string;
  private publicKey: string;
  private baseUrl: string;

  constructor(sandbox = false) {
    this.apiKey = CHANGELLY_CONFIG.apiKey;
    this.publicKey = CHANGELLY_CONFIG.publicKey;
    this.baseUrl = sandbox ? CHANGELLY_CONFIG.sandboxUrl : CHANGELLY_CONFIG.baseUrl;
  }

  private async makeRequest(method: string, params: any = {}) {
    const payload = {
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Changelly API Error:', error);
      throw error;
    }
  }

  async getCurrencies() {
    return this.makeRequest('getCurrencies');
  }

  async getExchangeAmount(from: string, to: string, amount: string) {
    return this.makeRequest('getExchangeAmount', { from, to, amount });
  }

  async getMinAmount(from: string, to: string) {
    return this.makeRequest('getMinAmount', { from, to });
  }

  async createTransaction(from: string, to: string, amount: string, address: string) {
    return this.makeRequest('createTransaction', { from, to, amount, address });
  }
}
