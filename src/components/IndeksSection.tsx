import React, { useState } from 'react';
import { NewsItem } from '../types';
import { formatDate } from '../lib/dateUtils';
import { Calendar, Eye, Search, Sparkles, User } from 'lucide-react';

interface IndeksSectionProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const IndeksSection: React.FC<IndeksSectionProps> = ({
  news,
  onSelectArticle,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'BERITA', 'ARTIKEL', 'KULTUM'];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="my-10 bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xs font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
            <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
              INDEKS INFORMASI & BERITA
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
            Arsip terorganisir seluruh artikel khutbah, kultum, berita regional, dan rilis pers Hidayatullah Jakarta Barat.
          </p>
        </div>

        {/* Search input inside the index page */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Ketik kata kunci pencarian..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 pl-4 pr-10 text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all font-bold"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'Semua' ? 'Semua Artikel' : cat}
          </button>
        ))}
      </div>

      {/* Search results summary */}
      {searchQuery && (
        <p className="text-xs text-slate-500 mb-6 font-medium pl-1">
          Menampilkan {filteredNews.length} hasil untuk pencarian kata kunci: "<strong className="text-emerald-700">{searchQuery}</strong>"
        </p>
      )}

      {/* List Layout of articles */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-20 text-slate-400 font-medium">
          Tidak ditemukan artikel atau berita yang sesuai dengan kriteria filter Anda.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="flex flex-col md:flex-row gap-6 p-4 md:p-5 hover:bg-emerald-50/5 rounded-2xl border border-slate-100 hover:border-emerald-150 transition-all cursor-pointer group"
            >
              {/* Thumbnail image area */}
              <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-slate-150 shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text content area */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(article.date)}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-800 hover:text-emerald-800 transition-colors leading-snug line-clamp-1 group-hover:text-emerald-700">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2 font-medium">
                    {article.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-100 mt-3 md:mt-0 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> Oleh {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-emerald-700" /> {article.views} Kali Dibaca
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};