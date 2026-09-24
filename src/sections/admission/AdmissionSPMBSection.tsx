import React, { useState } from 'react';
import { SchoolProfile } from '../../types';
import { 
  FileCheck, 
  ArrowUpRight, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Users2,
  CalendarCheck,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdmissionSPMBSectionProps {
  profile: SchoolProfile;
}

export const AdmissionSPMBSection: React.FC<AdmissionSPMBSectionProps> = ({ profile }) => {
  const [activeReq, setActiveReq] = useState<number | null>(0);

  // Format WhatsApp Link
  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const waUrl = `https://wa.me/${waNumber}?text=Halo%20Panitia%20SPMB%20SD%20Negeri%20Medowo%201,%20saya%20ingin%20berkonsultasi%20mengenai%20penerimaan%20peserta%20didik%20baru.`;

  // Email consultation link as requested: sdnmedowosatu@gmail.com
  const emailUrl = "mailto:sdnmedowosatu@gmail.com?subject=Konsultasi%20Pendaftaran%20SPMB%20SD%20Negeri%20Medowo%201&body=Halo%20Panitia%20SPMB%20SD%20Negeri%20Medowo%201,%0A%0ASaya%20orang%20tua/wali%20calon%20siswa%20ingin%20berkonsultasi%20seputar%20penerimaan%20murid%20baru.%0A%0ATerima%20kasih.";

  const interactiveRequirements = [
    {
      id: 0,
      title: 'Akta Kelahiran Calon Siswa',
      desc: 'Fotokopi 2 lembar akta resmi dari Dispendukcapil untuk verifikasi data kependudukan anak.',
      icon: FileText,
      badge: 'Wajib',
      color: 'blue'
    },
    {
      id: 1,
      title: 'Kartu Keluarga (KK) Terkini',
      desc: 'Fotokopi 2 lembar KK keluarga yang mencantumkan Nomor Induk Kependudukan (NIK) calon siswa.',
      icon: Users2,
      badge: 'Wajib',
      color: 'teal'
    },
    {
      id: 2,
      title: 'Kriteria Usia Minimal',
      desc: 'Berusia minimal 6 tahun pada tanggal 1 Juli tahun ajaran berjalan (prioritas 7 tahun).',
      icon: CalendarCheck,
      badge: 'Prioritas',
      color: 'amber'
    },
    {
      id: 3,
      title: 'Ijazah / Surat Keterangan PAUD/TK',
      desc: 'Surat kelulusan atau sertifikat tanda tamat belajar dari TK/RA/KB jika sebelumnya menempuh PAUD.',
      icon: GraduationCap,
      badge: 'Pelengkap',
      color: 'blue'
    },
    {
      id: 4,
      title: 'KIP / PIP / PKH (Bagi yang Memiliki)',
      desc: 'Fotokopi kartu bantuan sosial pemerintah bagi pemegang Program Indonesia Pintar / KIP aktif.',
      icon: HeartHandshake,
      badge: 'Opsional',
      color: 'teal'
    }
  ];

  return (
    <section id="spmb" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Architectural Container with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-blue-50/70 via-slate-50 to-teal-50/40 dark:from-slate-900/90 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 lg:p-16 shadow-xl"
        >
          
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Side: Editorial Typography & Consultation CTA */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Penerimaan Murid Baru (SPMB)</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Bergabunglah Bersama Keluarga Besar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 dark:from-blue-400 dark:via-blue-300 dark:to-teal-300">
                  SD Negeri Medowo 1
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Wujudkan fondasi masa depan putra-putri Anda melalui pendidikan berkarakter, lingkungan pegunungan yang asri, serta sentuhan teknologi presensi cerdas PRESENSEA.
              </p>

              {/* Consultation Info Box */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Layanan Konsultasi Pendaftaran Resmi</span>
                </h4>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bapak/Ibu wali murid dapat berkonsultasi seputar berkas, zonasi, atau jadwal langsung dengan Panitia SPMB melalui pesan WhatsApp atau email resmi sekolah.
                </p>
              </div>

              {/* Consultation Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* WA Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] hover:shadow-teal-600/30 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Panitia SPMB via WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                {/* Email Button */}
                <a
                  href={emailUrl}
                  className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>sdnmedowosatu@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Illustrated Registration Requirements */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 space-y-4 shadow-sm">
                
                {/* Header for Requirements */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                        Persyaratan Pokok Pendaftaran
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Klik berkas untuk melihat panduan kelengkapan
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                    5 Dokumen
                  </span>
                </div>

                {/* Interactive Illustrated Cards with Spring Transition */}
                <div className="space-y-2.5">
                  {interactiveRequirements.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeReq === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveReq(isActive ? null : item.id)}
                        className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-white dark:bg-slate-900 border-blue-500/80 shadow-md ring-1 ring-blue-500/20'
                            : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-xs font-semibold ${
                              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {item.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                              item.badge === 'Wajib'
                                ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                                : item.badge === 'Prioritas'
                                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                                : 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400'
                            }`}>
                              {item.badge}
                            </span>
                            <CheckCircle2 className={`w-4 h-4 ${
                              isActive ? 'text-teal-500' : 'text-slate-300 dark:text-slate-600'
                            }`} />
                          </div>
                        </div>

                        {/* Interactive Expandable Explanatory Text with Smooth Collapse */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed overflow-hidden"
                            >
                              {item.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-[11px] text-teal-900 dark:text-teal-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span>Berkas dapat diserahkan langsung ke Ruang Pelayanan Terpadu SD Negeri Medowo 1 setiap jam dinas.</span>
                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
