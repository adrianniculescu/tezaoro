
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';

const TokenListing = () => {
  return (
    <PageLayout title="Token Listing & IEO Services">
      <PageHeader
        title="Token Listing & IEO Services"
        description="Access our global network of exchanges and launchpads to accelerate your token's growth and visibility."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <section>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tezaoro accelerates your project's growth by connecting you with over 50 of the world's leading exchanges and launchpads. Whether you're preparing for your first listing or scaling global liquidity, our team ensures your token gets the visibility and support it deserves.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">🌍 Global Exchange Partnerships</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                We collaborate with a robust network of top-tier exchanges to facilitate new token listings and IEO (Initial Exchange Offering) campaigns, including:
              </p>
              
              <h3 className="text-xl font-semibold mb-4">Featured Exchanges:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {["Latoken", "Bitmart", "XT", "Lbank", "Gate", "KuCoin", "HitBTC", "FMFW", "Poloniex", 
                  "Bitrue", "Bittrex", "BitGlobal", "Binance", "Bybit", "Coinsbit", "Cointiger", "Bancor", 
                  "Changelly", "Yobit", "Okex", "Bitfinex", "Huobi", "Digifinex", "Probit", "Coinstore", "P2PB2B"].map((exchange) => (
                  <div key={exchange} className="bg-card/50 p-3 rounded-md text-center">
                    {exchange}
                  </div>
                ))}
                <div className="bg-card/50 p-3 rounded-md text-center">And many more...</div>
              </div>
              
              <p className="text-lg">
                Our partnerships extend to leading market makers, ensuring your token maintains optimal trading volume and a healthy spread—keeping your project in good standing on every exchange.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">🚀 Comprehensive Token Visibility</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                Beyond exchange listings, we help maximize your token's reach by submitting it to the industry's most trusted data platforms—think of them as the "Googles" of the token world:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {["CoinMarketCap", "CoinGecko", "CryptoCompare"].map((platform) => (
                  <div key={platform} className="bg-card/50 p-6 rounded-md text-center">
                    <h3 className="text-xl font-semibold mb-2">{platform}</h3>
                  </div>
                ))}
              </div>
              
              <p className="text-lg">
                This guarantees your project is discoverable by traders, investors, and the global crypto community.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">🛡️ Pre-Exchange Launchpad & IDO Support</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                If your project is eligible for a launchpad or IDO before exchange listing, we guide you to the right platforms for maximum impact:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {["DAO Maker", "Sushiswap", "PancakeSwap", "Uniswap", "Polkastarter", "Balancer", 
                  "Duck Starter", "BSCPad", "MMPRO Launchpad", "Axl Launchpad", "PadSwap"].map((platform) => (
                  <div key={platform} className="bg-card/50 p-3 rounded-md text-center">
                    {platform}
                  </div>
                ))}
                <div className="bg-card/50 p-3 rounded-md text-center">And more...</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">🎨 NFT Listing & Strategy Consulting</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                Looking to launch or expand your NFT project? We provide expert strategy, consultation, and facilitation for NFT listings on major platforms, including:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {["Opensea", "Rarible", "Nifty Gateway", "Binance NFT", "PancakeSwap NFT", "Foundation.app", 
                  "Mintable", "Thetadrop", "Bitmart NFT", "Latoken NFT", "BitForex NFT", "Crypto.com NFT"].map((platform) => (
                  <div key={platform} className="bg-card/50 p-3 rounded-md text-center">
                    {platform}
                  </div>
                ))}
                <div className="bg-card/50 p-3 rounded-md text-center">And others...</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-gradient">🎮 Web 3.0 Gaming & IGO Support</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-6">
                For Web 3.0 gaming startups, we offer specialized support for IGOs (Initial Game Offerings) on leading platforms:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {["Gamefi", "Binance", "Seedify.fund", "Gamestarter", "Enjinstarter"].map((platform) => (
                  <div key={platform} className="bg-card/50 p-3 rounded-md text-center">
                    {platform}
                  </div>
                ))}
                <div className="bg-card/50 p-3 rounded-md text-center">And more...</div>
              </div>
            </div>
          </section>

          <section className="bg-card/30 p-8 rounded-xl border border-border">
            <h2 className="text-3xl font-bold mb-6 text-center">Ready to Launch?</h2>
            <p className="text-lg text-center mb-8">
              Whether you're preparing for your first exchange, an NFT drop, or a gaming IGO, Tezaoro is your trusted partner for every stage.
            </p>
            <div className="flex flex-col items-center">
              <p className="text-center mb-6">
                Contact us today to book a strategy call and discover how we can help you achieve your goals.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow">
                <Mail className="mr-2 h-5 w-5" />
                Contact: office@tezaoro.com
              </Button>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Note: Token Listing services are available by invitation only after an initial consultation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default TokenListing;
