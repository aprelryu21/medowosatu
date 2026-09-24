import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { SchoolEmblem } from '../common/SchoolEmblem';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowUpRight, 
  LogOut, 
  ShieldCheck, 
  School,
  GraduationCap,
  Newspaper,
  QrCode,
  Lightbulb,
  User,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingNavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { user, openLoginModal, logout } = useAuth();
  const { navigate, currentPath, isNewsList, isNewsDetail, isMediaList, isMediaDetail } = useRouter();
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Exact 5 menus specified by user:
  // Profil Sekolah, Dewan Guru, Berita & Warta, Media Interaktif, Presensea
  const navLinks = [
    { label: 'Profil Sekolah', href: '#profil', icon: School, isRoute: false },
    { label: 'Dewan Guru', href: '#dewan-guru', icon: GraduationCap, isRoute: false },
    { label: 'Berita & Warta', href: '/berita', icon: Newspaper, isRoute: true },
    { label: 'Media Interaktif', href: '/media', icon: Lightbulb, isRoute: true },
    { label: 'Presensea', href: '#presensea', icon: QrCode, isRoute: false },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navLinks[0]) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    // Hash link: e.g. #profil, #dewan-guru, #presensea
    const targetId = item.href.replace('#', '');
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Get display username when logged in
  const displayUsername = user ? (user.name || user.email.split('@')[0]) : '';

  return (
    <>
      {/* Floating Navbar Wrapper */}
      <header
        className={`fixed z-50 left-0 right-0 mx-auto transition-all duration-500 px-3 sm:px-6 pointer-events-none ${
          isScrolled ? 'top-2 sm:top-3.5 max-w-6xl' : 'top-3.5 sm:top-5 max-w-7xl'
        }`}
      >
        <div className="relative pointer-events-auto">
          {/* Subtle Floating Backlight Glow */}
          <div 
            className="absolute -inset-1 sm:-inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600/20 via-teal-400/25 to-blue-500/20 blur-lg sm:blur-xl opacity-80 dark:opacity-60 pointer-events-none transition-all duration-500" 
            aria-hidden="true" 
          />

          {/* Unified Floating Island Bar */}
          <div
            className={`relative w-full transition-all duration-500 rounded-2xl sm:rounded-3xl flex items-center justify-between shadow-xl ${
              isScrolled
                ? 'py-2 px-3.5 sm:px-5 bg-white/92 dark:bg-slate-900/92 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-slate-950/5 dark:shadow-black/30'
                : 'py-3 sm:py-3.5 px-4.5 sm:px-6 bg-white/88 dark:bg-slate-900/88 backdrop-blur-xl border border-slate-200/70 dark:border-slate-800/70 shadow-slate-950/10 dark:shadow-black/25'
            }`}
          >
            {/* Brand Logo & Name */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 cursor-pointer"
              aria-label="SD Negeri Medowo 1 Beranda"
            >
              <SchoolEmblem 
                className={`transition-all duration-500 ${
                  isScrolled ? 'w-8 h-8 sm:w-8.5 sm:h-8.5' : 'w-9 h-9 sm:w-10 sm:h-10'
                }`} 
              />
              <div className="flex flex-col transition-all duration-500">
                <span
                  className={`font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all ${
                    isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                  }`}
                >
                  SDN Medowo 1
                </span>
                <span
                  className={`text-blue-600 dark:text-blue-400 font-medium tracking-wide leading-none transition-all ${
                    isScrolled ? 'text-[9px] sm:text-[9.5px] mt-0.5' : 'text-[9.5px] sm:text-[10.5px] mt-0.5'
                  }`}
                >
                  Support by Presensea
                </span>
              </div>
            </a>

            {/* Center Navigation Links: Exactly the 5 requested menus */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-medium text-slate-600 dark:text-slate-300">
              {navLinks.map((item) => {
                const isPresensea = item.label === 'Presensea';
                const isCurrentActive = 
                  (item.href === '/berita' && (isNewsList || isNewsDetail)) ||
                  (item.href === '/media' && (isMediaList || isMediaDetail));
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                      isScrolled ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'
                    } ${
                      isCurrentActive
                        ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/50'
                        : isPresensea
                        ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                        : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${
                      isCurrentActive || isPresensea ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                    }`} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Toggle Mode & Login Portal / Username Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Toggle Mode Button */}
              <button
                onClick={toggleTheme}
                type="button"
                className={`rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-slate-200/50 dark:border-slate-700/50 ${
                  isScrolled ? 'p-1.5 sm:p-2' : 'p-2'
                }`}
                aria-label={theme === 'dark' ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
                title={theme === 'dark' ? 'Mode Gelap Aktif (Klik untuk Mode Terang)' : 'Mode Terang Aktif (Klik untuk Mode Gelap)'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* Login Portal / User Menu with Hidden Logout Button inside */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  {/* Button displaying username with chevron */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`rounded-xl font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                      isScrolled ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-xs sm:text-sm'
                    }`}
                    aria-expanded={isUserMenuOpen}
                    aria-label="Buka menu pengguna"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {displayUsername.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate max-w-[110px] sm:max-w-[140px] font-medium">
                      {displayUsername}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu hiding the Logout button inside */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 text-xs"
                      >
                        {/* User Header Info */}
                        <div className="p-2.5 border-b border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                              {user.name}
                            </span>
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">
                            {user.email}
                          </p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-semibold">
                            Pendidik Terverifikasi
                          </span>
                        </div>

                        {/* Presensea Quick Link */}
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate('/admin');
                            }}
                            className="w-full px-2.5 py-2 rounded-xl text-left text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span>Buka Panel Admin</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              const el = document.getElementById('presensea');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                            <span>Buku Jurnal Presensi</span>
                          </button>
                        </div>

                        {/* Hidden Logout Button inside user dropdown */}
                        <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout();
                            }}
                            className="w-full px-2.5 py-2 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Keluar dari Akun</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Login Portal Button */
                <button
                  onClick={openLoginModal}
                  className={`rounded-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-[0.98] cursor-pointer ${
                    isScrolled ? 'px-3 py-1.5 text-xs' : 'px-3.5 sm:px-4 py-2 text-xs sm:text-sm'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Login Portal</span>
                </button>
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                  isScrolled ? 'p-1.5' : 'p-2'
                }`}
                aria-label="Buka Menu Navigasi"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pointer-events-auto mt-2 lg:hidden w-full rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl p-4 transition-all"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isCurrentActive = 
                    (item.href === '/berita' && (isNewsList || isNewsDetail)) ||
                    (item.href === '/media' && (isMediaList || isMediaDetail));

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isCurrentActive
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{item.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </a>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {displayUsername}
                        </span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                          Administrator
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('/admin');
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 hover:bg-blue-100 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Buka Panel Admin</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-semibold bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 hover:bg-red-100 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Keluar dari Akun</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openLoginModal();
                      }}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/25"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Login Portal</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
