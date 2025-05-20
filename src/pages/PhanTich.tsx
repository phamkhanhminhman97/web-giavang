import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart, PieChart, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { articles } from "@/data/articles";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useState, useEffect } from "react";

const PhanTich = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO pageName="phan-tich" />
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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                      <BarChart className="text-white" size={24} />
                    </div>
                    <h2 className="text-xl font-bold font-playfair">Phân Tích Kỹ Thuật</h2>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Vàng đang trong xu hướng tăng giá với hỗ trợ mạnh ở mức 11.500.000 VNĐ/lượng. Các chỉ báo kỹ thuật như RSI và MACD đều cho thấy tín hiệu tích cực trong ngắn hạn.
                  </p>
                  <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">RSI (14)</span>
                      <span className="text-green-600 font-medium">62.4</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">MACD</span>
                      <span className="text-green-600 font-medium">Tích cực</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bollinger Bands</span>
                      <span className="text-slate-800 font-medium">Mở rộng</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                      <PieChart className="text-white" size={24} />
                    </div>
                    <h2 className="text-xl font-bold font-playfair">Phân Tích Cơ Bản</h2>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Lạm phát tại Mỹ tăng cao, căng thẳng địa chính trị, và sự suy yếu của đồng USD là những yếu tố thúc đẩy giá vàng tăng trong thời gian gần đây.
                  </p>
                  <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Lạm phát Mỹ</span>
                      <span className="text-red-600 font-medium">3.4%</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Lãi suất FED</span>
                      <span className="font-medium">5.25-5.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">USD Index</span>
                      <span className="text-red-600 font-medium flex items-center">
                        104.2 <ArrowDownRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-gold-dark to-gold p-2.5 rounded-full text-white">
                      <Activity className="text-white" size={24} />
                    </div>
                    <h2 className="text-xl font-bold font-playfair">Dự Báo Giá</h2>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Dựa trên các phân tích kỹ thuật và cơ bản, chúng tôi dự báo giá vàng SJC trong tuần tới sẽ dao động trong khoảng 11.500.000 - 11.900.000 VNĐ/lượng.
                  </p>
                  <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 rounded-xl p-5 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Ngắn hạn (1 tuần)</span>
                      <span className="text-green-600 font-medium flex items-center">
                        Tăng <TrendingUp size={14} className="ml-1" />
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Trung hạn (1 tháng)</span>
                      <span className="text-green-600 font-medium">Tăng nhẹ</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dài hạn (3-6 tháng)</span>
                      <span className="font-medium">Dao động</span>
                    </div>
                  </div>
                </div>
              </div>
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
              <div className="bg-gradient-to-r from-gold-light/20 via-gold/10 to-gold-muted/20 p-6 rounded-2xl flex-1 shadow-inner">
                <p className="italic mb-4 text-slate-700 leading-relaxed">
                  "Giá vàng trong nước sẽ tiếp tục duy trì mức chênh lệch cao so với giá thế giới do cung không đủ cầu. Nhà đầu tư cần thận trọng khi giá đang ở vùng đỉnh lịch sử."
                </p>
                <div className="pt-3 border-t border-dashed border-gold-light/30">
                  <p className="font-medium text-slate-800">TS. Nguyễn Văn A - Chuyên gia kinh tế</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gold-light/20 via-gold/10 to-gold-muted/20 p-6 rounded-2xl flex-1 shadow-inner">
                <p className="italic mb-4 text-slate-700 leading-relaxed">
                  "Vàng vẫn là kênh trú ẩn an toàn trong bối cảnh bất ổn toàn cầu, nhưng nhà đầu tư nên phân bổ tài sản hợp lý và không nên đầu tư quá nhiều vào một thời điểm."
                </p>
                <div className="pt-3 border-t border-dashed border-gold-light/30">
                  <p className="font-medium text-slate-800">TS. Trần Thị B - Giám đốc phân tích</p>
                </div>
              </div>
            </div>
          </div>
          
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
