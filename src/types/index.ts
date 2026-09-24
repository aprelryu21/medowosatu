export type UserRole = 'admin' | 'kepala_sekolah' | 'guru_kelas' | 'guru_mapel' | 'wali_murid';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  name: string;
  role: UserRole;
  nip?: string;
}

export interface SchoolProfile {
  id: string;
  name: string;
  npsn: string;
  accreditation: string;
  student_count: number;
  address: string;
  email: string;
  phone: string;
  principal_name: string;
  principal_nip: string;
  principal_welcome: string;
  vision: string;
  slogan: string;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  order_index: number;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  nip: string | null;
  category: 'kepala_sekolah' | 'guru_mapel' | 'guru_kelas' | 'tenaga_kependidikan';
  photo_url: string;
  order_index: number;
  bio: string;
  education: string;
  academic_degree?: string;
  education_history?: string;
  email?: string;
  phone?: string;
  message?: string;
  dedication?: string;
  quote?: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: string;
  coaches: string;
  schedule_days: string;
  start_time: string;
  end_time: string;
  schedule_label: string;
  description: string;
  cover_image: string;
  display_order: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  author: string;
  published_at: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
}

export interface InnovationMedia {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  creator: string;
  year: number;
  preview_image: string;
  demo_url: string;
  tags: string[];
}

export interface PresenseaStudent {
  id: string;
  nisn: string;
  name: string;
  class_name: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  timestamp?: string;
  avatar_url?: string;
}
