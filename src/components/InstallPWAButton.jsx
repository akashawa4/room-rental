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

    // Check if PWA is supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setShowInstallButton(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // For browsers that support PWA but don't show beforeinstallprompt
      // Try to trigger installation through browser's native install button
      const installButton = document.querySelector('[data-pwa-install]') || 
                          document.querySelector('[aria-label*="install"]') ||
                          document.querySelector('[title*="install"]');
      
      if (installButton) {
        installButton.click();
        return;
      }
      
      // Fallback to manual instructions
      showInstallInstructions();
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
        // Show minimal success message
        setTimeout(() => {
          alert('✅ Nivase.com installed successfully!');
        }, 1000);
      } else {
        console.log('User dismissed the install prompt');
        // Minimal feedback
        setTimeout(() => {
          alert('💡 Tap "Install App" again when ready');
        }, 500);
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error during installation:', error);
      showInstallInstructions();
    }
  };

  const showInstallInstructions = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    let message = '';
    
    if (isIOS && isSafari) {
      message = '📱 Share → Add to Home Screen → Add';
    } else if (isAndroid && isChrome) {
      message = '📱 Menu (⋮) → Add to Home screen → Add';
    } else if (isChrome) {
      message = '💻 Click install icon in address bar';
    } else {
      message = '🌐 Use browser menu to add to home screen';
    }

    alert(`Quick Install: ${message}`);
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
      className="install-pwa-btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      size="sm"
    >
      <Download className="w-4 h-4" />
      <span>{t('installApp')}</span>
    </Button>
  );
};

export default InstallPWAButton; 