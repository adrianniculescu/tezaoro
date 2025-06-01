
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/ErrorBoundary';

// Import pages
import Home from '@/pages/Home';
import Exchange from '@/pages/Exchange';
import DexAggregator from '@/pages/DexAggregator';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Documentation from '@/pages/Documentation';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// Import all other pages
import Platform from '@/pages/Platform';
import Algorithms from '@/pages/Algorithms';
import Performance from '@/pages/Performance';
import HowItWorks from '@/pages/HowItWorks';
import Resources from '@/pages/Resources';
import Support from '@/pages/Support';
import Api from '@/pages/Api';
import MarketMaking from '@/pages/MarketMaking';
import TokenListing from '@/pages/TokenListing';
import FiatGateway from '@/pages/FiatGateway';
import TokenomicsConsulting from '@/pages/TokenomicsConsulting';
import MicroCap from '@/pages/MicroCap';
import SmallCap from '@/pages/SmallCap';
import NanoCap from '@/pages/NanoCap';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

// Import blog pages
import AIAlgorithmicTrading from '@/pages/blog/AIAlgorithmicTrading';
import AlgorithmicVsManualTrading from '@/pages/blog/AlgorithmicVsManualTrading';
import BacktestingTradingAlgorithm from '@/pages/blog/BacktestingTradingAlgorithm';
import BuildingFirstTradingBot from '@/pages/blog/BuildingFirstTradingBot';
import ChooseAlgorithmicTradingPlatform from '@/pages/blog/ChooseAlgorithmicTradingPlatform';
import CryptoAlgorithmicTradingStrategies from '@/pages/blog/CryptoAlgorithmicTradingStrategies';
import FutureAlgorithmicTrading from '@/pages/blog/FutureAlgorithmicTrading';
import InstitutionalTradingAlgorithms from '@/pages/blog/InstitutionalTradingAlgorithms';
import NanoCapCryptoLiquidity from '@/pages/blog/NanoCapCryptoLiquidity';
import ReduceSlippageTrading from '@/pages/blog/ReduceSlippageTrading';
import RiskManagementAlgorithmicTrading from '@/pages/blog/RiskManagementAlgorithmicTrading';
import ScalpingVsSwingTrading from '@/pages/blog/ScalpingVsSwingTrading';
import TradingRegulationsCompliance from '@/pages/blog/TradingRegulationsCompliance';

// Import guide pages
import PlatformOverview from '@/pages/guides/PlatformOverview';
import AccountSetup from '@/pages/guides/AccountSetup';
import DeployingFirstAlgorithm from '@/pages/guides/DeployingFirstAlgorithm';
import PerformanceMetricsExplained from '@/pages/guides/PerformanceMetricsExplained';
import OptimizationTechniques from '@/pages/guides/OptimizationTechniques';
import ReportingFeatures from '@/pages/guides/ReportingFeatures';
import PerformanceDashboardGuide from '@/pages/guides/PerformanceDashboardGuide';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function LocationLogger() {
  const location = useLocation();
  
  React.useEffect(() => {
    console.log('Route changed to:', location.pathname);
    console.log('Full location object:', location);
  }, [location]);
  
  return null;
}

function App() {
  console.log('App component rendering, current pathname:', window.location.pathname);
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LocationLogger />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/dex-aggregator" element={<DexAggregator />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/platform" element={<Platform />} />
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/support" element={<Support />} />
              <Route path="/api" element={<Api />} />
              <Route path="/market-making" element={<MarketMaking />} />
              <Route path="/token-listing" element={<TokenListing />} />
              <Route path="/fiat-gateway" element={<FiatGateway />} />
              <Route path="/tokenomics-consulting" element={<TokenomicsConsulting />} />
              <Route path="/microcap" element={<MicroCap />} />
              <Route path="/smallcap" element={<SmallCap />} />
              <Route path="/nanocap" element={<NanoCap />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              
              {/* Blog routes */}
              <Route path="/blog/ai-algorithmic-trading" element={<AIAlgorithmicTrading />} />
              <Route path="/blog/algorithmic-vs-manual-trading" element={<AlgorithmicVsManualTrading />} />
              <Route path="/blog/backtesting-trading-algorithm" element={<BacktestingTradingAlgorithm />} />
              <Route path="/blog/building-first-trading-bot" element={<BuildingFirstTradingBot />} />
              <Route path="/blog/choose-algorithmic-trading-platform" element={<ChooseAlgorithmicTradingPlatform />} />
              <Route path="/blog/crypto-algorithmic-trading-strategies" element={<CryptoAlgorithmicTradingStrategies />} />
              <Route path="/blog/future-algorithmic-trading" element={<FutureAlgorithmicTrading />} />
              <Route path="/blog/institutional-trading-algorithms" element={<InstitutionalTradingAlgorithms />} />
              <Route path="/blog/nanocap-crypto-liquidity" element={<NanoCapCryptoLiquidity />} />
              <Route path="/blog/reduce-slippage-trading" element={<ReduceSlippageTrading />} />
              <Route path="/blog/risk-management-algorithmic-trading" element={<RiskManagementAlgorithmicTrading />} />
              <Route path="/blog/scalping-vs-swing-trading" element={<ScalpingVsSwingTrading />} />
              <Route path="/blog/trading-regulations-compliance" element={<TradingRegulationsCompliance />} />
              
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
          </div>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
