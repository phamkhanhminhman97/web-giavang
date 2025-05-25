/**
 * Enhanced SEO Utilities
 * 
 * This file contains utility functions for generating SEO meta tags and structured data
 * for different pages of the GiaVang247 website, optimized for SEO, SXO, and AEO.
 * 
 * SEO (Search Engine Optimization): Optimizing for search engine rankings
 * SXO (Search Experience Optimization): Optimizing for user experience in search results
 * AEO (Answer Engine Optimization): Optimizing for voice search and featured snippets
 */

/**
 * Generate meta tags for a specific page
 * @param pageName The name of the page
 * @param customData Custom data for the page
 * @returns Object containing meta tags and structured data
 */
export const generateMetaTags = (pageName: string, customData?: any) => {
  const baseUrl = 'https://www.giavang247.online';
  const defaultDescription = 'Cập nhật giá vàng Việt Nam SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7. Thông tin thị trường vàng chính xác, nhanh chóng, tin cậy mỗi ngày.';
  const defaultKeywords = 'giá vàng, vàng SJC, vàng DOJI, vàng PNJ, vàng Bảo Tín Minh Châu, vàng Mi Hồng, vàng Phú Quý, vàng Huy Thanh, giá vàng hôm nay, giá vàng 24/7, giá vàng 247 online, gia vang 247 online';
  const defaultImage = `${baseUrl}/og-image.png`;
  
  // Default meta tags
  const metaTags = {
    title: 'Giá Vàng 24/7 - Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu mới nhất',
    description: defaultDescription,
    keywords: defaultKeywords,
    canonical: baseUrl,
    ogType: 'website',
    ogUrl: baseUrl,
    ogTitle: 'Giá Vàng 24/7 - Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu mới nhất',
    ogDescription: defaultDescription,
    ogImage: defaultImage,
    twitterCard: 'summary_large_image',
    twitterTitle: 'Giá Vàng 24/7 - Cập nhật giá vàng mới nhất các thương hiệu uy tín',
    twitterDescription: 'Cập nhật giá vàng Việt Nam từ các thương hiệu uy tín mới nhất 24/7. Thông tin thị trường vàng chính xác.',
    twitterImage: `${baseUrl}/twitter-image.png`,
    structuredData: {}
  };
  
  // Page-specific meta tags
  switch (pageName) {
    case 'home':
      metaTags.title = 'Giá Vàng 247 Online - Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu mới nhất 24/7';
      metaTags.description = 'GiaVang247 Online - Trang cập nhật giá vàng 247 online, giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7. Thông tin thị trường vàng chính xác, nhanh chóng.';
      metaTags.keywords = `${defaultKeywords}, giá vàng 247 online, gia vang 247 online`;
      metaTags.canonical = baseUrl;
      metaTags.ogTitle = 'Giá Vàng 247 Online - Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu mới nhất 24/7';
      metaTags.ogDescription = 'GiaVang247 Online - Trang cập nhật giá vàng 247 online, giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7.';
      metaTags.twitterTitle = 'Giá Vàng 247 Online - Cập nhật giá vàng mới nhất các thương hiệu uy tín';
      metaTags.twitterDescription = 'GiaVang247 Online - Trang cập nhật giá vàng 247 online, giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7.';
      metaTags.structuredData = generateHomeStructuredData();
      break;
      
    case 'phan-tich':
      metaTags.title = 'Phân Tích Thị Trường Vàng | Dự Báo Giá Vàng | GiaVang247';
      metaTags.description = 'Phân tích chuyên sâu về thị trường vàng trong nước và quốc tế. Cập nhật dự báo giá vàng, phân tích kỹ thuật và cơ bản từ các chuyên gia hàng đầu.';
      metaTags.keywords = 'phân tích vàng, dự báo giá vàng, thị trường vàng, phân tích kỹ thuật vàng, phân tích cơ bản vàng, chuyên gia vàng, xu hướng giá vàng';
      metaTags.canonical = `${baseUrl}/phan-tich`;
      metaTags.ogUrl = `${baseUrl}/phan-tich`;
      metaTags.ogTitle = 'Phân Tích Thị Trường Vàng | Dự Báo Giá Vàng | GiaVang247';
      metaTags.ogDescription = 'Phân tích chuyên sâu về thị trường vàng trong nước và quốc tế. Cập nhật dự báo giá vàng, phân tích kỹ thuật và cơ bản từ các chuyên gia hàng đầu.';
      metaTags.twitterTitle = 'Phân Tích Thị Trường Vàng | Dự Báo Giá Vàng | GiaVang247';
      metaTags.twitterDescription = 'Phân tích chuyên sâu về thị trường vàng trong nước và quốc tế. Cập nhật dự báo giá vàng, phân tích kỹ thuật và cơ bản từ các chuyên gia hàng đầu.';
      metaTags.structuredData = generateAnalysisStructuredData();
      break;
      
    case 'article':
      if (customData && customData.article) {
        const { article } = customData;
        metaTags.title = `${article.title} | GiaVang247`;
        metaTags.description = article.summary;
        metaTags.keywords = `giá vàng, vàng SJC, phân tích vàng, dự báo giá vàng, ${article.title.toLowerCase()}`;
        metaTags.canonical = `${baseUrl}/phan-tich/bai-viet/${article.id}`;
        metaTags.ogType = 'article';
        metaTags.ogUrl = `${baseUrl}/phan-tich/bai-viet/${article.id}`;
        metaTags.ogTitle = `${article.title} | GiaVang247`;
        metaTags.ogDescription = article.summary;
        metaTags.twitterTitle = `${article.title} | GiaVang247`;
        metaTags.twitterDescription = article.summary;
        metaTags.structuredData = generateArticleStructuredData(article);
      }
      break;
      
    case 'bai-viet-list':
      metaTags.title = 'Bài Viết Về Thị Trường Vàng | Phân Tích & Tin Tức | GiaVang247';
      metaTags.description = 'Tổng hợp các bài viết phân tích, tin tức và hướng dẫn về thị trường vàng. Cập nhật thông tin mới nhất về giá vàng, xu hướng thị trường và lời khuyên đầu tư.';
      metaTags.keywords = 'bài viết vàng, tin tức vàng, phân tích vàng, hướng dẫn đầu tư vàng, thị trường vàng, giá vàng hôm nay, dự báo giá vàng';
      metaTags.canonical = `${baseUrl}/bai-viet`;
      metaTags.ogUrl = `${baseUrl}/bai-viet`;
      metaTags.ogTitle = 'Bài Viết Về Thị Trường Vàng | Phân Tích & Tin Tức | GiaVang247';
      metaTags.ogDescription = 'Tổng hợp các bài viết phân tích, tin tức và hướng dẫn về thị trường vàng. Cập nhật thông tin mới nhất về giá vàng, xu hướng thị trường và lời khuyên đầu tư.';
      metaTags.twitterTitle = 'Bài Viết Về Thị Trường Vàng | Phân Tích & Tin Tức | GiaVang247';
      metaTags.twitterDescription = 'Tổng hợp các bài viết phân tích, tin tức và hướng dẫn về thị trường vàng. Cập nhật thông tin mới nhất về giá vàng, xu hướng thị trường và lời khuyên đầu tư.';
      metaTags.structuredData = generateBlogStructuredData();
      break;
      
    case 'bai-viet-detail':
      if (customData && customData.description) {
        const title = pageName || 'Bài Viết';
        const description = customData.description.substring(0, 160);
        const slug = customData.slug || '';
        
        metaTags.title = `${title} | GiaVang247`;
        metaTags.description = description;
        metaTags.keywords = `giá vàng, vàng SJC, phân tích vàng, dự báo giá vàng, ${title.toLowerCase()}`;
        metaTags.canonical = `${baseUrl}/bai-viet/${slug}`;
        metaTags.ogType = 'article';
        metaTags.ogUrl = `${baseUrl}/bai-viet/${slug}`;
        metaTags.ogTitle = `${title} | GiaVang247`;
        metaTags.ogDescription = description;
        metaTags.twitterTitle = `${title} | GiaVang247`;
        metaTags.twitterDescription = description;
        metaTags.structuredData = generateGeneratedContentStructuredData({
          title,
          description,
          slug,
          publishedAt: customData.publishedAt || customData.generatedAt || new Date().toISOString(),
          author: customData.author || 'GiaVang247'
        });
      }
      break;
      
    case 'gioi-thieu':
      metaTags.title = 'Giới Thiệu | GiaVang247 - Chuyên Trang Thông Tin Giá Vàng Uy Tín';
      metaTags.description = 'GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam, cập nhật liên tục giá vàng SJC, DOJI, PNJ và các thương hiệu uy tín khác. Thông tin chính xác, phân tích chuyên sâu từ đội ngũ chuyên gia.';
      metaTags.keywords = 'giới thiệu giavang247, về chúng tôi, đội ngũ giavang247, thông tin giá vàng uy tín, chuyên trang giá vàng';
      metaTags.canonical = `${baseUrl}/gioi-thieu`;
      metaTags.ogUrl = `${baseUrl}/gioi-thieu`;
      metaTags.ogTitle = 'Giới Thiệu | GiaVang247 - Chuyên Trang Thông Tin Giá Vàng Uy Tín';
      metaTags.ogDescription = 'GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam, cập nhật liên tục giá vàng SJC, DOJI, PNJ và các thương hiệu uy tín khác.';
      metaTags.twitterTitle = 'Giới Thiệu | GiaVang247 - Chuyên Trang Thông Tin Giá Vàng Uy Tín';
      metaTags.twitterDescription = 'GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam, cập nhật liên tục giá vàng SJC, DOJI, PNJ và các thương hiệu uy tín khác.';
      metaTags.structuredData = generateAboutStructuredData();
      break;
      
    case 'lien-he':
      metaTags.title = 'Liên Hệ | GiaVang247';
      metaTags.description = 'Liên hệ với GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam. Gửi thông tin phản hồi, góp ý hoặc yêu cầu hợp tác.';
      metaTags.keywords = 'liên hệ giavang247, góp ý giavang247, phản hồi giá vàng, hợp tác giavang247';
      metaTags.canonical = `${baseUrl}/lien-he`;
      metaTags.ogUrl = `${baseUrl}/lien-he`;
      metaTags.ogTitle = 'Liên Hệ | GiaVang247';
      metaTags.ogDescription = 'Liên hệ với GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam. Gửi thông tin phản hồi, góp ý hoặc yêu cầu hợp tác.';
      metaTags.twitterTitle = 'Liên Hệ | GiaVang247';
      metaTags.twitterDescription = 'Liên hệ với GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam. Gửi thông tin phản hồi, góp ý hoặc yêu cầu hợp tác.';
      metaTags.structuredData = generateContactStructuredData();
      break;
      
    case 'cong-cu-ai':
      metaTags.title = 'Công Cụ AI | Tạo Nội Dung Về Thị Trường Vàng | GiaVang247';
      metaTags.description = 'Sử dụng công nghệ AI để tạo nội dung chất lượng cao về thị trường vàng. Phân tích, tin tức, dự báo và hướng dẫn đầu tư được tạo bởi trí tuệ nhân tạo tiên tiến.';
      metaTags.keywords = 'công cụ AI, AI phân tích vàng, tạo nội dung AI, AI dự báo giá vàng, trí tuệ nhân tạo, công nghệ AI, phân tích thị trường vàng';
      metaTags.canonical = `${baseUrl}/cong-cu-ai`;
      metaTags.ogUrl = `${baseUrl}/cong-cu-ai`;
      metaTags.ogTitle = 'Công Cụ AI | Tạo Nội Dung Về Thị Trường Vàng | GiaVang247';
      metaTags.ogDescription = 'Sử dụng công nghệ AI để tạo nội dung chất lượng cao về thị trường vàng. Phân tích, tin tức, dự báo và hướng dẫn đầu tư được tạo bởi trí tuệ nhân tạo tiên tiến.';
      metaTags.twitterTitle = 'Công Cụ AI | Tạo Nội Dung Về Thị Trường Vàng | GiaVang247';
      metaTags.twitterDescription = 'Sử dụng công nghệ AI để tạo nội dung chất lượng cao về thị trường vàng. Phân tích, tin tức, dự báo và hướng dẫn đầu tư được tạo bởi trí tuệ nhân tạo tiên tiến.';
      metaTags.structuredData = generateAIToolStructuredData();
      break;
      
    default:
      // Default meta tags are already set
      break;
  }
  
  return metaTags;
};

