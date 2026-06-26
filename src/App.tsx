import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  ArrowRight,
  Sparkles,
  Landmark,
  X,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Calendar,
  Check,
  HeartHandshake,
  MessageCircle,
  Clock,
  Award,
  Quote
} from 'lucide-react';

import { Sector } from './types';
import { INITIAL_SECTORS, GALLERY_IMAGES } from './data';
import Navigation from './components/Navigation';
import DonationModal from './components/DonationModal';
import EnquiryModal from './components/EnquiryModal';
import AdmissionsWidget from './components/AdmissionsWidget';

// Google Sheets Published CSV Endpoint URL
// This fetches notice data directly from the published Google Sheet.
const GOOGLE_SHEET_NOTICE_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKluERYYj-ndYmx5lYIhmPf3k-AoOHmamD_kHsisrNcg64GxkAM-v478ZGt2Ty0T21BC3nWml76RN-/pub?output=csv";

export default function App() {
  // Modals & overlay triggers
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isAdmissionsVisible, setIsAdmissionsVisible] = useState(true);
  
  // Lightbox index for full-screen gallery view
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // General contact section form states
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactInterest, setContactInterest] = useState('Women Empowerment (SHG support)');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // --- Notice Section (Maa Solution Hub) ---
  // Reads notice data directly from Google Sheets and updates automatically
  const [blinkingNotice, setBlinkingNotice] = useState<string>(
    "🎯 Loading latest notice from Google Sheets..."
  );

  useEffect(() => {
    async function fetchGoogleSheetNotice() {
      try {
        const response = await fetch(GOOGLE_SHEET_NOTICE_CSV_URL);
        if (response.ok) {
          const csvText = await response.text();
          const rows = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
          if (rows.length > 1) {
            // Take the latest row added (bottom row) or row 2
            let latest = rows[rows.length - 1];
            latest = latest.replace(/^"(.*)"$/, '$1').replace(/""/g, '"');
            if (latest.trim()) {
              setBlinkingNotice(latest.trim());
            }
          } else if (rows.length === 1) {
            let latest = rows[0].replace(/^"(.*)"$/, '$1').replace(/""/g, '"');
            if (latest.trim()) {
              setBlinkingNotice(latest.trim());
            }
          }
        }
      } catch (err) {
        setBlinkingNotice("📢 Welcome to MAA Solution Hub — Admissions Open for 2026 Batch!");
      }
    }

    fetchGoogleSheetNotice();
    // Auto-refresh from Google Sheets every 60 seconds
    const interval = setInterval(fetchGoogleSheetNotice, 60000);
    return () => clearInterval(interval);
  }, []);

  // Submit bottom general contact form — Google Sheets + mailto to naribalkalyansanthan@gmail.com
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      alert('Please enter your full Name and Mobile number.');
      return;
    }

    setContactSubmitting(true);

    // 1. Send data to Google Sheets (non-blocking, fire-and-forget)
    const ngoSheetUrl = import.meta.env.VITE_NGO_SHEET_URL;
    if (ngoSheetUrl) {
      try {
        fetch(ngoSheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contactName,
            phone: contactPhone,
            email: contactEmail || 'Not Provided',
            interest: contactInterest,
            message: contactMessage || 'No message provided.'
          })
        }).catch(() => {/* silently ignore sheet errors */});
      } catch {
        // Silently ignore — mailto still works as fallback
      }
    }

    // 2. Also open mailto as backup
    const targetEmail = "naribalkalyansanthan@gmail.com";
    const mailSubject = `NGO Enquiry from ${contactName} — ${contactInterest}`;
    const mailBody = `NARI BAL KALYAN SANSTHAN — ENQUIRY FORM\n` +
                     `=========================================\n\n` +
                     `Dear Coordinators,\n\n` +
                     `CONTACT DETAILS:\n` +
                     `-------------------------------------\n` +
                     `- Full Name: ${contactName}\n` +
                     `- WhatsApp / Mobile: ${contactPhone}\n` +
                     `- Email Address: ${contactEmail || 'Not Provided'}\n` +
                     `- Interest Area: ${contactInterest}\n\n` +
                     `MESSAGE:\n` +
                     `-------------------------------------\n` +
                     `${contactMessage || 'No message provided.'}\n\n` +
                     `Please respond at your earliest convenience.\n\n` +
                     `Warm regards,\n` +
                     `${contactName}\n`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.error("Mailto redirection issue:", err);
    }

    setContactSubmitting(false);
    setContactSuccess(true);
    
    // Clear forms
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactMessage('');

    setTimeout(() => setContactSuccess(false), 5000);
  };

  // Sector image rendering dictionary
  const renderSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Agriculture':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        );
      case 'ChildCare':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'School':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'HealthAndSafety':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'Groups':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  // Image Lightbox Helpers (Prev & Next sliders)
  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? GALLERY_IMAGES.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === GALLERY_IMAGES.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <div className="bg-[#fcfcff] text-[#0d1e18] min-h-screen font-sans overflow-x-hidden selection:bg-[#c1ecd4] selection:text-[#002114]">
      
      {/* Primary Header & Top Navigation */}
      <Navigation
        onDonateClick={() => setIsDonationOpen(true)}
      />

      {/* Main Hero Section with Professional Image & Smooth Animations */}
      <section id="home" className="relative min-h-[82vh] flex items-center overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-[#ebf5ef]/75 to-[#fcfcff]">
        
        {/* Animated abstract background graphics */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 -right-12 w-96 h-96 bg-[#c1ecd4]/20 rounded-full blur-3xl pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-10 -left-12 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 left-1/3 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none z-0"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero details text with staggered entrance animations */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Govt Registration ID Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 bg-white border border-emerald-100 px-4.5 py-2 rounded-full shadow-sm text-[11px] text-slate-700 mx-auto lg:mx-0"
            >
              <span className="font-extrabold text-[#012d1d] uppercase tracking-wider">Reg No: 452/1987-88</span>
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
              <span className="font-extrabold text-amber-800 uppercase tracking-wider">Darpan ID: BR/2024/0444548</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#012d1d] leading-none tracking-tight font-display-lg uppercase"
            >
              Nari Bal Kalyan<br />
              <span className="text-[#ff5d02]">Sansthan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-black text-sm sm:text-base text-emerald-800 tracking-widest uppercase italic block"
            >
              "Dedicated service for rural self-reliance & women empowerment"
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
            >
              Serving marginalized rural sections across the state of Bihar since 1987. Committed on-ground to constructing sustainable credit models for women SHGs, organizing critical healthcare camps, providing quality child education, and promoting organic farming practices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 pt-2 justify-center lg:justify-start"
            >
              {/* Enquire Now button scrolls to contact form */}
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                Enquire Now <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              
              {/* Donate button pops open QR payment details */}
              <button
                onClick={() => setIsDonationOpen(true)}
                className="px-6 py-3 border-2 border-[#012d1d] text-[#012d1d] hover:bg-[#012d1d] hover:text-white rounded-xl font-bold transition-all text-xs sm:text-sm cursor-pointer active:scale-95"
              >
                Donate Now (Direct Bank Coordinate)
              </button>
            </motion.div>
          </div>

          {/* Professional Hero Image with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 h-[340px] sm:h-[400px] relative w-full max-w-md mx-auto lg:max-w-none"
          >
            <motion.div
              animate={{ rotate: [3, 2, 3] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute inset-x-0 inset-y-0 bg-[#ffe8db] rounded-3xl shadow-md border border-amber-100"
            />
            
            {/* Main Floating Wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute inset-x-0 inset-y-0 overflow-hidden rounded-3xl -rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl border border-white bg-[#012d1d]"
            >
              <img
                src="/images/hero.png"
                alt="Women empowerment and community development by Nari Bal Kalyan Sansthan"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#01140e]/95 via-[#01140e]/50 to-transparent p-5 text-white">
                <span className="text-[9px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded uppercase block w-fit mb-1 tracking-wider">Women Self-Help Unit</span>
                <h4 className="font-extrabold text-sm sm:text-base">Rural Micro-Credit Workshops</h4>
                <p className="text-[10px] sm:text-xs text-white/80 line-clamp-2 mt-0.5 leading-snug">
                  Active field coordination assisting rural mothers to secure micro-capital and tailoring machine setups in Hajipur.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Core Impact Stat Banner Section with entrance animation */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="py-10 bg-[#012d1d] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-0.5">
            <span className="text-2xl md:text-3xl font-black text-amber-300 block font-mono">5000+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-100 block">Beneficiaries Saved</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl md:text-3xl font-black text-amber-300 block font-mono">100+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-100 block">Workshops Run</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl md:text-3xl font-black text-amber-300 block font-mono">50+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-100 block">Villages Covered</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl md:text-3xl font-black text-amber-300 block font-mono">1987</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-100 block">Year of Founding</span>
          </div>
        </div>
      </motion.section>


      {/* Community Sectors Section - Clean grid of exactly 5 sectors */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#012d1d] font-black tracking-widest uppercase text-xs">Our Focus Sectors</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight font-display-lg uppercase">
              Grassroots Developmental Areas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Over the past three decades, Nari Bal Kalyan Sansthan has deployed concrete sustainable programs centered on child welfare, woman micro-enterprises, health clinics, and agricultural development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {INITIAL_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="p-5.5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all duration-300 group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-2.5 bg-[#c1ecd4] text-[#002114] rounded-xl w-fit group-hover:scale-105 group-hover:bg-[#012d1d] group-hover:text-white transition-all shadow-sm">
                    {renderSectorIcon(sector.iconName)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm group-hover:text-[#012d1d] transition-colors uppercase tracking-tight">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2 font-medium">
                      {sector.description}
                    </p>
                    {sector.detailedDescription && (
                      <p className="text-[11px] text-slate-400 mt-2 leading-snug border-t border-slate-200/50 pt-2">
                        {sector.detailedDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Leadership Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#012d1d] text-center leading-none font-display-lg uppercase mb-12 tracking-tight">
            Voices of Leadership
          </h2>

          <div className="grid col-span-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Juhi Kumari - Chairperson's Message */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm items-center sm:items-start text-center sm:text-left transition-all duration-300 hover:shadow-md">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                <img
                  src="/images/chairperson.png"
                  alt="Juhi Kumari — Chairperson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2.5">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-extrabold text-[9px] uppercase tracking-wider rounded-full block w-fit mx-auto sm:mx-0">
                  Chairperson's Message
                </span>
                <h4 className="font-extrabold text-base text-slate-800 uppercase tracking-tight">Juhi Kumari</h4>
                <p className="text-xs text-slate-500 italic leading-relaxed font-mono">
                  "The true measure of any society is how it treats its most vulnerable members. Our thirty-year NGO journey is purely about bringing light, legal protection, and independent credit to the darkest village corners."
                </p>
              </div>
            </div>

            {/* Raj Vardhan - Secretary's Message */}
            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm items-center sm:items-start text-center sm:text-left transition-all duration-300 hover:shadow-md">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border-2 border-slate-100 shadow-inner">
                <img
                  src="/images/secretary.jpg"
                  alt="Raj Vardhan — Secretary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2.5">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 font-extrabold text-[9px] uppercase tracking-wider rounded-full block w-fit mx-auto sm:mx-0">
                  Secretary's Message
                </span>
                <h4 className="font-extrabold text-base text-slate-800 uppercase tracking-tight">Raj Vardhan</h4>
                <p className="text-xs text-slate-500 italic leading-relaxed font-mono">
                  "Education and technological skill empowerment are the two pillars upon which we build the future of our nation. Under MAA Solution Hub, every child of farmers we teach constitutes a glorious national success story."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAA Solution Hub Section — Simplified (No Course Grid) with Live Notice */}
      <section id="education" className="py-20 bg-[#012d1d] text-white">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Intro Header */}
            <div className="lg:w-1/2 space-y-4 text-left">
              <span className="text-amber-300 font-black text-xs uppercase tracking-widest block font-mono">Educational Wing</span>
              <h2 className="text-3xl md:text-3xl font-extrabold leading-none tracking-tight font-display-lg text-[#c1ecd4] uppercase">
                MAA SOLUTION HUB
              </h2>
              <p className="text-[10px] bg-white/10 border border-emerald-700 font-bold px-3 py-1 w-fit rounded-lg text-[#c1ecd4]">
                Reg. No: BR-37-0051035
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                MAA Solution Hub is our specialized training wing, facilitating formal guidance and certifications in vocational tailors, nursing aids, and accounting systems. Highly customized to prepare rural Bihar youth for the professional workforce.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  Write Admission Query <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Programs Summary Card (replacing the full course grid) */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <GraduationCap className="w-6 h-6 text-amber-300" />
                  <h3 className="font-extrabold text-[#c1ecd4] text-sm uppercase tracking-tight">Programs Offered</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Graduation & PG', dur: '3 Years' },
                    { name: 'Technical Courses', dur: '2 Years' },
                    { name: 'Nursing & Medical', dur: '2-3 Years' },
                    { name: 'Computer Science', dur: '1 Year' },
                    { name: 'Professional Ed.', dur: '1 Year' },
                    { name: 'Vocational Training', dur: '6 Months' }
                  ].map((prog) => (
                    <div key={prog.name} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <h4 className="text-[#c1ecd4] font-bold text-xs uppercase tracking-tight">{prog.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">Duration: {prog.dur}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/10">
                  For detailed information about any program, click "Write Admission Query" above and our team will respond with complete details.
                </p>
              </div>
            </div>

          </div>

          {/* Maa Solution Hub Team — Director & Admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* Director — S.K. Singh (unchanged) */}
            <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/30 shadow-lg ring-2 ring-amber-300/20 ring-offset-2 ring-offset-[#012d1d]">
                <img
                  src="/images/director-sk-singh.png"
                  alt="S.K. Singh — Director, Maa Solution Hub"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-amber-300 font-black uppercase tracking-widest block font-mono mb-1">Director — Maa Solution Hub</span>
                <h4 className="font-extrabold text-base sm:text-lg text-[#c1ecd4] uppercase tracking-tight">S.K. Singh</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 italic leading-relaxed mt-1.5">
                  "Empowerment of a nation begins in its villages — educate one woman, uplift an entire family."
                </p>
              </div>
            </div>

            {/* Admin — A. Vardhan */}
            <div className="flex flex-col items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/30 shadow-lg ring-2 ring-amber-300/20 ring-offset-2 ring-offset-[#012d1d]">
                <img
                  src="/images/admin-a-vardhan.png"
                  alt="A. Vardhan — Admin, Maa Solution Hub"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-amber-300 font-black uppercase tracking-widest block font-mono mb-1">Admin — Maa Solution Hub</span>
                <h4 className="font-extrabold text-base sm:text-lg text-[#c1ecd4] uppercase tracking-tight">A. Vardhan</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 italic leading-relaxed mt-1.5">
                  "Committed to streamlining operations and ensuring every student receives the guidance they deserve."
                </p>
              </div>
            </div>

          </div>

          {/* SINGLE BLINKING NOTICE BOX (Synced directly with Google Sheets) */}
          <div className="max-w-4xl mx-auto pt-6 border-t border-emerald-800">
            <div className="bg-[#5c0b11]/80 border-2 border-red-500/40 rounded-3xl p-5 shadow-inner">
              
              <div className="flex items-start gap-3">
                {/* Pulsing live indicator */}
                <span className="relative flex h-3.5 w-3.5 mt-1 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                </span>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[9px] text-[#ffb6b9] font-black uppercase tracking-widest block font-mono">
                    🔴 Live Announcement (Auto-Updated via Google Sheet)
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-red-100 uppercase tracking-wide leading-relaxed">
                    {blinkingNotice}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Impact Gallery Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#012d1d] font-black text-xs uppercase block tracking-widest mb-1 font-mono">Camera Reports From Ground Zero</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight uppercase font-display-lg">
              Our Impact Gallery
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Click on any visual log below to load description descriptors inside the modal lightbox.</p>
          </div>

          {/* Fully expanded grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {GALLERY_IMAGES.map((image, idx) => (
              <div
                key={image.id}
                onClick={() => setLightboxIndex(idx)}
                className="relative aspect-square sm:aspect-video md:aspect-[4/5] rounded-3xl overflow-hidden cursor-zoom-in border border-slate-100 group shadow-md bg-slate-50 hover:shadow-xl transition-all duration-300"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01140e]/95 via-[#01140e]/30 to-transparent p-4 flex flex-col justify-end text-white opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] bg-amber-500 text-white font-extrabold px-1.5 py-0.5 rounded w-fit mb-1 block tracking-wider uppercase">Active</span>
                  <span className="font-extrabold text-xs truncate block">{image.title}</span>
                  <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight mt-0.5">{image.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Image Lightbox Dialog */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 select-none">
            
            {/* Exit control bar */}
            <div className="flex justify-between items-center text-white shrink-0">
              <span className="font-extrabold text-xs tracking-widest opacity-80 uppercase">
                Impact Viewer — Photo {lightboxIndex + 1} of {GALLERY_IMAGES.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sliding display view */}
            <div className="grow flex items-center justify-between gap-4 max-w-5xl mx-auto w-full relative">
              <button
                onClick={handlePrevImage}
                className="p-3 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all shrink-0 active:scale-90"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="max-h-[60vh] w-full flex items-center justify-center p-2 relative">
                <img
                  referrerPolicy="no-referrer"
                  src={GALLERY_IMAGES[lightboxIndex].src}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  className="max-h-[60vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>

              <button
                onClick={handleNextImage}
                className="p-3 bg-white/5 hover:bg-white/15 text-white rounded-full transition-all shrink-0 active:scale-90"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lower description details */}
            <div className="text-center text-white space-y-2 shrink-0 pb-4 max-w-2xl mx-auto">
              <h4 className="font-extrabold text-base text-amber-300">{GALLERY_IMAGES[lightboxIndex].title}</h4>
              <p className="text-xs text-white/80 leading-relaxed max-w-xl mx-auto">
                {GALLERY_IMAGES[lightboxIndex].desc}
              </p>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* Contact & Enquiry Form Section — mailto to naribalkalyansanthan@gmail.com */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Coordinates */}
          <div className="lg:col-span-5 space-y-7 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#012d1d] font-display-lg uppercase leading-none">
                Connect With Us
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-sm">
                Have questions regarding direct admissions, outreach projects, or voluntary schemes? Join our coordinators on-ground at Hajipur block today.
              </p>
            </div>

            <div className="space-y-4.5">
              
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-[#c1ecd4] rounded-xl flex items-center justify-center text-[#012d1d] shrink-0 font-bold shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Head Office Registered</h5>
                  <p className="text-xs text-slate-500 max-w-xs mt-0.5">Kachhari Road, Behind Gyan Jyoti School P.O. & P.S. Hajipur, Vaishali District, Bihar - 844101</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">WhatsApp Support Helplines</h5>
                  <p className="text-xs text-slate-500 max-w-xs mt-0.5 font-mono">+91 99556 44104</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-11 h-11 bg-amber-50 text-amber-800 rounded-xl flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-slate-800">Official Corporate Email</h5>
                  <p className="text-xs text-slate-500 max-w-xs mt-0.5 select-all font-mono">naribalkalyansanthan@gmail.com</p>
                </div>
              </div>

            </div>

            {/* Static site roadmap marker */}
            <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-slate-200/50 shadow-sm bg-slate-300">
              <img
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgRmNIWC_G7tpS4zFdAzfdCxPTt5E52BlSxa9MBFfryGsQ74LcL2dpmwMwzP942kGoAYjZTX6rGolklbEnJWARdXFw_uDC6m3SYeQRgO0CWFK4TPwSLsJ3a6YOQdPQf1XT3VxRvWDgYyZPKfIj5XJTO5JD4qnE16PlnhymjXJGnSwOe7oMjp8fnifzzD_A4MCLq0wWwlfa4eqYZkZ14SLn2c7IUPZa6rq8rerQ16CWx81cAXF8IGpckE9zhMsbokbRLsg4VfjRKPw"
                alt="Static Location Map center"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <a
                  href="https://maps.google.com/?q=Ramashish+Chowk,+Hajipur,+Vaishali,+Bihar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-[#012d1d] hover:bg-[#c1ecd4] rounded-xl font-bold shadow-sm text-[10px] sm:text-xs transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-emerald-800" /> Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* General Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-extrabold text-base md:text-lg text-slate-800 border-b border-slate-100 pb-3 mb-5 uppercase tracking-tight flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-emerald-800" /> Write General Message
            </h3>

            {contactSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 py-16"
              >
                <div className="w-14 h-14 bg-emerald-100 text-[#012d1d] rounded-full flex items-center justify-center shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-black text-slate-900 text-base uppercase tracking-tight">Message Sent!</h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Your enquiry email has been drafted and sent to <strong>naribalkalyansanthan@gmail.com</strong>. Our coordinators will contact you shortly.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  className="px-6 py-2 bg-[#012d1d] text-white rounded-xl font-bold text-xs"
                >
                  New Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Anand Kumar"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase tracking-wide">WhatsApp / Mobile Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +91 99556 44104"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-500 uppercase tracking-wide">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@gmail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-500 uppercase tracking-wide">Interest Area / Sector</label>
                  <select
                    value={contactInterest}
                    onChange={(e) => setContactInterest(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none font-medium"
                  >
                    <option>Women Empowerment (SHG support)</option>
                    <option>Child Education & Welfare coaching</option>
                    <option>MAA Hub Tech & Professional Admissions</option>
                    <option>Weekly Health Camp Volunteerism</option>
                    <option>Agriculture & Organic micro-credits</option>
                    <option>General Donations Support</option>
                  </select>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-500 uppercase tracking-wide">Your Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can our coordinators help you today?"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#012d1d] focus:bg-white outline-none text-slate-700 font-medium text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full py-3.5 bg-[#012d1d] hover:bg-[#1b4332] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {contactSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4 text-amber-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-amber-300" /> Submit Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer System with Registries & Official emails */}
      <footer className="bg-[#012d1d] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#c1ecd4] text-base md:text-lg uppercase tracking-wider">Nari Bal Kalyan Sansthan</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Serving humanity on-ground since 1987. Registered NGO committed to rural self-reliance, organic crop coaching, and legal child welfare advocacy in Hajipur, Vaishali District, Bihar.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-amber-300 text-xs sm:text-sm uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li><a href="#home" className="hover:text-emerald-300 transition-colors">Home Page</a></li>
              <li><a href="#about" className="hover:text-emerald-300 transition-colors">Our core sectors</a></li>
              <li><a href="#education" className="hover:text-emerald-300 transition-colors">MAA Solution Hub</a></li>
              <li><a href="#impact" className="hover:text-emerald-300 transition-colors">Impact Report logs</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-amber-300 text-xs sm:text-sm uppercase tracking-wider">Compliance Registry</h5>
            <ul className="space-y-2 text-slate-300 text-xs leading-normal">
              <li><span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">Registration Number</span> <strong className="text-slate-100 text-xs">452/1987-88</strong></li>
              <li><span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">Government Darpan ID</span> <strong className="text-slate-100 text-xs">BR/2024/0444548</strong></li>
              <li><span className="text-slate-400 block font-bold text-[9px] uppercase tracking-wider">Direct Support email</span> <strong className="text-slate-100 text-xs select-all">naribalkalyansanthan@gmail.com</strong></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-amber-300 text-xs sm:text-sm uppercase tracking-wider">Support our Work</h5>
            <p className="text-xs text-slate-300 leading-normal font-medium">
              Your small financial contribution can translate into major digital libraries and hospital diagnostic sets in Bihar villages.
            </p>
            <button
              onClick={() => setIsDonationOpen(true)}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow cursor-pointer active:scale-95"
            >
              Direct bank Transfer
            </button>
          </div>

        </div>

        <div className="border-t border-white/5 py-6 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[10px] text-slate-400">
              © 2026 Nari Bal Kalyan Sansthan. All Rights Reserved. Govt Regd No. 452/1987-88.
            </span>
            <span className="text-[18px] text-slate-500 flex items-center gap-1.5">
              Developed by team{' '}
              <a
                href="https://www.flexirl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold tracking-wide"
              >
                Flexirl.com
              </a>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Admissions Notification widget */}
      <AdmissionsWidget
        isVisible={isAdmissionsVisible}
        onDismiss={() => setIsAdmissionsVisible(false)}
        onApplyClick={() => { setIsEnquiryOpen(true); }}
      />

      {/* WhatsApp Floating Sticky Access Button */}
      <a
        href="https://wa.me/919955644104?text=Hello%21+I+am+interested+in+collaborating+with+Nari+Bal+Kalyan+Sansthan+NGO."
        target="_blank"
        rel="noopener noreferrer"
        title="Send secure message on WhatsApp"
        className="fixed bottom-12 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-2xl flex items-center justify-center gap-2 group active:scale-95 transition-all duration-300"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-extrabold text-[11px] whitespace-nowrap uppercase tracking-wider">
          Chat Support
        </span>
      </a>

      {/* Main donation modal mapping bank transfer parameters */}
      <DonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      {/* Direct mailto admission enquiry modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

    </div>
  );
}
