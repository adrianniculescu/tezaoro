
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a fallback error display function
const showErrorFallback = (message: string) => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #e2e8f0; background-color: #0f1729; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e2e8f0; margin-bottom: 16px;">Something went wrong</h2>
          <p style="margin-bottom: 24px;">${message}</p>
          <button 
            onclick="window.location.reload()" 
            style="background-color: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;"
          >
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  showErrorFallback("Failed to load the application. Please try refreshing the page.");
} else {
  const root = createRoot(rootElement);
  
  try {
    console.log("Rendering App component...");
    root.render(<App />);
    console.log("App component rendered successfully");
  } catch (error) {
    console.error("Failed to render the App component:", error);
    showErrorFallback("Failed to load the application. Please try refreshing the page.");
  }

  // Add window error handler for runtime errors
  window.addEventListener('error', (event) => {
    console.error("Runtime error caught:", event.error);
    showErrorFallback("An unexpected error occurred. Please try refreshing the page.");
  });
}
