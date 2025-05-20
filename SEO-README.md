# SEO Optimization Guide for GiaVang247

This document provides an overview of the SEO optimizations implemented for the GiaVang247 website and instructions on how to maintain good SEO practices.

## Table of Contents

1. [SEO Implementations](#seo-implementations)
2. [SEO Components](#seo-components)
3. [SEO Utilities](#seo-utilities)
4. [SEO Scripts](#seo-scripts)
5. [Best Practices](#best-practices)
6. [Maintenance](#maintenance)

## SEO Implementations

The following SEO optimizations have been implemented:

### Meta Tags
- Title tags optimized for each page
- Meta descriptions with relevant keywords
- Canonical URLs to prevent duplicate content
- Open Graph tags for better social media sharing
- Twitter Card tags for Twitter sharing

### Structured Data
- WebSite schema for the homepage
- Article schema for blog posts
- Organization schema for the about page
- BreadcrumbList schema for navigation
- FAQPage schema for the homepage

### Technical SEO
- Optimized robots.txt file
- XML sitemap with all pages and articles
- Proper heading structure (H1, H2, H3)
- Responsive design for mobile optimization

## SEO Components

### SEO Component

A reusable SEO component has been created to manage meta tags and structured data across the site. This component uses the `react-helmet-async` library to inject SEO-related tags into the document head.

Usage:

```tsx
import SEO from "@/components/SEO";

const HomePage = () => {
  return (
    <div>
      <SEO pageName="home" />
      {/* Page content */}
    </div>
  );
};
```

For article pages, you can pass custom data:

```tsx
<SEO pageName="article" customData={{ article }} />
```

## SEO Utilities

### seo-utils.ts

This utility file contains functions for generating meta tags and structured data for different page types. It's used by the SEO component to ensure consistent SEO implementation across the site.

The `generateMetaTags` function accepts a page name and optional custom data, and returns an object with all necessary meta tags and structured data.

## SEO Scripts

### Sitemap Generator

A sitemap generator script has been created to automatically generate an XML sitemap for the website. The script scans the project for pages and articles and creates a sitemap.xml file in the public directory.

To run the sitemap generator:

```bash
npm run generate-sitemap
```

The sitemap is also automatically generated during the build process.

### SEO Checker

An SEO checker script has been created to scan the project for common SEO issues, such as missing meta tags, improper heading structure, missing alt attributes, etc.

To run the SEO checker:

```bash
npm run seo-check
```

## Best Practices

### Page Titles
- Keep titles under 60 characters
- Include primary keyword near the beginning
- Make each title unique
- Follow the format: "Primary Keyword - Secondary Keyword | Brand Name"

### Meta Descriptions
- Keep descriptions under 160 characters
- Include primary and secondary keywords
- Make each description unique and compelling
- Include a call-to-action when appropriate

### Headings
- Use only one H1 per page
- Structure headings hierarchically (H1 > H2 > H3)
- Include keywords in headings
- Make headings descriptive and meaningful

### Images
- Always include alt attributes
- Use descriptive file names
- Optimize image size for web
- Consider using WebP format for better performance

### URLs
- Keep URLs short and descriptive
- Include relevant keywords
- Use hyphens to separate words
- Avoid special characters and parameters

## Maintenance

### Regular Tasks

1. **Update Sitemap**: Run the sitemap generator whenever new pages or articles are added
   ```bash
   npm run generate-sitemap
   ```

2. **Check for SEO Issues**: Run the SEO checker regularly to identify and fix issues
   ```bash
   npm run seo-check
   ```

3. **Monitor Performance**: Use tools like Google PageSpeed Insights to monitor and improve page performance

4. **Update Content**: Regularly update content with fresh, relevant information and keywords

### Tools

- [Google Search Console](https://search.google.com/search-console) - Monitor search performance and issues
- [Google Analytics](https://analytics.google.com/) - Track user behavior and traffic sources
- [PageSpeed Insights](https://pagespeed.web.dev/) - Analyze and improve page performance
- [Schema Validator](https://validator.schema.org/) - Validate structured data
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Test mobile compatibility
