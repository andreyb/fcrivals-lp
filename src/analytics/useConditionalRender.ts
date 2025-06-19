import React from 'react';
import { useExperiment, ExperimentConfig } from './useExperiment';

export interface ConditionalRenderConfig {
  flagName: string;
  showWhen: string | boolean | ((variant: string | undefined | boolean) => boolean);
  timeout?: number;
}

export interface ConditionalRenderResult {
  shouldRender: boolean;
  variant: string | undefined | boolean;
  isReady: boolean;
  showFallback: boolean;
}

/**
 * Hook for conditional rendering based on feature flags or experiments
 * 
 * @param config - Configuration object with flag name and render condition
 * @returns Object indicating whether content should be rendered
 * 
 * @example
 * // Show element only for test variant
 * const { shouldRender } = useConditionalRender({
 *   flagName: 'new-feature',
 *   showWhen: 'test'
 * });
 * 
 * @example
 * // Show element for boolean flag
 * const { shouldRender } = useConditionalRender({
 *   flagName: 'feature-enabled',
 *   showWhen: true
 * });
 * 
 * @example
 * // Custom condition
 * const { shouldRender } = useConditionalRender({
 *   flagName: 'user-type',
 *   showWhen: (variant) => variant === 'premium' || variant === 'vip'
 * });
 */
export const useConditionalRender = (config: ConditionalRenderConfig): ConditionalRenderResult => {
  const { flagName, showWhen, timeout = 5000 } = config;
  
  // Use a simple boolean experiment to get the variant
  const experiment = useExperiment<boolean>({
    flagName,
    variants: { 'true': true, 'false': false },
    fallback: false,
    timeout
  });

  const shouldRender = (): boolean => {
    if (!experiment.isReady) {
      return false; // Don't render until experiment is ready
    }

    if (typeof showWhen === 'function') {
      return showWhen(experiment.variant);
    }

    return experiment.variant === showWhen;
  };

  return {
    shouldRender: shouldRender(),
    variant: experiment.variant,
    isReady: experiment.isReady,
    showFallback: experiment.showFallback
  };
};

/**
 * Higher-order component for conditional rendering
 * 
 * @example
 * const ConditionalFeature = withConditionalRender(
 *   { flagName: 'new-feature', showWhen: 'test' },
 *   () => <div>This only shows for test variant</div>
 * );
 */
export const withConditionalRender = <P extends object>(
  config: ConditionalRenderConfig,
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return (props: P) => {
    const { shouldRender } = useConditionalRender(config);
    
    if (!shouldRender) {
      return null;
    }
    
    return React.createElement(Component, props);
  };
}; 