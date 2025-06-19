import React from 'react';
import { 
  HeroBackground, 
  HeroHeadline, 
  HeroCTA, 
  HeroImage, 
  HeroStats 
} from './hero/index';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] pt-24 flex flex-col justify-center overflow-hidden">
      <HeroBackground />
      
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col space-y-8 md:space-y-12">
          <HeroHeadline />
          <HeroCTA />
          <HeroImage />
          <HeroStats />
        </div>
      </div>
    </section>
  );
};

export default Hero;
