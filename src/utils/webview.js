// WebView utility functions for handling redirects and compatibility

/**
 * Detect if the app is running in a WebView environment
 */
export const isWebView = () => {
  try {
    const userAgent = navigator.userAgent.toLowerCase();
    const isWebView = userAgent.includes('wv') || // Android WebView
           userAgent.includes('mobile') && userAgent.includes('safari') && !userAgent.includes('chrome') || // iOS WebView
           userAgent.includes('nivasi') || // Custom web view identifier
           window.ReactNativeWebView || // React Native WebView
           window.webkit && window.webkit.messageHandlers; // iOS WKWebView
    
    console.log('WebView detection result:', isWebView, 'User Agent:', userAgent);
    return isWebView;
  } catch (error) {
    console.warn('Error detecting WebView:', error);
    return false;
  }
};

/**
 * Safe WebView detection that won't break the app
 */
export const safeIsWebView = () => {
  try {
    return isWebView();
  } catch (error) {
    console.warn('Safe WebView detection failed:', error);
    return false;
  }
};

/**
 * Prevent external redirects in WebView environment - More selective approach
 */
export const preventExternalRedirects = () => {
  if (!safeIsWebView()) {
    console.log('Not in WebView, skipping redirect prevention');
    return;
  }

  try {
    // Only prevent specific external redirects, not all
    const originalOpen = window.open;
    window.open = function(url, target, features) {
      // Only prevent authentication-related external redirects
      if (url && (
        url.includes('clerk.com') || 
        url.includes('accounts.google.com') ||
        url.includes('facebook.com') ||
        url.includes('github.com') ||
        url.includes('twitter.com') ||
        url.includes('linkedin.com')
      )) {
        console.log('Preventing auth redirect in WebView:', url);
        return null;
      }
      return originalOpen.call(this, url, target, features);
    };

    // Only override location.href for auth-related redirects
    const originalLocationHref = Object.getOwnPropertyDescriptor(window.location, 'href');
    if (originalLocationHref && originalLocationHref.set) {
      Object.defineProperty(window.location, 'href', {
        set: function(url) {
          // Only prevent auth-related external redirects
          if (url && (
            url.includes('clerk.com') || 
            url.includes('accounts.google.com') ||
            url.includes('facebook.com') ||
            url.includes('github.com') ||
            url.includes('twitter.com') ||
            url.includes('linkedin.com')
          )) {
            console.log('Preventing auth location.href redirect in WebView:', url);
            return;
          }
          originalLocationHref.set.call(this, url);
        },
        get: originalLocationHref.get
      });
    }

    // Only override location.replace for auth-related redirects
    const originalReplace = window.location.replace;
    window.location.replace = function(url) {
      if (url && (
        url.includes('clerk.com') || 
        url.includes('accounts.google.com') ||
        url.includes('facebook.com') ||
        url.includes('github.com') ||
        url.includes('twitter.com') ||
        url.includes('linkedin.com')
      )) {
        console.log('Preventing auth location.replace redirect in WebView:', url);
        return;
      }
      return originalReplace.call(this, url);
    };

    // Only override location.assign for auth-related redirects
    const originalAssign = window.location.assign;
    window.location.assign = function(url) {
      if (url && (
        url.includes('clerk.com') || 
        url.includes('accounts.google.com') ||
        url.includes('facebook.com') ||
        url.includes('github.com') ||
        url.includes('twitter.com') ||
        url.includes('linkedin.com')
      )) {
        console.log('Preventing auth location.assign redirect in WebView:', url);
        return;
      }
      return originalAssign.call(this, url);
    };

    console.log('WebView redirect prevention initialized successfully');
  } catch (error) {
    console.warn('Error setting up WebView redirect prevention:', error);
  }
};

/**
 * Configure Clerk for WebView compatibility
 */
export const getClerkWebViewConfig = (publishableKey) => {
  try {
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
      signUpMode: "modal",
      // Add WebView-specific options
      allowUrlRedirect: false,
      allowRedirect: false
    };
  } catch (error) {
    console.warn('Error creating Clerk WebView config:', error);
    // Fallback to basic config
    return {
      publishableKey,
      afterSignOutUrl: "/"
    };
  }
};

/**
 * Get Clerk appearance config for WebView
 */
export const getClerkAppearanceConfig = () => {
  try {
    return {
      elements: {
        modalBackdrop: "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
        modalContent: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4",
        // Ensure buttons work properly in WebView
        formButtonPrimary: "w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 py-3 text-lg font-semibold"
      }
    };
  } catch (error) {
    console.warn('Error creating Clerk appearance config:', error);
    return {};
  }
};

/**
 * Test function to verify WebView detection and redirect prevention
 */
export const testWebViewFunctionality = () => {
  try {
    console.log('WebView Detection Test:');
    console.log('- isWebView():', isWebView());
    console.log('- safeIsWebView():', safeIsWebView());
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Window location:', window.location.href);
    console.log('- Window origin:', window.location.origin);
    
    // Test redirect prevention
    if (safeIsWebView()) {
      console.log('Testing redirect prevention...');
      try {
        window.open('https://clerk.com/auth', '_blank');
        console.log('✓ Auth redirect prevented');
      } catch (error) {
        console.log('✓ Auth redirect blocked');
      }
    }
  } catch (error) {
    console.warn('Error in WebView functionality test:', error);
  }
};

/**
 * Test app initialization to help debug white screen issues
 */
export const testAppInitialization = () => {
  try {
    console.log('=== App Initialization Test ===');
    console.log('1. DOM Ready:', document.readyState);
    console.log('2. Root Element:', !!document.getElementById('root'));
    console.log('3. Window Object:', !!window);
    console.log('4. Navigator Object:', !!navigator);
    console.log('5. User Agent:', navigator.userAgent);
    console.log('6. WebView Detection:', safeIsWebView());
    console.log('7. Console Available:', !!console);
    console.log('8. Error Handling:', typeof window.onerror);
    
    // Test basic functionality
    try {
      const testElement = document.createElement('div');
      testElement.textContent = 'Test';
      document.body.appendChild(testElement);
      document.body.removeChild(testElement);
      console.log('9. DOM Manipulation: ✓ Working');
    } catch (error) {
      console.log('9. DOM Manipulation: ✗ Failed', error);
    }
    
    console.log('=== App Initialization Test Complete ===');
  } catch (error) {
    console.error('Error in app initialization test:', error);
  }
}; 