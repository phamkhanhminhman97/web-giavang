
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-gold-light via-white to-gold-muted py-6 md:py-10 lg:py-14 overflow-hidden">
      {/* Gold Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      
      {/* Golden Orbs */}
      <div className="absolute top-1/4 left-10 bg-gradient-rich h-16 w-16 rounded-full blur-xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 bg-gradient-rich h-24 w-24 rounded-full blur-xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-end mb-2">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-gold-light shadow-sm">
            <Clock size={14} className="text-gold" />
            <span className="text-sm font-medium">{formatTime(currentDateTime)} {formatDate(currentDateTime)}</span>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-playfair">
            <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
              Giá Vàng Việt Nam
            </span>
          </h1>
          <p className="text-slate-700 text-base mb-4 max-w-2xl mx-auto">
            Cập nhật giá vàng 24/7, thông tin thị trường vàng mới nhất và chính xác tức thời
          </p>
          <div className="inline-block bg-gradient-luxury py-1 px-4 rounded-full text-white text-sm shadow-md">
            Cập nhật lần cuối: {formatTime(currentDateTime)} {formatDate(currentDateTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
