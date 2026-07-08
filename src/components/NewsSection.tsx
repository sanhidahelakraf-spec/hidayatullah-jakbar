import React from 'react';
import { NewsItem } from '../types';
import { formatDate } from '../lib/dateUtils';
import { Calendar, Eye, MessageSquare, Phone } from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
  onViewAllNews: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  onSelectArticle,
  onViewAllNews,
}) => {
  // Extract regular news (not featured as main hero, or all sorted by date, first 6 items)
  const regularNews = news.slice(1, 4); // First 3 after the main featured article for the grid
  const popularNews = [...news].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-10 font-sans">
      {/* Left Column: Jawa Barat Update News Grid */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-emerald-650 block rounded-full" />
            <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
              JAKARTA BARAT UPDATE
            </h3>
          </div>
          <button
            onClick={onViewAllNews}
            className="bg-emerald-750 hover:bg-emerald-850 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            VIEW ALL
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(1, 7).map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-50">
                <span className="absolute top-3 left-3 z-10 bg-emerald-800 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md tracking-wider">
                  {article.category}
                </span>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-2 font-mono">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 hover:text-emerald-750 transition-colors line-clamp-2 mb-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 mb-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-medium">Oleh {article.author}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3 h-3" /> {article.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Sidebar (WhatsApp Contact & Popular News) */}
      <div className="space-y-8">
        {/* 1. WhatsApp Contact Widget (Matching Image 2) */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl" />
          <h4 className="text-[10px] font-extrabold text-amber-400 tracking-widest mb-2 uppercase">
            LAYANAN ADUAN & INFORMASI
          </h4>
          <h3 className="text-sm font-display font-bold text-slate-100 mb-4 leading-snug">
            Hubungi Layanan Informasi DPD Hidayatullah Jakarta Barat Barat
          </h3>

          <a
            href="https://wa.me/6287755376499"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-emerald-650 hover:bg-emerald-750 text-white p-4 rounded-xl transition-all shadow-md group/wa"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-full group-hover/wa:scale-110 transition-transform">
                {/* SVG WhatsApp Logo */}
                <svg
                  className="w-5 h-5 fill-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="text-left font-sans">
                <span className="block text-[10px] uppercase tracking-wider text-emerald-200">Kirim Pesan</span>
                <span className="font-extrabold text-xs">Chat via WhatsApp</span>
              </div>
            </div>
            <span className="bg-white/10 text-white rounded-full p-1 group-hover/wa:translate-x-1 transition-transform">
              <svg className="w-4 h-4 stroke-2 stroke-white fill-none" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>

        {/* 2. Popular News (Terpopuler) matching Image 2 */}
        <div>
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-5">
            <span className="w-1.5 h-4.5 bg-emerald-600 block rounded-full" />
            <h3 className="text-xs font-display font-black text-slate-800 tracking-wide uppercase">
              TERPOPULER
            </h3>
          </div>

          <div className="space-y-4">
            {popularNews.map((article, index) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="flex gap-4 items-start cursor-pointer group hover:bg-slate-50 p-2 rounded-xl transition-colors border-b border-slate-50 last:border-0 pb-3"
              >
                {/* Ranking Index Badge */}
                <div className="text-2xl font-black text-slate-200 group-hover:text-emerald-700 transition-colors leading-none font-mono">
                  0{index + 1}
                </div>

                {/* Info and title */}
                <div className="flex-1 min-w-0 font-sans">
                  <h4 className="text-xs font-bold text-slate-800 hover:text-emerald-800 transition-colors leading-snug line-clamp-2 mb-1.5">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium">
                    <span className="font-extrabold uppercase tracking-wider text-emerald-700">{article.category}</span>
                    <span className="font-mono">{formatDate(article.date)}</span>
                  </div>
                </div>

                {/* Small thumbnail image */}
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};