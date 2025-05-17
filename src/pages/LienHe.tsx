
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const LienHe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit - would normally send to server
    console.log("Form submitted:", formData);
    toast({
      title: "Thành công!",
      description: "Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ trong thời gian sớm nhất.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
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
              Liên Hệ
            </h1>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn
            </p>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="price-card p-6 hover:scale-[1.02] transition-all">
                <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-6">
                  Thông Tin Liên Hệ
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-light p-2 rounded-full">
                      <Phone className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Điện thoại</h3>
                      <p className="text-slate-600">(024) 1234 5678</p>
                      <p className="text-slate-600">1900 1234 (Hotline)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-light p-2 rounded-full">
                      <Mail className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-slate-600">info@giavang247.online</p>
                      <p className="text-slate-600">support@giavang247.online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-light p-2 rounded-full">
                      <MapPin className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-slate-600">
                        Tòa nhà Gold Tower, 123 Đường Nguyễn Huệ,<br />
                        Quận 1, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-light p-2 rounded-full">
                      <Clock className="text-gold-dark" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                      <p className="text-slate-600">Thứ Hai - Thứ Sáu: 8:00 - 17:30</p>
                      <p className="text-slate-600">Thứ Bảy: 8:00 - 12:00</p>
                      <p className="text-slate-600">Chủ Nhật: Nghỉ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="price-card p-6 hover:scale-[1.01] transition-all">
                <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-6">
                  Gửi Thông Tin
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-medium text-slate-700">Họ và tên</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-medium text-slate-700">Số điện thoại</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block font-medium text-slate-700">Chủ đề</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        required
                      >
                        <option value="">-- Chọn chủ đề --</option>
                        <option value="support">Hỗ trợ kỹ thuật</option>
                        <option value="feedback">Góp ý, phản hồi</option>
                        <option value="business">Hợp tác kinh doanh</option>
                        <option value="info">Yêu cầu thông tin</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-medium text-slate-700">Nội dung</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-rich text-white rounded-full hover:opacity-90 transition-opacity font-medium"
                    >
                      Gửi thông tin <Send size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="price-card p-6 hover:scale-[1.01] transition-all">
            <h2 className="text-2xl font-bold font-playfair text-slate-800 mb-6 text-center">
              Bản Đồ
            </h2>
            <div className="h-[400px] bg-slate-200 rounded-lg flex items-center justify-center">
              <div className="text-slate-500 text-center">
                <MapPin size={48} className="mx-auto mb-2 text-gold" />
                <p>Bản đồ hiển thị tại đây</p>
                <p className="text-sm">Trụ sở: Tòa nhà Gold Tower, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LienHe;
