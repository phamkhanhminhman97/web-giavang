
import { Card } from "@/components/ui/card";

const PriceInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <InfoCard
        title="Vàng Quốc Tế"
        value="$2,345.67"
        change={0.25}
        trend="up"
      />
      <InfoCard
        title="USD/VND"
        value="24,850"
        change={-0.12}
        trend="down"
      />
      <InfoCard
        title="Vàng SJC/Thế Giới"
        value="+ 650,000"
        change={0.31}
        trend="up"
        suffix="VND/chỉ"
      />
      <InfoCard
        title="Dự Báo Giá"
        value="Tăng nhẹ"
        badgeText="24h tới"
        badgeColor="yellow"
      />
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
