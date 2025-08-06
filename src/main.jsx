import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { getClerkWebViewConfig, preventExternalRedirects, testWebViewFunctionality } from './utils/webview.js'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YnJhdmUtc2F3Zmx5LTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key - Please check your .env.local file");
}

// Prevent external redirects in WebView
preventExternalRedirects();

// Test WebView functionality (for debugging)
if (import.meta.env.DEV) {
  testWebViewFunctionality();
}

// Configure Clerk for WebView compatibility
const clerkConfig = getClerkWebViewConfig(PUBLISHABLE_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider {...clerkConfig}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ClerkProvider>
  </StrictMode>,
)
