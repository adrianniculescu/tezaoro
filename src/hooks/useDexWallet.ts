import { useState, useCallback } from 'react';

export interface WalletState {
  connected: boolean;
  address: string;
  balance: string;
  chain: 'ethereum' | 'solana';
}

const MOCK_WALLETS = {
  ethereum: {
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38',
    balance: '4.2069',
  },
  solana: {
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    balance: '24.567',
  },
};

export function useDexWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: '',
    balance: '0',
    chain: 'ethereum',
  });
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async (chain: 'ethereum' | 'solana' = 'ethereum') => {
    setConnecting(true);
    // Simulate MetaMask/Phantom connection delay
    await new Promise(r => setTimeout(r, 1500));
    setWallet({
      connected: true,
      address: MOCK_WALLETS[chain].address,
      balance: MOCK_WALLETS[chain].balance,
      chain,
    });
    setConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setWallet({ connected: false, address: '', balance: '0', chain: 'ethereum' });
  }, []);

  const switchChain = useCallback(async (chain: 'ethereum' | 'solana') => {
    if (!wallet.connected) return;
    setConnecting(true);
    await new Promise(r => setTimeout(r, 800));
    setWallet({
      connected: true,
      address: MOCK_WALLETS[chain].address,
      balance: MOCK_WALLETS[chain].balance,
      chain,
    });
    setConnecting(false);
  }, [wallet.connected]);

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return { wallet, connecting, connect, disconnect, switchChain, shortenAddress };
}
