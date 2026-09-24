import { SchoolProfile, Facility, Staff, Extracurricular, NewsArticle, InnovationMedia, PresenseaStudent } from '../types';

export const initialSchoolProfile: SchoolProfile = {
  id: 'sdn-medowo-1-profile',
  name: 'SD Negeri Medowo 1',
  npsn: '20511827',
  accreditation: 'B',
  student_count: 96,
  address: 'Dusun Medowo, Desa Medowo, Kecamatan Kandangan, Kabupaten Kediri, Jawa Timur',
  email: 'sdnmedowosatu@gmail.com',
  phone: '0821-1444-5631',
  principal_name: 'Heriyanto, S.Pd',
  principal_nip: '19780313 200604 1 012',
  principal_welcome: 'Pendidikan bukan sekadar mengisi bejana yang kosong, melainkan menyalakan lentera harapan. Di kaki Gunung Anjasmoro yang sejuk dan asri ini, kami memadukan kearifan tradisi dengan kecakapan digital abad ke-21. Melalui inovasi ekosistem PRESENSEA, setiap detik kehadiran, setiap butir capaian belajar, dan setiap pembiasaan budi pekerti terpantau secara transparan dan penuh kasih sayang. Mari bersama-sama kita antarkan putra-putri tercinta meraih cita-cita tertingginya.',
  vision: 'Terwujudnya Peserta Didik yang Beriman dan Bertakwa, Berkarakter Pancasila, Unggul dalam IPTEK, serta Berwawasan Lingkungan Hidup.',
  slogan: 'Pelopor Sekolah Digital Ramah Lingkungan di Lereng Anjasmoro'
};

export const missionPoints = [
  {
    number: '01',
    title: 'Pembelajaran Berkualitas & Ramah Anak',
    desc: 'Menyelenggarakan pembelajaran berkualitas berbasis digital dan ramah anak yang menyenangkan serta bermakna.'
  },
  {
    number: '02',
    title: 'Moderasi Beragama & Nilai Budaya Jawa',
    desc: 'Menanamkan nilai moderasi beragama, budi pekerti luhur, kearifan lokal budaya Jawa, serta toleransi lintas keyakinan.'
  },
  {
    number: '03',
    title: 'Ekosistem PRESENSEA & Transparansi Digital',
    desc: 'Mengintegrasikan teknologi informasi melalui ekosistem PRESENSEA untuk transparansi administrasi dan kolaborasi sekolah dengan wali murid.'
  },
  {
    number: '04',
    title: 'Konservasi Lingkungan Lereng Anjasmoro',
    desc: 'Mewujudkan sekolah berkarakter lingkungan melalui konservasi alam dan budaya hidup bersih.'
  },
  {
    number: '05',
    title: 'Pengembangan Potensi & Bakat Holistik',
    desc: 'Mengembangkan potensi, minat, dan bakat siswa secara holistik melalui kegiatan ekstrakurikuler seni, kepanduan, keagamaan, dan olahraga.'
  }
];

