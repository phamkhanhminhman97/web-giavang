import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useGoldPrices } from "@/contexts/GoldPriceContext";
import { fetchWorldGoldPrices } from "@/services/api";
import { WorldGoldPriceResponse } from "@/interfaces/gold-price.interface";

const Hero = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [goldPrice, setGoldPrice] = useState({
    price: "Đang cập nhật",
    change: 0,
    trend: "up" as "up" | "down"
  });
  const [worldGoldLoading, setWorldGoldLoading] = useState(false);
  const [worldGoldError, setWorldGoldError] = useState<string | null>(null);
  const { goldPrices, loading, error } = useGoldPrices();
  const [goldPriceCards, setGoldPriceCards] = useState<{
    sjc: { value: string; change: string; trend: 'up' | 'down' };
    doji: { value: string; change: string; trend: 'up' | 'down' };
    pnj: { value: string; change: string; trend: 'up' | 'down' };
    btmc: { value: string; change: string; trend: 'up' | 'down' };
  }>({
    sjc: { value: "Đang cập nhật", change: "0%", trend: "up" },
    doji: { value: "Đang cập nhật", change: "0%", trend: "up" },
    pnj: { value: "Đang cập nhật", change: "0%", trend: "up" },
    btmc: { value: "Đang cập nhật", change: "0%", trend: "up" }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format price to Vietnamese currency
  const formatPrice = (price: number | null) => {
    if (price === null) return "Đang cập nhật";
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Format percentage change
  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  // Fetch world gold price data
  useEffect(() => {
    const fetchWorldGoldPrice = async () => {
      try {
        setWorldGoldLoading(true);
        const response = await fetchWorldGoldPrices();
        
        if (response) {
          setGoldPrice({
            price: formatPrice(response.price),
            change: response.chp,
            trend: response.chp >= 0 ? 'up' : 'down'
          });
        }
      } catch (error) {
        setWorldGoldError('Không thể cập nhật giá vàng thế giới');
        console.error('Error fetching world gold price:', error);
      } finally {
        setWorldGoldLoading(false);
      }
    };

    fetchWorldGoldPrice();
    const interval = setInterval(fetchWorldGoldPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Process gold price data from context
  useEffect(() => {
    if (goldPrices.length > 0) {
      // Process SJC data
      const sjcData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'SJC' && item.type.includes('SJC')
      );
      
      // Process DOJI data
      const dojiData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'DOJI' && item.type.includes('SJC')
      );
      
      // Process PNJ data
      const pnjData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'PNJ' && item.type.includes('SJC')
      );
      
      // Process BTMC data
      const btmcData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'BTMC' || item.provider.includes('BẢO TÍN MINH CHÂU')
      );

      // Process World Gold (XAU) data
      const worldGoldData = goldPrices.find(item => 
        item.type.toUpperCase() === 'XAU'
      );

      // Update world gold price
      if (worldGoldData) {
        setGoldPrice({
          price: formatPrice(worldGoldData.sellPrice),
          change: worldGoldData.change.sell,
          trend: worldGoldData.change.sell >= 0 ? 'up' : 'down'
        });
      }

      // Update gold prices
      setGoldPriceCards({
        sjc: { 
          value: sjcData ? formatPrice(sjcData.sellPrice) + 'đ' : "Đang cập nhật", 
          change: sjcData ? formatChange(sjcData.change.sell) : "0%",
          trend: sjcData ? (sjcData.change.sell >= 0 ? 'up' : 'down') : 'up'
        },
        doji: { 
          value: dojiData ? formatPrice(dojiData.sellPrice) + 'đ' : "Đang cập nhật", 
          change: dojiData ? formatChange(dojiData.change.sell) : "0%",
          trend: dojiData ? (dojiData.change.sell >= 0 ? 'up' : 'down') : 'up'
        },
        pnj: { 
          value: pnjData ? formatPrice(pnjData.sellPrice) + 'đ' : "Đang cập nhật", 
          change: pnjData ? formatChange(pnjData.change.sell) : "0%",
          trend: pnjData ? (pnjData.change.sell >= 0 ? 'up' : 'down') : 'up'
        },
        btmc: { 
          value: btmcData ? formatPrice(btmcData.sellPrice) + 'đ' : "Đang cập nhật", 
          change: btmcData ? formatChange(btmcData.change.sell) : "0%",
          trend: btmcData ? (btmcData.change.sell >= 0 ? 'up' : 'down') : 'up'
        }
      });
    }
  }, [goldPrices]);

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
            {loading ? (
              <div className="col-span-4 flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-dark"></div>
              </div>
            ) : error ? (
              <div className="col-span-4 text-red-500 text-center py-4">
                {error}
              </div>
            ) : (
              <>
                <QuickStat label="Vàng SJC" value={goldPriceCards.sjc.value} change={goldPriceCards.sjc.change} trend={goldPriceCards.sjc.trend} />
                <QuickStat label="Vàng DOJI" value={goldPriceCards.doji.value} change={goldPriceCards.doji.change} trend={goldPriceCards.doji.trend} />
                <QuickStat label="Vàng PNJ" value={goldPriceCards.pnj.value} change={goldPriceCards.pnj.change} trend={goldPriceCards.pnj.trend} />
                <QuickStat label="Vàng BTMC" value={goldPriceCards.btmc.value} change={goldPriceCards.btmc.change} trend={goldPriceCards.btmc.trend} />
              </>
            )}
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
