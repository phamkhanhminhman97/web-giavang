
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, ShieldCheck, ShieldAlert, Lock, Eye, CheckSquare, ExternalLink } from "lucide-react";

const BaoMat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-luxury py-10 md:py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gold-dark font-playfair mb-6">
              Chính Sách Bảo Mật
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn
            </p>
          </div>
        </div>
        
        {/* Privacy Policy Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="price-card p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={28} className="text-gold" />
              <h2 className="text-2xl font-bold font-playfair">Chính Sách Bảo Mật</h2>
            </div>
            
            <div className="space-y-6 text-slate-700">
              <p>
                Tại GiaVang247.online, chúng tôi coi trọng quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ, và bảo vệ thông tin của bạn khi bạn truy cập trang web của chúng tôi. Vui lòng đọc kỹ chính sách này để hiểu cách chúng tôi xử lý thông tin của bạn.
              </p>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">1. Thông tin chúng tôi thu thập</h3>
                <p className="mb-2">
                  Chúng tôi có thể thu thập các loại thông tin sau khi bạn sử dụng trang web của chúng tôi:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Thông tin cá nhân: họ tên, địa chỉ email, số điện thoại khi bạn liên hệ với chúng tôi hoặc đăng ký nhận thông báo.</li>
                  <li>Thông tin kỹ thuật: địa chỉ IP, loại trình duyệt, thiết bị, thời gian truy cập, và các thông tin khác liên quan đến việc sử dụng trang web.</li>
                  <li>Dữ liệu sử dụng: thông tin về cách bạn tương tác với trang web, các trang bạn truy cập, thời gian bạn dành cho mỗi trang, và các thông tin tương tự khác.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">2. Cách chúng tôi sử dụng thông tin</h3>
                <p className="mb-2">
                  Thông tin chúng tôi thu thập có thể được sử dụng cho các mục đích sau:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cung cấp, duy trì và cải thiện trang web của chúng tôi.</li>
                  <li>Phản hồi các yêu cầu, câu hỏi, và hỗ trợ của bạn.</li>
                  <li>Gửi thông báo về các cập nhật, sự kiện, hoặc thông tin liên quan đến thị trường vàng.</li>
                  <li>Phân tích xu hướng sử dụng và tối ưu hóa trải nghiệm người dùng.</li>
                  <li>Phát hiện, ngăn chặn, và giải quyết các vấn đề kỹ thuật hoặc bảo mật.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">3. Bảo vệ thông tin</h3>
                <p>
                  Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin của bạn khỏi việc truy cập, sử dụng, thay đổi hoặc tiết lộ trái phép. Tuy nhiên, không có phương thức truyền tải nào qua Internet hoặc phương thức lưu trữ điện tử nào là an toàn 100%. Do đó, mặc dù chúng tôi nỗ lực bảo vệ thông tin cá nhân của bạn, chúng tôi không thể đảm bảo an ninh tuyệt đối.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">4. Chia sẻ thông tin</h3>
                <p className="mb-2">
                  Chúng tôi không bán, trao đổi, hoặc chuyển giao thông tin cá nhân của bạn cho các bên thứ ba mà không có sự đồng ý của bạn, ngoại trừ các trường hợp sau:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Với các nhà cung cấp dịch vụ giúp chúng tôi vận hành trang web hoặc tiến hành hoạt động kinh doanh (họ sẽ bị ràng buộc bởi các nghĩa vụ bảo mật).</li>
                  <li>Khi cần thiết để tuân thủ pháp luật, thực thi chính sách của chúng tôi, hoặc bảo vệ quyền, tài sản, hoặc an toàn của chúng tôi hoặc người khác.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">5. Cookie và công nghệ tương tự</h3>
                <p>
                  Trang web của chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm của bạn, phân tích xu hướng, quản lý trang web, và thu thập thông tin nhân khẩu học về người dùng của chúng tôi. Bạn có thể kiểm soát cách trình duyệt của mình xử lý cookie thông qua cài đặt trình duyệt của bạn.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">6. Quyền của bạn</h3>
                <p className="mb-2">
                  Tùy thuộc vào luật pháp hiện hành, bạn có thể có quyền:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Truy cập thông tin cá nhân mà chúng tôi lưu giữ về bạn.</li>
                  <li>Yêu cầu sửa đổi hoặc cập nhật thông tin cá nhân không chính xác.</li>
                  <li>Yêu cầu xóa thông tin cá nhân của bạn.</li>
                  <li>Phản đối hoặc hạn chế việc xử lý thông tin cá nhân của bạn.</li>
                  <li>Yêu cầu chuyển giao thông tin cá nhân của bạn.</li>
                </ul>
                <p className="mt-2">
                  Để thực hiện bất kỳ quyền nào ở trên, vui lòng liên hệ với chúng tôi theo thông tin được cung cấp dưới đây.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">7. Thay đổi đối với chính sách bảo mật</h3>
                <p>
                  Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách mới trên trang web của chúng tôi. Bạn nên kiểm tra trang này định kỳ để biết thông tin mới nhất về các thực tiễn bảo mật của chúng tôi.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="price-card p-6 text-center hover:scale-[1.02] transition-all">
              <div className="bg-gold-light p-3 rounded-full inline-flex mb-4">
                <ShieldCheck size={28} className="text-gold-dark" />
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3">Bảo Vệ Dữ Liệu</h3>
              <p className="text-slate-600">
                Chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ dữ liệu cá nhân của bạn trong quá trình truyền tải và lưu trữ.
              </p>
            </div>
            
            <div className="price-card p-6 text-center hover:scale-[1.02] transition-all">
              <div className="bg-gold-light p-3 rounded-full inline-flex mb-4">
                <Lock size={28} className="text-gold-dark" />
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3">Bảo Mật Thông Tin</h3>
              <p className="text-slate-600">
                Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba khi không có sự đồng ý rõ ràng của bạn.
              </p>
            </div>
            
            <div className="price-card p-6 text-center hover:scale-[1.02] transition-all">
              <div className="bg-gold-light p-3 rounded-full inline-flex mb-4">
                <Eye size={28} className="text-gold-dark" />
              </div>
              <h3 className="text-xl font-bold font-playfair mb-3">Minh Bạch</h3>
              <p className="text-slate-600">
                Chúng tôi luôn minh bạch về cách thông tin của bạn được thu thập, sử dụng và bảo vệ khi bạn sử dụng trang web của chúng tôi.
              </p>
            </div>
          </div>
          
          <div className="price-card p-8 mb-10">
            <h3 className="text-xl font-bold font-playfair mb-4 text-center">Cam Kết Của Chúng Tôi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-gold-muted/20 to-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckSquare size={22} className="text-gold mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Tuân thủ pháp luật</h4>
                    <p className="text-slate-600">
                      Chúng tôi cam kết tuân thủ tất cả các quy định pháp luật Việt Nam liên quan đến việc bảo vệ dữ liệu và quyền riêng tư của người dùng.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gold-muted/20 to-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckSquare size={22} className="text-gold mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Bảo vệ thông tin</h4>
                    <p className="text-slate-600">
                      Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi bị mất, đánh cắp hoặc sử dụng sai mục đích.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gold-muted/20 to-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckSquare size={22} className="text-gold mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Quyền kiểm soát</h4>
                    <p className="text-slate-600">
                      Chúng tôi tôn trọng quyền kiểm soát thông tin cá nhân của bạn và luôn sẵn sàng hỗ trợ bạn thực hiện các quyền liên quan đến dữ liệu của mình.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gold-muted/20 to-white p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckSquare size={22} className="text-gold mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">Đào tạo nhân viên</h4>
                    <p className="text-slate-600">
                      Nhân viên của chúng tôi được đào tạo về tầm quan trọng của bảo mật thông tin và quy trình xử lý dữ liệu cá nhân một cách an toàn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center price-card p-8">
            <h3 className="text-xl font-bold font-playfair mb-4">Liên hệ về chính sách bảo mật</h3>
            <p className="text-slate-700 mb-4">
              Nếu bạn có bất kỳ câu hỏi hoặc quan ngại nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ:
            </p>
            <div className="inline-flex items-center gap-2 text-gold-dark hover:text-gold transition-colors">
              <ShieldAlert size={18} />
              <span>privacy@giavang247.online</span>
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

export default BaoMat;
