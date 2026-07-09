import { supabase } from './supabaseClient';
import { NewsItem, GalleryItem, PageContent, ContactMessage, DonationCampaign, DonationRecord, JaringanBranch, MainstreamPillar } from '../types';

// ============ NEWS ============
export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapNewsRow);
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase.from('news').select('*').eq('id', id).single();
  if (error) return null;
  return mapNewsRow(data);
}

function mapNewsRow(row: any): NewsItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    summary: row.summary,
    content: row.content,
    imageUrl: row.image_url,
    date: row.date,
    author: row.author,
    views: row.views,
    featured: row.featured,
  };
}

// ============ GALLERY ============
export async function getGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase.from('gallery').select('*').order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    category: row.category,
    date: row.date,
  }));
}

// ============ PAGE CONTENT ============
export async function getPageContent(id: string): Promise<PageContent | null> {
  const { data, error } = await supabase.from('page_content').select('*').eq('id', id).single();
  if (error) return null;
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    sections: data.sections ?? undefined,
    lastUpdated: data.last_updated,
  };
}

export async function getAllPages(): Promise<PageContent[]> {
  const { data, error } = await supabase.from('page_content').select('*');
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    content: row.content,
    sections: row.sections ?? undefined,
    lastUpdated: row.last_updated,
  }));
}

// ============ CONTACT MESSAGE (form Hubungi Kami) ============
export async function sendContactMessage(msg: Omit<ContactMessage, 'id' | 'date' | 'read'>): Promise<void> {
  const { error } = await supabase.from('contact_messages').insert({
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
  });
  if (error) throw error;
}

// ============ DONATION CAMPAIGNS ============
export async function getDonationCampaigns(): Promise<DonationCampaign[]> {
  const { data, error } = await supabase.from('donation_campaigns').select('*');
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    targetAmount: row.target_amount,
    raisedAmount: row.raised_amount,
    imageUrl: row.image_url,
    category: row.category,
    bankAccounts: row.bank_accounts ?? [],
  }));
}

export async function submitDonation(record: Omit<DonationRecord, 'id' | 'date'>): Promise<void> {
  const { error } = await supabase.from('donation_records').insert({
    campaign_id: record.campaignId,
    donor_name: record.donorName,
    amount: record.amount,
    message: record.message,
  });
  if (error) throw error;

  // Update raised_amount di campaign terkait
  const { data: campaign } = await supabase
    .from('donation_campaigns')
    .select('raised_amount')
    .eq('id', record.campaignId)
    .single();

  if (campaign) {
    await supabase
      .from('donation_campaigns')
      .update({ raised_amount: campaign.raised_amount + record.amount })
      .eq('id', record.campaignId);
  }
}

// ============ CONTACT MESSAGES (untuk Admin Dashboard) ============
export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await supabase.from('contact_messages').select('*').order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    subject: row.subject,
    message: row.message,
    date: row.date,
    read: row.read,
  }));
}

export async function markMessageAsRead(id: string): Promise<void> {
  const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  if (error) throw error;
}

export async function deleteContactMessage(id: string): Promise<void> {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}

// ============ DONATION HISTORY (untuk Admin Dashboard) ============
export async function getDonationHistory(): Promise<DonationRecord[]> {
  const { data, error } = await supabase.from('donation_records').select('*').order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    campaignId: row.campaign_id,
    donorName: row.donor_name,
    amount: row.amount,
    date: row.date,
    message: row.message,
  }));
}

// ============ NEWS — tambahan CRUD untuk Admin Dashboard ============
export async function incrementNewsViews(id: string, currentViews: number): Promise<void> {
  const { error } = await supabase.from('news').update({ views: currentViews + 1 }).eq('id', id);
  if (error) throw error;
}

export async function createNews(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  const { data, error } = await supabase
    .from('news')
    .insert({
      title: item.title,
      category: item.category,
      summary: item.summary,
      content: item.content,
      image_url: item.imageUrl,
      date: item.date,
      author: item.author,
      views: item.views ?? 0,
      featured: item.featured ?? false,
    })
    .select()
    .single();
  if (error) throw error;
  return mapNewsRow(data);
}

export async function updateNews(item: NewsItem): Promise<void> {
  const { error } = await supabase
    .from('news')
    .update({
      title: item.title,
      category: item.category,
      summary: item.summary,
      content: item.content,
      image_url: item.imageUrl,
      date: item.date,
      author: item.author,
      featured: item.featured,
    })
    .eq('id', item.id);
  if (error) throw error;
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
}

// ============ GALLERY — tambahan CRUD ============
export async function createGalleryItem(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
  const { data, error } = await supabase
    .from('gallery')
    .insert({
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      category: item.category,
      date: item.date,
    })
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
    category: data.category,
    date: data.date,
  };
}

