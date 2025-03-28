
import React, { ReactNode, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MvpBadge from '@/components/MvpBadge';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  useEffect(() => {
    document.title = `${title} | Tezaoro - AI-Powered Algorithmic Trading (MVP)`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col dark">
      <Navbar />
      <MvpBadge />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
