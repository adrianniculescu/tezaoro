
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/70 z-50">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
