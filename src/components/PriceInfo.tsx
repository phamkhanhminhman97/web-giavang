
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useGoldPrices } from "@/contexts/GoldPriceContext";

const PriceInfo = () => {
  const { goldPrices, loading, error } = useGoldPrices();
  const [sjcPrice, setSjcPrice] = useState<number | null>(null);
  const [sjcChange, setSjcChange] = useState<number>(0);
  const [dojiPrice, setDojiPrice] = useState<number | null>(null);
  const [dojiChange, setDojiChange] = useState<number>(0);
  // USD/VND exchange rate (static for now, could be fetched from an API)
  const [usdRate, setUsdRate] = useState<number>(24850);
  const [usdChange, setUsdChange] = useState<number>(-0.12);

  // Process gold price data from context
  useEffect(() => {
    if (goldPrices.length > 0) {
      // Process SJC data
      const sjcData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'SJC' && item.type.includes('SJC')
      );
      if (sjcData) {
        setSjcPrice(sjcData.sellPrice);
        setSjcChange(sjcData.change.sell);
      }
      
      // Process DOJI data
      const dojiData = goldPrices.find(item => 
        item.provider.toUpperCase() === 'DOJI' && item.type.includes('SJC')
      );
      if (dojiData) {
        setDojiPrice(dojiData.sellPrice);
        setDojiChange(dojiData.change.sell);
      }
    }
  }, [goldPrices]);

  // Format price to Vietnamese currency
  const formatPrice = (price: number | null) => {
    if (price === null) return "Đang cập nhật";
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-4 flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-dark"></div>
        </div>
      ) : error ? (
        <div className="col-span-4 text-red-500 text-center p-4">
          {error}
        </div>
      ) : (
        <>
          <InfoCard
            title="Giá Vàng SJC"
            value={`${formatPrice(sjcPrice)}`}
            change={sjcChange}
            trend={sjcChange > 0 ? "up" : sjcChange < 0 ? "down" : "neutral"}
            suffix="VND/lượng"
          />
          <InfoCard
            title="Giá Vàng DOJI"
            value={`${formatPrice(dojiPrice)}`}
            change={dojiChange}
            trend={dojiChange > 0 ? "up" : dojiChange < 0 ? "down" : "neutral"}
            suffix="VND/lượng"
          />
          <InfoCard
            title="USD/VND"
            value={formatPrice(usdRate)}
            change={usdChange}
            trend={usdChange > 0 ? "up" : usdChange < 0 ? "down" : "neutral"}
          />
          <InfoCard
            title="Dự Báo Giá"
            value="Tăng nhẹ"
            badgeText="24h tới"
            badgeColor="yellow"
          />
        </>
      )}
    </div>
  );
};

type InfoCardProps = {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  suffix?: string;
  badgeText?: string;
  badgeColor?: 'green' | 'yellow' | 'red' | 'blue' | 'purple';
};

const InfoCard = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral',
  suffix,
  badgeText,
  badgeColor = 'blue'
}: InfoCardProps) => {
  const getTrendColor = () => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };
  
  const getBadgeColor = () => {
    switch(badgeColor) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-amber-100 text-amber-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="price-card p-5">
      <div className="text-center">
        <h4 className="text-sm font-medium text-slate-500 mb-2">{title}</h4>
        <div className="flex items-center justify-center space-x-2">
          <div className="text-2xl font-semibold">{value}</div>
          {change !== undefined && (
            <div className={`text-xs font-medium ${getTrendColor()}`}>
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
              {Math.abs(change)}%
            </div>
          )}
          {badgeText && (
            <div className={`text-xs font-medium px-2 py-0.5 rounded ${getBadgeColor()}`}>
              {badgeText}
            </div>
          )}
        </div>
        {suffix && <div className="text-xs text-slate-400 mt-1">{suffix}</div>}
      </div>
    </Card>
  );
};

export default PriceInfo;
