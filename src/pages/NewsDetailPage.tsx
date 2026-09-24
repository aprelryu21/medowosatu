import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { useRouter } from '../context/RouterContext';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Home, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';

interface NewsDetailPageProps {
  newsArticles: NewsArticle[];
  slugOrId: string | null;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsArticles, slugOrId }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  // Find article matching slug or id
  const article = newsArticles.find(
    (a) => a.slug === slugOrId || a.id === slugOrId
  );

  const relatedArticles = newsArticles
    .filter((a) => a.id !== article?.id)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slugOrId]);

  if (!article) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            Artikel Tidak Ditemukan
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Kabar atau artikel dengan pengenal "{slugOrId}" tidak ditemukan atau telah dipindahkan.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/berita')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 cursor-pointer"
            >
              Lihat Semua Warta
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
  const shareTitle = `${article.title} - SD Negeri Medowo 1`;

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
    const text = `${article.title}\n\nBaca selengkapnya di warta resmi SD Negeri Medowo 1:\n${currentUrl}`;
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
              onClick={() => navigate('/berita')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Warta &amp; Berita
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
              {article.title}
            </span>
          </div>

          <button
            onClick={() => navigate('/berita')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Semua Warta</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-sm">
              {article.category}
            </span>
            {article.featured && (
              <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-500" />
                <span>Berita Utama</span>
              </span>
            )}
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              ID: {article.slug || article.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-xs">
                {article.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{article.author}</span>
                <span className="text-[10px] text-slate-400">Pendidik / Tim Redaksi SDN Medowo 1</span>
              </div>
            </div>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{article.published_at}</span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">|</span>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Clock className="w-4 h-4 text-teal-500" />
              <span>3 menit membaca</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 shadow-xl mb-10 border border-slate-200/80 dark:border-slate-800">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full max-h-[480px] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="p-3 bg-slate-900/90 text-center text-slate-300 text-xs italic border-t border-slate-800">
            Dokumentasi resmi SD Negeri Medowo 1 · Kediri, Jawa Timur
          </div>
        </div>

        {/* Share Bar: Top Floating/Card */}
        <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Bagikan artikel ini ke siswa &amp; wali murid:</span>
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
              <span>{copied ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
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

        {/* Article Body Content */}
        <article className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
          {/* Excerpt Pull Box */}
          <div className="p-6 sm:p-7 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 my-6 not-prose">
            <p className="font-display font-medium text-base sm:text-lg text-blue-950 dark:text-blue-200 leading-relaxed italic">
              "{article.excerpt}"
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-6 pt-4 text-justify sm:text-left text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* School Signature Stamp */}
          <div className="not-prose mt-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Redaksi Warta SD Negeri Medowo 1
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Dikelola bersama Dewan Guru &amp; Komite Sekolah
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Terverifikasi Resmi
            </span>
          </div>
        </article>

        {/* Bottom Social Share */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Suka dengan warta ini? Bagikan ke grup WhatsApp kelas atau sosial media.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin URL'}</span>
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Kirim ke WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Warta Terkait Lainnya
              </h3>
              <button
                onClick={() => navigate('/berita')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/berita/${rel.slug || rel.id}`)}
                  className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-900">
                    <img
                      src={rel.cover_image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-semibold">
                      {rel.category}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>

                  <span className="mt-3 text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{rel.published_at}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
