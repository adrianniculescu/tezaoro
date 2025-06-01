
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSignup = () => {
  const handleNewsletterSignup = () => {
    const subject = encodeURIComponent("Tezaoro Newsletter Subscription");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI would like to subscribe to your newsletter for the latest updates and insights on algorithmic trading.\n\nPlease add me to your mailing list.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Stay <span className="text-gradient">Informed</span></h2>
        <p className="text-lg text-muted-foreground mb-8">
          Subscribe to our newsletter to receive the latest articles and insights on algorithmic trading.
        </p>
        <Button onClick={handleNewsletterSignup} className="bg-primary hover:bg-primary/90">
          Subscribe to Newsletter
        </Button>
      </div>
    </section>
  );
};

export default NewsletterSignup;
