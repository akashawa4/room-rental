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

  useEffect(() => {
    // Handle redirect result when user returns from Google auth
    const handleRedirectResult = async () => {
      try {
        setRedirectLoading(true);
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('AuthContext: Redirect result received:', result.user);
          // The user will be set by the auth state listener below
        }
      } catch (error) {
        console.error('AuthContext: Redirect result error:', error);
        
        // Handle specific redirect errors
        if (error.code === 'auth/unauthorized-domain') {
          console.error('Domain not authorized for authentication');
        } else if (error.message?.includes('disallowed_useragent')) {
          console.error('User agent not allowed for authentication');
        }
      } finally {
        setRedirectLoading(false);
      }
    };

    // Check for redirect result first
    handleRedirectResult();

    // Then set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthContext: Auth state changed:', user ? 'User logged in' : 'User logged out');
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('AuthContext: Auth state change error:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('AuthContext: User logged out successfully');
    } catch (error) {
      console.error('AuthContext: Logout error:', error);
    }
  };

  const value = {
    user,
    loading: loading || redirectLoading,
    logout,
    isAuthenticated: !!user,
    redirectLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 