import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart, PieChart, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { articles } from "@/data/articles";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";

const PhanTich = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO pageName="phan-tich" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-luxury py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gold-dark font-playfair mb-6">
              Phân Tích Thị Trường
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Thông tin phân tích chuyên sâu về thị trường vàng trong nước và quốc tế
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Market Analysis */}
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="price-card p-6 hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-light p-2 rounded-full">
                  <BarChart className="text-gold-dark" size={24} />
                </div>
                <h2 className="text-xl font-bold font-playfair">Phân Tích Kỹ Thuật</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Vàng đang trong xu hướng tăng giá với hỗ trợ mạnh ở mức 11.500.000 VNĐ/lượng. Các chỉ báo kỹ thuật như RSI và MACD đều cho thấy tín hiệu tích cực trong ngắn hạn.
              </p>
              <div className="bg-gradient-to-r from-gold-light to-gold-muted rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">RSI (14)</span>
                  <span className="text-green-600 font-medium">62.4</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">MACD</span>
                  <span className="text-green-600 font-medium">Tích cực</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Bollinger Bands</span>
                  <span className="text-slate-800 font-medium">Mở rộng</span>
                </div>
              </div>
            </div>
            
            <div className="price-card p-6 hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-light p-2 rounded-full">
                  <PieChart className="text-gold-dark" size={24} />
                </div>
                <h2 className="text-xl font-bold font-playfair">Phân Tích Cơ Bản</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Lạm phát tại Mỹ tăng cao, căng thẳng địa chính trị, và sự suy yếu của đồng USD là những yếu tố thúc đẩy giá vàng tăng trong thời gian gần đây.
              </p>
              <div className="bg-gradient-to-r from-gold-light to-gold-muted rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Lạm phát Mỹ</span>
                  <span className="text-red-600 font-medium">3.4%</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Lãi suất FED</span>
                  <span className="font-medium">5.25-5.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">USD Index</span>
                  <span className="text-red-600 font-medium">104.2 <ArrowDownRight size={14} className="inline" /></span>
                </div>
              </div>
            </div>
            
            <div className="price-card p-6 hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-light p-2 rounded-full">
                  <Activity className="text-gold-dark" size={24} />
                </div>
                <h2 className="text-xl font-bold font-playfair">Dự Báo Giá</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Dựa trên các phân tích kỹ thuật và cơ bản, chúng tôi dự báo giá vàng SJC trong tuần tới sẽ dao động trong khoảng 11.500.000 - 11.900.000 VNĐ/lượng.
              </p>
              <div className="bg-gradient-to-r from-gold-light to-gold-muted rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Ngắn hạn (1 tuần)</span>
                  <span className="text-green-600 font-medium">Tăng <TrendingUp size={14} className="inline" /></span>
                </div>
                <div className="flex justify-between items-center mb-2">
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
          
          {/* Recent Analysis */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 font-playfair text-slate-800">
              Bài Phân Tích Mới Nhất
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map(article => (
                <div key={article.id} className="price-card p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate(`/phan-tich/bai-viet/${article.id}`)}>
                  <h3 className="text-xl font-bold font-playfair mb-3">{article.title}</h3>
                  <p className="text-sm text-gold">Đăng ngày: {article.date}</p>
                  <p className="mt-4 text-slate-600">{article.summary}</p>
                  <span className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">Đọc tiếp <ArrowUpRight size={14} /></span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="price-card p-6 hover:scale-[1.01] transition-all">
            <h3 className="text-xl font-bold font-playfair mb-4 text-center">Ý Kiến Chuyên Gia</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gradient-to-r from-gold-muted to-white p-4 rounded-lg flex-1">
                <p className="italic mb-4 text-slate-700">"Giá vàng trong nước sẽ tiếp tục duy trì mức chênh lệch cao so với giá thế giới do cung không đủ cầu. Nhà đầu tư cần thận trọng khi giá đang ở vùng đỉnh lịch sử."</p>
                <p className="font-medium">TS. Nguyễn Văn A - Chuyên gia kinh tế</p>
              </div>
              
              <div className="bg-gradient-to-r from-gold-muted to-white p-4 rounded-lg flex-1">
                <p className="italic mb-4 text-slate-700">"Vàng vẫn là kênh trú ẩn an toàn trong bối cảnh bất ổn toàn cầu, nhưng nhà đầu tư nên phân bổ tài sản hợp lý và không nên đầu tư quá nhiều vào một thời điểm."</p>
                <p className="font-medium">TS. Trần Thị B - Giám đốc phân tích</p>
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
