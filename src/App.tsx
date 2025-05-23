
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
          </Routes>
        </Suspense>
      </Router>
    </TooltipProvider>
  );
}

export default App;
