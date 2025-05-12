
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-transparent bg-clip-text gamer-gradient">fcRivals</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex gap-6">
              <li><a href="#features" className="text-sm hover:text-primary transition-colors">Features</a></li>
              <li><a href="#preview" className="text-sm hover:text-primary transition-colors">Preview</a></li>
              <li><a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a></li>
            </ul>
          </nav>
          <Button 
            size="sm" 
            className="px-4 bg-primary hover:bg-primary/90"
            onClick={() => window.open('https://fcrivals.com', '_blank')}
          >
            Sign In
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
