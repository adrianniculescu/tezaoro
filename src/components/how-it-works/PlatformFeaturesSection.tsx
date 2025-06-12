
import React from 'react';
import { Card } from "@/components/ui/card";
import { Shield, BarChart2, Cpu } from 'lucide-react';

const PlatformFeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced risk controls to protect your capital with customizable stop-loss settings and position sizing."
    },
    {
      icon: BarChart2,
      title: "Performance Tracking",
      description: "Comprehensive analytics dashboard to monitor your strategies' performance in real-time."
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Cutting-edge artificial intelligence continuously learning and adapting to market conditions."
    }
  ];

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Key Platform <span className="text-gradient">Features</span></h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="glass-card p-6">
            <div className="mb-4 bg-tezaoro-500/20 w-12 h-12 rounded-full flex items-center justify-center">
              <feature.icon className="h-6 w-6 text-tezaoro-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlatformFeaturesSection;
