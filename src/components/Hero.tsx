
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
    <div className="relative bg-gradient-gold py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Gold Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-end mb-4">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-gold-light shadow-sm">
            <Clock size={14} className="text-gold" />
            <span className="text-sm font-medium">{formatTime(currentDateTime)} {formatDate(currentDateTime)}</span>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gold-dark font-playfair">
            Giá Vàng Việt Nam
          </h1>
          <p className="text-slate-700 text-lg mb-8 max-w-2xl mx-auto">
            Cập nhật giá vàng 24/7, thông tin thị trường vàng mới nhất và chính xác tức thời
          </p>
          <div className="inline-block gold-shimmer py-1 px-4 rounded-full text-white text-sm md:text-base shadow-md">
            Cập nhật lần cuối: {formatTime(currentDateTime)} {formatDate(currentDateTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
