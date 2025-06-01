
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
