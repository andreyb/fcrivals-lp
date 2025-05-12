
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Button 
        className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-6 py-6 text-base animate-pulse-glow"
        size="lg"
        onClick={() => window.open('https://fcrivals.com', '_blank')}
      >
        Join Free <ArrowRight size={18} className="ml-2" />
      </Button>
    </div>
  );
};

export default FloatingCTA;
