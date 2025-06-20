
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Clock, User, Calendar } from 'lucide-react';

const PostHeader = () => {
  return (
    <>
      <PageHeader 
        title="Tezaoro DEX Aggregator Review: Optimizing DeFi Trading Across 80+ Markets" 
        description="Advanced algorithmic trading infrastructure with quantum-resistant routing, MEV-protected swaps, and gasless trading."
      />

      <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>April 2025</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Tezaoro Team</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>10 min read</span>
        </div>
      </div>
    </>
  );
};

export default PostHeader;
