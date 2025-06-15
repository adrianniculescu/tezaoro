
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';
import ProcessStepsSection from '@/components/how-it-works/ProcessStepsSection';
import PlatformFeaturesSection from '@/components/how-it-works/PlatformFeaturesSection';
import FaqSection from '@/components/how-it-works/FaqSection';

const HowItWorks = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://tezaoro.com/how-it-works",
    "name": "How It Works | Tezaoro",
    "description": "Discover how Tezaoro's AI-powered algorithmic trading platform works, from data collection and analysis to AI model training and strategy implementation.",
    "publisher": {
      "@type": "Organization",
      "name": "Tezaoro",
      "url": "https://tezaoro.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tezaoro.com/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark">
      <Helmet>
        <title>How It Works | Tezaoro</title>
        <meta name="description" content="Discover how Tezaoro's AI-powered algorithmic trading platform works, from data collection and analysis to AI model training and strategy implementation." />
        <link rel="canonical" href="https://tezaoro.com/how-it-works" />
        <script type="application/ld+json">
          {JSON.stringify(pageSchema, null, 2)}
        </script>
      </Helmet>
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
