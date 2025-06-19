# Analytics System

A clean, reusable, and type-safe analytics system built on top of PostHog for A/B testing, feature flags, and event tracking.

## Architecture Overview

The analytics system is designed with separation of concerns in mind:

- **Components** remain analytics-agnostic and use simple hooks
- **Analytics logic** is centralized in dedicated utilities
- **Type safety** throughout with TypeScript interfaces
- **Simple fallback logic** for reliable A/B testing
- **Centralized configuration** for PostHog setup and environment handling

## 📁 Files Structure

```
src/analytics/
├── config.ts                  # PostHog configuration and environment setup
├── provider.tsx               # React component for wrapping apps with analytics
├── tracking.ts                # Event tracking utilities and hooks
├── useExperiment.ts           # Generic A/B testing hook
├── useHeadlineVariant.ts      # Legacy headline hook (deprecated)
├── useConditionalRender.ts    # Conditional rendering utilities
├── examples.tsx               # Usage examples and patterns
├── index.ts                   # Main exports
└── README.md                  # This documentation
```

## 🚀 Quick Setup

### Option 1: Direct PostHog Setup (Current)
```tsx
// src/main.tsx
import { PostHogProvider } from 'posthog-js/react';
import { POSTHOG_KEY, getPostHogOptions, isPostHogConfigured } from './analytics/config';

if (isPostHogConfigured()) {
    root.render(
        <PostHogProvider apiKey={POSTHOG_KEY} options={getPostHogOptions()}>
            <App />
        </PostHogProvider>
    );
}
```

### Option 2: Using AnalyticsProvider Component
```tsx
// src/main.tsx
import { AnalyticsProvider } from './analytics';

root.render(
    <AnalyticsProvider debug={import.meta.env.DEV}>
        <App />
    </AnalyticsProvider>
);
```

## Core Utilities

### 1. `useFeatureFlagVariantKey` - Simple A/B Testing

The recommended approach for A/B testing with simple fallback logic.

```tsx
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { useAnalytics } from '@/analytics';

const MyComponent = () => {
  const variant = useFeatureFlagVariantKey('headline-LP-a');
  const { trackExperimentView } = useAnalytics();

  // Simple fallback logic
  const getHeadlineText = () => {
    if (variant === 'test') {
      return 'Track your wins.';
    }
    return 'Prove you run the group.'; // control/fallback
  };

  const headlineText = getHeadlineText();
  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track experiment view
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('headline-LP-a', variant || 'fallback', showFallback, 'page-a');
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  return <h1>{headlineText}</h1>;
};
```

**Benefits:**
- **Simple**: Direct PostHog hook usage with fallback logic
- **Reliable**: No complex state management or timeouts
- **Clear**: Explicit control/test logic that's easy to understand
- **Page tracking**: Includes which landing page variant the user is on

### 2. `useConditionalRender` - Show/Hide Elements

For conditionally rendering components based on feature flags.

```tsx
import { useConditionalRender } from '@/analytics';

// Simple variant matching
const { shouldRender } = useConditionalRender({
  flagName: 'new-feature',
  showWhen: 'enabled'
});

// Boolean flag
const { shouldRender } = useConditionalRender({
  flagName: 'premium-features',
  showWhen: true
});

// Custom logic
const { shouldRender } = useConditionalRender({
  flagName: 'user-tier',
  showWhen: (variant) => variant === 'premium' || variant === 'vip'
});

return (
  <div>
    {shouldRender && <PremiumFeature />}
  </div>
);
```

### 3. `withConditionalRender` - HOC Pattern

Higher-order component for wrapping components with conditional rendering.

```tsx
import { withConditionalRender } from '@/analytics';

const ConditionalFeature = withConditionalRender(
  { flagName: 'beta-feature', showWhen: 'enabled' },
  ({ title }) => <div>{title}</div>
);

// Usage
<ConditionalFeature title="Beta Feature" />
```

### 4. `useAnalytics` - Event Tracking

Type-safe event tracking with experiment and page variant context.

```tsx
import { useAnalytics } from '@/analytics';

const { 
  trackCTAClick, 
  trackExperimentView, 
  trackComponentInteraction,
  trackCustomEvent 
} = useAnalytics();

// CTA tracking with page context
trackCTAClick('headline-LP-a', variant || 'fallback', showFallback, 'page-a', {
  location: 'hero',
  text: 'Join Free'
});

// Experiment view tracking with page context
trackExperimentView('headline-LP-a', variant || 'fallback', showFallback, 'page-a');

// Component interaction tracking
trackComponentInteraction('button', 'click', variant, showFallback, 'primary-cta', 'page-a');

// Custom events with page context
trackCustomEvent('user_engagement', {
  action: 'scroll',
  depth: '50%',
  page_variant: 'page-a'
}, { variant, showFallback });
```

