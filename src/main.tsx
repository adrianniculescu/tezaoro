
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a fallback error display function with improved styling
const showErrorFallback = (message: string) => {
  console.error(`Error encountered: ${message}`);
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #e2e8f0; background-color: #0f1729; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e2e8f0; margin-bottom: 16px; font-size: 24px;">Something went wrong</h2>
          <p style="margin-bottom: 24px; font-size: 16px;">${message}</p>
          <p style="margin-bottom: 24px; color: #94a3b8; font-size: 14px;">Technical details have been logged to the console.</p>
          <button 
            onclick="window.location.reload()" 
            style="background-color: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px;"
          >
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
};

// Check if required scripts are loaded
const isRequiredScriptLoaded = () => {
  return window.hasOwnProperty('gptEngineer') || 
         document.querySelector('script[src*="gptengineer.js"]') !== null;
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  showErrorFallback("Failed to load the application. The root element was not found.");
} else {
  // Add initialization status to window for debugging
  window.tezaoroInit = {
    startTime: new Date().toISOString(),
    status: 'starting'
  };
  
  console.log("Initializing application...");
  
  // Check if required scripts are loaded
  if (!isRequiredScriptLoaded()) {
    console.warn("Required scripts may not be loaded. Attempting to continue...");
  }
  
  // Create root with error handling
  try {
    const root = createRoot(rootElement);
    
    window.tezaoroInit.status = 'rendering';
    console.log("Rendering App component...");
    
    root.render(<App />);
    
    window.tezaoroInit.status = 'rendered';
    console.log("App component rendered successfully");
  } catch (error) {
    window.tezaoroInit.status = 'error';
    console.error("Failed to render the App component:", error);
    showErrorFallback("Failed to initialize the application. Please check your internet connection and try again.");
  }

  // Add window error handler for runtime errors
  window.addEventListener('error', (event) => {
    window.tezaoroInit.status = 'runtime-error';
    console.error("Runtime error caught:", event.error);
    showErrorFallback("An unexpected error occurred. Technical details have been logged.");
    // Prevent default browser error handling
    event.preventDefault();
  });

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    window.tezaoroInit.status = 'promise-error';
    console.error("Unhandled promise rejection:", event.reason);
    // Don't show error UI for promise rejections unless they're critical
    if (event.reason && event.reason.critical) {
      showErrorFallback("A critical error occurred. Please try refreshing the page.");
    }
  });
}

// Add TypeScript declaration for window object extension
declare global {
  interface Window {
    tezaoroInit?: {
      startTime: string;
      status: string;
    };
    gptEngineer?: any;
  }
}
