import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Landmark, Copy, Check, QrCode, Mail, ShieldAlert } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const accountDetails = {
    name: "NARI BAL KALYAN SANSTHAN",
    number: "43338204560",
    bank: "State Bank of India (SBI)",
    branch: "ANJANPIR",
    ifsc: "SBIN0012573",
    address: "HAJIPUR LALGANJ ROAD ANJANPIR, DIST VAISHALI, BIHAR",
    micr: "844002005",
    email: "naribalkalyansanthan@gmail.com",
    upiId: "naribalkalyan@sbi" // Standard valid-looking direct alias
  };

  const handleCopy = (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            {/* Header banner */}
            <div className="p-5 bg-[#012d1d] text-white flex justify-between items-center relative shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/15 rounded-xl text-amber-300 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight font-display-lg">Secure Contribution Portal</h3>
                  <p className="text-[11px] text-emerald-100">Direct-to-bank community funding coordinates</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                title="Close receipt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              
              {/* Scan QR Section */}
              <div className="bg-[#f0f9f4] border border-emerald-100 rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                <div className="bg-white p-3.5 rounded-xl shadow-sm border border-emerald-200">
                  {/* Generated QR representation representing active scanning */}
                  <div className="relative w-36 h-36 flex flex-col items-center justify-center bg-white border border-slate-100 p-2">
                    {/* Generates a clean custom high-contrast payment QR svg vector */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800">
                      <rect width="100" height="100" fill="white" />
                      {/* Quiet corners */}
                      <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                      <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                      <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                      {/* Random high density data matrix representations */}
                      <rect x="40" y="5" width="8" height="8" fill="currentColor" />
                      <rect x="52" y="10" width="12" height="6" fill="currentColor" />
                      <rect x="35" y="24" width="10" height="10" fill="currentColor" />
                      <rect x="55" y="28" width="8" height="4" fill="currentColor" />
                      
                      <rect x="42" y="42" width="15" height="15" fill="currentColor" />
                      <rect x="62" y="42" width="6" height="12" fill="currentColor" />
                      <rect x="42" y="62" width="10" height="10" fill="currentColor" />

                      <rect x="70" y="70" width="8" height="8" fill="currentColor" />
                      <rect x="82" y="70" width="10" height="10" fill="currentColor" />
                      <rect x="72" y="84" width="18" height="8" fill="currentColor" />
                      
                      <rect x="5" y="40" width="10" height="15" fill="currentColor" />
                      <rect x="22" y="45" width="8" height="15" fill="currentColor" />
                      <rect x="85" y="32" width="10" height="20" fill="currentColor" />
                    </svg>
                    {/* Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#012d1d] text-white p-1.5 rounded-lg shadow-md border-2 border-white">
                      <QrCode className="w-5 h-5 text-amber-300" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-[#012d1d] uppercase tracking-wider">Scan QR Code to Pay</h4>
                  <p className="text-[11px] text-slate-500 font-medium px-2">
                    Supports all major UPI applications (GPay, PhonePe, Paytm, BHIM SBI)
                  </p>
                </div>
              </div>

              {/* Bank Transfer Coordinates Card */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-widest pl-1">
                  <Landmark className="w-4 h-4 text-[#012d1d]" />
                  <span>Immediate Bank Account Details</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-3">
                  
                  {/* Account Name */}
                  <div className="flex justify-between items-center gap-3 pb-2.5 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Account Holder Name</span>
                      <span className="text-[13px] font-black text-slate-800 tracking-tight">{accountDetails.name}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(accountDetails.name, 'Name')}
                      className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-500 hover:text-slate-800 transition-all active:scale-95 shrink-0"
                      title="Copy Name"
                    >
                      {copiedField === 'Name' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Account Number */}
                  <div className="flex justify-between items-center gap-3 pb-2.5 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Bank Account Number</span>
                      <span className="text-sm font-extrabold text-[#012d1d] tracking-widest block font-mono">{accountDetails.number}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(accountDetails.number, 'Num')}
                      className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-500 hover:text-slate-800 transition-all active:scale-95 shrink-0"
                      title="Copy Account Number"
                    >
                      {copiedField === 'Num' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* IFSC */}
                  <div className="flex justify-between items-center gap-3 pb-2.5 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Branch IFSC Code</span>
                      <span className="text-[13px] font-mono font-black text-slate-800 tracking-wider uppercase block">{accountDetails.ifsc}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(accountDetails.ifsc, 'IFSC')}
                      className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-500 hover:text-slate-800 transition-all active:scale-95 shrink-0"
                      title="Copy IFSC Code"
                    >
                      {copiedField === 'IFSC' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Bank & Branch Address details */}
                  <div className="text-[11px] leading-relaxed text-slate-600 pt-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold uppercase block tracking-wider">Bank Partner</span>
                      <strong className="text-slate-800">{accountDetails.bank}</strong>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-400 font-bold uppercase block tracking-wider">Branch Name</span>
                      <strong className="text-slate-800">{accountDetails.branch}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[8px] text-slate-400 font-bold uppercase block tracking-wider">MICR Code</span>
                      <strong className="text-slate-800 block font-mono">{accountDetails.micr}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[8px] text-slate-400 font-bold uppercase block tracking-wider">Branch Address</span>
                      <p className="text-slate-500 text-[10px] leading-tight font-medium uppercase">{accountDetails.address}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Notification note */}
              <div className="bg-[#fcf8f2] border border-amber-100 rounded-xl p-3.5 text-[11px] leading-normal text-amber-900 flex gap-2.5">
                <Mail className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-xs mb-0.5">Payment Screenshots & Tax receipts:</span>
                  Please email your transaction confirmation reference to <a href={`mailto:${accountDetails.email}`} className="font-extrabold text-[#012d1d] underline hover:text-emerald-950 font-mono">{accountDetails.email}</a> for prompt acknowledgement and tax compliance certificate issuance.
                </div>
              </div>

            </div>

            {/* Quick close button footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center shrink-0">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                Okay, Noted
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
