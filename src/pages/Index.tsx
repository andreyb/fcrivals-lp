
import React from 'react';
import Header from '../variants/a/components/Header';
import Hero from '../variants/a/components/Hero';
import Features from '../variants/a/components/Features';
import StatsPreview from '../variants/a/components/StatsPreview';
import Testimonials from '../variants/a/components/Testimonials';
import BottomCTA from '../variants/a/components/BottomCTA';
import Footer from '../variants/a/components/Footer';
import FloatingCTA from '../variants/a/components/FloatingCTA';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <StatsPreview />
        <Testimonials />
        <BottomCTA />
        <FloatingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
