-- Migration: 20260924_initial_schema.sql
-- SD Negeri Medowo 1 + PRESENSEA Master Database Schema & Initial Seed
-- Author: Full-Stack & Supabase Engineer

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. School Profile
CREATE TABLE IF NOT EXISTS school_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    npsn VARCHAR(20) NOT NULL UNIQUE,
    accreditation VARCHAR(5) NOT NULL,
    student_count INTEGER NOT NULL DEFAULT 96,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    principal_name VARCHAR(255) NOT NULL,
    principal_nip VARCHAR(50) NOT NULL,
    principal_welcome TEXT NOT NULL,
    vision TEXT NOT NULL,
    slogan TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. School Facilities
CREATE TABLE IF NOT EXISTS school_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Staff & Educators (Tenaga Pendidik & Kependidikan)
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(150) NOT NULL,
    nip VARCHAR(50),
    category VARCHAR(50) NOT NULL CHECK (category IN ('kepala_sekolah', 'guru_mapel', 'guru_kelas', 'tenaga_kependidikan')),
    photo_url TEXT,
    order_index INTEGER DEFAULT 0,
    bio TEXT,
    education VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Extracurriculars
CREATE TABLE IF NOT EXISTS extracurriculars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    coaches TEXT NOT NULL,
    schedule_days VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    schedule_label VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. News (Berita Sekolah)
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(150) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Media Inovasi
CREATE TABLE IF NOT EXISTS innovation_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    creator VARCHAR(150) NOT NULL,
    year INTEGER NOT NULL,
    preview_image TEXT,
    demo_url TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Site Settings & Navigation
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_navigation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(100) NOT NULL,
    href VARCHAR(255) NOT NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 8. PRESENSEA Core Foundation
CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    grade_level INTEGER NOT NULL,
    homeroom_teacher_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nis VARCHAR(20) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('L', 'P')),
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_qr_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    secure_token VARCHAR(128) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    session_type VARCHAR(20) DEFAULT 'morning' CHECK (session_type IN ('morning', 'afternoon')),
    opened_by UUID REFERENCES staff(id),
    is_closed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Hadir', 'Sakit', 'Izin', 'Alpa')),
    scan_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verification_method VARCHAR(20) DEFAULT 'qr_scan' CHECK (verification_method IN ('qr_scan', 'manual', 'camera_ai')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Setup
-- ============================================================================
ALTER TABLE school_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE extracurriculars ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Public READ Policies for Landing Page Content
CREATE POLICY "Public Read School Profile" ON school_profile FOR SELECT USING (true);
CREATE POLICY "Public Read Facilities" ON school_facilities FOR SELECT USING (true);
CREATE POLICY "Public Read Staff" ON staff FOR SELECT USING (true);
CREATE POLICY "Public Read Extracurriculars" ON extracurriculars FOR SELECT USING (true);
CREATE POLICY "Public Read Published News" ON news FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Innovation Media" ON innovation_media FOR SELECT USING (true);
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Site Navigation" ON site_navigation FOR SELECT USING (is_active = true);

-- Authenticated Staff/Teacher Policies
CREATE POLICY "Authenticated Staff Full Access" ON attendance_records
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated Sessions Full Access" ON attendance_sessions
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- School Profile
INSERT INTO school_profile (
    name, npsn, accreditation, student_count, address, email, phone,
    principal_name, principal_nip, principal_welcome, vision, slogan
) VALUES (
    'SD Negeri Medowo 1',
    '20511827',
    'B',
    96,
    'Dusun Medowo, Desa Medowo, Kecamatan Kandangan, Kabupaten Kediri, Jawa Timur',
    'sdnmedowosatu@gmail.com',
    '0821-1444-5631',
    'Heriyanto, S.Pd',
    '19780313 200604 1 012',
    'Pendidikan bukan sekadar mengisi bejana yang kosong, melainkan menyalakan lentera harapan. Di kaki Gunung Anjasmoro yang sejuk dan asri ini, kami memadukan kearifan tradisi dengan kecakapan digital abad ke-21. Melalui inovasi ekosistem PRESENSEA, setiap detik kehadiran, setiap butir capaian belajar, dan setiap pembiasaan budi pekerti terpantau secara transparan dan penuh kasih sayang. Mari bersama-sama kita antarkan putra-putri tercinta meraih cita-cita tertingginya.',
    'Terwujudnya Peserta Didik yang Beriman dan Bertakwa, Berkarakter Pancasila, Unggul dalam IPTEK, serta Berwawasan Lingkungan Hidup.',
    'Pelopor Sekolah Digital Ramah Lingkungan di Lereng Anjasmoro'
);

-- Facilities Seed
INSERT INTO school_facilities (title, category, description, image_url, order_index) VALUES
('Perpustakaan Ramah Anak', 'Literasi & Digital', 'Ruang baca bernuansa hangat yang menggabungkan koleksi buku fisik pilihan dan sudut literasi digital berbasis tablet edukatif.', 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', 1),
('Pura Widya Dharma', 'Spiritual & Moderasi', 'Tempat persembahyangan dan pembinaan spiritual bagi siswa beragama Hindu dalam suasana asri dan penuh keheningan pegunungan.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80', 2),
('Mushola Al-Ikhlas', 'Spiritual & Karakter', 'Sarana ibadah sholat berjamaah, pembiasaan sholat dhuha, dan bimbingan rohani Islam yang bersih dan nyaman.', 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80', 3),
('Ruang Moderasi Beragama', 'Keberagaman & Harmoni', 'Ruang dialog dan pembelajaran bersama yang merekatkan kerukunan antarumat beragama di lingkungan sekolah.', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80', 4),
('Ruang Gamelan & Karawitan', 'Seni Budaya', 'Pusat pelestarian kebudayaan luhur Jawa tempat siswa berlatih gamelan selompret, kendang, gong, dan tembang tradisional.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80', 5),
('Lapangan Voli & Olahraga', 'Olahraga & Kesehatan', 'Fasilitas luar ruang standar untuk pembinaan kebugaran jasmani, turnamen antar-kelas, dan pelatihan ekstrakurikuler bola voli.', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80', 6),
('Lapangan Upacara', 'Kegiatan Sekolah & Kebangsaan', 'Area utama upacara bendera, apel pagi berkarakter, serta pusat peringatan hari-hari besar nasional di lereng Anjasmoro.', 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80', 7),
('Kantin Sehat & Halal', 'Kesehatan & Nutrisi', 'Penyedia asupan gizi seimbang dengan standar higienis ketat dan edukasi pengelolaan sampah bebas plastik sekali pakai.', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1200&q=80', 8),
('Kamar Mandi Bersih', 'Kebersihan & Sanitasi', 'Sanitasi ramah anak yang terawat berkala dengan suplai air pegunungan alami yang mengalir jernih setiap hari.', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', 9),
('Ruang Kelas Nyaman', 'Pembelajaran & Kenyamanan', 'Ruang belajar berorientasi student-centered dilengkapi ventilasi sejuk alami, pencahayaan optimal, dan proyektor digital interaktif.', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80', 10);

-- Staff Seed
INSERT INTO staff (name, role, nip, category, photo_url, order_index, bio, education) VALUES
('Heriyanto, S.Pd', 'Kepala Sekolah', '19780313 200604 1 012', 'kepala_sekolah', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', 1, 'Memimpin transformasi digital dan penguatan karakter ramah lingkungan di SD Negeri Medowo 1.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Rikah, S.Pd', 'Guru PJOK', '19680308 198803 2 002', 'guru_mapel', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80', 2, 'Membina kebugaran jasmani, sportivitas, dan gaya hidup sehat generasi muda Medowo.', 'S1 Pendidikan Jasmani, Kesehatan, dan Rekreasi'),
('Lailatul Badriyah, S.Pd.I, M.Pd', 'Guru Pendidikan Agama Islam', '19930104 202012 2 012', 'guru_mapel', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80', 3, 'Mendedikasikan bimbingan akhlakul karimah, seni rebana islami, dan moderasi beragama.', 'S2 Pendidikan Agama Islam'),
('Heru Widiyatama, S.Pd.H', 'Guru Pendidikan Agama Hindu', '19891104 202521 1 042', 'guru_mapel', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', 4, 'Mengampu pendidikan budi pekerti Hindu dan pelatih ekstrakurikuler olahraga bola voli.', 'S1 Pendidikan Agama Hindu'),
('Sriani, SE', 'Guru Kelas 1', NULL, 'guru_kelas', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80', 5, 'Spesialis transisi PAUD-SD menyenangkan, fondasi calistung dini, dan pembina kepanduan Siaga.', 'Sarjana Ekonomi / Akta Mengajar'),
('Wares Kriswahyuni, S.Pd', 'Guru Kelas 2', NULL, 'guru_kelas', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80', 6, 'Membangun kebiasaan literasi dini, pendamping pasraman, dan kreativitas numerasi anak.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Apriliyanto Ratih Sukarno, S.Pd', 'Guru Kelas 3', '19980421 202521 1 082', 'guru_kelas', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80', 7, 'Penggagas inovasi teknologi kelas, arsitek ekosistem PRESENSEA, dan penggiat edutech.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Arlina, S.Pd', 'Guru Kelas 4', '19791214 202321 2 011', 'guru_kelas', 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80', 8, 'Pembina Pramuka Penggalang handal dan pendidik sains kontekstual ramah lingkungan.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Mujiati, S.Pd.SD', 'Guru Kelas 5', '19690415 200701 2 025', 'guru_kelas', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80', 9, 'Senior pendidik berdedikasi, pelestari seni gamelan karawitan Jawa, dan pembina karakter.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Isro''in Kasanah, S.Pd', 'Guru Kelas 6', '19950813 202012 2 016', 'guru_kelas', 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80', 10, 'Mempersiapkan kelulusan siswa berprestasi, kecakapan asesmen digital, dan kepemimpinan.', 'S1 Pendidikan Guru Sekolah Dasar'),
('Aris Junianto', 'Tenaga Kependidikan', NULL, 'tenaga_kependidikan', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80', 11, 'Menjaga keamanan lingkungan sekolah, kenyamanan sarana, dan kelestarian taman hijau.', 'Staf Operasional & Kebersihan');

-- Extracurriculars Seed
INSERT INTO extracurriculars (name, category, coaches, schedule_days, start_time, end_time, schedule_label, description, cover_image, display_order) VALUES
('Pramuka Penggalang & Siaga', 'Karakter & Kepanduan', 'Arlina, S.Pd dan Sriani, SE', 'Sabtu', '11:00', '13:00', 'Setiap Sabtu, 11.00 - 13.00 WIB', 'Menempa kemandirian, kedisiplinan, kecintaan alam lereng Anjasmoro, kepemimpinan regu, dan ketangkasan tali-temali.', 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80', 1),
('Rebana dan Sholawat', 'Seni Keagamaan', 'Lailatul Badriyah, S.Pd.I, M.Pd', 'Sabtu', '10:00', '11:00', 'Setiap Sabtu, 10.00 - 11.00 WIB', 'Melatih kepekaan ritmis rebana terbang, lantunan sholawat nabi, serta penguatan adab dan kecintaan seni Islam.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80', 2),
('Gamelan dan Karawitan', 'Seni Budaya', 'Mujiati, S.Pd.SD', 'Selasa & Kamis', '11:00', '12:00', 'Selasa & Kamis, 11.00 - 12.00 WIB', 'Pelestarian pusaka gending Jawa, melatih harmoni tabuhan saron, demung, bonang, dan rasa cinta budaya adiluhung.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1000&q=80', 3),
('Bola Voli', 'Olahraga', 'Heru Widiyatama, S.Pd.H', 'Senin & Kamis', '12:00', '13:00', 'Senin & Kamis, 12.00 - 13.00 WIB', 'Pengembangan teknik servis, passing, kerjasama tim, dan pembibitan atlet voli sekolah berprestasi tingkat kecamatan.', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80', 4),
('Baca Tulis Al-Qur''an', 'Keagamaan', 'Lailatul Badriyah, S.Pd.I, M.Pd', 'Senin - Kamis', '11:00', '12:00', 'Senin - Kamis, 11.00 - 12.00 WIB', 'Bimbingan tartil qira''ah, tajwid dasar, hafalan juz ''amma, dan pembiasaan adab Qur''ani sejak jenjang awal.', 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80', 5),
('Pasraman', 'Keagamaan', 'Wares Kriswahyuni, S.Pd', 'Minggu', '08:00', '10:00', 'Minggu Pagi, 08.00 - 10.00 WIB', 'Pendidikan keagamaan Hindu komprehensif, pelafalan mantra Puja Trisandya, serta pembiasaan Tri Hita Karana.', 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1000&q=80', 6);

-- News Seed
INSERT INTO news (title, slug, excerpt, content, cover_image, category, author, published_at, featured, status) VALUES
('Implementasi PRESENSEA 2.0: Langkah Nyata Digitalisasi Sekolah Ramah Lingkungan', 'implementasi-presensea-sekolah-digital-ramah-lingkungan', 'SD Negeri Medowo 1 resmi meluncurkan pembaruan sistem PRESENSEA untuk mempercepat rekap kehadiran dan mengurangi konsumsi kertas secara terintegrasi.', 'Pembaruan ekosistem PRESENSEA membawa lompatan signifikan dalam efisiensi administrasi kelas di SD Negeri Medowo 1. Kepala Sekolah Heriyanto, S.Pd menegaskan bahwa teknologi ini dibangun untuk memudahkan guru mencatat kehadiran siswa dengan kode QR terenkripsi sekaligus memberikan rasa tenang kepada para wali murid. Inovasi ini selaras dengan visi sekolah sebagai pelopor sekolah ramah lingkungan di kaki Gunung Anjasmoro.', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', 'Inovasi Digital', 'Tim Redaksi Medowo', NOW() - INTERVAL '2 days', TRUE, 'published'),
('Semarak Harmoni Moderasi Beragama di Lereng Gunung Anjasmoro', 'semarak-harmoni-moderasi-beragama-lereng-anjasmoro', 'Siswa-siswi lintas keyakinan berkolaborasi dalam pagelaran seni karawitan dan aksi bersih lingkungan bersama.', 'Keberagaman adalah anugerah terindah di SD Negeri Medowo 1. Melalui Ruang Moderasi Beragama dan program persaudaraan sejati, siswa muslim dan hindu saling mendukung dalam berbagai perayaan dan kegiatan sosial sekolah.', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80', 'Budaya & Karakter', 'Lailatul Badriyah, M.Pd', NOW() - INTERVAL '5 days', FALSE, 'published'),
('Panen Sayur Organik Kebun Sekolah: Mengasah Karakter Peduli Alam Sejak Dini', 'panen-sayur-organik-kebun-sekolah-peduli-alam', 'Pendidikan lingkungan hidup dipraktikkan langsung melalui kebun ramah anak berbasis kompos alami pegunungan.', 'Kegiatan pemeliharaan lingkungan hidup bukan hanya teori buku. Siswa kelas 4 dan 5 merawat bedengan sayuran organik dan mempelajari siklus air bersih dari mata air Gunung Anjasmoro.', 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=1200&q=80', 'Lingkungan Hidup', 'Arlina, S.Pd', NOW() - INTERVAL '9 days', FALSE, 'published');

-- Innovation Media Seed
INSERT INTO innovation_media (title, slug, description, category, creator, year, preview_image, demo_url, tags) VALUES
('PRESENSEA Core Cloud', 'presensea-core-cloud', 'Ekosistem presensi QR presisi tinggi, buku jurnal otomatis, dan transparansi laporan capaian belajar peserta didik.', 'Aplikasi SaaS Sekolah', 'Apriliyanto Ratih Sukarno, S.Pd', 2026, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', '#presensea-demo', ARRAY['React', 'Supabase', 'TypeScript', 'EdTech']),
('Modul Interaktif Matematika Lereng Hijau', 'modul-interaktif-matematika-lereng-hijau', 'Lembar kerja digital interaktif berkonsep gamifikasi untuk pembelajaran pecahan dan pengukuran kontekstual.', 'Media Pembelajaran Digital', 'Tim Guru Kelas Medowo', 2025, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', '#media-preview', ARRAY['Gamifikasi', 'Numerasi', 'SD Ramah Anak']),
('Pustaka Digital Karawitan Medowo', 'pustaka-digital-karawitan-medowo', 'Repositori audio notasi gending Jawa untuk pelestarian instrumen gamelan sekolah.', 'Karya Budaya Digital', 'Mujiati, S.Pd.SD', 2025, 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80', '#pustaka-audio', ARRAY['Karawitan', 'Gamelan', 'Kearifan Lokal']);
