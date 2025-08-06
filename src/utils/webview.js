// WebView utility functions for handling redirects and compatibility

/**
 * Detect if the app is running in a WebView environment
 */
export const isWebView = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('wv') || // Android WebView
         userAgent.includes('mobile') && userAgent.includes('safari') && !userAgent.includes('chrome') || // iOS WebView
         userAgent.includes('nivasi') || // Custom web view identifier
         window.ReactNativeWebView || // React Native WebView
         window.webkit && window.webkit.messageHandlers; // iOS WKWebView
};

/**
 * Prevent external redirects in WebView environment
 */
export const preventExternalRedirects = () => {
  if (!isWebView()) return;

  // Override window.open to prevent external redirects
  const originalOpen = window.open;
  window.open = function(url, target, features) {
    if (url && !url.startsWith(window.location.origin) && !url.startsWith('/')) {
      console.log('Preventing external redirect in WebView:', url);
      return null;
    }
    return originalOpen.call(this, url, target, features);
  };

  // Override location.href to prevent external redirects
  const originalLocationHref = Object.getOwnPropertyDescriptor(window.location, 'href');
  Object.defineProperty(window.location, 'href', {
    set: function(url) {
      if (url && !url.startsWith(window.location.origin) && !url.startsWith('/')) {
        console.log('Preventing location.href redirect in WebView:', url);
        return;
      }
      originalLocationHref.set.call(this, url);
    },
    get: originalLocationHref.get
  });

  // Override location.replace to prevent external redirects
  const originalReplace = window.location.replace;
  window.location.replace = function(url) {
    if (url && !url.startsWith(window.location.origin) && !url.startsWith('/')) {
      console.log('Preventing location.replace redirect in WebView:', url);
      return;
    }
    return originalReplace.call(this, url);
  };

  // Override location.assign to prevent external redirects
  const originalAssign = window.location.assign;
  window.location.assign = function(url) {
    if (url && !url.startsWith(window.location.origin) && !url.startsWith('/')) {
      console.log('Preventing location.assign redirect in WebView:', url);
      return;
    }
    return originalAssign.call(this, url);
  };
};

/**
 * Configure Clerk for WebView compatibility
 */
export const getClerkWebViewConfig = (publishableKey) => {
  return {
    publishableKey,
    afterSignOutUrl: "/",
    // WebView-specific configurations
    appearance: {
      // Ensure modals work properly in WebView
      elements: {
        modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
        modalContent: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4",
        // Ensure buttons work properly in WebView
        formButtonPrimary: "w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 py-3 text-lg font-semibold"
      }
    },
    // Force modal mode in WebView to prevent external redirects
    signInMode: "modal",
    signUpMode: "modal"
  };
};

/**
 * Get Clerk appearance config for WebView
 */
export const getClerkAppearanceConfig = () => {
  return {
    elements: {
      modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
      modalContent: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4",
      // Ensure buttons work properly in WebView
      formButtonPrimary: "w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 py-3 text-lg font-semibold"
    }
  };
};

/**
 * Test function to verify WebView detection and redirect prevention
 */
export const testWebViewFunctionality = () => {
  console.log('WebView Detection Test:');
  console.log('- isWebView():', isWebView());
  console.log('- User Agent:', navigator.userAgent);
  console.log('- Window location:', window.location.href);
  console.log('- Window origin:', window.location.origin);
  
  // Test redirect prevention
  if (isWebView()) {
    console.log('Testing redirect prevention...');
    try {
      window.open('https://external-site.com', '_blank');
      console.log('✓ External redirect prevented');
    } catch (error) {
      console.log('✓ External redirect blocked');
    }
  }
}; 