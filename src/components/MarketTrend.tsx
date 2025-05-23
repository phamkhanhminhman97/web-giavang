
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { fetchMarketAnalysis, MarketAnalysis } from "@/services/market-analysis";

const MarketTrend = () => {
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnalysis = async () => {
      setLoading(true);
      try {
        const response = await fetchMarketAnalysis();
        if (response.success && response.data) {
          setAnalysis(response.data);
        } else {
          setError(response.error || 'Failed to load market analysis');
        }
      } catch (err) {
        setError('Error loading market analysis');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="price-card lg:col-span-2">
          <CardContent className="p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="price-card">
          <CardContent className="p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-slate-200 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="price-card lg:col-span-3">
          <CardContent className="p-6 text-center">
            <p className="text-red-500">
              {error || 'Unable to load market analysis. Please try again later.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="price-card lg:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 font-playfair">{analysis.marketTrend.title}</h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700">
              {analysis.marketTrend.description}
            </p>
            <ul className="mt-4 space-y-2">
              {analysis.marketTrend.factors.map((factor, index) => (
                <TrendItem
                  key={index}
                  text={factor.text}
                  trend={factor.impact}
                />
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="price-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 font-playfair">Dự Báo Giá Vàng</h3>
          <div className="space-y-4">
            <ForecastItem 
              period={analysis.forecast.shortTerm.title} 
              forecast={getTrendText(analysis.forecast.shortTerm.trend)} 
            />
            <ForecastItem 
              period={analysis.forecast.midTerm.title} 
              forecast={getTrendText(analysis.forecast.midTerm.trend)} 
            />
            <ForecastItem 
              period={analysis.forecast.longTerm.title} 
              forecast={getTrendText(analysis.forecast.longTerm.trend)} 
            />
          </div>
          
          <div className="mt-6 bg-gold-muted p-4 rounded-lg">
            <h4 className="font-medium text-gold-dark mb-2">{analysis.investmentTips.title}</h4>
            <p className="text-sm text-slate-700">
              {analysis.investmentTips.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

type TrendItemProps = {
  text: string;
  trend: "positive" | "negative" | "neutral";
};

// Helper function to convert trend to text
const getTrendText = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up': return 'Tăng';
    case 'down': return 'Giảm';
    case 'stable': return 'Ổn định';
    default: return 'Ổn định';
  }
};

const TrendItem = ({ text, trend }: TrendItemProps) => {
  const getIconColor = () => {
    switch(trend) {
      case "positive": return "text-green-500";
      case "negative": return "text-red-500";
      default: return "text-amber-500";
    }
  };

  return (
    <li className="flex items-start space-x-2">
      <span className={`inline-block w-5 h-5 mt-0.5 flex-shrink-0 rounded-full ${getIconColor()}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          {trend === "positive" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />}
          {trend === "negative" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
          {trend === "neutral" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
        </svg>
      </span>
      <span className="text-slate-700">{text}</span>
    </li>
  );
};

type ForecastItemProps = {
  period: string;
  forecast: string;
};

const ForecastItem = ({ period, forecast }: ForecastItemProps) => {
  const getColor = () => {
    if (forecast.toLowerCase().includes("tăng")) return "text-green-600";
    if (forecast.toLowerCase().includes("giảm")) return "text-red-600";
    return "text-amber-600";
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-slate-700">{period}</h4>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            forecast.toLowerCase().includes("tăng") ? "bg-green-500" : 
            forecast.toLowerCase().includes("giảm") ? "bg-red-500" : "bg-amber-500"
          }`}></div>
          <span className={`font-medium ${getColor()}`}>{forecast}</span>
        </div>
        <div className="text-sm font-medium text-slate-500">
          {forecast.toLowerCase().includes("tăng") ? "↑" : 
           forecast.toLowerCase().includes("giảm") ? "↓" : "↔"}
        </div>
      </div>
    </div>
  );
};

export default MarketTrend;
