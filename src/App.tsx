import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { NewsSection } from './components/NewsSection';
import { GallerySection } from './components/GallerySection';
import { PagesContent } from './components/PagesContent';
import { DonationSection } from './components/DonationSection';
import { ContactSection } from './components/ContactSection';
import { JaringanSection } from './components/JaringanSection';
import { MainstreamGerakan } from './components/MainstreamGerakan';
import { IndeksSection } from './components/IndeksSection';
import { AdminDashboard } from './components/AdminDashboard';
import { HidayatullahLogo } from './components/HidayatullahLogo';
import {
  getNews,
  getGallery,
  getAllPages,
  getDonationCampaigns,
  getContactMessages,
  getDonationHistory,
  sendContactMessage,
  submitDonation,
  incrementNewsViews,
  loginAdmin,
  logoutAdmin,
  getCurrentSession,
} from './lib/api';
import { NewsItem, GalleryItem, PageContent, ContactMessage, DonationCampaign, DonationRecord } from './types';
import { Calendar, Eye, MapPin, Mail, Phone, X, ChevronRight, ArrowUp, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation tabs state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentSubTab, setCurrentSubTab] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Loading state saat ambil data dari Supabase
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>('');

  // Core entities state (diisi dari Supabase saat komponen pertama kali render)
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [campaigns, setCampaigns] = useState<DonationCampaign[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [donationHistory, setDonationHistory] = useState<DonationRecord[]>([]);

  // Admin authentication state (dicek dari Supabase session saat mount)
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Selected reading modal state
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  // Ambil semua data dari Supabase saat pertama kali komponen dimuat
  useEffect(() => {
    async function loadAllData() {
      try {
        setIsLoading(true);
        const [newsData, galleryData, pagesData, campaignsData, messagesData, donationData] = await Promise.all([
          getNews(),
          getGallery(),
          getAllPages(),
          getDonationCampaigns(),
          getContactMessages().catch(() => []), // butuh login admin untuk baca, jadi boleh gagal untuk pengunjung biasa
          getDonationHistory(),
        ]);
        setNews(newsData);
        setGallery(galleryData);
        setPages(pagesData);
        setCampaigns(campaignsData);
        setMessages(messagesData);
        setDonationHistory(donationData);
      } catch (err) {
        console.error(err);
        setLoadError('Gagal memuat data dari server. Cek koneksi internet atau konfigurasi Supabase.');
      } finally {
        setIsLoading(false);
      }
    }

    async function checkSession() {
      const session = await getCurrentSession();
      setIsAdmin(!!session);
    }

    loadAllData();
    checkSession();
  }, []);

  // Handle news/subtab switching
  const handleTabChange = (tabId: string, subTabId?: string) => {
    setCurrentTab(tabId);
    setCurrentSubTab(subTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Article selected views trigger
  const handleSelectArticle = (article: NewsItem) => {
    // Update tampilan lokal dulu (optimistic), lalu sinkron ke Supabase di background
    const updated = news.map((n) => {
      if (n.id === article.id) {
        return { ...n, views: n.views + 1 };
      }
      return n;
    });
    setNews(updated);
    setSelectedArticle({ ...article, views: article.views + 1 });

    incrementNewsViews(article.id, article.views).catch((err) =>
      console.error('Gagal update views:', err)
    );
  };

  // Add Contact Form Inquiries
  const handleAddMessage = async (name: string, email: string, phone: string, subject: string, message: string) => {
    try {
      await sendContactMessage({ name, email, phone, subject, message });
      // Tambahkan ke tampilan lokal (optimistic)
      const newMsg: ContactMessage = {
        id: String(Date.now()),
        name,
        email,
        phone,
        subject,
        message,
        date: new Date().toISOString(),
        read: false,
      };
      setMessages([newMsg, ...messages]);
    } catch (err) {
      console.error('Gagal mengirim pesan:', err);
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    }
  };

  // Add Donation contributions
  const handleAddDonation = async (campaignId: string, donorName: string, amount: number, message?: string) => {
    try {
      await submitDonation({ campaignId, donorName, amount, message });

      // Update tampilan lokal (optimistic)
      const updatedCampaigns = campaigns.map((c) => {
        if (c.id === campaignId) {
          return { ...c, raisedAmount: c.raisedAmount + amount };
        }
        return c;
      });
      setCampaigns(updatedCampaigns);

      const newRecord: DonationRecord = {
        id: String(Date.now()),
        campaignId,
        donorName,
        amount,
        date: new Date().toISOString(),
        message,
      };
      setDonationHistory([newRecord, ...donationHistory]);
    } catch (err) {
      console.error('Gagal mencatat donasi:', err);
      alert('Gagal mencatat donasi. Silakan coba lagi.');
    }
  };

  // Admin login procedure (via Supabase Auth)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await loginAdmin(adminEmail, adminPassword);
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminEmail('');
      setAdminPassword('');
    } catch (err) {
      setLoginError('Email atau password salah!');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = async () => {
    await logoutAdmin();
    setIsAdmin(false);
    if (currentTab === 'admin-dashboard') {
      setCurrentTab('home');
    }
  };

  // Utility to find page content
  const activePageObject = pages.find((p) => p.id === currentSubTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-green-100 selection:text-green-800">
      {/* Navbar header matches visual style of photo 2 */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        isAdmin={isAdmin}
        onLogout={handleAdminLogout}
        onOpenAdminLogin={() => setShowAdminLogin(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main content stage container with responsive limits */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3" />
            <p className="text-sm font-semibold">Memuat data...</p>
          </div>
        )}

        {!isLoading && loadError && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-red-600 font-bold mb-2">{loadError}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs font-bold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
            >
              Muat Ulang Halaman
            </button>
          </div>
        )}

        {!isLoading && !loadError && (
        <AnimatePresence mode="wait">
          {/* 1. HOME VIEW */}
          {currentTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Featured slide banner from image 2 */}
              <HeroSlider news={news} onSelectArticle={handleSelectArticle} />

              {/* Latest news grid & Terpopuler sidebar & WhatsApp widget */}
              <NewsSection
                news={news}
                onSelectArticle={handleSelectArticle}
                onViewAllNews={() => handleTabChange('indeks')}
              />

              {/* Activities photogallery */}
              <GallerySection galleryItems={gallery} />
            </motion.div>
          )}

          {/* 2. DYNAMIC PAGES VIEW (Tentang Kami, Orpen, Amal Usaha) */}
          {(currentTab === 'tentang-kami' || currentTab === 'orpen' || currentTab === 'amal-usaha') && activePageObject && (
            <PagesContent key={currentSubTab} page={activePageObject} />
          )}

          {/* 3. JARINGAN AREA VIEW */}
          {currentTab === 'jaringan' && (
            <JaringanSection key="jaringan-tab" />
          )}

          {/* 4. MAINSTREAM GERAKAN VIEW */}
          {currentTab === 'mainstream-gerakan' && (
            <MainstreamGerakan key="gerakan-tab" />
          )}

          {/* 5. INDEKS SEARCH VIEW */}
          {currentTab === 'indeks' && (
            <IndeksSection
              key="indeks-tab"
              news={news}
              onSelectArticle={handleSelectArticle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {/* 6. DONASI / CROWDFUNDING VIEW */}
          {currentTab === 'donasi' && (
            <DonationSection
              key="donasi-tab"
              campaigns={campaigns}
              onAddDonation={handleAddDonation}
              donationHistory={donationHistory}
            />
          )}

          {/* 7. HUBUNGI KAMI VIEW */}
          {currentTab === 'hubungi-kami' && (
            <ContactSection key="contact-tab" onAddMessage={handleAddMessage} />
          )}

          {/* 8. ADMIN DASHBOARD PANEL */}
          {currentTab === 'admin-dashboard' && isAdmin && (
            <AdminDashboard
              key="admin-tab"
              news={news}
              galleryItems={gallery}
              pages={pages}
              messages={messages}
              campaigns={campaigns}
              onUpdateNews={setNews}
              onUpdateGallery={setGallery}
              onUpdatePages={setPages}
              onUpdateMessages={setMessages}
              onUpdateCampaigns={setCampaigns}
            />
          )}
        </AnimatePresence>
        )}
      </main>

      {/* Elegant Footer area featuring organizational info */}
      <footer className="bg-slate-900 text-white mt-16 border-t-4 border-[#3f9e42] relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HidayatullahLogo className="w-10 h-10 border border-white/20 rounded-md bg-white/5 p-0.5" size={80} />
              <div>
                <h4 className="font-extrabold text-sm tracking-wider">HIDAYATULLAH</h4>
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Jakarta Barat</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Organisasi Kemasyarakatan (Ormas) Islam tingkat daerah Jakarta Barat yang berkomitmen mengokohkan peradaban Islam dan kemaslahatan kebangsaan.
            </p>

            <div className="flex gap-2">
              {isAdmin ? (
                <button
                  onClick={() => handleTabChange('admin-dashboard')}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-md transition-all uppercase tracking-widest"
                >
                  Buka Panel Admin
                </button>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="bg-white/10 hover:bg-[#3f9e42] text-white font-bold text-[10px] px-3 py-1.5 rounded-md transition-all uppercase tracking-widest border border-white/5"
                >
                  Akses Admin
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">Halaman Utama</h4>
            <ul className="space-y-2 text-gray-400 font-semibold">
              <li><button onClick={() => handleTabChange('home')} className="hover:text-green-400 transition-colors cursor-pointer">Beranda Utama</button></li>
              <li><button onClick={() => handleTabChange('jaringan')} className="hover:text-green-400 transition-colors cursor-pointer">Jaringan Daerah</button></li>
              <li><button onClick={() => handleTabChange('mainstream-gerakan')} className="hover:text-green-400 transition-colors cursor-pointer">Mainstream Gerakan</button></li>
              <li><button onClick={() => handleTabChange('indeks')} className="hover:text-green-400 transition-colors cursor-pointer">Indeks Berita</button></li>
            </ul>
          </div>

          {/* Col 3: Amal Usaha & Orpen links */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">Amal Usaha & Sayap</h4>
            <ul className="space-y-2 text-gray-400 font-semibold">
              <li><button onClick={() => handleTabChange('amal-usaha', 'rumah-quran')} className="hover:text-green-400 transition-colors cursor-pointer">Rumah Qur'an</button></li>
              <li><button onClick={() => handleTabChange('amal-usaha', 'pendidikan')} className="hover:text-green-400 transition-colors cursor-pointer">Pendidikan Integral</button></li>
              <li><button onClick={() => handleTabChange('orpen', 'pemuda-hidayatullah')} className="hover:text-green-400 transition-colors cursor-pointer">Pemuda Hidayatullah</button></li>
              <li><button onClick={() => handleTabChange('orpen', 'muslimat-hidayatullah')} className="hover:text-green-400 transition-colors cursor-pointer">Muslimat Hidayatullah</button></li>
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">Kontak Sekretariat</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                <span>Jl. Kerapu 1 No.11, RT.08/RW.021, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                <span>+62 877-5537-6499</span>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                <span>humas@hidayatullahjakbar.or.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="bg-slate-950 text-center py-5 text-[11px] text-gray-500 font-medium">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <span>© 2026 DPD Hidayatullah Jakarta Barat. All Rights Reserved.</span>
            <span>Membangun Peradaban Islam yang Agung & Berkah</span>
          </div>
        </div>

        {/* Floating Quick Scroll to Top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-6 -top-5 bg-[#3f9e42] hover:bg-green-700 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
          title="Scroll ke Atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </footer>

      {/* ARTICLE READING MODAL (Full details reading view) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-gray-150 relative max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 text-white hover:text-red-400 bg-black/40 hover:bg-black/60 p-1.5 rounded-full z-20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="h-56 md:h-72 w-full relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />
                <img
                  src={selectedArticle.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                  <span className="inline-block bg-[#3f9e42] text-white text-[9px] font-black px-2 py-0.5 rounded-sm mb-2 uppercase">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              {/* Article Content Stage */}
              <div className="p-6 md:p-8 space-y-5 text-gray-700">
                <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold border-b border-gray-100 pb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-green-600" /> {selectedArticle.date}
                  </span>
                  <span>|</span>
                  <span>Penulis: <strong className="text-gray-700">{selectedArticle.author}</strong></span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-green-600" /> {selectedArticle.views} Kali dibaca
                  </span>
                </div>

                <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-wider pl-3.5 border-l-4 border-[#3f9e42]">
                  {selectedArticle.summary}
                </p>

                <div className="text-sm text-gray-700 leading-relaxed font-medium whitespace-pre-line pt-2">
                  {selectedArticle.content}
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-1.5 px-4 rounded text-xs cursor-pointer"
                  >
                    Tutup Bacaan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN LOGIN MODAL GATE */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setShowAdminLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-gray-150 relative text-gray-800 text-xs font-semibold"
            >
              <button
                onClick={() => setShowAdminLogin(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="text-center pb-3 border-b border-gray-100">
                  <HidayatullahLogo className="w-14 h-14 mx-auto mb-2.5" size={120} />
                  <h3 className="text-base font-black text-gray-800">Login Administrator</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Kelola informasi publik dan data amal usaha</p>
                </div>

                {loginError && (
                  <div className="bg-red-50 text-red-600 p-2.5 rounded text-[11px] font-bold border border-red-100">
                    {loginError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-gray-600 font-bold">Email Admin</label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Ketik email admin"
                    className="w-full bg-gray-50 rounded-lg py-2 px-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-gray-600 font-bold">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Ketik password"
                    className="w-full bg-gray-50 rounded-lg py-2 px-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? 'Memproses...' : 'Masuk Sekarang'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}