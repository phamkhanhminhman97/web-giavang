import { Helmet } from 'react-helmet-async';
import { generateMetaTags } from '@/utils/seo-utils';

interface SEOProps {
  pageName: string;
  customData?: any;
}

/**
 * SEO Component
 * 
 * This component handles all SEO-related meta tags and structured data for a page.
 * It uses the generateMetaTags utility to generate the appropriate meta tags and structured data
 * based on the page name and any custom data provided.
 * 
 * @param pageName The name of the page (e.g., 'home', 'phan-tich', 'article', etc.)
 * @param customData Any custom data needed for the page (e.g., article data for article pages)
 */
const SEO = ({ pageName, customData }: SEOProps) => {
  const metaTags = generateMetaTags(pageName, customData);
  const { structuredData, ...tags } = metaTags;

  return (
    <Helmet>
      <title>{tags.title}</title>
      <meta name="description" content={tags.description} />
      <meta name="keywords" content={tags.keywords} />
      <link rel="canonical" href={tags.canonical} />
      
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
      
      {/* Creator */}
      <meta name="creator" content="GiaVang247" />
      
      {/* Structured Data */}
      {Object.entries(structuredData).map(([key, data]) => (
        <script key={key} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
