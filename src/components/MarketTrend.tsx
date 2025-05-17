
import { Card, CardContent } from "@/components/ui/card";

const MarketTrend = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="price-card lg:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 font-playfair">Xu Hướng Thị Trường</h3>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700">
              Thị trường vàng trong nước tiếp tục duy trì sự ổn định so với tuần trước, trong khi giá vàng quốc tế có xu hướng tăng nhẹ. Các yếu tố chính ảnh hưởng đến thị trường hiện tại:
            </p>
            <ul className="mt-4 space-y-2">
              <TrendItem
                text="USD Index đang giảm nhẹ, tạo điều kiện thuận lợi cho giá vàng tăng."
                trend="positive"
              />
              <TrendItem
                text="Tình hình địa chính trị tại một số khu vực vẫn căng thẳng, khiến nhà đầu tư tìm đến vàng như kênh trú ẩn an toàn."
                trend="positive"
              />
              <TrendItem
                text="Lãi suất ngân hàng đang ở mức thấp, khuyến khích dòng tiền chuyển sang kênh đầu tư vàng."
                trend="positive"
              />
              <TrendItem
                text="Chênh lệch giữa giá vàng trong nước và quốc tế vẫn duy trì ở mức cao."
                trend="neutral"
              />
              <TrendItem
                text="Khả năng Fed tăng lãi suất trong các cuộc họp tới có thể tạo áp lực lên giá vàng."
                trend="negative"
              />
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="price-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 font-playfair">Dự Báo Giá Vàng</h3>
          <div className="space-y-4">
            <ForecastItem period="Ngắn hạn (1-7 ngày)" forecast="Tăng nhẹ" />
            <ForecastItem period="Trung hạn (1-4 tuần)" forecast="Ổn định" />
            <ForecastItem period="Dài hạn (1-3 tháng)" forecast="Tăng" />
          </div>
          
          <div className="mt-6 bg-gold-muted p-4 rounded-lg">
            <h4 className="font-medium text-gold-dark mb-2">Lưu ý đầu tư</h4>
            <p className="text-sm text-slate-700">
              Các nhà đầu tư nên theo dõi sát diễn biến thị trường, đặc biệt là các động thái từ Fed và tình hình địa chính trị toàn cầu. Cân nhắc chiến lược phân bổ tài sản hợp lý và không nên tập trung quá nhiều vào một kênh đầu tư.
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
