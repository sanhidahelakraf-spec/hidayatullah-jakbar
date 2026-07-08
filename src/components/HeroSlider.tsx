import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { NewsItem } from '../types';
import { formatDate } from '../lib/dateUtils';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSliderProps {
  news: NewsItem[];
  onSelectArticle: (article: NewsItem) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ news, onSelectArticle }) => {
  const featuredArticles = news.filter((item) => item.featured || item.category === 'ARTIKEL').slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || featuredArticles.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, featuredArticles.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredArticles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredArticles.length - 1 ? 0 : prev + 1));
  };

  if (featuredArticles.length === 0) return null;

  const current = featuredArticles[currentIndex];

  return (
    <div
      className="relative w-full h-[320px] md:h-[480px] bg-slate-950 rounded-2xl overflow-hidden shadow-xl group/slider border border-slate-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onSelectArticle(current)}
        >
          {/* Background Image with elegant gradient cover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent z-10" />
          <img
            src={current.imageUrl}
            alt={current.title}
            className="w-full h-full object-cover transform scale-100 group-hover/slider:scale-103 transition-transform duration-[2000ms]"
            referrerPolicy="no-referrer"
          />
 
          {/* Slide Text Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 text-white">
            <span className="inline-block bg-amber-400 text-emerald-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-md mb-3.5 tracking-wider">
              {current.category}
            </span>
            <h2 className="text-xl md:text-3xl font-display font-extrabold tracking-tight mb-3 hover:text-amber-300 transition-colors line-clamp-2 md:line-clamp-3">
              {current.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 line-clamp-2 mb-4 max-w-3xl hidden md:block leading-relaxed">
              {current.summary}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {formatDate(current.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                {current.author}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
 
      {/* Slide Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-emerald-600 text-white p-2.5 rounded-full z-30 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-xs border border-white/10 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-emerald-600 text-white p-2.5 rounded-full z-30 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 backdrop-blur-xs border border-white/10 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
 
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {featuredArticles.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              index === currentIndex ? 'bg-amber-400 w-6' : 'bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};