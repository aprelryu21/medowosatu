import React, { useState } from 'react';
import { Staff } from '../../types';
import { StaffDetailModal } from '../../components/modal/StaffDetailModal';
import { Users2, ArrowUpRight, Award, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface StaffShowcaseSectionProps {
  staffList: Staff[];
}

export const StaffShowcaseSection: React.FC<StaffShowcaseSectionProps> = ({ staffList }) => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  return (
    <section id="dewan-guru" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Users2 className="w-4 h-4" />
            <span>Tenaga Pendidik &amp; Kependidikan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Dewan Guru &amp; Tenaga Kependidikan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Pendidik dan staf berdedikasi tinggi yang membimbing seluruh peserta didik dengan ketulusan hati, keteladanan budi pekerti, dan penguasaan metode ajar kurikulum merdeka.
          </p>
        </motion.div>

        {/* Premium Portrait Grid: Motion Staggered Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {staffList.map((staff, idx) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              onClick={() => setSelectedStaff(staff)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Portrait Image */}
              <div className="relative h-80 sm:h-92 w-full overflow-hidden bg-slate-800">
                <img
                  src={staff.photo_url}
                  alt={staff.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Action Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 group-hover:text-white group-hover:bg-blue-600 backdrop-blur-md transition-all shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block mb-0.5">
                    {staff.role}
                  </span>
                  
                  {/* Name STRICTLY ALWAYS 1 LINE as requested */}
                  <h3 
                    className="text-base sm:text-lg font-display font-bold text-white group-hover:text-blue-200 transition-colors whitespace-nowrap overflow-hidden text-ellipsis block"
                    title={staff.name}
                  >
                    {staff.name}
                  </h3>
                  
                  {staff.nip ? (
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                      <Award className="w-3 h-3 text-teal-400 shrink-0" />
                      <span className="truncate">NIP: {staff.nip}</span>
                    </div>
                  ) : (
                    <div className="mt-1 text-[10px] font-mono text-slate-400">
                      <span>Pendidik Terbina</span>
                    </div>
                  )}

                  {/* Micro-interaction prompt on hover */}
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-teal-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Lihat Profil Lengkap</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup with Seamless Morphing Animation */}
        <StaffDetailModal
          staff={selectedStaff}
          onClose={() => setSelectedStaff(null)}
        />

      </div>
    </section>
  );
};
