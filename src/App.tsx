import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
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
import MicroCap from "./pages/MicroCap";
import NanoCap from "./pages/NanoCap";
import SmallCap from "./pages/SmallCap";

// Configure the query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full bg-background">
    <div className="text-center">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-foreground">Loading Tezaoro...</p>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen w-full bg-background">
          <div className="text-center p-6 max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">We're sorry for the inconvenience. Please try refreshing the page.</p>
            {this.state.error && (
              <div className="p-3 bg-muted/30 rounded-md text-sm text-left mb-6 overflow-auto max-h-40">
                <p className="font-mono">{this.state.error.toString()}</p>
              </div>
            )}
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Simplified App component without complex initialization checks
const App = () => {
  console.log("Starting App component render");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <Sonner />
            <Suspense fallback={<LoadingFallback />}>
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
                  <Route path="/micro-cap" element={<MicroCap />} />
                  <Route path="/nano-cap" element={<NanoCap />} />
                  <Route path="/small-cap" element={<SmallCap />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
