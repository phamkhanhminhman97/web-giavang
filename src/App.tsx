import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CookieConsent from './components/CookieConsent';

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
          <Route path="/phan-tich/bai-viet/:id" element={<ArticleDetail />} />
          <Route path="/gioi-thieu" element={<GioiThieu />} />
          <Route path="/lien-he" element={<LienHe />} />
          <Route path="/dieu-khoan" element={<DieuKhoan />} />
          <Route path="/bao-mat" element={<BaoMat />} />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mien-tru" element={<Disclaimer />} />
          <Route path="/cong-cu-ai" element={<AITools />} />
          <Route path="/bai-viet" element={<GeneratedContentList />} />
          <Route path="/bai-viet/:slug" element={<GeneratedContentDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
