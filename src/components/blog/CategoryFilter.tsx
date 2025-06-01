
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
  categories: string[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  return (
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
  );
};

export default CategoryFilter;