/**
 * Generate structured data for the home page
 * @returns Structured data for the home page
 */
const generateHomeStructuredData = () => {
  return {
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Giá Vàng 24/7',
      'url': 'https://www.giavang247.online/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://www.giavang247.online/search?q={search_term}',
        'query-input': 'required name=search_term'
      },
      'description': 'Cập nhật giá vàng Việt Nam SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7. Thông tin thị trường vàng chính xác, nhanh chóng, tin cậy mỗi ngày.',
      'inLanguage': 'vi-VN'
    },
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Giá vàng SJC hôm nay là bao nhiêu?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Giá vàng SJC hôm nay đang ở mức 78,900,000 đồng/lượng (mua vào) và 80,900,000 đồng/lượng (bán ra). Giá cập nhật liên tục 24/7 trên trang GiaVang247.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Làm thế nào để theo dõi biến động giá vàng?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Bạn có thể theo dõi biến động giá vàng qua biểu đồ phân tích trên trang GiaVang247, cập nhật liên tục 24/7 với dữ liệu từ các nhà cung cấp uy tín như SJC, DOJI, PNJ, Bảo Tín Minh Châu.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Chênh lệch giữa giá vàng SJC và vàng thế giới là bao nhiêu?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Hiện tại, chênh lệch giữa giá vàng SJC và giá vàng thế giới dao động từ 17-18 triệu đồng/lượng, cao hơn nhiều so với mức chênh lệch bình thường trong các năm trước.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Nên mua vàng vào thời điểm nào trong năm?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Thời điểm tốt để mua vàng thường là khi giá vàng điều chỉnh giảm sau các đợt tăng mạnh, hoặc vào các tháng 7-8 khi nhu cầu thấp. Tuy nhiên, đầu tư vàng nên dựa trên phân tích kỹ thuật và cơ bản thay vì chỉ dựa vào mùa vụ.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Làm thế nào để phân biệt vàng thật và vàng giả?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Để phân biệt vàng thật và vàng giả, bạn có thể kiểm tra trọng lượng (vàng nặng hơn nhiều kim loại khác), kiểm tra độ dẻo (vàng thật rất dẻo), thử nam châm (vàng không bị hút bởi nam châm), hoặc kiểm tra dấu ấn (vàng thật thường có dấu ấn chứng nhận độ tinh khiết).'
          }
        }
      ]
    },
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'Cách theo dõi giá vàng trên GiaVang247',
      'description': 'Hướng dẫn cách theo dõi giá vàng cập nhật mới nhất trên trang GiaVang247',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Truy cập trang chủ',
          'text': 'Truy cập trang chủ GiaVang247.online để xem bảng giá vàng mới nhất từ các thương hiệu uy tín'
        },
        {
          '@type': 'HowToStep',
          'name': 'Xem biểu đồ phân tích',
          'text': 'Xem biểu đồ phân tích để theo dõi biến động giá vàng theo thời gian'
        },
        {
          '@type': 'HowToStep',
          'name': 'Đọc phân tích thị trường',
          'text': 'Đọc phân tích thị trường từ các chuyên gia để hiểu rõ hơn về xu hướng giá vàng'
        }
      ]
    }
  };
};

