import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { useAnalytics } from '../../../../analytics';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

const HeroCTA = () => {
  const { trackCTAClick } = useAnalytics();
  const variant = useFeatureFlagVariantKey('LP-A-headline');

  const handleCTAClick = () => {
    trackCTAClick('LP-A-headline', variant || 'fallback', variant === undefined, 'page-a', {
      location: 'hero',
      text: 'Join Free'
    });
    window.open('https://fcrivals.com', '_blank');
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        size="lg"
        className="w-full sm:w-auto button-glow px-8 py-6 text-base bg-primary hover:bg-primary/90"
        onClick={handleCTAClick}
      >
        Join Free <ArrowRight size={18} className="ml-2" />
      </Button>
    </div>
  );
};

export default HeroCTA; 