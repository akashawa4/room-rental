import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { getClerkWebViewConfig, preventExternalRedirects, testWebViewFunctionality, testAppInitialization } from './utils/webview.js'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_YnJhdmUtc2F3Zmx5LTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key - Please check your .env.local file");
}

// Global error handler to prevent white screen
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Don't let errors crash the app
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Don't let promise rejections crash the app
  event.preventDefault();
});

// Prevent external redirects in WebView with error handling
try {
  preventExternalRedirects();
} catch (error) {
  console.warn('Error initializing WebView redirect prevention:', error);
}

// Test app initialization and WebView functionality (for debugging)
if (import.meta.env.DEV) {
  try {
    testAppInitialization();
    testWebViewFunctionality();
  } catch (error) {
    console.warn('Error in app initialization/WebView tests:', error);
  }
}

// Configure Clerk for WebView compatibility
let clerkConfig;
try {
  clerkConfig = getClerkWebViewConfig(PUBLISHABLE_KEY);
} catch (error) {
  console.warn('Error getting Clerk WebView config, using fallback:', error);
  clerkConfig = {
    publishableKey: PUBLISHABLE_KEY,
    afterSignOutUrl: "/"
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider {...clerkConfig}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ClerkProvider>
  </StrictMode>,
)
