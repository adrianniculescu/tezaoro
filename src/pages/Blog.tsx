import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  slug?: string;
  isPublished?: boolean;
}

const BlogPostCard = ({ 
  title, excerpt, date, author, readTime, category, image, slug, isPublished = false 
}: BlogPostCardProps) => (
  <Card className="glass-card bg-card overflow-hidden">
    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
      {isPublished ? (
        <img 
          src="/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png" 
          alt="Tezaoro Blog Post"
          className="max-w-xs h-auto"
        />
      ) : (
        <div className="text-center text-muted-foreground p-8">Blog Post Featured Image</div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <Badge variant={isPublished ? "default" : "secondary"}>{category}</Badge>
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
        
        {isPublished && slug ? (
          <Link to={slug}>
            <Button variant="link" className="p-0 h-auto flex items-center gap-1">
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button variant="link" className="p-0 h-auto flex items-center gap-1" disabled={true}>
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  </Card>
);

const Blog = () => {
  const publishedPosts = [
    {
      title: "Unlocking Liquidity and Growth: How Nano-Cap Crypto Projects Can Thrive with Tezaoro",
      excerpt: "Discover how nano-cap crypto projects ($1M-$10M market cap) can overcome liquidity challenges with specialized market making and tokenomics consulting services.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "8 min read",
      category: "Crypto Growth",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/nano-cap-crypto-liquidity-growth",
      isPublished: true
    },
    {
      title: "How to Choose an Algorithmic Trading Platform: Expert Guide",
      excerpt: "Discover the essential factors to consider when selecting the perfect algorithmic trading platform for your trading goals and experience level.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "12 min read",
      category: "Expert Guide",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/choose-algorithmic-trading-platform",
      isPublished: true
    },
    {
      title: "Top Algorithmic Trading Strategies for Cryptocurrency",
      excerpt: "Explore the most effective crypto algorithmic trading strategies including mean reversion, momentum trading, arbitrage, and more.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "10 min read",
      category: "Crypto Strategies",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/top-crypto-algorithmic-trading-strategies",
      isPublished: true
    },
    {
      title: "Risk Management in Algorithmic Trading: Essential Strategies",
      excerpt: "Master the essential risk management techniques to protect your capital and trade with confidence in algorithmic trading.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "8 min read",
      category: "Risk Management",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/risk-management-algorithmic-trading",
      isPublished: true
    },
    {
      title: "Backtesting 101: How to Validate Your Trading Algorithm",
      excerpt: "Learn how to backtest trading algorithms effectively. Avoid overfitting and ensure your strategy works in real markets.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "8 min read",
      category: "Strategy Testing",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/backtesting-trading-algorithm",
      isPublished: true
    },
    {
      title: "Algorithmic Trading vs. Manual Trading: Pros, Cons, and Use Cases",
      excerpt: "Compare algorithmic and manual trading. Discover the benefits and best scenarios for each approach.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "7 min read",
      category: "Trading Comparison",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/algorithmic-vs-manual-trading",
      isPublished: true
    },
    {
      title: "Building Your First Trading Bot Without Coding Skills",
      excerpt: "Create your first crypto trading bot with no coding experience. Step-by-step guide using intuitive platforms.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "9 min read",
      category: "Getting Started",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/building-first-trading-bot",
      isPublished: true
    },
    {
      title: "Access Institutional Trading Algorithms as a Retail Investor",
      excerpt: "Discover how retail traders can use institutional-grade algorithms with advanced trading tools.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "6 min read",
      category: "Professional Tools",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/institutional-trading-algorithms",
      isPublished: true
    },
    {
      title: "How AI Is Transforming Algorithmic Trading",
      excerpt: "Explore AI's impact on trading algorithms, from predictive analytics to sentiment analysis.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "8 min read",
      category: "AI & Technology",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/ai-algorithmic-trading",
      isPublished: true
    },
    {
      title: "How to Reduce Slippage in Algorithmic Trading",
      excerpt: "Minimize slippage and improve trade execution with smart order routing and liquidity analysis.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "7 min read",
      category: "Trade Execution",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/reduce-slippage-trading",
      isPublished: true
    },
    {
      title: "Algorithmic Trading Regulations: A Compliance Guide",
      excerpt: "Stay compliant with global algo trading regulations. Learn best practices for KYC, reporting, and audits.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "9 min read",
      category: "Compliance",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/trading-regulations-compliance",
      isPublished: true
    },
    {
      title: "Scalping vs. Swing Trading: Algorithmic Strategies Compared",
      excerpt: "Compare scalping and swing trading algorithms. Learn which approach suits your risk tolerance and goals.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "8 min read",
      category: "Strategy Comparison",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/scalping-vs-swing-trading",
      isPublished: true
    },
    {
      title: "The Future of Algorithmic Trading: Emerging Technologies",
      excerpt: "Explore next-gen trends in algorithmic trading, from quantum computing to decentralized AI models.",
      date: "January 2025",
      author: "Tezaoro Team",
      readTime: "10 min read",
      category: "Future Tech",
      image: "/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
      slug: "/guide/future-algorithmic-trading",
      isPublished: true
    }
  ];

  const upcomingPosts = [
    {
      title: "Advanced Portfolio Optimization Techniques",
      excerpt: "Learn sophisticated portfolio management strategies used by institutional traders and how to apply them to your algorithmic trading.",
      date: "Coming Soon",
      author: "Alex Chen",
      readTime: "11 min read",
      category: "Portfolio Management",
      image: "/images/blog/portfolio-optimization.jpg"
    },
    {
      title: "Cross-Exchange Arbitrage: Capturing Price Differences",
      excerpt: "Master the art of arbitrage trading across multiple exchanges to capture risk-free profits in volatile markets.",
      date: "Coming Soon",
      author: "Maria Rodriguez",
      readTime: "9 min read",
      category: "Arbitrage",
      image: "/images/blog/arbitrage.jpg"
    },
    {
      title: "Market Making Strategies for Crypto Traders",
      excerpt: "Understand how market making works and how you can provide liquidity while earning consistent profits.",
      date: "Coming Soon",
      author: "James Wilson",
      readTime: "12 min read",
      category: "Market Making",
      image: "/images/blog/market-making.jpg"
    }
  ];
  
  const categories = [
    "All Categories",
    "Crypto Growth",
    "Expert Guide",
    "Crypto Strategies", 
    "Risk Management",
    "Strategy Testing",
    "Trading Comparison",
    "Getting Started",
    "Professional Tools",
    "AI & Technology",
    "Trade Execution",
    "Compliance",
    "Strategy Comparison",
    "Future Tech"
  ];

  const handleNewsletterSignup = () => {
    const subject = encodeURIComponent("Tezaoro Newsletter Subscription");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI would like to subscribe to your newsletter for the latest updates and insights on algorithmic trading.\n\nPlease add me to your mailing list.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

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
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Published <span className="text-gradient">Articles</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                  slug={post.slug}
                  isPublished={post.isPublished}
                />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Coming <span className="text-gradient">Soon</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingPosts.map((post, index) => (
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
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Stay <span className="text-gradient">Informed</span></h2>
          <p className="text-lg text-muted-foreground mb-8">
            Subscribe to our newsletter to receive the latest articles and insights on algorithmic trading.
          </p>
          <Button onClick={handleNewsletterSignup} className="bg-primary hover:bg-primary/90">
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
