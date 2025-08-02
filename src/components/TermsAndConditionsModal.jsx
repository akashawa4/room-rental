import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Check, X, FileText, Shield, AlertTriangle } from 'lucide-react';
import InstallPWAButton from './InstallPWAButton.jsx';

const TermsAndConditionsModal = ({ isOpen, onAccept, onDecline, t }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true);
    }
  };

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
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col gap-4">
            {/* Install App Section */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700">
                <span className="text-lg">📱</span>
                <span className="font-semibold text-sm">Install Nivasi.space App</span>
              </div>
              <p className="text-xs text-purple-600 text-center">
                Get the best experience with our mobile app - Quick access, offline support, and push notifications
              </p>
              <div className="w-full flex justify-center">
                <InstallPWAButton />
              </div>
            </div>
            
            {/* Terms Agreement Section */}
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
      </div>
    </div>
  );
};

export default TermsAndConditionsModal; 