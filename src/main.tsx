import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PostHogProvider } from 'posthog-js/react';

// Ensure PostHog key exists
const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
if (!POSTHOG_KEY) {
    console.error('[PostHog] Missing VITE_PUBLIC_POSTHOG_KEY environment variable');
}

// Bootstrap flags from localStorage for returning visitors
const getBootstrapFlags = () => {
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
        console.warn('Failed to load bootstrap flags:', error);
    }
    return {};
};

const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    bootstrap: getBootstrapFlags(),
    loaded: (posthog: any) => {
        // Cache flags for next visit after they're loaded
        posthog.onFeatureFlags(() => {
            try {
                const flags = posthog.getAllFlags();
                const distinctId = posthog.get_distinct_id();
                
                localStorage.setItem('posthog_feature_flags', JSON.stringify(flags));
                localStorage.setItem('posthog_distinct_id', distinctId);
            } catch (error) {
                console.warn('Failed to cache flags:', error);
            }
        });
    }
}

// Only render PostHog if we have a key
createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {POSTHOG_KEY ? (
            <PostHogProvider
                apiKey={POSTHOG_KEY}
                options={options}
            >
                <App />
            </PostHogProvider>
        ) : (
            <App />
        )}
    </React.StrictMode>
);