import React, { useState, useMemo } from 'react';
import { InnovationMedia } from '../types';
import { useRouter } from '../context/RouterContext';
import { 
  Lightbulb, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Calendar, 
  ExternalLink, 
  Home, 
  Share2, 
  Check, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface MediaListPageProps {
  mediaItems: InnovationMedia[];
}

export const MediaListPage: React.FC<MediaListPageProps> = ({ mediaItems }) => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [copied, setCopied] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    mediaItems.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return ['Semua', ...Array.from(set)];
  }, [mediaItems]);

  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [mediaItems, selectedCategory, searchQuery]);

  const handleShare = async () => {
    const shareUrl = window.location.origin + '/media';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">Media Inovasi</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-300 shadow-sm transition-all cursor-pointer"
              title="Bagikan tautan galeri media"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-500" />}
              <span>{copied ? 'Tersalin!' : 'Bagikan Galeri'}</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-3 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200/50 dark:border-teal-800/50">
            <Lightbulb className="w-4 h-4" />
            <span>Karya Digital &amp; Teknologi Edukasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Media Inovasi SD Negeri Medowo 1
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Eksplorasi portofolio aplikasi edukasi, modul interaktif digital, gamifikasi pembelajaran, dan platform teknologi kreasi dewan guru SDN Medowo 1 untuk mewujudkan pembelajaran masa depan.
          </p>
        </div>

        {/* Toolbar Filter & Search */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari inovasi, materi, kreator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Grid of Media */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold text-slate-900 dark:text-white">
              {searchQuery ? `Hasil Pencarian ("${searchQuery}")` : 'Daftar Seluruh Karya Inovasi'} ({filteredMedia.length})
            </h2>
          </div>

          {filteredMedia.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
              <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Tidak ada media inovasi yang sesuai dengan pencarian Anda.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/media/${item.slug || item.id}`)}
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.preview_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-teal-300 text-[11px] font-mono border border-white/10">
                          {item.category}
                        </span>
                      </div>

                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                          Tahun {item.year}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-4 right-4">
                        <h3 className="font-display font-bold text-lg text-white group-hover:text-teal-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Metadata & Description */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 py-4 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate max-w-[130px] font-medium">{item.creator}</span>
                    </div>

                    <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Buka Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
