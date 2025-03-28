
import React from 'react';
import { 
  Cpu, BarChart2, Zap, TrendingUp, Shield, Clock, 
  Globe, LineChart, Bot, Users, LucideIcon
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureProps) => (
  <div className="bg-card glass-card rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "AI-Powered Algorithms",
      description: "Our machine learning models analyze thousands of data points to make smart trading decisions."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description: "Comprehensive performance metrics and real-time dashboards to monitor your investments."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "High-Frequency Trading",
      description: "Execute trades with microsecond precision to capitalize on market inefficiencies."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Trend Analysis",
      description: "Identify and follow market trends with sophisticated pattern recognition."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Risk Management",
      description: "Built-in safeguards to protect your capital during volatile market conditions."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "24/7 Trading",
      description: "Our algorithms never sleep, constantly looking for optimal trading opportunities."
    },
    {
      icon: <Bot className="h-6 w-6 text-primary" />,
      title: "Automated Strategies",
      description: "Set your trading parameters once and let our bots execute your strategy automatically."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Multi-Market Access",
      description: "Trade across crypto, forex, and equities markets from a single platform."
    },
  ];
  
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-radial from-tezaoro-900/20 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Cutting Edge of <span className="text-gradient">Algorithmic Trading</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our technology combines advanced mathematical models with machine learning to give you a trading advantage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
