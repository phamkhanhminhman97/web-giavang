import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Calendar, User, Tag, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { fetchGeneratedContentList, GeneratedContent } from "@/services/generated-content";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const GeneratedContentList = () => {
  const [contentList, setContentList] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [contentType, setContentType] = useState<string | undefined>(undefined);
  
  const contentTypes = [
    { value: undefined, label: "Tất cả" },
    { value: "article", label: "Bài viết" },
    { value: "analysis", label: "Phân tích" },
    { value: "news", label: "Tin tức" },
    { value: "guide", label: "Hướng dẫn" },
  ];
  
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const response = await fetchGeneratedContentList({
          published: true,
          contentType,
          limit,
          offset
        });
        
        if (response.success && response.data) {
          setContentList(response.data);
          setTotal(response.total || 0);
          setError(null);
        } else {
          setError(response.error || "Không thể tải danh sách bài viết");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải danh sách bài viết");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [page, limit, contentType]);
  
  const totalPages = Math.ceil(total / limit);
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO pageName="bai-viet-list" />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
              Bài Viết
            </span>
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Các bài viết phân tích, tin tức và hướng dẫn về thị trường vàng được tạo bởi AI.
          </p>
        </div>
        
        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <div className="text-sm text-slate-600 flex items-center mr-2">Lọc theo:</div>
          {contentTypes.map((type) => (
            <button
              key={type.value || "all"}
              className={`px-3 py-1.5 rounded-full text-sm ${
                contentType === type.value
                  ? "bg-gold-dark text-white"
                  : "bg-gold-light/20 text-slate-700 hover:bg-gold-light/40"
              } transition-colors`}
              onClick={() => setContentType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
        
        {/* Content List */}
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
          </div>
        ) : contentList.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-600">Không có bài viết nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {contentList.map((content) => (
              <Link
                key={content.id}
                to={`/bai-viet/${content.slug || content.id}`}
                className="block bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300"
              >
                <h2 className="text-xl font-bold font-playfair mb-3 text-slate-800">{content.title}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
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
                </div>
                <p className="text-slate-600 line-clamp-3">
                  {content.content.replace(/^#\s+.+$/m, '').trim().split('\n').filter(Boolean)[0]}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-1 text-gold-dark font-medium hover:underline">
                    Đọc tiếp <ChevronRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && !error && totalPages > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`p-2 rounded-full ${
                  page === 1
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-slate-700 hover:bg-gold-light/20"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="px-4 py-2 text-slate-700">
                Trang {page} / {totalPages}
              </div>
              
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`p-2 rounded-full ${
                  page === totalPages
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-slate-700 hover:bg-gold-light/20"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default GeneratedContentList;
