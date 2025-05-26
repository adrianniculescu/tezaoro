
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AlgorithmCards from '@/components/AlgorithmCards';
import PerformanceChart from '@/components/PerformanceChart';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import MarketMakingSection from '@/components/MarketMakingSection';
import TokenListingSection from '@/components/TokenListingSection';
import TradingSolutionsSection from '@/components/home/TradingSolutionsSection';
import FaqSection from '@/components/home/FaqSection';

const Home = () => {
  useEffect(() => {
    document.title = "Nano-Cap Crypto Market Making & Algorithmic Trading Platform | Tezaoro";
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Helmet>
        <title>Nano-Cap Crypto Market Making & Algorithmic Trading Platform | Tezaoro</title>
        <meta name="description" content="Boost liquidity for nano-cap tokens ($1M–$10M) with AI-powered market making, DEX aggregation, and secure non-custodial trading. Regulatory-ready infrastructure." />
        <meta name="keywords" content="nano-cap crypto, market making, algorithmic trading, DEX aggregation, token liquidity, non-custodial trading" />
        <link rel="canonical" href="https://tezaoro.com/" />
        
        {/* Schema Markup for SoftwareApplication */}
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Tezaoro",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "description": "AI-powered market making and algorithmic trading platform for nano-cap cryptocurrency tokens",
            "offers": {
              "@type": "Offer",
              "price": "99",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "ratingCount": "142"
            }
          }`}
        </script>
      </Helmet>
      <Navbar />
      <MvpBadge />
      <main>
        <Hero />
        <Features />
        <AlgorithmCards />
        <PerformanceChart />
        <TradingSolutionsSection />
        <MarketMakingSection />
        <TokenListingSection />
        <FaqSection />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
