import React from 'react';
import Header from '../variants/a/components/Header';
import Hero from '../variants/a/components/Hero';
import Features from '../variants/a/components/Features';
import StatsPreview from '../variants/a/components/StatsPreview';
import Testimonials from '../variants/a/components/Testimonials';
import BottomCTA from '../variants/a/components/BottomCTA';
import Footer from '../variants/a/components/Footer';
import FloatingCTA from '../variants/a/components/FloatingCTA';

/**
 * Landing Page A - Original Design
 * 
 * This is the original landing page design with all existing functionality.
 * It uses PostHog experiments with the 'LP-A-*' naming pattern:
 * - LP-A-headline: A/B test for the main headline (implemented in Hero component)
 * 
 * Future A/B tests planned (not yet implemented):
 * - LP-A-cta-primary: A/B test for Primary CTA button text/style
 * - LP-A-features-layout: A/B test for feature presentation
 * - LP-A-pricing-display: A/B test for pricing display
 * Add more as needed following the LP-A-[element] pattern.
 * 
 * This page is completely isolated from variants B and C.
 * Changes to this page will NOT affect the other variants.
 */

const LandingPageA = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden landing-page-a">
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

export default LandingPageA; 