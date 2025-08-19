// WebView detection and handling utilities

/**
 * Detect if the app is running in a WebView or in-app browser
 * @returns {Object} Object containing detection results
 */
export const detectWebView = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Common WebView identifiers
  const webViewPatterns = [
    'wv', // Android WebView
    'webview',
    'fb_iab', // Facebook in-app browser
    'fbav', // Facebook app
    'instagram',
    'line',
    'twitter',
    'linkedinapp',
    'whatsapp',
    'nivasi', // Custom app identifier
    'telegram',
    'snapchat',
    'tiktok'
  ];
  
  // React Native WebView
  const isReactNativeWebView = !!window.ReactNativeWebView;
  
  // iOS WKWebView
  const isWKWebView = !!window.webkit?.messageHandlers;
  
  // Check for WebView patterns in user agent
  const isWebViewByUA = webViewPatterns.some(pattern => userAgent.includes(pattern));
  
  // Additional checks for mobile browsers that might have issues
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isMobileSafari = /mobile.*safari/i.test(userAgent) && !/chrome/i.test(userAgent);
  
  return {
    isWebView: isWebViewByUA || isReactNativeWebView || isWKWebView,
    isReactNativeWebView,
    isWKWebView,
    isWebViewByUA,
    isMobile,
    isMobileSafari,
    userAgent: navigator.userAgent,
    shouldUseRedirect: isWebViewByUA || isReactNativeWebView || isWKWebView || isMobileSafari
  };
};

/**
 * Get authentication method recommendation based on environment
 * @returns {string} 'popup' or 'redirect'
 */
export const getRecommendedAuthMethod = () => {
  const detection = detectWebView();
  
  if (detection.shouldUseRedirect) {
    return 'redirect';
  }
  
  return 'popup';
};

/**
 * Check if the current environment supports popup authentication
 * @returns {boolean}
 */
export const supportsPopupAuth = () => {
  const detection = detectWebView();
  return !detection.shouldUseRedirect;
};

/**
 * Redirect to default browser for authentication
 * This opens the authentication URL in the user's default browser
 * @param {string} authUrl - The authentication URL to open
 */
export const redirectToDefaultBrowser = (authUrl) => {
  const detection = detectWebView();
  
  if (detection.isWebView) {
    // For WebView environments, open in default browser
    console.log('Redirecting to default browser for authentication');
    
    // Try to open in default browser
    try {
      // Method 1: Use window.open with _system target (works in some WebViews)
      window.open(authUrl, '_system', 'noopener,noreferrer');
    } catch (error) {
      console.log('Failed to open with _system, trying _blank');
      try {
        // Method 2: Use _blank target
        window.open(authUrl, '_blank', 'noopener,noreferrer');
      } catch (error2) {
        console.log('Failed to open with _blank, trying location.href');
        // Method 3: Direct redirect (fallback)
        window.location.href = authUrl;
      }
    }
  } else {
    // For regular browsers, just redirect normally
    window.location.href = authUrl;
  }
};

/**
 * Create a custom authentication URL for external browser
 * @param {string} returnUrl - URL to return to after authentication
 * @returns {string} The authentication URL
 */
export const createExternalAuthUrl = (returnUrl) => {
  const currentUrl = window.location.origin + window.location.pathname;
  const encodedReturnUrl = encodeURIComponent(returnUrl || currentUrl);
  
  // Create a custom authentication URL that will redirect back to the app
  return `${currentUrl}?auth=external&return=${encodedReturnUrl}`;
};

/**
 * Check if we're returning from external browser authentication
 * @returns {boolean}
 */
export const isReturningFromExternalAuth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('auth') === 'external';
};

/**
 * Get the return URL from external authentication
 * @returns {string|null}
 */
export const getExternalAuthReturnUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const returnUrl = urlParams.get('return');
  return returnUrl ? decodeURIComponent(returnUrl) : null;
};

/**
 * Get user-friendly message for authentication issues
 * @param {Error} error - The authentication error
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (error) => {
  const detection = detectWebView();
  
  if (error.message?.includes('disallowed_useragent') || 
      error.message?.includes('Use secure browsers')) {
    if (detection.isWebView) {
      return 'Google Sign-In requires a secure browser. Please open this link in your default browser or install the Nivasi Space app for the best experience.';
    }
    return 'Google Sign-In requires a secure browser. Please try using a different browser or install the Nivasi Space app.';
  }
  
  if (error.code === 'auth/popup-blocked') {
    return 'Popup was blocked. Please allow popups for this site or use the app version.';
  }
  
  if (error.code === 'auth/unauthorized-domain') {
    return 'This domain is not authorized for Google sign-in. Please contact support.';
  }
  
  if (error.code === 'auth/network-request-failed') {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.code === 'auth/too-many-requests') {
    return 'Too many sign-in attempts. Please try again later.';
  }
  
  return error.message || 'Failed to sign in with Google. Please try again.';
};

/**
 * Get solution suggestions for authentication issues
 * @param {Error} error - The authentication error
 * @returns {string[]} Array of solution suggestions
 */
export const getAuthSolutionSuggestions = (error) => {
  const detection = detectWebView();
  const suggestions = [];
  
  if (error.message?.includes('disallowed_useragent') || 
      error.message?.includes('Use secure browsers')) {
    suggestions.push('Open this link in your default browser');
    suggestions.push('Install the Nivasi Space app for the best experience');
    suggestions.push('Try using Chrome, Firefox, or Safari');
  }
  
  if (error.code === 'auth/popup-blocked') {
    suggestions.push('Allow popups for this website');
    suggestions.push('Use the app version instead');
    suggestions.push('Try using a different browser');
  }
  
  if (detection.isWebView && suggestions.length === 0) {
    suggestions.push('Open in your default browser for better compatibility');
    suggestions.push('Install the Nivasi Space app');
  }
  
  return suggestions;
};

export default {
  detectWebView,
  getRecommendedAuthMethod,
  supportsPopupAuth,
  redirectToDefaultBrowser,
  createExternalAuthUrl,
  isReturningFromExternalAuth,
  getExternalAuthReturnUrl,
  getAuthErrorMessage,
  getAuthSolutionSuggestions
};
