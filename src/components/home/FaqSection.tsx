
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FaqSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        
        <Card className="glass-card bg-card p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                What is algorithmic trading?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>Algorithmic trading is the process of using computer programs and algorithms to automatically execute trades in financial markets based on pre-defined criteria such as price, timing, or mathematical models. These algorithms can analyze market data, identify trading opportunities, and execute trades at optimal prices and speeds that would be impossible for human traders.</p>
                <p className="mt-2">Tezaoro's platform provides sophisticated algorithmic trading capabilities accessible to traders of all experience levels, with built-in risk management and performance analytics.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                How to choose the best algorithmic trading platform?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>When selecting an algorithmic trading platform, consider these important factors:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Performance and backtesting capabilities</li>
                  <li>Available algorithms and strategy customization options</li>
                  <li>Risk management features and failsafes</li>
                  <li>User interface and ease of use</li>
                  <li>Support for your preferred markets (crypto, stocks, etc.)</li>
                  <li>Reliability and uptime guarantees</li>
                  <li>Security measures and data protection</li>
                  <li>Pricing structure and transparency</li>
                </ul>
                <p className="mt-2">Tezaoro offers comprehensive features across these areas, with particular strengths in AI-powered algorithms, real-time analytics, and intuitive controls for both beginners and professional traders.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                What are the benefits of automated trading software?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>Automated trading software offers numerous advantages over manual trading:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Elimination of emotional decision-making</li>
                  <li>Ability to execute trades 24/7 without constant monitoring</li>
                  <li>Simultaneous monitoring of multiple markets</li>
                  <li>Faster trade execution at optimal prices</li>
                  <li>Backtesting strategies against historical data</li>
                  <li>Consistent application of trading rules</li>
                  <li>Reduced transaction costs through efficient execution</li>
                  <li>Diversification across multiple strategies and asset classes</li>
                </ul>
                <p className="mt-2">Tezaoro's platform is designed to maximize these benefits while minimizing the technical expertise required to achieve them.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold">
                How do I get started with algorithmic trading on Tezaoro?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>Getting started with Tezaoro is simple:</p>
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>Join our waitlist to be notified when we launch</li>
                  <li>Choose a subscription plan that fits your needs</li>
                  <li>Set up your account and connect to your preferred exchanges</li>
                  <li>Select from our pre-built algorithms or customize your own</li>
                  <li>Run backtests to validate your strategy</li>
                  <li>Deploy your algorithm with your desired risk parameters</li>
                  <li>Monitor performance through our analytics dashboard</li>
                </ol>
                <p className="mt-2">Our <Link to="/platform" className="text-primary hover:underline">comprehensive platform guides</Link> will walk you through each step of the process.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold">
                Are crypto trading bots profitable?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>Crypto trading bots can be profitable when properly configured and monitored, but results vary based on market conditions, strategy selection, and risk management. Key factors affecting profitability include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Market volatility and overall trends</li>
                  <li>Algorithm quality and sophistication</li>
                  <li>Proper backtesting and optimization</li>
                  <li>Risk management settings</li>
                  <li>Transaction fees and technical infrastructure</li>
                </ul>
                <p className="mt-2">Tezaoro's platform incorporates advanced AI and machine learning techniques to adapt to changing market conditions, with built-in risk controls designed to preserve capital during adverse market conditions. Our <Link to="/performance" className="text-primary hover:underline">performance metrics</Link> provide transparent reporting on historical results.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Want to learn more about algorithmic trading and how Tezaoro can help you achieve your financial goals?
          </p>
          <Link to="/how-it-works" className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
            Explore How It Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
