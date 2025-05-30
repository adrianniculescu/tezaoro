import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Button } from './ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = (path: string) => {
    console.log(`Navbar: Attempting to navigate to ${path}`);
    setIsOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to="/platform"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Tezaoro Platform
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Advanced algorithmic trading platform for nano-cap cryptocurrencies
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <NavigationMenuLink asChild>
                        <Link to="/features" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Features</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Explore our comprehensive trading features
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/algorithms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Algorithms</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            AI-powered trading algorithms
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/performance" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Performance</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track and analyze your trading performance
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Trading</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/exchange" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => handleLinkClick('/exchange')}
                        >
                          <div className="text-sm font-medium leading-none">Instant Exchange</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Swap between 500+ cryptocurrencies instantly
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/fiat-gateway" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => handleLinkClick('/fiat-gateway')}
                        >
                          <div className="text-sm font-medium leading-none">Fiat Gateway</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Buy and sell crypto with credit cards
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/dex-aggregator" 
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          onClick={() => handleLinkClick('/dex-aggregator')}
                        >
                          <div className="text-sm font-medium leading-none">DEX Aggregator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access best prices across 200+ decentralized exchanges
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/pricing"
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                      isActive('/pricing') ? 'text-foreground' : 'text-foreground/60'
                    }`}
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link to="/documentation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Documentation</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Comprehensive guides and API documentation
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Blog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Latest insights and trading strategies
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/support" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Support</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get help and contact our team
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button variant="outline" asChild>
              <Link to="/api">API Access</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border/40">
              <Link
                to="/platform"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Platform
              </Link>
              <Link
                to="/features"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/algorithms"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Algorithms
              </Link>
              <Link
                to="/performance"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Performance
              </Link>
              <Link
                to="/exchange"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => handleLinkClick('/exchange')}
              >
                Exchange
              </Link>
              <Link
                to="/fiat-gateway"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => handleLinkClick('/fiat-gateway')}
              >
                Fiat Gateway
              </Link>
              <Link
                to="/dex-aggregator"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => handleLinkClick('/dex-aggregator')}
              >
                DEX Aggregator
              </Link>
              <Link
                to="/pricing"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/documentation"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Documentation
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/support"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Support
              </Link>
              <Link
                to="/api"
                className="block px-3 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                API Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
