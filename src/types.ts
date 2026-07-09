export interface NewsItem {
  id: string;
  title: string;
  category: 'BERITA' | 'ARTIKEL' | 'KULTUM' | 'PENGUMUMAN';
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  views: number;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Dakwah' | 'Pendidikan' | 'Sosial' | 'Ekonomi' | 'Kepemudaan';
  date: string;
}

export interface PageContent {
  id: string; // e.g. 'sejarah-singkat', 'visi-misi', 'pengurus', 'program', 'pemuda-hidayatullah', 'muslimat-hidayatullah', 'rumah-quran', 'pendidikan', 'ekonomi', 'sosial'
  title: string;
  subtitle: string;
  content: string;
  sections?: { title: string; content: string }[];
  lastUpdated: string;
}

export interface JaringanBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: string;
}

// Daftar kunci ikon yang tersedia untuk dipilih admin (dipetakan ke komponen Lucide di frontend)
export type MainstreamIconKey =
  | 'compass' | 'book-open' | 'heart' | 'users'
  | 'award' | 'shield-alert' | 'sparkles' | 'star'
  | 'building' | 'globe';

export interface MainstreamPillar {
  id: string;
  title: string;
  description: string;
  details: string;
  iconKey: MainstreamIconKey;
  colorFrom: string; // hex, contoh: "#065f46"
  colorTo: string;   // hex, contoh: "#022c22"
}
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface BankAccount {
  bankName: string;      // contoh: "BSI (Syariah Mandiri)"
  accountNumber: string; // contoh: "701.234.5678"
  accountHolder: string; // contoh: "DPD Hidayatullah Jakbar"
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  imageUrl: string;
  category: string;
  bankAccounts: BankAccount[];
}

export interface DonationRecord {
  id: string;
  campaignId: string;
  donorName: string;
  amount: number;
  date: string;
  message?: string;
}