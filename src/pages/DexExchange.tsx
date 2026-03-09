import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DexSwapPanel from '@/components/dex-exchange/DexSwapPanel';
import DexLiquidityPanel from '@/components/dex-exchange/DexLiquidityPanel';
import DexWalletButton from '@/components/dex-exchange/DexWalletButton';
import { useDexWallet } from '@/hooks/useDexWallet';
import { ArrowLeftRight, Droplets } from 'lucide-react';

const DexExchange = () => {
  const walletHook = useDexWallet();

  return (
    <PageLayout title="Tezaoro DEX Exchange">
      <div className="min-h-screen dex-gradient-bg">
        {/* Header */}
        <div className="container mx-auto px-4 pt-24 pb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Tezaoro <span className="dex-text-glow">DEX</span>
              </h1>
              <p className="text-muted-foreground mt-1">Swap tokens across Ethereum & Solana</p>
            </div>
            <DexWalletButton {...walletHook} />
          </div>

          {/* Main Panel */}
          <div className="max-w-lg mx-auto">
            <Tabs defaultValue="swap" className="w-full">
              <TabsList className="w-full bg-card/60 backdrop-blur-md border border-white/10 mb-4">
                <TabsTrigger value="swap" className="flex-1 gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <ArrowLeftRight className="h-4 w-4" /> Swap
                </TabsTrigger>
                <TabsTrigger value="liquidity" className="flex-1 gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Droplets className="h-4 w-4" /> Liquidity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="swap">
                <DexSwapPanel wallet={walletHook} />
              </TabsContent>
              <TabsContent value="liquidity">
                <DexLiquidityPanel wallet={walletHook} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DexExchange;
