import React, { useEffect } from 'react';
import { NewsArticle } from '../../types';
import { X, Calendar, User, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../../context/RouterContext';

interface NewsReaderModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const NewsReaderModal: React.FC<NewsReaderModalProps> = ({ article, onClose }) => {
  const { navigate } = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  return (
    <AnimatePresence>
      {article && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Tutup berita"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-64 sm:h-80 w-full bg-slate-800">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-lg bg-blue-600/90 text-white text-[11px] font-semibold mb-2">
                  {article.category}
                </span>
                <h2 id="news-modal-title" className="text-xl sm:text-2xl font-display font-bold leading-snug">
                  {article.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{article.published_at}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-teal-500" />
                  <span>{article.author}</span>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="mt-4 leading-relaxed">
                  {article.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/berita/${article.slug || article.id}`);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Buka di Halaman Web Penuh (/berita)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
