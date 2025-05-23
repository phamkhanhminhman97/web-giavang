import { useState, useEffect } from "react";
import { useGoldPrices } from "@/contexts/GoldPriceContext";
import { IGoldPrice } from "@/interfaces/gold-price.interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

// Data structure to hold processed API data
interface GoldData {
  vendors: {
    name: string;
    buyPrice: number;
    sellPrice: number;
    change: number;
  }[];
  types: {
    name: string;
    price: number;
    change: number;
  }[];
  historical: {
    date: string;
    price: number;
  }[];
}

// Initial empty state
const initialGoldData: GoldData = {
  vendors: [],
  types: [],
  historical: []
};

// Format price to Vietnamese currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

// Format price difference with + or - sign
const formatPriceDiff = (diff: number) => {
  const formattedDiff = new Intl.NumberFormat('vi-VN').format(Math.abs(diff));
  return diff >= 0 ? `+${formattedDiff}` : `-${formattedDiff}`;
};

// Get color based on price change
const getPriceChangeColor = (change: number) => {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-slate-600";
};

// Get icon based on price change
const getPriceChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUpRight size={16} className="text-green-600" />;
  if (change < 0) return <ArrowDownRight size={16} className="text-red-600" />;
  return <Minus size={16} className="text-slate-600" />;
};

