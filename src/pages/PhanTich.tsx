import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart, PieChart, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight, Loader2 } from "lucide-react";
import { articles } from "@/data/articles";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useState, useEffect } from "react";
import { fetchMarketAnalysisForPhanTich, MarketAnalysisForPhanTichResponse } from "@/services/deepseek";

const PhanTich = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysisForPhanTichResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fetch market analysis data
  useEffect(() => {
    const getMarketAnalysis = async () => {
      try {
        setLoading(true);
        const response = await fetchMarketAnalysisForPhanTich();
        
        if (response.success && response.data) {
          setMarketAnalysis(response.data);
          setError(null);
        } else {
          setError(response.error || 'Failed to fetch market analysis');
        }
      } catch (err) {
        setError('An error occurred while fetching market analysis');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getMarketAnalysis();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO 
        pageName="phan-tich" 
        additionalKeywords="phân tích thị trường vàng, dự báo giá vàng hôm nay, xu hướng giá vàng, phân tích kỹ thuật vàng, phân tích cơ bản vàng"
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-gold-light via-white to-gold-muted py-12 md:py-16 relative overflow-hidden">
          {/* Gold Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          
          {/* Golden Orbs */}
          <div className="absolute top-1/4 left-10 bg-gradient-rich h-24 w-24 rounded-full blur-xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-10 bg-gradient-rich h-32 w-32 rounded-full blur-xl opacity-30"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center font-playfair mb-4">
                <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                  Phân Tích Thị Trường
                </span>
              </h1>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
            </div>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Thông tin phân tích chuyên sâu về thị trường vàng trong nước và quốc tế
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-10 md:py-16">
          {/* Market Analysis */}
          <div className="mb-16 relative">
            <div className="absolute -top-20 -right-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Chỉ Số Thị Trường
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-gold-dark animate-spin mb-4" />
                    <p className="text-slate-600">Đang tải phân tích thị trường...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <p className="text-red-600 mb-2">Không thể tải phân tích thị trường</p>
                  <p className="text-slate-600 text-sm">{error}</p>
                </div>
              ) : marketAnalysis ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Phân Tích Kỹ Thuật */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                        <BarChart className="text-white" size={24} />
                      </div>
                      <h2 className="text-xl font-bold font-playfair">{marketAnalysis.technicalAnalysis.title}</h2>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {marketAnalysis.technicalAnalysis.description}
                    </p>
                    <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                      {marketAnalysis.technicalAnalysis.indicators.map((indicator, index) => (
                        <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                          <span className="font-medium">{indicator.name}</span>
                          <span className={`font-medium ${
                            indicator.interpretation === 'positive' ? 'text-green-600' : 
                            indicator.interpretation === 'negative' ? 'text-red-600' : 'text-slate-600'
                          }`}>
                            {indicator.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Phân Tích Cơ Bản */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                        <PieChart className="text-white" size={24} />
                      </div>
                      <h2 className="text-xl font-bold font-playfair">{marketAnalysis.fundamentalAnalysis.title}</h2>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {marketAnalysis.fundamentalAnalysis.description}
                    </p>
                    <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                      {marketAnalysis.fundamentalAnalysis.factors.map((factor, index) => (
                        <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                          <span className="font-medium">{factor.name}</span>
                          <span className={`font-medium ${
                            factor.interpretation === 'positive' ? 'text-green-600' : 
                            factor.interpretation === 'negative' ? 'text-red-600' : 'text-slate-600'
                          } flex items-center`}>
                            {factor.value}
                            {factor.interpretation === 'positive' && <ArrowUpRight size={14} className="ml-1" />}
                            {factor.interpretation === 'negative' && <ArrowDownRight size={14} className="ml-1" />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dự Báo Giá */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                        <Activity className="text-white" size={24} />
                      </div>
                      <h2 className="text-xl font-bold font-playfair">{marketAnalysis.priceForecasts.title}</h2>
                    </div>
                    <p className="text-slate-600 mb-4">
                      {marketAnalysis.priceForecasts.description}
                    </p>
                    <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                      {marketAnalysis.priceForecasts.forecasts.map((forecast, index) => (
                        <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                          <span className="font-medium">{forecast.timeframe}</span>
                          <span className={`font-medium ${
                            forecast.trend === 'up' ? 'text-green-600' : 
                            forecast.trend === 'down' ? 'text-red-600' : 'text-slate-600'
                          } flex items-center`}>
                            {forecast.description}
                            {forecast.trend === 'up' && <TrendingUp size={14} className="ml-1" />}
                            {forecast.trend === 'down' && <ArrowDownRight size={14} className="ml-1" />}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <p className="text-yellow-600">Không có dữ liệu phân tích thị trường</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Analysis */}
          <div className="mb-16 relative">
            <div className="absolute -bottom-10 right-10 bg-gradient-rich h-40 w-40 rounded-full blur-2xl opacity-20"></div>
            
            <div className="relative">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Bài Phân Tích Mới Nhất
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map(article => (
                  <div 
                    key={article.id} 
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300 cursor-pointer" 
                    onClick={() => navigate(`/phan-tich/bai-viet/${article.id}`)}
                  >
                    <h3 className="text-xl font-bold font-playfair mb-3">{article.title}</h3>
                    <p className="text-sm text-gold-dark">Đăng ngày: {article.date}</p>
                    <p className="mt-4 text-slate-600">{article.summary}</p>
                    <div className="mt-5 flex justify-end">
                      <span className="inline-flex items-center gap-1.5 text-gold-dark font-medium hover:underline">
                        Đọc tiếp <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Expert Opinions */}
          {marketAnalysis && (
            <div className="mb-16 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-gold-light/30 transform hover:scale-[1.01] transition-all duration-500">
              <div className="flex flex-col items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair text-center">
                  <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                    Ý Kiến Chuyên Gia
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {marketAnalysis.expertOpinions.map((opinion, index) => (
                  <div key={index} className="bg-gradient-to-r from-gold-light/20 via-gold/10 to-gold-muted/20 p-6 rounded-2xl flex-1 shadow-inner">
                    <p className="italic mb-4 text-slate-700 leading-relaxed">
                      "{opinion.quote}"
                    </p>
                    <div className="pt-3 border-t border-dashed border-gold-light/30">
                      <p className="font-medium text-slate-800">{opinion.expert} - {opinion.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Newsletter Subscription */}
          <div className="mb-16 bg-gradient-to-r from-gold-light/20 via-gold/10 to-gold-muted/20 p-8 rounded-3xl shadow-md border border-gold-light/30">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold font-playfair text-slate-800 mb-3">Nhận thông báo phân tích</h3>
                <p className="text-slate-600">Đăng ký để nhận các bài phân tích chuyên sâu về thị trường vàng</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="px-5 py-3 border border-gold-light/50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold-light w-full md:w-auto shadow-inner"
                />
                <button className="bg-gradient-luxury text-white px-6 py-3 rounded-r-lg font-medium hover:shadow-lg transition-all duration-300">
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

export default PhanTich;
