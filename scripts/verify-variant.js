#!/usr/bin/env node

/**
 * Verification Script for Imported Variants
 * 
 * Usage: node scripts/verify-variant.js [variant]
 * Examples:
 *   node scripts/verify-variant.js b
 *   node scripts/verify-variant.js v2
 *   node scripts/verify-variant.js mobile
 */

const fs = require('fs');
const path = require('path');

const variant = process.argv[2]; // 'b' or 'c'

if (!variant) {
  console.log('❌ Usage: node scripts/verify-variant.js [variant]');
  console.log('📝 Examples:');
  console.log('   node scripts/verify-variant.js b');
  console.log('   node scripts/verify-variant.js v2');
  console.log('   node scripts/verify-variant.js mobile');
  process.exit(1);
}

// Validate variant format
if (!/^[a-z0-9]+$/i.test(variant)) {
  console.log('❌ Variant must be alphanumeric (letters and numbers only)');
  process.exit(1);
}

const variantLower = variant.toLowerCase();
const variantUpper = variant.toUpperCase();

console.log(`🔍 Verifying Landing Page ${variantUpper} setup...`);

// Define paths to check
const checks = [
  {
    name: 'Page entry point',
    path: `src/pages/LandingPage${variantUpper}.tsx`,
    required: true
  },
  {
    name: 'Variant directory',
    path: `src/variants/${variantLower}`,
    required: true
  },
  {
    name: 'Components directory',
    path: `src/variants/${variantLower}/components`,
    required: true
  },
  {
    name: 'Assets directory',
    path: `src/variants/${variantLower}/assets`,
    required: false
  },
  {
    name: 'Main component',
    path: `src/variants/${variantLower}/components/MainComponent.tsx`,
    required: false
  }
];

let allRequired = true;
let warnings = [];

console.log('\n📋 Checklist:');

for (const check of checks) {
  const exists = fs.existsSync(check.path);
  const status = exists ? '✅' : (check.required ? '❌' : '⚠️');
  const message = exists ? 'Found' : (check.required ? 'MISSING' : 'Not found');
  
  console.log(`${status} ${check.name}: ${message}`);
  
  if (!exists && check.required) {
    allRequired = false;
  } else if (!exists && !check.required) {
    warnings.push(check.name);
  }
}

// Check for PostHog analytics integration
console.log('\n🔍 Checking analytics integration...');

const pageFilePath = `src/pages/LandingPage${variantUpper}.tsx`;
if (fs.existsSync(pageFilePath)) {
  const pageContent = fs.readFileSync(pageFilePath, 'utf-8');
  
  const hasPostHog = pageContent.includes('useFeatureFlagVariantKey');
  const hasAnalytics = pageContent.includes('useAnalytics');
  const hasCorrectFlag = pageContent.includes(`headline-LP-${variantLower}`);
  const hasPageTracking = pageContent.includes(`page-${variantLower}`);
  
  console.log(`${hasPostHog ? '✅' : '❌'} PostHog integration: ${hasPostHog ? 'Found' : 'MISSING'}`);
  console.log(`${hasAnalytics ? '✅' : '❌'} Analytics tracking: ${hasAnalytics ? 'Found' : 'MISSING'}`);
  console.log(`${hasCorrectFlag ? '✅' : '❌'} Correct experiment flag: ${hasCorrectFlag ? 'Found' : 'MISSING'}`);
  console.log(`${hasPageTracking ? '✅' : '❌'} Page variant tracking: ${hasPageTracking ? 'Found' : 'MISSING'}`);
  
  if (!hasPostHog || !hasAnalytics || !hasCorrectFlag || !hasPageTracking) {
    allRequired = false;
  }
} else {
  console.log('❌ Cannot check analytics - page file missing');
  allRequired = false;
}

// Final verdict
console.log('\n' + '='.repeat(50));

if (allRequired) {
  console.log('🎉 Landing Page ' + variantUpper + ' is ready!');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm run build');
  console.log('2. Run: npm run dev');
  console.log(`3. Visit: http://localhost:5173/${variantLower}`);
  console.log('4. Test all functionality');
  console.log(`5. Create PostHog flag: headline-LP-${variantLower}`);
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Optional items missing:');
    warnings.forEach(warning => console.log(`   - ${warning}`));
  }
} else {
  console.log('❌ Landing Page ' + variantUpper + ' setup is incomplete!');
  console.log('\n🔧 To fix:');
  console.log('1. Re-run the import process');
  console.log('2. Or ask Cursor to fix the missing components');
}

console.log('\n💡 Need help? Use this prompt in Cursor:');
console.log(`"Please help me fix Landing Page ${variantUpper}. Run the verification script and fix any issues it finds."`); 