const GoldComparison = () => {
  const [comparisonType, setComparisonType] = useState("vendors");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState(7);
  const [chartData, setChartData] = useState<any[]>([]);
  const [goldData, setGoldData] = useState<GoldData>(initialGoldData);
  const { goldPrices, loading, error } = useGoldPrices();
  
  // Colors for the chart
  const COLORS = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD7F32', '#A67C00'];
  
  // Process gold price data from context
  useEffect(() => {
    if (goldPrices.length > 0) {
      // Process the API data into the format needed by the component
      const processedData = processApiData(goldPrices);
      setGoldData(processedData);
    }
  }, [goldPrices]);

  // Process API data into the format needed by the component
  const processApiData = (apiData: IGoldPrice[]): GoldData => {
    const vendors: { [key: string]: any } = {};
    const types: { [key: string]: any } = {};
    const historicalData: { [key: string]: any } = {};
    
    // Group data by provider and type
    apiData.forEach(item => {
      const provider = item.provider.toUpperCase();
      const type = item.type;
      
      // Process vendor data
      if (!vendors[provider]) {
        vendors[provider] = {
          name: provider,
          buyPrice: item.buyPrice,
          sellPrice: item.sellPrice,
          change: item.change.sell * item.sellPrice / 100 // Convert percentage to absolute value
        };
      }
      
      // Process type data
      if (!types[type]) {
        types[type] = {
          name: type,
          price: item.sellPrice,
          change: item.change.sell * item.sellPrice / 100 // Convert percentage to absolute value
        };
      }
      
      // For historical data, we'll use the timestamp
      // In a real app, you'd have historical data from the API
      const date = new Date(item.timestamp);
      const dateStr = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (!historicalData[dateStr] && Object.keys(historicalData).length < 7) {
        historicalData[dateStr] = {
          date: dateStr,
          price: item.sellPrice
        };
      }
    });
    
    return {
      vendors: Object.values(vendors),
      types: Object.values(types),
      historical: Object.values(historicalData)
    };
  };

  // Initialize selected items based on comparison type
  useEffect(() => {
    if (comparisonType === "vendors" && goldData.vendors.length > 0) {
      setSelectedItems(goldData.vendors.slice(0, 3).map(v => v.name));
    } else if (comparisonType === "types" && goldData.types.length > 0) {
      setSelectedItems(goldData.types.slice(0, 3).map(t => t.name));
    } else if (comparisonType === "historical") {
      setSelectedItems(["Vàng SJC"]);
    }
  }, [comparisonType, goldData]);
  
  useEffect(() => {
    // Prepare chart data based on comparison type and selected items
    if (comparisonType === "vendors") {
      const data = goldData.vendors
        .filter(vendor => selectedItems.includes(vendor.name))
        .map(vendor => ({
          name: vendor.name,
          "Giá mua": vendor.buyPrice,
          "Giá bán": vendor.sellPrice,
          change: vendor.change
        }));
      setChartData(data);
    } else if (comparisonType === "types") {
      const data = goldData.types
        .filter(type => selectedItems.includes(type.name))
        .map(type => ({
          name: type.name,
          "Giá bán": type.price,
          change: type.change
        }));
      setChartData(data);
    } else if (comparisonType === "historical") {
      // For historical, we'd typically fetch data for the selected time range
      // Here we're just using sample data
      const data = goldData.historical
        .slice(0, timeRange)
        .map(item => ({
          name: item.date,
          "Giá vàng SJC": item.price
        }));
      setChartData(data.reverse());
    }
  }, [comparisonType, selectedItems, timeRange]);
  
  const handleItemToggle = (item: string) => {
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter(i => i !== item));
      }
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  
  const renderComparisonOptions = () => {
    if (comparisonType === "vendors") {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          {goldData.vendors.map((vendor) => (
            <button
              key={vendor.name}
              onClick={() => handleItemToggle(vendor.name)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedItems.includes(vendor.name)
                  ? "bg-gold-light text-slate-800 shadow-md"
                  : "bg-white/80 text-slate-600 border border-gold-light/30"
              }`}
            >
              {vendor.name}
            </button>
          ))}
        </div>
      );
    } else if (comparisonType === "types") {
      return (
        <div className="flex flex-wrap gap-2 mt-4">
          {goldData.types.map((type) => (
            <button
              key={type.name}
              onClick={() => handleItemToggle(type.name)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedItems.includes(type.name)
                  ? "bg-gold-light text-slate-800 shadow-md"
                  : "bg-white/80 text-slate-600 border border-gold-light/30"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      );
    } else if (comparisonType === "historical") {
      return (
        <div className="mt-4">
          <div className="flex justify-between mb-2 text-sm text-slate-600">
            <span>3 ngày</span>
            <span>7 ngày</span>
            <span>14 ngày</span>
            <span>30 ngày</span>
          </div>
          <Slider
            defaultValue={[7]}
            max={30}
            min={3}
            step={1}
            value={[timeRange]}
            onValueChange={(value) => setTimeRange(value[0])}
            className="mb-6"
          />
          <p className="text-center text-sm font-medium text-slate-700">
            Hiển thị dữ liệu {timeRange} ngày gần nhất
          </p>
        </div>
      );
    }
  };
  
  const renderComparisonTable = () => {
    if (comparisonType === "vendors") {
      return (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gold-muted/20">
                <th className="p-3 text-left text-sm font-semibold text-slate-700">Đơn vị</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Giá mua</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Giá bán</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Chênh lệch</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Biến động</th>
              </tr>
            </thead>
            <tbody>
              {goldData.vendors
                .filter(vendor => selectedItems.includes(vendor.name))
                .map((vendor, index) => (
                  <tr 
                    key={vendor.name} 
                    className={`border-b border-gold-light/20 ${
                      index % 2 === 0 ? "bg-white/50" : "bg-gold-muted/5"
                    }`}
                  >
                    <td className="p-3 text-sm font-medium text-slate-700">{vendor.name}</td>
                    <td className="p-3 text-right text-sm font-medium text-slate-700">
                      {formatPrice(vendor.buyPrice)}
                    </td>
                    <td className="p-3 text-right text-sm font-medium text-slate-700">
                      {formatPrice(vendor.sellPrice)}
                    </td>
                    <td className="p-3 text-right text-sm font-medium text-slate-700">
                      {formatPrice(vendor.sellPrice - vendor.buyPrice)}
                    </td>
                    <td className={`p-3 text-right text-sm font-medium flex items-center justify-end ${getPriceChangeColor(vendor.change)}`}>
                      {getPriceChangeIcon(vendor.change)}
                      <span className="ml-1">{formatPriceDiff(vendor.change)}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    } else if (comparisonType === "types") {
      return (
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gold-muted/20">
                <th className="p-3 text-left text-sm font-semibold text-slate-700">Loại vàng</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Giá bán</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700">Biến động</th>
              </tr>
            </thead>
            <tbody>
              {goldData.types
                .filter(type => selectedItems.includes(type.name))
                .map((type, index) => (
                  <tr 
                    key={type.name} 
                    className={`border-b border-gold-light/20 ${
                      index % 2 === 0 ? "bg-white/50" : "bg-gold-muted/5"
                    }`}
                  >
                    <td className="p-3 text-sm font-medium text-slate-700">{type.name}</td>
                    <td className="p-3 text-right text-sm font-medium text-slate-700">
                      {formatPrice(type.price)}
                    </td>
                    <td className={`p-3 text-right text-sm font-medium flex items-center justify-end ${getPriceChangeColor(type.change)}`}>
                      {getPriceChangeIcon(type.change)}
                      <span className="ml-1">{formatPriceDiff(type.change)}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30">
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-dark"></div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center p-4">
          {error}
        </div>
      )}
      
      {!loading && !error && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-xl font-bold font-playfair text-slate-800 mb-4 md:mb-0">
          <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
            So Sánh Giá Vàng
          </span>
        </h3>
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 border border-gold-light/30 shadow-md">
          <Tabs defaultValue="vendors" value={comparisonType} onValueChange={setComparisonType}>
            <TabsList className="bg-gold-muted/20">
              <TabsTrigger 
                value="vendors" 
                className="text-xs md:text-sm font-medium"
              >
                Đơn vị kinh doanh
              </TabsTrigger>
              <TabsTrigger 
                value="types" 
                className="text-xs md:text-sm font-medium"
              >
                Loại vàng
              </TabsTrigger>
              <TabsTrigger 
                value="historical" 
                className="text-xs md:text-sm font-medium"
              >
                Lịch sử giá
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {renderComparisonOptions()}
      
      <div className="mt-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => {
                return `${(value / 1000000).toFixed(1)}tr`;
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatPrice(value)} đ`, ""]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "#FFD700",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Legend />
            {comparisonType === "vendors" && (
              <>
                <Bar dataKey="Giá mua" fill="#FFD700" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Giá bán" fill="#DAA520" radius={[4, 4, 0, 0]} />
              </>
            )}
            {comparisonType === "types" && (
              <Bar dataKey="Giá bán" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            )}
            {comparisonType === "historical" && (
              <Bar dataKey="Giá vàng SJC" fill="#FFD700" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {renderComparisonTable()}
      
            <div className="mt-6 text-right">
              <p className="text-xs text-slate-500 italic">
                * Dữ liệu được cập nhật theo thời gian thực từ các nguồn uy tín
              </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default GoldComparison;
