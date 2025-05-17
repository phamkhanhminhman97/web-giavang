
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";

type GoldPriceCardProps = {
  title: string;
  buyPrice: string;
  sellPrice: string;
  buyChange: number; // Percentage change
  sellChange: number; // Percentage change
  isSelected?: boolean;
};

const GoldPriceCard = ({
  title,
  buyPrice,
  sellPrice,
  buyChange,
  sellChange,
  isSelected = false,
}: GoldPriceCardProps) => {
  return (
    <Card className={`price-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
      isSelected ? 'ring-2 ring-gold border-gold' : ''
    }`}>
      {isSelected && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-rich"></div>
      )}
      <div className="p-5">
        <h3 className="font-playfair text-xl font-semibold mb-4 text-center">{title}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Buy Price */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-blue-700 font-medium mb-1">Mua vào</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl font-semibold text-blue-800">{buyPrice}</p>
                <PriceChange value={buyChange} />
              </div>
              <p className="text-xs text-slate-500 mt-1">VND/chỉ</p>
            </div>
          </div>
          
          {/* Sell Price */}
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-red-700 font-medium mb-1">Bán ra</p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl font-semibold text-red-800">{sellPrice}</p>
                <PriceChange value={sellChange} />
              </div>
              <p className="text-xs text-slate-500 mt-1">VND/chỉ</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

type PriceChangeProps = {
  value: number;
};

const PriceChange = ({ value }: PriceChangeProps) => {
  if (value === 0) {
    return <span className="text-xs text-slate-500">0%</span>;
  }
  
  const isPositive = value > 0;
  const Icon = isPositive ? ArrowUp : ArrowDown;
  const colorClass = isPositive ? "text-green-600" : "text-red-600";
  
  return (
    <div className={`flex items-center ${colorClass} text-xs`}>
      <Icon size={12} />
      <span>{Math.abs(value)}%</span>
    </div>
  );
};

export default GoldPriceCard;
