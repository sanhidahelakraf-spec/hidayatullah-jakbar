import React, { useState } from 'react';
import { MapPin, Phone, Building, Star, Search } from 'lucide-react';

export const JaringanSection: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const branches = [
    { name: 'PD Hidayatullah Kota Bandung', address: 'Jl. Pesantren No. 123, Sukamiskin, Arcamanik, Bandung', phone: '0812-3456-7890', type: 'Sekretariat DPD' },
    { name: 'PD Hidayatullah Kota Depok', address: 'Kawasan Ponpes Hidayatullah, Jl. Raya Kalimulya No. 80, Depok', phone: '021-7782134', type: 'Kampus Utama / Pondok Pesantren' },
    { name: 'PD Hidayatullah Kabupaten Sumedang', address: 'Jl. Prabu Gajah Agung No. 44, Sumedang Utara', phone: '0852-8765-4321', type: 'Pondok Tahfizh & DPD' },
    { name: 'PD Hidayatullah Kabupaten Bogor', address: 'Kecamatan Caringin, Kaki Gunung Gede Pangrango, Bogor', phone: '0813-1122-3344', type: 'Kampus Boarding School' },
    { name: 'PD Hidayatullah Kota Bekasi', address: 'Perumahan Grand Galaksi, Blok A-12, Jakasetia, Bekasi Selatan', phone: '0811-9988-7766', type: 'Rumah Quran & DPD' },
    { name: 'PD Hidayatullah Kabupaten Tasikmalaya', address: 'Jl. Ibrahim Singaparna, Tasikmalaya', phone: '0857-4455-6677', type: 'Pusat Dakwah & DPD' },
    { name: 'PD Hidayatullah Kabupaten Garut', address: 'Jl. Patriot No. 18, Tarogong Kidul, Garut', phone: '0821-3322-1100', type: 'Pusat Layanan Sosial & DPD' },
    { name: 'PD Hidayatullah Kota Cirebon', address: 'Jl. Kesambi No. 56, Kesambi, Kota Cirebon', phone: '0812-7766-5544', type: 'Daerah Binaan & DPD' },
    { name: 'PD Hidayatullah Kabupaten Purwakarta', address: 'Jl. Veteran No. 9, Purwakarta', phone: '0878-5544-3322', type: 'Rumah Qur\'an & DPD' },
  ];

  const filteredBranches = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="my-10 bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xs font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
            <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
              JARINGAN DAERAH
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
            Daftar kantor perwakilan Pengurus Daerah (PD) Hidayatullah di seluruh wilayah Jakarta Barat.
          </p>
        </div>

        {/* Filter input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Cari Kota / Kabupaten..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 rounded-lg py-2 pl-4 pr-10 text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:bg-white transition-all font-bold"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Visual (Indonesian Pasundan map styler) */}
        <div className="md:col-span-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between relative overflow-hidden h-96">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/5 rounded-full blur-2xl" />

          <div className="space-y-3 z-10">
            <span className="bg-emerald-900/80 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest inline-block">
              Sebaran Wilayah
            </span>
            <h4 className="text-xl font-black font-display leading-tight">
              Konsolidasi Jabar Bermartabat & Islami
            </h4>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Hidayatullah Jakarta Barat membawahi koordinasi dakwah di lebih dari 27 kabupaten dan kota, menggerakkan ratusan dai, lembaga sekolah integral, dan panti asuhan binaan.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800 z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-black text-sm">
                27
              </div>
              <span className="text-xs text-slate-200 font-bold">Pengurus Daerah DPD</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-black text-sm">
                45+
              </div>
              <span className="text-xs text-slate-200 font-bold">Sekolah & Pesantren Integral</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-black text-sm">
                120+
              </div>
              <span className="text-xs text-slate-200 font-bold">Rumah Qur'an Binaan</span>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[384px] overflow-y-auto pr-1">
          {filteredBranches.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-slate-400 text-xs font-medium">
              Daerah yang Anda cari belum terdaftar atau silakan periksa ejaan.
            </div>
          ) : (
            filteredBranches.map((branch, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-50/50 hover:bg-emerald-50/10 rounded-2xl border border-slate-150 hover:border-emerald-200 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md mb-2.5">
                    <Star className="w-2.5 h-2.5 fill-emerald-800 text-emerald-800" />
                    {branch.type}
                  </span>
                  <h4 className="font-bold text-sm text-slate-800 mb-2 leading-snug">
                    {branch.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    <MapPin className="w-3.5 h-3.5 inline mr-1 text-emerald-700 stroke-2" />
                    {branch.address}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1 text-xs text-emerald-700 font-black">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{branch.phone}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
