# 🚀 Complete Import Guide for New Landing Page Variants

**Business Goal**: Quickly import and test new landing page variants for conversion rate optimization while maintaining complete isolation and automated analytics tracking.

## 📋 What This Repository Does

This repository supports **unlimited isolated landing page variants** for A/B testing conversion rates:

- **Landing Page A**: Original design (100% PROTECTED)
- **Your Variants**: Any number of new variants (b, c, v2, mobile, dark, enterprise, etc.)
- **Complete Isolation**: Each variant can use different libraries, styling, components
- **Automated Analytics**: PostHog tracking with proper experiment separation
- **One-Command Import**: Automated scripts handle file organization and analytics setup

## 🎯 Quick Import (2 Minutes)

**Just finished building on Lovable.dev? Import it in 2 minutes:**

### Step 1: Export from Lovable.dev
1. In Lovable.dev, click **"Export"** or **"Download"**
2. Download the ZIP file and extract it to a folder

### Step 2: Import with One Command
```bash
# Replace 'b' with your chosen variant name and update the path
npm run import b ./path/to/your/lovable-export
npm run verify b
```

**⚡ AI Agent Alternative - Let AI Handle Everything:**
If you prefer to have an AI agent guide you through the entire process, just copy-paste this prompt to your AI assistant:

```
I just exported a project from Lovable.dev and want to import it as a new landing page variant. Please help me:

1. Import my Lovable.dev project as variant "[VARIANT_NAME]" from the path "[PATH_TO_EXPORT]"
2. Run the import command: npm run import [VARIANT_NAME] [PATH_TO_EXPORT]  
3. Verify the import worked: npm run verify [VARIANT_NAME]
4. Fix any import path issues by converting absolute imports to relative imports
5. Fix any asset path issues by ensuring assets are in the variant's assets directory
6. Add proper PostHog analytics tracking with experiment names "LP-[VARIANT_NAME]-*" pattern (e.g., "LP-B-headline", "LP-B-cta") and page variant "page-[VARIANT_NAME]"
7. Test the variant locally and make sure it builds successfully
8. Guide me through creating the PostHog experiment flag in the dashboard
9. Verify analytics are working by checking browser console for events

Please walk me through each step and help troubleshoot any issues that come up. I want the variant to be completely isolated and working with proper conversion tracking.

Replace [VARIANT_NAME] with: YOUR_VARIANT_NAME
Replace [PATH_TO_EXPORT] with: ./path/to/your/lovable-export

Note: You can test multiple elements per variant using the LP-[VARIANT]-* naming pattern:
- LP-B-headline, LP-B-cta, LP-B-features, etc.
```

*If you use this AI prompt, you can skip to Step 4 (Deploy) as the AI will handle Steps 3 and everything in the Advanced Manual Import section.*

### Step 3: Test Your Variant
```bash
npm run build && npm run dev
# Visit http://localhost:5173/b (or your variant name)
```

### Step 4: Deploy
```bash
npm run deploy
# Your variant will be live at https://start.fcrivals.com/b
```

**That's it!** Your Lovable.dev project is now live as an isolated landing page variant with full analytics tracking.

## 🏗️ What Happens During Import

### Repository Structure Created
```
src/
├── variants/
│   ├── a/                    # Landing Page A (PROTECTED - never touch)
│   └── [your-variant]/       # Your imported variant
│       ├── components/       # All your Lovable.dev components
│       ├── assets/          # All your images/assets (isolated)
│       └── hooks/           # Any custom hooks
├── pages/
│   ├── LandingPageA.tsx     # Original (PROTECTED)
│   └── LandingPage[X].tsx   # Auto-generated entry point for your variant
├── analytics/               # Shared PostHog system (tracks all variants separately)
└── App.tsx                  # Auto-updated routing
```

### Analytics Integration Added
- **Experiment Flags**: `LP-[variant]-*` naming pattern (e.g., `LP-B-headline`, `LP-B-cta`, `LP-mobile-features`)
- **Page Tracking**: `page-[variant]` (e.g., `page-b`, `page-mobile`)
- **Conversion Tracking**: Automatic CTA click tracking
- **View Tracking**: Automatic experiment view tracking
- **Multiple Tests**: Each variant can have multiple A/B tests for different elements

