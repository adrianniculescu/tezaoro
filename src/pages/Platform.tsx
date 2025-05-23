
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, Zap, Shield, LineChart, Users } from 'lucide-react';

const Platform = () => {
  const platformBenefits = [
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Comprehensive Solution",
      description: "Tezaoro provides a complete trading ecosystem, from market analysis to execution and reporting."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast Execution",
      description: "Our platform executes trades with sub-millisecond precision, capitalizing on even the briefest market opportunities."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols protect your data and trading activities at all times."
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Powerful data visualization and reporting tools give you unmatched insights into your trading performance."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Built for Collaboration",
      description: "Team workspaces enable efficient collaboration between traders, analysts, and portfolio managers."
    }
  ];

  const handleJoinWaitlist = () => {
    const subject = encodeURIComponent("Tezaoro Waitlist - Join Request");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI would like to join the waitlist for Tezaoro's AI-powered algorithmic trading platform.\n\nPlease let me know when access becomes available.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout title="Platform">
      <PageHeader 
        title="The Tezaoro Platform" 
        description="A powerful, AI-driven trading platform built for the modern trader"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Next-Generation <span className="text-gradient">Trading Technology</span></h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tezaoro combines cutting-edge AI algorithms with high-performance infrastructure to deliver a trading platform that gives you an edge in today's competitive markets.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform processes millions of data points in real-time, identifying patterns and opportunities that human traders might miss, while maintaining strict risk parameters to protect your capital.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a professional trader, fund manager, or financial institution, Tezaoro provides the tools and technology you need to achieve your trading goals.
              </p>
            </div>
            <div className="glass-card bg-card/50 rounded-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-xl font-medium text-center p-8">Platform Dashboard Preview<br />(Coming Soon)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Platform <span className="text-gradient">Benefits</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformBenefits.map((benefit, index) => (
              <Card key={index} className="glass-card p-8">
                <div className="p-4 bg-primary/10 rounded-full w-fit mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience <span className="text-gradient">Tezaoro</span>?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our platform is currently in MVP testing phase. Join our waitlist to be among the first to access Tezaoro when we launch.
          </p>
          <Button onClick={handleJoinWaitlist} className="bg-primary hover:bg-primary/90">
            Join Waitlist
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Platform;
