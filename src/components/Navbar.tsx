
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { useState, FormEvent } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
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
          <nav className="hidden md:flex items-center space-x-1">
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
              to="/cong-cu-ai"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/cong-cu-ai")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Công Cụ AI
            </Link>
            <Link
              to="/bai-viet"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/bai-viet")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Bài Viết
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
            >
              Liên Hệ
            </Link>
            {/* Search Box (Desktop) */}
            <form onSubmit={handleSearch} className="ml-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-1 pl-3 pr-8 text-sm border border-gold-light/50 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-dark focus:border-gold-dark"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gold-dark"
                >
                  <SearchIcon size={16} />
                </button>
              </div>
            </form>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
              to="/cong-cu-ai"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/cong-cu-ai")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Công Cụ AI
            </Link>
            <Link
              to="/bai-viet"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/bai-viet")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Bài Viết
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/about")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/contact")
                  ? "text-gold-dark bg-gold-muted"
                  : "text-slate-700 hover:text-gold-dark hover:bg-gold-muted/50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên Hệ
            </Link>
            <div className="pt-2 pb-1 border-t border-gold-light/20 mt-2">
              <Link
                to="/terms"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-gold-dark hover:bg-gold-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Điều Khoản Sử Dụng
              </Link>
              <Link
                to="/privacy-policy"
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-gold-dark hover:bg-gold-muted/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chính Sách Bảo Mật
              </Link>
              
              {/* Search Box (Mobile) */}
              <form onSubmit={handleSearch} className="px-3 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-3 pr-10 text-sm border border-gold-light/50 rounded-md focus:outline-none focus:ring-1 focus:ring-gold-dark focus:border-gold-dark"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-dark"
                  >
                    <SearchIcon size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
