/**
 * Examples of using the refactored analytics system
 * This file demonstrates various patterns for A/B testing and experiment tracking
 */

import React from 'react';
import { 
  useExperiment, 
  useConditionalRender, 
  withConditionalRender, 
  useAnalytics 
} from './index';
import { useFeatureFlagVariantKey } from 'posthog-js/react';

// Example 1: Multiple A/B Tests in One Variant
export const MultipleTestsExample = ({ variantName = 'B' }) => {
  // Test 1: Headline A/B test
  const headlineVariant = useFeatureFlagVariantKey(`LP-${variantName}-headline`);
  
  // Test 2: CTA Button A/B test  
  const ctaVariant = useFeatureFlagVariantKey(`LP-${variantName}-cta`);
  
  // Test 3: Features A/B test
  const featuresVariant = useFeatureFlagVariantKey(`LP-${variantName}-features`);

  const { trackExperimentView, trackCTAClick } = useAnalytics();

  // Track all experiment views
  React.useEffect(() => {
    if (headlineVariant !== undefined) {
      trackExperimentView(`LP-${variantName}-headline`, headlineVariant || 'fallback', headlineVariant === undefined, `page-${variantName.toLowerCase()}`);
    }
    if (ctaVariant !== undefined) {
      trackExperimentView(`LP-${variantName}-cta`, ctaVariant || 'fallback', ctaVariant === undefined, `page-${variantName.toLowerCase()}`);
    }
    if (featuresVariant !== undefined) {
      trackExperimentView(`LP-${variantName}-features`, featuresVariant || 'fallback', featuresVariant === undefined, `page-${variantName.toLowerCase()}`);
    }
  }, [headlineVariant, ctaVariant, featuresVariant, variantName, trackExperimentView]);

  // Headlines based on test
  const getHeadline = () => {
    if (headlineVariant === 'test') {
      return 'Transform Your Business Today';
    }
    return 'Welcome to Our Platform'; // control/fallback
  };

  // CTA text based on test
  const getCTAText = () => {
    if (ctaVariant === 'test') {
      return 'Start Free Trial';
    }
    return 'Get Started'; // control/fallback
  };

  // Features layout based on test
  const getFeatureLayout = () => {
    if (featuresVariant === 'test') {
      return 'grid'; // Grid layout
    }
    return 'list'; // List layout (control/fallback)
  };

  const handleCTAClick = () => {
    trackCTAClick(`LP-${variantName}-cta`, ctaVariant || 'fallback', ctaVariant === undefined, `page-${variantName.toLowerCase()}`, {
      location: 'hero',
      text: getCTAText()
    });
    // Your CTA action here
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold">{getHeadline()}</h1>
      </section>

      <section>
        <button 
          onClick={handleCTAClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {getCTAText()}
        </button>
      </section>

      <section className={getFeatureLayout() === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-4'}>
        <div className="p-4 border rounded">Feature 1</div>
        <div className="p-4 border rounded">Feature 2</div>
        <div className="p-4 border rounded">Feature 3</div>
      </section>
    </div>
  );
};

// Example 2: Simple Headline Test (Legacy Pattern)
export const SimpleHeadlineExample = () => {
  const { value: headlineText, isReady } = useExperiment({
    flagName: 'hero-headline-test',
    variants: {
      control: 'Get started today',
      test: 'Transform your workflow'
    },
    fallback: 'Get started today'
  });

  return (
    <h1 className="text-4xl font-bold text-center">
      {isReady ? headlineText : 'Loading...'}
    </h1>
  );
};

// Example 3: Button Style Experiment
export const ButtonStyleExample = () => {
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
      onClick={() => trackComponentInteraction('cta-button', 'click', variant, showFallback, 'example-button')}
    >
      Click me
    </button>
  );
};

// Example 4: Conditional Feature Rendering
export const ConditionalFeatureExample = () => {
  const { shouldRender: showNewFeature } = useConditionalRender({
    flagName: 'new-feature-toggle',
    showWhen: 'enabled'
  });

  const { shouldRender: showPremiumFeatures } = useConditionalRender({
    flagName: 'user-tier',
    showWhen: (variant) => variant === 'premium' || variant === 'enterprise'
  });

  return (
    <div>
      <h2>Available Features</h2>
      {showNewFeature && (
        <div className="p-4 bg-blue-100 rounded">
          🆕 New Feature Available!
        </div>
      )}
      
      {showPremiumFeatures && (
        <div className="p-4 bg-gold-100 rounded">
          💎 Premium Features Unlocked
        </div>
      )}
    </div>
  );
};

// Example 5: Feature Flag Gating
export const FeatureFlagExample = () => {
  const featureExperiment = useExperiment({
    flagName: 'dashboard-version',
    variants: {
      'v1': false,
      'v2': true
    },
    fallback: false
  });

  return (
    <div>
      {featureExperiment.value ? (
        <div>New Dashboard V2</div>
      ) : (
        <div>Legacy Dashboard V1</div>
      )}
    </div>
  );
};

// Example 6: Complex Experiment with Custom Logic
export const ComplexExperimentExample = () => {
  const layoutExperiment = useExperiment({
    flagName: 'page-layout',
    variants: {
      sidebar: { layout: 'sidebar', showSidebar: true },
      topbar: { layout: 'topbar', showSidebar: false },
      minimal: { layout: 'minimal', showSidebar: false }
    },
    fallback: { layout: 'sidebar', showSidebar: true }
  });

  const { trackExperimentView, trackCustomEvent } = useAnalytics();

  // Track experiment view
  React.useEffect(() => {
    if (layoutExperiment.isReady) {
      trackExperimentView('page-layout', layoutExperiment.variant, layoutExperiment.showFallback);
    }
  }, [layoutExperiment.isReady]);

  const handleLayoutInteraction = () => {
    trackCustomEvent('layout_interaction', {
      layout_type: layoutExperiment.value.layout
    }, {
      variant: layoutExperiment.variant,
      showFallback: layoutExperiment.showFallback
    });
  };

  const layoutClasses = {
    sidebar: 'flex',
    topbar: 'flex flex-col',
    minimal: 'block'
  };

  return (
    <div 
      className={layoutClasses[layoutExperiment.value.layout]}
      onClick={handleLayoutInteraction}
    >
      Layout: {layoutExperiment.value.layout}
    </div>
  );
};

// Example 7: Quick Boolean Flag
export const QuickBooleanExample = () => {
  const quickExperiment = useExperiment({
    flagName: 'show-banner',
    variants: {
      'true': 'Special offer available!',
      'false': null
    },
    fallback: null
  });

  return (
    <div>
      {quickExperiment.isReady ? (
        quickExperiment.value
      ) : (
        'Loading...'
      )}
    </div>
  );
};

// Example 8: Component-Level Analytics
export const AnalyticsComponentExample = () => {
  const { trackCustomEvent, trackComponentInteraction } = useAnalytics();

     const handleButtonClick = () => {
     trackComponentInteraction('example-button', 'click', undefined, false, 'example-btn');
   };

  const handleFormSubmit = () => {
    trackCustomEvent('form_submission', {
      form_type: 'contact',
      page: 'examples'
    });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        Track This Click
      </button>
      
      <form onSubmit={handleFormSubmit}>
        <input type="email" placeholder="Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Example 9: HOC Conditional Rendering
const ConditionalBadge = withConditionalRender(
  { flagName: 'premium-badge', showWhen: 'enabled' },
  ({ text }: { text: string }) => <span className="badge">{text}</span>
);

export const HOCExample = () => (
  <div>
    <h2>User Profile</h2>
    <ConditionalBadge text="Premium Member" />
  </div>
);

// Example 10: Complex Multi-Element A/B Test
export const ComplexMultiElementExample = () => {
  const colorExperiment = useExperiment({
    flagName: 'brand-colors',
    variants: {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6'
    },
    fallback: '#6b7280'
  });

  return (
    <div style={{ backgroundColor: colorExperiment.value }}>
      Brand color experiment
    </div>
  );
}; 