
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Failed to load the application. Please try refreshing the page.</div>';
} else {
  const root = createRoot(rootElement);
  
  try {
    console.log("Rendering App component...");
    root.render(<App />);
    console.log("App component rendered successfully");
  } catch (error) {
    console.error("Failed to render the App component:", error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Failed to load the application. Please try refreshing the page.</div>';
  }
}
