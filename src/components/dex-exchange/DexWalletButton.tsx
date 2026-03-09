import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { WalletState } from '@/hooks/useDexWallet';

interface DexWalletButtonProps {
  wallet: WalletState;
  connecting: boolean;
  connect: (chain?: 'ethereum' | 'solana') => Promise<void>;
  disconnect: () => void;
  shortenAddress: (addr: string) => string;
}

const DexWalletButton = ({ wallet, connecting, connect, disconnect, shortenAddress }: DexWalletButtonProps) => {
  const { toast } = useToast();

  if (!wallet.connected) {
    return (
      <Button
        onClick={() => connect('ethereum')}
        disabled={connecting}
        className="bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-500 hover:to-green-400 text-white border-0 gap-2 px-5"
        size="lg"
      >
        <Wallet className="h-4 w-4" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/20">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          {shortenAddress(wallet.address)}
          <span className="text-xs text-muted-foreground ml-1">
            {wallet.balance} {wallet.chain === 'ethereum' ? 'ETH' : 'SOL'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-white/10">
        <DropdownMenuItem onClick={() => {
          navigator.clipboard.writeText(wallet.address);
          toast({ title: 'Address copied!' });
        }}>
          <Copy className="h-4 w-4 mr-2" /> Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="h-4 w-4 mr-2" /> View on Explorer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnect} className="text-red-400">
          <LogOut className="h-4 w-4 mr-2" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DexWalletButton;
