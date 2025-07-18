
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TradingSolutionsSection from '@/components/home/TradingSolutionsSection';
import AlgorithmCards from '@/components/AlgorithmCards';
import PerformanceChart from '@/components/PerformanceChart';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import MarketMakingSection from '@/components/MarketMakingSection';
import TokenListingSection from '@/components/TokenListingSection';

const Index = () => {
  useEffect(() => {
    document.title = "Tezaoro | AI-Powered Algorithmic Trading Platform (MVP)";
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <MvpBadge />
      <main>
        <Hero />
        <Features />
        <TradingSolutionsSection />
        <AlgorithmCards />
        <PerformanceChart />
        <MarketMakingSection />
        <TokenListingSection />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
