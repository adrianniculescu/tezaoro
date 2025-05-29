
import { FiatProvider, PaymentMethod, ChangellyProduct } from './types';

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
    available: true,
    offRampAvailable: true,
    offRampMethods: ['SEPA (EUR)', 'ACH (USD)']
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
    id: 'payid',
    name: 'PayID',
    type: 'instant',
    icon: 'Zap',
    processingTime: 'Instant',
    currencies: ['AUD']
  },
  {
    id: 'ideal',
    name: 'iDEAL',
    type: 'bank',
    icon: 'Building',
    processingTime: 'Instant',
    currencies: ['EUR']
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
  },
  {
    id: 'dex-aggregator',
    name: 'DEX Aggregator',
    description: 'Access the best prices across multiple decentralized exchanges',
    features: [
      'Aggregated liquidity from 200+ DEXs',
      'Best execution prices across chains',
      'MEV protection and gas optimization',
      'Multi-chain support (Ethereum, BSC, Polygon, etc.)',
      'Smart routing algorithms'
    ],
    apiEndpoint: '/dex/v1'
  }
];
