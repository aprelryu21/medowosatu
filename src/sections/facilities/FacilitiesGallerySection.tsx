import React, { useState, useEffect } from 'react';
import { Facility } from '../../types';
import { Building2, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FacilitiesGallerySectionProps {
  facilities: Facility[];
}

export const FacilitiesGallerySection: React.FC<FacilitiesGallerySectionProps> = ({ facilities }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = facilities.length;

  // Auto-slide effect every 4 seconds with pause on hover
  useEffect(() => {
    if (isPaused || total === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (total === 0) return null;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const currentFacility = facilities[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <section 
      id="fasilitas" 
      className="py-24 relative overflow-hidden bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span>Sarana &amp; Prasarana Representatif</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Fasilitas Lingkungan Belajar
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Sarana modern yang mendukung pembinaan karakter, spiritual lintas iman, kebugaran, literasi, dan kenyamanan belajar siswa.
            </p>
          </div>

          {/* Carousel Navigation Arrows & Play/Pause status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
              title={isPaused ? 'Lanjutkan Geser Otomatis' : 'Jeda Geser Otomatis'}
              aria-label={isPaused ? 'Lanjutkan Geser Otomatis' : 'Jeda Geser Otomatis'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Fasilitas sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Fasilitas berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Panoramic Sliding Carousel Stage */}
        <div className="relative w-full py-4">
          
          {/* Side Vignette Gradient Blur Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-28 z-20 pointer-events-none bg-gradient-to-r from-slate-100/90 dark:from-slate-900/90 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-28 z-20 pointer-events-none bg-gradient-to-l from-slate-100/90 dark:from-slate-900/90 to-transparent" />

          {/* 3-Card Panoramic Layout with Seamless Directional Transition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
            
            {/* Left Flanking Card (Blurred, Clickable to slide prev) */}
            <div 
              onClick={handlePrev}
              className="hidden md:block md:col-span-3 cursor-pointer select-none transition-all duration-500 transform scale-95 opacity-50 blur-[2px] hover:opacity-75 hover:blur-none rounded-3xl overflow-hidden bg-slate-900 border border-slate-300 dark:border-slate-800 h-80 relative group"
            >
              <img
                src={facilities[prevIndex].image_url}
                alt={facilities[prevIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-semibold text-teal-300 block">
                  {facilities[prevIndex].category}
                </span>
                <h4 className="text-sm font-display font-bold text-white truncate">
                  {facilities[prevIndex].title}
                </h4>
              </div>
            </div>

            {/* Center Focal Card with Smooth Sliding Motion */}
            <div className="col-span-1 md:col-span-6 relative z-10 h-96 sm:h-[430px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-2 border-blue-500/40">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentFacility.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex flex-col justify-end group"
                >
                  <img
                    src={currentFacility.image_url}
                    alt={currentFacility.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* High-Contrast Gradient Backdrop for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-3.5 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-md text-white font-semibold text-xs shadow-md">
                      {currentFacility.category}
                    </span>
                  </div>

                  {/* Bottom Card Content */}
                  <div className="relative z-10 p-6 sm:p-8 text-white space-y-2 pointer-events-none">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight drop-shadow-md">
                      {currentFacility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow max-w-xl">
                      {currentFacility.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Flanking Card (Blurred, Clickable to slide next) */}
            <div 
              onClick={handleNext}
              className="hidden md:block md:col-span-3 cursor-pointer select-none transition-all duration-500 transform scale-95 opacity-50 blur-[2px] hover:opacity-75 hover:blur-none rounded-3xl overflow-hidden bg-slate-900 border border-slate-300 dark:border-slate-800 h-80 relative group"
            >
              <img
                src={facilities[nextIndex].image_url}
                alt={facilities[nextIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-semibold text-teal-300 block">
                  {facilities[nextIndex].category}
                </span>
                <h4 className="text-sm font-display font-bold text-white truncate">
                  {facilities[nextIndex].title}
                </h4>
              </div>
            </div>

          </div>

          {/* Dots Indicator for Direct Jump */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {facilities.map((f, idx) => (
              <button
                key={f.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-8 bg-blue-600 dark:bg-blue-400' 
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Lihat fasilitas ${f.title}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
