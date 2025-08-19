import { useEffect, useState } from 'react';
import { auth, googleProvider, signInWithRedirect, getRedirectResult } from '../firebase.js';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const ExternalAuthHandler = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleExternalAuth = async () => {
      try {
        // Get the redirect result from Firebase
        const result = await getRedirectResult(auth);
        
        if (result) {
          // Authentication successful
          setStatus('success');
          setMessage('Authentication successful! Redirecting back to app...');
          
          // Get the return URL from query parameters
          const urlParams = new URLSearchParams(window.location.search);
          const returnUrl = urlParams.get('redirect') || '/';
          
          // Redirect back to the app
          setTimeout(() => {
            window.location.href = returnUrl;
          }, 2000);
        } else {
          // No redirect result, start the authentication process
          setMessage('Starting Google authentication...');
          
          // Start the redirect authentication
          await signInWithRedirect(auth, googleProvider);
        }
      } catch (error) {
        console.error('External auth error:', error);
        setStatus('error');
        setMessage('Authentication failed. Please try again.');
        
        // Get the return URL for error case
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('redirect') || '/';
        
        // Redirect back to app after error
        setTimeout(() => {
          window.location.href = returnUrl;
        }, 3000);
      }
    };

    handleExternalAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <img src="/logo.svg" alt="Nivasi.space Logo" className="w-10 h-10 object-contain" />
        </div>
        
        {/* Status Icon */}
        <div className="mb-4">
          {status === 'loading' && (
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto" />
          )}
          {status === 'success' && (
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          )}
          {status === 'error' && (
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          )}
        </div>
        
        {/* Message */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {status === 'loading' && 'Authenticating...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Authentication Failed'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {/* Progress Bar for Loading */}
        {status === 'loading' && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        )}
        
        {/* Return Link */}
        <div className="text-sm text-gray-500">
          <p>You'll be redirected back to the app automatically.</p>
          <p className="mt-2">
            If you're not redirected,{' '}
            <button
              onClick={() => {
                const urlParams = new URLSearchParams(window.location.search);
                const returnUrl = urlParams.get('redirect') || '/';
                window.location.href = returnUrl;
              }}
              className="text-orange-600 hover:text-orange-700 underline"
            >
              click here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExternalAuthHandler;
