import React from 'react';
import { NewsArticle } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { Newspaper, ArrowRight, Calendar, User, BookOpen } from 'lucide-react';

interface NewsSectionProps {
  newsArticles: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsArticles }) => {
  const { navigate } = useRouter();

  const featuredArticle = newsArticles.find((a) => a.featured) || newsArticles[0];
  const sideArticles = newsArticles.filter((a) => a.id !== featuredArticle?.id).slice(0, 3);

  const handleShowAll = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/berita');
  };

  const handleOpenArticle = (article: NewsArticle) => {
    navigate(`/berita/${article.slug || article.id}`);
  };

  return (
    <section id="berita" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <Newspaper className="w-4 h-4" />
              <span>Warta &amp; Publikasi Sekolah</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Kabar Terkini Medowo 1
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Dokumentasi kegiatan akademik, inovasi teknologi PRESENSEA, moderasi beragama, serta program pelestarian alam lereng Anjasmoro.
            </p>
          </div>

          {/* Section-level Action to Full Archive: Navigates to /berita */}
          <button
            onClick={handleShowAll}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
          >
            <span>Tampilkan Selengkapnya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Digital Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured Article (Large Lead Story) */}
          {featuredArticle && (
            <div className="lg:col-span-7">
              <div 
                onClick={() => handleOpenArticle(featuredArticle)}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={featuredArticle.cover_image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{featuredArticle.published_at}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-teal-500" />
                      <span>{featuredArticle.author}</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span>Buka Artikel Penuh</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span>Warta Resmi</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Editorial Column Stories */}
          <div className="lg:col-span-5 space-y-6">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleOpenArticle(article)}
                className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md p-5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5"
              >
                <div className="relative h-44 sm:h-32 sm:w-36 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
                      {article.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{article.published_at}</span>
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Baca</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