## 🔧 Configuration Management

### Environment Variables
```bash
VITE_PUBLIC_POSTHOG_KEY=your_posthog_project_key
VITE_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

### Configuration Functions
```tsx
import { 
  isPostHogConfigured, 
  getConfigSummary, 
  getBootstrapFlags 
} from '@/analytics/config';

// Check if analytics is properly set up
if (isPostHogConfigured()) {
  console.log('Analytics ready!');
}

// Debug configuration
console.log(getConfigSummary());
// Output: { hasKey: true, apiHost: "https://eu.i.posthog.com", hasCachedFlags: true, environment: "development" }

// Get cached flags for returning visitors
const bootstrapFlags = getBootstrapFlags();
```

## Usage Patterns

### Pattern 1: Simple Text A/B Test (Recommended)

```tsx
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { useAnalytics } from '@/analytics';

const HeaderComponent = ({ pageVariant }) => {
  const variant = useFeatureFlagVariantKey('headline-LP-a');
  const { trackExperimentView } = useAnalytics();

  // Simple fallback logic
  const getHeadlineText = () => {
    if (variant === 'test') {
      return 'Transform your workflow';
    }
    return 'Welcome to our app'; // control/fallback
  };

  const headlineText = getHeadlineText();
  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track experiment view with page context
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('headline-LP-a', variant || 'fallback', showFallback, pageVariant);
    }
  }, [isReady, variant, showFallback, trackExperimentView, pageVariant]);

  return (
    <h1>
      {isReady ? headlineText : 'Loading...'}
    </h1>
  );
};
```

### Pattern 2: Style/Layout Experiments

```tsx
const ButtonComponent = () => {
  const { 
    value: buttonStyle, 
    variant, 
    showFallback 
  } = useExperiment({
    flagName: 'button-design',
    variants: {
      rounded: { borderRadius: '12px', padding: '12px 24px' },
      square: { borderRadius: '0px', padding: '16px 32px' },
      pill: { borderRadius: '999px', padding: '10px 20px' }
    },
    fallback: { borderRadius: '6px', padding: '12px 24px' }
  });

  const { trackComponentInteraction } = useAnalytics();

  return (
    <button 
      style={buttonStyle}
      onClick={() => trackComponentInteraction('cta-button', 'click', variant, showFallback)}
    >
      Click me
    </button>
  );
};
```

### Pattern 3: Feature Flag Gating

```tsx
const DashboardComponent = () => {
  const { value: isNewDashboard } = useExperiment({
    flagName: 'new-dashboard',
    variants: { 'true': true, 'false': false },
    fallback: false
  });

  return (
    <div>
      {isNewDashboard ? (
        <NewDashboardUI />
      ) : (
        <LegacyDashboardUI />
      )}
    </div>
  );
};
```

### Pattern 4: Conditional Element Rendering

```tsx
const ProfileComponent = () => {
  const { shouldRender: showBadge } = useConditionalRender({
    flagName: 'premium-badge',
    showWhen: 'enabled'
  });

  const { shouldRender: showNewFeatures } = useConditionalRender({
    flagName: 'user-tier',
    showWhen: (variant) => variant === 'premium' || variant === 'enterprise'
  });

  return (
    <div>
      <h2>User Profile</h2>
      {showBadge && <PremiumBadge />}
      {showNewFeatures && <AdvancedFeatures />}
    </div>
  );
};
```

### Pattern 5: Complex Multi-Element Experiments

```tsx
const LandingPageComponent = () => {
  const { 
    value: layout, 
    variant, 
    showFallback, 
    isReady 
  } = useExperiment({
    flagName: 'landing-layout',
    variants: {
      hero_focused: {
        heroHeight: '90vh',
        showTestimonials: true,
        ctaColor: '#3b82f6'
      },
      feature_focused: {
        heroHeight: '60vh', 
        showTestimonials: false,
        ctaColor: '#10b981'
      }
    },
    fallback: {
      heroHeight: '80vh',
      showTestimonials: true, 
      ctaColor: '#6b7280'
    }
  });

  const { trackExperimentView } = useAnalytics();

  useEffect(() => {
    if (isReady) {
      trackExperimentView('landing-layout', variant, showFallback);
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  return (
    <div>
      <section style={{ height: layout.heroHeight }}>
        Hero Section
        <button style={{ backgroundColor: layout.ctaColor }}>
          Get Started
        </button>
      </section>
      
      {layout.showTestimonials && (
        <TestimonialsSection />
      )}
    </div>
  );
};
```

## Event Tracking Types

### Built-in Event Types

```tsx
// CTA Click Events
interface CTAClickEvent {
  variant?: string | boolean | 'fallback';
  is_returning_visitor?: boolean;
  cta_location?: string;
  cta_text?: string;
}

// Experiment View Events  
interface ExperimentViewEvent {
  experiment_name: string;
  variant?: string | boolean | 'fallback';
  is_returning_visitor?: boolean;
  view_timestamp: number;
}

// Component Interaction Events
interface ComponentInteractionEvent {
  component_name: string;
  interaction_type: 'click' | 'hover' | 'scroll' | 'focus' | 'view';
  element_id?: string;
  variant?: string | boolean | 'fallback';
  is_returning_visitor?: boolean;
}
```

### Custom Event Tracking

```tsx
const { trackCustomEvent } = useAnalytics();

// Custom events without experiment context
trackCustomEvent('user_signup', {
  method: 'email',
  plan: 'free'
});

// Custom events with experiment context
trackCustomEvent('feature_usage', {
  feature: 'advanced_search',
  usage_count: 5
}, {
  variant: experimentVariant,
  showFallback: experimentFallback
});
```

## Best Practices

### 1. Always Handle Loading States

```tsx
// ✅ Good
{experiment.isReady ? experiment.value : 'Loading...'}

// ❌ Bad - can cause layout shifts
{experiment.value}
```

### 2. Use Anti-Flicker Patterns

```tsx
// ✅ Good - reserves space
<span style={{ minHeight: '1.2em', display: 'inline-block' }}>
  {experiment.isReady ? (
    experiment.value
  ) : (
    <span style={{ visibility: 'hidden' }}>Fallback text</span>
  )}
</span>
```

### 3. Track Experiment Views

```tsx
// ✅ Always track when variants are shown
useEffect(() => {
  if (experiment.isReady) {
    trackExperimentView('experiment-name', experiment.variant, experiment.showFallback);
  }
}, [experiment.isReady]);
```

### 4. Use TypeScript for Type Safety

```tsx
// ✅ Define your variant types
interface ButtonVariant {
  color: string;
  size: 'sm' | 'md' | 'lg';
}

const buttonExperiment = useExperiment<ButtonVariant>({
  flagName: 'button-style',
  variants: {
    control: { color: 'blue', size: 'md' },
    test: { color: 'green', size: 'lg' }
  },
  fallback: { color: 'blue', size: 'md' }
});
```

### 5. Consistent Naming Conventions

```tsx
// ✅ Use descriptive flag names
flagName: 'hero-headline-test'
flagName: 'checkout-button-style' 
flagName: 'premium-features-enabled'

// ❌ Avoid generic names  
flagName: 'test1'
flagName: 'experiment'
```

## Migration from Legacy Hooks

If you have existing `useHeadlineVariant` usage, you can migrate to the generic system:

```tsx
// Old way
const { text, variant, isReady, showFallback } = useHeadlineVariant();

// New way  
const headline = useExperiment({
  flagName: 'headline',
  variants: {
    control: 'Prove you run the group.',
    test: 'Track your wins.'
  },
  fallback: 'Prove you run the group.'
});

// Access the same data
const text = headline.value;
const variant = headline.variant;
const isReady = headline.isReady;
const showFallback = headline.showFallback;
```

## Configuration Debug Tools

### Debug Analytics Setup
```tsx
import { getConfigSummary, isPostHogConfigured } from '@/analytics/config';

// Check configuration
console.log('Analytics configured:', isPostHogConfigured());
console.log('Config details:', getConfigSummary());

// Use AnalyticsProvider with debug mode
<AnalyticsProvider debug={true}>
  <App />
</AnalyticsProvider>
```

### Environment Validation
```tsx
// Validate environment variables are set
const config = getConfigSummary();
if (!config.hasKey) {
  console.error('VITE_PUBLIC_POSTHOG_KEY is not set');
}
```

## Performance Notes

- **First-time visitors**: ~200ms delay for flag loading
- **Returning visitors**: Instant flag availability (cached in localStorage)
- **Timeout fallback**: Ensures content always shows within 5 seconds
- **Anti-flicker**: Layout-stable loading states prevent visual shifts
- **Configuration caching**: Bootstrap flags improve perceived performance

This system provides a clean, scalable foundation for any type of A/B testing or feature flagging needs while maintaining excellent performance and user experience. 