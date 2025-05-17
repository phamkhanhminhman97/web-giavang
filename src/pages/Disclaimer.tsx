import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldAlert, AlertTriangle, ExternalLink } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-luxury py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gold-dark font-playfair mb-6">
              Miễn Trừ Trách Nhiệm
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Thông tin trên website chỉ mang tính chất tham khảo, không phải lời khuyên đầu tư
            </p>
          </div>
        </div>

        {/* Disclaimer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="price-card p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert size={28} className="text-gold" />
              <h2 className="text-2xl font-bold font-playfair">Miễn Trừ Trách Nhiệm</h2>
            </div>
            <div className="space-y-6 text-slate-700">
              <p>
                Mọi thông tin, dữ liệu, bảng giá, phân tích và dự báo trên <b>GiaVang247.online</b> chỉ mang tính chất tham khảo. Chúng tôi không đảm bảo tính chính xác, đầy đủ hoặc cập nhật của thông tin trên website này.
              </p>
              <p>
                Chúng tôi không chịu trách nhiệm cho bất kỳ tổn thất, thiệt hại nào phát sinh từ việc sử dụng hoặc dựa vào thông tin trên website. Các quyết định đầu tư, mua bán vàng, ngoại tệ hoặc các tài sản tài chính khác hoàn toàn do bạn tự chịu trách nhiệm.
              </p>
              <p>
                Website không cung cấp lời khuyên đầu tư, tư vấn tài chính, pháp lý hay bất kỳ hình thức bảo đảm nào khác. Nếu bạn cần tư vấn chuyên môn, hãy liên hệ với các chuyên gia hoặc tổ chức có thẩm quyền.
              </p>
              <p>
                Website có thể chứa liên kết tới các website bên ngoài. Chúng tôi không kiểm soát và không chịu trách nhiệm về nội dung, chính sách hoặc bảo mật của các website đó.
              </p>
              <p>
                Bằng việc sử dụng website, bạn đồng ý với các điều khoản miễn trừ trách nhiệm này.
              </p>
            </div>
          </div>

          <div className="text-center price-card p-8">
            <h3 className="text-xl font-bold font-playfair mb-4">Liên hệ về miễn trừ trách nhiệm</h3>
            <p className="text-slate-700 mb-4">
              Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về nội dung miễn trừ trách nhiệm, vui lòng liên hệ:
            </p>
            <div className="inline-flex items-center gap-2 text-gold-dark hover:text-gold transition-colors">
              <AlertTriangle size={18} />
              <span>support@giavang247.online</span>
            </div>
            <div className="mt-6 flex justify-center">
              <a href="/dieu-khoan" className="text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-2">
                Xem thêm Điều khoản sử dụng <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
