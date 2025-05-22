import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldTabs from "@/components/GoldTabs";
import PriceInfo from "@/components/PriceInfo";
import MarketTrend from "@/components/MarketTrend";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Bell, ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import FaqItem from "@/components/FaqItem";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { useScrollEffect } from "@/hooks/use-scroll-effect";

const Index = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const scrolled = useScrollEffect(50);
  
  // Use our custom hook for formatted date/time
  const { formattedDateTime } = useFormattedDate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO pageName="home" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-10 md:py-16">
          {/* Time Filter and Share Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
            <div className="relative">
              <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-4 sm:mb-0">
                <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                  Giá Vàng Hôm Nay
                </span>
              </h1>
              <div className="hidden md:block absolute -bottom-2 left-0 w-1/2 h-0.5 bg-gradient-to-r from-gold-dark to-transparent"></div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-light/50 text-sm font-medium text-slate-700 hover:bg-gold-light/10 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gold"
                aria-label="Chia sẻ thông tin giá vàng"
              >
                <Share2 size={16} className="text-gold-dark" />
                <span>Chia sẻ</span>
              </button>
              <button 
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-light/50 text-sm font-medium text-slate-700 hover:bg-gold-light/10 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gold"
                aria-label="Đăng ký nhận thông báo giá vàng"
              >
                <Bell size={16} className="text-gold-dark" />
                <span>Thông báo</span>
              </button>
            </div>
          </div>
          
          {/* Price Info Cards */}
          <div className="mb-16 relative">
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
                <MarketTrend />
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
          
          {/* Newsletter Subscription */}
          <div className="mb-16 bg-gradient-to-r from-gold-light/20 via-gold/10 to-gold-muted/20 p-8 rounded-3xl shadow-md border border-gold-light/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold font-playfair text-slate-800 mb-3">Nhận thông báo giá vàng</h3>
                <p className="text-slate-600">Đăng ký để nhận thông báo khi giá vàng biến động mạnh</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  aria-label="Email của bạn"
                  className="px-5 py-3 border border-gold-light/50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold-light w-full md:w-auto shadow-inner"
                />
                <button 
                  className="bg-gradient-luxury text-white px-6 py-3 rounded-r-lg font-medium hover:shadow-lg transition-all duration-300"
                  aria-label="Đăng ký nhận thông báo"
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};


export default Index;