### Routes Created
- **Your variant**: `https://start.fcrivals.com/[variant-name]`
- **Landing Page A**: `https://start.fcrivals.com/a` (unchanged)
- **Root**: `https://start.fcrivals.com/` (redirects to A)

## 🔧 Advanced Manual Import

<details>
<summary>Click if the automated import doesn't work or you need more control</summary>

### Manual Step-by-Step Process

1. **Export from Lovable.dev**
   - Download all files from your Lovable.dev project
   - Extract to a local folder

2. **Create Variant Structure**
   ```bash
   mkdir -p src/variants/[your-variant]/components
   mkdir -p src/variants/[your-variant]/assets
   mkdir -p src/variants/[your-variant]/hooks
   ```

3. **Copy Your Files**
   ```bash
   # Copy components
   cp -r your-lovable-export/components/* src/variants/[your-variant]/components/
   
   # Copy assets (NEVER put in public/ - use variant-specific directory)
   cp -r your-lovable-export/assets/* src/variants/[your-variant]/assets/
   
   # Copy any other files
   cp -r your-lovable-export/hooks/* src/variants/[your-variant]/hooks/
   ```

4. **Create Page Entry Point**
   Create `src/pages/LandingPage[YourVariant].tsx`:
   ```tsx
   import React from 'react';
   import { useFeatureFlagVariantKey } from 'posthog-js/react';
   import { useAnalytics } from '../analytics';
   import MainComponent from '../variants/[your-variant]/components/MainComponent';

   const LandingPage[YourVariant] = () => {
     const variant = useFeatureFlagVariantKey('headline-LP-[your-variant]');
     const { trackExperimentView } = useAnalytics();

     const isReady = variant !== undefined;
     const showFallback = variant === undefined;

     // Track experiment view with page context
     React.useEffect(() => {
       if (isReady) {
         trackExperimentView('headline-LP-[your-variant]', variant || 'fallback', showFallback, 'page-[your-variant]');
       }
     }, [isReady, variant, showFallback, trackExperimentView]);

     return (
       <div className="min-h-screen landing-page-[your-variant]">
         <MainComponent />
       </div>
     );
   };

   export default LandingPage[YourVariant];
   ```

5. **Fix Import Paths**
   Update your components to use relative imports:
   ```tsx
   // Change from:
   import { Button } from '@/components/ui/button';
   import heroImage from '@/assets/hero.png';

   // Change to:
   import { Button } from './ui/button';
   import heroImage from '../assets/hero.png';
   ```

6. **Add CTA Tracking**
   Add conversion tracking to your main CTA buttons:
   ```tsx
   const { trackCTAClick } = useAnalytics();
   const variant = useFeatureFlagVariantKey('LP-[your-variant]-cta');

   const handleCTAClick = () => {
     trackCTAClick('LP-[your-variant]-cta', variant || 'fallback', variant === undefined, 'page-[your-variant]', {
       location: 'hero',
       text: 'Your CTA Text'
     });
     // Your original CTA action
   };
   ```

7. **Add Route to App.tsx**
   Add your route to the routing configuration:
   ```tsx
   <Route path="/[your-variant]" element={<LandingPage[YourVariant] />} />
   ```

</details>

## 🛡️ Safety & Isolation Guarantees

### ✅ Complete Protection
- **Landing Page A is 100% protected** - never affected by your changes
- **Each variant is isolated** - can use different libraries, frameworks, styling
- **No conflicts** - variants can use different versions of same packages
- **Independent deployment** - variants deploy separately

### ✅ Asset Isolation
- **Variant-specific assets**: Each variant has its own `assets/` directory
- **No shared assets**: Never put variant assets in `public/` (reserved for favicon, robots.txt)
- **No conflicts**: Different variants can have same-named files without issues

### ✅ Analytics Separation
- **Separate experiment flags**: Each variant gets its own PostHog flag
- **Separate conversion tracking**: No cross-contamination of analytics data
- **Page variant tracking**: Every event includes which landing page variant

## 📊 PostHog Configuration

