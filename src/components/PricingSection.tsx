
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: { text: string; available: boolean }[];
  buttonText: string;
  recommended?: boolean;
}

const PricingTier = ({ title, price, description, features, buttonText, recommended }: PricingTierProps) => (
  <Card className={`glass-card bg-card p-8 border ${recommended ? 'border-primary' : 'border-border'} relative`}>
    {recommended && (
      <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary">
        Recommended
      </Badge>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <div className="flex items-end gap-2 mb-4">
      <span className="text-4xl font-extrabold">{price}</span>
      {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
    </div>
    <p className="text-muted-foreground mb-6">{description}</p>
    
    <div className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          {feature.available ? (
            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
          ) : (
            <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          )}
          <span className={feature.available ? '' : 'text-muted-foreground'}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>
    
    <Button 
      className={`w-full ${recommended ? 'bg-primary hover:bg-primary/90' : ''}`}
      variant={recommended ? 'default' : 'outline'}
      disabled={true}
    >
      {buttonText}
    </Button>
  </Card>
);

const PricingSection = () => {
  const pricingTiers = [
    {
      title: "Starter",
      price: "$99",
      description: "Perfect for individual traders new to algorithmic trading.",
      features: [
        { text: "Access to 3 basic algorithms", available: true },
        { text: "Daily trading signals", available: true },
        { text: "Basic performance analytics", available: true },
        { text: "Email support", available: true },
        { text: "Custom algorithm deployment", available: false },
        { text: "Advanced risk management", available: false },
        { text: "API access", available: false },
      ],
      buttonText: "Join Waitlist",
      recommended: false
    },
    {
      title: "Professional",
      price: "$299",
      description: "For serious traders looking for advanced capabilities.",
      features: [
        { text: "Access to all 12+ algorithms", available: true },
        { text: "Real-time trading signals", available: true },
        { text: "Advanced analytics dashboard", available: true },
        { text: "Priority support", available: true },
        { text: "Custom algorithm deployment", available: true },
        { text: "Advanced risk management", available: true },
        { text: "API access", available: false },
      ],
      buttonText: "Join Waitlist",
      recommended: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for institutional investors and funds.",
      features: [
        { text: "Access to all algorithms + exclusives", available: true },
        { text: "Real-time trading signals", available: true },
        { text: "Institutional-grade analytics", available: true },
        { text: "Dedicated account manager", available: true },
        { text: "Custom algorithm development", available: true },
        { text: "Enterprise risk controls", available: true },
        { text: "Full API integration", available: true },
      ],
      buttonText: "Contact Sales",
      recommended: false
    }
  ];
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that fits your trading strategy and goals.
          </p>
          
          <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-200 max-w-3xl mx-auto mb-10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tezaoro is currently in testing mode. The platform is not yet open for customers. 
              Join our waitlist to be notified when we launch.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <PricingTier
              key={index}
              title={tier.title}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              buttonText={tier.buttonText}
              recommended={tier.recommended}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans will include a 14-day free trial once we launch. No credit card required.
          </p>
          <Button variant="link">View complete feature comparison</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
