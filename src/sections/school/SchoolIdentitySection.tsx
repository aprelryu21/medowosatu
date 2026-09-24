import React from 'react';
import { SchoolProfile, Staff } from '../../types';
import { MapPin, Mail, Award, BookOpen, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SchoolIdentitySectionProps {
  profile: SchoolProfile;
  staffList: Staff[];
}

export const SchoolIdentitySection: React.FC<SchoolIdentitySectionProps> = ({ profile, staffList }) => {
  const gtkCount = staffList.length;

  return (
    <section id="profil" className="py-24 relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-800 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-200/50 dark:via-slate-800/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="w-full mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>Identitas &amp; Komitmen Institusi</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[42px] font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                Mengenal Lebih Dekat{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500 dark:from-blue-400 dark:to-teal-300 whitespace-nowrap">
                  {profile.name}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              Berada di lereng Gunung Anjasmoro yang asri, kami mengintegrasikan keluhuran budi pekerti dengan inovasi teknologi presensi cerdas guna mewujudkan ekosistem belajar yang menyenangkan, aman, dan berdaya saing.
            </p>
          </div>
        </motion.div>

        {/* Large Typography Numbers & Dynamic Metrics Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Main Numbers & Details (md:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 flex flex-col justify-between space-y-8"
          >
            
            {/* Top Metric Strip: 96 Peserta Didik */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              {/* Peserta Didik */}
              <div className="flex flex-col group">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-slate-900 dark:text-white tracking-tighter leading-none transition-transform group-hover:scale-105 duration-300">
                  {profile.student_count}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-2">
                  Peserta Didik
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Tercatat Aktif &amp; Terbina
                </span>
              </div>

              {/* Jumlah GTK */}
              <div className="flex flex-col group">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-blue-600 dark:text-blue-400 tracking-tighter leading-none transition-transform group-hover:scale-105 duration-300">
                  {gtkCount}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-2">
                  Guru &amp; Tendik
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Diverifikasi Database
                </span>
              </div>

              {/* Akreditasi */}
              <div className="flex flex-col col-span-2 sm:col-span-1 group">
                <span className="font-display font-extrabold text-5xl sm:text-6xl text-teal-600 dark:text-teal-400 tracking-tighter leading-none transition-transform group-hover:scale-105 duration-300">
                  {profile.accreditation}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-2">
                  Akreditasi BAN-S/M
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Standar Nasional
                </span>
              </div>
            </div>

            {/* Geographic & Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Alamat Resmi</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                    {profile.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Korespondensi</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 font-mono truncate">
                    {profile.email}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    Telp: {profile.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Institutional Metadata Strip (Bottom Line) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <Award className="w-3.5 h-3.5 text-blue-500" />
                <span>NPSN Resmi: {profile.npsn}</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                <span>Kurikulum Merdeka</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>PRESENSEA 2026</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Narrative Photo aligned top with 96 and bottom with NPSN */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 flex flex-col"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 w-full h-full min-h-[280px] flex flex-col justify-end group">
              <img
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
                alt="SD Negeri Medowo 1 Lereng Anjasmoro"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="relative z-10 p-5 sm:p-6 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-teal-300">
                  Konservasi &amp; Edukasi
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-white mt-0.5">
                  Lereng Sejuk Gunung Anjasmoro
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-200 mt-1 leading-relaxed line-clamp-2">
                  Laboratorium alam terbuka bagi pembentukan karakter peduli lingkungan peserta didik.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
