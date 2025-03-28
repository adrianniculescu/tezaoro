
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, Mail, FileQuestion, Headphones, Clock, Users, UserCheck,
  Book, BookOpen, PlayCircle, LifeBuoy, ArrowRight, Search
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SupportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SupportCard = ({ title, description, icon }: SupportCardProps) => (
  <Card className="glass-card bg-card p-6 flex flex-col">
    <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

const Support = () => {
  const supportChannels = [
    {
      title: "Help Center",
      description: "Browse articles and tutorials to find quick answers to common questions.",
      icon: <FileQuestion className="h-6 w-6 text-primary" />
    },
    {
      title: "Email Support",
      description: "Get personalized help from our support team within 24 hours.",
      icon: <Mail className="h-6 w-6 text-primary" />
    },
    {
      title: "Live Chat",
      description: "Available for Professional and Enterprise customers during business hours.",
      icon: <MessageSquare className="h-6 w-6 text-primary" />
    },
    {
      title: "Dedicated Support",
      description: "Enterprise customers enjoy priority support with a dedicated account manager.",
      icon: <UserCheck className="h-6 w-6 text-primary" />
    }
  ];
  
  const resourceLinks = [
    {
      title: "Documentation",
      description: "In-depth platform guides and API references",
      icon: <Book className="h-6 w-6 text-primary" />
    },
    {
      title: "Knowledge Base",
      description: "Articles and tutorials for self-service support",
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step visual guides to platform features",
      icon: <PlayCircle className="h-6 w-6 text-primary" />
    },
    {
      title: "Community Forum",
      description: "Connect with other users to share tips and solutions",
      icon: <Users className="h-6 w-6 text-primary" />
    }
  ];
  
  const faqs = [
    {
      question: "When will Tezaoro launch?",
      answer: "Tezaoro is currently in MVP testing phase. We expect to launch to the public in the next few months. Join our waitlist to be notified when we launch and potentially get early access."
    },
    {
      question: "How do I get started with algorithmic trading?",
      answer: "Once Tezaoro launches, you'll be able to sign up, select a subscription plan, and deploy your first algorithm within minutes. Our platform is designed to be user-friendly, even for those new to algorithmic trading. We'll provide comprehensive onboarding resources and tutorials."
    },
    {
      question: "Do I need programming knowledge to use Tezaoro?",
      answer: "No, our platform is designed for all users, regardless of technical background. You can use our pre-built algorithms without any coding knowledge. For advanced users, we'll offer options to customize strategies with code."
    },
    {
      question: "What markets can I trade with Tezaoro?",
      answer: "Tezaoro will support trading in cryptocurrency markets initially, with plans to expand to forex and equities in future updates. Our algorithms are designed to work across multiple markets and asset classes."
    },
    {
      question: "How does billing work?",
      answer: "When we launch, we'll offer monthly and annual subscription plans. All plans will include a 14-day free trial, and you can upgrade, downgrade, or cancel at any time. We'll never charge you without explicit authorization."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we implement bank-level security protocols to protect your data. We use encryption for all sensitive information, regular security audits, and strict access controls. We never share your trading data with third parties."
    },
    {
      question: "Can I use Tezaoro on my mobile device?",
      answer: "Yes, Tezaoro is being designed with a responsive interface that works on desktops, tablets, and mobile phones. You'll be able to monitor your algorithms and performance from anywhere."
    },
    {
      question: "What kind of performance can I expect?",
      answer: "Performance varies based on market conditions, the algorithms you select, and your risk parameters. Our historical backtests show competitive returns, but past performance is not indicative of future results. All trading involves risk."
    }
  ];

  return (
    <PageLayout title="Support">
      <PageHeader 
        title="Support & Help Center" 
        description="Get the assistance you need to succeed with Tezaoro"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="glass-card bg-card p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">How can we help you today?</h2>
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-10 bg-background/50" 
                  placeholder="Search for help articles..." 
                  disabled={true}
                />
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                  <FileQuestion className="h-4 w-4" />
                  <span>Platform Guides</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                  <Book className="h-4 w-4" />
                  <span>Algorithm Docs</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                  <PlayCircle className="h-4 w-4" />
                  <span>Video Tutorials</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2" disabled={true}>
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Support <span className="text-gradient">Channels</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportChannels.map((channel, index) => (
                <SupportCard
                  key={index}
                  title={channel.title}
                  description={channel.description}
                  icon={channel.icon}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Support <span className="text-gradient">Resources</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {resourceLinks.map((resource, index) => (
                <Card key={index} className="glass-card bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      {resource.icon}
                    </div>
                    <h3 className="text-lg font-bold">{resource.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{resource.description}</p>
                  <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked <span className="text-gradient">Questions</span></h2>
            
            <Card className="glass-card bg-card p-8 max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Contact <span className="text-gradient">Us</span></h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input id="name" placeholder="Your name" disabled={true} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Your email" disabled={true} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="What is your message about?" disabled={true} />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" placeholder="How can we help you?" rows={6} disabled={true} />
                    </div>
                    
                    <Button className="w-full" disabled={true}>Send Message</Button>
                  </div>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="glass-card bg-card p-8">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-medium">Email</h4>
                        <p className="text-muted-foreground">support@tezaoro.com</p>
                        <p className="text-xs text-muted-foreground">(Available after launch)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Headphones className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-medium">Support Hours</h4>
                        <p className="text-muted-foreground">Monday - Friday</p>
                        <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-base font-medium">Response Time</h4>
                        <p className="text-muted-foreground">Standard: Within 24 hours</p>
                        <p className="text-muted-foreground">Priority: Within 4 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <LifeBuoy className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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
        </div>
      </section>
    </PageLayout>
  );
};

export default Support;
