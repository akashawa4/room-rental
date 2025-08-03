import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Check, X, FileText, Shield, AlertTriangle, Download, Smartphone } from 'lucide-react';

const TermsAndConditionsModal = ({ isOpen, onAccept, onDecline, t }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [installationStep, setInstallationStep] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true);
    }
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
          file_type: 'apk',
          source: 'terms_modal'
        });
      }

    } catch (err) {
      setError('Download failed. Please try again.');
      setIsDownloading(false);
      setInstallationStep(0);
    }
  };

  const handleInstallationComplete = () => {
    setShowInstallGuide(false);
    setInstallationStep(0);
    
    // Track successful installation
    if (window.gtag) {
      window.gtag('event', 'installation_successful', {
        app_name: 'Nivasi Space App',
        source: 'terms_modal'
      });
    }
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
      icon: <Check className="w-5 h-5" />
    },
    {
      title: t('step4Title'),
      description: t('step4Description'),
      icon: <Check className="w-5 h-5" />
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                 {/* Header */}
         <div className="flex items-center p-6 border-b border-gray-200">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
               <Shield className="w-5 h-5 text-white" />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-gray-900">
                 Terms and Conditions
               </h2>
               <p className="text-sm text-gray-600">
                 Please read and accept our terms before proceeding
               </p>
             </div>
           </div>
         </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div 
            className="p-6 overflow-y-auto max-h-[60vh] space-y-6"
            onScroll={handleScroll}
          >
            {/* Important Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">
                    Important Notice
                  </h3>
                  <p className="text-sm text-orange-700">
                    This platform serves as a digital bridge between room owners and student tenants. 
                    We are not a real estate agent or property manager. All agreements, payments, and 
                    final decisions are made directly between room owners and students.
                  </p>
                </div>
              </div>
            </div>

                         {/* Terms Content */}
             <div className="space-y-6 text-sm text-gray-700">
               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">1. Platform Role and Limitations</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• This platform acts as a connector only between property owners and student tenants.</li>
                   <li>• We do not verify, own, rent, manage, or endorse any property or user personally.</li>
                   <li>• All transactions, agreements, and communications are strictly between room owner and student.</li>
                   <li>• We are not responsible for any loss, damage, harassment, or illegal activity occurring after user interaction.</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">2. User Eligibility and Behavior</h3>
                 <div className="space-y-3">
                   <div>
                     <h4 className="font-medium text-gray-800 mb-2">All users must:</h4>
                     <ul className="space-y-1 ml-4 text-sm">
                       <li>• Be 18 years or older</li>
                       <li>• Use their real, verifiable identity</li>
                       <li>• Avoid impersonating someone else or using fake documents</li>
                     </ul>
                   </div>
                   <div>
                     <h4 className="font-medium text-gray-800 mb-2">Users found guilty of:</h4>
                     <ul className="space-y-1 ml-4 text-sm">
                       <li>• Creating fake accounts, uploading fraudulent IDs</li>
                       <li>• Engaging in scams, verbal or physical abuse</li>
                       <li>• Attempting sexual harassment, discrimination, extortion, theft, or physical assault</li>
                       <li>Will be permanently banned and reported to law enforcement</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">3. Listings and Property Verification</h3>
                 <div className="space-y-3">
                   <div>
                     <h4 className="font-medium text-gray-800 mb-2">For Room Owners:</h4>
                     <ul className="space-y-1 ml-4 text-sm">
                       <li>• Must only list properties they legally own or manage</li>
                       <li>• Must clearly mention all rules, rent terms, deposit details, and property conditions</li>
                       <li>• Must not use misleading images or hide unsafe conditions</li>
                       <li>• Are liable for any illegal or undocumented rental</li>
                     </ul>
                   </div>
                   <div>
                     <h4 className="font-medium text-gray-800 mb-2">For Students:</h4>
                     <ul className="space-y-1 ml-4 text-sm">
                       <li>• Must personally verify the room physically before paying any amount</li>
                       <li>• Are advised to record communication and ask for written agreements or receipts</li>
                       <li>• Must not attempt unlawful occupancy, unauthorized guests, or misuse of property</li>
                     </ul>
                   </div>
                 </div>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">4. Payments, Deposits & Refunds</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• The platform does not process, hold, or verify any payments or deposits</li>
                   <li>• Avoid full payments before physical verification</li>
                   <li>• Use bank transfers with receipts</li>
                   <li>• Avoid paying cash without documentation</li>
                   <li>• We are not liable for fraudulent payments, advance deposit scams, or forced payment demands</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">5. Eviction, Harassment & Unsafe Living Conditions</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• If forced to vacate suddenly without valid reason, threatened, or harassed</li>
                   <li>• Or living in unhygienic, unsafe, or illegally modified premises</li>
                   <li>• Students should immediately inform local authorities</li>
                   <li>• Room owners found guilty of illegal eviction, threats, or overcharging will be reported and banned</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">6. Emergency Situations & Police Involvement</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• In case of theft, physical assault, harassment, or illegal activities</li>
                   <li>• Users must contact local police or legal authorities immediately</li>
                   <li>• The platform is not liable for loss of life, health issues, injuries, or criminal offenses</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">7. Privacy and Identity Verification</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• Users must upload genuine identification documents when required</li>
                   <li>• Sharing, selling, or misusing personal details is strictly prohibited</li>
                   <li>• May result in criminal prosecution</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">8. Disputes and Legal Accountability</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• All disputes must be resolved directly between student and room owner</li>
                   <li>• We do not mediate, intervene, or participate in court proceedings</li>
                   <li>• Users must accept legal responsibility for all their actions</li>
                   <li>• If your actions cause harm, loss, or legal trouble, you will bear full consequences</li>
                 </ul>
               </section>

               <section>
                 <h3 className="font-semibold text-gray-900 mb-3">9. Liability and Indemnity</h3>
                 <ul className="space-y-2 ml-4">
                   <li>• We are not liable for emotional distress, financial loss, injury, assault, or eviction</li>
                   <li>• Lost items, fraud, fake documentation, or unsafe neighborhoods</li>
                   <li>• Any natural disaster, fire, theft, or criminal activity on rental premises</li>
                   <li>• You agree to indemnify and hold harmless the platform from any liability</li>
                 </ul>
               </section>
             </div>

                         {/* Final Agreement */}
             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
               <h3 className="font-semibold text-gray-900 mb-2">Final Agreement</h3>
               <p className="text-sm text-gray-700">
                 By using the platform, you confirm that you understand and agree to these terms, accept full responsibility 
                 for your interactions on the platform, and will not hold the platform liable for any incident or dispute 
                 after a connection has been made.
               </p>
             </div>

             {/* Nivasi Space App Promotion */}
             <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                   </svg>
                 </div>
                 <div>
                   <h3 className="font-semibold text-orange-800">{t('installAppTitle')}</h3>
                   <p className="text-sm text-orange-700">{t('enhancedExperience')}</p>
                 </div>
               </div>
               <div className="space-y-2 text-sm text-orange-700">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span>{t('browseOffline')}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span>{t('instantNotifications')}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span>{t('fasterLoading')}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span>{t('nativeFeatures')}</span>
                 </div>
               </div>
               <div className="mt-4">
                 <button 
                   className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2"
                   onClick={() => setShowInstallGuide(true)}
                 >
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                   </svg>
                   {t('downloadNow')}
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className={`w-4 h-4 ${hasScrolledToBottom ? 'text-green-600' : 'text-gray-400'}`} />
              <span className={hasScrolledToBottom ? 'text-green-600' : 'text-gray-500'}>
                {hasScrolledToBottom ? 'You have read the terms' : 'Please scroll to read all terms'}
              </span>
            </div>
                         <div className="flex justify-center">
               <Button
                 onClick={onAccept}
                 disabled={!hasScrolledToBottom}
                 className={`${
                   hasScrolledToBottom 
                     ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                 }`}
               >
                 I Agree & Continue
               </Button>
             </div>
          </div>
        </div>
      </div>

      {/* Installation Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('installAppTitle')}</h3>
                  <p className="text-sm text-gray-600">Follow the steps to install the app</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Progress Indicator */}
                <div className="flex justify-between items-center">
                  {getInstallationSteps().map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < installationStep 
                          ? 'bg-green-500 text-white' 
                          : index === installationStep 
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {index < installationStep ? (
                          <Check className="w-4 h-4" />
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
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
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
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {t('downloadNow')}
                    </button>
                  )}
                  
                  {installationStep >= 2 && (
                    <button
                      onClick={handleInstallationComplete}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {t('installationComplete')}
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowInstallGuide(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    {t('close')}
                  </button>
                </div>

                {/* Help Text */}
                <div className="text-xs text-gray-500 text-center">
                  {t('needHelp')} <a href="mailto:support@nivasi.com" className="text-blue-500 underline">{t('contactSupport')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditionsModal; 