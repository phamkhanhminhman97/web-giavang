import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchChartData } from "@/services/api";
import env from "@/utils/environment";

// Format large numbers to a more readable format
const formatPrice = (value: number) => {
  const millions = value / 1000000;
  return millions.toLocaleString('vi-VN');
};


type PriceChartProps = {
  title: string;
  goldType: string;
  vendor?: string;
};

const PriceChart = ({ 
  title, 
  goldType = env.DEFAULT_GOLD_TYPE, 
  vendor = env.DEFAULT_VENDOR 
}: PriceChartProps) => {
  const defaultDays = env.DEFAULT_CHART_DAYS;
  const [timeRange, setTimeRange] = useState<'7days' | '15days' | '30days'>(`${defaultDays}days` as '7days' | '15days' | '30days');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Convert time range to days
  const getDaysFromTimeRange = (range: string): number => {
    switch (range) {
      case '7days': return 7;
      case '15days': return 15;
      case '30days': return 30;
      default: return 7;
    }
  };
  
  // Fetch chart data when time range or vendor changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const days = getDaysFromTimeRange(timeRange);
        const response = await fetchChartData(vendor.toLowerCase(), goldType, days);
        
        if (response.success && response.data.length > 0) {
          // Format dates for display
          const formattedData = response.data.map(item => ({
            ...item,
            date: item.date.split('-').slice(2).reverse().join('-') // Convert YYYY-MM-DD to DD-MM
          }));
          
          setChartData(formattedData);
          setError(null);
        } else {
          setError(response.error || "No chart data available");
          setChartData([]);
        }
      } catch (err) {
        setError("Error fetching chart data");
        console.error(err);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, vendor, goldType]);
  
  // Tính toán min/max động cho trục Y để zoom vào vùng biến động
  const yDomain = useMemo<[number, number]>(() => {
    if (!chartData.length) return [0, 1];
    let min = Math.min(
      ...chartData.map((d) => Math.min(d.buyPrice, d.sellPrice))
    );
    let max = Math.max(
      ...chartData.map((d) => Math.max(d.buyPrice, d.sellPrice))
    );
    // Thêm padding ±0.5 triệu
    min = Math.floor((min - 500000) / 1000000) * 1000000;
    max = Math.ceil((max + 500000) / 1000000) * 1000000;
    return [min, max];
  }, [chartData]);
  
  return (
    <Card className="price-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold font-playfair text-slate-800">
            {title || "Biến động giá vàng PNJ"} <span className="text-gold">{goldType}</span>
          </h3>
          
          <Tabs defaultValue="7days" value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList className="bg-slate-100">
              <TabsTrigger value="7days">7 ngày</TabsTrigger>
              <TabsTrigger value="15days">15 ngày</TabsTrigger>
              <TabsTrigger value="30days">30 ngày</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-dark"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px] text-red-500">
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex justify-center items-center h-[300px] text-slate-500">
            Không có dữ liệu
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date"
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                />
                <YAxis
                  tickFormatter={(value) => formatPrice(value)}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  width={60}
                  domain={yDomain}
                />
                <Tooltip 
                  formatter={(value: number) => [`${formatPrice(value)} triệu`, '']}
                  labelFormatter={(label) => `Ngày: ${label}`}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="buyPrice" 
                  name="Mua vào" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#3B82F6', strokeWidth: 1, stroke: '#fff' }}
                  activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 1 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sellPrice" 
                  name="Bán ra" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#EF4444', strokeWidth: 1, stroke: '#fff' }}
                  activeDot={{ r: 5, stroke: '#EF4444', strokeWidth: 1 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceChart;
