import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HeartHandshake } from 'lucide-react';

interface NavigationProps {
  onDonateClick: () => void;
}

export default function Navigation({ onDonateClick }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Impact Gallery', href: '#impact' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleEnquireScroll = () => {
    setIsMobileOpen(false);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Try to focus the first input inside the contact form if present
      setTimeout(() => {
        const input = document.getElementById('contact-name');
        if (input) input.focus();
      }, 800);
    }
  };

  return (
    <header className="bg-white/95 sticky top-0 z-40 w-full h-20 border-b border-slate-100 shadow-sm backdrop-blur-md">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 max-w-7xl mx-auto h-full">
        
        {/* Brand identity - Fixed for proper wrapping and text size on mobile view */}
        <div className="flex items-center gap-2 max-w-[65%] sm:max-w-none">
          <HeartHandshake className="w-8 h-8 text-[#012d1d] shrink-0" />
          <div className="leading-tight overflow-hidden">
            <span className="font-extrabold text-xs sm:text-sm md:text-base text-[#012d1d] block tracking-tight uppercase font-display-lg whitespace-nowrap overflow-hidden text-ellipsis">
              Nari Bal Kalyan Sansthan
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
              Govt. Registered NGO
            </span>
          </div>
        </div>

        {/* Desktop Anchor Navigation links - Cleaned up to home, about, education, gallery, contact */}
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-600 hover:text-[#012d1d] font-bold text-xs tracking-wider uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Navigation Action Buttons Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Enquire Now points directly to Contact Us */}
          <button
            onClick={handleEnquireScroll}
            className="hidden sm:inline-block px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Enquire Now
          </button>
          
          {/* Quick Donate Button */}
          <button
            onClick={onDonateClick}
            className="px-4 py-2 rounded-xl bg-[#012d1d] text-white hover:bg-[#1b4332] text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            Donate
          </button>

          {/* Hamburger Mobile Menu dropdown */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
            title="Toggle dropdown menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drop responsive drawer stack */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 absolute w-full left-0 p-5 shadow-xl space-y-4 overflow-hidden z-30"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-xs font-bold text-slate-600 hover:text-[#012d1d] py-1 block transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              {/* Enquire on mobile: scrolls to contact */}
              <button
                onClick={handleEnquireScroll}
                className="flex-1 py-2.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl font-bold text-xs"
              >
                Enquire Now
              </button>
              {/* Donate triggers the instant QR modal */}
              <button
                onClick={() => { setIsMobileOpen(false); onDonateClick(); }}
                className="flex-1 py-2.5 bg-[#012d1d] text-white rounded-xl font-bold text-xs"
              >
                Donate Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
