
import React from 'react';
import { Card } from "@/components/ui/card";

const FaqSection = () => {
  const faqs = [
    {
      question: "How can I sign-up to the platform?",
      answer: "Tezaoro is currently in MVP mode. The platform is open for customers by invitation only!"
    },
    {
      question: "How much capital do I need to start?",
      answer: "We recommend starting with at least $5,000 to properly diversify across multiple strategies, though you can begin with as little as $1,000 for select algorithms."
    },
    {
      question: "Do I need trading experience?",
      answer: "No experience is necessary. Our platform is designed to be user-friendly for beginners while offering advanced features for experienced traders."
    },
    {
      question: "What are the expected returns?",
      answer: "Historical performance shows an average annual return of 25.7%, though past performance is not indicative of future results. Returns vary based on market conditions and risk settings."
    },
    {
      question: "When will the platform be available?",
      answer: "The platform is currently in testing mode with a limited group of beta users. We expect to open access to the public in Q3 2025. Join our waitlist to be notified when we launch."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="glass-card p-6">
            <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
