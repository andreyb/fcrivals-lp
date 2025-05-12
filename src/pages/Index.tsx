
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import StatsPreview from '@/components/StatsPreview';
import Testimonials from '@/components/Testimonials';
import BottomCTA from '@/components/BottomCTA';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

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
