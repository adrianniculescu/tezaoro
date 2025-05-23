
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface GuideContentProps {
  title: string;
  children: React.ReactNode;
}

const GuideContent = ({ title, children }: GuideContentProps) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/platform">
        <Button variant="ghost" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Button>
      </Link>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-full">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      
      <Card className="glass-card bg-card p-8">
        {children}
      </Card>
    </div>
  );
};

export default GuideContent;
