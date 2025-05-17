
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

const DieuKhoan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-luxury py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gold-dark font-playfair mb-6">
              Điều Khoản Sử Dụng
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Vui lòng đọc kỹ các điều khoản và điều kiện sử dụng website của chúng tôi
            </p>
          </div>
        </div>
        
        {/* Terms Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="price-card p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={28} className="text-gold" />
              <h2 className="text-2xl font-bold font-playfair">Điều Khoản & Điều Kiện</h2>
            </div>
            
            <div className="space-y-6 text-slate-700">
              <p>
                Khi truy cập và sử dụng trang web GiaVang247.online, bạn đồng ý tuân thủ các điều khoản và điều kiện sử dụng được quy định dưới đây. Vui lòng đọc kỹ các điều khoản này trước khi tiếp tục sử dụng.
              </p>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">1. Điều khoản sử dụng chung</h3>
                <p>
                  Trang web GiaVang247.online thuộc sở hữu và được vận hành bởi Công ty Cổ phần Thông tin Giá Vàng 24/7. Trang web cung cấp thông tin về giá vàng trong nước và quốc tế, cùng với các phân tích, dự báo về thị trường vàng.
                </p>
                <p className="mt-2">
                  Bằng việc sử dụng trang web này, bạn cam kết rằng bạn đã đủ tuổi theo quy định của pháp luật Việt Nam để tham gia vào thỏa thuận này, hoặc bạn đã có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">2. Quyền sở hữu trí tuệ</h3>
                <p>
                  Tất cả nội dung xuất hiện trên trang web GiaVang247.online bao gồm nhưng không giới hạn: văn bản, đồ họa, logo, biểu tượng, hình ảnh, clip âm thanh, dữ liệu, phần mềm, biểu đồ, và các tài liệu khác đều thuộc sở hữu của Công ty Cổ phần Thông tin Giá Vàng 24/7 hoặc các đối tác cung cấp nội dung cho chúng tôi.
                </p>
                <p className="mt-2">
                  Việc sử dụng trái phép bất kỳ nội dung nào từ trang web mà không có sự cho phép bằng văn bản của chúng tôi đều vi phạm quyền sở hữu trí tuệ và có thể chịu trách nhiệm pháp lý.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">3. Chính sách về thông tin giá cả</h3>
                <p>
                  Chúng tôi nỗ lực cung cấp thông tin giá vàng và phân tích thị trường một cách chính xác và cập nhật. Tuy nhiên, chúng tôi không đảm bảo tính chính xác tuyệt đối của các thông tin này và không chịu trách nhiệm đối với bất kỳ tổn thất nào phát sinh từ việc tin tưởng vào những thông tin trên trang web.
                </p>
                <p className="mt-2">
                  Giá vàng được hiển thị trên trang web có thể không phải là giá giao dịch thực tế tại các cửa hàng kinh doanh vàng bạc đá quý. Người dùng nên tham khảo trực tiếp tại các đơn vị kinh doanh vàng trước khi thực hiện giao dịch.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">4. Giới hạn trách nhiệm</h3>
                <p>
                  Thông tin trên trang web GiaVang247.online được cung cấp "nguyên trạng" và "theo khả năng sẵn có" mà không có bất kỳ đảm bảo nào, dù là rõ ràng hay ngụ ý. Công ty Cổ phần Thông tin Giá Vàng 24/7 không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc mang tính hệ quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng thông tin trên trang web.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">5. Liên kết đến các trang web khác</h3>
                <p>
                  Trang web của chúng tôi có thể chứa các liên kết đến các trang web của bên thứ ba. Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc thực tiễn của bất kỳ trang web bên thứ ba nào. Việc bao gồm bất kỳ liên kết nào không ngụ ý sự chứng thực của chúng tôi đối với trang web đó.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">6. Thay đổi điều khoản</h3>
                <p>
                  Chúng tôi có quyền sửa đổi, cập nhật hoặc thay đổi các điều khoản và điều kiện này bất kỳ lúc nào mà không cần thông báo trước. Việc tiếp tục sử dụng trang web sau khi thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận những thay đổi đó.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">7. Luật áp dụng</h3>
                <p>
                  Các điều khoản và điều kiện này được điều chỉnh và giải thích theo pháp luật Việt Nam. Bất kỳ tranh chấp nào phát sinh liên quan đến việc sử dụng trang web sẽ được giải quyết tại tòa án có thẩm quyền ở Việt Nam.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="price-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={24} className="text-green-600" />
                <h3 className="text-xl font-bold font-playfair">Quyền lợi của người dùng</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Truy cập và sử dụng các thông tin công khai trên trang web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Nhận thông tin giá vàng được cập nhật liên tục</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Tham khảo các bài phân tích, dự báo về thị trường vàng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Gửi phản hồi, góp ý về dịch vụ và nội dung trang web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Yêu cầu xóa thông tin cá nhân (nếu đã cung cấp)</span>
                </li>
              </ul>
            </div>
            
            <div className="price-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle size={24} className="text-red-500" />
                <h3 className="text-xl font-bold font-playfair">Những điều không được phép</h3>
              </div>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Sao chép, phân phối lại nội dung từ trang web mà không được phép</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Sử dụng bất kỳ robot, spider hoặc thiết bị tự động khác để truy cập trang web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Gây hại hoặc cố gắng gây hại đến hoạt động của trang web</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Thu thập thông tin cá nhân của người dùng khác</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-dark">•</span>
                  <span>Sử dụng trang web với mục đích bất hợp pháp</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center price-card p-8">
            <h3 className="text-xl font-bold font-playfair mb-4">Liên hệ về điều khoản sử dụng</h3>
            <p className="text-slate-700 mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản sử dụng của chúng tôi, vui lòng liên hệ:
            </p>
            <div className="inline-flex items-center gap-2 text-gold-dark hover:text-gold transition-colors">
              <Mail size={18} />
              <span>terms@giavang247.online</span>
            </div>
            <div className="mt-6 flex justify-center">
              <a href="/bao-mat" className="text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-2">
                Xem thêm Chính sách bảo mật <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DieuKhoan;
