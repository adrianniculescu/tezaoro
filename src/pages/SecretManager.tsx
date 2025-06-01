
import React from 'react';
import PageLayout from '@/components/PageLayout';
import PageHeader from '@/components/PageHeader';
import SecretManager from '@/components/admin/SecretManager';

const SecretManagerPage = () => {
  return (
    <PageLayout title="API Configuration">
      <PageHeader 
        title="API Configuration" 
        description="Manage your Changelly API credentials"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <SecretManager />
        </div>
      </section>
    </PageLayout>
  );
};

export default SecretManagerPage;
