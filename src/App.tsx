import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Loader from '@/components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Platform = lazy(() => import('./pages/Platform'));
const Features = lazy(() => import('./pages/Features'));
const Algorithms = lazy(() => import('./pages/Algorithms'));
const Performance = lazy(() => import('./pages/Performance'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Documentation = lazy(() => import('./pages/Documentation'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Blog = lazy(() => import('./pages/Blog'));
const Support = lazy(() => import('./pages/Support'));
const Api = lazy(() => import('./pages/Api'));
const PlatformOverview = lazy(() => import('./pages/guides/PlatformOverview'));
const AccountSetup = lazy(() => import('./pages/guides/AccountSetup'));
const DeployingFirstAlgorithm = lazy(() => import('./pages/guides/DeployingFirstAlgorithm'));

function App() {
  return (
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

          {/* Add these routes */}
          <Route path="/platform/platform-overview" element={<PlatformOverview />} />
          <Route path="/platform/account-setup" element={<AccountSetup />} />
          <Route path="/platform/deploying-first-algorithm" element={<DeployingFirstAlgorithm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
