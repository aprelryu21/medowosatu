import React from 'react';
import { missionPoints } from '../../data/seedData';
import { 
  Target, 
  Compass, 
  HeartHandshake, 
  Laptop, 
  Trees, 
  ShieldCheck, 
  Users,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const MissionSection: React.FC = () => {
  // Enhanced metadata mapping for each mission pillar
  const pillarIcons = [
    HeartHandshake, // 1: Karakter & Budi Pekerti
    Trees,          // 2: Wawasan Lingkungan
    Laptop,         // 3: Literasi Digital & PRESENSEA
    ShieldCheck,    // 4: Sekolah Aman & Ramah Anak
    Users           // 5: Kolaborasi Tri Pusat Pendidikan
  ];

  const pillarTags = [
    ['Akhlak Mulia', 'Spiritual', 'Budi Pekerti'],
    ['Konservasi Alam', 'Kawasan Hijau', 'Peduli Lingkungan'],
    ['PRESENSEA', 'Digitalisasi Kelas', 'Literasi Modern'],
    ['Zero Bullying', 'Kesejahteraan Mental', 'Ramah Anak'],
    ['Mitra Orang Tua', 'Komite Sekolah', 'Sinergi Komunitas']
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
      
      {/* Background Decorative Blobs */}
      <div 
        className="absolute top-1/3 -right-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 -left-20 w-80 h-80 bg-teal-500/10 dark:bg-teal-500/10 blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            <Target className="w-4 h-4 text-blue-500" />
            <span>Arah Strategis &amp; Pilar Pendidikan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Visi &amp; Misi Institusi
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            Kompas operasional dan filosofis dalam membentuk generasi pembelajar yang berkarakter kokoh, cakap teknologi, dan mencintai kelestarian alam pegunungan.
          </p>
        </div>

        {/* Highlighted Visi Showcase Card */}
        <div className="mb-14 relative group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-teal-400/20 to-indigo-600/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 lg:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                <Compass className="w-4 h-4 animate-spin-slow" />
                <span>Visi Utama Sekolah</span>
              </div>
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
                “Terwujudnya Peserta Didik yang Beriman, Bertaqwa, Berkarakter Luhur, Cerdas Digital, dan Berwawasan Lingkungan Lestari.”
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1">
                Diselaraskan dengan Kurikulum Merdeka dan profil pelajar Pancasila berbasis kearifan lokal lereng Anjasmoro.
              </p>
            </div>

            {/* Strategic Pillars Badges */}
            <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
              <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Karakter Luhur &amp; Spiritual</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/60 text-xs font-semibold text-teal-700 dark:text-teal-300 flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-teal-500" />
                <span>Cakap Digital PRESENSEA</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <Trees className="w-3.5 h-3.5 text-emerald-500" />
                <span>Harmoni Lingkungan Hijau</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Mission Cards Grid: Modern, Interactive & Structured */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionPoints.map((item, idx) => {
            const Icon = pillarIcons[idx] || Target;
            const tags = pillarTags[idx] || [];

            return (
              <div 
                key={item.number}
                className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-7 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Large Background Watermark Number */}
                <span 
                  className="absolute -right-2 -bottom-4 font-display font-extrabold text-7xl text-slate-100 dark:text-slate-800/50 pointer-events-none select-none group-hover:text-blue-50 dark:group-hover:text-blue-950/30 transition-colors duration-300"
                  aria-hidden="true"
                >
                  0{item.number}
                </span>

                {/* Top: Icon & Pillar Number */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/50">
                      Pilar 0{item.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 relative z-10">
                  {tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 6th Card: Call to action / Commitment summary */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 p-7 text-white shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-5 text-white">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase font-mono tracking-widest text-teal-200 font-bold block mb-1">
                Komitmen Nyata
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Mencetak Lulusan Siap Hadapi Masa Depan
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-white/90 leading-relaxed">
                Seluruh program sekolah terukur, akuntabel, dan berorientasi pada keselamatan, kebahagiaan, serta potensi unik setiap siswa.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-white">
              <span>Kurikulum Merdeka Mandiri Berbagi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
