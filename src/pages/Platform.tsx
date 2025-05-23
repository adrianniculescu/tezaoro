
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { FileText, ArrowRight, Check, X, Video, Users, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Platform = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  
  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive"
      });
      return;
    }
    
    const mailtoSubject = encodeURIComponent(`Tezaoro Contact: ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    
    window.location.href = `mailto:office@tezaoro.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    
    toast({
      title: "Email client opened",
      description: "Your message has been prepared to send to our team.",
    });
  };
  
  const guides = [
    {
      title: "Platform Overview",
      description: "Get familiar with the Tezaoro platform interface and key features.",
      url: "/platform/platform-overview"
    },
    {
      title: "Account Setup",
      description: "Learn how to set up your account, security settings, and preferences.",
      url: "/platform/account-setup"
    },
    {
      title: "Deploying Your First Algorithm",
      description: "A step-by-step guide to selecting and deploying your first trading algorithm.",
      url: "/platform/deploying-first-algorithm"
    }
  ];
  
  const algorithmDocs = [
    {
      title: "Algorithm Selection Guide",
      description: "How to choose the right algorithm for your trading strategy.",
      url: "/algorithms"
    },
    {
      title: "Parameter Configuration",
      description: "Understand and configure algorithm parameters for optimal performance.",
      url: "/algorithms"
    },
    {
      title: "Backtesting Guide",
      description: "Test your algorithms against historical market data.",
      url: "/algorithms"
    }
  ];
  
  const pricingTiers = [
    {
      title: "Starter",
      price: "$99",
      period: "/month",
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
      action: () => {
        const subject = encodeURIComponent("Tezaoro Waitlist - Starter Plan");
        const body = encodeURIComponent(
          "Hello Tezaoro team,\n\nI would like to join the waitlist for the Starter plan.\n\nThank you!"
        );
        window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
      }
    },
    {
      title: "Professional",
      price: "$299",
      period: "/month",
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
      recommended: true,
      action: () => {
        const subject = encodeURIComponent("Tezaoro Waitlist - Professional Plan");
        const body = encodeURIComponent(
          "Hello Tezaoro team,\n\nI would like to join the waitlist for the Professional plan.\n\nThank you!"
        );
        window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
      }
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
      action: () => {
        const subject = encodeURIComponent("Tezaoro Enterprise Solutions Inquiry");
        const body = encodeURIComponent(
          "Hello Tezaoro team,\n\nI'm interested in learning more about your Enterprise solutions.\n\nPlease provide information about pricing and features for our organization.\n\nThank you!"
        );
        window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
      }
    }
  ];
  
  return (
    <PageLayout title="Platform">
      <PageHeader 
        title="Tezaoro Platform" 
        description="Everything you need to know about using our advanced algorithmic trading platform"
      />
      
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            How can we <span className="text-gradient">help you</span> today?
          </h2>
          
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <Input 
              type="search" 
              id="default-search" 
              className="block w-full p-4 pl-10 text-sm bg-card border border-border rounded-lg focus:ring-primary focus:border-primary" 
              placeholder="Search for help articles..." 
              disabled={true}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/platform" className="no-underline">
              <Card className="glass-card bg-card p-5 h-full flex flex-col items-center justify-center text-center gap-3 hover:bg-card/80 transition-colors cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Platform Guides</h3>
              </Card>
            </Link>
            
            <Link to="/algorithms" className="no-underline">
              <Card className="glass-card bg-card p-5 h-full flex flex-col items-center justify-center text-center gap-3 hover:bg-card/80 transition-colors cursor-pointer">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Algorithm Docs</h3>
              </Card>
            </Link>
            
            <Card className="glass-card bg-card p-5 h-full flex flex-col items-center justify-center text-center gap-3 opacity-75">
              <div className="p-3 bg-primary/10 rounded-full">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Video Tutorials</h3>
              <Badge variant="outline" className="mt-1">Coming Soon</Badge>
            </Card>
            
            <Card className="glass-card bg-card p-5 h-full flex flex-col items-center justify-center text-center gap-3 opacity-75">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Community</h3>
              <Badge variant="outline" className="mt-1">Coming Soon</Badge>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Getting <span className="text-gradient">Started</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="glass-card bg-card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{guide.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {guide.description}
                </p>
                
                <Link to={guide.url}>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Read guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Algorithm <span className="text-gradient">Documentation</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {algorithmDocs.map((doc, index) => (
              <Card key={index} className="glass-card bg-card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Book className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{doc.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {doc.description}
                </p>
                
                <Link to={doc.url}>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Read documentation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pricing <span className="text-gradient">Plans</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`glass-card bg-card p-8 border ${tier.recommended ? 'border-primary' : 'border-border'} relative`}
              >
                {tier.recommended && (
                  <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary">
                    Recommended
                  </Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
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
                  className={`w-full ${tier.recommended ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={tier.recommended ? 'default' : 'outline'}
                  onClick={tier.action}
                >
                  {tier.buttonText}
                </Button>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground">
              All plans will include a 14-day free trial once we launch. No credit card required.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Contact <span className="text-gradient">Us</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="glass-card bg-card p-8">
                <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject" 
                      placeholder="What is your message about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="glass-card bg-card p-8">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect width="20" height="16" x="2" y="4" rx="2" strokeWidth="2" strokeLinejoin="round" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <h4 className="text-base font-medium">Email</h4>
                      <p className="text-muted-foreground">office@tezaoro.com</p>
                      <p className="text-xs text-muted-foreground">(Available after launch)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h4 className="text-base font-medium">Support Hours</h4>
                      <p className="text-muted-foreground">Monday - Friday</p>
                      <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h4 className="text-base font-medium">Response Time</h4>
                      <p className="text-muted-foreground">Standard: Within 24 hours</p>
                      <p className="text-muted-foreground">Priority: Within 4 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-primary shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M12 8v8m-4-4h8" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div>
                      <h4 className="text-base font-medium">Emergency Support</h4>
                      <p className="text-muted-foreground">Available for Enterprise customers</p>
                      <p className="text-muted-foreground">24/7 critical issue resolution</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Platform;
