
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoldPriceCard from "./GoldPriceCard";
import PriceChart from "./PriceChart";

const GoldTabs = () => {
  const [activeTab, setActiveTab] = useState("sjc");

  return (
    <Tabs defaultValue="sjc" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="bg-slate-100 p-1 shadow-inner">
          <TabsTrigger value="sjc" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark">
            SJC
          </TabsTrigger>
          <TabsTrigger value="doji" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark">
            DOJI
          </TabsTrigger>
          <TabsTrigger value="pnj" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark">
            PNJ
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="sjc" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng SJC 1L"
            buyPrice="11.550.000"
            sellPrice="11.850.000"
            buyChange={-0.17}
            sellChange={-0.17}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng SJC 10L"
            buyPrice="11.550.000"
            sellPrice="11.830.000"
            buyChange={-0.12}
            sellChange={-0.15}
          />
          <GoldPriceCard
            title="Vàng SJC 1KG"
            buyPrice="11.545.000"
            sellPrice="11.825.000"
            buyChange={-0.14}
            sellChange={-0.16}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="SJC 1L, 10L, 1KG" />
      </TabsContent>

      <TabsContent value="doji" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng DOJI 1L"
            buyPrice="11.530.000"
            sellPrice="11.830.000"
            buyChange={-0.15}
            sellChange={-0.18}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng DOJI 10L"
            buyPrice="11.535.000"
            sellPrice="11.825.000"
            buyChange={-0.13}
            sellChange={-0.16}
          />
          <GoldPriceCard
            title="Vàng DOJI 1KG"
            buyPrice="11.532.000"
            sellPrice="11.822.000"
            buyChange={-0.14}
            sellChange={-0.15}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="DOJI 1L, 10L, 1KG" />
      </TabsContent>

      <TabsContent value="pnj" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng PNJ 1L"
            buyPrice="11.540.000"
            sellPrice="11.840.000"
            buyChange={-0.16}
            sellChange={-0.17}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng PNJ 10L"
            buyPrice="11.542.000"
            sellPrice="11.832.000"
            buyChange={-0.14}
            sellChange={-0.15}
          />
          <GoldPriceCard
            title="Vàng PNJ 1KG"
            buyPrice="11.538.000"
            sellPrice="11.828.000"
            buyChange={-0.15}
            sellChange={-0.16}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="PNJ 1L, 10L, 1KG" />
      </TabsContent>
    </Tabs>
  );
};

export default GoldTabs;
