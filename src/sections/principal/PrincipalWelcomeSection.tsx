import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

interface PrincipalWelcomeSectionProps {
  name: string;
  nip: string;
  welcomeText: string;
}

export const PrincipalWelcomeSection: React.FC<PrincipalWelcomeSectionProps> = ({
  name,
  nip,
  welcomeText
}) => {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Framed Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80"
                  alt={`Kepala Sekolah SD Negeri Medowo 1 ${name}`}
                  className="w-full h-[460px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Overlay Caption on Portrait */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-teal-400 font-semibold mb-0.5">
                    Pimpinan Institusi
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {name}
                  </h3>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    NIP {nip}
                  </p>
                </div>
              </div>

              {/* Decorative Accent Badge behind/below */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-gradient-to-br from-blue-600/20 to-teal-500/20 rounded-full blur-xl -z-10" />

            </div>
          </div>

          {/* Welcome Text & Oversized Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Pesan Kepemimpinan</span>
            </div>

            <div className="relative">
              <Quote className="w-12 h-12 text-blue-600/15 dark:text-blue-400/20 absolute -top-4 -left-4 -z-10" />
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                Menyalakan Lentera Harapan di Kaki Gunung Anjasmoro
              </h2>

              <p className="mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                &ldquo;{welcomeText}&rdquo;
              </p>
            </div>

            {/* Signature & NIP Block */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  {name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kepala SD Negeri Medowo 1 · Kediri
                </p>
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                NIP. {nip}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
