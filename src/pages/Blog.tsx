
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import BlogPostCard from '@/components/blog/BlogPostCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import SearchBar from '@/components/blog/SearchBar';
import { publishedPosts, categories } from '@/data/blogPosts';

const Blog = () => {
  return (
    <PageLayout title="Blog">
      <PageHeader 
        title="Tezaoro Blog" 
        description="Insights, trends, and strategies in algorithmic trading"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
          
          <CategoryFilter categories={categories} />
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Published <span className="text-gradient">Articles</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  {...post}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSignup />
    </PageLayout>
  );
};

export default Blog;
