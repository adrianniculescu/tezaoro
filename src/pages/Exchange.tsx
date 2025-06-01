
import React from 'react';

const Exchange = () => {
  console.log('Exchange component: MINIMAL VERSION RENDERING');
  
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold text-center">Exchange Page</h1>
      <p className="text-center mt-4">This is the exchange page - if you can see this, the component is working!</p>
    </div>
  );
};

export default Exchange;
