
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gold-light to-gold-muted py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-gold-dark">
              Trung Tâm Trợ Giúp
            </h1>
            <p className="text-slate-700 max-w-2xl mx-auto">
              Giải đáp mọi thắc mắc của bạn về giá vàng và cách sử dụng trang web GiaVang247
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Help Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gold-light/20 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <HelpCircle className="text-gold mr-2" size={24} />
                  <h2 className="text-xl font-semibold font-playfair">Hướng dẫn sử dụng</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  Tìm hiểu cách sử dụng trang web GiaVang247 để theo dõi giá vàng mới nhất và xem phân tích thị trường.
                </p>
                <a href="#guide" className="text-gold-dark font-medium hover:underline">
                  Xem hướng dẫn →
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gold-light/20 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <MessageCircle className="text-gold mr-2" size={24} />
                  <h2 className="text-xl font-semibold font-playfair">Câu hỏi thường gặp</h2>
                </div>
                <p className="text-slate-600 mb-4">
                  Giải đáp các câu hỏi phổ biến về giá vàng, nguồn dữ liệu và cách thức cập nhật thông tin.
                </p>
                <a href="#faq" className="text-gold-dark font-medium hover:underline">
                  Xem câu hỏi thường gặp →
                </a>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div id="faq" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-playfair pb-2 border-b border-gold-light/30">
                Câu Hỏi Thường Gặp
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium">
                    Giá vàng được cập nhật với tần suất như thế nào?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Giá vàng trên GiaVang247 được cập nhật liên tục 24/7, với tần suất cập nhật thời gian thực trong giờ giao dịch và mỗi 30 phút ngoài giờ giao dịch.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium">
                    Nguồn dữ liệu giá vàng được lấy từ đâu?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Dữ liệu giá vàng được thu thập trực tiếp từ các đơn vị kinh doanh vàng uy tín tại Việt Nam như SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý và Huy Thanh, đảm bảo tính chính xác và đáng tin cậy.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium">
                    Làm thế nào để theo dõi lịch sử giá vàng?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Bạn có thể xem biểu đồ lịch sử giá vàng trong phần "Biến động giá vàng" trên trang chủ. Chúng tôi cung cấp biểu đồ theo dõi giá vàng trong 30 ngày, 3 tháng, 6 tháng và 1 năm gần nhất.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium">
                    Tôi có thể nhận thông báo khi giá vàng biến động mạnh không?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Có, bạn có thể đăng ký nhận thông báo về biến động giá vàng qua email hoặc thông báo đẩy trên trình duyệt. Tính năng này sẽ giúp bạn không bỏ lỡ các cơ hội đầu tư khi giá vàng có biến động đáng kể.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium">
                    GiaVang247 có cung cấp phân tích và dự báo giá vàng không?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Có, chúng tôi cung cấp các bài phân tích chuyên sâu và dự báo về thị trường vàng từ các chuyên gia hàng đầu. Bạn có thể xem các bài phân tích này trong mục "Phân Tích" trên trang web.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Contact Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 font-playfair pb-2 border-b border-gold-light/30">
                Vẫn còn thắc mắc?
              </h2>
              <p className="text-slate-600 mb-6">
                Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, vui lòng liên hệ với chúng tôi qua:
              </p>
              
              <div className="bg-gradient-to-r from-gold-light/20 to-gold-muted/20 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gold-dark mb-2">Email hỗ trợ:</h3>
                    <p className="text-slate-700">hotro@giavang247.online</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gold-dark mb-2">Hotline:</h3>
                    <p className="text-slate-700">0123.456.789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
