
const TOKEN_NAMES = [
  'PEPE', 'WOJAK', 'DOGE', 'SHIB', 'FLOKI', 'BONK', 'WIF', 'POPCAT', 'MEW', 'MYRO',
  'BOME', 'SLERF', 'ONDO', 'JUP', 'W', 'STRK', 'TIA', 'DYM', 'MANTA', 'ALT',
  'PIXEL', 'PORTAL', 'AEVO', 'ETHFI', 'ENA', 'TNSR', 'SAGA', 'REZ', 'BB', 'ZK',
  'LISTA', 'ZRO', 'BLAST', 'IO', 'ATH', 'RENDER', 'TAO', 'FET', 'NEAR', 'INJ',
  'SEI', 'SUI', 'APT', 'ARB', 'OP', 'AVAX', 'MATIC', 'LINK', 'UNI', 'AAVE',
  'MKR', 'SNX', 'CRV', 'LDO', 'RPL', 'GMX', 'DYDX', 'BLUR', 'LOOKS', 'X2Y2',
  'APE', 'SAND', 'MANA', 'AXS', 'ILV', 'GALA', 'ENJ', 'IMX', 'RONIN', 'MAGIC',
  'PRIME', 'BEAM', 'PIRATE', 'NAKA', 'SUPER', 'GODS', 'YGG', 'MC', 'ALICE', 'TLM',
  'RAY', 'ORCA', 'MNDE', 'MSOL', 'JITO', 'PYTH', 'HNT', 'MOBILE', 'IOT', 'HONEY',
  'GMT', 'GST', 'STEP', 'RAYDIUM', 'DRIFT', 'MARINADE', 'TENSOR', 'ZETA', 'MANGO', 'SERUM',
];

const CHAINS = ['ETH', 'Solana', 'Base', 'Pulse'] as const;
export type Chain = typeof CHAINS[number];

const QUOTE_TOKENS: Record<Chain, string> = {
  ETH: 'WETH',
  Solana: 'SOL',
  Base: 'WETH',
  Pulse: 'PLS',
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateSparkline(rand: () => number, points: number): number[] {
  const data: number[] = [];
  let value = 50 + rand() * 50;
  for (let i = 0; i < points; i++) {
    value += (rand() - 0.48) * 10;
    if (value < 5) value = 5 + rand() * 10;
    data.push(Math.round(value * 100) / 100);
  }
  return data;
}

export interface ScreenerPair {
  id: string;
  token: string;
  quoteToken: string;
  chain: Chain;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
  sparkline5m: number[];
  sparkline1h: number[];
  sparkline6h: number[];
  pairAge: number; // hours
  txCount24h: number;
  emoji: string;
}

const EMOJIS = ['🔥', '🚀', '💎', '⚡', '🌙', '🦊', '🐸', '🐕', '🎮', '🌊', '💫', '⭐', '🔮', '🎯', '🏆'];

export function generateMockPairs(): ScreenerPair[] {
  const pairs: ScreenerPair[] = [];
  const rand = seededRandom(42);

  for (let i = 0; i < 100; i++) {
    const chain = CHAINS[Math.floor(rand() * CHAINS.length)];
    const token = TOKEN_NAMES[i % TOKEN_NAMES.length];
    const priceRange = rand();
    const price = priceRange < 0.3
      ? rand() * 0.0001
      : priceRange < 0.6
      ? rand() * 0.1
      : priceRange < 0.85
      ? rand() * 10
      : rand() * 1000;

    pairs.push({
      id: `${chain}-${token}-${i}`,
      token,
      quoteToken: QUOTE_TOKENS[chain],
      chain,
      price: Math.max(0.0000001, price),
      change24h: (rand() - 0.4) * 200,
      volume24h: rand() * 50_000_000,
      liquidity: rand() * 20_000_000,
      fdv: rand() * 500_000_000,
      sparkline5m: generateSparkline(rand, 12),
      sparkline1h: generateSparkline(rand, 12),
      sparkline6h: generateSparkline(rand, 12),
      pairAge: Math.floor(rand() * 720),
      txCount24h: Math.floor(rand() * 50000),
      emoji: EMOJIS[Math.floor(rand() * EMOJIS.length)],
    });
  }

  return pairs;
}

export { CHAINS };
