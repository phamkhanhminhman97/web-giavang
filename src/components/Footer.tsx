import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-slate-100 border-t border-gold-light">
      <div className="container mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-bold">G</span>
              </div>
              <span className="ml-2 text-xl font-bold font-playfair text-gold-dark">GiaVang247</span>
            </div>
            <p className="text-slate-600 mb-4">
              Chuyên trang cập nhật giá vàng Việt Nam và quốc tế nhanh chóng, chính xác nhất thị trường.
              Thông tin giá vàng được cập nhật liên tục 24/7.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon="facebook">
                <Facebook size={16} />
              </SocialIcon>
              <SocialIcon href="#" icon="twitter">
                <Twitter size={16} />
              </SocialIcon>
              <SocialIcon href="#" icon="youtube">
                <Youtube size={16} />
              </SocialIcon>
              <SocialIcon href="#" icon="instagram">
                <Instagram size={16} />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Liên kết nhanh</h3>
            <FooterLinks
              links={[
                { name: "Trang chủ", href: "/" },
                // { name: "Bảng giá vàng", href: "/price-table" },
                { name: "Phân tích thị trường", href: "/phan-tich" },
                // { name: "Tin tức", href: "/news" },
                { name: "Liên hệ", href: "/lien-he" },
              ]}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Thông tin</h3>
            <FooterLinks
              links={[
                { name: "Giới thiệu", href: "/gioi-thieu" },
                { name: "Chính sách bảo mật", href: "/bao-mat" },
                { name: "Điều khoản sử dụng", href: "/dieu-khoan" },
                { name: "Trung tâm trợ giúp", href: "/help" },
                { name: "Hỏi đáp", href: "/faq" },
              ]}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 GiaVang247.Online. Bản quyền thuộc về GiaVang247.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-slate-500 text-sm">
              <Link to="/mien-tru" className="hover:text-gold-dark">Miễn trừ trách nhiệm</Link>
              <span className="mx-2">|</span>
              <Link to="/bao-mat" className="hover:text-gold-dark">Chính sách bảo mật</Link>
              <span className="mx-2">|</span>
              <Link to="/dieu-khoan" className="hover:text-gold-dark">Điều khoản sử dụng</Link>
              <span className="mx-2">|</span>
              <Link to="/lien-he" className="hover:text-gold-dark">Liên hệ</Link>
              <span className="mx-2">|</span>
              {/* <Link to="/sitemap.xml" className="hover:text-gold-dark">Sơ đồ trang web</Link> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

type SocialIconProps = {
  href: string;
  icon: string;
  children: React.ReactNode;
};

const SocialIcon = ({ href, icon, children }: SocialIconProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-8 h-8 rounded-full bg-slate-200 hover:bg-gold-light transition-colors flex items-center justify-center"
      aria-label={`Follow us on ${icon}`}
    >
      <span className="sr-only">{icon}</span>
      <div className="text-slate-700">
        {children}
      </div>
    </a>
  );
};

type FooterLinksProps = {
  links: { name: string; href: string; }[];
};

const FooterLinks = ({ links }: FooterLinksProps) => {
  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.name}>
          <Link 
            to={link.href} 
            className="text-slate-600 hover:text-gold-dark transition-colors"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Footer;
