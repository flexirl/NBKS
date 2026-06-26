import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bolt, X, ArrowRight } from 'lucide-react';

interface AdmissionsWidgetProps {
  isVisible: boolean;
  onDismiss: () => void;
  onApplyClick: () => void;
}

export default function AdmissionsWidget({ isVisible, onDismiss, onApplyClick }: AdmissionsWidgetProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-xl shadow-2xl overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="bg-[#012d1d] text-white p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ffdbca] text-[#783200] rounded-xl flex items-center justify-center shrink-0 animate-pulse">
                <Bolt className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0">
                <h5 className="font-extrabold text-sm leading-tight text-white flex items-center gap-1">
                  Admissions Open - Batch 2026
                </h5>
                <p className="text-[10px] text-white/80 font-medium truncate">
                  Nursing, PG, Professional & Technical courses at MAA Hub
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onApplyClick}
                className="px-4 py-2 bg-[#ffdbca] hover:bg-[#ffb690] text-[#441900] rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 shadow"
              >
                Apply Now <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={onDismiss}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
