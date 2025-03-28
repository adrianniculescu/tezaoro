
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="relative bg-background py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-tezaoro-900/30 to-transparent"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{title}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
