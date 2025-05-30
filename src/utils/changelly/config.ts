
// Changelly API configuration - API keys are now stored securely in Supabase
export const CHANGELLY_CONFIG = {
  // Public configuration only - no sensitive data
  baseUrl: 'https://api.changelly.com',
  sandboxUrl: 'https://api-sandbox.changelly.com',
  fiatApiUrl: 'https://fiat-api.changelly.com',
  dexApiUrl: 'https://api.changelly.com/dex',
  
  // API keys are now handled securely via Supabase edge functions
  // Set CHANGELLY_PUBLIC_KEY and CHANGELLY_PRIVATE_KEY in Supabase secrets
};
