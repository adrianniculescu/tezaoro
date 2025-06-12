
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import ProcessStepsSection from '@/components/how-it-works/ProcessStepsSection';
import PlatformFeaturesSection from '@/components/how-it-works/PlatformFeaturesSection';
import FaqSection from '@/components/how-it-works/FaqSection';

const HowItWorks = () => {
  useEffect(() => {
    document.title = "How It Works | Tezaoro";
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <MvpBadge />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              How <span className="text-gradient">Tezaoro</span> Works
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Discover how our AI-powered algorithmic trading platform transforms market data into profitable trading strategies.
            </p>

            <ProcessStepsSection />
            <PlatformFeaturesSection />
            <FaqSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
