import React, { useState, useEffect } from 'react';
import { Download, Smartphone, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

const InstallPWAButton = () => {
  const { t } = useLanguage();
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [installationStep, setInstallationStep] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Check if app is already installed
  useEffect(() => {
    const checkIfInstalled = () => {
      const installed = localStorage.getItem('nivasiAppInstalled');
      if (installed === 'true') {
        setIsInstalled(true);
      }
    };
    
    checkIfInstalled();
  }, []);

  const handleInstallClick = () => {
    if (isInstalled) {
      // Try to open the app
      window.location.href = 'nivasi://open';
      return;
    }
    
    setShowInstallGuide(true);
    setInstallationStep(0);
    setError(null);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setInstallationStep(1);
      setDownloadProgress(0);

      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Wait for download simulation
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setDownloadProgress(100);
      setIsDownloading(false);
      setInstallationStep(2);

      // Trigger actual APK download
      const link = document.createElement('a');
      link.href = '/Nivasi Space App.apk';
      link.download = 'Nivasi Space App.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download event
      if (window.gtag) {
        window.gtag('event', 'download_started', {
          app_name: 'Nivasi Space App',
          file_type: 'apk'
        });
      }

    } catch (err) {
      setError('Download failed. Please try again.');
      setIsDownloading(false);
      setInstallationStep(0);
    }
  };

  const handleInstallationComplete = () => {
    setIsInstalled(true);
    localStorage.setItem('nivasiAppInstalled', 'true');
    setShowInstallGuide(false);
    
    // Track successful installation
    if (window.gtag) {
      window.gtag('event', 'installation_successful', {
        app_name: 'Nivasi Space App'
      });
    }
  };

  const getButtonText = () => {
    if (isInstalled) return t('openApp');
    if (isDownloading) return t('downloading');
    if (isInstalling) return t('installing');
    return t('installApp');
  };

  const getButtonIcon = () => {
    if (isInstalled) return <Smartphone className="w-4 h-4" />;
    if (isDownloading || isInstalling) return <Download className="w-4 h-4 animate-pulse" />;
    return <Download className="w-4 h-4" />;
  };

  const getInstallationSteps = () => [
    {
      title: t('step1Title'),
      description: t('step1Description'),
      icon: <Download className="w-5 h-5" />
    },
    {
      title: t('step2Title'),
      description: t('step2Description'),
      icon: <Smartphone className="w-5 h-5" />
    },
    {
      title: t('step3Title'),
      description: t('step3Description'),
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: t('step4Title'),
      description: t('step4Description'),
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <>
      <Button
        onClick={handleInstallClick}
        variant={isInstalled ? "default" : "outline"}
        size="sm"
        className={`gap-2 install-app-btn-attractive flex-1 ${isInstalled ? 'installed' : ''} relative overflow-hidden`}
        disabled={isDownloading || isInstalling}
      >
        {/* Animated background for install state */}
        {!isInstalled && !isDownloading && (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-20 animate-pulse" />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {getButtonIcon()}
          <span className="hidden xs:inline">{getButtonText()}</span>
          <span className="xs:hidden">{isInstalled ? t('openApp') : t('installApp')}</span>
          {isInstalled && <Badge variant="secondary" className="ml-1">✓</Badge>}
        </span>
        
        {/* Download progress indicator */}
        {isDownloading && (
          <div className="absolute bottom-0 left-0 h-1 bg-orange-200 transition-all duration-300" 
               style={{ width: `${downloadProgress}%` }} />
        )}
      </Button>

      <Dialog open={showInstallGuide} onOpenChange={setShowInstallGuide}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              {t('installAppTitle')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Progress Indicator */}
            <div className="flex justify-between items-center">
              {getInstallationSteps().map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center installation-step ${
                    index < installationStep 
                      ? 'completed' 
                      : index === installationStep 
                        ? 'active'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < installationStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Download Progress */}
            {isDownloading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('downloading')}</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="installation-progress h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Installation Guide */}
            <div className="space-y-3">
              <h4 className="font-medium">{t('installationGuide')}</h4>
              <div className="space-y-2 text-sm">
                <p>{t('installationBenefits')}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{t('benefit1')}</li>
                  <li>{t('benefit2')}</li>
                  <li>{t('benefit3')}</li>
                  <li>{t('benefit4')}</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              {installationStep === 0 && (
                <Button onClick={handleDownload} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  {t('downloadNow')}
                </Button>
              )}
              
              {installationStep >= 2 && (
                <Button 
                  onClick={handleInstallationComplete}
                  className="flex-1"
                  variant="default"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('installationComplete')}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => setShowInstallGuide(false)}
              >
                <X className="w-4 h-4 mr-2" />
                {t('close')}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-gray-500 text-center">
              {t('needHelp')} <a href="mailto:support@nivasi.com" className="text-blue-500 underline">{t('contactSupport')}</a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InstallPWAButton; 