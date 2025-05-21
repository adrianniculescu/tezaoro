
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Platform', url: '/platform' },
    { name: 'Features', url: '/features' },
    { name: 'Algorithms', url: '/algorithms' },
    { name: 'Performance', url: '/performance' },
    { name: 'Pricing', url: '/pricing' },
    {
      name: 'Resources',
      url: '/resources',
      submenu: [
        { name: 'Documentation', url: '/documentation' },
        { name: 'API', url: '/api' },
        { name: 'Blog', url: '/blog' },
        { name: 'Support', url: '/support' },
      ]
    },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2 font-bold text-2xl">
              <span className="text-gradient">Tezaoro</span>
            </NavLink>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => {
                if (link.submenu) {
                  return (
                    <DropdownMenu key={link.name}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1">
                          {link.name}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {link.submenu.map((sublink) => (
                          <DropdownMenuItem key={sublink.name} asChild>
                            <NavLink 
                              to={sublink.url}
                              className="w-full cursor-pointer"
                            >
                              {sublink.name}
                            </NavLink>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }
                return (
                  <NavLink
                    key={link.name}
                    to={link.url}
                    className={({ isActive }) => `${
                      isActive ? 'text-primary' : 'text-foreground'
                    } hover:text-primary px-3 py-2 text-sm font-medium`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <NavLink to="/how-it-works">
                <Button variant="outline">How It Works</Button>
              </NavLink>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button disabled={true}>Sign Up</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Registration available by invitation only</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            {navLinks.map((link) => {
              if (link.submenu) {
                return (
                  <React.Fragment key={link.name}>
                    <div className="text-foreground px-3 py-2 text-base font-medium">
                      {link.name}
                    </div>
                    <div className="pl-6 space-y-1">
                      {link.submenu.map((sublink) => (
                        <NavLink
                          key={sublink.name}
                          to={sublink.url}
                          className={({ isActive }) => `${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          } hover:text-primary block px-3 py-2 text-sm font-medium`}
                          onClick={toggleMenu}
                        >
                          {sublink.name}
                        </NavLink>
                      ))}
                    </div>
                  </React.Fragment>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.url}
                  className={({ isActive }) => `${
                    isActive ? 'text-primary' : 'text-foreground'
                  } hover:text-primary block px-3 py-2 text-base font-medium`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              );
            })}
            <div className="pt-4 flex flex-col gap-2 px-3">
              <NavLink to="/how-it-works" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">How It Works</Button>
              </NavLink>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="w-full" disabled={true}>Sign Up</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Registration available by invitation only</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
