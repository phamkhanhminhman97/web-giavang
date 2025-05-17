
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - this would normally come from an API
const sampleData = {
  '7days': [
    { date: '11-05', buyPrice: 8170386428, sellPrice: 8280939444 },
    { date: '12-05', buyPrice: 8150386428, sellPrice: 8260939444 },
    { date: '13-05', buyPrice: 8140386428, sellPrice: 8280939444 },
    { date: '14-05', buyPrice: 8170386428, sellPrice: 8290939444 },
    { date: '15-05', buyPrice: 8190386428, sellPrice: 8280939444 },
    { date: '16-05', buyPrice: 8150386428, sellPrice: 8270939444 },
    { date: '17-05', buyPrice: 8170386428, sellPrice: 8280939444 },
  ],
  '15days': [
    { date: '03-05', buyPrice: 8100386428, sellPrice: 8200939444 },
    { date: '04-05', buyPrice: 8120386428, sellPrice: 8220939444 },
    { date: '05-05', buyPrice: 8140386428, sellPrice: 8240939444 },
    { date: '06-05', buyPrice: 8130386428, sellPrice: 8230939444 },
    { date: '07-05', buyPrice: 8160386428, sellPrice: 8260939444 },
    { date: '08-05', buyPrice: 8170386428, sellPrice: 8270939444 },
    { date: '09-05', buyPrice: 8160386428, sellPrice: 8260939444 },
    { date: '10-05', buyPrice: 8150386428, sellPrice: 8250939444 },
    { date: '11-05', buyPrice: 8170386428, sellPrice: 8280939444 },
    { date: '12-05', buyPrice: 8150386428, sellPrice: 8260939444 },
    { date: '13-05', buyPrice: 8140386428, sellPrice: 8280939444 },
    { date: '14-05', buyPrice: 8170386428, sellPrice: 8290939444 },
    { date: '15-05', buyPrice: 8190386428, sellPrice: 8280939444 },
    { date: '16-05', buyPrice: 8150386428, sellPrice: 8270939444 },
    { date: '17-05', buyPrice: 8170386428, sellPrice: 8280939444 },
  ],
  '30days': [
    { date: '17-04', buyPrice: 8000386428, sellPrice: 8100939444 },
    { date: '20-04', buyPrice: 8030386428, sellPrice: 8130939444 },
    { date: '23-04', buyPrice: 8050386428, sellPrice: 8150939444 },
    { date: '26-04', buyPrice: 8070386428, sellPrice: 8170939444 },
    { date: '29-04', buyPrice: 8090386428, sellPrice: 8190939444 },
    { date: '02-05', buyPrice: 8100386428, sellPrice: 8200939444 },
    { date: '05-05', buyPrice: 8140386428, sellPrice: 8240939444 },
    { date: '08-05', buyPrice: 8170386428, sellPrice: 8270939444 },
    { date: '11-05', buyPrice: 8170386428, sellPrice: 8280939444 },
    { date: '14-05', buyPrice: 8170386428, sellPrice: 8290939444 },
    { date: '17-05', buyPrice: 8170386428, sellPrice: 8280939444 },
  ],
};

// Format large numbers to a more readable format
const formatPrice = (value: number) => {
  const millions = value / 1000000;
  return millions.toLocaleString('vi-VN');
};

type PriceChartProps = {
  title: string;
  goldType: string;
};

const PriceChart = ({ title, goldType }: PriceChartProps) => {
  const [timeRange, setTimeRange] = useState<'7days' | '15days' | '30days'>('7days');
  
  const chartData = sampleData[timeRange];
  
  return (
    <Card className="price-card">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-xl font-semibold font-playfair text-slate-800">
            {title} <span className="text-gold">{goldType}</span>
          </h3>
          
          <Tabs defaultValue="7days" value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList className="bg-slate-100">
              <TabsTrigger value="7days">7 ngày</TabsTrigger>
              <TabsTrigger value="15days">15 ngày</TabsTrigger>
              <TabsTrigger value="30days">30 ngày</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default PriceChart;
