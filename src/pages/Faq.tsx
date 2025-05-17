
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gold-light to-gold-muted py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-gold-dark">
              Câu Hỏi Thường Gặp (FAQ)
            </h1>
            <p className="text-slate-700 max-w-2xl mx-auto">
              Giải đáp các câu hỏi phổ biến về thị trường vàng và dịch vụ của GiaVang247
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* FAQ Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <a href="#general" className="bg-white rounded-lg shadow-sm border border-gold-light/20 p-4 text-center hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gold-dark">Câu hỏi chung</h3>
              </a>
              
              <a href="#investment" className="bg-white rounded-lg shadow-sm border border-gold-light/20 p-4 text-center hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gold-dark">Đầu tư vàng</h3>
              </a>
              
              <a href="#technical" className="bg-white rounded-lg shadow-sm border border-gold-light/20 p-4 text-center hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gold-dark">Thông tin kỹ thuật</h3>
              </a>
            </div>
            
            {/* General Questions */}
            <section id="general" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-playfair pb-2 border-b border-gold-light/30">
                Câu hỏi chung về giá vàng
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-medium">
                    Tại sao giá vàng SJC và giá vàng thế giới có sự chênh lệch?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Giá vàng SJC và giá vàng thế giới có sự chênh lệch do nhiều yếu tố như: chính sách quản lý vàng của Ngân hàng Nhà nước, cung cầu thị trường trong nước, chi phí nhập khẩu và tinh luyện, thuế và các loại phí liên quan. Đôi khi, chênh lệch này có thể lên đến vài triệu đồng/lượng.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-medium">
                    Các loại vàng phổ biến ở Việt Nam là gì?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Các loại vàng phổ biến ở Việt Nam bao gồm: Vàng miếng SJC (được bảo đảm bởi Ngân hàng Nhà nước), vàng nhẫn 9999 (vàng 24K), vàng 999.9 các loại, vàng trang sức (thường từ 18K đến 24K). Ngoài ra còn có các loại vàng thương hiệu từ các đơn vị kinh doanh uy tín như DOJI, PNJ, Bảo Tín Minh Châu, v.v.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-medium">
                    Mua vàng vào thời điểm nào trong năm là tốt nhất?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Không có câu trả lời cố định cho câu hỏi này vì giá vàng biến động theo nhiều yếu tố khác nhau. Tuy nhiên, theo thống kê, giá vàng thường thấp vào khoảng tháng 6-7 và cao vào đầu năm (gần Tết Nguyên đán) và cuối năm. Đầu tư vàng nên dựa trên phân tích kỹ thuật, tình hình kinh tế và chính trị toàn cầu hơn là theo thời điểm cụ thể trong năm.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-medium">
                    Làm thế nào để phân biệt vàng thật và vàng giả?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Có nhiều cách để phân biệt vàng thật và vàng giả như: kiểm tra độ dẻo (vàng thật dẻo hơn), kiểm tra độ nặng (vàng thật có tỷ trọng cao hơn), kiểm tra từ tính (vàng thật không nhiễm từ), dùng axít nitric (vàng thật không bị ăn mòn), dùng máy kiểm tra vàng chuyên dụng. Tuy nhiên, cách tốt nhất là mua vàng từ các cửa hàng uy tín, có giấy chứng nhận và hóa đơn hợp lệ.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            {/* Investment Questions */}
            <section id="investment" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-playfair pb-2 border-b border-gold-light/30">
                Đầu tư vàng
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-medium">
                    Đầu tư vàng có an toàn không?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Đầu tư vàng được xem là một hình thức đầu tư tương đối an toàn để bảo toàn giá trị tài sản trong dài hạn, đặc biệt trong thời kỳ lạm phát cao hoặc bất ổn kinh tế. Tuy nhiên, giá vàng cũng có thể biến động mạnh trong ngắn hạn. Vì vậy, chuyên gia thường khuyến nghị đầu tư vàng nên là một phần trong chiến lược đa dạng hóa danh mục đầu tư chứ không nên đặt toàn bộ tài sản vào vàng.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-medium">
                    Nên đầu tư vàng miếng SJC hay vàng nhẫn?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Mỗi loại có ưu điểm riêng: Vàng miếng SJC có tính thanh khoản cao, được Ngân hàng Nhà nước bảo đảm, dễ mua bán nhưng có chênh lệch giá mua-bán cao hơn. Vàng nhẫn 9999 có chênh lệch giá mua-bán thấp hơn, dễ chia nhỏ khi cần bán một phần, nhưng thanh khoản không cao bằng vàng miếng SJC. Quyết định đầu tư loại nào phụ thuộc vào mục đích (ngắn hạn hay dài hạn), số vốn và chiến lược đầu tư của bạn.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-medium">
                    Các yếu tố nào ảnh hưởng đến giá vàng?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Giá vàng chịu ảnh hưởng bởi nhiều yếu tố như: tình hình kinh tế toàn cầu, chính sách tiền tệ của các ngân hàng trung ương lớn (đặc biệt là FED), tỷ giá đồng USD, lạm phát, căng thẳng địa chính trị, nhu cầu vàng từ các quốc gia lớn như Trung Quốc và Ấn Độ, hoạt động của các quỹ ETF vàng, và tâm lý thị trường.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            {/* Technical Questions */}
            <section id="technical" className="mb-12">
              <h2 className="text-2xl font-bold mb-6 font-playfair pb-2 border-b border-gold-light/30">
                Thông tin kỹ thuật
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left font-medium">
                    GiaVang247.online cập nhật giá vàng từ những nguồn nào?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    GiaVang247.online cập nhật giá vàng trực tiếp từ các đơn vị kinh doanh vàng uy tín tại Việt Nam như SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh và các nguồn cung cấp giá vàng quốc tế tin cậy. Chúng tôi sử dụng công nghệ tự động để cập nhật giá liên tục 24/7.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left font-medium">
                    Độ chính xác của thông tin giá vàng trên website thế nào?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Chúng tôi cam kết cung cấp thông tin giá vàng chính xác với độ trễ không quá 5 phút so với giá niêm yết của các đơn vị kinh doanh. Giá vàng được đối chiếu và kiểm tra thường xuyên để đảm bảo độ tin cậy cho người dùng. Tuy nhiên, để đảm bảo an toàn khi giao dịch, vẫn nên tham khảo giá trực tiếp từ đơn vị kinh doanh vàng trước khi quyết định mua bán.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left font-medium">
                    GiaVang247 có cung cấp API cho dữ liệu giá vàng không?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Có, chúng tôi cung cấp API cho các đối tác muốn tích hợp dữ liệu giá vàng vào website hoặc ứng dụng của họ. API này hỗ trợ cập nhật giá vàng trong nước và quốc tế, biến động giá theo thời gian và các dữ liệu phân tích thị trường. Để biết thêm chi tiết và yêu cầu API key, vui lòng liên hệ với chúng tôi qua email: api@giavang247.online.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-left font-medium">
                    Làm thế nào để theo dõi biến động giá vàng qua biểu đồ kỹ thuật?
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    GiaVang247 cung cấp các công cụ phân tích kỹ thuật như biểu đồ giá, đường trung bình động (MA), chỉ báo RSI, MACD và các công cụ vẽ đồ thị. Để sử dụng, bạn có thể vào phần "Biểu đồ kỹ thuật" trên trang web, chọn khung thời gian bạn quan tâm và các chỉ báo muốn hiển thị. Ngoài ra, chúng tôi còn có các bài hướng dẫn về cách đọc và phân tích biểu đồ trong mục "Học đầu tư vàng".
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            {/* Still have questions */}
            <div className="bg-gradient-to-br from-gold-light/30 to-gold-muted/30 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3 font-playfair">Vẫn còn thắc mắc?</h3>
              <p className="text-slate-700 mb-4">
                Nếu bạn không tìm thấy câu trả lời cho câu hỏi của mình, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi
              </p>
              <a 
                href="/lien-he" 
                className="inline-block bg-gradient-luxury px-6 py-2 rounded-full text-white font-medium shadow-md hover:opacity-90 transition-opacity"
              >
                Liên hệ hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
