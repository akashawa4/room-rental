import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { auth, googleProvider, signInWithPopup, signInWithRedirect } from '../firebase.js';
import { Loader2 } from 'lucide-react';

const LoginScreen = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Try popup first with better error handling
      const result = await signInWithPopup(auth, googleProvider);
      // The AuthContext will handle the state change automatically
      // No need to call onLoginSuccess as the auth state will update
    } catch (error) {
      console.error('LoginScreen: Google sign-in error:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-blocked' || 
          error.code === 'auth/popup-closed-by-user' ||
          error.code === 'auth/cancelled-popup-request' ||
          error.message?.includes('Cross-Origin-Opener-Policy')) {
        // Fallback to redirect for COOP issues
        try {
          console.log('Falling back to redirect due to popup issues');
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('LoginScreen: Redirect sign-in error:', redirectError);
          setError('Authentication failed. Please try again or check your browser settings.');
        }
      } else if (error.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Google sign-in.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many sign-in attempts. Please try again later.');
      } else {
        setError(error.message || 'Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="/logo.svg" alt="Nivasi.space Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('title') || 'Nivasi.space'}
          </h1>
          <p className="text-gray-600">
            {t('tagline') || 'College Room Rental - Find your perfect room near campus'}
          </p>
        </div>

        {/* Google Sign In Button */}
        <div className="space-y-4">
          <Button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 py-3 text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('poweredBy') || 'Powered by Nivasi.space - Your trusted college room rental platform'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 