export async function updateGalleryItem(item: GalleryItem): Promise<void> {
  const { error } = await supabase
    .from('gallery')
    .update({
      title: item.title,
      description: item.description,
      image_url: item.imageUrl,
      category: item.category,
      date: item.date,
    })
    .eq('id', item.id);
  if (error) throw error;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) throw error;
}

// ============ PAGE CONTENT — update (upsert) ============
export async function upsertPageContent(page: PageContent): Promise<void> {
  const { error } = await supabase.from('page_content').upsert({
    id: page.id,
    title: page.title,
    subtitle: page.subtitle,
    content: page.content,
    sections: page.sections ?? null,
    last_updated: new Date().toISOString(),
  });
  if (error) throw error;
}

// ============ DONATION CAMPAIGNS — tambahan CRUD ============
export async function createCampaign(item: Omit<DonationCampaign, 'id'>): Promise<DonationCampaign> {
  const { data, error } = await supabase
    .from('donation_campaigns')
    .insert({
      title: item.title,
      description: item.description,
      target_amount: item.targetAmount,
      raised_amount: item.raisedAmount ?? 0,
      image_url: item.imageUrl,
      category: item.category,
      bank_accounts: item.bankAccounts ?? [],
    })
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    targetAmount: data.target_amount,
    raisedAmount: data.raised_amount,
    imageUrl: data.image_url,
    category: data.category,
    bankAccounts: data.bank_accounts ?? [],
  };
}

export async function updateCampaign(item: DonationCampaign): Promise<void> {
  const { error } = await supabase
    .from('donation_campaigns')
    .update({
      title: item.title,
      description: item.description,
      target_amount: item.targetAmount,
      image_url: item.imageUrl,
      category: item.category,
      bank_accounts: item.bankAccounts ?? [],
    })
    .eq('id', item.id);
  if (error) throw error;
}

export async function incrementCampaignRaised(id: string, addAmount: number): Promise<void> {
  const { data: campaign, error: fetchErr } = await supabase
    .from('donation_campaigns')
    .select('raised_amount')
    .eq('id', id)
    .single();
  if (fetchErr) throw fetchErr;

  const { error } = await supabase
    .from('donation_campaigns')
    .update({ raised_amount: campaign.raised_amount + addAmount })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteCampaign(id: string): Promise<void> {
  const { error } = await supabase.from('donation_campaigns').delete().eq('id', id);
  if (error) throw error;
}

// ============ JARINGAN DAERAH ============
export async function getJaringan(): Promise<JaringanBranch[]> {
  const { data, error } = await supabase.from('jaringan').select('*').order('name', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    phone: row.phone,
    type: row.type,
  }));
}

export async function createJaringan(item: Omit<JaringanBranch, 'id'>): Promise<JaringanBranch> {
  const { data, error } = await supabase.from('jaringan').insert(item).select().single();
  if (error) throw error;
  return { id: data.id, name: data.name, address: data.address, phone: data.phone, type: data.type };
}

export async function updateJaringan(item: JaringanBranch): Promise<void> {
  const { error } = await supabase
    .from('jaringan')
    .update({ name: item.name, address: item.address, phone: item.phone, type: item.type })
    .eq('id', item.id);
  if (error) throw error;
}

export async function deleteJaringan(id: string): Promise<void> {
  const { error } = await supabase.from('jaringan').delete().eq('id', id);
  if (error) throw error;
}

// ============ MAINSTREAM GERAKAN (Pilar) ============
export async function getMainstreamPillars(): Promise<MainstreamPillar[]> {
  const { data, error } = await supabase.from('mainstream_pillars').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapPillarRow);
}

function mapPillarRow(row: any): MainstreamPillar {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    details: row.details,
    iconKey: row.icon_key,
    colorFrom: row.color_from,
    colorTo: row.color_to,
  };
}

export async function createMainstreamPillar(item: Omit<MainstreamPillar, 'id'>, sortOrder: number): Promise<MainstreamPillar> {
  const { data, error } = await supabase
    .from('mainstream_pillars')
    .insert({
      title: item.title,
      description: item.description,
      details: item.details,
      icon_key: item.iconKey,
      color_from: item.colorFrom,
      color_to: item.colorTo,
      sort_order: sortOrder,
    })
    .select()
    .single();
  if (error) throw error;
  return mapPillarRow(data);
}

export async function updateMainstreamPillar(item: MainstreamPillar): Promise<void> {
  const { error } = await supabase
    .from('mainstream_pillars')
    .update({
      title: item.title,
      description: item.description,
      details: item.details,
      icon_key: item.iconKey,
      color_from: item.colorFrom,
      color_to: item.colorTo,
    })
    .eq('id', item.id);
  if (error) throw error;
}

export async function deleteMainstreamPillar(id: string): Promise<void> {
  const { error } = await supabase.from('mainstream_pillars').delete().eq('id', id);
  if (error) throw error;
}

// ============ ADMIN AUTH ============
export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function logoutAdmin() {
  await supabase.auth.signOut();
}

export async function getCurrentSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}