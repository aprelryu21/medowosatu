import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  QrCode, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Users, 
  Shield, 
  Check, 
  Calendar,
  Clock,
  ArrowRight,
  FolderOpen,
  Bell,
  MessageSquare
} from 'lucide-react';

export const PresenseaShowcaseSection: React.FC = () => {
  // Simulator states for Feature 1 (QR Scanner)
  const [scannerActive, setScannerActive] = useState(true);
  const [scanMessage, setScanMessage] = useState('Menunggu pemindaian kartu QR...');
  const [lastStudent, setLastStudent] = useState('Aditya Pratama (06:42 WIB - Hadir)');

  const triggerScanSim = () => {
    setScanMessage('Memvalidasi Token Enkripsi SHA-256...');
    setTimeout(() => {
      setScanMessage('Sukses! Presensi tercatat ke database.');
      setLastStudent('Bagas Wahyu Nugroho (06:47 WIB - Hadir)');
      setTimeout(() => {
        setScanMessage('Menunggu pemindaian kartu QR...');
      }, 2500);
    }, 1000);
  };

  const presenseaFeatures = [
    {
      number: '01',
      tag: 'Presensi Digital Kelas',
      title: 'Presensi QR Code Cepat & Akurat',
      headline: 'Digitalisasi Presensi dalam Hitungan Detik Tanpa Antrean.',
      description: 'Menggantikan absensi buku konvensional dengan sistem pemindaian kartu QR siswa berkecepatan tinggi. Data kehadiran langsung tersimpan ke server awan sekolah secara real-time dan terintegrasi dengan lembar rekapitulasi dinas.',
      highlights: [
        'Pemindaian kamera instan berkecepatan 60 FPS',
        'Token QR terenkripsi individual tanpa data rahasia',
        'Otomatis menghitung rekapitulasi bulanan & semester',
        'Pencatatan status Hadir, Izin, Sakit, dan Alpa'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 font-mono text-teal-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRESENSEA SCANNER ENGINE</span>
            </div>
            <span className="font-mono text-slate-400 text-[11px]">KELAS 3 · SESI PAGI</span>
          </div>

          {/* Laser Scanner Viewport */}
          <div className="relative h-48 sm:h-56 rounded-2xl bg-slate-900 border border-blue-500/30 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-radial from-blue-900/30 to-transparent" />
            
            {/* Animated Laser Bar */}
            {scannerActive && (
              <div className="absolute top-0 inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce" />
            )}

            <div className="w-28 h-28 border-2 border-dashed border-cyan-400/60 rounded-2xl flex flex-col items-center justify-center p-3 text-center">
              <QrCode className="w-12 h-12 text-cyan-400/80 mb-1" />
              <span className="text-[9px] font-mono text-slate-400">ARAHKAN KARTU</span>
            </div>

            <div className="absolute bottom-3 inset-x-3 text-center">
              <span className="px-3 py-1 rounded-lg bg-black/70 text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
                {scanMessage}
              </span>
            </div>
          </div>

          {/* Quick Simulation & Last Scanned Card */}
          <div className="space-y-2.5">
            <button
              onClick={triggerScanSim}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/30"
            >
              <QrCode className="w-4 h-4" />
              <span>Simulasi Pindai Kartu Siswa</span>
            </button>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Terakhir: <strong className="text-white font-medium">{lastStudent}</strong></span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      tag: 'Asesmen & Evaluasi',
      title: 'Penilaian Kurikulum Merdeka Otomatis',
      headline: 'Nilai Tersusun Rapi. Capaian Kompetensi Terpantau.',
      description: 'Asesmen formatif dan sumatif otomatis terkonversi menjadi grafik capaian kompetensi individual siswa maupun agregat kelas. Memudahkan guru menganalisis penguasaan materi tanpa rekap manual berulang.',
      highlights: [
        'Konversi nilai TP (Tujuan Pembelajaran) instan',
        'Analisis capaian kompetensi deskriptif otomatis',
        'Grafik statistik perkembangan peserta didik berkala',
        'Siap ekspor format rapor resmi Kurikulum Merdeka'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 font-mono text-blue-400">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>GRAFIK CAPAIAN KOMPETENSI FASE B</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">RATA-RATA: 88.2</span>
          </div>

          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Bahasa Indonesia (Literasi Fiksi)</span>
                <span className="font-mono text-emerald-400 font-semibold">91.4% Tuntas</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full w-[91%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Matematika &amp; Numerasi Dasar</span>
                <span className="font-mono text-blue-400 font-semibold">84.8% Tuntas</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full w-[85%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">IPAS Ekosistem Alam Anjasmoro</span>
                <span className="font-mono text-teal-400 font-semibold">94.0% Tuntas</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full w-[94%]" />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-[11px] text-slate-300 flex items-center justify-between">
            <span>Status Rapor Kelas: <strong>Lengkap 100%</strong></span>
            <span className="text-teal-400 font-mono">24 Siswa Aktif</span>
          </div>
        </div>
      )
    },
    {
      number: '03',
      tag: 'Cloud Storage Dokumen',
      title: 'Manajemen Perangkat Ajar Terintegrasi',
      headline: 'Semua Modul, ATP, dan LKPD dalam Satu Wadah Awan.',
      description: 'Bapak dan ibu guru tidak perlu lagi khawatir kehilangan berkas mengajar. Seluruh modul ajar, alur tujuan pembelajaran, dan lembar kerja peserta didik tersimpan rapi berbasis penyimpanan awan sekolah.',
      highlights: [
        'Penyimpanan terstruktur per mata pelajaran & fase',
        'Akses cepat dari komputer maupun ponsel guru',
        'Pembaruan berkas daring tanpa duplikasi file',
        'Dukungan format PDF, dokumen teks, hingga audio karawitan'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="font-mono text-blue-400 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4" />
              <span>REPOSITORI MODUL AJAR FASE B</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">4 DOKUMEN AKTIF</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Modul IPAS Konservasi', ext: 'PDF', size: '2.4 MB', tag: 'Semester 1' },
              { title: 'LKPD Berhitung Ceria', ext: 'DOCX', size: '1.2 MB', tag: 'Formatif' },
              { title: 'ATP Bahasa Indonesia', ext: 'PDF', size: '850 KB', tag: 'Fase B' },
              { title: 'Media Audio Gamelan', ext: 'MP3', size: '14.2 MB', tag: 'Seni Budaya' },
            ].map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-blue-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono text-xs font-bold mb-2">
                  {doc.ext}
                </div>
                <h5 className="font-display font-bold text-xs text-white truncate">{doc.title}</h5>
                <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{doc.size}</span>
                  <span className="text-teal-400">{doc.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Kapasitas Tersedia: 15.8 GB</span>
            <span className="text-emerald-400 font-semibold">Tersinkronisasi</span>
          </div>
        </div>
      )
    },
    {
      number: '04',
      tag: 'Dokumentasi Harian',
      title: 'Buku Jurnal Pembelajaran Guru Terstruktur',
      headline: 'Pencatatan Agenda Kelas & Refleksi Tanpa Ribet.',
      description: 'Mencatat pelaksanaan kegiatan pembelajaran, topik materi ajar harian, kendala yang dihadapi peserta didik, dan refleksi pedagogis secara runtut dan otomatis tersusun menjadi laporan berkala.',
      highlights: [
        'Format agenda harian terstandar Kurikulum Merdeka',
        'Formulir refleksi cepat dan tindak lanjut pembelajaran',
        'Verifikasi pengawasan kepala sekolah langsung dari sistem',
        'Tersusun kronologis memudahkan supervisi akademik'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="font-mono text-teal-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>TIMELINE AGENDA HARIAN GURU</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">STATUS: TUNTAS</span>
          </div>

          <div className="space-y-3">
            {[
              { mapel: 'IPAS', topic: 'Morfologi Tumbuhan Lereng Anjasmoro', time: '07:30 - 09:00', note: 'Praktik lapangan di kebun botani sekolah berlangsung interaktif.' },
              { mapel: 'Matematika', topic: 'Pengukuran Panjang Satuan Baku', time: '09:30 - 11:00', note: 'Siswa mengukur sarana perpustakaan menggunakan meteran.' },
              { mapel: 'Pendidikan Pancasila', topic: 'Sikap Gotong Royong & Moderasi', time: '11:15 - 12:00', note: 'Diskusi kelompok mengenai kerukunan lintas iman di Medowo.' },
            ].map((j, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-white/10">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-blue-400">{j.mapel}</span>
                  <span className="font-mono text-[10px] text-slate-400">{j.time}</span>
                </div>
                <h5 className="font-display font-medium text-xs text-white">{j.topic}</h5>
                <p className="text-[11px] text-slate-400 mt-1 italic">&ldquo;{j.note}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Diverifikasi Kepala Sekolah</span>
            <span className="text-teal-400 font-mono">Catatan Lengkap</span>
          </div>
        </div>
      )
    },
    {
      number: '05',
      tag: 'Tata Kelola Kelas',
      title: 'Administrasi Kelas Ringkas & Otomatis',
      headline: 'Jadwal, Regu Piket, & Inventaris dalam Satu Dasbor.',
      description: 'Pengelolaan data inventaris barang kelas, pembagian regu piket kebersihan lingkungan, serta mutasi peserta didik dapat dikelola secara instan tanpa tumpukan kertas.',
      highlights: [
        'Jadwal pelajaran interaktif dengan pengingat otomatis',
        'Pengaturan regu piket cinta alam dan kelestarian kelas',
        'Sinkronisasi profil peserta didik dengan data Dapodik',
        'Pencatatan mutasi siswa dan buku induk digital terpadu'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="font-mono text-blue-400 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>DASBOR TATA KELOLA KELAS 3</span>
            </span>
            <span className="text-[10px] font-mono text-teal-400">TAPEL 2026/2027</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Regu Piket Hari Ini</span>
              <h5 className="font-display font-bold text-sm text-white mt-1">Regu Cemara</h5>
              <p className="text-[11px] text-emerald-400 mt-1 font-mono">5 Siswa Bertugas</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block">Inventaris Kelas</span>
              <h5 className="font-display font-bold text-sm text-white mt-1">100% Layak Pakai</h5>
              <p className="text-[11px] text-teal-400 mt-1 font-mono">24 Meja &amp; Proyektor</p>
            </div>

            <div className="col-span-2 p-3.5 rounded-xl bg-slate-900 border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-white">Sinkronisasi Dapodik Kemendikbudristek</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">VALID</span>
              </div>
              <p className="text-[11px] text-slate-400">NISN seluruh peserta didik terverifikasi tanpa anomali data.</p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>SDN Medowo 1 · Kediri</span>
            <span className="text-blue-400 font-semibold">Tersinkronisasi 100%</span>
          </div>
        </div>
      )
    },
    {
      number: '06',
      tag: 'Kemitraan Orang Tua',
      title: 'Portal Kemitraan Orang Tua & Wali Murid',
      headline: 'Sekolah dan Rumah Terkoneksi Penuh Kasih & Keamanan.',
      description: 'Orang tua dapat memantau kedatangan anak di sekolah secara langsung saat kartu QR dipindai. Membangun transparansi pendidikan serta ketenangan hati keluarga tanpa rasa was-was.',
      highlights: [
        'Notifikasi real-time kedatangan & kepulangan siswa',
        'Rekapitulasi kebiasaan positif dan perkembangan budi pekerti',
        'Komunikasi terarah antara wali kelas dan orang tua murid',
        'Akses mudah langsung dari browser ponsel pintar tanpa unduh aplikasi berat'
      ],
      mockup: (
        <div className="p-6 bg-slate-950/90 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <span className="font-mono text-emerald-400 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-emerald-400" />
              <span>NOTIFIKASI AKTIVITAS SISWA</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">HARI INI</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-white">Aditya Pratama</h5>
                  <span className="text-[10px] text-slate-400">Kelas 3 · SDN Medowo 1</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-semibold">
                Hadir Tepat Waktu
              </span>
            </div>

            <div className="text-[11px] text-slate-300 space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-slate-400">Waktu Masuk:</span>
                <span className="font-mono text-white">06:42 WIB (Pintu Utama)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tingkat Kehadiran Bulan Ini:</span>
                <span className="font-mono text-emerald-400 font-semibold">98.5% (Sangat Baik)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pesan Wali Kelas:</span>
                <span className="text-white italic">&ldquo;Aktif &amp; mandiri dalam pembelajaran.&rdquo;</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Privasi Data Murid Terjamin</span>
            <span className="text-emerald-400 font-semibold">Tersambung Aman</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      id="presensea" 
      className="relative py-28 bg-[#060B19] text-white overflow-hidden selection:bg-blue-500 selection:text-white"
    >
      {/* Top Transition Gradient */}
      <div 
        className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white dark:from-slate-950 via-[#060B19]/70 to-[#060B19] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Atmospheric Glowing Orbs */}
      <div 
        className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Cyber Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PRESENSEA Eyebrow & Hero Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>MODERN EDUCATIONAL SAAS SUITE</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            PRESENSEA
          </h2>

          <p className="mt-3 font-display font-semibold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-300">
            Digitalisasi Kelas, Semudah Menjentikkan Jari.
          </p>

          <p className="mt-4 text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Ekosistem presensi cerdas dan administrasi kurikulum terpadu yang memadukan 6 keunggulan utama dalam satu tampilan modern yang cepat, terstruktur, dan elegan.
          </p>
        </motion.div>

        {/* 6 Core Features in Seamless Alternating Zig-Zag Layout */}
        <div className="space-y-20 sm:space-y-24">
          {presenseaFeatures.map((feature, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Mockup Box Column: Wrapped in rounded-3xl box with smooth border */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-white/15 shadow-2xl transition-all duration-500 hover:border-blue-500/40 group min-h-[360px]">
                    {/* Glowing highlight in background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    {/* Mockup UI Component */}
                    {feature.mockup}
                  </div>
                </div>

                {/* Text Description Column */}
                <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-4`}>
                  
                  {/* Badge & Number */}
                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">
                      FITUR {feature.number}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-teal-300 font-semibold tracking-wide uppercase">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="font-display font-medium text-base sm:text-lg text-blue-300">
                    {feature.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Highlight Bullets */}
                  <div className="pt-3 space-y-2.5">
                    {feature.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-teal-400" />
                    <span>Terintegrasi Ekosistem PRESENSEA SDN Medowo 1</span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
