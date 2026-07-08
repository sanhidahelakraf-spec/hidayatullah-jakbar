import React from 'react';
import { Award, BookOpen, Compass, Heart, ShieldAlert, Sparkles, Users } from 'lucide-react';

export const MainstreamGerakan: React.FC = () => {
  const pillars = [
    {
      title: 'Dakwah & Rekrutmen Kader',
      description: 'Menyebarkan pemahaman tauhid murni yang mencerahkan batin ke berbagai komunitas masyarakat. Kami merekrut, mendidik, dan mengutus dai-dai tangguh ke daerah pedalaman untuk mengajar Al-Qur\'an dan membina akhlak mulia.',
      details: 'Program unggulan: Dai Sahabat Rakyat, Tebar Quran Pedalaman, Pembinaan Mualaf Jabar.',
      icon: <Compass className="w-8 h-8 text-white" />,
      bg: 'from-emerald-800 to-emerald-950'
    },
    {
      title: 'Pendidikan Integral Berbasis Tauhid',
      description: 'Menyelenggarakan sistem sekolah formal terpadu yang memadukan keunggulan akademik sains-teknologi dengan kekuatan akidah tauhid, hafalan Al-Qur\'an, dan pembiasaan adab-adab Nabawi.',
      details: 'Program unggulan: Sekolah Integral Luqman Al-Hakim, Pesantren Tahfizh, Pendidikan PAUD Integral.',
      icon: <BookOpen className="w-8 h-8 text-white" />,
      bg: 'from-emerald-700 to-emerald-900'
    },
    {
      title: 'Pemberdayaan Sosial & Kemanusiaan',
      description: 'Mewujudkan kepedulian nyata bagi kaum yatim piatu, fakir miskin, dhuafa, serta tanggap bencana kemanusiaan. Kami meyakini dakwah harus menyentuh perut yang lapar dan mengobati tubuh yang sakit.',
      details: 'Program unggulan: Baitul Maal Hidayatullah (BMH), Relawan SAR Jabar, Beasiswa Penghafal Quran.',
      icon: <Heart className="w-8 h-8 text-white" />,
      bg: 'from-emerald-600 to-emerald-800'
    },
    {
      title: 'Kemandirian Ekonomi Syariah',
      description: 'Mengembangkan pilar kedaulatan ekonomi melalui usaha produktif berbasis syariah untuk menopang dakwah dan kemandirian jamaah, bebas dari riba dan eksploitasi.',
      details: 'Program unggulan: Koperasi Syariah Mandiri, Usaha Agro Pesantren, BMT Hidayatullah.',
      icon: <Users className="w-8 h-8 text-white" />,
      bg: 'from-slate-800 to-slate-950'
    }
  ];

  return (
    <div className="my-10 bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xs font-sans">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="w-1.5 h-5 bg-emerald-600 block rounded-full" />
          <h3 className="text-sm md:text-base font-display font-black text-slate-800 tracking-wide uppercase">
            MAINSTREAM GERAKAN
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium pl-4 leading-relaxed">
          Empat pilar perjuangan utama ormas Hidayatullah dalam berpartisipasi aktif membangun peradaban umat dan kejayaan bangsa.
        </p>
      </div>

      <div className="space-y-8">
        {/* Intro */}
        <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100 flex gap-4 items-start max-w-3xl">
          <Sparkles className="w-6 h-6 text-emerald-700 shrink-0 mt-1" />
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            Gerakan Hidayatullah didasarkan pada visi besar peradaban. Melalui <strong>Sistematika Nuzulul Wahyu (SNW)</strong> sebagai basis metodologi tarbiyah (pembinaan), kami mengintegrasikan aspek spiritual, keilmuan, kemandirian, dan kemানুsiaan secara utuh untuk melahirkan insan-insan bertauhid kokoh.
          </p>
        </div>

        {/* Pillars Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-250 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
            >
              {/* Pillar Left Icon Badge */}
              <div className={`p-6 md:w-32 bg-gradient-to-br ${pillar.bg} flex items-center justify-center shrink-0`}>
                <div className="p-3 bg-white/15 rounded-2xl backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
                  {pillar.icon}
                </div>
              </div>

              {/* Pillar Content Area */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-slate-800 tracking-tight leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50">
                  <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Khidmat Nyata</span>
                  <p className="text-[11px] text-emerald-800 font-bold leading-normal">
                    {pillar.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
