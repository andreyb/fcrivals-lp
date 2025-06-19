import { useEffect, useState } from 'react';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

export interface ExperimentConfig<T = any> {
  flagName: string;
  variants: Record<string, T>;
  fallback: T;
  timeout?: number;
}

export interface ExperimentResult<T> {
  value: T;
  variant: string | undefined | boolean;
  isReady: boolean;
  showFallback: boolean;
}

/**
 * Generic experiment hook for A/B testing any type of content or behavior
 * 
 * @param config - Configuration object with flag name, variants, and fallback
 * @returns Experiment result with current value and metadata
 * 
 * @example
 * // Text experiment
 * const headlineExperiment = useExperiment({
 *   flagName: 'headline',
 *   variants: {
 *     control: 'Prove you run the group.',
 *     test: 'Track your wins.'
 *   },
 *   fallback: 'Prove you run the group.'
 * });
 * 
 * @example
 * // Style experiment
 * const buttonExperiment = useExperiment({
 *   flagName: 'button-style',
 *   variants: {
 *     control: { color: 'blue', size: 'md' },
 *     test: { color: 'green', size: 'lg' }
 *   },
 *   fallback: { color: 'blue', size: 'md' }
 * });
 * 
 * @example
 * // Boolean feature flag
 * const featureExperiment = useExperiment({
 *   flagName: 'new-feature',
 *   variants: {
 *     true: true,
 *     false: false
 *   },
 *   fallback: false
 * });
 */
export const useExperiment = <T>(config: ExperimentConfig<T>): ExperimentResult<T> => {
  const { flagName, variants, fallback, timeout = 5000 } = config;
  const variant = useFeatureFlagVariantKey(flagName);
  const [showFallback, setShowFallback] = useState(false);

  // Timeout fallback mechanism
  useEffect(() => {
    const timer = setTimeout(() => {
      if (variant === undefined) {
        setShowFallback(true);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [variant, timeout]);

  // Get the value based on the current variant
  const getValue = (): T => {
    // Handle string variants (multivariate flags)
    if (typeof variant === 'string' && variant in variants) {
      return variants[variant];
    }
    
    // Handle boolean variants (boolean flags)
    if (typeof variant === 'boolean') {
      const booleanKey = variant.toString();
      if (booleanKey in variants) {
        return variants[booleanKey];
      }
    }
    
    // Fallback for undefined/null variants or unmatched variants
    return fallback;
  };

  const isReady = variant !== undefined || showFallback;

  return {
    value: getValue(),
    variant,
    isReady,
    showFallback
  };
}; 