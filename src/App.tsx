
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Platform from "./pages/Platform";
import Features from "./pages/Features";
import Algorithms from "./pages/Algorithms";
import Performance from "./pages/Performance";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Documentation from "./pages/Documentation";
import Api from "./pages/Api";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import MarketMaking from "./pages/MarketMaking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/features" element={<Features />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/api" element={<Api />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/market-making" element={<MarketMaking />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
