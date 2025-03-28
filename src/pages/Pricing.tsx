
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const Pricing = () => {
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
  
  const compareFeatures = [
    { feature: "Available Algorithms", starter: "3", professional: "12+", enterprise: "All + Exclusive" },
    { feature: "Trading Signals", starter: "Daily", professional: "Real-time", enterprise: "Real-time" },
    { feature: "Backtesting", starter: "Basic", professional: "Advanced", enterprise: "Institutional-grade" },
    { feature: "Performance Analytics", starter: "Basic", professional: "Advanced", enterprise: "Comprehensive" },
    { feature: "Strategy Customization", starter: "Limited", professional: "Advanced", enterprise: "Unlimited" },
    { feature: "Risk Management Tools", starter: "Basic", professional: "Advanced", enterprise: "Enterprise-grade" },
    { feature: "API Access", starter: "No", professional: "No", enterprise: "Yes" },
    { feature: "Support", starter: "Email", professional: "Priority Email & Chat", enterprise: "Dedicated Manager" },
    { feature: "Custom Algorithm Development", starter: "No", professional: "Yes (Additional Fee)", enterprise: "Yes (Included)" },
    { feature: "Concurrent Strategies", starter: "Up to 3", professional: "Up to 10", enterprise: "Unlimited" },
  ];
  
  return (
    <PageLayout title="Pricing">
      <PageHeader 
        title="Simple, Transparent Pricing" 
        description="Choose the plan that fits your trading strategy and goals"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-200 max-w-3xl mx-auto mb-16">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Tezaoro is currently in testing mode. The platform is not yet open for customers. 
              Join our waitlist to be notified when we launch.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
          
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Detailed Feature Comparison</h3>
            <Card className="glass-card bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Feature</TableHead>
                      <TableHead>Starter</TableHead>
                      <TableHead>Professional</TableHead>
                      <TableHead>Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compareFeatures.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.feature}</TableCell>
                        <TableCell>{item.starter}</TableCell>
                        <TableCell>{item.professional}</TableCell>
                        <TableCell>{item.enterprise}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              All plans will include a 14-day free trial once we launch. No credit card required.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked <span className="text-gradient">Questions</span></h2>
          
          <div className="space-y-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">When will Tezaoro launch?</h3>
              <p className="text-muted-foreground">
                We're currently in the MVP testing phase. We expect to launch publicly within the next few months. 
                Join our waitlist to be the first to know and get early access.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">
                Yes, you'll be able to upgrade or downgrade your subscription at any time. 
                When upgrading, you'll gain immediate access to the additional features. 
                When downgrading, changes will take effect at the end of your billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a contract or commitment?</h3>
              <p className="text-muted-foreground">
                No, all plans are offered on a month-to-month basis with no long-term commitment. 
                You can cancel your subscription at any time.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you offer discounts for annual subscriptions?</h3>
              <p className="text-muted-foreground">
                Yes, we'll offer a 20% discount for annual subscriptions when we launch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pricing;
