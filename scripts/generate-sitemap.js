#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file for the GiaVang247 website.
 * It includes all static pages and dynamically generated article pages.
 * 
 * Usage: node generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://giavang247.online';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Get current date in YYYY-MM-DD format
const currentDate = format(new Date(), 'yyyy-MM-dd');

// Import articles data
const articlesPath = path.join(__dirname, '../src/data/articles.ts');
let articles = [];

try {
  // Read the articles file content
  const articlesContent = fs.readFileSync(articlesPath, 'utf8');
  
  // Extract article IDs using regex (simple approach)
  const articleMatches = articlesContent.match(/id:\s*(\d+)/g) || [];
  articles = articleMatches.map(match => {
    const id = match.replace(/id:\s*/, '');
    return { id };
  });
  
  console.log(`Found ${articles.length} articles`);
} catch (error) {
  console.error('Error reading articles data:', error);
}

// Define static pages with their change frequency and priority
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/phan-tich', changefreq: 'daily', priority: '0.9' },
  { url: '/gioi-thieu', changefreq: 'monthly', priority: '0.7' },
  { url: '/lien-he', changefreq: 'monthly', priority: '0.7' },
  { url: '/dieu-khoan', changefreq: 'yearly', priority: '0.5' },
  { url: '/bao-mat', changefreq: 'yearly', priority: '0.5' },
  { url: '/faq', changefreq: 'yearly', priority: '0.5' },
  { url: '/help', changefreq: 'yearly', priority: '0.5' },
  { url: '/mien-tru', changefreq: 'yearly', priority: '0.5' },
];

// Generate sitemap XML content
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
`;

    // Add image data for specific pages
    if (page.url === '/phan-tich') {
      sitemap += `    <image:image>
      <image:loc>${SITE_URL}/logo.png</image:loc>
      <image:caption>Phân tích giá vàng</image:caption>
    </image:image>
`;
    }

    sitemap += `  </url>
`;
  });

  // Add article pages
  articles.forEach(article => {
    sitemap += `  <url>
    <loc>${SITE_URL}/phan-tich/bai-viet/${article.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  sitemap += `</urlset>
`;

  return sitemap;
}

// Write sitemap to file
try {
  const sitemap = generateSitemap();
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap generated successfully at ${OUTPUT_PATH}`);
} catch (error) {
  console.error('Error generating sitemap:', error);
}