/**
 * Generate structured data for the analysis page
 * @returns Structured data for the analysis page
 */
const generateAnalysisStructuredData = () => {
  return {
    breadcrumb: {
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
          'name': 'Phân Tích',
          'item': 'https://www.giavang247.online/phan-tich'
        }
      ]
    },
    analysisPage: {
      '@context': 'https://schema.org',
      '@type': 'AnalysisNewsArticle',
      'headline': 'Phân Tích Thị Trường Vàng | Dự Báo Giá Vàng',
      'description': 'Phân tích chuyên sâu về thị trường vàng trong nước và quốc tế. Cập nhật dự báo giá vàng, phân tích kỹ thuật và cơ bản từ các chuyên gia hàng đầu.',
      'image': 'https://www.giavang247.online/og-image.png',
      'datePublished': new Date().toISOString(),
      'dateModified': new Date().toISOString(),
      'author': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'url': 'https://www.giavang247.online/'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.giavang247.online/logo.png',
          'width': '180',
          'height': '60'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': 'https://www.giavang247.online/phan-tich'
      },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.market-analysis-summary']
      }
    }
  };
};

/**
 * Generate structured data for an article
 * @param article The article data
 * @returns Structured data for the article
 */
const generateArticleStructuredData = (article: any) => {
  return {
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.summary,
      'image': 'https://www.giavang247.online/og-image.png',
      'datePublished': article.date,
      'dateModified': article.date,
      'author': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'url': 'https://www.giavang247.online/'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.giavang247.online/logo.png',
          'width': '180',
          'height': '60'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://www.giavang247.online/phan-tich/bai-viet/${article.id}`
      },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.article-summary', '.article-content']
      }
    },
    breadcrumb: {
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
          'name': 'Phân Tích',
          'item': 'https://www.giavang247.online/phan-tich'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': article.title,
          'item': `https://www.giavang247.online/phan-tich/bai-viet/${article.id}`
        }
      ]
    }
  };
};

