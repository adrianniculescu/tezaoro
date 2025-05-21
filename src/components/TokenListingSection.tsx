
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const TokenListingSection = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-tezaoro-900/30 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Token Listing & IEO Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with 50+ global exchanges and maximize your token's visibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/30 border border-border rounded-xl p-6 flex flex-col h-full">
              <div className="h-12 w-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-tezaoro-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exchange Listings</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Direct access to 50+ global exchanges including Binance, KuCoin, Gate.io, and more.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-xl p-6 flex flex-col h-full">
              <div className="h-12 w-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-tezaoro-400" rotate={45} />
              </div>
              <h3 className="text-xl font-semibold mb-3">NFT & IGO Support</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Strategic consultation and facilitation for NFT launches and gaming IGOs.
              </p>
            </div>
            
            <div className="bg-card/30 border border-border rounded-xl p-6 flex flex-col h-full">
              <div className="h-12 w-12 rounded-full bg-tezaoro-500/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-tezaoro-400" rotate={90} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Launchpad & IDO</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Access to premier launchpads like DAO Maker, Polkastarter, and PancakeSwap for IDOs.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Tezaoro accelerates your project's growth by connecting you with the world's leading exchanges and launchpads. Our team ensures your token gets the visibility and support it deserves.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/token-listing">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenListingSection;
