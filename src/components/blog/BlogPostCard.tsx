
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';

const BlogPostCard = ({ 
  title, excerpt, date, author, readTime, category, image, slug, isPublished = false 
}: BlogPost) => (
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

export default BlogPostCard;