/**
 * Generate structured data for the blog page
 * @returns Structured data for the blog page
 */
const generateBlogStructuredData = () => {
  return {
    blog: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'Bài Viết Về Thị Trường Vàng',
      'description': 'Tổng hợp các bài viết phân tích, tin tức và hướng dẫn về thị trường vàng.',
      'url': 'https://www.giavang247.online/bai-viet',
      'publisher': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.giavang247.online/logo.png',
          'width': '180',
          'height': '60'
        }
      }
    },
    breadcrumb: {
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
          'name': 'Bài Viết',
          'item': 'https://www.giavang247.online/bai-viet'
        }
      ]
    }
  };
};

/**
 * Generate structured data for a generated content article
 * @param content The generated content data
 * @returns Structured data for the generated content
 */
const generateGeneratedContentStructuredData = (content: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
}) => {
  return {
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': content.title,
      'description': content.description,
      'image': 'https://www.giavang247.online/og-image.png',
      'datePublished': content.publishedAt,
      'dateModified': content.publishedAt,
      'author': {
        '@type': 'Person',
        'name': content.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.giavang247.online/logo.png',
          'width': '180',
          'height': '60'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `https://www.giavang247.online/bai-viet/${content.slug}`
      },
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.article-content']
      }
    },
    breadcrumb: {
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
          'name': 'Bài Viết',
          'item': 'https://www.giavang247.online/bai-viet'
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': content.title,
          'item': `https://www.giavang247.online/bai-viet/${content.slug}`
        }
      ]
    }
  };
};

