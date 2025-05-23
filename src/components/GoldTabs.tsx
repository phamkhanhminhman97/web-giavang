
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoldPriceCard from "./GoldPriceCard";
import GoldVendorIcon, { VendorName } from "./GoldTabIcons";
import { useState, useEffect } from "react";
import PriceChart from "./PriceChart";
import { useGoldPrices } from "@/contexts/GoldPriceContext";

// Define gold vendor data
const vendors: VendorName[] = [
  "SJC", "DOJI", "PNJ", "BTMC", "MiHong", "PhuQuy", "HuyThanh"
];

// Map API provider names to our vendor names
const providerToVendorMap: Record<string, VendorName> = {
  'SJC': 'SJC',
  'DOJI': 'DOJI',
  'PNJ': 'PNJ',
  'BTMC': 'BTMC',
  'MI HỒNG': 'MiHong',
  'PHÚ QUÝ': 'PhuQuy',
  'HUY THANH': 'HuyThanh'
};

// Interface for processed gold data by vendor
interface GoldDataByVendor {
  [vendor: string]: {
    [type: string]: {
      buyPrice: number;
      sellPrice: number;
      buyChange: number;
      sellChange: number;
    }
  }
}

const GoldTabs = () => {
  const [selectedVendor, setSelectedVendor] = useState<VendorName>("SJC");
  const [goldData, setGoldData] = useState<GoldDataByVendor>({});
  const { goldPrices, loading, error } = useGoldPrices();

  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Process gold price data from context
  useEffect(() => {
    if (goldPrices.length > 0) {
      // Process the API data by vendor and gold type
      const processedData: GoldDataByVendor = {};
      
      goldPrices.forEach(item => {
        const provider = item.provider.toUpperCase();
        const vendorKey = Object.keys(providerToVendorMap).find(key => 
          provider.includes(key) || key.includes(provider)
        );
        
        if (vendorKey) {
          const vendor = providerToVendorMap[vendorKey];
          
          if (!processedData[vendor]) {
            processedData[vendor] = {};
          }
          
          processedData[vendor][item.type] = {
            buyPrice: item.buyPrice,
            sellPrice: item.sellPrice,
            buyChange: item.change.buy,
            sellChange: item.change.sell
          };
        }
      });
      
      setGoldData(processedData);
    }
  }, [goldPrices]);

  // Render gold price cards for a vendor
  const renderGoldPriceCards = (vendor: VendorName) => {
    if (loading) {
      return (
        <div className="col-span-3 flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-dark"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="col-span-3 text-red-500 text-center p-4">
          {error}
        </div>
      );
    }
    
    if (!goldData[vendor] || Object.keys(goldData[vendor]).length === 0) {
      return (
        <div className="col-span-3 text-slate-500 text-center p-4">
          Không có dữ liệu cho {vendor}
        </div>
      );
    }
    
    // Get gold types for this vendor with highest sell prices (limit to 3)
    const goldTypes = Object.keys(goldData[vendor])
      .sort((a, b) => goldData[vendor][b].sellPrice - goldData[vendor][a].sellPrice)
      .slice(0, 3);
    
    return goldTypes.map((type, index) => {
      const data = goldData[vendor][type];
      return (
        <GoldPriceCard
          key={`${vendor}-${type}`}
          title={type}
          buyPrice={formatPrice(data.buyPrice)}
          sellPrice={formatPrice(data.sellPrice)}
          buyChange={data.buyChange}
          sellChange={data.sellChange}
          isSelected={index === 0} // Highlight the first item
        />
      );
    });
  };

  return (
    <Tabs defaultValue="SJC" onValueChange={(value) => setSelectedVendor(value as VendorName)}>
      <div className="flex justify-center mb-6 overflow-x-auto">
        <TabsList className="bg-gold-muted/50 p-1">
          {vendors.map((vendor) => (
            <TabsTrigger
              key={vendor}
              value={vendor}
              className="data-[state=active]:bg-white data-[state=active]:text-gold-dark"
            >
              <div className="flex items-center gap-1.5">
                <GoldVendorIcon vendor={vendor} />
                <span>{vendor}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Content for each tab */}
      {vendors.map((vendor) => (
        <TabsContent key={vendor} value={vendor} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderGoldPriceCards(vendor)}
        </TabsContent>
      ))}

      {/* Chart showing price trends */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-gold-light/30">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Biến động giá vàng {selectedVendor} trong 30 ngày qua
        </h3>
        <PriceChart 
          title={`Biến động giá vàng ${selectedVendor}`} 
          goldType="SJC"
          vendor={selectedVendor}
        />
      </div>
    </Tabs>
  );
};

export default GoldTabs;
