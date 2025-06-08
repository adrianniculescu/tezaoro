
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import ChangellyApiKeyForm from '@/components/exchange/ChangellyApiKeyForm';

const ChangellySetup = () => {
  return (
    <PageLayout title="Changelly API Setup">
      <PageHeader 
        title="Changelly API Configuration" 
        description="Set up your Changelly API credentials to enable live cryptocurrency exchange rates"
      />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ChangellyApiKeyForm />
        </div>
      </section>
    </PageLayout>
  );
};

export default ChangellySetup;
