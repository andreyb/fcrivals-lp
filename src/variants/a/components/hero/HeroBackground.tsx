import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
      <div className="absolute top-1/3 right-0 w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
    </div>
  );
};

export default HeroBackground; 