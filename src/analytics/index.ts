// Core experiment utilities
export { useExperiment } from './useExperiment';
export type { ExperimentConfig, ExperimentResult } from './useExperiment';

// Legacy hooks (deprecated - use useExperiment instead)
export { useHeadlineVariant } from './useHeadlineVariant';

// Conditional rendering utilities
export { useConditionalRender, withConditionalRender } from './useConditionalRender';
export type { ConditionalRenderConfig, ConditionalRenderResult } from './useConditionalRender';

// Analytics and tracking
export { useAnalytics, isReturningVisitor, getVariantForTracking, EVENTS } from './tracking';
export type { 
  CTAClickEvent,
  ExperimentViewEvent,
  ComponentInteractionEvent
} from './tracking';

// PostHog configuration and setup
export { 
  POSTHOG_KEY, 
  getBootstrapFlags, 
  getPostHogOptions, 
  isPostHogConfigured, 
  getConfigSummary 
} from './config';

// Provider component
export { AnalyticsProvider } from './provider'; 