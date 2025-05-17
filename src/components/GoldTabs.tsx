
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoldPriceCard from "./GoldPriceCard";
import GoldVendorIcon, { VendorName } from "./GoldTabIcons";
import { useState } from "react";
import PriceChart from "./PriceChart";

// Define gold vendor data (mock data)
const vendors: VendorName[] = [
  "SJC", "DOJI", "PNJ", "BTMC", "MiHong", "PhuQuy", "HuyThanh"
];

const GoldTabs = () => {
  const [selectedVendor, setSelectedVendor] = useState<VendorName>("SJC");

  return (
    <Tabs defaultValue="SJC" onValueChange={(value) => setSelectedVendor(value as VendorName)}>
      <div className="flex justify-center mb-6">
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
          <GoldPriceCard
            title="Vàng miếng SJC 1L"
            buyPrice="78,900,000"
            sellPrice="80,900,000"
            buyChange={2}
            sellChange={2}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng nhẫn 9999"
            buyPrice="78,550,000"
            sellPrice="79,650,000"
            buyChange={2}
            sellChange={2}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng nữ trang 9999"
            buyPrice="78,450,000"
            sellPrice="79,550,000"
            buyChange={2}
            sellChange={2}
            isSelected={true}
          />
        </TabsContent>
      ))}

      {/* Chart showing price trends */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-gold-light/30">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Biến động giá vàng {selectedVendor} trong 30 ngày qua
        </h3>
        <PriceChart title={""} goldType={""} />
      </div>
    </Tabs>
  );
};

export default GoldTabs;