export const initialFacilities: Facility[] = [
  {
    id: 'fac-1',
    title: 'Perpustakaan Ramah Anak',
    category: 'Literasi & Digital',
    description: 'Ruang baca bernuansa hangat yang menggabungkan buku cetak kurikulum merdeka dan pojok literasi digital berbasis tablet edukasi interaktif.',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    order_index: 1
  },
  {
    id: 'fac-2',
    title: 'Pura Widya Dharma',
    category: 'Spiritual & Moderasi',
    description: 'Tempat persembahyangan dan pembinaan rohani bagi siswa Hindu dengan suasana hening diapit udara sejuk lereng Anjasmoro.',
    image_url: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80',
    order_index: 2
  },
  {
    id: 'fac-3',
    title: 'Mushola Al-Ikhlas',
    category: 'Spiritual & Karakter',
    description: 'Pusat ibadah harian, pembiasaan sholat dhuha dan dhuhur berjamaah, serta pengajian siswa dengan fasilitas wudhu air pegunungan.',
    image_url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    order_index: 3
  },
  {
    id: 'fac-4',
    title: 'Ruang Moderasi Beragama',
    category: 'Keberagaman & Harmoni',
    description: 'Ruang dialog toleransi dan edukasi lintas iman untuk menumbuhkan kerukunan sejati antara siswa dan guru berbeda keyakinan.',
    image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    order_index: 4
  },
  {
    id: 'fac-5',
    title: 'Ruang Gamelan & Karawitan',
    category: 'Seni Budaya',
    description: 'Sanggar pelestarian gamelan Jawa lengkap untuk latihan rutin saron, kendang, gender, dan tembang mocopat para murid.',
    image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    order_index: 5
  },
  {
    id: 'fac-6',
    title: 'Lapangan Voli & Olahraga',
    category: 'Olahraga & Kesehatan',
    description: 'Area outdoor berlantai standar untuk pembinaan kebugaran jasmani, ekstrakurikuler voli, senam pagi, dan olahraga beregu.',
    image_url: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    order_index: 6
  },
  {
    id: 'fac-7',
    title: 'Lapangan Upacara',
    category: 'Kegiatan Sekolah & Kebangsaan',
    description: 'Pusat pengibaran bendera Merah Putih setiap hari Senin, apel karakter kedisiplinan, dan pentas peringatan hari besar kenegaraan.',
    image_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    order_index: 7
  },
  {
    id: 'fac-8',
    title: 'Kantin Sehat & Halal',
    category: 'Kesehatan & Nutrisi',
    description: 'Kantin dengan sertifikasi kebersihan dan pangan bergizi, bebas pengawet berbahaya, serta pembiasaan minim sampah plastik.',
    image_url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&q=80',
    order_index: 8
  },
  {
    id: 'fac-9',
    title: 'Kamar Mandi Bersih',
    category: 'Kebersihan & Sanitasi',
    description: 'Fasilitas sanitasi ramah anak yang bersih, terpisah gender, dengan kelimpahan air bersih alami dari sumber mata air pegunungan.',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    order_index: 9
  },
  {
    id: 'fac-10',
    title: 'Ruang Kelas Nyaman',
    category: 'Pembelajaran & Kenyamanan',
    description: 'Ruang belajar berorientasi student-centered dengan pencahayaan alami, sirkulasi udara pegunungan yang sejuk, dan layar proyeksi digital.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    order_index: 10
  }
];

