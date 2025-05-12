
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import appScreen1 from '@/assets/screen1.png';
import { usePostHog, useFeatureFlagVariantKey } from 'posthog-js/react';

const Hero = () => {
  const posthog = usePostHog();
  const variant = useFeatureFlagVariantKey('landing_headline_test');

  return (
    <section className="relative min-h-[90vh] pt-24 flex flex-col justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-0 w-60 h-60 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-primary/20 rounded-full blur-[80px]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col space-y-8 md:space-y-12">
          <div className="space-y-4 text-center">

            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text gamer-gradient">fcRivals</span> or it didn't happen.
              <br className="hidden sm:block" />
              {variant === 'test'
                ? 'Track your wins.'
                : 'Prove you run the group.'}
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
              Log every game, offline or online.
              Build leaderboards, track streaks, even record rage quits.
              It’s all saved — no excuses, no lost history.

              <br /><b>Forget “trust me, bro.”
                fcRivals shows who’s really on top.</b>
            </p>
          </div>

          <div className="flex justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto button-glow px-8 py-6 text-base bg-primary hover:bg-primary/90" onClick={() => {
              posthog.capture('CTA_click', {
                variant,
              });
              window.open('https://fcrivals.com', '_blank');
            }}>
              Join Free <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>

          <div className="relative mx-auto w-64 h-300px">
            <div className="border-[14px] rounded-[36px] border-gray-800 overflow-hidden shadow-xl relative">
              <div className="absolute top-0 w-1/2 h-[24px] bg-gray-800 left-1/2 transform -translate-x-1/2 rounded-b-[14px] z-10"></div>
              <img
                src={appScreen1}
                alt="fcRivals App Interface"
                className="w-full h-auto"
              />
            </div>
          </div>

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
        </div>
      </div>
    </section>
  );
};

export default Hero;
