import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Mail, NotebookPen, GraduationCap } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim()) {
      alert('Please fill out your Full Name and Mobile Number.');
      return;
    }

    setSubmitting(true);

    // 1. Send data to Google Sheets (non-blocking, fire-and-forget)
    const maaHubSheetUrl = import.meta.env.VITE_MAA_HUB_SHEET_URL;
    if (maaHubSheetUrl) {
      try {
        fetch(maaHubSheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            phone: mobile,
            email: email || 'Not Provided',
            message: message || 'Not Provided'
          })
        }).catch(() => {/* silently ignore sheet errors */});
      } catch {
        // Silently ignore — mailto still works as fallback
      }
    }

    // 2. Also open mailto as backup
    const targetEmail = "rajvardhanhjp@gmail.com";
    const mailSubject = `MAA Solution Hub - Admission Enquiry from ${fullName}`;
    const mailBody = `MAA SOLUTION HUB — ADMISSION ENQUIRY\n` +
                     `=====================================\n\n` +
                     `Dear Administration,\n\n` +
                     `I would like to enquire about admission.\n\n` +
                     `CONTACT DETAILS:\n` +
                     `-------------------------------------\n` +
                     `- Full Name: ${fullName}\n` +
                     `- WhatsApp / Mobile: ${mobile}\n` +
                     `- Email Address: ${email || 'Not Provided'}\n` +
                     `- Message: ${message || 'Not Provided'}\n\n` +
                     `Please contact me regarding admission details.\n\n` +
                     `Warm regards,\n` +
                     `${fullName}\n`;

    // Execute instant mail client redirection
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error("Encountered redirection issue:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition has finished
    setTimeout(() => {
      setFullName('');
      setMobile('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 bg-[#012d1d] text-white flex justify-between items-center relative shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/15 rounded-xl text-amber-300 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg uppercase tracking-tight font-display-lg">Admission Enquiry</h3>
                  <p className="text-[11px] text-emerald-100">MAA Solution Hub — Nari Bal Kalyan Sansthan</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-[#012d1d] font-bold text-[9px] uppercase rounded-full">
                        Admissions Intake — 2026/27
                      </span>
                      <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                        Fill out the form below to enquire about admission at MAA Solution Hub. Our team will contact you shortly.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Full Name *</label>
                        <input
                          type="text"
                          required
                          id="admission-name"
                          placeholder="e.g. Ramesh Kumar"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 99556 44104"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Email Address (Optional)</label>
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium text-xs text-slate-800"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Message</label>
                        <textarea
                          rows={3}
                          placeholder="Write your query about admission here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium text-xs text-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin w-3.5 h-3.5 text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Mail className="w-3.5 h-3.5 text-amber-300" /> Submit Enquiry
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-[#012d1d] rounded-full flex items-center justify-center mb-1">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-extrabold text-xl text-slate-900 font-display-lg uppercase tracking-tight">Enquiry Submitted!</h3>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Your admission enquiry has been recorded and sent to <strong>rajvardhanhjp@gmail.com</strong>. Our team will get back to you shortly.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      If your email client didn't open automatically, please email us manually at the address above.
                    </p>
                    <div className="flex gap-2 pt-2 text-xs">
                      <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 bg-[#012d1d] text-white hover:bg-[#1b4332] font-semibold rounded-xl"
                      >
                        Retry Email
                      </button>
                      <button
                        onClick={handleClose}
                        className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 bg-white rounded-xl"
                      >
                        Done & Exit
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
