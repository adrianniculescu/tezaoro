
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { 
  FileText, BookOpen, Video, Calendar, Download, ExternalLink, 
  Newspaper, GraduationCap, Target, Users 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  badgeText?: string;
}

const ResourceCard = ({ title, description, icon, link, badgeText }: ResourceCardProps) => (
  <Card className="glass-card bg-card p-6 flex flex-col h-full">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{title}</h3>
          {badgeText && <Badge variant="secondary" className="text-xs">{badgeText}</Badge>}
        </div>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>
    </div>
    <div className="mt-auto pt-4">
      <Button variant="outline" className="w-full flex items-center gap-2" disabled={true}>
        <ExternalLink className="h-4 w-4" />
        <span>Coming Soon</span>
      </Button>
    </div>
  </Card>
);

const Resources = () => {
  const educationalResources = [
    {
      title: "Algorithmic Trading Fundamentals",
      description: "Learn the basics of algorithmic trading, from strategy development to implementation.",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Beginner"
    },
    {
      title: "Advanced Strategy Development",
      description: "Dive deep into creating sophisticated trading strategies using statistical methods.",
      icon: <Target className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Advanced"
    },
    {
      title: "Market Analysis Techniques",
      description: "Master technical analysis, fundamental analysis, and quantitative methods.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "#",
    },
    {
      title: "Risk Management Masterclass",
      description: "Learn essential risk management principles to protect your trading capital.",
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      link: "#",
    },
  ];
  
  const videoTutorials = [
    {
      title: "Tezaoro Platform Tutorial",
      description: "A comprehensive walkthrough of the Tezaoro platform and its features.",
      icon: <Video className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "30 min"
    },
    {
      title: "Algorithm Selection Guide",
      description: "How to choose the right algorithms for your trading objectives and risk tolerance.",
      icon: <Video className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "15 min"
    },
    {
      title: "Performance Analytics Explained",
      description: "Understanding the performance metrics and how to interpret them.",
      icon: <Video className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "20 min"
    },
  ];
  
  const marketResearch = [
    {
      title: "Crypto Market Outlook Q2 2024",
      description: "Analysis of cryptocurrency market trends, opportunities, and risks for Q2 2024.",
      icon: <Newspaper className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Latest"
    },
    {
      title: "Systematic Trading in Volatile Markets",
      description: "Strategies for algorithmic trading during periods of high market volatility.",
      icon: <Newspaper className="h-6 w-6 text-primary" />,
      link: "#",
    },
    {
      title: "The Impact of AI on Financial Markets",
      description: "Research paper on how artificial intelligence is transforming trading and investing.",
      icon: <Newspaper className="h-6 w-6 text-primary" />,
      link: "#",
    },
  ];
  
  const downloadableResources = [
    {
      title: "Tezaoro Strategy Backtest Template",
      description: "Excel template for analyzing historical performance of trading strategies.",
      icon: <Download className="h-6 w-6 text-primary" />,
      link: "#",
    },
    {
      title: "Risk Management Calculation Tool",
      description: "Spreadsheet for calculating position sizes and risk parameters for your trades.",
      icon: <Download className="h-6 w-6 text-primary" />,
      link: "#",
    },
    {
      title: "Algorithm Performance Comparison Tool",
      description: "Interactive tool to compare different algorithmic strategies across various metrics.",
      icon: <Download className="h-6 w-6 text-primary" />,
      link: "#",
    },
  ];
  
  const upcomingEvents = [
    {
      title: "Webinar: Future of Algorithmic Trading",
      description: "Join our panel of experts discussing the evolving landscape of algorithmic trading.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Jul 15, 2024"
    },
    {
      title: "Workshop: Building Your First Trading Algorithm",
      description: "Hands-on workshop for developing and testing your own trading algorithm.",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Aug 2, 2024"
    },
    {
      title: "Tezaoro User Meetup",
      description: "Connect with other Tezaoro users to share insights and trading strategies.",
      icon: <Users className="h-6 w-6 text-primary" />,
      link: "#",
      badgeText: "Sep 10, 2024"
    },
  ];

  return (
    <PageLayout title="Resources">
      <PageHeader 
        title="Learning Resources" 
        description="Educational content, guides, and tools to help you succeed with algorithmic trading"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Educational <span className="text-gradient">Content</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {educationalResources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                link={resource.link}
                badgeText={resource.badgeText}
              />
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Video <span className="text-gradient">Tutorials</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {videoTutorials.map((video, index) => (
              <ResourceCard
                key={index}
                title={video.title}
                description={video.description}
                icon={video.icon}
                link={video.link}
                badgeText={video.badgeText}
              />
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Market <span className="text-gradient">Research</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {marketResearch.map((research, index) => (
              <ResourceCard
                key={index}
                title={research.title}
                description={research.description}
                icon={research.icon}
                link={research.link}
                badgeText={research.badgeText}
              />
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Downloadable <span className="text-gradient">Tools</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {downloadableResources.map((tool, index) => (
              <ResourceCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                link={tool.link}
              />
            ))}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Upcoming <span className="text-gradient">Events</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <ResourceCard
                key={index}
                title={event.title}
                description={event.description}
                icon={event.icon}
                link={event.link}
                badgeText={event.badgeText}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Resource <span className="text-gradient">Library</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our full resource library is under development and will be available when Tezaoro launches. 
            Join our waitlist to get access to exclusive educational content before the public launch.
          </p>
          <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
            Join Waitlist for Early Access (Coming Soon)
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Resources;
