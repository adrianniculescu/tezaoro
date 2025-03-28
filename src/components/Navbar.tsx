
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, X, BarChart2, Cpu, Zap, BookOpen, Users
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <BarChart2 className="h-8 w-8 text-tezaoro-400" />
              <span className="text-xl font-bold text-foreground">Tezaoro</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#algorithms" className="text-muted-foreground hover:text-foreground transition-colors">Algorithms</a>
            <a href="#performance" className="text-muted-foreground hover:text-foreground transition-colors">Performance</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <Button variant="outline" className="ml-4">Log In</Button>
            <Button className="bg-primary hover:bg-primary/90 btn-glow">Get Started</Button>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-foreground">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10">How It Works</Link>
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10">Features</a>
            <a href="#algorithms" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10">Algorithms</a>
            <a href="#performance" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10">Performance</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10">Pricing</a>
            <div className="flex flex-col pt-4 space-y-2">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
