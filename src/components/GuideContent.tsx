
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
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          {category && (
            <Badge variant="default" className="mb-4">{category}</Badge>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          
          {description && (
            <p className="text-xl text-muted-foreground mb-6">{description}</p>
          )}
          
          {(author || date || readTime) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
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
        
        <Card className="glass-card bg-card p-8">
          {content ? (
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            children
          )}
        </Card>
      </div>
    </div>
  );
};

export default GuideContent;
