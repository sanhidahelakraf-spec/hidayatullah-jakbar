import React, { useState } from 'react';
import { DonationCampaign, DonationRecord } from '../types';
import { formatDate } from '../lib/dateUtils';
import { Heart, Landmark, Sparkles, User, Users, Copy, MessageCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DonationSectionProps {
  campaigns: DonationCampaign[];
  onAddDonation: (campaignId: string, donorName: string, amount: number, message?: string) => void;
  donationHistory: DonationRecord[];
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  campaigns,
  onAddDonation,
  donationHistory,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<DonationCampaign | null>(null);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState<number>(50000);
  const [message, setMessage] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [lastDonation, setLastDonation] = useState<{ donorName: string; amount: number; campaignTitle: string } | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const WHATSAPP_NUMBER = '6287755376499'; // Nomor WA Humas DPD Hidayatullah Jakbar

  const handleCopyAccountNumber = (accNumber: string, index: number) => {
    navigator.clipboard.writeText(accNumber.replace(/\D/g, ''));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const predefinedAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const finalDonorName = donorName || 'Hamba Allah';

    onAddDonation(
      selectedCampaign.id,
      finalDonorName,
      amount,
      message
    );

    setLastDonation({
      donorName: finalDonorName,
      amount,
      campaignTitle: selectedCampaign.title,
    });

    setDonationSuccess(true);
    setTimeout(() => {
      setDonationSuccess(false);
      setSelectedCampaign(null);
      setDonorName('');
      setAmount(50000);
      setMessage('');
    }, 3000);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const buildWhatsAppConfirmLink = () => {
    if (!lastDonation) return '#';
    const text = `Assalamu'alaikum, saya ${lastDonation.donorName} baru saja melakukan donasi sebesar ${formatRupiah(lastDonation.amount)} untuk program "${lastDonation.campaignTitle}". Berikut saya lampirkan bukti transfernya. Jazaakumullahu khairan.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="my-10">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
          <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
            DONASI PEDULI UMAT
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
          Salurkan infak, sedekah, dan wakaf terbaik Anda untuk program dakwah, pendidikan, dan sosial kemanusiaan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle: Campaigns Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => {
              const progressPercentage = Math.min(
                100,
                Math.round((camp.raisedAmount / camp.targetAmount) * 100)
              );

              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="h-48 overflow-hidden relative">
                    <span className="absolute top-3 left-3 bg-emerald-850/95 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
                      {camp.category}
                    </span>
                    <img
                      src={camp.imageUrl}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-slate-800 line-clamp-2 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                        {camp.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed font-medium">
                        {camp.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center text-xs text-slate-600 mb-1 font-bold">
                          <span>Kolektif: {progressPercentage}%</span>
                          <span>Target: {formatRupiah(camp.targetAmount)}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Terkumpul</span>
                          <strong className="text-emerald-800 text-sm md:text-base font-extrabold">
                            {formatRupiah(camp.raisedAmount)}
                          </strong>
                        </div>

                        <button
                          onClick={() => setSelectedCampaign(camp)}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Heart className="w-3.5 h-3.5 fill-white text-white" /> Donasi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: Recent Donors List */}
        <div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
            <h4 className="text-xs font-display font-black text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-500" /> SEDEKAH TERCATAT BARU
            </h4>

            {donationHistory.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-medium">
                Belum ada donasi terdaftar. Salurkan donasi Anda hari ini!
              </div>
            ) : (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {donationHistory.map((rec) => {
                  const camp = campaigns.find((c) => c.id === rec.campaignId);
                  return (
                    <div
                      key={rec.id}
                      className="p-3 bg-slate-50/55 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5 hover:border-emerald-200 transition-all font-medium"
                    >
                      <div className="flex justify-between items-center">
                        <strong className="text-slate-800 font-bold flex items-center gap-1">
                          <User className="w-3 h-3 text-emerald-700" /> {rec.donorName}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono">{formatDate(rec.date, true)}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-slate-400 text-[10px] line-clamp-1">Untuk: {camp?.title || 'Program Umum'}</span>
                        <span className="text-emerald-700 font-black font-mono whitespace-nowrap">
                          {formatRupiah(rec.amount)}
                        </span>
                      </div>
                      {rec.message && (
                        <p className="italic text-slate-400 text-[11px] bg-white p-2 rounded-lg border-l-2 border-emerald-500 leading-normal">
                          "{rec.message}"
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donation Form Modal overlay */}
      <AnimatePresence>
        {selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {donationSuccess ? (
                <div className="text-center py-10 space-y-5 font-sans">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 text-3xl font-black">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">Donasi Berhasil Dikirim!</h3>
                    <p className="text-sm text-slate-500 font-medium px-4">
                      Jazaakumullah Khairan Katsiran atas kebaikan Anda. Semoga menjadi amal jariyah yang melimpah dan berkah.
                    </p>
                  </div>

                  <div className="pt-2 px-4 space-y-3">
                    <p className="text-xs text-slate-400 font-medium">
                      Selanjutnya, mohon lakukan transfer ke rekening di atas lalu konfirmasi bukti transfer Anda ke admin:
                    </p>
                    <a
                      href={buildWhatsAppConfirmLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-650 hover:bg-emerald-750 text-white font-bold py-3 rounded-lg text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" /> Konfirmasi Bukti Transfer via WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDonateSubmit} className="space-y-5 text-slate-700 font-sans">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[9px] font-extrabold text-emerald-800 tracking-wider uppercase">DONASI PROGRAM</span>
                    <h3 className="text-lg font-bold text-slate-800 leading-snug">
                      {selectedCampaign.title}
                    </h3>
                  </div>

                  {/* Daftar Rekening Donasi */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Transfer ke Rekening Berikut</label>
                    {(!selectedCampaign.bankAccounts || selectedCampaign.bankAccounts.length === 0) ? (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-center text-xs text-slate-400 font-medium">
                        Rekening donasi untuk program ini belum tersedia. Silakan hubungi admin.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {selectedCampaign.bankAccounts.map((acc, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="p-2 bg-white rounded-lg border border-slate-150 text-emerald-700 shrink-0">
                                <Landmark className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                                  {acc.bankName}
                                </span>
                                <span className="block font-mono font-black text-sm text-emerald-800 tracking-wide">
                                  {acc.accountNumber}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-medium">a.n {acc.accountHolder}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyAccountNumber(acc.accountNumber, idx)}
                              className="shrink-0 p-2 bg-white hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 rounded-lg border border-slate-200 transition-all cursor-pointer"
                              title="Salin nomor rekening"
                            >
                              {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Amount Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Pilih Nominal Donasi</label>
                    <div className="grid grid-cols-3 gap-2">
                      {predefinedAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt)}
                          className={`py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            amount === amt
                              ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {formatRupiah(amt)}
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rp</span>
                      <input
                        type="number"
                        min="10000"
                        placeholder="Ketik nominal kustom"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full bg-slate-50 text-slate-800 rounded-lg py-2 pl-9 pr-4 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Donor details */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap (Boleh kosong / Hamba Allah)</label>
                      <input
                        type="text"
                        placeholder="Hamba Allah"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-slate-50 rounded-lg py-2 px-3 text-xs border border-slate-250 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Doa / Pesan Kebaikan</label>
                      <textarea
                        rows={2}
                        placeholder="Semoga Allah melapangkan rezeki dan memberkahi keluarga kita..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-50 rounded-lg py-2 px-3 text-xs border border-slate-250 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Donasi */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-750 hover:bg-emerald-850 text-white font-bold py-2.5 rounded-lg text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Kirim Donasi (Konfirmasi Transfer)
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCampaign(null)}
                    className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-600 pt-1 block cursor-pointer"
                  >
                    Batal
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};