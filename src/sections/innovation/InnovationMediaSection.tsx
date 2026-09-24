import React from 'react';
import { InnovationMedia } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { Lightbulb, User, ArrowRight } from 'lucide-react';

interface InnovationMediaSectionProps {
  mediaItems: InnovationMedia[];
}

export const InnovationMediaSection: React.FC<InnovationMediaSectionProps> = ({ mediaItems }) => {
  const { navigate } = useRouter();

  // Show first 3 featured items on home page
  const displayItems = mediaItems.slice(0, 3);

  const handleShowAll = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/media');
  };

  const handleOpenItem = (item: InnovationMedia) => {
    navigate(`/media/${item.slug || item.id}`);
  };

  return (
    <section id="media-inovasi" className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Karya Digital &amp; Teknologi Pendidikan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Media Inovasi Sekolah
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Portofolio aplikasi edukasi mandiri, gamifikasi materi pelajaran, dan modul pembelajaran digital karya pendidik SD Negeri Medowo 1.
            </p>
          </div>

          {/* Section-level Action: Navigates to dedicated /media page */}
          <button
            onClick={handleShowAll}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group cursor-pointer"
          >
            <span>Tampilkan Selengkapnya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Portfolio Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(item)}
              className="group rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Project Mockup Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.preview_image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-teal-300 text-[11px] font-mono border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content & Metadata */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Creator & Link to Details */}
              <div className="px-6 py-4 bg-slate-100/60 dark:bg-slate-950/50 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate max-w-[130px] font-medium">{item.creator}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