export const initialStaff: Staff[] = [
  {
    id: 'staff-1',
    name: 'Heriyanto, S.Pd',
    role: 'Kepala Sekolah',
    nip: '19780313 200604 1 012',
    category: 'kepala_sekolah',
    photo_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    order_index: 1,
    bio: 'Memimpin visi keunggulan digital dan pembiasaan cinta lingkungan di lereng Gunung Anjasmoro dengan kepemimpinan transformatif.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-2',
    name: 'Rikah, S.Pd',
    role: 'Guru PJOK',
    nip: '19680308 198803 2 002',
    category: 'guru_mapel',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    order_index: 2,
    bio: 'Membangun kebugaran fisik, daya juang sportif, dan kesehatan peserta didik melalui berbagai cabang olahraga atletik dan permainan.',
    education: 'S1 Pendidikan Jasmani, Kesehatan dan Rekreasi'
  },
  {
    id: 'staff-3',
    name: 'Lailatul Badriyah, S.Pd.I, M.Pd',
    role: 'Guru Pendidikan Agama Islam',
    nip: '19930104 202012 2 012',
    category: 'guru_mapel',
    photo_url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
    order_index: 3,
    bio: 'Membina akhlak mulia siswa muslim, pembelajaran tartil Al-Qur’an, serta pengasuh seni rebana dan sholawat sekolah.',
    education: 'S2 Magister Pendidikan Agama Islam'
  },
  {
    id: 'staff-4',
    name: 'Heru Widiyatama, S.Pd.H',
    role: 'Guru Pendidikan Agama Hindu',
    nip: '19891104 202521 1 042',
    category: 'guru_mapel',
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    order_index: 4,
    bio: 'Membina budi pekerti spiritual Hindu, kearifan Tri Hita Karana, sekaligus membina ekstrakurikuler bola voli sekolah.',
    education: 'S1 Pendidikan Agama Hindu'
  },
  {
    id: 'staff-5',
    name: 'Sriani, SE',
    role: 'Guru Kelas 1',
    nip: null,
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    order_index: 5,
    bio: 'Menemani masa transisi PAUD ke SD yang hangat dan menyenangkan, membangun kecintaan membaca, dan pembina Pramuka Siaga.',
    education: 'Sarjana Ekonomi / Akta Mengajar'
  },
  {
    id: 'staff-6',
    name: 'Wares Kriswahyuni, S.Pd',
    role: 'Guru Kelas 2',
    nip: null,
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    order_index: 6,
    bio: 'Menguatkan literasi dan numerasi kontekstual kelas awal, serta aktif membina kegiatan Pasraman keagamaan siswa Hindu.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-7',
    name: 'Apriliyanto Ratih Sukarno, S.Pd',
    role: 'Guru Kelas 3',
    nip: '19980421 202521 1 082',
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    order_index: 7,
    bio: 'Pengembang inovasi media digital pembelajaran, arsitek ekosistem PRESENSEA, dan pembimbing proyek kolaboratif kelas 3.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-8',
    name: 'Arlina, S.Pd',
    role: 'Guru Kelas 4',
    nip: '19791214 202321 2 011',
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80',
    order_index: 8,
    bio: 'Membimbing eksplorasi sains lingkungan hidup dan bertindak sebagai pembina utama Pramuka Penggalang SD Negeri Medowo 1.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-9',
    name: 'Mujiati, S.Pd.SD',
    role: 'Guru Kelas 5',
    nip: '19690415 200701 2 025',
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
    order_index: 9,
    bio: 'Pendidik berdedikasi tinggi dengan keahlian budaya Jawa, pelatih gamelan karawitan sekolah, dan pengasuh budi pekerti.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-10',
    name: 'Isro\'in Kasanah, S.Pd',
    role: 'Guru Kelas 6',
    nip: '19950813 202012 2 016',
    category: 'guru_kelas',
    photo_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
    order_index: 10,
    bio: 'Mempersiapkan siswa tingkat akhir menuju kelulusan berprestasi, penguasaan asesmen berbasis komputer, dan kepemimpinan pemuda.',
    education: 'S1 Pendidikan Guru Sekolah Dasar'
  },
  {
    id: 'staff-11',
    name: 'Aris Junianto',
    role: 'Tenaga Kependidikan',
    nip: null,
    category: 'tenaga_kependidikan',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    order_index: 11,
    bio: 'Menjaga keamanan terpadu lingkungan sekolah, kebersihan sarana belajar, dan keasrian taman lereng pegunungan.',
    education: 'Staf Operasional & Tenaga Kebersihan'
  }
];

