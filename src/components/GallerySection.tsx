import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { formatDate } from '../lib/dateUtils';
import { Calendar, Tag, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Dakwah', 'Pendidikan', 'Sosial', 'Ekonomi', 'Kepemudaan'];

  const filteredItems = selectedCategory === 'Semua'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    // Find index in filtered items to scroll correctly
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <div className="my-10 bg-slate-50/50 rounded-2xl p-6 md:p-10 border border-slate-100 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-5 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
            <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
              GALERI KEGIATAN
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
            Dokumentasi khidmat perjuangan dan kegiatan ormas Hidayatullah Jakarta Barat
          </p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of gallery pictures */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-xs font-medium">
          Belum ada foto kegiatan untuk kategori ini.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-slate-100 cursor-pointer h-72"
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Overlay with details on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-md mb-2.5">
                      <Tag className="w-2.5 h-2.5" />
                      {item.category}
                    </span>
                    <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-amber-350 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 line-clamp-2 mb-2 font-normal leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        {formatDate(item.date)}
                      </span>
                      <span className="text-white/80 group-hover:text-amber-400 flex items-center gap-1 font-semibold transition-colors">
                        <ZoomIn className="w-3.5 h-3.5" /> Lihat Detail
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox / Slideshow View */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full z-55 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Left */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-emerald-600 p-3 rounded-full z-55 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Card */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row h-[80vh] max-h-[600px]"
            >
              {/* Left Photo area */}
              <div className="flex-1 bg-black flex items-center justify-center relative h-1/2 md:h-full">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right text sidebar */}
              <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-slate-950 text-white border-t md:border-t-0 md:border-l border-white/10">
                <div className="space-y-4 font-sans">
                  <span className="inline-block bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-white leading-snug">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-slate-400 font-sans">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Tanggal Kegiatan: <strong className="text-white">{formatDate(filteredItems[lightboxIndex].date)}</strong></span>
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-4">
                    Dokumentasi Hidayatullah Jabar
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nav Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-emerald-600 p-3 rounded-full z-55 transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};