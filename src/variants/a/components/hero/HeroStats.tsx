import React from 'react';

const HeroStats = () => {
  return (
    <div className="pt-6 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground">Already tracking stats for</p>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium">15,000+ Matches</span>
          <span className="h-4 w-px bg-border"></span>
          <span className="text-sm font-medium">5,000+ Rivals</span>
        </div>
      </div>
    </div>
  );
};

export default HeroStats; 