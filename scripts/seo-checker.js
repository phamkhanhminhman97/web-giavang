#!/usr/bin/env node

/**
 * SEO Checker Script
 * 
 * This script checks for common SEO issues in the project files.
 * It scans HTML, TSX, and other relevant files for missing meta tags,
 * improper heading structure, missing alt attributes, etc.
 * 
 * Usage: node scripts/seo-checker.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const SCAN_EXTENSIONS = ['.html', '.tsx', '.jsx', '.ts', '.js'];
const EXCLUDE_DIRS = ['node_modules', 'dist', 'build', '.git', 'public/assets'];

// SEO issues to check for
const seoChecks = {
  missingTitle: {
    pattern: /<title>.*?<\/title>/i,
    message: 'Missing title tag',
    fileTypes: ['.html'],
  },
  missingMetaDescription: {
    pattern: /<meta\s+[^>]*name=["']description["'][^>]*>/i,
    message: 'Missing meta description',
    fileTypes: ['.html'],
  },
  missingAltAttributes: {
    pattern: /<img\s+[^>]*alt=["'][^"']*["'][^>]*>/i,
    inverse: true,
    message: 'Image missing alt attribute',
    fileTypes: ['.html', '.tsx', '.jsx'],
  },
  missingCanonicalLink: {
    pattern: /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    message: 'Missing canonical link',
    fileTypes: ['.html'],
  },
  missingH1: {
    pattern: /<h1[^>]*>.*?<\/h1>/i,
    message: 'Missing H1 heading',
    fileTypes: ['.html', '.tsx', '.jsx'],
  },
  multipleH1: {
    pattern: /(<h1[^>]*>.*?<\/h1>).*(<h1[^>]*>.*?<\/h1>)/is,
    message: 'Multiple H1 headings',
    fileTypes: ['.html', '.tsx', '.jsx'],
  },
  emptyHeadings: {
    pattern: /<h[1-6][^>]*>\s*<\/h[1-6]>/i,
    message: 'Empty heading',
    fileTypes: ['.html', '.tsx', '.jsx'],
  },
  missingLangAttribute: {
    pattern: /<html\s+[^>]*lang=["'][^"']*["'][^>]*>/i,
    message: 'Missing lang attribute on html tag',
    fileTypes: ['.html'],
  },
  missingViewport: {
    pattern: /<meta\s+[^>]*name=["']viewport["'][^>]*>/i,
    message: 'Missing viewport meta tag',
    fileTypes: ['.html'],
  },
  missingStructuredData: {
    pattern: /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>/i,
    message: 'Missing structured data',
    fileTypes: ['.html'],
  },
  missingOpenGraph: {
    pattern: /<meta\s+[^>]*property=["']og:[^"']*["'][^>]*>/i,
    message: 'Missing Open Graph meta tags',
    fileTypes: ['.html'],
  },
  missingTwitterCard: {
    pattern: /<meta\s+[^>]*name=["']twitter:[^"']*["'][^>]*>/i,
    message: 'Missing Twitter Card meta tags',
    fileTypes: ['.html'],
  },
};

// React component checks
const reactChecks = {
  missingSEOComponent: {
    pattern: /<SEO\s+[^>]*\/>/i,
    message: 'Missing SEO component',
    fileTypes: ['.tsx', '.jsx'],
    excludeFiles: ['SEO.tsx', 'SEO.jsx'],
  },
  missingHelmet: {
    pattern: /<Helmet>.*?<\/Helmet>/is,
    message: 'Missing Helmet component',
    fileTypes: ['.tsx', '.jsx'],
    excludeFiles: ['SEO.tsx', 'SEO.jsx'],
  },
};

// Helper function to check if a file should be excluded
const shouldExcludeFile = (filePath, check) => {
  if (!check.excludeFiles) return false;
  const fileName = path.basename(filePath);
  return check.excludeFiles.some(excludeFile => fileName === excludeFile);
};

// Helper function to check if a directory should be excluded
const shouldExcludeDir = (dirPath) => {
  const dirName = path.basename(dirPath);
  return EXCLUDE_DIRS.includes(dirName);
};

// Helper function to check if a file extension should be scanned
const shouldScanExtension = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  return SCAN_EXTENSIONS.includes(ext);
};

// Function to scan a file for SEO issues
async function scanFile(filePath) {
  try {
    const content = await readFileAsync(filePath, 'utf8');
    const ext = path.extname(filePath).toLowerCase();
    const issues = [];

    // Check for general SEO issues
    Object.entries(seoChecks).forEach(([checkName, check]) => {
      if (check.fileTypes.includes(ext)) {
        const hasPattern = check.pattern.test(content);
        if ((check.inverse && hasPattern) || (!check.inverse && !hasPattern)) {
          issues.push({
            check: checkName,
            message: check.message,
            filePath: path.relative(PROJECT_ROOT, filePath),
          });
        }
      }
    });

    // Check for React-specific issues
    if (ext === '.tsx' || ext === '.jsx') {
      Object.entries(reactChecks).forEach(([checkName, check]) => {
        if (check.fileTypes.includes(ext) && !shouldExcludeFile(filePath, check)) {
          const hasPattern = check.pattern.test(content);
          if (!hasPattern) {
            issues.push({
              check: checkName,
              message: check.message,
              filePath: path.relative(PROJECT_ROOT, filePath),
            });
          }
        }
      });
    }

    return issues;
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error);
    return [];
  }
}

// Function to recursively scan directories
async function scanDirectory(dirPath) {
  try {
    const entries = await readdirAsync(dirPath);
    let issues = [];

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry);
      const stats = await statAsync(entryPath);

      if (stats.isDirectory()) {
        if (!shouldExcludeDir(entryPath)) {
          const subDirIssues = await scanDirectory(entryPath);
          issues = [...issues, ...subDirIssues];
        }
      } else if (stats.isFile() && shouldScanExtension(entryPath)) {
        const fileIssues = await scanFile(entryPath);
        issues = [...issues, ...fileIssues];
      }
    }

    return issues;
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

// Main function
async function main() {
  console.log('🔍 Starting SEO check...');
  
  try {
    // Scan the src directory
    const srcPath = path.join(PROJECT_ROOT, 'src');
    const srcIssues = await scanDirectory(srcPath);
    
    // Scan the public directory
    const publicPath = path.join(PROJECT_ROOT, 'public');
    const publicIssues = await scanDirectory(publicPath);
    
    // Combine all issues
    const allIssues = [...srcIssues, ...publicIssues];
    
    // Group issues by file
    const issuesByFile = {};
    allIssues.forEach(issue => {
      if (!issuesByFile[issue.filePath]) {
        issuesByFile[issue.filePath] = [];
      }
      issuesByFile[issue.filePath].push(issue);
    });
    
    // Print results
    console.log('\n📊 SEO Check Results:');
    console.log('====================\n');
    
    if (Object.keys(issuesByFile).length === 0) {
      console.log('✅ No SEO issues found!');
    } else {
      console.log(`❌ Found ${allIssues.length} SEO issues in ${Object.keys(issuesByFile).length} files:\n`);
      
      Object.entries(issuesByFile).forEach(([filePath, issues]) => {
        console.log(`📄 ${filePath}:`);
        issues.forEach(issue => {
          console.log(`  - ${issue.message}`);
        });
        console.log('');
      });
      
      console.log('🔧 Recommendations:');
      console.log('1. Add missing meta tags for better search engine visibility');
      console.log('2. Ensure all images have descriptive alt attributes');
      console.log('3. Use proper heading structure (one H1 per page)');
      console.log('4. Add structured data for rich search results');
      console.log('5. Include Open Graph and Twitter Card meta tags for social sharing');
    }
    
  } catch (error) {
    console.error('Error during SEO check:', error);
    process.exit(1);
  }
}

// Run the main function
main();
