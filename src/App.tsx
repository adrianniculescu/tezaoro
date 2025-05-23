
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from '@/components/Loader';
import { TooltipProvider } from '@/components/ui/tooltip';

const Home = lazy(() => import('@/pages/Home'));
const Platform = lazy(() => import('@/pages/Platform'));
const Features = lazy(() => import('@/pages/Features'));
const Algorithms = lazy(() => import('@/pages/Algorithms'));
const Performance = lazy(() => import('@/pages/Performance'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Blog = lazy(() => import('@/pages/Blog'));
const Support = lazy(() => import('@/pages/Support'));
const Api = lazy(() => import('@/pages/Api'));
const PlatformOverview = lazy(() => import('@/pages/guides/PlatformOverview'));
const AccountSetup = lazy(() => import('@/pages/guides/AccountSetup'));
const DeployingFirstAlgorithm = lazy(() => import('@/pages/guides/DeployingFirstAlgorithm'));

// Import performance guide pages
const PerformanceMetricsExplained = lazy(() => import('@/pages/guides/PerformanceMetricsExplained'));
const PerformanceDashboardGuide = lazy(() => import('@/pages/guides/PerformanceDashboardGuide'));
const ReportingFeatures = lazy(() => import('@/pages/guides/ReportingFeatures'));
const OptimizationTechniques = lazy(() => import('@/pages/guides/OptimizationTechniques'));

// Import blog posts - existing
const ChooseAlgorithmicTradingPlatform = lazy(() => import('@/pages/blog/ChooseAlgorithmicTradingPlatform'));
const CryptoAlgorithmicTradingStrategies = lazy(() => import('@/pages/blog/CryptoAlgorithmicTradingStrategies'));
const RiskManagementAlgorithmicTrading = lazy(() => import('@/pages/blog/RiskManagementAlgorithmicTrading'));

// Import new blog posts
const BacktestingTradingAlgorithm = lazy(() => import('@/pages/blog/BacktestingTradingAlgorithm'));
const AlgorithmicVsManualTrading = lazy(() => import('@/pages/blog/AlgorithmicVsManualTrading'));
const BuildingFirstTradingBot = lazy(() => import('@/pages/blog/BuildingFirstTradingBot'));
const InstitutionalTradingAlgorithms = lazy(() => import('@/pages/blog/InstitutionalTradingAlgorithms'));
const AIAlgorithmicTrading = lazy(() => import('@/pages/blog/AIAlgorithmicTrading'));
const ReduceSlippageTrading = lazy(() => import('@/pages/blog/ReduceSlippageTrading'));
const TradingRegulationsCompliance = lazy(() => import('@/pages/blog/TradingRegulationsCompliance'));
const ScalpingVsSwingTrading = lazy(() => import('@/pages/blog/ScalpingVsSwingTrading'));
const FutureAlgorithmicTrading = lazy(() => import('@/pages/blog/FutureAlgorithmicTrading'));

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/features" element={<Features />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/support" element={<Support />} />
            <Route path="/api" element={<Api />} />

            {/* Platform guide routes */}
            <Route path="/platform/platform-overview" element={<PlatformOverview />} />
            <Route path="/platform/account-setup" element={<AccountSetup />} />
            <Route path="/platform/deploying-first-algorithm" element={<DeployingFirstAlgorithm />} />
            
            {/* Performance guide routes */}
            <Route path="/performance/metrics-explained" element={<PerformanceMetricsExplained />} />
            <Route path="/performance/dashboard-guide" element={<PerformanceDashboardGuide />} />
            <Route path="/performance/reporting-features" element={<ReportingFeatures />} />
            <Route path="/performance/optimization-techniques" element={<OptimizationTechniques />} />

            {/* Blog post routes */}
            <Route path="/guide/choose-algorithmic-trading-platform" element={<ChooseAlgorithmicTradingPlatform />} />
            <Route path="/guide/top-crypto-algorithmic-trading-strategies" element={<CryptoAlgorithmicTradingStrategies />} />
            <Route path="/guide/risk-management-algorithmic-trading" element={<RiskManagementAlgorithmicTrading />} />

            {/* New blog post routes */}
            <Route path="/guide/backtesting-trading-algorithm" element={<BacktestingTradingAlgorithm />} />
            <Route path="/guide/algorithmic-vs-manual-trading" element={<AlgorithmicVsManualTrading />} />
            <Route path="/guide/building-first-trading-bot" element={<BuildingFirstTradingBot />} />
            <Route path="/guide/institutional-trading-algorithms" element={<InstitutionalTradingAlgorithms />} />
            <Route path="/guide/ai-algorithmic-trading" element={<AIAlgorithmicTrading />} />
            <Route path="/guide/reduce-slippage-trading" element={<ReduceSlippageTrading />} />
            <Route path="/guide/trading-regulations-compliance" element={<TradingRegulationsCompliance />} />
            <Route path="/guide/scalping-vs-swing-trading" element={<ScalpingVsSwingTrading />} />
            <Route path="/guide/future-algorithmic-trading" element={<FutureAlgorithmicTrading />} />
          </Routes>
        </Suspense>
      </Router>
    </TooltipProvider>
  );
}

export default App;
