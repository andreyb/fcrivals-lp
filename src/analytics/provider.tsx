import React from 'react';
import { PostHogProvider } from 'posthog-js/react';
import { POSTHOG_KEY, getPostHogOptions, isPostHogConfigured, getConfigSummary } from './config';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  debug?: boolean;
}

/**
 * Analytics Provider Component
 * 
 * Wraps the application with PostHog analytics and provides debugging capabilities.
 * This component handles all PostHog setup and gracefully falls back when analytics
 * is not configured.
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  debug = false 
}) => {
  // Log configuration summary in debug mode
  React.useEffect(() => {
    if (debug) {
      console.log('Analytics Configuration:', getConfigSummary());
    }
  }, [debug]);

  if (isPostHogConfigured()) {
    return (
      <PostHogProvider apiKey={POSTHOG_KEY} options={getPostHogOptions()}>
        {children}
      </PostHogProvider>
    );
  } else {
    // Graceful fallback when PostHog is not configured
    if (debug || import.meta.env.DEV) {
      console.warn('PostHog key not found. Running without analytics.');
    }
    return <>{children}</>;
  }
};

export default AnalyticsProvider; 