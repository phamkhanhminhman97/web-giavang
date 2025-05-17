
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldTabs from "@/components/GoldTabs";
import PriceInfo from "@/components/PriceInfo";
import MarketTrend from "@/components/MarketTrend";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Price Info Cards */}
          <div className="mb-12">
            <PriceInfo />
          </div>
          
          {/* Gold Price Tabs */}
          <div className="mb-12">
            <GoldTabs />
          </div>
          
          {/* Market Analysis */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 font-playfair text-slate-800 text-center">
              Phân Tích & Dự Báo Thị Trường
            </h2>
            <MarketTrend />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
