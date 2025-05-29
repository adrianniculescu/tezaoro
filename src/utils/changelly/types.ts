
export interface ChangellyProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  apiEndpoint: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'wallet' | 'instant';
  icon: string;
  processingTime: string;
  currencies: string[];
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
    fasterPayments?: string;
    payid?: string;
    ideal?: string;
  };
  supportedMethods: string[];
  available: boolean;
  offRampAvailable?: boolean;
  offRampMethods?: string[];
}

export interface DexQuoteParams {
  fromToken: string;
  toToken: string;
  amount: string;
  chainId: number;
  slippage?: number;
  userAddress?: string;
}

export interface DexSwapParams {
  fromToken: string;
  toToken: string;
  amount: string;
  chainId: number;
  userAddress: string;
  slippage?: number;
  gasPrice?: string;
}

export interface FiatQuoteParams {
  from: string;
  to: string;
  amount: string;
  provider?: string;
  paymentMethod?: string;
}

export interface FiatOrderParams {
  from: string;
  to: string;
  amount: string;
  provider: string;
  paymentMethod: string;
  walletAddress: string;
  userEmail?: string;
}
