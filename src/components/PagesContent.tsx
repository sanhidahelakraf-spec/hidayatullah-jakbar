import React from 'react';
import { PageContent } from '../types';
import { formatDate } from '../lib/dateUtils';
import { Calendar, RefreshCw, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface PagesContentProps {
  page: PageContent;
}

export const PagesContent: React.FC<PagesContentProps> = ({ page }) => {
  // Select a beautiful icon or hero image based on page ID to make it look premium
  const getPageHeroImage = (id: string) => {
    switch (id) {
      case 'sejarah-singkat':
        return 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';
      case 'visi-misi':
        return 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80';
      case 'pengurus':
        return 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80';
      case 'program':
        return 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80';
      case 'pemuda-hidayatullah':
        return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
      case 'muslimat-hidayatullah':
        return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80';
      case 'rumah-quran':
        return 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80';
      case 'pendidikan':
        return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80';
      case 'ekonomi':
        return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80';
      case 'sosial':
        return 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
      default:
        return 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto my-8 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
    >
      {/* Page Hero Image Overlay */}
      <div className="relative h-60 md:h-80 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
        <img
          src={getPageHeroImage(page.id)}
          alt={page.title}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white md:bottom-8 md:left-8 font-sans">
          <span className="inline-block bg-amber-400 text-emerald-950 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider mb-2.5">
            Hidayatullah Jabar
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-black tracking-tight text-white leading-none">
            {page.title}
          </h2>
          <p className="text-xs md:text-sm text-emerald-300 mt-2 font-bold uppercase tracking-wider">
            {page.subtitle}
          </p>
        </div>
      </div>
 
      {/* Main Content Body */}
      <div className="p-6 md:p-10 space-y-8 font-sans">
        <div className="prose max-w-none text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line font-medium">
          {page.content}
        </div>
 
        {/* Dynamic Sections (if any, like structure members or subprogram descriptions) */}
        {page.sections && page.sections.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-display font-black text-slate-800 flex items-center gap-2 uppercase tracking-wide">
              <Star className="w-4 h-4 text-emerald-600" /> DETAIL INFORMASI & STRUKTUR
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {page.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/10 transition-all group"
                >
                  <h4 className="font-bold text-sm text-emerald-800 mb-2.5">
                    {section.title}
                  </h4>
                  <div className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page Footer metadata */}
        <div className="pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5" /> Terakhir Diperbarui: <strong>{formatDate(page.lastUpdated, true)}</strong>
          </span>
          <span>© Dewan Pengurus Daerah Hidayatullah Jakarta Barat</span>
        </div>
      </div>
    </motion.div>
  );
};