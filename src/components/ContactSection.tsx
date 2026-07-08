import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  onAddMessage: (name: string, email: string, phone: string, subject: string, message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onAddMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMessage(name, email, phone, subject, message);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="my-10 font-sans">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
          <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
            HUBUNGI KAMI
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
          Hubungi Sekretariat Dewan Pengurus Daerah Hidayatullah Jakarta Barat untuk silaturahmi, pengajuan kerja sama, maupun pertanyaan umum.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 1/3: Contact details */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-6">
            <h4 className="text-xs font-display font-black text-slate-800 border-b border-slate-100 pb-3 mb-2 uppercase tracking-wider">
              Sekretariat DPD Jakbar
            </h4>

            <div className="space-y-4">
              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  <strong className="block text-slate-800 mb-1 font-bold">Alamat Kantor</strong>
                  Jl. Kerapu 1 No.11, RT.08/RW.021, Pluit, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  <strong className="block text-slate-800 mb-1 font-bold">Layanan Telepon & WhatsApp</strong>
                  +62 877-5537-6499 (Amin Johari)<br />
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  <strong className="block text-slate-800 mb-1 font-bold">E-mail Resmi</strong>
                  humas@hidayatullahjakbar.or.id<br />
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs md:text-sm text-slate-600">
                  <strong className="block text-slate-800 mb-1 font-bold">Jam Layanan Kantor</strong>
                  Senin - Jum'at: 08:00 - 16:00 WIB<br />
                  Sabtu: 08:00 - 12:00 WIB
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-slate-900 rounded-2xl h-48 border border-slate-800 overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 bg-slate-950/20 flex flex-col justify-end p-4 text-white z-10 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent">
              <span className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5 text-amber-400">PETA LOKASI SEKRETARIAT</span>
              <span className="text-[11px] text-emerald-300 font-bold">Buka di Google Maps ↗</span>
            </div>
            {/* Simulation of a styled Map */}
            <div className="w-full h-full bg-[radial-gradient(#1e293b_20%,transparent_20%)] [background-size:16px_16px] bg-slate-950 flex items-center justify-center">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-2 shadow-md animate-bounce">
                <MapPin className="w-5 h-5 text-red-500 fill-red-500/20" />
                <span className="text-xs font-black text-slate-100">DPD Jakbar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2/3: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xs">
            <h4 className="text-xs font-display font-black text-slate-800 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">
              Formulir Hubungan Masyarakat
            </h4>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-xs">
                  <CheckCircle className="w-10 h-10 text-emerald-650" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Pesan Anda Sukses Dikirim!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                  Terima kasih atas silaturahmi Anda. Pesan Anda telah didaftarkan dalam sistem pusat DPD Hidayatullah Jakarta Barat dan tim admin humas kami akan segera menghubungi Anda kembali.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Anda</label>
                    <input
                      type="text"
                      placeholder="Contoh: Ahmad Fauzi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 px-3.5 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat E-mail Anda</label>
                    <input
                      type="email"
                      placeholder="ahmad@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 px-3.5 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor Handphone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 px-3.5 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Subjek Keperluan</label>
                    <input
                      type="text"
                      placeholder="Kerja sama dakwah, undangan raker, dll."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 px-3.5 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="text-slate-700">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Rincian Pesan / Pengajuan</label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan isi pesan Anda secara lengkap dan jelas di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 rounded-lg py-2.5 px-3.5 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-750 hover:bg-emerald-850 text-white font-bold py-2.5 px-6 rounded-lg text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
