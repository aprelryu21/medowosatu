import React from 'react';
import { Eye, ShieldCheck, HeartHandshake, Leaf, Cpu } from 'lucide-react';

interface VisionSectionProps {
  visionText: string;
}

export const VisionSection: React.FC<VisionSectionProps> = ({ visionText }) => {
  const pillars = [
    { label: 'Iman & Takwa', icon: HeartHandshake, desc: 'Fondasi spiritual budi pekerti lintas iman' },
    { label: 'Karakter Pancasila', icon: ShieldCheck, desc: 'Toleransi, gotong royong, dan cinta tanah air' },
    { label: 'Unggul IPTEK', icon: Cpu, desc: 'Kecakapan digital dan literasi abad ke-21' },
    { label: 'Wawasan Lingkungan', icon: Leaf, desc: 'Konservasi alam lestari lereng Anjasmoro' }
  ];

  return (
    <section className="py-28 relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle Background Radial Gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6">
          <Eye className="w-4 h-4" />
          <span>Visi Utama Sekolah</span>
        </div>

        {/* Grand Typography Statement */}
        <blockquote className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-[1.25] tracking-tight text-balance">
          &ldquo;{visionText}&rdquo;
        </blockquote>

        {/* Editorial Divider Line */}
        <div className="mt-12 mb-12 flex items-center justify-center gap-3">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-blue-500" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
            Pilar Pembentukan Karakter
          </span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-teal-500" />
        </div>

        {/* 4 Pillars in clean typographic layout (No heavy card boxes) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.label} className="flex flex-col items-center text-center group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                  {pillar.label}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
