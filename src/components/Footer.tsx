
import React from 'react';
import { BarChart2, Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleNewsletterSignup = () => {
    const subject = encodeURIComponent("Tezaoro Newsletter Subscription");
    const body = encodeURIComponent(
      "Hello Tezaoro team,\n\nI would like to subscribe to your newsletter for the latest updates on Tezaoro's AI-powered algorithmic trading platform.\n\nPlease add me to your mailing list.\n\nThank you!"
    );
    window.location.href = `mailto:office@tezaoro.com?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Tezaoro</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Revolutionary algorithmic trading powered by artificial intelligence.
            </p>
            <p className="text-muted-foreground mb-3">
              <a href="mailto:office@tezaoro.com" className="hover:text-primary transition-colors">
                office@tezaoro.com
              </a>
            </p>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Github className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/algorithms" className="text-muted-foreground hover:text-foreground transition-colors">Algorithms</Link></li>
              <li><Link to="/performance" className="text-muted-foreground hover:text-foreground transition-colors">Performance</Link></li>
              <li><Link to="/token-listing" className="text-muted-foreground hover:text-foreground transition-colors">Token Listing</Link></li>
              <li><Link to="/market-making" className="text-muted-foreground hover:text-foreground transition-colors">Market Making</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/tokenomics-consulting" className="text-muted-foreground hover:text-foreground transition-colors">Tokenomics Consulting</Link></li>
              <li><Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors">API</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-background" disabled />
              <Button onClick={handleNewsletterSignup} className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2023 Tezaoro. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
