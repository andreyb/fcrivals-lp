import { usePostHog } from 'posthog-js/react';

// Base interface for all tracked events
export interface BaseEvent {
  variant?: string | undefined | boolean | 'fallback';
  is_returning_visitor?: boolean;
}

// Specific event interfaces extending the base
export interface CTAClickEvent extends BaseEvent {
  experiment_name: string;
  page_variant: string;
  cta_location?: string;
  cta_text?: string;
}

export interface ExperimentViewEvent extends BaseEvent {
  experiment_name: string;
  page_variant: string;
  view_timestamp: number;
}

export interface ComponentInteractionEvent extends BaseEvent {
  component_name: string;
  interaction_type: 'click' | 'hover' | 'scroll' | 'focus' | 'view';
  page_variant?: string;
  element_id?: string;
}

// Event names as constants to prevent typos
export const EVENTS = {
  CTA_CLICK: 'CTA_click',
  EXPERIMENT_VIEW: 'experiment_view',
  COMPONENT_INTERACTION: 'component_interaction',
} as const;

// Helper functions
export const isReturningVisitor = (): boolean => {
  return !!localStorage.getItem('posthog_feature_flags');
};

export const getVariantForTracking = (
  variant: string | undefined | boolean, 
  showFallback: boolean
): string | undefined | boolean | 'fallback' => {
  return showFallback ? 'fallback' : variant;
};

/**
 * Custom hook for PostHog event tracking with experiment context
 * Provides type-safe methods for tracking different types of events
 */
export const useAnalytics = () => {
  const posthog = usePostHog();

  /**
   * Track CTA button clicks with experiment and page context
   */
  const trackCTAClick = (
    experimentName: string,
    variant: string | undefined | boolean, 
    showFallback: boolean,
    pageVariant: string,
    options?: {
      location?: string;
      text?: string;
    }
  ) => {
    posthog?.capture(EVENTS.CTA_CLICK, {
      experiment_name: experimentName,
      page_variant: pageVariant,
      variant: getVariantForTracking(variant, showFallback),
      is_returning_visitor: isReturningVisitor(),
      cta_location: options?.location,
      cta_text: options?.text,
    } satisfies CTAClickEvent);
  };

  /**
   * Track when an experiment variant is viewed
   */
  const trackExperimentView = (
    experimentName: string,
    variant: string | undefined | boolean,
    showFallback: boolean,
    pageVariant: string
  ) => {
    posthog?.capture(EVENTS.EXPERIMENT_VIEW, {
      experiment_name: experimentName,
      page_variant: pageVariant,
      variant: getVariantForTracking(variant, showFallback),
      is_returning_visitor: isReturningVisitor(),
      view_timestamp: Date.now(),
    } satisfies ExperimentViewEvent);
  };

  /**
   * Track generic component interactions
   */
  const trackComponentInteraction = (
    componentName: string,
    interactionType: ComponentInteractionEvent['interaction_type'],
    variant?: string | undefined | boolean,
    showFallback?: boolean,
    elementId?: string,
    pageVariant?: string
  ) => {
    posthog?.capture(EVENTS.COMPONENT_INTERACTION, {
      component_name: componentName,
      interaction_type: interactionType,
      element_id: elementId,
      page_variant: pageVariant,
      ...(variant !== undefined && {
        variant: getVariantForTracking(variant, showFallback || false),
        is_returning_visitor: isReturningVisitor(),
      }),
    } satisfies ComponentInteractionEvent);
  };

  /**
   * Generic event tracking for custom events
   */
  const trackCustomEvent = (
    eventName: string,
    properties: Record<string, any> = {},
    includeVariantContext?: {
      variant: string | undefined | boolean;
      showFallback: boolean;
    }
  ) => {
    const eventProperties = {
      ...properties,
      ...(includeVariantContext && {
        variant: getVariantForTracking(includeVariantContext.variant, includeVariantContext.showFallback),
        is_returning_visitor: isReturningVisitor(),
      }),
    };

    posthog?.capture(eventName, eventProperties);
  };

  return {
    // Specific tracking methods
    trackCTAClick,
    trackExperimentView,
    trackComponentInteraction,
    
    // Generic tracking
    trackCustomEvent,
    
    // Direct PostHog access for advanced use cases
    posthog,
    
    // Utility functions
    isReturningVisitor,
    getVariantForTracking,
  };
}; 