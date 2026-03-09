
export interface PredictionMarket {
  id: string;
  question: string;
  category: 'crypto' | 'etf' | 'tech' | 'music' | 'politics' | 'sports';
  yesOdds: number; // 0-100
  volume: number;
  participants: number;
  endDate: string;
  resolved: boolean;
  resolution?: 'yes' | 'no';
  emoji: string;
  trending: boolean;
}

export interface UserPosition {
  marketId: string;
  side: 'yes' | 'no';
  shares: number;
  avgPrice: number;
  timestamp: string;
}

export interface TxRecord {
  id: string;
  marketId: string;
  action: 'buy' | 'sell';
  side: 'yes' | 'no';
  amount: number;
  shares: number;
  price: number;
  timestamp: string;
}

export const mockMarkets: PredictionMarket[] = [
  // Crypto
  { id: 'btc-100k', question: 'BTC >$100k by end of month?', category: 'crypto', yesOdds: 72, volume: 4_850_000, participants: 12_430, endDate: '2026-03-31', resolved: false, emoji: '₿', trending: true },
  { id: 'eth-5k', question: 'ETH >$5,000 by Q2 2026?', category: 'crypto', yesOdds: 45, volume: 2_100_000, participants: 8_210, endDate: '2026-06-30', resolved: false, emoji: 'Ξ', trending: true },
  { id: 'sol-500', question: 'SOL >$500 by June?', category: 'crypto', yesOdds: 31, volume: 1_340_000, participants: 5_670, endDate: '2026-06-30', resolved: false, emoji: '◎', trending: false },
  { id: 'doge-1', question: 'DOGE hits $1?', category: 'crypto', yesOdds: 12, volume: 890_000, participants: 15_890, endDate: '2026-12-31', resolved: false, emoji: '🐕', trending: true },
  { id: 'btc-150k', question: 'BTC >$150k by EOY 2026?', category: 'crypto', yesOdds: 38, volume: 3_200_000, participants: 9_100, endDate: '2026-12-31', resolved: false, emoji: '🚀', trending: false },
  { id: 'xrp-10', question: 'XRP >$10 by Q3?', category: 'crypto', yesOdds: 8, volume: 560_000, participants: 4_300, endDate: '2026-09-30', resolved: false, emoji: '💧', trending: false },

  // ETF
  { id: 'eth-etf', question: 'ETH spot ETF approved by SEC?', category: 'etf', yesOdds: 65, volume: 8_920_000, participants: 23_100, endDate: '2026-06-30', resolved: false, emoji: '📊', trending: true },
  { id: 'sol-etf', question: 'SOL ETF filed by BlackRock?', category: 'etf', yesOdds: 42, volume: 2_800_000, participants: 7_650, endDate: '2026-12-31', resolved: false, emoji: '🏦', trending: true },
  { id: 'xrp-etf', question: 'XRP ETF approved in 2026?', category: 'etf', yesOdds: 28, volume: 1_100_000, participants: 3_900, endDate: '2026-12-31', resolved: false, emoji: '📋', trending: false },

  // Tech
  { id: 'openai-ipo', question: 'OpenAI IPO in 2026?', category: 'tech', yesOdds: 55, volume: 5_400_000, participants: 18_300, endDate: '2026-12-31', resolved: false, emoji: '🤖', trending: true },
  { id: 'apple-ar', question: 'Apple Vision Pro 2 announced?', category: 'tech', yesOdds: 78, volume: 1_900_000, participants: 6_200, endDate: '2026-09-30', resolved: false, emoji: '🍎', trending: false },
  { id: 'nvidia-200', question: 'NVIDIA >$200/share by Q4?', category: 'tech', yesOdds: 61, volume: 3_700_000, participants: 11_500, endDate: '2026-12-31', resolved: false, emoji: '💚', trending: false },

  // Music / AI
  { id: 'suno-1b', question: 'Suno AI >$1B valuation?', category: 'music', yesOdds: 58, volume: 920_000, participants: 4_100, endDate: '2026-12-31', resolved: false, emoji: '🎵', trending: true },
  { id: 'udio-raise', question: 'Udio raises Series B >$100M?', category: 'music', yesOdds: 43, volume: 340_000, participants: 1_800, endDate: '2026-09-30', resolved: false, emoji: '🎶', trending: false },
  { id: 'spotify-ai', question: 'Spotify launches AI DJ feature globally?', category: 'music', yesOdds: 82, volume: 1_600_000, participants: 7_200, endDate: '2026-06-30', resolved: false, emoji: '🎧', trending: false },

  // Politics
  { id: 'crypto-bill', question: 'US Crypto regulation bill passes?', category: 'politics', yesOdds: 51, volume: 6_300_000, participants: 19_700, endDate: '2026-12-31', resolved: false, emoji: '🏛️', trending: true },
  { id: 'cbdc-pilot', question: 'US CBDC pilot announced?', category: 'politics', yesOdds: 22, volume: 890_000, participants: 3_400, endDate: '2026-12-31', resolved: false, emoji: '🇺🇸', trending: false },

  // Resolved examples
  { id: 'btc-50k-res', question: 'BTC stayed above $50k in Feb?', category: 'crypto', yesOdds: 95, volume: 2_100_000, participants: 8_900, endDate: '2026-02-28', resolved: true, resolution: 'yes', emoji: '✅', trending: false },
  { id: 'luna-comeback', question: 'LUNA Classic >$0.01?', category: 'crypto', yesOdds: 3, volume: 450_000, participants: 6_700, endDate: '2026-02-28', resolved: true, resolution: 'no', emoji: '❌', trending: false },
];

export const categories = [
  { id: 'all', label: '🌐 All', color: 'accent' },
  { id: 'crypto', label: '₿ Crypto', color: 'primary' },
  { id: 'etf', label: '📊 ETF', color: 'primary' },
  { id: 'tech', label: '🤖 Tech', color: 'primary' },
  { id: 'music', label: '🎵 Music', color: 'primary' },
  { id: 'politics', label: '🏛️ Politics', color: 'primary' },
] as const;
