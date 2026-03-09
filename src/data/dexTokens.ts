export interface DexToken {
  symbol: string;
  name: string;
  address: string;
  chain: 'ethereum' | 'solana';
  logo: string;
  decimals: number;
  price: number;
  change24h: number;
}

export const DEX_TOKENS: DexToken[] = [
  // Top ERC-20 Tokens
  { symbol: 'ETH', name: 'Ethereum', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', chain: 'ethereum', logo: '⟠', decimals: 18, price: 3847.22, change24h: 2.4 },
  { symbol: 'USDT', name: 'Tether USD', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', chain: 'ethereum', logo: '₮', decimals: 6, price: 1.00, change24h: 0.01 },
  { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', chain: 'ethereum', logo: '$', decimals: 6, price: 1.00, change24h: -0.01 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', chain: 'ethereum', logo: '₿', decimals: 8, price: 97245.80, change24h: 1.8 },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', chain: 'ethereum', logo: '◈', decimals: 18, price: 1.00, change24h: 0.02 },
  { symbol: 'UNI', name: 'Uniswap', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', chain: 'ethereum', logo: '🦄', decimals: 18, price: 14.32, change24h: 5.1 },
  { symbol: 'LINK', name: 'Chainlink', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA', chain: 'ethereum', logo: '⬡', decimals: 18, price: 18.45, change24h: 3.2 },
  { symbol: 'AAVE', name: 'Aave', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9', chain: 'ethereum', logo: '👻', decimals: 18, price: 268.90, change24h: 4.7 },
  { symbol: 'MKR', name: 'Maker', address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', chain: 'ethereum', logo: 'Ⓜ', decimals: 18, price: 1845.30, change24h: -1.2 },
  { symbol: 'SNX', name: 'Synthetix', address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', chain: 'ethereum', logo: 'Ⓢ', decimals: 18, price: 3.45, change24h: 6.8 },
  { symbol: 'CRV', name: 'Curve DAO', address: '0xD533a949740bb3306d119CC777fa900bA034cd52', chain: 'ethereum', logo: '↺', decimals: 18, price: 0.78, change24h: -2.3 },
  { symbol: 'COMP', name: 'Compound', address: '0xc00e94Cb662C3520282E6f5717214004A7f26888', chain: 'ethereum', logo: '©', decimals: 18, price: 62.14, change24h: 1.9 },
  { symbol: 'SUSHI', name: 'SushiSwap', address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2', chain: 'ethereum', logo: '🍣', decimals: 18, price: 1.24, change24h: -0.8 },
  { symbol: 'YFI', name: 'yearn.finance', address: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', chain: 'ethereum', logo: 'Ⓨ', decimals: 18, price: 8456.00, change24h: 2.1 },
  { symbol: '1INCH', name: '1inch', address: '0x111111111117dC0aa78b770fA6A738034120C302', chain: 'ethereum', logo: '1', decimals: 18, price: 0.52, change24h: 3.4 },
  { symbol: 'LDO', name: 'Lido DAO', address: '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', chain: 'ethereum', logo: '▲', decimals: 18, price: 2.34, change24h: 4.2 },
  { symbol: 'APE', name: 'ApeCoin', address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381', chain: 'ethereum', logo: '🦍', decimals: 18, price: 1.67, change24h: -3.1 },
  { symbol: 'SHIB', name: 'Shiba Inu', address: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE', chain: 'ethereum', logo: '🐕', decimals: 18, price: 0.0000234, change24h: 7.2 },
  { symbol: 'PEPE', name: 'Pepe', address: '0x6982508145454Ce325dDbE47a25d4ec3d2311933', chain: 'ethereum', logo: '🐸', decimals: 18, price: 0.0000187, change24h: 12.5 },
  { symbol: 'ARB', name: 'Arbitrum', address: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1', chain: 'ethereum', logo: '◆', decimals: 18, price: 1.12, change24h: 2.8 },
  { symbol: 'OP', name: 'Optimism', address: '0x4200000000000000000000000000000000000042', chain: 'ethereum', logo: '⊕', decimals: 18, price: 2.56, change24h: 1.5 },
  { symbol: 'GRT', name: 'The Graph', address: '0xc944E90C64B2c07662A292be6244BDf05Cda44a7', chain: 'ethereum', logo: 'Ⓖ', decimals: 18, price: 0.28, change24h: -1.4 },
  { symbol: 'FET', name: 'Fetch.ai', address: '0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85', chain: 'ethereum', logo: '🤖', decimals: 18, price: 2.45, change24h: 8.3 },
  { symbol: 'RNDR', name: 'Render', address: '0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24', chain: 'ethereum', logo: '⬟', decimals: 18, price: 10.78, change24h: 5.6 },
  { symbol: 'IMX', name: 'Immutable X', address: '0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF', chain: 'ethereum', logo: 'Ⓧ', decimals: 18, price: 2.13, change24h: -0.5 },
  { symbol: 'MANA', name: 'Decentraland', address: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942', chain: 'ethereum', logo: '🌐', decimals: 18, price: 0.54, change24h: 1.2 },
  { symbol: 'SAND', name: 'The Sandbox', address: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0', chain: 'ethereum', logo: '🏖', decimals: 18, price: 0.62, change24h: 2.0 },
  { symbol: 'ENS', name: 'ENS', address: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72', chain: 'ethereum', logo: '📛', decimals: 18, price: 28.90, change24h: 3.7 },
  { symbol: 'DYDX', name: 'dYdX', address: '0x92D6C1e31e14520e676a687F0a93788B716BEff5', chain: 'ethereum', logo: '📊', decimals: 18, price: 3.21, change24h: -2.1 },
  { symbol: 'BAL', name: 'Balancer', address: '0xba100000625a3754423978a60c9317c58a424e3D', chain: 'ethereum', logo: '⚖', decimals: 18, price: 4.56, change24h: 1.8 },
  { symbol: 'RPL', name: 'Rocket Pool', address: '0xD33526068D116cE69F19A9ee46F0bd304F21A51f', chain: 'ethereum', logo: '🚀', decimals: 18, price: 24.80, change24h: -0.3 },
  { symbol: 'BLUR', name: 'Blur', address: '0x5283D291DBCF85356A21bA090E6db59121208b44', chain: 'ethereum', logo: '💨', decimals: 18, price: 0.42, change24h: 4.9 },
  { symbol: 'PENDLE', name: 'Pendle', address: '0x808507121B80c02388fAd14726482e061B8da827', chain: 'ethereum', logo: '⏳', decimals: 18, price: 6.78, change24h: 9.1 },
  { symbol: 'SSV', name: 'SSV Network', address: '0x9D65fF81a3c488d585bBfb0Bfe3c7707c7917f54', chain: 'ethereum', logo: '🔗', decimals: 18, price: 34.20, change24h: 2.6 },
  { symbol: 'BONE', name: 'Bone ShibaSwap', address: '0x9813037ee2218799597d83D4a5B6F3b6778218d9', chain: 'ethereum', logo: '🦴', decimals: 18, price: 0.89, change24h: -1.7 },
  { symbol: 'FXS', name: 'Frax Share', address: '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', chain: 'ethereum', logo: '⨍', decimals: 18, price: 7.23, change24h: 3.0 },
  { symbol: 'LQTY', name: 'Liquity', address: '0x6DEA81C8171D0bA574754EF6F8b412F2Ed88c54D', chain: 'ethereum', logo: '💧', decimals: 18, price: 1.56, change24h: -0.9 },
  { symbol: 'STG', name: 'Stargate', address: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6', chain: 'ethereum', logo: '⭐', decimals: 18, price: 0.67, change24h: 2.3 },
  { symbol: 'MAGIC', name: 'Magic', address: '0xB0c7a3Ba49C7a6EaBa6cD4a96C55a1391AFeD093', chain: 'ethereum', logo: '✨', decimals: 18, price: 0.98, change24h: 5.4 },
  { symbol: 'GMX', name: 'GMX', address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a', chain: 'ethereum', logo: '🔵', decimals: 18, price: 42.30, change24h: -1.5 },
  // Solana Tokens
  { symbol: 'SOL', name: 'Solana', address: 'So11111111111111111111111111111111111111112', chain: 'solana', logo: '◎', decimals: 9, price: 186.45, change24h: 3.8 },
  { symbol: 'RAY', name: 'Raydium', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', chain: 'solana', logo: '☀', decimals: 6, price: 4.56, change24h: 6.2 },
  { symbol: 'SRM', name: 'Serum', address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt', chain: 'solana', logo: '🔶', decimals: 6, price: 0.034, change24h: -2.8 },
  { symbol: 'ORCA', name: 'Orca', address: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', chain: 'solana', logo: '🐋', decimals: 6, price: 5.12, change24h: 4.1 },
  { symbol: 'MNGO', name: 'Mango', address: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac', chain: 'solana', logo: '🥭', decimals: 6, price: 0.042, change24h: -1.3 },
  { symbol: 'BONK', name: 'Bonk', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', chain: 'solana', logo: '🐕', decimals: 5, price: 0.0000312, change24h: 15.4 },
  { symbol: 'JTO', name: 'Jito', address: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL', chain: 'solana', logo: '⚡', decimals: 9, price: 3.89, change24h: 7.8 },
  { symbol: 'JUP', name: 'Jupiter', address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', chain: 'solana', logo: '🪐', decimals: 6, price: 1.34, change24h: 4.5 },
  { symbol: 'PYTH', name: 'Pyth Network', address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3', chain: 'solana', logo: '🐍', decimals: 6, price: 0.45, change24h: 3.2 },
  { symbol: 'WIF', name: 'dogwifhat', address: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', chain: 'solana', logo: '🎩', decimals: 6, price: 2.87, change24h: 18.9 },
  { symbol: 'MSOL', name: 'Marinade SOL', address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', chain: 'solana', logo: '🧊', decimals: 9, price: 198.23, change24h: 3.9 },
  { symbol: 'STEP', name: 'Step Finance', address: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', chain: 'solana', logo: '👟', decimals: 9, price: 0.078, change24h: -0.6 },
  { symbol: 'SAMO', name: 'Samoyedcoin', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', chain: 'solana', logo: '🐶', decimals: 9, price: 0.012, change24h: 5.7 },
  { symbol: 'RENDER', name: 'Render (SOL)', address: 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof', chain: 'solana', logo: '🎨', decimals: 8, price: 10.78, change24h: 5.6 },
  { symbol: 'WORMHOLE', name: 'Wormhole', address: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ', chain: 'solana', logo: '🕳', decimals: 6, price: 0.89, change24h: 2.1 },
  { symbol: 'TENSOR', name: 'Tensor', address: 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6', chain: 'solana', logo: '📐', decimals: 8, price: 1.23, change24h: -3.4 },
  { symbol: 'DRIFT', name: 'Drift Protocol', address: 'DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7', chain: 'solana', logo: '🌊', decimals: 6, price: 0.67, change24h: 8.2 },
  { symbol: 'BSOL', name: 'BlazeStake SOL', address: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1', chain: 'solana', logo: '🔥', decimals: 9, price: 192.10, change24h: 3.7 },
  { symbol: 'HONEY', name: 'Hivemapper', address: '4vMsoUT2BWatFweudnQM1xedRLfJgJ7hswhcpz4xgBTy', chain: 'solana', logo: '🍯', decimals: 9, price: 0.034, change24h: -2.1 },
  { symbol: 'KMNO', name: 'Kamino', address: 'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS', chain: 'solana', logo: '🏔', decimals: 6, price: 0.12, change24h: 4.8 },
  // More ERC-20
  { symbol: 'MATIC', name: 'Polygon', address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', chain: 'ethereum', logo: '⬡', decimals: 18, price: 0.72, change24h: 1.3 },
  { symbol: 'FIL', name: 'Filecoin', address: '0x845Dd2a7eE2a0690E8B37c3F1FDb47107a5C1Fa0', chain: 'ethereum', logo: '📁', decimals: 18, price: 6.45, change24h: -0.7 },
  { symbol: 'ATOM', name: 'Cosmos (Wrapped)', address: '0x8D983cb9388EaC77af0474fA441C4815500Cb7BB', chain: 'ethereum', logo: '⚛', decimals: 6, price: 9.23, change24h: 2.1 },
  { symbol: 'NEAR', name: 'NEAR Protocol', address: '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4', chain: 'ethereum', logo: 'Ⓝ', decimals: 24, price: 5.67, change24h: 3.9 },
  { symbol: 'AVAX', name: 'Avalanche (Wrapped)', address: '0x85f138bfEE4ef8e540890CFb48F620571d67Eda3', chain: 'ethereum', logo: '🔺', decimals: 18, price: 38.90, change24h: 4.2 },
  { symbol: 'ALGO', name: 'Algorand (Wrapped)', address: '0x37fEbB0fF73a6E09d803fE5060D1E8BeC0d30D47', chain: 'ethereum', logo: 'Ⓐ', decimals: 6, price: 0.32, change24h: -1.8 },
  { symbol: 'AXS', name: 'Axie Infinity', address: '0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b', chain: 'ethereum', logo: '🎮', decimals: 18, price: 8.12, change24h: 2.5 },
  { symbol: 'CHZ', name: 'Chiliz', address: '0x3506424F91fD33084466F402d5D97f05F8e3b4AF', chain: 'ethereum', logo: '⚽', decimals: 18, price: 0.11, change24h: -0.4 },
  { symbol: 'GALA', name: 'Gala', address: '0xd1d2Eb1B1e90B638588728b4130137D262C87cae', chain: 'ethereum', logo: '🎪', decimals: 8, price: 0.045, change24h: 6.3 },
  { symbol: 'ILV', name: 'Illuvium', address: '0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E', chain: 'ethereum', logo: '🎯', decimals: 18, price: 78.90, change24h: -2.6 },
  { symbol: 'MASK', name: 'Mask Network', address: '0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074', chain: 'ethereum', logo: '🎭', decimals: 18, price: 4.23, change24h: 1.1 },
  { symbol: 'ZRX', name: '0x Protocol', address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498', chain: 'ethereum', logo: '0x', decimals: 18, price: 0.56, change24h: 0.8 },
  { symbol: 'CELO', name: 'Celo', address: '0x7D1AmA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', chain: 'ethereum', logo: '🟡', decimals: 18, price: 0.78, change24h: 3.4 },
  { symbol: 'ANKR', name: 'Ankr', address: '0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4', chain: 'ethereum', logo: '⚓', decimals: 18, price: 0.035, change24h: 2.0 },
  { symbol: 'OCEAN', name: 'Ocean Protocol', address: '0x967da4048cD07aB37855c090aAF366e4ce1b9F48', chain: 'ethereum', logo: '🌊', decimals: 18, price: 0.89, change24h: 4.7 },
  { symbol: 'BAT', name: 'Basic Attention', address: '0x0D8775F648430679A709E98d2b0Cb6250d2887EF', chain: 'ethereum', logo: '🦇', decimals: 18, price: 0.28, change24h: -1.2 },
  { symbol: 'ENJ', name: 'Enjin Coin', address: '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c', chain: 'ethereum', logo: '🎲', decimals: 18, price: 0.34, change24h: 1.6 },
  { symbol: 'STORJ', name: 'Storj', address: '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC', chain: 'ethereum', logo: '☁', decimals: 8, price: 0.67, change24h: -0.5 },
  { symbol: 'KNC', name: 'Kyber Network', address: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202', chain: 'ethereum', logo: '💎', decimals: 18, price: 0.78, change24h: 2.9 },
  { symbol: 'REN', name: 'Ren', address: '0x408e41876cCCDC0F92210600ef50372656052a38', chain: 'ethereum', logo: '🔄', decimals: 18, price: 0.056, change24h: -3.2 },
  { symbol: 'NMR', name: 'Numeraire', address: '0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671', chain: 'ethereum', logo: '🔢', decimals: 18, price: 18.90, change24h: 1.4 },
  { symbol: 'BNT', name: 'Bancor', address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C', chain: 'ethereum', logo: '🏦', decimals: 18, price: 0.72, change24h: -0.8 },
  { symbol: 'BAND', name: 'Band Protocol', address: '0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55', chain: 'ethereum', logo: '📡', decimals: 18, price: 1.56, change24h: 3.1 },
  { symbol: 'CELR', name: 'Celer Network', address: '0x4F9254C83EB525f9FCf346490bbb3ed28a81C667', chain: 'ethereum', logo: '🌐', decimals: 18, price: 0.023, change24h: -1.9 },
  { symbol: 'CTSI', name: 'Cartesi', address: '0x491604c0FDF08347Dd1fa4Ee062a822A5DD06B5D', chain: 'ethereum', logo: '🖥', decimals: 18, price: 0.21, change24h: 5.2 },
  { symbol: 'JASMY', name: 'JasmyCoin', address: '0x7420B4b9a0110cdC71fB720908340C03F9Bc03EC', chain: 'ethereum', logo: '🔒', decimals: 18, price: 0.028, change24h: 8.7 },
  { symbol: 'AUDIO', name: 'Audius', address: '0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998', chain: 'ethereum', logo: '🎵', decimals: 18, price: 0.23, change24h: -2.4 },
  { symbol: 'LOOM', name: 'Loom Network', address: '0x42476F744292107e34519F9c357927074Ea3F75D', chain: 'ethereum', logo: '🕸', decimals: 18, price: 0.089, change24h: 1.7 },
  { symbol: 'UMA', name: 'UMA', address: '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', chain: 'ethereum', logo: '⛓', decimals: 18, price: 3.45, change24h: -0.3 },
  { symbol: 'SKL', name: 'SKALE', address: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7', chain: 'ethereum', logo: '⬢', decimals: 18, price: 0.067, change24h: 4.1 },
  { symbol: 'API3', name: 'API3', address: '0x0b38210ea11411557c13457D4dA7dC6ea731B88a', chain: 'ethereum', logo: '🔌', decimals: 18, price: 2.34, change24h: 2.8 },
  { symbol: 'PERP', name: 'Perpetual Protocol', address: '0xbC396689893D065F41bc2C6EcbeE5e0085233447', chain: 'ethereum', logo: '∞', decimals: 18, price: 1.12, change24h: -1.6 },
  { symbol: 'ALICE', name: 'My Neighbor Alice', address: '0xAC51066d7bEC65Dc4589368da368b212745d63E8', chain: 'ethereum', logo: '🏡', decimals: 6, price: 1.89, change24h: 3.5 },
  { symbol: 'DODO', name: 'DODO', address: '0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd', chain: 'ethereum', logo: '🦤', decimals: 18, price: 0.18, change24h: 6.1 },
  { symbol: 'QUICK', name: 'QuickSwap', address: '0xd2bA23dE8a19316A638dc1e7a9ADdA1d74233368', chain: 'ethereum', logo: '⚡', decimals: 18, price: 56.70, change24h: -0.2 },
  { symbol: 'SPELL', name: 'Spell Token', address: '0x090185f2135308BaD17527004364eBcC2D37e5F6', chain: 'ethereum', logo: '🧙', decimals: 18, price: 0.0012, change24h: 4.4 },
  { symbol: 'SYN', name: 'Synapse', address: '0x0f2D719407FdBeFF09D87557AbB7232601FD9F29', chain: 'ethereum', logo: '🧠', decimals: 18, price: 0.89, change24h: -3.7 },
  { symbol: 'BICO', name: 'Biconomy', address: '0xF17e65822b568B3903685a7c9F496CF7656Cc6C2', chain: 'ethereum', logo: '⚙', decimals: 18, price: 0.45, change24h: 2.3 },
  { symbol: 'HIGH', name: 'Highstreet', address: '0x71Ab77b7dbB4fa7e017BC15090b2163221420282', chain: 'ethereum', logo: '🏬', decimals: 18, price: 2.12, change24h: -1.1 },
  { symbol: 'LOOKS', name: 'LooksRare', address: '0xf4d2888d29D722226FafA5d9B24F9164c092421E', chain: 'ethereum', logo: '👀', decimals: 18, price: 0.089, change24h: 5.8 },
  { symbol: 'X2Y2', name: 'X2Y2', address: '0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9', chain: 'ethereum', logo: '🔲', decimals: 18, price: 0.0045, change24h: -4.2 },
  { symbol: 'AGLD', name: 'Adventure Gold', address: '0x32353A6C91143bfd6C7d363B546e62a9A2489A20', chain: 'ethereum', logo: '⚔', decimals: 18, price: 1.45, change24h: 7.3 },
  { symbol: 'MCB', name: 'MUX Protocol', address: '0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42', chain: 'ethereum', logo: '📈', decimals: 18, price: 12.30, change24h: 1.9 },
  { symbol: 'GNO', name: 'Gnosis', address: '0x6810e776880C02933D47DB1b9fc05908e5386b96', chain: 'ethereum', logo: '🦉', decimals: 18, price: 312.40, change24h: -0.6 },
];

export const getTokensByChain = (chain: 'ethereum' | 'solana' | 'all') => {
  if (chain === 'all') return DEX_TOKENS;
  return DEX_TOKENS.filter(t => t.chain === chain);
};

export const getTokenBySymbol = (symbol: string) => {
  return DEX_TOKENS.find(t => t.symbol === symbol);
};

export const formatPrice = (price: number) => {
  if (price < 0.001) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const calculateSwap = (fromToken: DexToken, toToken: DexToken, amount: number) => {
  const fromValue = amount * fromToken.price;
  const toAmount = fromValue / toToken.price;
  const priceImpact = amount > 1000 ? Math.random() * 0.5 + 0.1 : Math.random() * 0.1;
  const fee = fromValue * 0.003; // 0.3% fee
  const minReceived = toAmount * (1 - 0.005); // 0.5% slippage default
  
  return {
    toAmount,
    rate: fromToken.price / toToken.price,
    priceImpact,
    fee,
    feeUsd: fee,
    minReceived,
    route: fromToken.symbol === 'ETH' || toToken.symbol === 'ETH' 
      ? `${fromToken.symbol} → ${toToken.symbol}`
      : `${fromToken.symbol} → ETH → ${toToken.symbol}`,
    estimatedGas: (Math.random() * 0.005 + 0.002).toFixed(4),
  };
};
