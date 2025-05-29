
// Changelly API configuration and utilities
export const CHANGELLY_CONFIG = {
  publicKey: '73d9d3418a4bf0ab06b7088c56e20c4bba233c1f4311758f6732fc1da2fbf794',
  privateKey: '308204be020100300d06092a864886f70d0101010500048204a8308204a40201000282010100b717bea53e423c11614730b1baa3fcbe22d4fb7646b9815ecc7ba218459d4c8b00f43edc5e2c9fcdfe3d67da9ba4d28cf198a08887ba95a9495a334bf97e1e82fa9a7a5e715304f78117dd07427d80fd9d0a110891c3e5ee5f2655366221e22e326c26462750911c1f7e4f10c4cabfec4e1856f3a657b4c817a24cb2444805c9a59d28921adf53b042dc9a7059eba008303e4b0c03bbc0d7c7b11a7d423c583d208a83f1030e66d60f0bf9b692fc2e613449f1df916f7494597faa6136561479bb2fdd25ca6873a5e9e6be079e34717017518bf33ce0055f42ebbce6864e9d3e47169ee078a08455159a61e2bbf2f119f80aa182900a4e735761fa4e98c2ac33020301000102820100123dbf5f5f308cce2924453f051a9ec24d5e181f7f34597b4461723e2626b720323178ac793020f6639a0d3ac3bef6c0816174bcfad37ab8544d344721783b39f96b0d3dfe345de3a56ce73723476063e412c357ade36d33ae84772b8fe352fc1f473f18f0d9ca05ef42a4f09abff31716961388facd9f7e953c34ea9dd03f2332dcb1729b76d6440b99a4e36c781a94aa5773f1cb5a437690fdb8c5aa97f48e95a780fe4ee6177bc4a40e6248bbdd36b50a253bff603f2139724a1aca50d914bc937724ce2fc62934c1a1c7a6eb880187f84d5803454579349a6eea3090873f11795c285d9c0127a17ddfbf06bbd50b8d18a7bcc1c2d24170199b506879be8102818100fed5ef0a2bf1294968e8ee47e2236f9d50a5ae1ecf5cf2d9fd35d882db499f6dcb7c19a611e18e617aa5b5d9a80c76203bd4ccbc81ca0d8dbf12d6ad79cb63ec2485bfd241347e69ed3b3d095e221b475bf19e7dce7096328587b2e573ea515e7cfc366f320a236b55d542ceb123eac40551a62c3ac594adf59e50b17faec0e302818100b7ede5c22fb27329aaa095d8a3deb4987999697d4ea9d0f049231a1d667761b8b6d637e10886fb68725262c57ae00338fd0647f951f9d601177030b6703b4e0052da7b4f3fd5f3505d7ae437774edcf089033069bfe27771242109fad1abc42ddce7f2f5fd629ee02185664be19b624340ebb5c0eb51d8b5731afcea94a0d8710281804d543fd0375b5beaf1d1d514ad1391b80c13ea8d60e154b43f790a7552f3b95448ee249e5748b9baeccbc22e05279ae4d72310e996fce835fe284a4aa3edcb298a3fa7e0b676a671a0525c882e2f6d55af19d7bd575aa4c939e9dea8700f4797c39789311edf22b65c7a7566612c83fded9b4430a1b8f90ffcbb88c303fad47f02818100b4cef7831a72594587878f66c548c3cdf413bca0c338aabddb97d72f39b077ef264595eef0fc089f576ae7cfec07d5032bb10605f0f121d036e341efc68a7616595c8fc58b225eab0d0a26d8e3bf31f07f3014629090270ca1109d87e49fef1d8ac0b595de3e19a28931632b8b1fbdcc1140e58e3d865afb9ca8d6222073b1f102818100cff8e31374d2ea81080f8d1ad6f97c0346ce6a3393668dac574fae83d1c4e0dcd2076bf11765cca6960f1aa8ab4b1781103b76979779437c601283ffd8fc5fb57a0efb0a36bd11ed30dd9091334a8ea2ed78cb40eda936cb122b0b5d1e9f03ea02ea7fcc4555000fcbb4cc8295fbb6947f72dc59986ef4e99abb5e72567d8830',
  baseUrl: 'https://api.changelly.com',
  sandboxUrl: 'https://api-sandbox.changelly.com',
  fiatApiUrl: 'https://fiat-api.changelly.com'
};

export interface ChangellyProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  apiEndpoint: string;
}

export interface FiatProvider {
  id: string;
  name: string;
  nonKycLimit: number;
  fees: {
    card?: string;
    applePay?: string;
    sepa?: string;
    pix?: string;
    ach?: string;
    skrill?: string;
  };
  supportedMethods: string[];
  available: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'wallet' | 'instant';
  icon: string;
  processingTime: string;
  currencies: string[];
}

