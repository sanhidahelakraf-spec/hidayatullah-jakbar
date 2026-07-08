import { NewsItem, GalleryItem, PageContent, DonationCampaign } from './types';

export const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'Rakerwil Pemuda Hidayatullah Jabar 2026 Usung Tema Pemuda Menggerakkan Bangsa',
    category: 'ARTIKEL',
    summary: 'Rapat Kerja Wilayah (Rakerwil) Pemuda Hidayatullah Jakarta Barat tahun 2026 sukses diselenggarakan dengan fokus program penguatan kepemimpinan pemuda serta aksi sosial bagi kemajuan umat.',
    content: `BANDUNG — Pengurus Daerah Pemuda Hidayatullah Jakarta Barat menggelar Rapat Kerja Wilayah (Rakerwil) tahun 2026 di Bandung. Kegiatan ini mengusung tema besar "Pemuda Menggerakkan Bangsa" sebagai penegasan komitmen pemuda Hidayatullah dalam berkontribusi aktif dalam pembangunan moral, intelektual, dan sosial masyarakat Jakarta Barat.\n\nKetua PW Pemuda Hidayatullah Jabar menyatakan bahwa momentum ini harus dimaksimalkan untuk menelurkan program-program strategis yang solutif terhadap problematika kepemudaan saat ini. Fokus utama tahun ini mencakup pengembangan dakwah digital, pemberdayaan ekonomi kreatif bagi pemuda mandiri, serta pembinaan karakter kepemimpinan berbasis Qurani di seluruh daerah kabupaten/kota Jakarta Barat.\n\nAcara yang berlangsung selama tiga hari ini dihadiri oleh utusan dari seluruh Pengurus Daerah (PD) se-Jakarta Barat, organisasi otonom (orpen), serta jajaran Dewan Pengurus Daerah Hidayatullah Jabar. Melalui konsolidasi ini, diharapkan seluruh sayap kepemudaan bergerak selaras demi menguatkan peradaban Islam di bumi Pasundan.`,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    date: '06 Juli 2026',
    author: 'Hidayatullah Media',
    views: 342,
    featured: true
  },
  {
    id: '2',
    title: 'SPS Miftahul Ilmi Binaan Yayasan Cahaya Pejuang Hadirkan Generasi Qurani Sejak Dini',
    category: 'BERITA',
    summary: 'Satuan PAUD Sejenis (SPS) Miftahul Ilmi menginisiasi kurikulum tahfizh intensif untuk membentuk akhlak mulia dan kecerdasan emosional anak usia dini.',
    content: `DEPOK — Investasi terbaik bagi masa depan bangsa adalah menanamkan kecintaan terhadap Al-Qur'an sejak usia dini. Hal inilah yang mendasari Satuan PAUD Sejenis (SPS) Miftahul Ilmi di bawah binaan Yayasan Cahaya Pejuang untuk terus meningkatkan kualitas pendidikan ramah anak berbasis Quran.\n\nDalam laporannya, pengelola lembaga menyampaikan bahwa integrasi pembelajaran hafalan surah pendek, adab harian, serta pengenalan huruf hijaiyah interaktif mendapat respons yang sangat positif dari para orang tua murid. Selain aspek kognitif, SPS Miftahul Ilmi menitikberatkan pada pengembangan motorik dan pembiasaan adab-adab mulia.\n\nSPS ini juga berkolaborasi dengan para relawan pengajar Hidayatullah untuk menyediakan fasilitas belajar gratis bagi anak-anak yatim dan dhuafa di lingkungan sekitar pesantren sebagai bentuk nyata dari pilar amal usaha sosial organisasi.`,
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    date: '03 Juli 2026',
    author: 'Cahaya Media',
    views: 189,
    featured: false
  },
  {
    id: '3',
    title: 'Tumbuhkan Jiwa Kepemimpinan Santri, Pesantren Hidayatullah Gelar LDKS',
    category: 'BERITA',
    summary: 'Latihan Dasar Kepemimpinan Santri (LDKS) dilaksanakan guna menempa kedisiplinan, kemandirian, dan semangat dakwah para santri tingkat menengah.',
    content: `SUMEDANG — Pesantren Hidayatullah sukses melaksanakan Latihan Dasar Kepemimpinan Santri (LDKS) bagi puluhan santri tingkat SMP-SMA. Bertempat di area perkemahan alam terbuka, kegiatan ini didesain untuk melatih daya tahan fisik, ketangkasan berpikir strategis, serta kedalaman spiritual santri.\n\n"Seorang santri tidak hanya disiapkan untuk menguasai ilmu agama secara teoretis, tetapi juga harus siap memimpin umat di masa depan dengan akhlak kepemimpinan nabi," ungkap kepala kepengasuhan santri.\n\nSelama LDKS, peserta dibekali materi retorika dakwah, manajemen organisasi dasar, teknik mitigasi bencana, serta mabit malam untuk menguatkan spiritualitas pribadi melalui qiyamul lail berjamaah.`,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    date: '28 Juni 2026',
    author: 'Media Pesantren',
    views: 215,
    featured: false
  },
  {
    id: '4',
    title: 'Khutbah Jumat: Penyebab Kegelisahan Jiwa dan Solusi Qurani Penentram Hati',
    category: 'KULTUM',
    summary: 'Mengulas akar kegalauan manusia modern dan rahasia zikir serta kepasrahan total kepada Allah SWT sebagai pereda keresahan batin.',
    content: `Khutbah Jumat kali ini membahas topik yang sangat relevan dengan dinamika kehidupan modern: kegelisahan batin. Seringkali kenyamanan material tidak otomatis mendatangkan ketenteraman batin.\n\nKhatib memaparkan tiga penyebab utama kegelisahan batin menurut pandangan Al-Qur'an, yaitu: lemahnya iman, kecintaan berlebih terhadap dunia (wahn), dan jarangnya mengingat Allah (lalai dari zikir).\n\nSebagai solusi, khatib mengajak jamaah untuk membiasakan tilawah Qur'an dengan perenungan (tadabbur), melazimkan istighfar di waktu sahur, serta menyerahkan segala urusan hidup secara utuh kepada ketentuan Allah setelah berusaha semaksimal mungkin (tawakkal).`,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    date: '05 Desember 2025',
    author: 'Dewan Da\'wah',
    views: 512,
    featured: false
  },
  {
    id: '5',
    title: 'Khutbah Jumat: Macam-Macam Ujian Hidup dan Kunci Sukses Melaluinya',
    category: 'KULTUM',
    summary: 'Ujian hidup adalah sunnatullah. Kenali bentuk-bentuk ujian baik berupa kesempitan maupun kesenangan, dan rahasia sabar serta syukur.',
    content: `Setiap manusia yang mengaku beriman pasti akan diuji oleh Allah SWT untuk membuktikan kebenaran imannya. Namun, tidak semua manusia menyadari bahwa ujian tidak hanya datang dalam wujud musibah atau kemiskinan, melainkan juga dalam rupa kekayaan, kesehatan prima, dan jabatan.\n\nDalam khutbah ini, dibahas bagaimana menyikapi ujian kesempitan dengan kesabaran aktif, yakni terus berusaha memperbaiki keadaan tanpa putus asa. Sementara ujian kesenangan dihadapi dengan rasa syukur yang dibuktikan dengan pemanfaatan nikmat tersebut di jalan kebaikan.\n\nDengan pemahaman yang lurus ini, seorang mukmin akan selalu stabil dalam menghadapi pasang surut gelombang kehidupan.`,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    date: '12 Desember 2025',
    author: 'Dewan Da\'wah',
    views: 489,
    featured: false
  },
  {
    id: '6',
    title: 'Kultum Ramadhan Hari ke-24: Meraih Keberkahan Malam Lailatul Qadar',
    category: 'KULTUM',
    summary: 'Bagaimana menghidupkan malam-malam ganjil di sepuluh hari terakhir bulan suci Ramadhan untuk berburu kemuliaan seribu bulan.',
    content: `Memasuki fase sepuluh malam terakhir Ramadhan, fokus ibadah setiap muslim hendaknya makin meningkat. Lailatul Qadar adalah anugerah terindah bagi umat Nabi Muhammad SAW yang usianya relatif pendek namun berkesempatan meraih pahala setara seribu bulan.\n\nKultum ini merangkum amalan utama yang sangat dianjurkan Rasulullah SAW, mulai dari memperbanyak doa "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni", beri'tikaf di masjid, hingga menjaga kebersihan jasmani dan rohani menjelang malam hari.\n\nMari singsingkan lengan baju, singkirkan sejenak kesibukan dunia, dan jemput malam mulia ini dengan penuh keimanan dan keikhlasan.`,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    date: '13 Maret 2026',
    author: 'Kultum Center',
    views: 673,
    featured: false
  },
  {
    id: '7',
    title: 'Khutbah Jumat: Menguatkan Sabar Menghadapi Badai Fitnah Akhir Zaman',
    category: 'KULTUM',
    summary: 'Menjaga kemurnian tauhid dan memegang teguh tali agama Allah di tengah derasnya arus disinformasi dan degradasi moral akhlak.',
    content: `Tantangan umat Islam di era digital kian kompleks. Fitnah syubhat (pemikiran menyimpang) dan syahwat (gaya hidup bebas) menyebar begitu cepat hingga ke genggaman tangan.\n\nKhutbah ini menguraikan pentingnya memiliki benteng ilmu syar'i sebelum berinteraksi di dunia digital. Sabar dalam konteks ini bukan sekadar diam, melainkan sabar dalam menuntut ilmu, sabar dalam berdakwah dengan hikmah, dan konsisten dalam meramaikan majelis ilmu.\n\nKhatib juga mengingatkan pentingnya mendoakan kebaikan bagi para pemimpin bangsa dan persatuan umat agar terhindar dari perpecahan yang melemahkan kekuatan Islam.`,
    imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80',
    date: '19 Desember 2025',
    author: 'Dewan Da\'wah',
    views: 456,
    featured: false
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Penyaluran Paket Sembako Dhuafa Jabar',
    description: 'Aksi sosial pembagian ratusan paket bahan pangan pokok untuk keluarga prasejahtera di pinggiran Jakarta Barat.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    category: 'Sosial',
    date: '20 Juni 2026'
  },
  {
    id: 'g2',
    title: 'Pembukaan Cabang Baru Rumah Qur\'an Sumedang',
    description: 'Peresmian pusat pembelajaran hafalan Al-Qur\'an gratis bagi anak-anak dan remaja di Sumedang.',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
    category: 'Dakwah',
    date: '15 Juni 2026'
  },
  {
    id: 'g3',
    title: 'Dauroh Tarbiyah Pemuda Hidayatullah',
    description: 'Pelatihan kepemimpinan dan pemantapan pemikiran Islam bagi kader muda di lereng pegunungan.',
    imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    category: 'Kepemudaan',
    date: '10 Mei 2026'
  },
  {
    id: 'g4',
    title: 'Seminar Ekonomi Syariah untuk Usaha Kecil',
    description: 'Bimbingan teknis pengelolaan keuangan usaha mikro berbasis keadilan syariah bagi masyarakat umum.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    category: 'Ekonomi',
    date: '25 April 2026'
  },
  {
    id: 'g5',
    title: 'Ujian Tasmi\' 10 Juz Sekali Duduk',
    description: 'Santri Pesantren Hidayatullah melafalkan hafalan Al-Qur\'an 10 juz tanpa terputus di hadapan para penguji.',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    category: 'Pendidikan',
    date: '02 April 2026'
  },
  {
    id: 'g6',
    title: 'Baksos Pengobatan Gratis Masyarakat Desa',
    description: 'Kerja sama tim medis Muslimat Hidayatullah dalam memberikan pemeriksaan kesehatan dan obat gratis.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    category: 'Sosial',
    date: '18 Maret 2026'
  }
];

