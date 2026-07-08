import React, { useState } from 'react';
import { NewsItem, GalleryItem, PageContent, ContactMessage, DonationCampaign, BankAccount } from '../types';
import {
  createNews,
  updateNews,
  deleteNews,
  createGalleryItem,
  deleteGalleryItem,
  upsertPageContent,
  markMessageAsRead,
  deleteContactMessage,
  incrementCampaignRaised,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../lib/api';
import {
  Plus,
  Trash2,
  Edit3,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  DollarSign,
  Save,
  Check,
  ChevronRight,
  BookOpen,
  User,
  ExternalLink,
  Eye,
  Activity,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  news: NewsItem[];
  galleryItems: GalleryItem[];
  pages: PageContent[];
  messages: ContactMessage[];
  campaigns: DonationCampaign[];
  onUpdateNews: (updatedNews: NewsItem[]) => void;
  onUpdateGallery: (updatedGallery: GalleryItem[]) => void;
  onUpdatePages: (updatedPages: PageContent[]) => void;
  onUpdateMessages: (updatedMessages: ContactMessage[]) => void;
  onUpdateCampaigns: (updatedCampaigns: DonationCampaign[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  news,
  galleryItems,
  pages,
  messages,
  campaigns,
  onUpdateNews,
  onUpdateGallery,
  onUpdatePages,
  onUpdateMessages,
  onUpdateCampaigns,
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'gallery' | 'pages' | 'messages' | 'donations'>('news');

  // Article form state
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState<Omit<NewsItem, 'id' | 'views'>>({
    title: '',
    category: 'BERITA',
    summary: '',
    content: '',
    imageUrl: '',
    date: new Date().toISOString().slice(0, 10),
    author: 'Admin Hidayatullah',
    featured: false,
  });

  // Gallery form state
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Dakwah',
    date: new Date().toISOString().slice(0, 10),
  });

  // Donation campaign form state
  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState<string | null>(null);
  const [campaignForm, setCampaignForm] = useState<Omit<DonationCampaign, 'id' | 'raisedAmount'>>({
    title: '',
    description: '',
    targetAmount: 10000000,
    imageUrl: '',
    category: 'Sosial',
    bankAccounts: [],
  });

  // Page editor state
  const [selectedPageId, setSelectedPageId] = useState<string>('sejarah-singkat');
  const [editingPageTitle, setEditingPageTitle] = useState('');
  const [editingPageSubtitle, setEditingPageSubtitle] = useState('');
  const [editingPageContent, setEditingPageContent] = useState('');
  const [editingPageSections, setEditingPageSections] = useState<{ title: string; content: string }[]>([]);
  const [pageSaveSuccess, setPageSaveSuccess] = useState(false);

  // Initialize Page Editor fields when selectedPageId changes or on load
  const loadPageToEdit = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      setSelectedPageId(pageId);
      setEditingPageTitle(page.title);
      setEditingPageSubtitle(page.subtitle);
      setEditingPageContent(page.content);
      setEditingPageSections(page.sections || []);
    }
  };

  React.useEffect(() => {
    loadPageToEdit(selectedPageId);
  }, [selectedPageId]);

  // Handle News CRUD
  const handleOpenNewArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: 'BERITA',
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      date: new Date().toISOString().slice(0, 10),
      author: 'Admin Hidayatullah',
      featured: false,
    });
    setIsArticleFormOpen(true);
  };

  const handleOpenEditArticle = (art: NewsItem) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      summary: art.summary,
      content: art.content,
      imageUrl: art.imageUrl,
      date: art.date,
      author: art.author,
      featured: art.featured,
    });
    setIsArticleFormOpen(true);
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      try {
        await deleteNews(id);
        onUpdateNews(news.filter((n) => n.id !== id));
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus berita. Silakan coba lagi.');
      }
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticleId) {
        // Edit
        const original = news.find((n) => n.id === editingArticleId);
        const updatedItem: NewsItem = {
          id: editingArticleId,
          views: original?.views ?? 0,
          ...articleForm,
        };
        await updateNews(updatedItem);
        const updated = news.map((n) => (n.id === editingArticleId ? updatedItem : n));
        onUpdateNews(updated);
      } else {
        // Create — pakai id asli yang dikembalikan Supabase
        const created = await createNews({ ...articleForm, views: 0 });
        onUpdateNews([created, ...news]);
      }
      setIsArticleFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan berita. Silakan coba lagi.');
    }
  };

  // Handle Gallery CRUD
  const handleOpenNewGallery = () => {
    setGalleryForm({
      title: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      category: 'Dakwah',
      date: new Date().toISOString().slice(0, 10),
    });
    setIsGalleryFormOpen(true);
  };

  const handleDeleteGallery = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto kegiatan ini?')) {
      try {
        await deleteGalleryItem(id);
        onUpdateGallery(galleryItems.filter((g) => g.id !== id));
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus foto. Silakan coba lagi.');
      }
    }
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await createGalleryItem(galleryForm);
      onUpdateGallery([created, ...galleryItems]);
      setIsGalleryFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan foto. Silakan coba lagi.');
    }
  };

  // Handle Pages Content Update
  const handleSavePageContent = async () => {
    const updatedPage: PageContent = {
      id: selectedPageId,
      title: editingPageTitle,
      subtitle: editingPageSubtitle,
      content: editingPageContent,
      sections: editingPageSections,
      lastUpdated: new Date().toISOString(),
    };
    try {
      await upsertPageContent(updatedPage);
      const updated = pages.map((p) => (p.id === selectedPageId ? updatedPage : p));
      onUpdatePages(updated);
      setPageSaveSuccess(true);
      setTimeout(() => setPageSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan halaman. Silakan coba lagi.');
    }
  };

  // Handle Page Section item additions/removals
  const handleAddPageSection = () => {
    setEditingPageSections([...editingPageSections, { title: 'Judul Sub-Seksi Baru', content: 'Isi konten sub-seksi baru...' }]);
  };

  const handleRemovePageSection = (index: number) => {
    setEditingPageSections(editingPageSections.filter((_, idx) => idx !== index));
  };

  const handlePageSectionChange = (index: number, field: 'title' | 'content', value: string) => {
    const updated = editingPageSections.map((sec, idx) => {
      if (idx === index) {
        return { ...sec, [field]: value };
      }
      return sec;
    });
    setEditingPageSections(updated);
  };

  // Handle Messages Actions
  const handleMarkMessageRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
      onUpdateMessages(updated);
    } catch (err) {
      console.error(err);
      alert('Gagal menandai pesan. Silakan coba lagi.');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      try {
        await deleteContactMessage(id);
        onUpdateMessages(messages.filter((m) => m.id !== id));
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus pesan. Silakan coba lagi.');
      }
    }
  };

  // Donation update
  const handleAddSimulatedDonation = async (campId: string) => {
    const donationAmount = 100000;
    try {
      await incrementCampaignRaised(campId, donationAmount);
      const updatedCamp = campaigns.map((c) =>
        c.id === campId ? { ...c, raisedAmount: c.raisedAmount + donationAmount } : c
      );
      onUpdateCampaigns(updatedCamp);
    } catch (err) {
      console.error(err);
      alert('Gagal update donasi. Silakan coba lagi.');
    }
  };

  // Handle Donation Campaign CRUD
  const handleOpenNewCampaign = () => {
    setEditingCampaignId(null);
    setCampaignForm({
      title: '',
      description: '',
      targetAmount: 10000000,
      imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80',
      category: 'Sosial',
      bankAccounts: [],
    });
    setIsCampaignFormOpen(true);
  };

  const handleOpenEditCampaign = (camp: DonationCampaign) => {
    setEditingCampaignId(camp.id);
    setCampaignForm({
      title: camp.title,
      description: camp.description,
      targetAmount: camp.targetAmount,
      imageUrl: camp.imageUrl,
      category: camp.category,
      bankAccounts: camp.bankAccounts ?? [],
    });
    setIsCampaignFormOpen(true);
  };

  // Kelola daftar rekening bank di dalam form (bisa lebih dari satu)
  const handleAddBankAccount = () => {
    setCampaignForm({
      ...campaignForm,
      bankAccounts: [
        ...campaignForm.bankAccounts,
        { bankName: '', accountNumber: '', accountHolder: 'DPD Hidayatullah Jakbar' },
      ],
    });
  };

  const handleRemoveBankAccount = (index: number) => {
    setCampaignForm({
      ...campaignForm,
      bankAccounts: campaignForm.bankAccounts.filter((_, idx) => idx !== index),
    });
  };

  const handleBankAccountChange = (index: number, field: keyof BankAccount, value: string) => {
    const updated = campaignForm.bankAccounts.map((acc, idx) =>
      idx === index ? { ...acc, [field]: value } : acc
    );
    setCampaignForm({ ...campaignForm, bankAccounts: updated });
  };

  const handleDeleteCampaign = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kampanye donasi ini? Riwayat donasi terkait juga akan terhapus.')) {
      try {
        await deleteCampaign(id);
        onUpdateCampaigns(campaigns.filter((c) => c.id !== id));
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus kampanye. Silakan coba lagi.');
      }
    }
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCampaignId) {
        // Edit
        const original = campaigns.find((c) => c.id === editingCampaignId);
        const updatedItem: DonationCampaign = {
          id: editingCampaignId,
          raisedAmount: original?.raisedAmount ?? 0,
          ...campaignForm,
        };
        await updateCampaign(updatedItem);
        onUpdateCampaigns(campaigns.map((c) => (c.id === editingCampaignId ? updatedItem : c)));
      } else {
        // Create — pakai id asli yang dikembalikan Supabase
        const created = await createCampaign({ ...campaignForm, raisedAmount: 0 });
        onUpdateCampaigns([created, ...campaigns]);
      }
      setIsCampaignFormOpen(false);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan kampanye. Silakan coba lagi.');
    }
  };

  return (
    <div className="my-8 bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-10 text-slate-800 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-5 bg-slate-900 block rounded-full" />
            <h2 className="text-xl md:text-2xl font-black font-display tracking-tight text-slate-900 uppercase">
              DASHBOARD ADMIN HIDAYATULLAH
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-semibold pl-4 mt-1 leading-relaxed">
            Portal Administrasi Pengelolaan Konten Website DPD Hidayatullah Jakarta Barat
          </p>
        </div>

        <div className="text-xs text-slate-400 font-extrabold uppercase tracking-widest mt-3 md:mt-0 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" /> Status: <span className="text-emerald-600">Online & Terhubung</span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-150 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
            activeTab === 'news'
              ? 'bg-slate-950 text-white border border-slate-950 shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Manajemen Berita ({news.length})
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
            activeTab === 'gallery'
              ? 'bg-slate-950 text-white border border-slate-950 shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Galeri Kegiatan ({galleryItems.length})
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
            activeTab === 'pages'
              ? 'bg-slate-950 text-white border border-slate-950 shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kelola Halaman Menu
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
            activeTab === 'messages'
              ? 'bg-slate-950 text-white border border-slate-950 shadow-xs relative'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Pesan Humas ({messages.length})
          {messages.some((m) => !m.read) && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
            activeTab === 'donations'
              ? 'bg-slate-950 text-white border border-slate-950 shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Kampanye Donasi ({campaigns.length})
        </button>
      </div>

      {/* Tab: NEWS */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-display font-black text-slate-800 uppercase tracking-wider">Daftar Berita & Artikel</h3>
            <button
              onClick={handleOpenNewArticle}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Berita Baru
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 font-extrabold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Info Berita</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Oleh</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                {news.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex gap-3 items-center">
                        <img
                          src={art.imageUrl}
                          alt=""
                          className="w-12 h-10 object-cover rounded-md bg-slate-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-sm text-slate-800 line-clamp-1">{art.title}</h4>
                          <span className="text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">ID: {art.id} {art.featured && '★ Unggulan'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 font-extrabold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-md">
                        {art.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-mono">{art.date}</td>
                    <td className="p-4 text-slate-500">{art.author}</td>
                    <td className="p-4 text-slate-500 font-mono flex items-center gap-1 mt-2.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" /> {art.views}
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenEditArticle(art)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all cursor-pointer inline-flex"
                        title="Edit Berita"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 text-red-550 hover:bg-red-50 rounded transition-all cursor-pointer inline-flex"
                        title="Hapus Berita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-display font-black text-slate-800 uppercase tracking-wider">Daftar Galeri Kegiatan</h3>
            <button
              onClick={handleOpenNewGallery}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Foto Kegiatan
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-150 flex flex-col justify-between hover:border-emerald-250 hover:bg-emerald-50/5 transition-all"
              >
                <div>
                  <div className="h-40 overflow-hidden bg-slate-200 relative">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-extrabold text-sm text-slate-800 line-clamp-1 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between font-mono">
                  <span className="text-[10px] text-slate-400 font-bold">{item.date}</span>
                  <button
                    onClick={() => handleDeleteGallery(item.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                    title="Hapus Foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: PAGES */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih Halaman Menu:</span>
              <select
                value={selectedPageId}
                onChange={(e) => loadPageToEdit(e.target.value)}
                className="bg-slate-50 text-slate-800 rounded-lg py-1.5 px-3 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.id})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSavePageContent}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-2.5 px-5 rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer self-end"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan Halaman
            </button>
          </div>

          {pageSaveSuccess && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4" /> Perubahan pada halaman "{pages.find(p=>p.id===selectedPageId)?.title}" sukses disimpan dan aktif!
            </div>
          )}

          {/* Page Editor Form */}
          <div className="space-y-5 text-slate-700 text-xs font-semibold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Judul Utama Halaman</label>
                <input
                  type="text"
                  value={editingPageTitle}
                  onChange={(e) => setEditingPageTitle(e.target.value)}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-950 font-bold text-sm text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Sub-judul / Slogan Halaman</label>
                <input
                  type="text"
                  value={editingPageSubtitle}
                  onChange={(e) => setEditingPageSubtitle(e.target.value)}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-950 font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block font-bold text-slate-700">Isi Pengantar / Konten Utama Halaman</label>
              <textarea
                rows={6}
                value={editingPageContent}
                onChange={(e) => setEditingPageContent(e.target.value)}
                className="w-full bg-slate-50 rounded-lg p-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-950 resize-none font-medium text-slate-800 text-xs md:text-sm leading-relaxed"
              />
            </div>

            {/* Sections editor */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-slate-800">Daftar Sub-Seksi Tambahan / Pengurus / Detail</h4>
                <button
                  type="button"
                  onClick={handleAddPageSection}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Sub-Seksi Baru
                </button>
              </div>

              <div className="space-y-4">
                {editingPageSections.map((section, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-50/55 rounded-2xl border border-slate-200 relative group/sec space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => handleRemovePageSection(index)}
                      className="absolute top-3 right-3 text-red-500 hover:bg-red-100 p-1 rounded-full transition-colors cursor-pointer opacity-80 group-hover/sec:opacity-100"
                      title="Hapus Sub-Seksi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-11/12 space-y-1.5">
                      <label className="block font-bold text-slate-600">Sub-Judul Seksi ({index + 1})</label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handlePageSectionChange(index, 'title', e.target.value)}
                        className="w-full bg-white rounded p-1.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-950 font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-bold text-slate-600">Isi Konten Seksi ({index + 1})</label>
                      <textarea
                        rows={3}
                        value={section.content}
                        onChange={(e) => handlePageSectionChange(index, 'content', e.target.value)}
                        className="w-full bg-white rounded p-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-950 font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-xs font-display font-black text-slate-800 uppercase tracking-wider">Pesan Masuk Hubungan Masyarakat</h3>

          {messages.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-xs font-medium">
              Belum ada pesan masuk di dalam kotak masuk humas.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all text-xs text-slate-600 space-y-3 ${
                    msg.read ? 'bg-slate-50/70 border-slate-150' : 'bg-amber-50/10 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-2">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                        {msg.subject}
                        {!msg.read && (
                          <span className="bg-amber-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-md animate-pulse">
                            BARU
                          </span>
                        )}
                      </h4>
                      <p className="text-slate-400 mt-1 font-semibold text-[10px]">
                        Dari: <strong className="text-slate-700">{msg.name}</strong> ({msg.email} | {msg.phone})
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold font-mono">{msg.date}</span>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkMessageRead(msg.id)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-1 px-2.5 rounded-md text-[10px] transition-colors cursor-pointer"
                        >
                          Tandai Dibaca
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors cursor-pointer"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="p-3 bg-white border border-slate-150 rounded-lg text-slate-700 text-xs leading-relaxed font-medium whitespace-pre-line">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: DONATIONS */}
      {activeTab === 'donations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-display font-black text-slate-800 uppercase tracking-wider">Manajemen Kampanye Donasi</h3>
            <button
              onClick={handleOpenNewCampaign}
              className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tambah Kampanye Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((camp) => {
              const progressPercentage = Math.min(
                100,
                Math.round((camp.raisedAmount / camp.targetAmount) * 100)
              );

              return (
                <div
                  key={camp.id}
                  className="p-5 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-4"
                >
                  <div>
                    <span className="inline-block bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-2">
                      {camp.category}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-800 line-clamp-1">{camp.title}</h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-slate-500">
                      <span>Terkumpul:</span>
                      <span className="text-emerald-700">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(camp.raisedAmount)}
                      </span>
                    </div>

                    <div className="flex justify-between font-bold text-slate-500">
                      <span>Target:</span>
                      <span className="text-slate-800">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(camp.targetAmount)}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-150 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center font-mono">
                    <span className="text-[10px] text-slate-400 font-extrabold">{progressPercentage}% Terpenuhi</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAddSimulatedDonation(camp.id)}
                        className="bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
                        title="Simulasi Donasi Masuk"
                      >
                        <Plus className="w-3.5 h-3.5" /> +100rb
                      </button>
                      <button
                        onClick={() => handleOpenEditCampaign(camp)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-all cursor-pointer inline-flex"
                        title="Edit Kampanye"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCampaign(camp.id)}
                        className="p-1.5 text-red-550 hover:bg-red-50 rounded transition-all cursor-pointer inline-flex"
                        title="Hapus Kampanye"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}      {/* ARTICLE CREATE/EDIT FORM MODAL */}
      {isArticleFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto text-xs font-semibold text-slate-700 font-sans">
            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">
                  {editingArticleId ? 'Edit Artikel / Berita' : 'Buat Artikel / Berita Baru'}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Judul Berita</label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Kategori</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold cursor-pointer"
                  >
                    <option value="BERITA">BERITA</option>
                    <option value="ARTIKEL">ARTIKEL</option>
                    <option value="KULTUM">KULTUM</option>
                    <option value="PENGUMUMAN">PENGUMUMAN</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Penulis / Sumber</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Tanggal Terbit</label>
                  <input
                    type="text"
                    value={articleForm.date}
                    onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">URL Foto Cover</label>
                <input
                  type="url"
                  value={articleForm.imageUrl}
                  onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Ringkasan Singkat (Summary)</label>
                <input
                  type="text"
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Isi Konten Berita Lengkap</label>
                <textarea
                  rows={6}
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-medium leading-relaxed text-xs"
                  required
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="featured-art"
                  checked={articleForm.featured}
                  onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 focus:ring-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="featured-art" className="text-slate-700 font-bold cursor-pointer">
                  Jadikan Berita Utama / Masuk Slide Banner Depan
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsArticleFormOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-2 px-5 rounded-lg shadow-xs cursor-pointer"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY CREATE FORM MODAL */}
      {isGalleryFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-xs font-semibold text-slate-700 font-sans">
            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Tambah Foto Galeri Baru</h3>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Judul Kegiatan</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Kategori</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold cursor-pointer"
                  >
                    <option value="Dakwah">Dakwah</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Sosial">Sosial</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Kepemudaan">Kepemudaan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Tanggal Kegiatan</label>
                  <input
                    type="text"
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">URL Foto</label>
                <input
                  type="url"
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-medium text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsGalleryFormOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg cursor-pointer"
                  style={{ contentVisibility: 'auto' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-2 px-5 rounded-lg shadow-xs cursor-pointer"
                >
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DONATION CAMPAIGN CREATE/EDIT FORM MODAL */}
      {isCampaignFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto text-xs font-semibold text-slate-700 font-sans">
            <form onSubmit={handleSaveCampaign} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">
                  {editingCampaignId ? 'Edit Kampanye Donasi' : 'Buat Kampanye Donasi Baru'}
                </h3>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Judul Kampanye</label>
                <input
                  type="text"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Kategori</label>
                  <input
                    type="text"
                    value={campaignForm.category}
                    onChange={(e) => setCampaignForm({ ...campaignForm, category: e.target.value })}
                    placeholder="Contoh: Sosial, Pendidikan, Dakwah"
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold">Target Donasi (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    value={campaignForm.targetAmount}
                    onChange={(e) => setCampaignForm({ ...campaignForm, targetAmount: Number(e.target.value) })}
                    className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">URL Foto Kampanye</label>
                <input
                  type="url"
                  value={campaignForm.imageUrl}
                  onChange={(e) => setCampaignForm({ ...campaignForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-bold">Deskripsi Kampanye</label>
                <textarea
                  rows={4}
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                  className="w-full bg-slate-50 rounded-lg p-2.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none font-medium leading-relaxed text-xs"
                  required
                />
              </div>

              {/* Rekening Bank (bisa lebih dari satu) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-700 font-bold">Rekening Donasi (bisa lebih dari satu)</label>
                  <button
                    type="button"
                    onClick={handleAddBankAccount}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Rekening
                  </button>
                </div>

                {campaignForm.bankAccounts.length === 0 && (
                  <p className="text-[10px] text-slate-400 italic">
                    Belum ada rekening ditambahkan. Klik "Tambah Rekening" untuk menambahkan nomor rekening donasi.
                  </p>
                )}

                <div className="space-y-3">
                  {campaignForm.bankAccounts.map((acc, index) => (
                    <div
                      key={index}
                      className="p-3.5 bg-slate-50/60 rounded-xl border border-slate-200 relative space-y-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveBankAccount(index)}
                        className="absolute top-2.5 right-2.5 text-red-500 hover:bg-red-100 p-1 rounded-full transition-colors cursor-pointer"
                        title="Hapus Rekening Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pr-7">
                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold text-[10px]">Nama Bank</label>
                          <input
                            type="text"
                            value={acc.bankName}
                            onChange={(e) => handleBankAccountChange(index, 'bankName', e.target.value)}
                            placeholder="Contoh: BSI (Syariah Mandiri)"
                            className="w-full bg-white rounded p-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold text-xs"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-slate-600 font-bold text-[10px]">Nomor Rekening</label>
                          <input
                            type="text"
                            value={acc.accountNumber}
                            onChange={(e) => handleBankAccountChange(index, 'accountNumber', e.target.value)}
                            placeholder="Contoh: 701.234.5678"
                            className="w-full bg-white rounded p-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono font-bold text-xs"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1 pr-7">
                        <label className="block text-slate-600 font-bold text-[10px]">Atas Nama</label>
                        <input
                          type="text"
                          value={acc.accountHolder}
                          onChange={(e) => handleBankAccountChange(index, 'accountHolder', e.target.value)}
                          placeholder="Contoh: DPD Hidayatullah Jakbar"
                          className="w-full bg-white rounded p-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 font-bold text-xs"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {editingCampaignId && (
                <p className="text-[10px] text-slate-400 font-medium italic">
                  Catatan: jumlah dana yang sudah terkumpul (raised amount) tidak diubah lewat form ini — gunakan tombol "+100rb" untuk simulasi, atau dana akan otomatis bertambah saat ada donasi masuk dari pengunjung.
                </p>
              )}

              <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCampaignFormOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-850 text-white font-bold py-2 px-5 rounded-lg shadow-xs cursor-pointer"
                >
                  Simpan Kampanye
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};