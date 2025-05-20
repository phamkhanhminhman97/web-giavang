import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [goldPrice, setGoldPrice] = useState({
    price: "2,345.67",
    change: 0.25,
    trend: "up" as "up" | "down"
  });

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
    <div className="relative bg-gradient-to-br from-gold-light via-white to-gold-muted py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Gold Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      
      {/* Golden Orbs */}
      <div className="absolute top-1/4 left-10 bg-gradient-rich h-16 w-16 rounded-full blur-xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 bg-gradient-rich h-24 w-24 rounded-full blur-xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 border border-gold-light shadow-sm">
            <Clock size={14} className="text-gold" />
            <span className="text-sm font-medium">{formatTime(currentDateTime)} {formatDate(currentDateTime)}</span>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 border border-gold-light shadow-sm">
            <span className="text-sm font-medium">Vàng thế giới: ${goldPrice.price}</span>
            <span className={`flex items-center text-xs font-medium ${goldPrice.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {goldPrice.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {goldPrice.trend === 'up' ? '+' : '-'}{Math.abs(goldPrice.change)}%
            </span>
          </div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-playfair">
            <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
              Giá Vàng Việt Nam
            </span>
          </h1>
          <p className="text-slate-700 text-base mb-6 max-w-2xl mx-auto">
            Cập nhật giá vàng SJC, DOJI, PNJ, Bảo Tín Minh Châu, Mi Hồng, Phú Quý, Huy Thanh mới nhất 24/7. 
            Thông tin thị trường vàng chính xác, nhanh chóng, tin cậy mỗi ngày.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-6">
            <QuickStat label="Vàng SJC" value="80,900,000đ" change="+2.1%" trend="up" />
            <QuickStat label="Vàng DOJI" value="80,850,000đ" change="+2.0%" trend="up" />
            <QuickStat label="Vàng PNJ" value="80,800,000đ" change="+1.9%" trend="up" />
            <QuickStat label="Vàng BTMC" value="80,750,000đ" change="+1.8%" trend="up" />
          </div>
          
          <div className="inline-block bg-gradient-luxury py-2 px-6 rounded-full text-white text-sm shadow-md">
            Cập nhật lần cuối: {formatTime(currentDateTime)} {formatDate(currentDateTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

type QuickStatProps = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
};

const QuickStat = ({ label, value, change, trend }: QuickStatProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-gold-light/30 shadow-sm">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-base font-semibold">{value}</p>
      <p className={`text-xs font-medium flex items-center justify-end ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
        {change}
      </p>
    </div>
  );
};

export default Hero;
