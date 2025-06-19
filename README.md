# 🎯 fcRivals Landing Page A/B Testing Repository

**Convert visitors faster with scientifically tested landing page variants.**

This repository enables you to create unlimited isolated landing page variants from your Lovable.dev projects and run proper A/B tests with PostHog analytics.

## 🚀 Quick Start

### Just built something on Lovable.dev? Import it in 2 minutes:

```bash
# 1. Export from Lovable.dev and extract to a folder
# 2. Import with one command (replace 'b' with your variant name)
npm run import b ./path/to/your/lovable-export
npm run verify b

# 3. Test locally
npm run dev
# Visit http://localhost:5173/b

# 4. Deploy when ready
npm run deploy
```

**→ [Complete Import Guide](./IMPORT_GUIDE.md)** - Everything you need to know about importing variants

## 🏗️ Repository Structure

```
src/
├── variants/
│   ├── a/              # Landing Page A (original, 100% protected)
│   └── [your-variant]/ # Your imported variants (b, c, mobile, etc.)
├── pages/              # Entry points for each variant
├── analytics/          # Shared PostHog tracking system
└── App.tsx            # Routing configuration
```

## 🌐 Live URLs

- **Landing Page A**: [start.fcrivals.com/a](https://start.fcrivals.com/a) (original design)
- **Your Variants**: `start.fcrivals.com/[variant-name]` (your imports)
- **Root**: [start.fcrivals.com](https://start.fcrivals.com) (redirects to A)

## 🛡️ Safety Guarantees

- **Landing Page A is 100% protected** - never affected by your variant imports
- **Complete isolation** - each variant can use different libraries, styling, components
- **Independent analytics** - separate PostHog tracking for each variant
- **Asset isolation** - no conflicts between variant assets

## 📊 Built-in Analytics

Every variant automatically tracks:
- **Experiment views** - when users land on your variant
- **CTA clicks** - conversion tracking for all call-to-action buttons  
- **Page variants** - distinguishes which landing page design users saw
- **A/B test data** - proper scientific data for conversion optimization

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run import [variant] [path]` | Import Lovable.dev project as new variant |
| `npm run verify [variant]` | Verify variant setup and analytics |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to GitHub Pages |

## 📚 Documentation

- **[→ Import Guide](./IMPORT_GUIDE.md)** - Complete guide for importing Lovable.dev projects
- **[→ Analytics Documentation](./docs/posthog-implementation.md)** - PostHog setup and tracking details
- **[→ Analytics System](./src/analytics/README.md)** - Developer guide for the analytics utilities

## 🎯 Supported Variant Types

Import any type of landing page variant:

- **A/B Testing**: `b`, `c`, `d` - different designs for the same audience
- **Device-Specific**: `mobile`, `tablet`, `desktop` - responsive variants  
- **Audience-Specific**: `consumer`, `enterprise`, `startup` - targeted messaging
- **Seasonal**: `holiday`, `blackfriday`, `summer` - time-limited campaigns
- **Geographic**: `us`, `eu`, `asia` - region-specific variants

## 🚨 Important Notes

### Assets Isolation
- **✅ DO**: Put variant assets in `src/variants/[variant]/assets/`
- **❌ DON'T**: Put variant assets in `public/` (reserved for shared files)

### Landing Page A Protection  
- **✅ SAFE**: Any changes to your variants
- **❌ FORBIDDEN**: Never modify `src/variants/a/` or files it imports

### PostHog Configuration
After importing a variant, create experiment flags in PostHog:
- **Flag names**: `LP-[variant]-*` pattern (e.g., `LP-B-headline`, `LP-B-cta`, `LP-B-features`)
- **Type**: Multivariate with `control` and `test` variants
- **Multiple tests**: Each variant can have multiple A/B tests for different elements

## 🆘 Need Help?

### Common Issues (with Cursor prompts):

**Import errors?**
```
Ask Cursor: "I'm getting import errors in my variant. Please fix all import paths to use relative imports instead of absolute imports."
```

**Images not showing?**  
```
Ask Cursor: "My images aren't displaying in my variant. Please move all assets to the correct variant directory and update import paths."
```

**Analytics not working?**
```
Ask Cursor: "PostHog analytics aren't working in my variant. Please add proper experiment tracking using the 'LP-[VARIANT]-*' naming pattern (e.g., 'LP-B-headline', 'LP-B-cta') and page variant 'page-[VARIANT]'."
```

**Build failing?**
```bash
npm run build
# Copy error message and ask:
Ask Cursor: "My build is failing with this error: [PASTE ERROR]. Please fix the issue."
```

**Emergency reset?**
```
Ask Cursor: "Something went wrong with my variant import. Please reset variant [VARIANT] back to its original empty state so I can try importing again."
```

## 🏆 Success Stories

This repository structure has enabled:
- **Fast iteration**: Import new designs in minutes, not hours
- **Scientific testing**: Proper A/B test data with isolated analytics
- **Risk-free experimentation**: Landing Page A always protected
- **Unlimited creativity**: Each variant can use completely different approaches

---

**Ready to optimize your conversion rates?** 

**→ [Start with the Import Guide](./IMPORT_GUIDE.md)**
