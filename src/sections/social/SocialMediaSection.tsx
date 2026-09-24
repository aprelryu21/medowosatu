import React from 'react';
import { Share2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SocialMediaSection: React.FC = () => {
  const socialChannels = [
    {
      name: 'Instagram Resmi',
      handle: '@medowosatu',
      url: 'https://instagram.com/medowosatu',
      desc: 'Galeri dokumentasi kegiatan siswa, kabar prestasi, agenda sekolah, dan kilas kreativitas ruang kelas.',
      gradient: 'from-fuchsia-600 via-rose-500 to-amber-500',
      badge: 'Galeri & Story',
      followers: 'Komunitas Medowo 1',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'Facebook Resmi',
      handle: 'medowo.medowo',
      url: 'https://facebook.com/medowo.medowo',
      desc: 'Ruang komunikasi bersama wali murid, informasi pengumuman sekolah, serta publikasi agenda kemitraan masyarakat.',
      gradient: 'from-blue-600 to-indigo-700',
      badge: 'Komunitas & Pengumuman',
      followers: 'Wali Murid & Alumni',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
        </svg>
      )
    },
    {
      name: 'YouTube Channel',
      handle: '@sdnmedowosatuofficial',
      url: 'https://www.youtube.com/@sdnmedowosatuofficial',
      desc: 'Dokumentasi video profil institusi, pertunjukan seni siswa, gelar karya P5, dan sosialisasi program PRESENSEA.',
      gradient: 'from-red-600 to-rose-700',
      badge: 'Video & Dokumenter',
      followers: 'Kanal Resmi',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  return (
    <section id="media-sosial" className="py-20 relative overflow-hidden bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
      
      {/* Background Decorative Element */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-blue-500/5 dark:bg-blue-600/10 blur-3xl rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Kanal Informasi Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Terhubung dengan SD Negeri Medowo 1
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Ikuti dokumentasi kegiatan belajar, kreasi karya murid, kejuaraan, dan publikasi resmi sekolah melalui kanal media sosial terverifikasi kami.
          </p>
        </motion.div>

        {/* 3 Modern Social Media Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {socialChannels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Icon badge & channel type */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${channel.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    {channel.icon}
                  </div>

                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {channel.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                    {channel.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                </div>

                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold block mb-3">
                  {channel.handle}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {channel.desc}
                </p>
              </div>

              {/* Bottom Action CTA */}
              <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-blue-50 dark:bg-slate-800/80 dark:hover:bg-blue-950/40 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-semibold border border-slate-200/80 dark:border-slate-700 flex items-center justify-between transition-colors group-hover:border-blue-300 dark:group-hover:border-blue-800 cursor-pointer"
                >
                  <span>Buka Halaman {channel.name.split(' ')[0]}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