export const initialExtracurriculars: Extracurricular[] = [
  {
    id: 'extra-1',
    name: 'Pramuka Penggalang & Siaga',
    category: 'Karakter & Kepanduan',
    coaches: 'Arlina, S.Pd dan Sriani, SE',
    schedule_days: 'Sabtu',
    start_time: '11:00',
    end_time: '13:00',
    schedule_label: 'Sabtu, 11.00 – 13.00',
    description: 'Menumbuhkan jiwa kepemimpinan, kepedulian sosial, kemandirian berkemah di alam terbuka, dan ketangkasan kepanduan.',
    cover_image: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1200&q=80',
    display_order: 1
  },
  {
    id: 'extra-2',
    name: 'Rebana dan Sholawat',
    category: 'Seni Keagamaan',
    coaches: 'Lailatul Badriyah, S.Pd.I, M.Pd',
    schedule_days: 'Sabtu',
    start_time: '10:00',
    end_time: '11:00',
    schedule_label: 'Sabtu, 10.00 – 11.00',
    description: 'Mengasah musikalitas perkusi rebana islami, melantunkan sholawat, dan membina kekompakan tim seni suara religi.',
    cover_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    display_order: 2
  },
  {
    id: 'extra-3',
    name: 'Gamelan dan Karawitan',
    category: 'Seni Budaya',
    coaches: 'Mujiati, S.Pd.SD',
    schedule_days: 'Selasa & Kamis',
    start_time: '11:00',
    end_time: '12:00',
    schedule_label: 'Selasa & Kamis, 11.00 – 12.00',
    description: 'Pelestarian pusaka gamelan laras pelog dan slendro, mengajarkan keselarasan rasa, adab menabuh, dan tembang Jawa klasik.',
    cover_image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    display_order: 3
  },
  {
    id: 'extra-4',
    name: 'Bola Voli',
    category: 'Olahraga',
    coaches: 'Heru Widiyatama, S.Pd.H',
    schedule_days: 'Senin & Kamis',
    start_time: '12:00',
    end_time: '13:00',
    schedule_label: 'Senin & Kamis, 12.00 – 13.00',
    description: 'Latihan fisik atletik, passing bawah dan atas, taktik permainan tim, serta persiapan pertandingan voli tingkat gugus sekolah.',
    cover_image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    display_order: 4
  },
  {
    id: 'extra-5',
    name: 'Baca Tulis Al-Qur\'an',
    category: 'Keagamaan',
    coaches: 'Lailatul Badriyah, S.Pd.I, M.Pd',
    schedule_days: 'Senin–Kamis',
    start_time: '11:00',
    end_time: '12:00',
    schedule_label: 'Senin–Kamis, 11.00 – 12.00',
    description: 'Pembelajaran membaca ayat suci Al-Qur’an bertahap dengan kaidah tajwid yang benar serta pembiasaan adab Qur’ani sehari-hari.',
    cover_image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
    display_order: 5
  },
  {
    id: 'extra-6',
    name: 'Pasraman',
    category: 'Keagamaan',
    coaches: 'Wares Kriswahyuni, S.Pd',
    schedule_days: 'Minggu',
    start_time: '08:00',
    end_time: '10:00',
    schedule_label: 'Minggu pagi',
    description: 'Pembinaan keagamaan Hindu terpadu di Pura Widya Dharma, pelafalan mantra suci, cerita Itihasa, dan etika susila luhur.',
    cover_image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80',
    display_order: 6
  }
];

export const initialNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Transformasi PRESENSEA: Menghubungkan Presensi Real-Time Guru dan Wali Murid',
    slug: 'transformasi-presensea-presensi-real-time-sdn-medowo-1',
    excerpt: 'Penerapan ekosistem digital PRESENSEA di SD Negeri Medowo 1 menyederhanakan pencatatan kehadiran harian siswa lereng Anjasmoro dengan kode QR aman tanpa kertas.',
    content: 'SD Negeri Medowo 1 terus membuktikan komitmennya sebagai pelopor sekolah dasar digital di kawasan pegunungan Kediri. Melalui sistem PRESENSEA yang dikembangkan secara mandiri, bapak dan ibu guru dapat menyelesaikan absensi seluruh kelas dalam hitungan detik. Data presensi langsung terenkripsi dan dapat dipantau oleh kepala sekolah serta orang tua siswa.',
    cover_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    category: 'Inovasi Digital',
    author: 'Apriliyanto Ratih Sukarno, S.Pd',
    published_at: '24 September 2026',
    featured: true,
    status: 'published'
  },
  {
    id: 'news-2',
    title: 'Harmoni Kerukunan Lintas Iman di Lereng Anjasmoro Melalui Ruang Moderasi',
    slug: 'harmoni-kerukunan-lintas-iman-lereng-anjasmoro',
    excerpt: 'Suasana damai terpancar dalam kegiatan kebersamaan siswa Muslim dan Hindu di Ruang Moderasi Beragama dan Pura Widya Dharma SD Negeri Medowo 1.',
    content: 'Kerukunan antarumat beragama menjadi pondasi utama pendidikan karakter di SD Negeri Medowo 1. Siswa dan para guru saling menghargai perayaan hari besar keagamaan, belajar bersama mengenai nilai-nilai luhur Pancasila, dan merawat kebersihan lingkungan secara gotong royong.',
    cover_image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    category: 'Karakter & Budaya',
    author: 'Lailatul Badriyah, M.Pd',
    published_at: '18 September 2026',
    featured: false,
    status: 'published'
  },
  {
    id: 'news-3',
    title: 'Program Konservasi Alam: Kebun Sekolah Ramah Lingkungan Berbasis Organik',
    slug: 'program-konservasi-kebun-sekolah-organik',
    excerpt: 'Mengajarkan siswa mencintai alam lereng pegunungan dengan merawat sayuran organik bebas bahan kimia dan hemat air.',
    content: 'Sebagai sekolah berwawasan lingkungan hidup, SD Negeri Medowo 1 mengajak seluruh siswa untuk terjun langsung merawat kebun sekolah. Hasil panen sayuran segar dimanfaatkan untuk program makan siang sehat dan edukasi agrikultur lestari.',
    cover_image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1200&q=80',
    category: 'Lingkungan Hidup',
    author: 'Arlina, S.Pd',
    published_at: '12 September 2026',
    featured: false,
    status: 'published'
  }
];

