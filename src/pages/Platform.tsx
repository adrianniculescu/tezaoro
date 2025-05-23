
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Platform = () => {
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
  
  return (
    <PageLayout title="Platform">
      <PageHeader 
        title="Tezaoro Platform" 
        description="Everything you need to know about using our advanced algorithmic trading platform"
      />
      
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Need <span className="text-gradient">Help?</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is available to assist you with any questions about the Tezaoro platform.
            Feel free to reach out for personalized guidance.
          </p>
          <Button 
            onClick={() => {
              const subject = encodeURIComponent("Tezaoro Platform Support Request");
              const body = encodeURIComponent(
                "Hello Tezaoro team,\n\nI need assistance with the platform.\n\nMy question/issue is:\n\n\nThank you!"
              );
              window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Contact Support
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Platform;
