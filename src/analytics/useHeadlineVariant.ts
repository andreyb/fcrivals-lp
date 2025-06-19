import { useEffect, useState } from 'react';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

interface HeadlineVariantResult {
  text: string;
  variant: string | undefined | boolean;
  isReady: boolean;
  showFallback: boolean;
}

/**
 * Custom hook for handling the headline A/B test variant
 * Encapsulates PostHog logic and provides clean interface for components
 */
export const useHeadlineVariant = (): HeadlineVariantResult => {
  const variant = useFeatureFlagVariantKey('headline');
  const [showFallback, setShowFallback] = useState(false);

  // 5-second timeout fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (variant === undefined) {
        setShowFallback(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [variant]);

  // Determine headline text based on variant
  const getHeadlineText = (): string => {
    if (variant === 'test') {
      return 'Track your wins.';
    } else if (variant === 'control') {
      return 'Prove you run the group.';
    }
    // Fallback for undefined/null variants (flag disabled or no match)
    return 'Prove you run the group.';
  };

  const isReady = variant !== undefined || showFallback;

  return {
    text: getHeadlineText(),
    variant,
    isReady,
    showFallback
  };
}; 