
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MvpBadge = () => {
  return (
    <div className="fixed top-20 right-4 z-50 transform rotate-0 md:rotate-0">
      <div className="bg-accent/90 text-white text-xs font-bold px-3 py-2 rounded shadow-lg flex items-center gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5" />
        Tezaoro is currently in MVP mode. The platform is open for customers by invitation only!
      </div>
    </div>
  );
};

export default MvpBadge;
