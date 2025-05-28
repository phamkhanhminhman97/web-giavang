import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhanTich from "./pages/PhanTich";
import ArticleDetail from "./pages/ArticleDetail";
import GioiThieu from "./pages/GioiThieu";
import LienHe from "./pages/LienHe";
import DieuKhoan from "./pages/DieuKhoan";
import BaoMat from "./pages/BaoMat";
import Help from "./pages/Help";
import Faq from "./pages/Faq";
import Disclaimer from "./pages/Disclaimer";
import AITools from "./pages/AITools";
import GeneratedContentList from "./pages/GeneratedContentList";
import GeneratedContentDetail from "./pages/GeneratedContentDetail";
import Search from "./pages/Search";
import CookieConsent from './components/CookieConsent';
import GoldChartPage from "./pages/gold-chart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/phan-tich" element={<PhanTich />} />
          <Route path="/gold-chart" element={<GoldChartPage />} />
          <Route path="/phan-tich/bai-viet/:id" element={<ArticleDetail />} />
          <Route path="/about" element={<GioiThieu />} />
          <Route path="/contact" element={<LienHe />} />
          <Route path="/terms" element={<DieuKhoan />} />
          <Route path="/privacy-policy" element={<BaoMat />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mien-tru" element={<Disclaimer />} />
          {/* <Route path="/cong-cu-ai" element={<AITools />} /> */}
          <Route path="/bai-viet" element={<GeneratedContentList />} />
          <Route path="/bai-viet/:slug" element={<GeneratedContentDetail />} />
          
          {/* Vietnamese URL redirects */}
          <Route path="/gioi-thieu" element={<Navigate to="/about" replace />} />
          <Route path="/lien-he" element={<Navigate to="/contact" replace />} />
          <Route path="/dieu-khoan" element={<Navigate to="/terms" replace />} />
          <Route path="/bao-mat" element={<Navigate to="/privacy-policy" replace />} />
          {/* Search is now handled on the home page with ?q= parameter */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
