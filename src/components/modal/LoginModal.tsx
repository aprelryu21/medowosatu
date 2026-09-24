import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SchoolEmblem } from '../common/SchoolEmblem';
import { 
  X, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Loader2, 
  ArrowRight, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoginModalOpen) {
      setErrorMessage(null);
      setShowForgotModal(false);
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    }
  }, [isLoginModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLoginModalOpen) {
        if (showForgotModal) {
          setShowForgotModal(false);
        } else {
          closeLoginModal();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, showForgotModal, closeLoginModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const result = await login(email, password);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleFillDemo = (type: 'guru' | 'kepala') => {
    if (type === 'guru') {
      setEmail('apriliyanto@medowo1.sch.id');
      setPassword('presensea2026');
    } else {
      setEmail('heriyanto@medowo1.sch.id');
      setPassword('kepsek2026');
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Dim Overlay with Blur & Fade Transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            onClick={closeLoginModal}
            aria-hidden="true"
          />

          {/* Modal Surface with Spring Scale/Fade Animation */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-[460px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl p-6 sm:p-8 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeLoginModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup jendela login"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Brand Icon & Heading */}
            <div className="flex flex-col items-center text-center mb-6">
              <SchoolEmblem className="w-12 h-12 mb-2.5 drop-shadow-md" />
              <h2 id="login-modal-title" className="text-xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                Portal Guru PRESENSEA
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                SD Negeri Medowo 1 · Kelola presensi, penilaian, dan administrasi kelas terintegrasi.
              </p>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium"
              >
                {errorMessage}
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email atau Akun Guru
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@medowo1.sch.id"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Kata Sandi
                  </label>
                  {/* Lupa Sandi Trigger Popup Button */}
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer transition-colors"
                  >
                    Lupa sandi?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-slate-700 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Ingat sesi ini</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke PRESENSEA</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mb-2.5">
                Akses Cepat Pengujian:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('guru')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-left truncate cursor-pointer"
                >
                  <span className="font-semibold block">Guru Kelas 3</span>
                  <span className="text-[10px] text-slate-400">Apriliyanto R., S.Pd</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('kepala')}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-[11px] text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-left truncate cursor-pointer"
                >
                  <span className="font-semibold block">Kepala Sekolah</span>
                  <span className="text-[10px] text-slate-400">Heriyanto, S.Pd</span>
                </button>
              </div>
            </div>

            {/* Nested Animated Pop-up: Tanyakan Admin Sekolah Jika Lupa Akses Masuk */}
            <AnimatePresence>
              {showForgotModal && (
                <div 
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-60 flex items-center justify-center p-4"
                >
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
                    onClick={() => setShowForgotModal(false)}
                  />

                  {/* Inner Modal */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 14 }}
                    transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                    className="relative z-10 w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-slate-900 dark:text-white"
                  >
                    <button
                      onClick={() => setShowForgotModal(false)}
                      className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                          Bantuan Akses Masuk
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Hubungi Administrator IT Sekolah
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 mb-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Demi keamanan privasi data siswa &amp; rekapitulasi nilai sekolah, reset kata sandi hanya dapat dilakukan langsung oleh <strong>Administrator IT SD Negeri Medowo 1</strong>.
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-5">
                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                        <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-slate-800 dark:text-slate-200">Email Administrator:</span>
                          <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">sdnmedowosatu@gmail.com</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
                        <Building className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block text-slate-800 dark:text-slate-200">Lokasi Bantuan:</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">Ruang Tata Usaha &amp; Operator Dapodik</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowForgotModal(false)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mengerti, Kembali ke Login</span>
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
