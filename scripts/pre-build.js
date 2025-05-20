#!/usr/bin/env node

/**
 * Pre-build Script
 * 
 * This script runs before the build process to ensure all necessary
 * pre-build tasks are completed, such as generating the sitemap.
 * 
 * Usage: node scripts/pre-build.js
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Running pre-build tasks...');

// Ensure the scripts directory exists
const scriptsDir = __dirname;
if (!fs.existsSync(scriptsDir)) {
  console.error(`❌ Scripts directory not found: ${scriptsDir}`);
  process.exit(1);
}

try {
  // Generate sitemap
  console.log('📝 Generating sitemap...');
  execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
  console.log('✅ Sitemap generated successfully');

  // Run SEO check
  console.log('🔍 Running SEO check...');
  execSync('node scripts/seo-checker.js', { stdio: 'inherit' });
  console.log('✅ SEO check completed');
  
  // Add more pre-build tasks here as needed
  
  console.log('✅ All pre-build tasks completed successfully');
} catch (error) {
  console.error('❌ Pre-build tasks failed:', error.message);
  process.exit(1);
}
