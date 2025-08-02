import { useState, useEffect } from 'react';
import { Download, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const InstallPWAButton = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Enhanced PWA support detection
    const checkPWASupport = () => {
      const hasServiceWorker = 'serviceWorker' in navigator;
      const hasPushManager = 'PushManager' in window;
      const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
      const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
      
      // Show install button if basic PWA features are supported
      if (hasServiceWorker && hasManifest && isHTTPS) {
        setShowInstallButton(true);
      }
    };

    checkPWASupport();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // Show loading state immediately
    const button = document.querySelector('.install-pwa-btn');
    if (button) {
      button.disabled = true;
      button.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Installing...';
    }

    if (!deferredPrompt) {
      // For browsers that support PWA but don't show beforeinstallprompt
      // Try to trigger installation through browser's native install button
      const installButton = document.querySelector('[data-pwa-install]') || 
                          document.querySelector('[aria-label*="install"]') ||
                          document.querySelector('[title*="install"]') ||
                          document.querySelector('[data-testid*="install"]');
      
      if (installButton) {
        installButton.click();
        // Reset button after a delay
        setTimeout(() => {
          if (button) {
            button.disabled = false;
            button.innerHTML = '<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span class="hidden sm:inline">Install App</span><span class="sm:hidden">Install</span>';
          }
        }, 2000);
        return;
      }
      
      // Fallback to manual instructions
      showInstallInstructions();
      // Reset button
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span class="hidden sm:inline">Install App</span><span class="sm:hidden">Install</span>';
      }
      return;
    }

    try {
      // Show the install prompt immediately
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
        setShowInstallButton(false);
        // Show success message
        setTimeout(() => {
          alert('✅ Nivasi.space installed successfully!\n\nYou can now access the app from your home screen.');
        }, 1000);
      } else {
        console.log('User dismissed the install prompt');
        // Show helpful message
        setTimeout(() => {
          alert('💡 Installation cancelled.\n\nTap "Install App" again when you\'re ready to install.');
        }, 500);
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      
      // Reset button
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span class="hidden sm:inline">Install App</span><span class="sm:hidden">Install</span>';
      }
    } catch (error) {
      console.error('Error during installation:', error);
      showInstallInstructions();
      // Reset button
      if (button) {
        button.disabled = false;
        button.innerHTML = '<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><span class="hidden sm:inline">Install App</span><span class="sm:hidden">Install</span>';
      }
    }
  };

  const showInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);

    let message = '';
    let title = '📱 Install Nivasi.space App';
    
    if (isIOS && isSafari) {
      message = '1. Tap the Share button (📤)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install';
    } else if (isAndroid && isChrome) {
      message = '1. Tap the Menu button (⋮)\n2. Tap "Add to Home screen"\n3. Tap "Add" to install';
    } else if (isChrome) {
      message = '1. Look for the install icon (📱) in the address bar\n2. Click it to install the app';
    } else if (isEdge) {
      message = '1. Click the Menu button (⋯)\n2. Click "Apps" → "Install this site as an app"';
    } else if (isFirefox) {
      message = '1. Click the Menu button (☰)\n2. Click "Install App"';
    } else {
      message = '1. Look for "Add to Home Screen" in your browser menu\n2. Or use the browser\'s install option';
    }

    alert(`${title}\n\n${message}\n\nAfter installation, you can access Nivasi.space directly from your home screen!`);
  };

  // Don't show button if app is already installed
  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <Check className="w-4 h-4" />
        <span className="text-sm font-medium">{t('appInstalled')}</span>
      </div>
    );
  }

  // Don't show button if PWA is not supported
  if (!showInstallButton) {
    return null;
  }

  return (
    <Button
      onClick={handleInstallClick}
      className="install-pwa-btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 animate-pulse px-4 py-2 text-sm sm:text-base"
      size="sm"
      disabled={false}
    >
      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">{t('installApp')}</span>
      <span className="sm:hidden">Install</span>
    </Button>
  );
};

export default InstallPWAButton; 