import React, { useState } from 'react';
import { HidayatullahLogo } from './HidayatullahLogo';
import { Search, Sun, Moon, Menu, X, ChevronDown, Award, BookOpen, Users, Calendar, Landmark, MapPin, SearchCode, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tabId: string, subTabId?: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
  onOpenAdminLogin: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  isAdmin,
  onLogout,
  onOpenAdminLogin,
  searchQuery,
  onSearchChange,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Menus structure
  const menus = [
    { id: 'home', label: 'Home', hasDropdown: false },
    {
      id: 'tentang-kami',
      label: 'Tentang Kami',
      hasDropdown: true,
      items: [
        { id: 'sejarah-singkat', label: 'Sejarah Singkat' },
        { id: 'visi-misi', label: 'Visi Misi' },
        { id: 'pengurus', label: 'Pengurus' },
        { id: 'program', label: 'Program' },
      ],
    },
    {
      id: 'orpen',
      label: 'Orpen',
      hasDropdown: true,
      items: [
        { id: 'pemuda-hidayatullah', label: 'Pemuda Hidayatullah' },
        { id: 'muslimat-hidayatullah', label: 'Muslimat Hidayatullah' },
      ],
    },
    { id: 'jaringan', label: 'Jaringan', hasDropdown: false },
    {
      id: 'amal-usaha',
      label: 'Amal Usaha',
      hasDropdown: true,
      items: [
        { id: 'rumah-quran', label: 'Rumah Qur\'an' },
        { id: 'pendidikan', label: 'Pendidikan' },
        { id: 'ekonomi', label: 'Ekonomi' },
        { id: 'sosial', label: 'Sosial' },
      ],
    },
    { id: 'mainstream-gerakan', label: 'Mainstream Gerakan', hasDropdown: false },
    { id: 'indeks', label: 'Indeks', hasDropdown: false },
    { id: 'hubungi-kami', label: 'Hubungi Kami', hasDropdown: false },
    { id: 'donasi', label: 'Donasi', hasDropdown: false },
  ];

  const handleMenuClick = (menuId: string, itemId?: string) => {
    if (itemId) {
      onTabChange(menuId, itemId);
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    } else {
      const menu = menus.find((m) => m.id === menuId);
      if (menu && menu.hasDropdown) {
        setActiveDropdown(activeDropdown === menuId ? null : menuId);
      } else {
        onTabChange(menuId);
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
  };

  const getIconForTab = (id: string) => {
    switch (id) {
      case 'home': return <Landmark className="w-4 h-4" />;
      case 'tentang-kami': return <Users className="w-4 h-4" />;
      case 'orpen': return <Award className="w-4 h-4" />;
      case 'jaringan': return <MapPin className="w-4 h-4" />;
      case 'amal-usaha': return <BookOpen className="w-4 h-4" />;
      case 'mainstream-gerakan': return <Calendar className="w-4 h-4" />;
      case 'indeks': return <SearchCode className="w-4 h-4" />;
      case 'donasi': return <DollarSign className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <header className="w-full shadow-md z-40 relative font-sans">
      {/* 1. Top Bar utility info (from Sleek Theme Design HTML) */}
      <div className="bg-emerald-950 text-emerald-300/90 text-[10px] md:text-[11px] py-2 px-4 md:px-8 border-b border-emerald-900/40 flex flex-col sm:flex-row justify-between items-center font-mono gap-1.5">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">📍 Sekretariat DPD Jakbar: Jl. Kerapu 1 No.11, RT.08/RW.021, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450</span>
          <span>✉️ humas@hidayatullahjakbar.or.id</span>
        </div>
        <div className="flex items-center gap-3">
          <span>DPD JAKARTA BARAT</span>
          <span className="text-amber-400 font-black">•</span>
        </div>
      </div>

      {/* 2. Brand bar header with custom premium gradients */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-emerald-800">
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          <HidayatullahLogo className="w-12 h-12 md:w-14 md:h-14 drop-shadow-md transition-transform duration-300 group-hover:scale-105" size={140} />
          <div>
            <h1 className="font-display font-extrabold text-xl md:text-2xl tracking-tight leading-none uppercase">HIDAYATULLAH</h1>
            <p className="text-[10px] md:text-xs text-amber-400 font-bold uppercase tracking-widest mt-1">Wilayah kota Jakarta Barat</p>
          </div>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Telusuri berita & kajian..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentTab !== 'indeks' && e.target.value) {
                  onTabChange('indeks');
                }
              }}
              className="w-full bg-emerald-950/40 text-white placeholder-emerald-300/60 rounded-full py-1.5 pl-4 pr-10 text-xs border border-emerald-700/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-emerald-950/80 transition-all font-medium"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-300/60" />
          </div>

          {/* Theme Toggle Button (Aesthetic) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-emerald-800/60 text-white transition-colors"
            title="Toggle Tema"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-emerald-300" />}
          </button>

          {/* Admin Status Button */}
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-[9px] bg-red-600 text-white font-extrabold px-2 py-1 rounded-md tracking-wider">
                ADMIN MODE
              </span>
              <button
                onClick={onLogout}
                className="bg-amber-400 hover:bg-amber-500 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminLogin}
              className="bg-emerald-800/50 hover:bg-emerald-800/85 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all border border-emerald-700/40"
            >
              Login Admin
            </button>
          )}

          {/* Mobile Hamburg menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-emerald-800/60 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Sleek white navigation bar for 9 menus */}
      <nav className="hidden md:block bg-white border-b border-slate-150 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center lg:justify-between h-14">
            <ul className="flex items-center gap-1 lg:gap-1.5">
              {menus.map((menu) => {
                const isActive = currentTab === menu.id;
                return (
                  <li
                    key={menu.id}
                    className="relative"
                    onMouseEnter={() => menu.hasDropdown && setActiveDropdown(menu.id)}
                    onMouseLeave={() => menu.hasDropdown && setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => handleMenuClick(menu.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-emerald-800 bg-emerald-50/60 border-b-2 border-emerald-600 shadow-xs'
                          : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="opacity-70 group-hover:opacity-100">{getIconForTab(menu.id)}</span>
                      <span>{menu.label}</span>
                      {menu.hasDropdown && (
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      )}
                    </button>

                    {/* Dropdown menu */}
                    <AnimatePresence>
                      {menu.hasDropdown && activeDropdown === menu.id && (
                        <motion.ul
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 text-left"
                        >
                          {menu.items?.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                onClick={() => handleMenuClick(menu.id, subItem.id)}
                                className="w-full text-left px-4.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-all border-b border-slate-50/50 last:border-0"
                              >
                                {subItem.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (responsive drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-inner max-h-[85vh] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {menus.map((menu) => {
                const isActive = currentTab === menu.id;
                return (
                  <div key={menu.id} className="border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                    <button
                      onClick={() => handleMenuClick(menu.id)}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {getIconForTab(menu.id)}
                        {menu.label}
                      </span>
                      {menu.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                    </button>

                    {menu.hasDropdown && (
                      <div className="pl-6 mt-1 space-y-1">
                        {menu.items?.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleMenuClick(menu.id, subItem.id)}
                            className="w-full text-left py-1.5 px-3 text-xs font-semibold text-slate-600 hover:text-emerald-800 border-l-2 border-slate-200 pl-4 hover:border-emerald-600 transition-all block animate-none"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
