
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import Api from "./pages/Api";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Exchange from "./pages/Exchange";
import DexAggregator from "./pages/DexAggregator";
import FiatGateway from "./pages/FiatGateway";
import MarketMaking from "./pages/MarketMaking";
import TokenListing from "./pages/TokenListing";
import TokenomicsConsulting from "./pages/TokenomicsConsulting";
import Algorithms from "./pages/Algorithms";
import Performance from "./pages/Performance";
import Platform from "./pages/Platform";
import Resources from "./pages/Resources";
import Support from "./pages/Support";
import HowItWorks from "./pages/HowItWorks";
import SmallCap from "./pages/SmallCap";
import MicroCap from "./pages/MicroCap";
import NanoCap from "./pages/NanoCap";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TradingTools from "./pages/TradingTools";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Blog posts
import AIAlgorithmicTrading from "./pages/blog/AIAlgorithmicTrading";
import AlgorithmicVsManualTrading from "./pages/blog/AlgorithmicVsManualTrading";
import BacktestingTradingAlgorithm from "./pages/blog/BacktestingTradingAlgorithm";
import BuildingFirstTradingBot from "./pages/blog/BuildingFirstTradingBot";
import ChooseAlgorithmicTradingPlatform from "./pages/blog/ChooseAlgorithmicTradingPlatform";
import CryptoAlgorithmicTradingStrategies from "./pages/blog/CryptoAlgorithmicTradingStrategies";
import FutureAlgorithmicTrading from "./pages/blog/FutureAlgorithmicTrading";
import InstitutionalTradingAlgorithms from "./pages/blog/InstitutionalTradingAlgorithms";
import NanoCapCryptoLiquidity from "./pages/blog/NanoCapCryptoLiquidity";
import ReduceSlippageTrading from "./pages/blog/ReduceSlippageTrading";
import RiskManagementAlgorithmicTrading from "./pages/blog/RiskManagementAlgorithmicTrading";
import ScalpingVsSwingTrading from "./pages/blog/ScalpingVsSwingTrading";
import TradingRegulationsCompliance from "./pages/blog/TradingRegulationsCompliance";
import TezaoroInstantExchangeReview from "./pages/blog/TezaoroInstantExchangeReview";
import TezaoroFiatGatewayReview from "./pages/blog/TezaoroFiatGatewayReview";
import TezaoroDexAggregatorReview from "./pages/blog/TezaoroDexAggregatorReview";

// Guides
import PlatformOverview from "./pages/guides/PlatformOverview";
import AccountSetup from "./pages/guides/AccountSetup";
import DeployingFirstAlgorithm from "./pages/guides/DeployingFirstAlgorithm";
import PerformanceMetricsExplained from "./pages/guides/PerformanceMetricsExplained";
import OptimizationTechniques from "./pages/guides/OptimizationTechniques";
import ReportingFeatures from "./pages/guides/ReportingFeatures";
import PerformanceDashboardGuide from "./pages/guides/PerformanceDashboardGuide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthGuard>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/api" element={<Api />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/dex-aggregator" element={<DexAggregator />} />
            <Route path="/fiat-gateway" element={<FiatGateway />} />
            <Route path="/trading-tools" element={<TradingTools />} />
            <Route path="/market-making" element={<MarketMaking />} />
            <Route path="/token-listing" element={<TokenListing />} />
            <Route path="/tokenomics-consulting" element={<TokenomicsConsulting />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/support" element={<Support />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/small-cap" element={<SmallCap />} />
            <Route path="/micro-cap" element={<MicroCap />} />
            <Route path="/nano-cap" element={<NanoCap />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Blog routes */}
            <Route path="/blog/ai-algorithmic-trading" element={<AIAlgorithmicTrading />} />
            <Route path="/blog/algorithmic-vs-manual-trading" element={<AlgorithmicVsManualTrading />} />
            <Route path="/blog/backtesting-trading-algorithm" element={<BacktestingTradingAlgorithm />} />
            <Route path="/blog/building-first-trading-bot" element={<BuildingFirstTradingBot />} />
            <Route path="/blog/choose-algorithmic-trading-platform" element={<ChooseAlgorithmicTradingPlatform />} />
            <Route path="/blog/crypto-algorithmic-trading-strategies" element={<CryptoAlgorithmicTradingStrategies />} />
            <Route path="/blog/future-algorithmic-trading" element={<FutureAlgorithmicTrading />} />
            <Route path="/blog/institutional-trading-algorithms" element={<InstitutionalTradingAlgorithms />} />
            <Route path="/blog/nano-cap-crypto-liquidity" element={<NanoCapCryptoLiquidity />} />
            <Route path="/blog/reduce-slippage-trading" element={<ReduceSlippageTrading />} />
            <Route path="/blog/risk-management-algorithmic-trading" element={<RiskManagementAlgorithmicTrading />} />
            <Route path="/blog/scalping-vs-swing-trading" element={<ScalpingVsSwingTrading />} />
            <Route path="/blog/trading-regulations-compliance" element={<TradingRegulationsCompliance />} />
            <Route path="/blog/tezaoro-instant-exchange-review" element={<TezaoroInstantExchangeReview />} />
            <Route path="/blog/tezaoro-fiat-gateway-review" element={<TezaoroFiatGatewayReview />} />
            <Route path="/blog/tezaoro-dex-aggregator-review" element={<TezaoroDexAggregatorReview />} />
            
            {/* Guide routes */}
            <Route path="/guides/platform-overview" element={<PlatformOverview />} />
            <Route path="/guides/account-setup" element={<AccountSetup />} />
            <Route path="/guides/deploying-first-algorithm" element={<DeployingFirstAlgorithm />} />
            <Route path="/guides/performance-metrics-explained" element={<PerformanceMetricsExplained />} />
            <Route path="/guides/optimization-techniques" element={<OptimizationTechniques />} />
            <Route path="/guides/reporting-features" element={<ReportingFeatures />} />
            <Route path="/guides/performance-dashboard-guide" element={<PerformanceDashboardGuide />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
