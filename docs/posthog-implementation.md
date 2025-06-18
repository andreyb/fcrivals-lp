# PostHog Implementation Documentation

## Overview

This document details how PostHog analytics and feature flagging is currently implemented in the fcRivals landing page. PostHog is used for both event tracking and A/B testing capabilities.

## Current Setup

### 1. Dependencies

PostHog is installed as a dependency in the project:

```json
"posthog-js": "^1.240.6"
```

### 2. Provider Configuration

PostHog is configured at the application root level in `src/main.tsx`:

```tsx
import { PostHogProvider } from 'posthog-js/react';

const options = {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PostHogProvider
            apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
            options={options}
        >
            <App />
        </PostHogProvider>
    </React.StrictMode>
);
```

### 3. Environment Variables

The implementation uses two environment variables:

- `VITE_PUBLIC_POSTHOG_KEY`: The PostHog project API key
- `VITE_PUBLIC_POSTHOG_HOST`: The PostHog API host URL

⚠️ **Note**: These environment variables need to be set in your deployment environment and local development setup.

## Current Features in Use

### 1. Event Tracking

**Location**: `src/components/Hero.tsx`

The landing page currently tracks one main event:

```tsx
posthog.capture('CTA_click', {
    variant,
    flags_ready: true,
    is_returning_visitor: !!localStorage.getItem('posthog_feature_flags')
});
```

This event is triggered when users click the main "Join Free" CTA button in the hero section.

**Event Properties**:
- `variant`: The current A/B test variant being shown to the user
- `flags_ready`: Whether PostHog flags were loaded when the event was tracked
- `is_returning_visitor`: Whether the user has cached flags from a previous visit

### 2. Feature Flags / A/B Testing with Bootstrapping

**Location**: `src/components/Hero.tsx`

The landing page implements proper A/B testing with flag preloading to ensure accurate results:

```tsx
const variant = useFeatureFlagVariantKey('landing_headline_test');
const [flagsReady, setFlagsReady] = useState(false);

useEffect(() => {
  // Check if we have bootstrapped flags (returning visitors)
  const hasBootstrapFlags = localStorage.getItem('posthog_feature_flags');
  
  if (hasBootstrapFlags) {
    // Returning visitor - flags available immediately
    setFlagsReady(true);
  } else {
    // First-time visitor - wait for flags to load
    posthog.onFeatureFlags(() => {
      setFlagsReady(true);
    });
  }
}, [posthog]);
```

**Feature Flag Details**:
- **Flag Name**: `landing_headline_test`
- **Implementation**: Changes the hero subtitle text based on the variant with proper loading state
- **Variants**:
  - `test`: Shows "Track your wins."
  - Default: Shows "Prove you run the group."

**Usage in Component**:
```tsx
<span 
  className={`transition-opacity duration-200 ${
    flagsReady ? 'opacity-100' : 'opacity-0'
  }`}
>
  {flagsReady && (variant === 'test'
    ? 'Track your wins.'
    : 'Prove you run the group.')}
</span>
```

### 3. PostHog Bootstrapping

**Location**: `src/main.tsx`

PostHog is initialized with bootstrapping to provide immediate flag access for returning visitors:

```tsx
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
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    bootstrap: getBootstrapFlags(),
    loaded: (posthog: any) => {
        // Cache flags for next visit after they're loaded
        posthog.onFeatureFlags(() => {
            const flags = posthog.getAllFlags();
            const distinctId = posthog.get_distinct_id();
            
            localStorage.setItem('posthog_feature_flags', JSON.stringify(flags));
            localStorage.setItem('posthog_distinct_id', distinctId);
        });
    }
}
```

**Benefits**:
- **Instant flags for returning visitors** (95%+ of traffic after launch)
- **Eliminates FOUC** (Flash of Unstyled Content) for A/B tests
- **Accurate variant distribution** on static hosting (GitHub Pages)
- **Smooth user experience** with loading transitions

## Implementation Details

### Hook Usage

The Hero component uses two PostHog React hooks:

1. `usePostHog()`: Provides access to the PostHog instance for event tracking
2. `useFeatureFlagVariantKey()`: Retrieves the current variant for a specific feature flag

### Code Structure

```tsx
import { usePostHog, useFeatureFlagVariantKey } from 'posthog-js/react';

const Hero = () => {
  const posthog = usePostHog();
  const variant = useFeatureFlagVariantKey('landing_headline_test');
  
  // Component implementation...
};
```

## Current Tracking Events

| Event Name | Location | Properties | Purpose |
|------------|----------|------------|---------|
| `CTA_click` | Hero component | `variant`, `flags_ready`, `is_returning_visitor` | Track main CTA button clicks with A/B test context and bootstrapping state |

## Current Feature Flags

| Flag Name | Type | Purpose | Implementation |
|-----------|------|---------|----------------|
| `landing_headline_test` | A/B Test | Test different hero subtitle texts | Conditional rendering in Hero component |

## Setup Requirements

### Environment Configuration

For PostHog to work properly, you need to set the following environment variables:

```bash
VITE_PUBLIC_POSTHOG_KEY=your_posthog_project_key
VITE_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### PostHog Dashboard Configuration

1. **Feature Flag Setup**: The `landing_headline_test` feature flag should be configured in your PostHog dashboard
2. **Event Tracking**: Events will automatically appear in PostHog as users interact with the landing page

## Potential Improvements

### Additional Events to Track

Consider adding tracking for:
- Page scroll depth
- Time spent on page
- Clicks on other CTAs (floating CTA, bottom CTA)
- Feature section engagement
- Testimonial section views

### Additional Feature Flags

Potential A/B tests to implement:
- Hero image variations
- CTA button text variations
- Feature ordering
- Color scheme variations
- Pricing display variations

## Troubleshooting

### Common Issues

1. **Events not appearing**: Check that environment variables are properly set
2. **Feature flags not working**: Verify the flag name matches exactly in PostHog dashboard
3. **Console errors**: Ensure PostHog provider wraps the entire app

### Debugging

To debug PostHog integration:

1. Check browser console for PostHog initialization messages
2. Verify network requests to PostHog in browser dev tools
3. Test feature flags in PostHog dashboard preview mode

## Files Involved

- `src/main.tsx`: PostHog provider setup and configuration
- `src/components/Hero.tsx`: Event tracking and feature flag usage
- `package.json`: PostHog dependency declaration

## Version Information

- **PostHog JS Version**: 1.240.6
- **React Integration**: Using official PostHog React hooks
- **Environment**: Vite with environment variable support 