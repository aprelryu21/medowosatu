import React from 'react';
import { Extracurricular } from '../../types';
import { Compass, Clock, UserCheck, Sparkles } from 'lucide-react';

interface ExtracurricularSectionProps {
  extracurriculars: Extracurricular[];
}

export const ExtracurricularSection: React.FC<ExtracurricularSectionProps> = ({
  extracurriculars
}) => {
  return (
    <section id="ekstrakurikuler" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Compass className="w-4 h-4" />
            <span>Minat, Bakat &amp; Karakter Siswa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Ekstrakurikuler Unggulan
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Menyalurkan potensi siswa dalam kepanduan alam terbuka, pelestarian seni gamelan luhur, seni religi sholawat, ketangkasan fisik voli, dan penguatan spiritual lintas iman.
          </p>
        </div>

        {/* Photography-Forward Alternating Project-Style Layout */}
        <div className="space-y-12 sm:space-y-16">
          {extracurriculars.map((item, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl group">
                    <img
                      src={item.cover_image}
                      alt={item.name}
                      className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Floating Schedule Metadata Label */}
                    <div className="absolute top-4 left-4 p-2.5 sm:px-4 sm:py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white flex items-center gap-2 text-xs font-mono">
                      <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{item.schedule_label}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-teal-300">
                        {item.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Text & Coach Metadata Column */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-4`}>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kegiatan 0{item.display_order}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.name}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                            Pembina / Pelatih
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {item.coaches}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clean unboxed schedule info */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span>Jadwal Terjadwal</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.schedule_days}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.start_time} - {item.end_time} WIB</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
