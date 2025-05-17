
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Award, Clock } from "lucide-react";

const GioiThieu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-luxury py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gold-dark font-playfair mb-6">
              Giới Thiệu
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Chuyên trang thông tin uy tín về giá vàng Việt Nam
            </p>
          </div>
        </div>
        
        {/* About Us */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold font-playfair text-slate-800 mb-6">
                  <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">Giá Vàng 24/7</span> - Cập Nhật Thông Tin Thị Trường Vàng Hàng Đầu Việt Nam
                </h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Ra đời từ năm 2015, <span className="font-semibold text-gold-dark">Giá Vàng 24/7</span> là chuyên trang thông tin cập nhật liên tục về giá vàng trong nước và quốc tế. Chúng tôi tự hào là đơn vị tiên phong trong việc cung cấp thông tin giá vàng theo thời gian thực, giúp người dùng nắm bắt biến động thị trường một cách nhanh chóng và chính xác nhất.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Với đội ngũ chuyên gia phân tích thị trường giàu kinh nghiệm, chúng tôi không chỉ đơn thuần cung cấp thông tin giá cả mà còn đưa ra những nhận định, dự báo chuyên sâu về xu hướng thị trường, giúp bạn đưa ra quyết định đầu tư sáng suốt.
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-gold-light via-white to-gold-muted p-1 rounded-lg shadow-xl">
                  <div className="bg-white rounded-lg p-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gold-light p-2 rounded-full">
                          <CheckCircle className="text-gold-dark" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Độ Tin Cậy Cao</h3>
                          <p className="text-slate-600">Thông tin giá vàng được cập nhật liên tục từ các nguồn chính thống như SJC, DOJI, PNJ và thị trường quốc tế</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-gold-light p-2 rounded-full">
                          <Clock className="text-gold-dark" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Cập Nhật Liên Tục</h3>
                          <p className="text-slate-600">Hệ thống tự động cập nhật giá vàng mỗi 15 phút, đảm bảo thông tin luôn mới nhất</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-gold-light p-2 rounded-full">
                          <Award className="text-gold-dark" size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Phân Tích Chuyên Sâu</h3>
                          <p className="text-slate-600">Đội ngũ chuyên gia với nhiều năm kinh nghiệm phân tích thị trường vàng trong nước và quốc tế</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-rich h-24 w-24 rounded-full blur-xl opacity-40 -z-10"></div>
              </div>
            </div>
          </div>
          
          {/* Our Mission */}
          <div className="my-16">
            <div className="price-card p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 bg-gradient-rich h-40 w-40 rounded-full blur-3xl opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-8">
                  <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">Sứ Mệnh Của Chúng Tôi</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-gold-muted/30 to-white p-6 rounded-lg text-center">
                    <h3 className="font-bold text-xl mb-4">Cung Cấp Thông Tin</h3>
                    <p className="text-slate-600">Cập nhật giá vàng chính xác, kịp thời từ các nguồn uy tín trong nước và quốc tế</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gold-muted/30 to-white p-6 rounded-lg text-center">
                    <h3 className="font-bold text-xl mb-4">Phân Tích Chuyên Sâu</h3>
                    <p className="text-slate-600">Đưa ra những nhận định, dự báo về thị trường vàng dựa trên phân tích kỹ thuật và cơ bản</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gold-muted/30 to-white p-6 rounded-lg text-center">
                    <h3 className="font-bold text-xl mb-4">Hỗ Trợ Quyết Định</h3>
                    <p className="text-slate-600">Giúp người dùng đưa ra quyết định đầu tư thông minh dựa trên thông tin đáng tin cậy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Team */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair text-center mb-10">
              <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">Đội Ngũ Của Chúng Tôi</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="price-card p-6 text-center hover:scale-[1.03] transition-all">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold-dark mb-4"></div>
                <h3 className="font-bold text-lg">Nguyễn Văn A</h3>
                <p className="text-gold mb-3">Giám Đốc</p>
                <p className="text-slate-600 text-sm">15 năm kinh nghiệm phân tích thị trường vàng và kim loại quý</p>
              </div>
              
              <div className="price-card p-6 text-center hover:scale-[1.03] transition-all">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold-dark mb-4"></div>
                <h3 className="font-bold text-lg">Trần Thị B</h3>
                <p className="text-gold mb-3">Trưởng Phòng Phân Tích</p>
                <p className="text-slate-600 text-sm">Chuyên gia phân tích kỹ thuật với nhiều năm kinh nghiệm tại các công ty tài chính lớn</p>
              </div>
              
              <div className="price-card p-6 text-center hover:scale-[1.03] transition-all">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold-dark mb-4"></div>
                <h3 className="font-bold text-lg">Lê Văn C</h3>
                <p className="text-gold mb-3">Chuyên Viên Phân Tích</p>
                <p className="text-slate-600 text-sm">Thạc sĩ Kinh tế, chuyên gia phân tích thị trường vàng quốc tế</p>
              </div>
              
              <div className="price-card p-6 text-center hover:scale-[1.03] transition-all">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-light to-gold-dark mb-4"></div>
                <h3 className="font-bold text-lg">Phạm Thị D</h3>
                <p className="text-gold mb-3">Trưởng Bộ Phận Nội Dung</p>
                <p className="text-slate-600 text-sm">10 năm kinh nghiệm biên tập và sản xuất nội dung tài chính, chứng khoán</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GioiThieu;
