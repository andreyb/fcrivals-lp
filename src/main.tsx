import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'
import { POSTHOG_KEY, getPostHogOptions, isPostHogConfigured } from './analytics/config'
// Alternative approach using the AnalyticsProvider component:
// import { AnalyticsProvider } from './analytics'

const root = createRoot(document.getElementById('root')!);

// Current approach - direct PostHog setup
if (isPostHogConfigured()) {
    root.render(
        <React.StrictMode>
            <PostHogProvider apiKey={POSTHOG_KEY} options={getPostHogOptions()}>
                <App />
            </PostHogProvider>
        </React.StrictMode>
    );
} else {
    // Render without PostHog if key is missing
    console.warn('PostHog key not found. Running without analytics.');
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

// Alternative approach - using AnalyticsProvider component:
// root.render(
//     <React.StrictMode>
//         <AnalyticsProvider debug={import.meta.env.DEV}>
//             <App />
//         </AnalyticsProvider>
//     </React.StrictMode>
// );