export const initialPages: PageContent[] = [
  {
    id: 'sejarah-singkat',
    title: 'Sejarah Singkat',
    subtitle: 'Mengenal Perjalanan dan Cikal Bakal Gerakan Hidayatullah',
    content: `Hidayatullah lahir sebagai sebuah gerakan dakwah dan pendidikan Islam yang didirikan pertama kali pada tanggal 7 Januari 1973 (2 Dzulhijjah 1392 H) di Gunung Tembak, Balikpapan, Kalimantan Timur. Gerakan ini dipelopori oleh KH. Abdullah Said (Allahuyarham) bersama sejumlah pemuda santri pejuang batin.\n\nBerawal dari sebuah pesantren di atas lahan kritis, Hidayatullah bertransformasi menjadi organisasi kemasyarakatan (Ormas) nasional melalui Musyawarah Nasional I pada tahun 2000 di Balikpapan. Hidayatullah memusatkan gerakannya pada rekrutmen kader dakwah yang berdedikasi tinggi, mengedepankan pembinaan tauhid serta pengabdian masyarakat nyata.\n\nHari ini, Hidayatullah telah memiliki jaringan pesantren dan cabang kepengurusan di seluruh provinsi di Indonesia, termasuk wilayah Jakarta Barat. Hidayatullah terus berkarya membangun peradaban Islam melalui program dakwah terpadu, jaringan pendidikan unggulan, pendampingan sosial-kemanusiaan, serta pemberdayaan ekonomi umat.`,
    sections: [
      {
        title: 'Masa Rintisan (1973 - 1984)',
        content: 'Fokus pada pembukaan lahan pesantren Gunung Tembak, penataan kurikulum halaqah kepemimpinan, dan pengiriman dai-dai perdana ke seluruh penjuru Nusantara.'
      },
      {
        title: 'Masa Pengembangan Jaringan (1984 - 2000)',
        content: 'Pendirian ratusan cabang pesantren baru di tingkat kabupaten dan kota di seluruh kepulauan Indonesia serta perintisan lembaga amal usaha sosial dan pendidikan formal.'
      },
      {
        title: 'Era Ormas Nasional (2000 - Sekarang)',
        content: 'Resmi mendaftarkan diri sebagai Ormas Keagamaan Nasional dengan struktur kepengurusan yang solid dari pusat hingga kecamatan, fokus pada peningkatan kompetensi keilmuan dan kontribusi kebangsaan.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'visi-misi',
    title: 'Visi & Misi',
    subtitle: 'Arah Perjuangan Membangun Peradaban Islami',
    content: 'Hidayatullah bergerak dengan visi besar yang terukur dan misi nyata yang dijalankan secara konsisten oleh seluruh elemen organisasi dari pusat hingga daerah.',
    sections: [
      {
        title: 'Visi Organisasi',
        content: 'Membangun Peradaban Islam yang Agung dan Berkah melalui implementasi nilai-nilai Al-Qur\'an dan As-Sunnah dalam seluruh sendi kehidupan bermasyarakat, berbangsa, dan bernegara.'
      },
      {
        title: 'Misi Utama',
        content: '1. Melahirkan kader dai dan pendidik yang tangguh, berakhlak mulia, cerdas, dan profesional.\n2. Mengembangkan institusi pendidikan integral berbasis tauhid yang berkualitas tinggi dari usia dini hingga perguruan tinggi.\n3. Menggalakkan dakwah yang ramah, mencerahkan, dan solutif ke seluruh pelosok tanah air.\n4. Membangun amal usaha kemandirian ekonomi syariah dan pemberdayaan sosial dhuafa.'
      },
      {
        title: 'Nilai-Nilai Dasar (Sistematika Nuzulul Wahyu)',
        content: 'Perjuangan Hidayatullah dilandasi oleh spirit wahyu berurutan (Iqra, Al-Qalam, Al-Muzzammil, Al-Muddatstsir, dan Al-Fatihah) sebagai manhaj tarbiyah dan dakwah dalam membentuk pribadi yang rabbani.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'pengurus',
    title: 'Struktur Pengurus',
    subtitle: 'Khidmat Kepemimpinan Dewan Pengurus Daerah Jakarta Barat',
    content: 'Struktur kepengurusan Dewan Pengurus Daerah (DPD) Hidayatullah Jakarta Barat periode berjalan yang membawahi koordinasi dakwah, pendidikan, dan pembinaan daerah se-Jakarta Barat.',
    sections: [
      {
        title: 'Dewan Penasihat & Pertimbangan',
        content: '• KH. Dr. Nashirul Haq, M.A. (Penasihat Utama)\n• Ust. H. Zainuddin, M.Pd. (Ketua Dewan Pertimbangan)'
      },
      {
        title: 'Dewan Pengurus Daerah (DPD) Jakbar',
        content: '• Ketua Umum: Ust. Ir. H. Ahmad Sunarya\n• Wakil Ketua: Ust. Muhammad Syarif, S.Pd.I.\n• Sekretaris Jenderal: Ust. Rahmatullah, S.Sos.\n• Bendahara: Ust. Slamet Riyadi, S.E.'
      },
      {
        title: 'Biro-Biro Strategis',
        content: '• Biro Dakwah & Penyiaran: Ust. Faruq Abdurrahman\n• Biro Pendidikan Integral: Ust. Dr. M. Iqbal\n• Biro Ekonomi & Wakaf: Ust. Hendra Wijaya\n• Biro Humas & Hubungan Kelembagaan: Ust. Ali Akbar, S.I.Kom.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'program',
    title: 'Program Kerja Unggulan',
    subtitle: 'Ikhtiar Nyata Berkhidmat untuk Umat dan Bangsa',
    content: 'DPD Hidayatullah Jakarta Barat merumuskan lima pilar program kerja strategis yang diimplementasikan di tingkat wilayah maupun daerah.',
    sections: [
      {
        title: '1. Pilar Dakwah & Tarbiyah',
        content: 'Pengiriman Dai Sahabat Rakyat ke pedalaman Jabar, pembinaan majelis taklim terpadu, penyelenggaraan kajian tafsir tematik, dan pembinaan mualaf.'
      },
      {
        title: '2. Pilar Pendidikan Integral',
        content: 'Penyempurnaan sistem sekolah berasrama (boarding school) berbasis Tauhid, pelatihan standardisasi guru ngaji, dan penyediaan beasiswa santri berprestasi.'
      },
      {
        title: '3. Pilar Sosial & Kemanusiaan',
        content: 'Tanggap bencana melalui SAR Hidayatullah, santunan yatim dhuafa, penyaluran pangan berkala, dan layanan kesehatan keliling gratis.'
      },
      {
        title: '4. Pilar Kemandirian Ekonomi',
        content: 'Pemberdayaan UMKM jamaah, pendirian koperasi syariah, serta pengelolaan unit usaha pertanian dan peternakan produktif pesantren.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  // ORPEN
  {
    id: 'pemuda-hidayatullah',
    title: 'Pemuda Hidayatullah',
    subtitle: 'Organisasi Otonom Wadah Perjuangan Pemuda',
    content: 'Pemuda Hidayatullah adalah organisasi otonom (orpen) yang menghimpun potensi pemuda Islam untuk dididik menjadi kader pemimpin yang progresif, beradab, dan berkomitmen tinggi terhadap dakwah Islam.\n\nDi Jakarta Barat, Pemuda Hidayatullah aktif menggalang potensi mahasiswa, pelajar, dan pemuda masjid untuk terlibat aktif dalam program-program kemasyarakatan, dakwah digital, serta peningkatan literasi kepemudaan.',
    sections: [
      {
        title: 'Visi Pemuda',
        content: 'Menjadi Pelopor Pemuda Berperadaban Islam yang unggul dalam ilmu, iman, dan kepemimpinan dakwah.'
      },
      {
        title: 'Aktivitas Utama',
        content: '• Latihan Kepemimpinan Pemuda Islam (LKPI) tingkat daerah\n• Komunitas Dakwah Digital (pembuatan konten kreatif islami)\n• Jambore Pemuda Qurani Jakarta Barat\n• Aksi Bersih Masjid dan Peduli Lingkungan Hijau'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'muslimat-hidayatullah',
    title: 'Muslimat Hidayatullah (Mushida)',
    subtitle: 'Pilar Perjuangan Perempuan Membangun Ketahanan Keluarga',
    content: 'Muslimat Hidayatullah (Mushida) berkonsentrasi pada pembinaan wanita salehah, pengokohan ketahanan keluarga sakinah, serta pendidikan anak usia dini.\n\nMushida meyakini bahwa keluarga adalah batu bata pertama peradaban Islam. Jika keluarga kokoh dan terbina dengan Quran, maka ketahanan bangsa akan terjaga dengan kuat.',
    sections: [
      {
        title: 'Program Fokus',
        content: '• Majelis Taklim Ibu Sholehah (Mataisha)\n• Konseling Ketahanan Keluarga Islam\n• Manajemen Pengelolaan PAUD/TK Integral\n• Pemberdayaan Ekonomi Kreatif Ibu Rumah Tangga'
      },
      {
        title: 'Kepengurusan Wilayah Jabar',
        content: 'Ketua PW Mushida Jabar beserta jajaran aktif mengadakan safari dakwah muslimah, baksos kesehatan ibu dan anak, serta parenting islami berskala nasional.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  // AMAL USAHA
  {
    id: 'rumah-quran',
    title: 'Rumah Qur\'an',
    subtitle: 'Membebaskan Buta Huruf Al-Qur\'an di Seluruh Jabar',
    content: 'Amal usaha Rumah Qur\'an didirikan sebagai sarana pembelajaran gratis membaca, memperbaiki bacaan (tahsin), dan menghafalkan Al-Qur\'an untuk segala usia, mulai anak-anak hingga lansia.',
    sections: [
      {
        title: 'Target Capaian',
        content: 'Membuka minimal satu Rumah Qur\'an di setiap desa/kelurahan binaan se-Jakarta Barat demi menghadirkan cahaya Quran di setiap lingkungan.'
      },
      {
        title: 'Metodologi Belajar',
        content: 'Menggunakan metode pengajaran praktis yang menyenangkan dan mudah dipahami, sehingga santri dapat membaca Quran secara tartil dalam waktu yang terukur.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'pendidikan',
    title: 'Pendidikan Integral',
    subtitle: 'Jaringan Sekolah Unggulan Berbasis Tauhid',
    content: 'Hidayatullah mengelola jaringan lembaga pendidikan formal dari tingkat Kelompok Bermain (KB), TK, SD, SMP, SMA, hingga Perguruan Tinggi yang dikenal dengan Sekolah Integral Hidayatullah (SIH).',
    sections: [
      {
        title: 'Keunggulan Kurikulum',
        content: 'Menggabungkan kurikulum nasional yang diakreditasi resmi dengan kurikulum khas kepesantrenan berbasis Tauhid. Mencetak insan cerdas yang berjiwa pemimpin dan hafal Al-Qur\'an.'
      },
      {
        title: 'Daftar Kampus Utama di Jabar',
        content: '• Sekolah Integral Luqman Al-Hakim Bandung\n• Pesantren Boarding School Hidayatullah Depok\n• Pondok Pesantren Tahfizh Qur\'an Bogor'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'ekonomi',
    title: 'Pilar Ekonomi Syariah',
    subtitle: 'Membangun Kemandirian Finansial Umat',
    content: 'Gerakan dakwah membutuhkan sokongan ekonomi yang mandiri. Hidayatullah mendorong pembentukan ekosistem bisnis syariah yang berkah dan adil.',
    sections: [
      {
        title: 'Unit Usaha Utama',
        content: '• Koperasi Syariah Mandiri Utama\n• Baitul Maal wat Tamwil (BMT) Hidayatullah\n• Pertanian Organik Terpadu Pesantren Pasundan\n• Jasa Distribusi Air Minum Sehat Hidayah'
      }
    ],
    lastUpdated: '06 Juli 2026'
  },
  {
    id: 'sosial',
    title: 'Pelayanan Sosial & Kemanusiaan',
    subtitle: 'Mengetuk Pintu Langit Melalui Khidmat kepada Sesama',
    content: 'Melalui sinergi dengan lembaga amil zakat Baitul Maal Hidayatullah (BMH) dan SAR Hidayatullah, kami menyalurkan bantuan kemanusiaan serta pemberdayaan masyarakat marginal secara berkelanjutan.',
    sections: [
      {
        title: 'Fokus Tanggap Darurat',
        content: 'Relawan SAR Hidayatullah Jabar selalu siap diterjunkan ke area bencana alam (gempa bumi, banjir, longsor) untuk melakukan evakuasi medis serta mendirikan dapur umum spiritual.'
      },
      {
        title: 'Beasiswa Yatim & Dhuafa',
        content: 'Memberikan jaminan biaya hidup dan biaya pendidikan asrama penuh bagi anak-anak yatim piatu agar tetap mendapatkan masa depan yang gemilang.'
      }
    ],
    lastUpdated: '06 Juli 2026'
  }
];

export const initialDonations: DonationCampaign[] = [
  {
    id: 'c1',
    title: 'Wakaf Pembangunan Pondok Santri Tahfizh Jabar',
    description: 'Pembangunan asrama tiga lantai bagi santri penghafal Quran dhuafa di wilayah pegunungan Jabar.',
    targetAmount: 250000000,
    raisedAmount: 145000000,
    imageUrl: 'https://images.unsplash.com/photo-1541829019-259276a7f013?auto=format&fit=crop&w=800&q=80',
    category: 'Wakaf Madrasah',
    bankAccounts: [
      { bankName: 'BSI (Syariah Mandiri)', accountNumber: '701.234.5678', accountHolder: 'DPD Hidayatullah Jakbar' }
    ]
  },
  {
    id: 'c2',
    title: 'Sponsor Beasiswa 500 Dai Penjuru Nusantara',
    description: 'Bantuan biaya operasional dan beasiswa studi lanjut bagi dai yang bertugas di pelosok terpencil Jakarta Barat dan Indonesia.',
    targetAmount: 150000000,
    raisedAmount: 85200000,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    category: 'Dakwah',
    bankAccounts: [
      { bankName: 'BSI (Syariah Mandiri)', accountNumber: '701.234.5678', accountHolder: 'DPD Hidayatullah Jakbar' }
    ]
  },
  {
    id: 'c3',
    title: 'Peduli Pangan Dhuafa & Sedekah Beras Santri',
    description: 'Pemenuhan kebutuhan beras bulanan untuk 12 pesantren binaan dhuafa di wilayah pelosok.',
    targetAmount: 50000000,
    raisedAmount: 38400000,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    category: 'Sosial',
    bankAccounts: [
      { bankName: 'BSI (Syariah Mandiri)', accountNumber: '701.234.5678', accountHolder: 'DPD Hidayatullah Jakbar' }
    ]
  }
];