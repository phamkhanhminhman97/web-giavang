import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldTabs from "@/components/GoldTabs";
import PriceInfo from "@/components/PriceInfo";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
// Lazy load heavy components for better performance
import { lazy, Suspense, useState, useEffect } from "react";
const MarketTrend = lazy(() => import("@/components/MarketTrend"));
const GoldComparison = lazy(() => import("@/components/GoldComparison"));
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Bell, ArrowRight, ChevronRight, Search as SearchIcon, TrendingUp, Shield, Award, Clock, BarChart3, Scale, LineChart, Gem, Mail, MessageSquare, CheckCircle, Users, Eye, Zap, Star, X, Wifi } from "lucide-react";
import FaqItem from "@/components/FaqItem";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { useScrollEffect } from "@/hooks/use-scroll-effect";
import { GoldPriceProvider } from "@/contexts/GoldPriceContext";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { priceAlertApi, searchApi, type SearchResult } from "@/services/enhanced-api";

const Index = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const scrolled = useScrollEffect(50);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchTotal, setSearchTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [showPriceAlert, setShowPriceAlert] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertThreshold, setAlertThreshold] = useState("100000");
  const [alertSubmitting, setAlertSubmitting] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [userCount] = useState(12847); // Mock user count
  const { toast } = useToast();
  const formatCurrency = (value: number) => new Intl.NumberFormat('vi-VN').format(value);
  const formatTimestamp = (value?: string) => {
    if (!value) return "Không xác định";
    const date = new Date(value);
    return isNaN(date.getTime()) ? "Không xác định" : date.toLocaleString("vi-VN");
  };
  
  // Use our custom hook for formatted date/time
  const { formattedDateTime } = useFormattedDate();

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearchError(null);
      setSearchTotal(0);
      setSearchLoading(false);
      return;
    }

    let isCancelled = false;
    setSearchLoading(true);
    setSearchError(null);

    (async () => {
      try {
        const response = await searchApi.searchGoldPrices({ q: searchQuery });
        if (isCancelled) return;

        if (response.success && response.data) {
          setSearchResults(response.data.results);
          setSearchTotal(response.data.total);
        } else {
          setSearchResults([]);
          setSearchTotal(0);
          setSearchError(response.error || "Không tìm thấy kết quả phù hợp");
        }
      } catch (err) {
        if (isCancelled) return;
        setSearchResults([]);
        setSearchTotal(0);
        setSearchError(err instanceof Error ? err.message : "Không thể tải kết quả tìm kiếm");
      } finally {
        if (!isCancelled) {
          setSearchLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [searchQuery]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Share handler with Web Share API fallback
  const handleShare = async () => {
    try {
      const shareData = {
        title: "Giá Vàng 24/7 - GiaVang247",
        text: "Cập nhật giá vàng Việt Nam SJC, DOJI, PNJ 24/7",
        url: typeof window !== "undefined" ? window.location.href : "/",
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({ title: "Đã sao chép liên kết", description: "Link đã được copy vào clipboard" });
      }
    } catch (_) {
      toast({ title: "Không thể chia sẻ", description: "Vui lòng thử lại sau", variant: "destructive" });
    }
  };

  // Notification handler
  const handleNotify = () => {
    setShowPriceAlert(true);
  };

  // Price alert submission
  const handlePriceAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertThreshold) {
      setAlertError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setAlertSubmitting(true);
    setAlertError(null);

    try {
      const payload = {
        email: alertEmail.trim(),
        threshold: Number(alertThreshold),
        provider: "SJC",
        goldType: "SJC",
        direction: "both" as const,
      };

      const response = await priceAlertApi.create(payload);
      if (response.success) {
        toast({
          title: "🔔 Đăng ký thành công!",
          description: `Bạn sẽ nhận cảnh báo khi giá thay đổi ≥ ${Number(alertThreshold).toLocaleString('vi-VN')}đ/lượng`,
        });
        setShowPriceAlert(false);
        setAlertEmail("");
        setAlertThreshold("100000");
      } else {
        setAlertError(response.error || "Không thể tạo cảnh báo, vui lòng thử lại.");
      }
    } catch (err) {
      setAlertError(err instanceof Error ? err.message : "Không thể kết nối máy chủ");
    } finally {
      setAlertSubmitting(false);
    }
  };

  // If there's a search query, show search results
  if (searchQuery) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
        <SEO pageName="home" />
        <Navbar />
        
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm cho: "{searchQuery}"</h1>
            {searchTotal > 0 && !searchLoading && !searchError && (
              <p className="text-sm text-slate-500 mb-4">
                {searchTotal.toLocaleString("vi-VN")} kết quả phù hợp
              </p>
            )}

            {searchLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-dark"></div>
              </div>
            ) : searchError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 mb-2">Không thể tải kết quả tìm kiếm</p>
                <p className="text-slate-600 text-sm">{searchError}</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <div
                    key={`${result.id}-${result.provider}-${result.goldType}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gold-dark">
                          {result.provider} · {result.goldType}
                        </h2>
                        <p className="text-sm text-slate-500">
                          Cập nhật: {formatTimestamp(result.lastUpdate)}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        <span className={result.change24h >= 0 ? "text-green-600" : "text-red-600"}>
                          {result.change24h >= 0 ? "+" : "-"}
                          {Math.abs(result.change24h).toLocaleString("vi-VN")}đ
                        </span>
                        <span className="text-slate-500 ml-2">
                          ({result.changePercent >= 0 ? "+" : "-"}
                          {Math.abs(result.changePercent).toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gold-light/10 rounded-lg p-4">
                        <p className="text-sm text-slate-500 mb-1">Giá mua</p>
                        <p className="text-xl font-semibold text-slate-800">
                          {formatCurrency(result.buyPrice)}đ
                        </p>
                      </div>
                      <div className="bg-gold-light/10 rounded-lg p-4">
                        <p className="text-sm text-slate-500 mb-1">Giá bán</p>
                        <p className="text-xl font-semibold text-slate-800">
                          {formatCurrency(result.sellPrice)}đ
                        </p>
                      </div>
                      <div className="bg-gold-light/10 rounded-lg p-4">
                        <p className="text-sm text-slate-500 mb-1">Xu hướng 24h</p>
                        <p className={`text-xl font-semibold ${result.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {result.change24h >= 0 ? "Tăng" : "Giảm"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">Không tìm thấy kết quả nào cho "{searchQuery}"</p>
                <p className="mt-4">Vui lòng thử lại với từ khóa khác hoặc quay lại trang chủ.</p>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Regular home page content
  return (
    <GoldPriceProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO pageName="home" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />

        {/* Sticky mini-header on scroll */}
        {scrolled && (
          <div className="fixed top-2 inset-x-0 px-4 z-50">
            <div className="mx-auto max-w-5xl bg-white/90 backdrop-blur-md border border-gold-light/40 shadow-lg rounded-full flex items-center justify-between px-4 py-2">
              <div className="text-xs md:text-sm text-slate-700">
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} className="text-gold-dark" />
                  Cập nhật: <span className="font-medium">{formattedDateTime}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleNotify} className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-gold-light/10 border border-gold-light/60 hover:border-gold hover:bg-gold-light/20 transition-all">
                  <span className="inline-flex items-center gap-1"><Bell size={14} className="text-gold-dark" /> Báo giá</span>
                </button>
                <button onClick={handleShare} className="text-xs md:text-sm px-3 py-1.5 rounded-full bg-gold-light/10 border border-gold-light/60 hover:border-gold hover:bg-gold-light/20 transition-all">
                  <span className="inline-flex items-center gap-1"><Share2 size={14} className="text-gold-dark" /> Chia sẻ</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Enhanced Trust Badges with Social Proof */}
        <div className="bg-white/60 backdrop-blur-sm border-y border-gold-light/20 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Wifi size={16} className={`${isOnline ? 'text-green-500' : 'text-red-500'}`} />
                  {isOnline && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                </div>
                <span className="font-medium">{isOnline ? 'Trực tuyến' : 'Ngoại tuyến'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gold-dark" />
                <span><span className="font-semibold text-gold-dark">{userCount.toLocaleString('vi-VN')}</span> người đang xem</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-gold-dark" />
                <span>Dữ liệu chính thức</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gold-dark" />
                <span>Cập nhật mỗi phút</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-gold-dark" />
                <span>7+ nguồn uy tín</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Chips */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a href="#price-info" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-full border border-gold-light/30 text-sm font-medium text-slate-700 hover:bg-gold-light/30 hover:border-gold-light transition-all shadow-sm hover:shadow-md group">
              <BarChart3 size={16} className="text-gold-dark group-hover:scale-110 transition-transform" />
              Giá SJC hôm nay
            </a>
            <a href="#comparison" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-full border border-gold-light/30 text-sm font-medium text-slate-700 hover:bg-gold-light/30 hover:border-gold-light transition-all shadow-sm hover:shadow-md group">
              <Scale size={16} className="text-gold-dark group-hover:scale-110 transition-transform" />
              So sánh DOJI vs PNJ
            </a>
            <a href="/gold-chart" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-full border border-gold-light/30 text-sm font-medium text-slate-700 hover:bg-gold-light/30 hover:border-gold-light transition-all shadow-sm hover:shadow-md group">
              <LineChart size={16} className="text-gold-dark group-hover:scale-110 transition-transform" />
              Biểu đồ 7 ngày
            </a>
            <a href="#faq-section" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-full border border-gold-light/30 text-sm font-medium text-slate-700 hover:bg-gold-light/30 hover:border-gold-light transition-all shadow-sm hover:shadow-md group">
              <Gem size={16} className="text-gold-dark group-hover:scale-110 transition-transform" />
              Nhẫn 9999
            </a>
          </div>

          {/* Recent Activity Feed */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gold-light/30 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} className="text-gold-dark" />
                <h3 className="font-medium text-slate-700">Hoạt động gần đây</h3>
                <div className="flex-1"></div>
                <span className="text-xs text-slate-500">Cập nhật {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s trước</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600">Giá SJC tăng <span className="font-semibold text-green-600">+50,000đ</span> trong 15 phút qua</span>
                  <div className="flex-1"></div>
                  <span className="text-xs text-slate-400">2 phút trước</span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600">247 người vừa xem bảng giá DOJI</span>
                  <div className="flex-1"></div>
                  <span className="text-xs text-slate-400">5 phút trước</span>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-slate-600">Chênh lệch SJC-Thế giới: <span className="font-semibold text-orange-600">17.2M đồng/lượng</span></span>
                  <div className="flex-1"></div>
                  <span className="text-xs text-slate-400">8 phút trước</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-0 md:py-8">
          {/* Enhanced Search Bar */}
          <div className="mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchInput.trim()) {
                  setSearchParams({ q: searchInput.trim() });
                }
              }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gold-light/40 rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-shadow">
                <SearchIcon size={20} className="text-gold-dark" aria-hidden="true" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="search"
                  placeholder="Tìm kiếm: giá SJC, so sánh DOJI/PNJ, biểu đồ, tin tức..."
                  className="flex-1 bg-transparent focus:outline-none placeholder:text-slate-400 text-sm"
                  aria-label="Ô tìm kiếm nội dung"
                />
                <button type="submit" className="bg-gradient-to-r from-gold-dark to-gold text-white px-6 py-2 rounded-full font-medium hover:shadow-md transition-all">
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
          {/* Enhanced Title Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div className="relative">
              <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-4 sm:mb-0">
                <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                  Giá Vàng 247 Online, Cập Nhật 24/7
                </span>
              </h1>
              <div className="hidden md:block absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-gold-dark to-transparent"></div>
              <p className="text-slate-600 mt-3 text-sm md:text-base max-w-lg">
                Thông tin giá vàng chính xác từ SJC, DOJI, PNJ, BTMC và các đơn vị uy tín khác
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-light/50 text-sm font-medium text-slate-700 hover:bg-gold-light/20 hover:border-gold transition-all duration-300 shadow-sm hover:shadow-lg group"
                aria-label="Chia sẻ thông tin giá vàng"
              >
                <Share2 size={16} className="text-gold-dark group-hover:scale-110 transition-transform" />
                <span>Chia sẻ</span>
              </button>
              <button 
                onClick={handleNotify}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 group"
                aria-label="Đăng ký nhận thông báo giá vàng"
              >
                <Bell size={16} className="group-hover:animate-bounce" />
                <span>Thông báo</span>
              </button>
            </div>
          </div>
          
          {/* Price Info Cards */}
          <div id="price-info" className="mb-16 relative">
            <div className="absolute -top-20 -right-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10 transform hover:scale-[1.01] transition-transform duration-500">
              <PriceInfo />
            </div>
          </div>
          
          {/* Gold Price Tabs with Time Filter */}
          <div className="mb-16 bg-gradient-to-b from-white to-gold-muted/10 pt-6 pb-10 px-6 rounded-3xl shadow-sm border border-gold-light/20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 font-playfair text-slate-800">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Bảng Giá Vàng Chi Tiết
                  </span>
                </h2>
                <div className="hidden md:block absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-gold-dark to-transparent"></div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gold-light/30 shadow-md">
                <Tabs defaultValue="today" value={timeFilter} onValueChange={setTimeFilter}>
                  <TabsList className="bg-gold-muted/20" aria-label="Chọn khoảng thời gian">
                    <TabsTrigger 
                      value="today" 
                      className="text-xs md:text-sm font-medium"
                      aria-label="Xem giá vàng hôm nay"
                    >
                      Hôm nay
                    </TabsTrigger>
                    <TabsTrigger 
                      value="week" 
                      className="text-xs md:text-sm font-medium"
                      aria-label="Xem giá vàng tuần này"
                    >
                      Tuần này
                    </TabsTrigger>
                    <TabsTrigger 
                      value="month" 
                      className="text-xs md:text-sm font-medium"
                      aria-label="Xem giá vàng tháng này"
                    >
                      Tháng này
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <GoldTabs />
            <div className="text-right mt-6">
              <p className="text-xs text-slate-500 italic">Nguồn: SJC, DOJI, PNJ, BTMC, Mi Hồng, Phú Quý, Huy Thanh</p>
              <p className="text-xs text-slate-500">Cập nhật: {formattedDateTime}</p>
            </div>
          </div>
          
          {/* Gold Comparison Tool - Unique Feature */}
          <div id="comparison" className="mb-16 relative">
            <div className="absolute -top-20 -left-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -right-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10 transform hover:scale-[1.01] transition-transform duration-500">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Công Cụ So Sánh Giá Vàng
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
                <p className="text-slate-600 mt-3 text-center max-w-2xl">
                  Tính năng độc đáo giúp bạn so sánh giá vàng giữa các đơn vị kinh doanh, 
                  loại vàng khác nhau hoặc theo dõi biến động giá qua thời gian
                </p>
              </div>
              <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-dark" /></div>}>
                <GoldComparison />
              </Suspense>
            </div>
          </div>
          
          {/* Market Analysis */}
          <div className="mb-16 relative">
            <div className="absolute -bottom-10 right-10 bg-gradient-rich h-40 w-40 rounded-full blur-2xl opacity-20"></div>
            <div className="relative">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Phân Tích & Dự Báo Thị Trường
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
              </div>
              <div className="transform hover:scale-[1.01] transition-transform duration-500">
                <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-dark" /></div>}>
                  <MarketTrend />
                </Suspense>
              </div>
              <div className="text-center mt-8">
                <a 
                  href="/phan-tich" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold-dark to-gold text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                  aria-label="Xem thêm phân tích chuyên sâu về thị trường vàng"
                >
                  Xem thêm phân tích chuyên sâu
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-gold-light/30" id="faq-section">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                  Câu Hỏi Thường Gặp
                </span>
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
            </div>
            <div className="space-y-5">
              <FaqItem 
                question="Giá vàng SJC hôm nay là bao nhiêu?" 
                answer="Giá vàng SJC hôm nay đang ở mức 78,900,000 đồng/lượng (mua vào) và 80,900,000 đồng/lượng (bán ra). Giá cập nhật liên tục 24/7 trên trang GiaVang247."
              />
              <FaqItem 
                question="Làm thế nào để theo dõi biến động giá vàng?" 
                answer="Bạn có thể theo dõi biến động giá vàng qua biểu đồ phân tích trên trang GiaVang247, cập nhật liên tục 24/7 với dữ liệu từ các nhà cung cấp uy tín như SJC, DOJI, PNJ, Bảo Tín Minh Châu."
              />
              <FaqItem 
                question="Chênh lệch giữa giá vàng SJC và vàng thế giới là bao nhiêu?" 
                answer="Hiện tại, chênh lệch giữa giá vàng SJC và giá vàng thế giới dao động từ 17-18 triệu đồng/lượng, cao hơn nhiều so với mức chênh lệch bình thường trong các năm trước."
              />
            </div>
          </div>
          
          {/* Enhanced Newsletter Subscription */}
          <div className="mb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-light/30 via-gold/20 to-gold-muted/30 rounded-3xl"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-light/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold-muted/20 rounded-full blur-2xl"></div>
            <div className="relative p-8 rounded-3xl shadow-lg border border-gold-light/40 backdrop-blur-sm">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Bell className="text-gold-dark animate-pulse" size={28} />
                  <h3 className="text-2xl md:text-3xl font-bold font-playfair text-slate-800">Cảnh báo giá vàng miễn phí</h3>
                </div>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Nhận thông báo ngay khi giá vàng biến động <span className="font-semibold text-gold-dark">≥ 100.000đ/lượng</span>
                  <br />
                  <span className="text-sm flex items-center justify-center gap-4 mt-2">
                    <span className="inline-flex items-center gap-1">
                      <Mail size={14} className="text-gold-dark" /> Qua email
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare size={14} className="text-gold-dark" /> Telegram
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle size={14} className="text-gold-dark" /> Hoàn toàn miễn phí
                    </span>
                  </span>
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  aria-label="Nhập email để đăng ký"
                  className="flex-1 px-5 py-3 border border-gold-light/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent shadow-inner bg-white/90"
                  required
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-gold-dark to-gold text-white px-8 py-3 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  aria-label="Đăng ký nhận cảnh báo giá vàng"
                >
                  Đăng ký ngay
                </button>
              </form>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-4">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-500" /> Không spam
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-500" /> Có thể hủy bất kỳ lúc nào
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle size={12} className="text-green-500" /> Bảo mật thông tin
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

        {/* Price Alert Modal */}
        <Dialog
          open={showPriceAlert}
          onOpenChange={(open) => {
            setShowPriceAlert(open);
            if (!open) {
              setAlertError(null);
              setAlertSubmitting(false);
            }
          }}
        >
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="text-gold-dark" size={24} />
                Thiết lập cảnh báo giá vàng
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePriceAlertSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Email nhận thông báo
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Cảnh báo khi giá thay đổi ≥
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="100000"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    đồng/lượng
                  </span>
                </div>
              </div>
              {alertError && (
                <p className="text-sm text-red-500">
                  {alertError}
                </p>
              )}
              <div className="bg-gold-light/10 p-3 rounded-lg text-sm text-slate-600">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={14} className="text-gold-dark" />
                  <span className="font-medium">Tính năng Premium</span>
                </div>
                <ul className="space-y-1 text-xs">
                  <li>• Thông báo qua Email + Telegram</li>
                  <li>• Cảnh báo trong vòng 30 giây</li>
                  <li>• Phân tích xu hướng tự động</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPriceAlert(false)}
                  className="flex-1"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-gold-dark to-gold hover:shadow-lg"
                  disabled={alertSubmitting}
                >
                  {alertSubmitting ? "Đang đăng ký..." : "Đăng ký ngay"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Mobile Sticky Bottom Action Bar */}
        <div className="md:hidden fixed bottom-4 inset-x-0 px-4 z-40">
          <div className="mx-auto max-w-sm bg-white/95 backdrop-blur-md border border-gold-light/40 shadow-xl rounded-2xl flex items-center justify-between px-4 py-2">
            <button onClick={handleNotify} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gold-light/20 transition-colors">
              <Bell size={16} className="text-gold-dark" />
              <span className="text-xs text-slate-600">Báo giá</span>
            </button>
            <a href="/gold-chart" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gold-light/20 transition-colors">
              <TrendingUp size={16} className="text-gold-dark" />
              <span className="text-xs text-slate-600">Biểu đồ</span>
            </a>
            <a href="#faq-section" className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gold-light/20 transition-colors">
              <SearchIcon size={16} className="text-gold-dark" />
              <span className="text-xs text-slate-600">FAQ</span>
            </a>
            <button onClick={handleShare} className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-gold-light/20 transition-colors">
              <Share2 size={16} className="text-gold-dark" />
              <span className="text-xs text-slate-600">Chia sẻ</span>
            </button>
          </div>
        </div>
      
        <Footer />
      </div>
    </GoldPriceProvider>
  );
};


export default Index;
