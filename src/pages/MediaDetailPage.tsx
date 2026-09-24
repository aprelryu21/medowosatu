import React, { useState, useEffect } from 'react';
import { InnovationMedia } from '../types';
import { useRouter } from '../context/RouterContext';
import { 
  Lightbulb, 
  User, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Home, 
  ExternalLink, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  ArrowRight,
  MessageCircle,
  Cpu
} from 'lucide-react';

interface MediaDetailPageProps {
  mediaItems: InnovationMedia[];
  slugOrId: string | null;
}

export const MediaDetailPage: React.FC<MediaDetailPageProps> = ({ mediaItems, slugOrId }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  // Match by id or slug
  const item = mediaItems.find(
    (m) => m.slug === slugOrId || m.id === slugOrId
  );

  const relatedItems = mediaItems
    .filter((m) => m.id !== item?.id)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slugOrId]);

  if (!item) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
          <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            Media Inovasi Tidak Ditemukan
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Karya inovasi dengan ID "{slugOrId}" tidak ditemukan atau telah diperbarui.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/media')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 cursor-pointer"
            >
              Lihat Semua Media Inovasi
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Inovasi Media Pembelajaran SD Negeri Medowo 1:\n"${item.title}" oleh ${item.creator}\n\nLihat detail selengkapnya di:\n${currentUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/media')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Media Inovasi
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
              {item.title}
            </span>
          </div>

          <button
            onClick={() => navigate('/media')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Semua Inovasi</span>
          </button>
        </div>

        {/* Media Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-sm">
              {item.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-500" />
              <span>Karya Inovasi Mandiri</span>
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              Tahun {item.year}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {item.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-xs">
                {item.creator.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{item.creator}</span>
                <span className="text-[10px] text-slate-400">Pengembang &amp; Tim Pengajar Medowo 1</span>
              </div>
            </div>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Rilis {item.year}</span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Cpu className="w-4 h-4 text-purple-500" />
              <span>EduTech In-House</span>
            </div>
          </div>
        </header>

        {/* Media Preview Showcase Image */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-xl mb-10 border border-slate-200/80 dark:border-slate-800">
          <img
            src={item.preview_image}
            alt={item.title}
            className="w-full max-h-[480px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-3 bg-slate-900/90 text-center text-slate-300 text-xs italic border-t border-slate-800 flex items-center justify-between px-6">
            <span>Mockup &amp; Antarmuka Aplikasi {item.title}</span>
            <span className="text-[11px] font-mono text-teal-400">Status: Aktif Digunakan di Kelas</span>
          </div>
        </div>

        {/* Action & Share Bar */}
        <div className="mb-10 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Bagikan media inovasi ini:</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tautan Disalin!' : 'Salin URL'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleFacebookShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white transition-all cursor-pointer shadow-sm"
            >
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Main Content Details */}
        <div className="space-y-8">
          
          {/* Description Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Tentang Media Inovasi Ini</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>

            {/* Pedagogical Objectives & Features */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Keunggulan &amp; Manfaat Bagi Siswa:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Didesain khusus kontekstual dengan materi ajar Kurikulum Merdeka</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Meningkatkan keterlibatan aktif dan antusiasme belajar siswa</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Dapat diakses oleh siswa melalui chromebook sekolah maupun gawai mandiri</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Terintegrasi dalam ekosistem digital SD Negeri Medowo 1</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Interactive / Demo Link Card if available */}
          {item.demo_url && (
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display font-bold text-lg sm:text-xl">
                  Ingin Mencoba Media Edukasi Ini?
                </h4>
                <p className="text-xs sm:text-sm text-blue-100 max-w-md">
                  Akses modul atau demonstrasi langsung karya ini untuk kebutuhan pembelajaran di kelas.
                </p>
              </div>

              <a
                href={item.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-white text-blue-700 font-bold text-xs sm:text-sm hover:bg-blue-50 shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Buka Demo Aplikasi</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Related Media Items */}
          {relatedItems.length > 0 && (
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Karya Inovasi Lainnya
                </h3>
                <button
                  onClick={() => navigate('/media')}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedItems.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/media/${rel.slug || rel.id}`)}
                    className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-900">
                      <img
                        src={rel.preview_image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-teal-300 text-[10px] font-mono">
                        {rel.category}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>

                    <span className="mt-3 text-[10px] text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3 text-blue-500" />
                      <span className="truncate">{rel.creator}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
