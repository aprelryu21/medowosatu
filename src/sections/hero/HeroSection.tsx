import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { SchoolEmblem } from '../../components/common/SchoolEmblem';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplore: () => void;
  onPresensea: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onPresensea }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const updateHeight = () => {
      if (textRef.current) {
        setTextHeight(textRef.current.offsetHeight);
      }
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(textRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Dynamic Ambient Background Glow with subtle pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/12 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Grid Lines Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Column: Typography, Logo Box & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            
            {/* Top Trust Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs mb-5 text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>Sekolah Bahagia &amp; Ramah Anak</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-semibold bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200/60 dark:border-teal-800/60 shadow-xs">
                <Award className="w-3.5 h-3.5 text-teal-500" />
                <span>Terakreditasi B</span>
              </div>
            </motion.div>

            {/* Main Headline with School Logo precisely matched to the height of the text SD NEGERI MEDOWO 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 sm:gap-6 lg:gap-7"
            >
              {/* Logo Sekolah: Ukuran presisi persis sama dengan tinggi teks SD NEGERI MEDOWO 1 */}
              <div 
                className="shrink-0 flex items-center justify-center transition-all duration-150 h-[65px] w-[65px] sm:h-[104px] sm:w-[104px] lg:h-[130px] lg:w-[130px] xl:h-[155px] xl:w-[155px]"
                style={
                  textHeight 
                    ? { height: `${textHeight}px`, width: `${textHeight}px` } 
                    : undefined
                }
              >
                <SchoolEmblem 
                  className="w-full h-full object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105" 
                />
              </div>

              {/* Kotak Pembungkus Teks SD NEGERI MEDOWO 1 */}
              <div ref={textRef} className="flex flex-col justify-center">
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.08] text-balance">
                  SD NEGERI <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 dark:from-blue-400 dark:via-blue-300 dark:to-teal-300">
                    MEDOWO 1
                  </span>
                </h1>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 font-display font-semibold text-lg sm:text-xl text-slate-800 dark:text-slate-200 tracking-tight"
            >
              Pelopor Sekolah Digital Ramah Lingkungan di Lereng Anjasmoro
            </motion.p>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed"
            >
              Membentuk Generasi Berkarakter, Cerdas Digital, dan Mencintai Alam melalui perpaduan budi pekerti luhur serta integrasi ekosistem presensi cerdas modern.
            </motion.p>

            {/* Metadata Indicators (NPSN and Location) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-slate-600 dark:text-slate-400"
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">NPSN 20511827</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>Desa Medowo Kecamatan Kandangan Kabupaten Kediri</span>
            </motion.div>

            {/* CTA Buttons with Smooth Hover/Tap Transitions */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              {/* Button 1: Jelajahi Sekolah */}
              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-600/25 border border-blue-500/80 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer hover:shadow-xl hover:shadow-blue-600/30"
              >
                <span>Jelajahi Sekolah</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Button 2: Kenali Presensea */}
              <button
                onClick={onPresensea}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-slate-950/20 border border-slate-700/80 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer hover:border-teal-500/50"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Kenali PRESENSEA</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Hero Column: Animated Architectural Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              
              {/* Soft, Dignified Ambient Diffusion Behind Image */}
              <div 
                className="absolute -inset-3 sm:-inset-4 rounded-[36px] bg-gradient-to-tr from-blue-600/20 via-teal-500/15 to-indigo-600/20 blur-2xl opacity-70 pointer-events-none" 
                aria-hidden="true"
              />

              {/* Architectural Framing: Sleek double bezel */}
              <div className="relative p-2.5 sm:p-3 rounded-[32px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-950/10 dark:shadow-black/40 ring-1 ring-black/5 dark:ring-white/5 transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Inner Image Container */}
                <div className="relative rounded-[22px] overflow-hidden bg-slate-950 group aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80"
                    alt="Suasana Sekolah Ramah Lingkungan SD Negeri Medowo 1"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Deep Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent pointer-events-none" />

                  {/* Top-Right Quiet Identification Label */}
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/15 text-[10.5px] font-mono text-slate-200 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Kampus Hijau &amp; Ramah Anak</span>
                    </div>
                  </div>
                  
                  {/* Elegant Lower Floating Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-4 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-white/10 text-white pointer-events-none z-10 shadow-lg">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-teal-300 block mb-1">
                      Kecamatan Kandangan · Kabupaten Kediri
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      Harmoni Karakter &amp; Inovasi Digital
                    </h3>
                    <p className="text-[11.5px] text-slate-300 mt-1 leading-relaxed line-clamp-2">
                      Lingkungan asri di lereng Gunung Anjasmoro yang memadukan pendidikan budi pekerti dengan teknologi presensi cerdas PRESENSEA.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
