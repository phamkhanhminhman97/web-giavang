
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm glass-effect border-b border-gold-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-gold-dark font-playfair font-bold text-xl">GiaVang247</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" label="Trang chủ" active />
            <NavLink href="/market-analysis" label="Phân tích thị trường" />
            <NavLink href="/about" label="Giới thiệu" />
            <NavLink href="/contact" label="Liên hệ" />
            <NavLink href="/terms" label="Điều khoản" />
            <NavLink href="/privacy" label="Bảo mật" />
            <Button variant="ghost" size="icon" className="ml-2">
              <Search size={18} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gold-light">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <MobileNavLink href="/" label="Trang chủ" onClick={toggleMenu} />
            <MobileNavLink href="/market-analysis" label="Phân tích thị trường" onClick={toggleMenu} />
            <MobileNavLink href="/about" label="Giới thiệu" onClick={toggleMenu} />
            <MobileNavLink href="/contact" label="Liên hệ" onClick={toggleMenu} />
            <MobileNavLink href="/terms" label="Điều khoản" onClick={toggleMenu} />
            <MobileNavLink href="/privacy" label="Bảo mật" onClick={toggleMenu} />
            <div className="pt-2 pb-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full p-2 pl-8 border border-gold-light rounded-md text-sm"
                />
                <Search size={16} className="absolute left-2 top-2.5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
};

const NavLink = ({ href, label, active }: NavLinkProps) => (
  <Link
    to={href}
    className={`text-sm font-medium transition-colors hover:text-gold-dark ${
      active ? "text-gold" : "text-slate-700"
    }`}
  >
    {label}
  </Link>
);

type MobileNavLinkProps = {
  href: string;
  label: string;
  onClick: () => void;
};

const MobileNavLink = ({ href, label, onClick }: MobileNavLinkProps) => (
  <Link
    to={href}
    className="block py-2 px-1 text-slate-700 hover:text-gold-dark border-b border-slate-100 last:border-0"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
