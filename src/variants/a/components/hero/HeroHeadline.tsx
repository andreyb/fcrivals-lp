import React from 'react';
import { useAnalytics } from '../../../../analytics';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

const HeroHeadline = () => {
  // Use the new experiment name for Landing Page A
  const variant = useFeatureFlagVariantKey('LP-A-headline');
  const { trackExperimentView } = useAnalytics();

  // Define variants with simple fallback
  const getHeadlineText = () => {
    if (variant === 'test') {
      return 'Track your wins.';
    }
    return 'Prove you run the group.'; // control/fallback
  };

  const headlineText = getHeadlineText();
  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track when the experiment variant is viewed with page context
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('LP-A-headline', variant || 'fallback', showFallback, 'page-a');
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  return (
    <div className="space-y-4 text-center">
      <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
        <span className="text-transparent bg-clip-text gamer-gradient">fcRivals</span> or it didn't happen.
        <br className="hidden sm:block" />

        {/* Reserve space for headline and show placeholder or actual text */}
        <span style={{ minHeight: '1.2em', display: 'inline-block' }}>
          {isReady ? (
            headlineText
          ) : (
            // Invisible placeholder to maintain layout
            <span style={{ visibility: 'hidden' }}>Prove you run the group.</span>
          )}
        </span>
      </h1>

      <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
        Log every game, offline or online.
        Build leaderboards, track streaks, even record rage quits.
        It's all saved — no excuses, no lost history.

        <br /><b>Forget "trust me, bro."
          fcRivals shows who's really on top.</b>
      </p>
    </div>
  );
};

export default HeroHeadline; 