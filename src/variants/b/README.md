# Landing Page B - Lovable.dev Import

This directory is reserved for Landing Page B components and assets exported from Lovable.dev.

## Import Instructions

1. **Complete Replacement**: You can completely replace the content of `src/pages/LandingPageB.tsx` with your Lovable.dev export.

2. **Component Structure**: If your export has multiple components, place them in:
   ```
   src/variants/b/
   ├── components/
   ├── hooks/
   ├── utils/
   ├── styles/
   └── assets/
   ```

3. **Isolated Dependencies**: If your variant requires specific libraries not used by Landing Page A, you can:
   - Import them in your components
   - They won't affect Landing Page A in any way

4. **Analytics Integration**: To track conversions for variant B, use experiment name: `headline-LP-b`

5. **CSS/Styling**: You can use any styling approach:
   - Different CSS frameworks
   - Different design systems
   - Completely different color schemes
   - Different component libraries

## Example Component Import

```jsx
// src/pages/LandingPageB.tsx
import React from 'react';
import HeroSection from '../variants/b/components/HeroSection';
import Features from '../variants/b/components/Features';
import CTA from '../variants/b/components/CTA';

const LandingPageB = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <CTA />
    </div>
  );
};

export default LandingPageB;
```

## PostHog Analytics

Use the experiment flag name `headline-LP-b` for this variant's analytics tracking. 