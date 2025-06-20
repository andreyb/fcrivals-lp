/**
 * PostHog Configuration and Setup
 * 
 * Centralizes all PostHog configuration logic including:
 * - Environment variable handling
 * - Bootstrap flags for returning visitors
 * - PostHog options and callbacks
 */

// Debug logging for build time
console.log('🔍 Build-time environment check:', {
    VITE_PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY ? 'SET' : 'NOT_SET',
    VITE_PUBLIC_POSTHOG_HOST: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ? 'SET' : 'NOT_SET',
    MODE: import.meta.env.MODE
});

// Ensure PostHog key exists
export const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;

/**
 * Bootstrap flags from localStorage for returning visitors
 * This provides instant flag availability for users who have visited before
 */
export const getBootstrapFlags = () => {
    try {
        const cached = localStorage.getItem('posthog_feature_flags');
        const cachedDistinctId = localStorage.getItem('posthog_distinct_id');

        if (cached) {
            const flags = JSON.parse(cached);
            return {
                distinctID: cachedDistinctId || undefined,
                featureFlags: flags
            };
        }
    } catch (error) {
        // Silently fail and continue without bootstrap
        console.warn('Failed to load cached PostHog flags:', error);
    }
    return {};
};

/**
 * PostHog configuration options
 * Includes API host, bootstrap flags, and flag caching setup
 */
export const getPostHogOptions = () => ({
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    bootstrap: getBootstrapFlags(),
    loaded: (posthog: any) => {
        // Set up flag caching for returning visitors
        posthog.onFeatureFlags((flags: any, flagVariants: any) => {
            try {
                // Store the flagVariants (which contains the actual flag values) in localStorage
                localStorage.setItem('posthog_feature_flags', JSON.stringify(flagVariants));
                localStorage.setItem('posthog_distinct_id', posthog.get_distinct_id());
            } catch (error) {
                // Silently fail if localStorage is not available
                console.warn('Failed to cache PostHog flags:', error);
            }
        });
    },
});

/**
 * Check if PostHog is properly configured
 */
export const isPostHogConfigured = (): boolean => {
    return !!POSTHOG_KEY;
};

/**
 * Get PostHog configuration summary for debugging
 */
export const getConfigSummary = () => ({
    hasKey: !!POSTHOG_KEY,
    apiHost: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    hasCachedFlags: !!localStorage.getItem('posthog_feature_flags'),
    environment: import.meta.env.MODE
});

// Debug logging (added after the working config to avoid interference)
console.log('🔍 PostHog Runtime Configuration:', {
    hasKey: !!POSTHOG_KEY,
    keyLength: POSTHOG_KEY?.length || 0,
    actualKey: POSTHOG_KEY ? `${POSTHOG_KEY.substring(0, 8)}...` : 'undefined',
    host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    mode: import.meta.env.MODE,
    timestamp: new Date().toISOString(),
    allEnvVars: {
        VITE_PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY ? 'SET' : 'NOT_SET',
        VITE_PUBLIC_POSTHOG_HOST: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ? 'SET' : 'NOT_SET'
    }
}); 