/**
 * Generate structured data for the about page
 * @returns Structured data for the about page
 */
const generateAboutStructuredData = () => {
  return {
    breadcrumb: {
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
          'name': 'Giới Thiệu',
          'item': 'https://www.giavang247.online/gioi-thieu'
        }
      ]
    },
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'GiaVang247',
      'url': 'https://www.giavang247.online/',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.giavang247.online/logo.png',
        'width': '180',
        'height': '60'
      },
      'description': 'Chuyên trang thông tin uy tín về giá vàng Việt Nam, cập nhật liên tục giá vàng SJC, DOJI, PNJ và các thương hiệu uy tín khác.',
      'foundingDate': '2015',
      'founders': [
        {
          '@type': 'Person',
          'name': 'Nguyễn Văn A'
        }
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'VN',
        'addressLocality': 'Hà Nội',
        'addressRegion': 'Hà Nội'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'telephone': '+84-xxx-xxx-xxx',
        'email': 'contact@giavang247.online'
      },
      'sameAs': [
        'https://facebook.com/giavang247',
        'https://twitter.com/giavang247'
      ]
    }
  };
};

/**
 * Generate structured data for the contact page
 * @returns Structured data for the contact page
 */
const generateContactStructuredData = () => {
  return {
    breadcrumb: {
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
          'name': 'Liên Hệ',
          'item': 'https://www.giavang247.online/lien-he'
        }
      ]
    },
    contactPage: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Liên Hệ GiaVang247',
      'description': 'Liên hệ với GiaVang247 - Chuyên trang thông tin uy tín về giá vàng Việt Nam.',
      'url': 'https://www.giavang247.online/lien-he',
      'mainEntity': {
        '@type': 'Organization',
        'name': 'GiaVang247',
        'telephone': '+84-xxx-xxx-xxx',
        'email': 'contact@giavang247.online',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'VN',
          'addressLocality': 'Hà Nội',
          'addressRegion': 'Hà Nội'
        }
      }
    }
  };
};

/**
 * Generate structured data for the AI tool page
 * @returns Structured data for the AI tool page
 */
const generateAIToolStructuredData = () => {
  return {
    breadcrumb: {
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
          'name': 'Công Cụ AI',
          'item': 'https://www.giavang247.online/cong-cu-ai'
        }
      ]
    },
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Công Cụ AI Phân Tích Thị Trường Vàng',
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'VND'
      },
      'description': 'Công cụ AI giúp tạo nội dung chất lượng cao về thị trường vàng, phân tích kỹ thuật và cơ bản, dự báo giá vàng.',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '156'
      }
    },
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'Cách sử dụng công cụ AI tạo nội dung về thị trường vàng',
      'description': 'Hướng dẫn cách sử dụng công cụ AI để tạo nội dung chất lượng cao về thị trường vàng',
      'step': [
        {
          '@type': 'HowToStep',
          'name': 'Chọn chủ đề',
          'text': 'Chọn chủ đề bạn muốn tạo nội dung, ví dụ: phân tích thị trường vàng, dự báo giá vàng, v.v.'
        },
        {
          '@type': 'HowToStep',
          'name': 'Tùy chỉnh thông số',
          'text': 'Tùy chỉnh các thông số như độ dài, giọng điệu, ngôn ngữ để phù hợp với nhu cầu của bạn'
        },
        {
          '@type': 'HowToStep',
          'name': 'Tạo nội dung',
          'text': 'Nhấn nút "Tạo nội dung" và đợi trong giây lát để AI tạo nội dung chất lượng cao'
        },
        {
          '@type': 'HowToStep',
          'name': 'Sử dụng nội dung',
          'text': 'Sao chép nội dung đã tạo hoặc lưu lại để sử dụng sau'
        }
      ]
    }
  };
};
