import React from 'react';
import { Award, BookOpen, Compass, Heart, ShieldAlert, Sparkles, Star, Building, Globe, Users } from 'lucide-react';
import { MainstreamPillar, MainstreamIconKey } from '../types';

interface MainstreamGerakanProps {
  pillars: MainstreamPillar[];
}

// Pemetaan kunci ikon (disimpan sebagai teks di database) ke komponen ikon Lucide
const ICON_MAP: Record<MainstreamIconKey, React.ReactNode> = {
  'compass': <Compass className="w-8 h-8 text-white" />,
  'book-open': <BookOpen className="w-8 h-8 text-white" />,
  'heart': <Heart className="w-8 h-8 text-white" />,
  'users': <Users className="w-8 h-8 text-white" />,
  'award': <Award className="w-8 h-8 text-white" />,
  'shield-alert': <ShieldAlert className="w-8 h-8 text-white" />,
  'sparkles': <Sparkles className="w-8 h-8 text-white" />,
  'star': <Star className="w-8 h-8 text-white" />,
  'building': <Building className="w-8 h-8 text-white" />,
  'globe': <Globe className="w-8 h-8 text-white" />,
};

export const MainstreamGerakan: React.FC<MainstreamGerakanProps> = ({ pillars }) => {

  return (
    <div className="my-10 bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xs font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
          <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
            MAINSTREAM GERAKAN
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
          Empat pilar perjuangan utama ormas Hidayatullah dalam berpartisipasi aktif membangun peradaban umat dan kejayaan bangsa.
        </p>
      </div>

      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100 flex gap-4 items-start max-w-3xl">
          <Sparkles className="w-6 h-6 text-emerald-700 shrink-0 mt-1" />
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Gerakan Hidayatullah didasarkan pada visi besar peradaban. Melalui <strong>Sistematika Nuzulul Wahyu (SNW)</strong> sebagai basis metodologi tarbiyah (pembinaan), kami mengintegrasikan aspek spiritual, keilmuan, kemandirian, dan kemanusiaan secara utuh untuk melahirkan insan-insan bertauhid kokoh.
          </p>
        </div>

        {/* Pillars Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-250 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
            >
              {/* Pillar Left Icon Badge */}
              <div
                className="p-6 md:w-32 flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(to bottom right, ${pillar.colorFrom}, ${pillar.colorTo})` }}
              >
                <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
                  {ICON_MAP[pillar.iconKey] ?? ICON_MAP['sparkles']}
                </div>
              </div>

              {/* Pillar Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-slate-800 tracking-tight leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50">
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Khidmat Nyata</span>
                  <p className="text-[11px] text-emerald-800 font-bold leading-normal">
                    {pillar.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};