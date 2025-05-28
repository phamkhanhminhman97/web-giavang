
import { 
  Crown, 
  Star, 
  Award, 
  Shield, 
  Gem, 
  Sparkles, 
  Medal
} from "lucide-react";

// Gold vendor icon component
export type VendorName = "SJC" | "DOJI" | "PNJ" | "BTMC" | "MiHong" | "PhuQuy" | "HuyThanh" | "KimKhanhVietHung";

export const GoldVendorIcon = ({ vendor }: { vendor: VendorName }) => {
  switch (vendor) {
    case "SJC":
      return <Crown size={16} className="text-gold" />;
    case "DOJI":
      return <Star size={16} className="text-gold" />;
    case "PNJ":
      return <Award size={16} className="text-gold" />;
    case "BTMC":
      return <Shield size={16} className="text-gold" />;
    case "MiHong":
      return <Gem size={16} className="text-gold" />;
    case "PhuQuy":
      return <Sparkles size={16} className="text-gold" />;
    case "HuyThanh":
      return <Medal size={16} className="text-gold" />;
    case "KimKhanhVietHung":
      return <Gem size={16} className="text-gold" />;
    default:
      return <Crown size={16} className="text-gold" />;
  }
};

export default GoldVendorIcon;
