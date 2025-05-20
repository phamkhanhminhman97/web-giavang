
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldTabs from "@/components/GoldTabs";
import PriceInfo from "@/components/PriceInfo";
import MarketTrend from "@/components/MarketTrend";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO pageName="home" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Price Info Cards */}
          <div className="mb-12 relative">
            <div className="absolute -top-10 -right-10 bg-gradient-rich h-40 w-40 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 bg-gradient-rich h-40 w-40 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <PriceInfo />
            </div>
          </div>
          
          {/* Gold Price Tabs */}
          <div className="mb-12 bg-gradient-to-b from-transparent to-gold-muted/10 pt-4 pb-8 px-4 rounded-2xl">
            <h2 className="text-2xl font-bold mb-8 font-playfair text-slate-800 text-center">
              <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
                Giá Vàng Hôm Nay
              </span>
            </h2>
            <GoldTabs />
          </div>
          
          {/* Market Analysis */}
          <div className="mb-8 relative">
            <div className="absolute -bottom-10 right-10 bg-gradient-rich h-32 w-32 rounded-full blur-2xl opacity-20"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold mb-6 font-playfair text-center">
                <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
                  Phân Tích & Dự Báo Thị Trường
                </span>
              </h2>
              <MarketTrend />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
