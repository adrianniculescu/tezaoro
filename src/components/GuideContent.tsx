
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface GuideContentProps {
  title: string;
  description?: string;
  author?: string;
  date?: string;
  readTime?: string;
  category?: string;
  content?: string;
  children?: React.ReactNode;
}

const GuideContent = ({ 
  title, 
  description, 
  author, 
  date, 
  readTime, 
  category, 
  content, 
  children 
}: GuideContentProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/blog">
        <Button variant="ghost" className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          {category && (
            <Badge variant="default" className="mb-6">{category}</Badge>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{title}</h1>
          
          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">{description}</p>
          )}
          
          {(author || date || readTime) && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground border-b border-border pb-8 mb-8">
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{author}</span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
              )}
              {readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <Card className="glass-card bg-card p-8 md:p-12">
          {content ? (
            <div 
              className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-12 prose-headings:leading-tight prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-li:mb-3 prose-li:leading-relaxed prose-ul:mb-8 prose-ol:mb-8 prose-blockquote:mb-8 prose-pre:mb-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="prose prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-headings:mb-6 prose-headings:mt-12 prose-headings:leading-tight prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-li:mb-3 prose-li:leading-relaxed prose-ul:mb-8 prose-ol:mb-8 prose-blockquote:mb-8 prose-pre:mb-8">
              {children}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GuideContent;
