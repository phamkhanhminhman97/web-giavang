import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BarChart, PieChart, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

const PhanTich = () => {
  const [expandedArticles, setExpandedArticles] = useState<{[key: number]: boolean}>({});
  
  const toggleArticle = (index: number) => {
    setExpandedArticles(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <div className="min-h-screen flex flex-col">
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
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Giá Vàng Thế Giới Tác Động Như Thế Nào Đến Vàng SJC?</h3>
                <p className="text-sm text-gold">Đăng ngày: 15/05/2025</p>
                <p className="mt-4 text-slate-600">
                  Sự chênh lệch giữa giá vàng SJC và giá vàng thế giới đang ở mức cao kỷ lục. Nguyên nhân chủ yếu đến từ chính sách quản lý của Ngân hàng Nhà nước và nhu cầu trong nước tăng cao...
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>
              
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Dự Báo Giá Vàng Quý 3/2025: Đâu Là Điểm Đỉnh?</h3>
                <p className="text-sm text-gold">Đăng ngày: 10/05/2025</p>
                <p className="mt-4 text-slate-600">
                  Với các dự báo về việc FED sẽ bắt đầu cắt giảm lãi suất từ tháng 9/2025, giá vàng được kỳ vọng sẽ tiếp tục đà tăng trong quý 3. Mức kháng cự mạnh sẽ là 2.500 USD/ounce...
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Bài viết bổ sung 1 */}
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Xu Hướng Giá Vàng Năm 2025: Cơ Hội Và Thách Thức</h3>
                <p className="text-sm text-gold">Đăng ngày: 05/05/2025</p>
                <p className="mt-4 text-slate-600">
                  Năm 2025, thị trường vàng toàn cầu dự báo tiếp tục biến động mạnh do lạm phát và các yếu tố địa chính trị. Nhà đầu tư cần theo dõi sát các chỉ số kinh tế lớn và xu hướng chính sách tiền tệ của các ngân hàng trung ương.
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Bài viết bổ sung 2 */}
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Tác Động Của Lãi Suất Và USD Đến Thị Trường Vàng</h3>
                <p className="text-sm text-gold">Đăng ngày: 02/05/2025</p>
                <p className="mt-4 text-slate-600">
                  Lãi suất thực tế và sức mạnh của đồng USD là hai yếu tố then chốt quyết định xu hướng giá vàng. Khi lãi suất tăng, vàng thường chịu áp lực giảm giá, ngược lại USD suy yếu sẽ hỗ trợ vàng tăng giá.
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Bài viết bổ sung 3 */}
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Vai Trò Của Vàng Trong Danh Mục Đầu Tư Cá Nhân</h3>
                <p className="text-sm text-gold">Đăng ngày: 28/04/2025</p>
                <p className="mt-4 text-slate-600">
                  Vàng luôn được xem là tài sản trú ẩn an toàn. Tuy nhiên, tỷ trọng vàng trong danh mục đầu tư nên cân nhắc hợp lý, tránh đầu cơ ngắn hạn và nên phân bổ đa dạng hóa tài sản.
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Bài viết bổ sung 4 */}
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Thị Trường Vàng Việt Nam: Cơ Hội Và Rủi Ro</h3>
                <p className="text-sm text-gold">Đăng ngày: 25/04/2025</p>
                <p className="mt-4 text-slate-600">
                  Thị trường vàng Việt Nam năm 2025 được dự báo sẽ tiếp tục sôi động với nhiều cơ hội nhưng cũng tiềm ẩn không ít rủi ro do biến động chính sách và tỷ giá.
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Bài viết bổ sung 5 */}
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h3 className="text-xl font-bold font-playfair mb-3">Phân Tích Kỹ Thuật Vàng: Xu Hướng Và Mốc Hỗ Trợ</h3>
                <p className="text-sm text-gold">Đăng ngày: 20/04/2025</p>
                <p className="mt-4 text-slate-600">
                  Các chỉ báo kỹ thuật như RSI, MACD, Bollinger Bands đều cho thấy vàng đang trong xu hướng tăng trung hạn, với vùng hỗ trợ mạnh quanh 11.400.000 VNĐ/lượng.
                </p>
                <button className="mt-4 text-gold-dark font-medium flex items-center gap-1 hover:underline">
                  Đọc tiếp <ArrowUpRight size={14} />
                </button>
              </div>
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