export const FIAT_PROVIDERS: FiatProvider[] = [
  {
    id: 'moonpay',
    name: 'Moonpay',
    nonKycLimit: 150,
    fees: {
      card: '3.4% – 3.75%',
      applePay: '3.4% – 3.75%',
      sepa: '2.9%'
    },
    supportedMethods: ['Visa/Mastercard', 'Apple Pay', 'Google Pay', 'SEPA'],
    available: true
  },
  {
    id: 'banxa',
    name: 'Banxa',
    nonKycLimit: 500,
    fees: {
      card: '1.99%',
      applePay: '0%',
      sepa: '0%'
    },
    supportedMethods: ['Visa/Mastercard', 'Apple Pay', 'Google Pay', 'SEPA'],
    available: true
  },
  {
    id: 'wert',
    name: 'Wert',
    nonKycLimit: 1000,
    fees: {
      card: '3.41%',
      applePay: '3.41%'
    },
    supportedMethods: ['Visa/Mastercard', 'Apple Pay', 'Google Pay'],
    available: true
  },
  {
    id: 'transak',
    name: 'Transak',
    nonKycLimit: 200,
    fees: {
      card: '2.35%',
      applePay: '3.99%'
    },
    supportedMethods: ['Visa/Mastercard', 'Apple Pay', 'Google Pay'],
    available: true
  },
  {
    id: 'kado',
    name: 'KADO',
    nonKycLimit: 500,
    fees: {
      sepa: '0.99%',
      pix: '0.99%',
      ach: '0.99%'
    },
    supportedMethods: ['SEPA', 'PIX', 'ACH'],
    available: true
  },
  {
    id: 'skrill',
    name: 'Skrill',
    nonKycLimit: 0,
    fees: {
      card: '3.5% + 1.5% Changelly fee',
      skrill: '2.75% + 1.5% Changelly fee'
    },
    supportedMethods: ['Visa/Mastercard', 'Skrill Balance'],
    available: true
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    type: 'card',
    icon: 'CreditCard',
    processingTime: 'Instant',
    currencies: ['USD', 'EUR', 'GBP', 'AUD', 'CAD']
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    type: 'instant',
    icon: 'Smartphone',
    processingTime: 'Instant',
    currencies: ['USD', 'EUR', 'GBP']
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    type: 'instant',
    icon: 'Smartphone',
    processingTime: 'Instant',
    currencies: ['USD', 'EUR', 'GBP']
  },
  {
    id: 'sepa',
    name: 'SEPA Transfer',
    type: 'bank',
    icon: 'Building',
    processingTime: '1-2 business days',
    currencies: ['EUR']
  },
  {
    id: 'faster_payments',
    name: 'Faster Payments',
    type: 'bank',
    icon: 'Building',
    processingTime: 'Instant',
    currencies: ['GBP']
  },
  {
    id: 'pix',
    name: 'PIX',
    type: 'instant',
    icon: 'Zap',
    processingTime: 'Instant',
    currencies: ['BRL']
  },
  {
    id: 'ach',
    name: 'ACH Transfer',
    type: 'bank',
    icon: 'Building',
    processingTime: '2-3 business days',
    currencies: ['USD']
  },
  {
    id: 'skrill',
    name: 'Skrill Balance',
    type: 'wallet',
    icon: 'Wallet',
    processingTime: 'Instant',
    currencies: ['USD', 'EUR', 'GBP']
  }
];

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
      'Multiple fiat providers (Moonpay, Banxa, Wert, Transak, KADO, Skrill)',
      'Various payment methods (Cards, Apple Pay, SEPA, PIX, etc.)',
      'Non-KYC limits up to $1,000',
      'Competitive fees starting from 0%',
      'Global coverage with 40+ fiat currencies'
    ],
    apiEndpoint: '/v2/fiat'
  }
];

export class ChangellyAPI {
  private publicKey: string;
  private privateKey: string;
  private baseUrl: string;
  private fiatApiUrl: string;

  constructor(sandbox = false) {
    this.publicKey = CHANGELLY_CONFIG.publicKey;
    this.privateKey = CHANGELLY_CONFIG.privateKey;
    this.baseUrl = sandbox ? CHANGELLY_CONFIG.sandboxUrl : CHANGELLY_CONFIG.baseUrl;
    this.fiatApiUrl = CHANGELLY_CONFIG.fiatApiUrl;
    
    console.log('Changelly API initialized:', {
      sandbox,
      baseUrl: this.baseUrl,
      fiatApiUrl: this.fiatApiUrl,
      publicKeyLength: this.publicKey.length,
      privateKeyLength: this.privateKey.length
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

  async getFiatQuote(params: {
    from: string;
    to: string;
    amount: string;
    provider?: string;
    paymentMethod?: string;
  }) {
    console.log('Getting fiat quote:', params);
    return this.makeRequest('getQuote', params, true);
  }

  async createFiatOrder(params: {
    from: string;
    to: string;
    amount: string;
    provider: string;
    paymentMethod: string;
    walletAddress: string;
    userEmail?: string;
  }) {
    console.log('Creating fiat order:', params);
    return this.makeRequest('createOrder', params, true);
  }

  async getFiatOrderStatus(orderId: string) {
    console.log(`Getting order status for: ${orderId}`);
    return this.makeRequest('getOrderStatus', { orderId }, true);
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

  // Test method to verify API connectivity
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
}
