# Analytics Integration for Landing Page Variants

This document shows how to integrate PostHog analytics for variants B and C when importing from Lovable.dev.

## For Landing Page B

Use experiment flag name: `headline-LP-b`

```jsx
// Example for src/variants/b/components/HeroSection.jsx
import React from 'react';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { useAnalytics } from '@/analytics'; // Reuse existing analytics

const HeroSection = () => {
  const variant = useFeatureFlagVariantKey('headline-LP-b');
  const { trackExperimentView, trackCTAClick } = useAnalytics();

  // Define your B variant text options
  const getHeadlineText = () => {
    if (variant === 'test') {
      return 'Your variant B test text';
    }
    return 'Your variant B control text'; // control/fallback
  };

  const headlineText = getHeadlineText();
  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track when the experiment variant is viewed with page context
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('headline-LP-b', variant || 'fallback', showFallback, 'page-b');
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  const handleCTAClick = () => {
    trackCTAClick('headline-LP-b', variant || 'fallback', showFallback, 'page-b', {
      location: 'hero',
      text: 'Join Free'
    });
    // Your CTA action here
  };

  return (
    <div>
      <h1>{headlineText}</h1>
      <button onClick={handleCTAClick}>
        Join Free
      </button>
    </div>
  );
};

export default HeroSection;
```

## For Landing Page C

Use experiment flag name: `headline-LP-c`

```jsx
// Example for src/variants/c/components/HeroSection.jsx
import React from 'react';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { useAnalytics } from '@/analytics'; // Reuse existing analytics

const HeroSection = () => {
  const variant = useFeatureFlagVariantKey('headline-LP-c');
  const { trackExperimentView, trackCTAClick } = useAnalytics();

  // Define your C variant text options
  const getHeadlineText = () => {
    if (variant === 'test') {
      return 'Your variant C test text';
    }
    return 'Your variant C control text'; // control/fallback
  };

  const headlineText = getHeadlineText();
  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track when the experiment variant is viewed with page context
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('headline-LP-c', variant || 'fallback', showFallback, 'page-c');
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  const handleCTAClick = () => {
    trackCTAClick('headline-LP-c', variant || 'fallback', showFallback, 'page-c', {
      location: 'hero',
      text: 'Join Free'
    });
    // Your CTA action here
  };

  return (
    <div>
      <h1>{headlineText}</h1>
      <button onClick={handleCTAClick}>
        Join Free
      </button>
    </div>
  );
};

export default HeroSection;
```

## PostHog Flags Configuration

In your PostHog dashboard, create these feature flags:

1. **headline-LP-a** (already exists for Landing Page A)
   - Variants: `control`, `test`
   - Use for original landing page

2. **headline-LP-b** (create for Landing Page B)
   - Variants: `control`, `test`
   - Use for Lovable.dev variant B

3. **headline-LP-c** (create for Landing Page C)
   - Variants: `control`, `test`
   - Use for Lovable.dev variant C

This allows you to track conversion rates independently for each landing page variant. 