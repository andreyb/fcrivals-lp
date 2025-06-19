#!/usr/bin/env node

/**
 * Quick Import Script for Lovable.dev Projects
 * 
 * Usage: node scripts/import-variant.js [variant] [source-path]
 * Examples: 
 *   node scripts/import-variant.js b ./my-lovable-export
 *   node scripts/import-variant.js v2 ./my-lovable-export
 *   node scripts/import-variant.js mobile ./my-lovable-export
 */

const fs = require('fs');
const path = require('path');

const variant = process.argv[2]; // 'b' or 'c'
const sourcePath = process.argv[3]; // path to lovable export

if (!variant || !sourcePath) {
  console.log('❌ Usage: node scripts/import-variant.js [variant] [source-path]');
  console.log('📝 Examples:');
  console.log('   node scripts/import-variant.js b ./my-lovable-export');
  console.log('   node scripts/import-variant.js v2 ./my-lovable-export');
  console.log('   node scripts/import-variant.js mobile ./my-lovable-export');
  process.exit(1);
}

// Validate variant format (single letter/word, not 'a' which is protected)
if (variant.toLowerCase() === 'a') {
  console.log('❌ Variant "a" is protected and cannot be overwritten');
  process.exit(1);
}

if (!/^[a-z0-9]+$/i.test(variant)) {
  console.log('❌ Variant must be alphanumeric (letters and numbers only)');
  process.exit(1);
}

if (!fs.existsSync(sourcePath)) {
  console.log(`❌ Source path does not exist: ${sourcePath}`);
  process.exit(1);
}

const variantLower = variant.toLowerCase();
const variantUpper = variant.toUpperCase();

console.log(`🚀 Starting import for Landing Page ${variantUpper}...`);

// Define target directories
const targetVariantDir = `src/variants/${variantLower}`;
const targetComponentsDir = `${targetVariantDir}/components`;
const targetAssetsDir = `${targetVariantDir}/assets`;
const targetPageFile = `src/pages/LandingPage${variantUpper}.tsx`;

// Helper function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // 1. Copy components if they exist
  const sourceComponents = path.join(sourcePath, 'components');
  if (fs.existsSync(sourceComponents)) {
    console.log('📁 Copying components...');
    copyDir(sourceComponents, targetComponentsDir);
  } else {
    console.log('⚠️  No components directory found in source');
  }

  // 2. Copy assets if they exist
  const sourceAssets = path.join(sourcePath, 'assets');
  if (fs.existsSync(sourceAssets)) {
    console.log('🖼️  Copying assets...');
    copyDir(sourceAssets, targetAssetsDir);
  } else {
    console.log('⚠️  No assets directory found in source');
  }

  // 3. Look for main component file
  const possibleMainFiles = [
    'App.tsx', 'app.tsx',
    'Main.tsx', 'main.tsx', 
    'Index.tsx', 'index.tsx',
    'LandingPage.tsx', 'landingpage.tsx'
  ];

  let mainComponentFile = null;
  for (const fileName of possibleMainFiles) {
    const filePath = path.join(sourcePath, fileName);
    if (fs.existsSync(filePath)) {
      mainComponentFile = fileName;
      break;
    }
  }

  if (mainComponentFile) {
    console.log(`📄 Found main component: ${mainComponentFile}`);
    
    // Copy main component to components directory
    const mainComponentName = 'MainComponent.tsx';
    fs.copyFileSync(
      path.join(sourcePath, mainComponentFile), 
      path.join(targetComponentsDir, mainComponentName)
    );

    // Create the page entry point
    const pageContent = `import React from 'react';
import { useFeatureFlagVariantKey } from 'posthog-js/react';
import { useAnalytics } from '../analytics';
import MainComponent from '../variants/${variantLower}/components/MainComponent';

const LandingPage${variantUpper} = () => {
  const variant = useFeatureFlagVariantKey('headline-LP-${variantLower}');
  const { trackExperimentView } = useAnalytics();

  const isReady = variant !== undefined;
  const showFallback = variant === undefined;

  // Track experiment view with page context
  React.useEffect(() => {
    if (isReady) {
      trackExperimentView('headline-LP-${variantLower}', variant || 'fallback', showFallback, 'page-${variantLower}');
    }
  }, [isReady, variant, showFallback, trackExperimentView]);

  return (
    <div className="min-h-screen landing-page-${variantLower}">
      <MainComponent />
    </div>
  );
};

export default LandingPage${variantUpper};
`;

    fs.writeFileSync(targetPageFile, pageContent);
    console.log(`✅ Created page entry point: ${targetPageFile}`);
  } else {
    console.log('⚠️  No main component file found. You may need to create the entry point manually.');
  }

  console.log(`\n🎉 Import complete for Landing Page ${variantUpper}!`);
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Run: npm run dev');
  console.log(`3. Visit: http://localhost:5173/${variantLower}`);
  console.log('4. Check that everything works correctly');
  console.log('\n⚠️  You may need to:');
  console.log('- Fix import paths in your components');
  console.log('- Add missing dependencies with npm install');
  console.log('- Add CTA click tracking to your buttons');

} catch (error) {
  console.error('❌ Import failed:', error.message);
  process.exit(1);
} 