
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BottomCTA = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
      </div>

      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl mb-6">Tired of your mate saying he’s unbeaten?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Track every match, goal, rage quit, and “wasn’t trying” excuse — all in one place.
          Join the players keeping receipts and ending debates for good.
        </p>

        <Button
          size="lg"
          className="button-glow px-8 py-6 text-base bg-primary hover:bg-primary/90"
          onClick={() => window.open('https://fcrivals.com', '_blank')}
        >
          Track 1v1 for Free<ArrowRight size={18} className="ml-2" />
        </Button>

        <p className="text-sm text-muted-foreground mt-6">
          Free forever for 1v1 rivalries. No strings. Just stats.
        </p>
      </div>
    </section>
  );
};

export default BottomCTA;
