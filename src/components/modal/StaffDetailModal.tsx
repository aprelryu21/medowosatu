import React, { useEffect } from 'react';
import { Staff } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Mail, 
  Phone, 
  BookOpen, 
  MessageSquareQuote
} from 'lucide-react';

interface StaffDetailModalProps {
  staff: Staff | null;
  onClose: () => void;
}

export const StaffDetailModal: React.FC<StaffDetailModalProps> = ({ staff, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (staff) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [staff, onClose]);

  return (
    <AnimatePresence>
      {staff && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="staff-modal-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Morphing Pop-up Container: Side-by-side with photo on the left so it is never cropped */}
          <motion.div
            layoutId={`staff-card-${staff.id}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl md:max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer shadow-sm"
              aria-label="Tutup jendela rincian pendidik"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Split Grid: Left (Full Uncropped Portrait Photo) & Right (Full Identity Details) */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch max-h-[88vh] overflow-y-auto md:overflow-hidden">
              
              {/* Left Column: Full Uncropped Portrait */}
              <div className="md:col-span-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 flex flex-col items-center justify-center relative min-h-[280px] md:min-h-[480px]">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-500/15 blur-2xl pointer-events-none" />

                {/* Photo Displayed Completely Without Cropping */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="w-full max-w-[240px] sm:max-w-[260px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/80">
                    <img
                      src={staff.photo_url}
                      alt={staff.name}
                      className="w-full h-auto max-h-[360px] object-contain object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Role Tag Below Photo */}
                  <span className="mt-4 inline-block px-3 py-1 rounded-xl bg-blue-600/90 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-white shadow-md text-center">
                    {staff.role}
                  </span>
                </div>
              </div>

              {/* Right Column: Complete Identity Details */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 overflow-y-auto max-h-[75vh]">
                
                {/* Top: Name & Role Title */}
                <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4 pr-8">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                    Profil Pendidik &amp; Tenaga Kependidikan
                  </span>
                  <h3 id="staff-modal-name" className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                    {staff.name}
                  </h3>
                </div>

                {/* Details Grid: Jabatan, NIP, Kualifikasi, Riwayat */}
                <div className="space-y-3.5 text-xs">
                  {/* Jabatan & NIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Jabatan
                      </span>
                      <div className="flex items-center gap-2 mt-1 font-medium text-slate-800 dark:text-slate-200">
                        <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{staff.role || '-'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Nomor Induk Pegawai (NIP)
                      </span>
                      <div className="flex items-center gap-2 mt-1 font-mono font-medium text-slate-800 dark:text-slate-200">
                        <Award className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span>{staff.nip || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Kualifikasi Akademik & Riwayat Pendidikan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Kualifikasi Akademik
                      </span>
                      <div className="flex items-center gap-2 mt-1 font-medium text-slate-800 dark:text-slate-200">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{staff.academic_degree || staff.education || '-'}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        Riwayat Pendidikan
                      </span>
                      <div className="flex items-center gap-2 mt-1 font-medium text-slate-800 dark:text-slate-200">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span className="truncate">{staff.education_history || staff.education || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dedikasi & Amanah (Pesan) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider mb-1.5 flex items-center gap-1.5">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-blue-500" />
                      <span>Dedikasi &amp; Amanah</span>
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{staff.dedication || staff.quote || 'Mendidik dengan ketulusan hati, mengabdi untuk kemajuan insan masa depan bangsa.'}"
                    </p>
                  </div>

                  {/* Hubungi: Email & Telepon */}
                  <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                    <span className="text-blue-900 dark:text-blue-300 block text-[10px] uppercase font-bold tracking-wider mb-2">
                      Kontak Komunikasi
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="truncate font-mono">{staff.email || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span className="font-mono">{staff.phone || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
