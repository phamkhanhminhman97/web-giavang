import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2, Calendar, User, Tag, ArrowLeft, Clock, ChevronRight, Share2, Bookmark, Printer, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { fetchGeneratedContentBySlug, fetchGeneratedContentById, GeneratedContent } from "@/services/generated-content";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';

const GeneratedContentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedContent, setRelatedContent] = useState<GeneratedContent[]>([]);
  
  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // Try to fetch by slug first
        let response = await fetchGeneratedContentBySlug(slug);
        
        // If not found by slug, try to fetch by ID (if slug is a number)
        if (!response.success && !isNaN(Number(slug))) {
          response = await fetchGeneratedContentById(Number(slug));
        }
        
        if (response.success && response.data) {
          setContent(response.data);
          setError(null);
          
          // Fetch related content
          const relatedResponse = await fetchGeneratedContentBySlug(slug);
          if (relatedResponse.success && relatedResponse.data) {
            setRelatedContent([relatedResponse.data]);
          }
        } else {
          setError(response.error || "Không thể tải bài viết");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải bài viết");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
    window.scrollTo(0, 0);
  }, [slug]);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };
  
  // Extract headings from content for table of contents
  const extractHeadings = (markdownContent: string) => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;
    
    while ((match = headingRegex.exec(markdownContent)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      headings.push({ level, text, id });
    }
    
    return headings;
  };
  
  const headings = content ? extractHeadings(content.content) : [];
  
  // Process content to add IDs to headings
  const processContent = (markdownContent: string) => {
    return markdownContent.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return `${hashes} ${text} <a id="${id}"></a>`;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO 
        pageName="bai-viet-detail" 
        customData={content ? {
          description: content.content.substring(0, 160),
          slug: content.slug || content.id,
          publishedAt: content.publishedAt || content.generatedAt,
          author: content.author
        } : undefined}
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-gold-dark">Trang chủ</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/bai-viet" className="hover:text-gold-dark">Bài viết</Link>
          {content && (
            <>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-slate-700 truncate max-w-[200px]">{content.title}</span>
            </>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-gold-dark animate-spin mb-4" />
              <p className="text-slate-600">Đang tải bài viết...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 mb-2">Không thể tải bài viết</p>
            <p className="text-slate-600 text-sm">{error}</p>
            <Link to="/bai-viet" className="mt-4 inline-flex items-center text-gold-dark hover:underline">
              <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách bài viết
            </Link>
          </div>
        ) : content ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - 3/4 width on large screens */}
            <div className="lg:col-span-3">
              <article className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-md border border-gold-light/30">
                {/* Article Header */}
                <header>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-playfair mb-4 text-slate-800">
                    {content.title}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-6 pb-6 border-b border-gold-light/30">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(content.publishedAt || content.generatedAt)}</span>
                    </div>
                    {content.author && (
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{content.author}</span>
                      </div>
                    )}
                    {content.contentType && (
                      <div className="flex items-center gap-1">
                        <Tag size={14} />
                        <span>{content.contentType}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>5 phút đọc</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>123 lượt xem</span>
                    </div>
                  </div>
                </header>
                
                {/* Article Content */}
                <div className="prose prose-slate max-w-none prose-headings:font-playfair prose-headings:text-slate-800 prose-a:text-gold-dark prose-strong:text-slate-700">
                  <ReactMarkdown>
                    {/* Remove the title from the content if it starts with # and add IDs to headings */}
                    {processContent(content.content.replace(/^#\s+.+$/m, '').trim())}
                  </ReactMarkdown>
                </div>
                
                {/* Article Footer */}
                <footer className="mt-8 pt-6 border-t border-gold-light/30">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="text-sm text-slate-500">
                      Cập nhật lần cuối: {formatDate(content.publishedAt || content.generatedAt)}
                    </div>
                    <div className="flex space-x-3">
                      <button className="p-2 rounded-full hover:bg-gold-light/20 text-slate-600" title="Chia sẻ">
                        <Share2 size={18} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gold-light/20 text-slate-600" title="Lưu bài viết">
                        <Bookmark size={18} />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gold-light/20 text-slate-600" title="In bài viết">
                        <Printer size={18} />
                      </button>
                    </div>
                  </div>
                </footer>
              </article>
              
              {/* Back to Articles Link */}
              <div className="mt-6">
                <Link to="/bai-viet" className="inline-flex items-center text-gold-dark hover:underline">
                  <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách bài viết
                </Link>
              </div>
            </div>
            
            {/* Sidebar - 1/4 width on large screens */}
            <div className="lg:col-span-1">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border border-gold-light/30 mb-6 sticky top-20">
                  <h3 className="text-lg font-bold font-playfair mb-3 text-slate-800">Mục lục</h3>
                  <ul className="space-y-2">
                    {headings.map((heading, index) => (
                      <li 
                        key={index} 
                        className={`${heading.level === 2 ? '' : 'ml-4'} text-sm`}
                      >
                        <a 
                          href={`#${heading.id}`} 
                          className="text-slate-600 hover:text-gold-dark"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Related Content */}
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md border border-gold-light/30">
                <h3 className="text-lg font-bold font-playfair mb-3 text-slate-800">Bài viết liên quan</h3>
                {relatedContent.length > 0 ? (
                  <ul className="space-y-4">
                    {relatedContent.map((item) => (
                      <li key={item.id}>
                        <Link 
                          to={`/bai-viet/${item.slug || item.id}`}
                          className="block hover:bg-gold-light/10 p-2 rounded-lg transition-colors"
                        >
                          <h4 className="font-medium text-slate-700 line-clamp-2">{item.title}</h4>
                          <div className="text-xs text-slate-500 mt-1">
                            {formatDate(item.publishedAt || item.generatedAt)}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500">Không có bài viết liên quan</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-600">Không tìm thấy bài viết</p>
            <Link to="/bai-viet" className="mt-4 inline-flex items-center text-gold-dark hover:underline">
              <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách bài viết
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default GeneratedContentDetail;
