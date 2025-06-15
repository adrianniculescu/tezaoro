import React from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import BlogPostSchema from '@/components/seo/BlogPostSchema';
import PostHeader from '@/components/blog/TezaoroDexAggregatorReview/PostHeader';
import PostContent from '@/components/blog/TezaoroDexAggregatorReview/PostContent';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';

const TezaoroDexAggregatorReview = () => {
  const postData = {
    title: "Tezaoro DEX Aggregator Review: Optimizing DeFi Trading Across 80+ Markets",
    description: "Advanced algorithmic trading infrastructure with quantum-resistant routing, MEV-protected swaps, and gasless trading.",
    author: "Tezaoro Team",
    publishedDate: "2025-01-24T10:00:00Z",
    modifiedDate: "2025-01-24T10:00:00Z",
    url: "https://tezaoro.com/blog/tezaoro-dex-aggregator-review",
    imageUrl: "https://tezaoro.com/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png",
    readingTime: "10 min",
    category: "Product Review",
    keywords: ["DEX aggregator", "DeFi trading", "quantum-resistant routing", "MEV protection", "gasless trading"]
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tezaoro DEX Aggregator Review' },
  ];

  return (
    <PageLayout title="Tezaoro DEX Aggregator Review">
      <BlogPostSchema {...postData} />
      <Helmet>
        <title>Tezaoro DEX Aggregator Review: Optimizing DeFi Trading Across 80+ Markets | Tezaoro</title>
        <meta name="description" content="Advanced algorithmic trading infrastructure with quantum-resistant routing, MEV-protected swaps, and gasless trading." />
        <meta name="keywords" content="DEX aggregator, DeFi trading, quantum-resistant routing, MEV protection, gasless trading" />
        <link rel="canonical" href="https://tezaoro.com/blog/tezaoro-dex-aggregator-review" />
      </Helmet>

      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <BreadcrumbNavigation items={breadcrumbItems} />
          <PostHeader />
          <PostContent />
        </div>
      </article>
    </PageLayout>
  );
};

export default TezaoroDexAggregatorReview;
