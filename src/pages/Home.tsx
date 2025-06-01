
import React from 'react';
import PageLayout from '@/components/PageLayout';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TradingSolutionsSection from '@/components/home/TradingSolutionsSection';
import Testimonials from '@/components/Testimonials';
import PricingSection from '@/components/PricingSection';
import FaqSection from '@/components/home/FaqSection';

const Home = () => {
  console.log('Home component is rendering');
  
  return (
    <PageLayout title="AI-Powered Algorithmic Trading Platform">
      <Hero />
      <Features />
      <TradingSolutionsSection />
      <Testimonials />
      <PricingSection />
      <FaqSection />
    </PageLayout>
  );
};

export default Home;
