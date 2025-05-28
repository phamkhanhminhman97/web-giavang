import React from 'react';
import TradingViewWidget from '@/components/TradingViewWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const GoldChartPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gold-muted/5">
      <SEO 
        pageName="gold-chart" 
        additionalKeywords="biểu đồ giá vàng, giá vàng thế giới, biểu đồ XAUUSD, phân tích kỹ thuật vàng"
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-gold-light via-white to-gold-muted py-12 md:py-16 relative overflow-hidden">
          {/* Gold Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIi8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxMyIgcj0iMSIvPjwvZz48L3N2Zz4=')] bg-repeat"></div>
          
          {/* Golden Orbs */}
          <div className="absolute top-1/4 left-10 bg-gradient-rich h-24 w-24 rounded-full blur-xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-10 bg-gradient-rich h-32 w-32 rounded-full blur-xl opacity-30"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center font-playfair mb-4">
                <span className="bg-gradient-to-r from-gold-dark via-amber-600 to-gold bg-clip-text text-transparent">
                  Biểu Đồ Giá Vàng
                </span>
              </h1>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-dark to-transparent"></div>
            </div>
            <p className="text-slate-700 text-lg mb-6 max-w-3xl mx-auto text-center">
              Theo dõi biến động giá vàng thế giới trực tiếp với biểu đồ XAU/USD
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="relative">
            <div className="absolute -top-20 -right-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 bg-gradient-rich h-60 w-60 rounded-full blur-3xl opacity-20"></div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-md border border-gold-light/30 relative z-10">
              <div className="h-[600px]">
                <TradingViewWidget />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GoldChartPage;
