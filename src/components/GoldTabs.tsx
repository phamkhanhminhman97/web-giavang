
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GoldPriceCard from "./GoldPriceCard";
import PriceChart from "./PriceChart";
import { Star, Diamond, Gem, Crown } from "lucide-react";

const GoldTabs = () => {
  const [activeTab, setActiveTab] = useState("sjc");

  return (
    <Tabs defaultValue="sjc" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
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
          <TabsTrigger value="btmc" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark flex items-center gap-1">
            <Star className="w-4 h-4" /> BTMC
          </TabsTrigger>
          <TabsTrigger value="mihong" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark flex items-center gap-1">
            <Diamond className="w-4 h-4" /> Mi Hồng
          </TabsTrigger>
          <TabsTrigger value="phuquy" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark flex items-center gap-1">
            <Gem className="w-4 h-4" /> Phú Quý
          </TabsTrigger>
          <TabsTrigger value="huythanh" className="px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-gold-dark flex items-center gap-1">
            <Crown className="w-4 h-4" /> Huy Thanh
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

      <TabsContent value="btmc" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng BTMC 1L"
            buyPrice="11.545.000"
            sellPrice="11.845.000"
            buyChange={-0.16}
            sellChange={-0.18}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng BTMC 10L"
            buyPrice="11.547.000"
            sellPrice="11.837.000"
            buyChange={-0.15}
            sellChange={-0.16}
          />
          <GoldPriceCard
            title="Vàng BTMC 1KG"
            buyPrice="11.543.000"
            sellPrice="11.833.000"
            buyChange={-0.14}
            sellChange={-0.17}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="Bảo Tín Minh Châu 1L, 10L, 1KG" />
      </TabsContent>

      <TabsContent value="mihong" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng Mi Hồng 1L"
            buyPrice="11.535.000"
            sellPrice="11.835.000"
            buyChange={-0.14}
            sellChange={-0.17}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng Mi Hồng 10L"
            buyPrice="11.533.000"
            sellPrice="11.833.000"
            buyChange={-0.15}
            sellChange={-0.16}
          />
          <GoldPriceCard
            title="Vàng Mi Hồng 1KG"
            buyPrice="11.531.000"
            sellPrice="11.831.000"
            buyChange={-0.13}
            sellChange={-0.15}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="Mi Hồng 1L, 10L, 1KG" />
      </TabsContent>

      <TabsContent value="phuquy" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng Phú Quý 1L"
            buyPrice="11.543.000"
            sellPrice="11.843.000"
            buyChange={-0.15}
            sellChange={-0.16}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng Phú Quý 10L"
            buyPrice="11.541.000"
            sellPrice="11.841.000"
            buyChange={-0.14}
            sellChange={-0.15}
          />
          <GoldPriceCard
            title="Vàng Phú Quý 1KG"
            buyPrice="11.539.000"
            sellPrice="11.839.000"
            buyChange={-0.13}
            sellChange={-0.16}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="Phú Quý 1L, 10L, 1KG" />
      </TabsContent>

      <TabsContent value="huythanh" className="mt-0 outline-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GoldPriceCard
            title="Vàng Huy Thanh 1L"
            buyPrice="11.540.000"
            sellPrice="11.840.000"
            buyChange={-0.13}
            sellChange={-0.16}
            isSelected={true}
          />
          <GoldPriceCard
            title="Vàng Huy Thanh 10L"
            buyPrice="11.538.000"
            sellPrice="11.838.000"
            buyChange={-0.15}
            sellChange={-0.17}
          />
          <GoldPriceCard
            title="Vàng Huy Thanh 1KG"
            buyPrice="11.536.000"
            sellPrice="11.836.000"
            buyChange={-0.14}
            sellChange={-0.15}
          />
        </div>
        <PriceChart title="Biểu đồ giá Vàng" goldType="Huy Thanh 1L, 10L, 1KG" />
      </TabsContent>
    </Tabs>
  );
};

export default GoldTabs;
