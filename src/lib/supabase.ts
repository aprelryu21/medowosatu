import { createClient } from '@supabase/supabase-js';
import { 
  SchoolProfile, 
  Facility, 
  Staff, 
  Extracurricular, 
  NewsArticle, 
  InnovationMedia 
} from '../types';
import { 
  initialSchoolProfile, 
  initialFacilities, 
  initialStaff, 
  initialExtracurriculars, 
  initialNews, 
  initialInnovationMedia 
} from '../data/seedData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Robust Supabase Data Access with graceful offline fallback
 */
export async function getSchoolProfile(): Promise<SchoolProfile> {
  if (!supabase) return initialSchoolProfile;
  try {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      console.warn('Supabase profile fetch fallback to seed:', error?.message);
      return initialSchoolProfile;
    }
    return data as SchoolProfile;
  } catch {
    return initialSchoolProfile;
  }
}

export async function getFacilities(): Promise<Facility[]> {
  if (!supabase) return initialFacilities;
  try {
    const { data, error } = await supabase
      .from('school_facilities')
      .select('*')
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialFacilities;
    }
    return data as Facility[];
  } catch {
    return initialFacilities;
  }
}

export async function getStaffList(): Promise<Staff[]> {
  if (!supabase) return initialStaff;
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialStaff;
    }
    return data as Staff[];
  } catch {
    return initialStaff;
  }
}

export async function getExtracurriculars(): Promise<Extracurricular[]> {
  if (!supabase) return initialExtracurriculars;
  try {
    const { data, error } = await supabase
      .from('extracurriculars')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialExtracurriculars;
    }
    return data as Extracurricular[];
  } catch {
    return initialExtracurriculars;
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  if (!supabase) return initialNews;
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialNews;
    }
    return data as NewsArticle[];
  } catch {
    return initialNews;
  }
}

export async function getInnovationMedia(): Promise<InnovationMedia[]> {
  if (!supabase) return initialInnovationMedia;
  try {
    const { data, error } = await supabase
      .from('innovation_media')
      .select('*')
      .order('year', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialInnovationMedia;
    }
    return data as InnovationMedia[];
  } catch {
    return initialInnovationMedia;
  }
}
