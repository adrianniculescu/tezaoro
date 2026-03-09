import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Search } from 'lucide-react';
import { DexToken, DEX_TOKENS, formatPrice } from '@/data/dexTokens';

interface DexTokenSelectorProps {
  selectedToken: DexToken | null;
  onSelect: (token: DexToken) => void;
  chain: 'ethereum' | 'solana' | 'all';
  excludeToken?: DexToken | null;
}

const DexTokenSelector = ({ selectedToken, onSelect, chain, excludeToken }: DexTokenSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTokens = useMemo(() => {
    let tokens = chain === 'all' ? DEX_TOKENS : DEX_TOKENS.filter(t => t.chain === chain);
    if (excludeToken) tokens = tokens.filter(t => t.address !== excludeToken.address);
    if (search) {
      const q = search.toLowerCase();
      tokens = tokens.filter(t => t.symbol.toLowerCase().includes(q) || t.name.toLowerCase().includes(q));
    }
    return tokens;
  }, [chain, excludeToken, search]);

  const popularSymbols = chain === 'solana' 
    ? ['SOL', 'USDC', 'RAY', 'JUP', 'BONK', 'WIF'] 
    : ['ETH', 'USDT', 'USDC', 'WBTC', 'DAI', 'UNI'];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 border border-white/10 hover:border-primary/40 transition-colors min-w-[140px]">
          {selectedToken ? (
            <>
              <span className="text-xl">{selectedToken.logo}</span>
              <span className="font-semibold text-foreground">{selectedToken.symbol}</span>
            </>
          ) : (
            <span className="text-muted-foreground text-sm">Select token</span>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or paste address"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 bg-background/50 border-white/10"
            autoFocus
          />
        </div>
        {/* Popular tokens */}
        <div className="flex flex-wrap gap-2">
          {popularSymbols.map(sym => {
            const token = DEX_TOKENS.find(t => t.symbol === sym && (chain === 'all' || t.chain === chain));
            if (!token || token.address === excludeToken?.address) return null;
            return (
              <Badge
                key={sym}
                variant="outline"
                className="cursor-pointer px-3 py-1.5 hover:bg-primary/20 hover:border-primary/40 transition-colors border-white/10"
                onClick={() => { onSelect(token); setOpen(false); setSearch(''); }}
              >
                <span className="mr-1">{token.logo}</span> {sym}
              </Badge>
            );
          })}
        </div>
        <ScrollArea className="h-[320px]">
          <div className="space-y-1">
            {filteredTokens.map(token => (
              <button
                key={token.address}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-left"
                onClick={() => { onSelect(token); setOpen(false); setSearch(''); }}
              >
                <span className="text-2xl w-8 text-center">{token.logo}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{token.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-foreground">{formatPrice(token.price)}</div>
                  <div className={`text-xs ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                  </div>
                </div>
              </button>
            ))}
            {filteredTokens.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No tokens found</div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DexTokenSelector;