After import, create experiment flags in PostHog:

1. Go to your PostHog dashboard → "Feature Flags"
2. Create flags following the `LP-[variant]-[element]` pattern:
   - **Headline test**: `LP-B-headline`, `LP-mobile-headline`, etc.
   - **CTA test**: `LP-B-cta`, `LP-mobile-cta`, etc.
   - **Feature test**: `LP-B-features`, `LP-mobile-features`, etc.
3. For each flag:
   - **Type**: Multivariate
   - **Variants**: `control` (50%), `test` (50%)
4. Save and activate the flags

Your conversion tracking will then be live!

## 🔍 Verification Checklist

Run this command to verify everything is working:
```bash
npm run verify [your-variant]
```

**Manual Checklist:**
- [ ] Page loads without errors at `http://localhost:5173/[your-variant]`
- [ ] All images/assets display correctly
- [ ] All interactive elements work (buttons, forms, etc.)
- [ ] Page is responsive on mobile
- [ ] Open DevTools → Console → See PostHog events when page loads
- [ ] Click main CTA → See CTA click event in console
- [ ] Landing Page A still works at `http://localhost:5173/a`
- [ ] Build succeeds: `npm run build`

## 🆘 Common Issues & Solutions

### ❌ "Module not found" errors
```bash
# Ask Cursor to fix import paths
Ask Cursor: "I'm getting module not found errors in my variant. Please fix all import paths to use relative imports instead of absolute imports."
```

### ❌ Images not displaying
```bash
# Ask Cursor to fix asset paths
Ask Cursor: "My images aren't showing in my variant. Please move all assets to the correct variant assets directory and update the import paths."
```

### ❌ Styling conflicts
```bash
# Ask Cursor to isolate styles
Ask Cursor: "My styles are conflicting with the existing site. Please help me isolate my variant's styles so they don't affect other pages."
```

### ❌ Build fails
```bash
npm run build
# Copy the error message and ask Cursor to fix it
Ask Cursor: "My build is failing with this error: [PASTE ERROR]. Please fix the issue."
```

### ❌ Analytics not tracking
```bash
Ask Cursor: "PostHog analytics aren't working in my variant. Please add proper experiment tracking using the 'LP-[VARIANT]-*' naming pattern (e.g., 'LP-B-headline', 'LP-B-cta') and page variant 'page-[VARIANT]'."
```

### 📞 Emergency Reset
If something goes wrong and you want to start over:
```bash
Ask Cursor: "Something went wrong with my variant import. Please reset variant [VARIANT] back to its original empty state so I can try importing again."
```

## 🎯 Variant Naming Examples

You can use any alphanumeric variant name (except 'a' which is protected):

- **Basic**: `b`, `c`, `d`
- **Versioned**: `v2`, `v3`, `v4`
- **Descriptive**: `mobile`, `desktop`, `dark`, `light`
- **Audience**: `consumer`, `enterprise`, `startup`
- **Seasonal**: `holiday`, `summer`, `blackfriday`
- **Geographic**: `us`, `eu`, `asia`

## 🚀 Automated Features

### What the Import Script Does
1. **Auto-detects** your main component file
2. **Auto-copies** all components to the correct directory
3. **Auto-copies** all assets to isolated variant directory
4. **Auto-generates** the page entry point with proper analytics
5. **Auto-configures** PostHog experiment tracking
6. **Auto-validates** the import was successful

### What You Still Need to Do
1. **Install dependencies** if your Lovable.dev project needs additional packages
2. **Fix import paths** if the auto-detection misses some
3. **Create PostHog flag** in your dashboard
4. **Test thoroughly** before deploying

## 💡 Pro Tips

1. **Save this command**: `npm run import [variant] [path]` - you'll use it for every new variant
2. **Always verify first**: Use `npm run verify [variant]` before deploying
3. **Test locally first**: Don't deploy until the verification checklist passes
4. **One variant at a time**: Don't import multiple variants simultaneously
5. **Keep exports**: Save your Lovable.dev exports in case you need to re-import

---

**🎉 That's it! Your Lovable.dev project should now be live as an isolated landing page variant with proper analytics tracking and conversion measurement.** 