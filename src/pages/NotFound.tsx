import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-gold-dark mb-4">404</h1>
        <p className="text-lg text-slate-700 mb-6">Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link to="/" className="bg-gold-dark text-white px-6 py-2 rounded hover:bg-gold">Về trang chủ</Link>
      </main>
    </div>
  );
};

export default NotFound;
