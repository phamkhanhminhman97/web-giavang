
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gold-light/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gold-dark font-playfair tracking-tight">
              GiaVang<span className="text-gold">247</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Trang Chủ
            </Link>
            <Link
              to="/phan-tich"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/phan-tich")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Phân Tích
            </Link>
            <Link
              to="/gioi-thieu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/gioi-thieu")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/lien-he"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/lien-he")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Liên Hệ
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-700 hover:text-gold-dark focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gold-light/20 py-2">
          <div className="container mx-auto px-4 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang Chủ
            </Link>
            <Link
              to="/phan-tich"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/phan-tich")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Phân Tích
            </Link>
            <Link
              to="/gioi-thieu"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/gioi-thieu")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/lien-he"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/lien-he")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên Hệ
            </Link>
            <div className="pt-2 pb-1 border-t border-gold-light/20 mt-2">
              <Link
                to="/dieu-khoan"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-gold-dark hover:bg-gold-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Điều Khoản Sử Dụng
              </Link>
              <Link
                to="/bao-mat"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-gold-dark hover:bg-gold-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chính Sách Bảo Mật
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
