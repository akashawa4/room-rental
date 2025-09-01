import { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut, getRedirectResult } from '../firebase.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Detect iOS device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    let isMounted = true;
    let authStateUnsubscribe = null;
    let redirectCheckTimeout = null;

    // Handle redirect result when user returns from Google auth
    const handleRedirectResult = async () => {
      try {
        console.log('AuthContext: Checking for redirect result...');
        setRedirectLoading(true);
        setAuthError(null);
        
        // For iOS, add a small delay to ensure redirect is complete
        if (isIOS) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        const result = await getRedirectResult(auth);
        
        if (result && isMounted) {
          console.log('AuthContext: Redirect result received:', result.user);
          console.log('AuthContext: User email:', result.user.email);
          console.log('AuthContext: User display name:', result.user.displayName);
          
          // Set user immediately from redirect result
          setUser(result.user);
          setLoading(false);
          setRedirectLoading(false);
          return;
        } else if (isMounted) {
          console.log('AuthContext: No redirect result found');
        }
      } catch (error) {
        console.error('AuthContext: Redirect result error:', error);
        
        if (isMounted) {
          setAuthError(error);
          
          // Handle specific redirect errors
          if (error.code === 'auth/unauthorized-domain') {
            console.error('Domain not authorized for authentication');
          } else if (error.message?.includes('disallowed_useragent')) {
            console.error('User agent not allowed for authentication');
          } else if (error.code === 'auth/network-request-failed') {
            console.error('Network error during authentication');
          }
        }
      } finally {
        if (isMounted) {
          setRedirectLoading(false);
        }
      }
    };

    // Set up auth state listener
    const setupAuthStateListener = () => {
      console.log('AuthContext: Setting up auth state listener...');
      
      authStateUnsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('AuthContext: Auth state changed:', user ? 'User logged in' : 'User logged out');
        
        if (user) {
          console.log('AuthContext: User details:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        }
        
        if (isMounted) {
          setUser(user);
          setLoading(false);
          setRedirectLoading(false);
          setAuthError(null);
        }
      }, (error) => {
        console.error('AuthContext: Auth state change error:', error);
        
        if (isMounted) {
          setAuthError(error);
          setLoading(false);
          setRedirectLoading(false);
        }
      });
    };

    // Initialize authentication
    const initializeAuth = async () => {
      try {
        // First check for redirect result
        await handleRedirectResult();
        
        // Then set up auth state listener
        setupAuthStateListener();
        
        // For iOS, add additional redirect result checks
        if (isIOS) {
          // Set up periodic redirect result checks for iOS
          redirectCheckTimeout = setInterval(async () => {
            if (isMounted && !user && !redirectLoading) {
              console.log('AuthContext: iOS - Periodic redirect result check...');
              try {
                const result = await getRedirectResult(auth);
                if (result && isMounted) {
                  console.log('AuthContext: iOS - Found redirect result in periodic check:', result.user);
                  setUser(result.user);
                  setLoading(false);
                  setRedirectLoading(false);
                  clearInterval(redirectCheckTimeout);
                }
              } catch (error) {
                console.log('AuthContext: iOS - Periodic check error:', error);
              }
            }
          }, 2000); // Check every 2 seconds
        }
        
        // Add a timeout to prevent infinite loading
        setTimeout(() => {
          if (isMounted && loading) {
            console.warn('AuthContext: Loading timeout reached, forcing loading to false');
            setLoading(false);
            setRedirectLoading(false);
          }
        }, isIOS ? 15000 : 10000); // Longer timeout for iOS
        
      } catch (error) {
        console.error('AuthContext: Initialization error:', error);
        
        if (isMounted) {
          setAuthError(error);
          setLoading(false);
          setRedirectLoading(false);
        }
      }
    };

    initializeAuth();

    // Cleanup function
    return () => {
      isMounted = false;
      if (authStateUnsubscribe) {
        authStateUnsubscribe();
      }
      if (redirectCheckTimeout) {
        clearInterval(redirectCheckTimeout);
      }
    };
  }, [isIOS]);

  const logout = async () => {
    try {
      console.log('AuthContext: Logging out user...');
      await signOut(auth);
      console.log('AuthContext: User logged out successfully');
      
      // Clear any stored auth data
      setUser(null);
      setAuthError(null);
    } catch (error) {
      console.error('AuthContext: Logout error:', error);
      setAuthError(error);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    loading: loading || redirectLoading,
    logout,
    isAuthenticated: !!user,
    redirectLoading,
    authError,
    clearAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 