export const initialInnovationMedia: InnovationMedia[] = [
  {
    id: 'media-1',
    title: 'PRESENSEA SaaS Core',
    slug: 'presensea-saas-core',
    description: 'Platform tata kelola presensi cerdas dengan pemindai QR kilat, modul jurnal guru, dan analitik kehadiran real-time terintegrasi.',
    category: 'SaaS Edukasi Sekolah',
    creator: 'Apriliyanto Ratih Sukarno, S.Pd',
    year: 2026,
    preview_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demo_url: '#presensea',
    tags: ['NextGen EdTech', 'QR Scanner', 'Cloud Sync', 'Realtime']
  },
  {
    id: 'media-2',
    title: 'Pustaka Interaktif Gamelan Medowo',
    slug: 'pustaka-interaktif-gamelan-medowo',
    description: 'Media pembelajaran visual dan audio digital untuk pengenalan laras gamelan, kendang, dan notasi saron khas Jawa Timuran.',
    category: 'Media Budaya Digital',
    creator: 'Mujiati, S.Pd.SD',
    year: 2025,
    preview_image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    demo_url: '#media-inovasi',
    tags: ['Budaya Jawa', 'Gamelan', 'Interactive Audio']
  },
  {
    id: 'media-3',
    title: 'Lembar Asesmen Digital Siswa (LEMASIS)',
    slug: 'lemasis-digital-assessment',
    description: 'Aplikasi kuis formatif interaktif ringan untuk evaluasi numerasi dan literasi kontekstual siswa kelas dasar.',
    category: 'Alat Asesmen Kelas',
    creator: 'Tim Pendidik Medowo 1',
    year: 2025,
    preview_image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    demo_url: '#media-inovasi',
    tags: ['Asesmen Formatif', 'Numerasi', 'Ramah Anak']
  }
];

export const samplePresenseaStudents: PresenseaStudent[] = [
  { id: 'std-1', nisn: '0129481921', name: 'Aditya Pratama', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:42:15' },
  { id: 'std-2', nisn: '0129481922', name: 'Anindya Kirana Putri', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:44:30' },
  { id: 'std-3', nisn: '0129481923', name: 'Bagas Wahyu Nugroho', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:48:02' },
  { id: 'std-4', nisn: '0129481924', name: 'Dewi Ayu Saraswati', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:50:11' },
  { id: 'std-5', nisn: '0129481925', name: 'Fajar Eka Saputra', class_name: 'Kelas 3', status: 'Izin', timestamp: '07:05:00' },
  { id: 'std-6', nisn: '0129481926', name: 'Gita Maharani', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:52:48' },
  { id: 'std-7', nisn: '0129481927', name: 'I Made Danu Tirta', class_name: 'Kelas 3', status: 'Hadir', timestamp: '06:54:19' },
  { id: 'std-8', nisn: '0129481928', name: 'Nabila Zahra Syifa', class_name: 'Kelas 3', status: 'Sakit', timestamp: '07:15:00' }
];
