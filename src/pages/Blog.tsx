
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogPostCard = ({ 
  title, excerpt, date, author, readTime, category, image 
}: BlogPostCardProps) => (
  <Card className="glass-card bg-card overflow-hidden">
    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
      <div className="text-center text-muted-foreground p-8">Blog Post Featured Image</div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <Badge variant="secondary">{category}</Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{date}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-4">{excerpt}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-3 w-3 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">{author}</span>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
          <span>Read more</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

const Blog = () => {
  const featuredPosts = [
    {
      title: "The Future of Algorithmic Trading: AI and Beyond",
      excerpt: "Explore how artificial intelligence is revolutionizing algorithmic trading strategies and what the future holds for automated trading systems.",
      date: "June 10, 2024",
      author: "Alex Chen",
      readTime: "8 min read",
      category: "Industry Trends",
      image: "/images/blog/ai-trading.jpg"
    },
    {
      title: "Understanding Risk Management in Algorithmic Trading",
      excerpt: "A comprehensive guide to implementing effective risk management strategies in your algorithmic trading operations.",
      date: "June 2, 2024",
      author: "Maria Rodriguez",
      readTime: "12 min read",
      category: "Risk Management",
      image: "/images/blog/risk-management.jpg"
    },
    {
      title: "Backtesting Strategies: Common Pitfalls to Avoid",
      excerpt: "Learn how to properly backtest your trading algorithms and avoid the mistakes that can lead to misleading performance results.",
      date: "May 25, 2024",
      author: "James Wilson",
      readTime: "10 min read",
      category: "Strategy Development",
      image: "/images/blog/backtesting.jpg"
    }
  ];
  
  const recentPosts = [
    {
      title: "Crypto Algorithmic Trading: Opportunities and Challenges",
      excerpt: "An in-depth look at the unique considerations when developing trading algorithms for cryptocurrency markets.",
      date: "May 18, 2024",
      author: "Sarah Johnson",
      readTime: "9 min read",
      category: "Crypto",
      image: "/images/blog/crypto-trading.jpg"
    },
    {
      title: "How to Choose the Right Trading Algorithm for Your Goals",
      excerpt: "A practical guide to selecting and customizing algorithms based on your trading objectives, risk tolerance, and timeline.",
      date: "May 12, 2024",
      author: "David Park",
      readTime: "7 min read",
      category: "Getting Started",
      image: "/images/blog/algorithm-selection.jpg"
    },
    {
      title: "The Psychology of Algorithmic Trading: Removing Emotion from Trading",
      excerpt: "How algorithmic trading helps overcome common psychological biases that affect traditional trading approaches.",
      date: "May 5, 2024",
      author: "Emma Roberts",
      readTime: "11 min read",
      category: "Trading Psychology",
      image: "/images/blog/trading-psychology.jpg"
    },
    {
      title: "Machine Learning Models for Market Prediction",
      excerpt: "Exploring different machine learning techniques and their effectiveness in predicting market movements.",
      date: "April 28, 2024",
      author: "Michael Chen",
      readTime: "14 min read",
      category: "Machine Learning",
      image: "/images/blog/ml-prediction.jpg"
    },
    {
      title: "Regulatory Landscape for Algorithmic Trading in 2024",
      excerpt: "An overview of current and upcoming regulations affecting algorithmic trading across different jurisdictions.",
      date: "April 20, 2024",
      author: "Jennifer Kim",
      readTime: "10 min read",
      category: "Regulation",
      image: "/images/blog/regulations.jpg"
    },
    {
      title: "High-Frequency Trading vs. Quantitative Strategies",
      excerpt: "Comparing two different approaches to algorithmic trading and helping you decide which suits your resources and goals.",
      date: "April 15, 2024",
      author: "Thomas Brown",
      readTime: "8 min read",
      category: "Strategy Comparison",
      image: "/images/blog/hft-quant.jpg"
    }
  ];
  
  const categories = [
    "All Categories",
    "Industry Trends",
    "Risk Management",
    "Strategy Development",
    "Crypto",
    "Getting Started",
    "Machine Learning",
    "Regulation",
    "Trading Psychology"
  ];

  return (
    <PageLayout title="Blog">
      <PageHeader 
        title="Tezaoro Blog" 
        description="Insights, trends, and strategies in algorithmic trading"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-10 bg-card" 
                placeholder="Search articles..." 
                disabled={true}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category, index) => (
              <Badge 
                key={index} 
                variant={index === 0 ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 disabled:opacity-70"
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured <span className="text-gradient">Posts</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Recent <span className="text-gradient">Articles</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" disabled={true}>
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Stay <span className="text-gradient">Informed</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our blog is currently under development and will be available when Tezaoro launches.
            Subscribe to our newsletter to receive articles and insights on algorithmic trading.
          </p>
          <div className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md cursor-not-allowed opacity-70">
            Subscribe to Newsletter (Coming Soon)
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
