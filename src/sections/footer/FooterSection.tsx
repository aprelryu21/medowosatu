import React from 'react';
import { SchoolProfile } from '../../types';
import { MapPin, Mail, Phone, ArrowUp, Sparkles } from 'lucide-react';
import { SchoolEmblem } from '../../components/common/SchoolEmblem';
import { useRouter } from '../../context/RouterContext';

interface FooterSectionProps {
  profile: SchoolProfile;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ profile }) => {
  const { navigate, currentPath } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    const targetId = href.replace('#', '');
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050A17] text-white pt-24 pb-12 overflow-hidden border-t border-white/10">
      
      {/* Oversized Background Watermark */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 select-none pointer-events-none text-center whitespace-nowrap"
        aria-hidden="true"
      >
        <span className="font-display font-extrabold text-[12vw] sm:text-[14vw] tracking-tighter text-white/[0.025] leading-none block">
          SDN MEDOWO 1
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Footer Headline */}
        <div className="pb-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-teal-400 tracking-widest uppercase block mb-3">
              Mendidik dengan Sepenuh Hati
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight uppercase">
              HARI INI BELAJAR. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-300">
                BESOK MENGINSPIRASI.
              </span>
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2 text-xs font-semibold transition-all self-start md:self-auto cursor-pointer"
            aria-label="Kembali ke bagian atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-xs">
          
          {/* Col 1: School Identity with Unified SVG Logo */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SchoolEmblem className="w-10 h-10 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {profile.name}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  NPSN {profile.npsn} · Akreditasi {profile.accreditation}
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Institusi pendidikan dasar ramah anak berbasis digital dan wawasan lingkungan lestari di Kecamatan Kandangan, Kabupaten Kediri.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">
              Jelajahi Institusi
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#profil" onClick={(e) => handleLink(e, '#profil')} className="hover:text-white transition-colors cursor-pointer">
                  Profil &amp; Identitas
                </a>
              </li>
              <li>
                <a href="#fasilitas" onClick={(e) => handleLink(e, '#fasilitas')} className="hover:text-white transition-colors cursor-pointer">
                  Sarana &amp; Prasarana
                </a>
              </li>
              <li>
                <a href="#dewan-guru" onClick={(e) => handleLink(e, '#dewan-guru')} className="hover:text-white transition-colors cursor-pointer">
                  Dewan Guru &amp; GTK
                </a>
              </li>
              <li>
                <a href="#ekstrakurikuler" onClick={(e) => handleLink(e, '#ekstrakurikuler')} className="hover:text-white transition-colors cursor-pointer">
                  Ekstrakurikuler Unggulan
                </a>
              </li>
              <li>
                <a href="/berita" onClick={(e) => handleLink(e, '/berita')} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
                  Warta &amp; Publikasi (/berita)
                </a>
              </li>
              <li>
                <a href="/media" onClick={(e) => handleLink(e, '/media')} className="text-teal-400 hover:text-teal-300 font-semibold transition-colors cursor-pointer">
                  Media Inovasi Sekolah (/media)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: PRESENSEA & SPMB */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">
              Ekosistem Digital
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#presensea" onClick={(e) => handleLink(e, '#presensea')} className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-semibold cursor-pointer">
                  <Sparkles className="w-3 h-3" />
                  <span>PRESENSEA SaaS</span>
                </a>
              </li>
              <li><a href="#presensea" onClick={(e) => handleLink(e, '#presensea')} className="hover:text-white transition-colors cursor-pointer">Presensi Kartu QR</a></li>
              <li><a href="#presensea" onClick={(e) => handleLink(e, '#presensea')} className="hover:text-white transition-colors cursor-pointer">Asesmen Kurikulum</a></li>
              <li><a href="#presensea" onClick={(e) => handleLink(e, '#presensea')} className="hover:text-white transition-colors cursor-pointer">Buku Jurnal Guru</a></li>
              <li><a href="#presensea" onClick={(e) => handleLink(e, '#presensea')} className="hover:text-white transition-colors cursor-pointer">Portal Wali Murid</a></li>
              <li><a href="#spmb" onClick={(e) => handleLink(e, '#spmb')} className="hover:text-white transition-colors cursor-pointer">Pendaftaran SPMB</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-display">
              Kontak &amp; Alamat
            </h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-mono">{profile.phone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} SD Negeri Medowo 1 &amp; PRESENSEA. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span>Kabupaten Kediri · Jawa Timur</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
