
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, BarChart2, Zap, TrendingUp, Shield, Clock, 
  Globe, LineChart, Bot, Users, MessageSquare, Smartphone
} from 'lucide-react';

const Features = () => {
  const featureCategories = [
    {
      id: "algorithms",
      name: "AI Algorithms",
      icon: <Cpu className="h-4 w-4" />,
      features: [
        {
          icon: <Cpu className="h-10 w-10 text-primary" />,
          title: "Advanced Machine Learning",
          description: "Our algorithms continuously learn and adapt to changing market conditions."
        },
        {
          icon: <TrendingUp className="h-10 w-10 text-primary" />,
          title: "Pattern Recognition",
          description: "Identify complex market patterns across multiple timeframes and asset classes."
        },
        {
          icon: <Bot className="h-10 w-10 text-primary" />,
          title: "Autonomous Trading",
          description: "Set your parameters and let our AI handle the execution without emotional bias."
        },
        {
          icon: <LineChart className="h-10 w-10 text-primary" />,
          title: "Predictive Analytics",
          description: "Forecast potential market movements with sophisticated probabilistic models."
        }
      ]
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart2 className="h-4 w-4" />,
      features: [
        {
          icon: <BarChart2 className="h-10 w-10 text-primary" />,
          title: "Real-time Dashboards",
          description: "Monitor your portfolio performance with intuitive real-time visualizations."
        },
        {
          icon: <LineChart className="h-10 w-10 text-primary" />,
          title: "Performance Metrics",
          description: "Track key metrics like Sharpe ratio, drawdown, and risk-adjusted returns."
        },
        {
          icon: <TrendingUp className="h-10 w-10 text-primary" />,
          title: "Market Analysis",
          description: "Comprehensive analysis tools for identifying market trends and opportunities."
        },
        {
          icon: <Globe className="h-10 w-10 text-primary" />,
          title: "Multi-market Data",
          description: "Integrated data feeds from global markets for comprehensive analysis."
        }
      ]
    },
    {
      id: "risk",
      name: "Risk Management",
      icon: <Shield className="h-4 w-4" />,
      features: [
        {
          icon: <Shield className="h-10 w-10 text-primary" />,
          title: "Automated Stop-Loss",
          description: "Intelligent and dynamic stop-loss mechanisms that adapt to market volatility."
        },
        {
          icon: <Zap className="h-10 w-10 text-primary" />,
          title: "Volatility Protection",
          description: "Specialized algorithms to protect capital during extreme market conditions."
        },
        {
          icon: <Users className="h-10 w-10 text-primary" />,
          title: "Portfolio Diversification",
          description: "Smart allocation across multiple assets to reduce concentrated risk."
        },
        {
          icon: <BarChart2 className="h-10 w-10 text-primary" />,
          title: "Risk Analysis Tools",
          description: "Comprehensive suite of tools to analyze and mitigate trading risks."
        }
      ]
    },
    {
      id: "accessibility",
      name: "Accessibility",
      icon: <Smartphone className="h-4 w-4" />,
      features: [
        {
          icon: <Clock className="h-10 w-10 text-primary" />,
          title: "24/7 Trading",
          description: "Our algorithms trade around the clock, even when you're not at your desk."
        },
        {
          icon: <Smartphone className="h-10 w-10 text-primary" />,
          title: "Mobile Access",
          description: "Monitor and manage your trading strategies from anywhere with our mobile interface."
        },
        {
          icon: <Globe className="h-10 w-10 text-primary" />,
          title: "Global Market Access",
          description: "Trade across multiple global markets from a single unified platform."
        },
        {
          icon: <MessageSquare className="h-10 w-10 text-primary" />,
          title: "Alerts & Notifications",
          description: "Customizable alerts keep you informed of important market events and trades."
        }
      ]
    }
  ];

  const handleCustomFeatures = () => {
    const subject = encodeURIComponent("Tezaoro Custom Features Request");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI am interested in discussing custom features for my trading needs.\n\nPlease contact me to discuss how Tezaoro can be customized for my requirements.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };
  
  const handleCustomAlgorithms = () => {
    const subject = encodeURIComponent("Tezaoro Custom Algorithms Inquiry");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI am interested in discussing custom algorithmic solutions for my specific trading requirements.\n\nPlease contact me to explore how your team of quants and machine learning engineers can develop algorithms tailored to my needs.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout title="Features">
      <PageHeader 
        title="Platform Features" 
        description="Discover the powerful capabilities that make Tezaoro the leading choice for algorithmic trading"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="algorithms" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card">
                {featureCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {featureCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <h2 className="text-3xl font-bold text-center mb-16">
                  <span className="text-gradient">{category.name}</span> Features
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.features.map((feature, index) => (
                    <Card key={index} className="glass-card bg-card p-8">
                      <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Customized to Your <span className="text-gradient">Trading Style</span></h2>
            <p className="text-lg text-muted-foreground mb-8">
              Tezaoro is designed to adapt to your unique trading requirements. Whether you're a day trader, swing trader, or long-term investor, our platform can be tailored to match your specific strategies and goals.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Contact our team to discuss how we can customize Tezaoro to meet your trading needs.
            </p>
            <Button onClick={handleCustomFeatures} className="bg-primary hover:bg-primary/90">
              Request Custom Features
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Custom <span className="text-gradient">Algorithm Development</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            Need a specialized algorithm for your unique trading requirements? Our team of quants and machine learning engineers can develop custom algorithms tailored to your specific needs.
          </p>
          <Button onClick={handleCustomAlgorithms} className="bg-primary hover:bg-primary/90">
            Inquire About Custom Algorithms
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Features;
