import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../context/RouterContext';
import { SchoolEmblem } from '../../components/common/SchoolEmblem';
import { 
  LayoutDashboard, 
  Layers, 
  Globe, 
  Settings, 
  Sparkles, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  User,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export type AdminMenuKey = 'beranda' | 'menu' | 'portal' | 'setelan' | 'presensea';

interface MenuItem {
  key: AdminMenuKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { key: 'beranda', label: 'Beranda', icon: LayoutDashboard },
  { key: 'menu', label: 'Menu', icon: Layers },
  { key: 'portal', label: 'Portal', icon: Globe },
  { key: 'setelan', label: 'Setelan', icon: Settings },
  { key: 'presensea', label: 'Presensea', icon: Sparkles },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Desktop sidebar minimized state
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeMenu, setActiveMenu] = useState<AdminMenuKey>('beranda');
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileProfileRef.current && !mobileProfileRef.current.contains(e.target as Node)) {
        setIsMobileProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const activeItem = MENU_ITEMS.find((m) => m.key === activeMenu) || MENU_ITEMS[0];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-slate-100/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP FLOATING SIDEBAR (Hidden on Mobile)           */}
      {/* ======================================================== */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 my-4 ml-4 h-[calc(100vh-2rem)] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/10 dark:shadow-black/50 transition-all duration-300 ease-in-out z-20 ${
          isMinimized ? 'w-20 p-3' : 'w-64 p-4'
        }`}
      >
        {/* Top: Logo & Minimize Toggle */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div 
              onClick={() => setActiveMenu('beranda')}
              className={`flex items-center gap-3 cursor-pointer overflow-hidden ${
                isMinimized ? 'justify-center w-full' : ''
              }`}
            >
              <div className="shrink-0 flex items-center justify-center">
                <SchoolEmblem className="w-9 h-9 object-contain filter drop-shadow-sm" />
              </div>
              {!isMinimized && (
                <div className="truncate">
                  <h2 className="text-sm font-black font-heading tracking-tight leading-tight text-slate-900 dark:text-white truncate">
                    SDN Medowo 1
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 tracking-wide">
                      Support by Presensea
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!isMinimized && (
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Perkecil Sidebar"
                aria-label="Perkecil Sidebar"
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Minimized Expand Button */}
          {isMinimized && (
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                title="Perluas Sidebar"
                aria-label="Perluas Sidebar"
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Menu Items List */}
          <nav className="space-y-1.5">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.key;
              const isPresensea = item.key === 'presensea';

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveMenu(item.key)}
                  title={isMinimized ? item.label : undefined}
                  className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer overflow-hidden ${
                    isMinimized ? 'justify-center px-0' : 'justify-between'
                  } ${
                    isActive
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Active Icon Wrapper with Blue Accent that moves smoothly */}
                    <div
                      className={`relative shrink-0 p-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? isPresensea
                            ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-600/30'
                            : 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                          : 'text-slate-500 dark:text-slate-400 group-hover:bg-slate-200/60 dark:group-hover:bg-slate-800 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-glow"
                          className="absolute inset-0 rounded-xl bg-blue-400/20 animate-pulse pointer-events-none"
                        />
                      )}
                    </div>

                    {/* Menu Text */}
                    {!isMinimized && (
                      <span className="truncate tracking-wide">{item.label}</span>
                    )}
                  </div>

                  {/* Badges or Indicator */}
                  {!isMinimized && (
                    <div>
                      {item.badge ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
                          {item.badge}
                        </span>
                      ) : isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm shadow-blue-500" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Profile, Theme, and Logout */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          {/* User Info Tile */}
          {!isMinimized ? (
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-600/20 shrink-0">
                  N
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {user?.username || 'Nagata'}
                  </p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate">
                    Administrator
                  </p>
                </div>
              </div>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                title="Ganti Tema"
                aria-label="Ganti Tema"
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div 
                title={`Akun: ${user?.username || 'Nagata'} (Administrator)`}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-blue-600/20 cursor-default"
              >
                N
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title={isMinimized ? 'Keluar Akun' : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all cursor-pointer group ${
              isMinimized ? 'justify-center px-0' : ''
            }`}
          >
            <div className="p-1.5 rounded-xl group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
              <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            {!isMinimized && <span>Keluar Akun</span>}
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MOBILE TOP BAR (Visible only on Mobile)               */}
      {/* ======================================================== */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0 z-30 shadow-xs relative">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center">
            <SchoolEmblem className="w-8 h-8 object-contain filter drop-shadow-xs" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              SDN Medowo 1
            </h1>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
              Support by Presensea
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle tema */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Ganti Tema"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Foto Profil Akun yang Menyembunyikan Info Akun & Logout */}
          <div className="relative" ref={mobileProfileRef}>
            <button
              type="button"
              onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
              aria-label="Profil Akun"
              aria-expanded={isMobileProfileOpen}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-blue-500/20 active:scale-95 transition-transform cursor-pointer"
            >
              {user?.username?.charAt(0).toUpperCase() || 'N'}
            </button>

            {/* Dropdown Menu Akun & Logout */}
            <AnimatePresence>
              {isMobileProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 text-slate-900 dark:text-white"
                >
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                      {user?.username?.charAt(0).toUpperCase() || 'N'}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">
                        {user?.username || 'Nagata'}
                      </p>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate">
                        Administrator
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. RIGHT CONTENT AREA (No box border, scrollable)        */}
      {/* ======================================================== */}
      <main className="flex-1 h-full md:h-[calc(100vh-2rem)] md:my-4 md:mr-4 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 pb-32 md:pb-8 transition-all">
        {/* Top Header inside Content Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white tracking-tight">
              {activeItem.label}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Kelola dan atur konfigurasi sistem {activeItem.label.toLowerCase()} sekolah
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition-all cursor-pointer"
            >
              <span>Lihat Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Workspace Placeholder for Active Menu */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Clean Empty Workspace Canvas */}
              <div className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800/80 p-8 sm:p-12 text-center bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm">
                <div className="inline-flex p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-4 shadow-inner">
                  {React.createElement(activeItem.icon, { className: 'w-8 h-8' })}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Ruang Kerja {activeItem.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Bagian isi untuk menu <span className="font-semibold text-blue-600 dark:text-blue-400">{activeItem.label}</span> siap dikembangkan pada tahap berikutnya.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Akun Aktif: {user?.username || 'Administrator'}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 4. MOBILE IOS 27 NATIVE BOTTOM NAVIGATION BAR            */}
      {/* ======================================================== */}
      <nav 
        aria-label="Navigasi Menu Mobile"
        className="md:hidden fixed bottom-4 inset-x-0 z-50 px-4 flex items-center justify-center gap-3 max-w-md mx-auto pointer-events-none"
      >
        {/* Left Native Capsule: 4 Menus (Beranda, Menu, Portal, Setelan) */}
        <div className="pointer-events-auto flex items-center justify-around flex-1 py-2 px-2.5 rounded-[2rem] bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-slate-950/20 transition-all">
          {MENU_ITEMS.filter((item) => item.key !== 'presensea').map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveMenu(item.key)}
                className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-200 cursor-pointer active:scale-92 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {/* Active Indicator Backdrop */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-pill"
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-950/80 rounded-2xl border border-blue-200/60 dark:border-blue-800/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'}`} />
                  <span className="text-[10px] mt-1 tracking-tight font-semibold">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Standalone Presensea Native Island: Larger, distinct shape & vibrant styling */}
        <button
          type="button"
          onClick={() => setActiveMenu('presensea')}
          aria-label="Buka Menu Presensea"
          className={`pointer-events-auto shrink-0 flex flex-col items-center justify-center p-3 px-4 rounded-[2rem] transition-all duration-200 cursor-pointer active:scale-90 shadow-xl ${
            activeMenu === 'presensea'
              ? 'bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white shadow-blue-600/35 ring-2 ring-white/80 dark:ring-blue-400/80 scale-105'
              : 'bg-gradient-to-tr from-blue-800 via-indigo-700 to-blue-700 text-white shadow-slate-900/25 hover:scale-102'
          }`}
        >
          <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse stroke-[2.2]" />
          <span className="text-[10px] font-bold text-white mt-1 tracking-tight">
            Presensea
          </span>
        </button>
      </nav>

    </div>
  );
};
