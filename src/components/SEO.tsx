import { Helmet } from 'react-helmet-async';
import { generateMetaTags } from '@/utils/seo-utils';

interface SEOProps {
  pageName: string;
  customData?: any;
  additionalKeywords?: string;
  relatedContent?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  videoContent?: {
    url: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    duration?: string; // ISO 8601 format
  };
}

/**
 * Enhanced SEO Component
 * 
 * This component handles all SEO-related meta tags and structured data for a page.
 * It uses the generateMetaTags utility to generate the appropriate meta tags and structured data
 * based on the page name and any custom data provided.
 * 
 * Enhanced features:
 * - Support for high-volume search keywords
 * - Mobile optimization meta tags
 * - Rich media (image and video) optimization
 * - Related content discovery
 * - Comprehensive structured data
 * 
 * @param pageName The name of the page (e.g., 'home', 'phan-tich', 'article', etc.)
 * @param customData Any custom data needed for the page (e.g., article data for article pages)
 * @param additionalKeywords Additional keywords to enhance SEO (comma-separated)
 * @param relatedContent Array of related content objects with title, url, and optional description
 * @param featuredImage Featured image details for rich snippets
 * @param videoContent Video content details for video rich snippets
 */
const SEO = ({ 
  pageName, 
  customData, 
  additionalKeywords = '',
  relatedContent = [],
  featuredImage,
  videoContent
}: SEOProps) => {
  // Enhance keywords with high-volume search terms based on Google Trends and Search Console insights
  const highVolumeKeywords = 'giá vàng hôm nay, giá vàng SJC, giá vàng 9999, giá vàng DOJI, giá vàng 247, giá vàng thế giới, giá vàng miếng, giá vàng nhẫn, giá vàng trang sức';
  const metaTags = generateMetaTags(pageName, customData);
  
  // Enhance keywords with high-volume search terms
  const enhancedKeywords = `${metaTags.keywords}, ${highVolumeKeywords}${additionalKeywords ? ', ' + additionalKeywords : ''}`;
  const { structuredData, ...tags } = metaTags;
  
  // Generate additional structured data for rich snippets
  const additionalStructuredData: Record<string, any> = {};
  
  // Add BreadcrumbList if not already present
  if (!(structuredData as any).breadcrumb && pageName !== 'home') {
    additionalStructuredData.breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Trang Chủ',
          'item': 'https://www.giavang247.online/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': tags.title.split(' | ')[0],
          'item': tags.canonical
        }
      ]
    };
  }
  
  // Add VideoObject structured data if video content is provided
  if (videoContent) {
    additionalStructuredData.video = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': videoContent.title,
      'description': videoContent.description || tags.description,
      'thumbnailUrl': videoContent.thumbnailUrl || tags.ogImage,
      'uploadDate': new Date().toISOString(),
      'duration': videoContent.duration || 'PT0M0S',
      'contentUrl': videoContent.url,
      'embedUrl': videoContent.url
    };
  }
  
  // Add ImageObject structured data if featured image is provided
  if (featuredImage) {
    additionalStructuredData.image = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      'contentUrl': featuredImage.url,
      'name': featuredImage.alt,
      'description': featuredImage.alt,
      'width': featuredImage.width || 1200,
      'height': featuredImage.height || 630
    };
  }
  
  // Combine all structured data
  const combinedStructuredData = { ...structuredData, ...additionalStructuredData };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{tags.title}</title>
      <meta name="description" content={tags.description} />
      <meta name="keywords" content={enhancedKeywords} />
      <link rel="canonical" href={tags.canonical} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#ffd700" /> {/* Gold color theme */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={tags.ogType} />
      <meta property="og:url" content={tags.ogUrl} />
      <meta property="og:title" content={tags.ogTitle} />
      <meta property="og:description" content={tags.ogDescription} />
      <meta property="og:image" content={tags.ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={tags.twitterCard} />
      <meta name="twitter:title" content={tags.twitterTitle} />
      <meta name="twitter:description" content={tags.twitterDescription} />
      <meta name="twitter:image" content={tags.twitterImage} />
      
      {/* Creator and Publisher */}
      <meta name="creator" content="GiaVang247" />
      <meta name="publisher" content="GiaVang247" />
      <meta name="author" content="GiaVang247" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} GiaVang247`} />
      
      {/* Featured Image Optimization (if provided) */}
      {featuredImage && (
        <>
          <meta property="og:image:width" content={`${featuredImage.width || 1200}`} />
          <meta property="og:image:height" content={`${featuredImage.height || 630}`} />
          <meta property="og:image:alt" content={featuredImage.alt} />
          <meta name="twitter:image:alt" content={featuredImage.alt} />
        </>
      )}
      
      {/* Related Content Links */}
      {relatedContent.map((content, index) => (
        <link 
          key={`related-${index}`} 
          rel="related" 
          href={content.url} 
          title={content.title} 
        />
      ))}
      
      {/* Structured Data */}
      {Object.entries(combinedStructuredData).map(([key, data]) => (
        <script key={key} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
