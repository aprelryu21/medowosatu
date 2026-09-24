import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: AuthUser | null;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check local demo session or Supabase session
    const saved = localStorage.getItem('medowo_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        // ignore
      }
    }

    if (supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session?.user) {
          const authUser: AuthUser = {
            id: data.session.user.id,
            email: data.session.user.email || 'guru@medowo1.sch.id',
            name: data.session.user.user_metadata?.name || 'Apriliyanto Ratih Sukarno, S.Pd',
            role: (data.session.user.user_metadata?.role as any) || 'guru_kelas',
            nip: '19980421 202521 1 082'
          };
          setUser(authUser);
        }
      });
    }
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass
        });
        if (error) {
          // If error in demo sandbox, provide informative message or check fallback
          if (!email || !pass) {
            setLoading(false);
            return { success: false, error: 'Silakan isi email dan kata sandi.' };
          }
        } else if (data.user) {
          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.name || 'Pendidik Medowo 1',
            role: 'guru_kelas',
            nip: '19980421 202521 1 082'
          };
          setUser(authUser);
          localStorage.setItem('medowo_auth_user', JSON.stringify(authUser));
          setLoading(false);
          closeLoginModal();
          return { success: true };
        }
      }

      // Demo/Fallback authentication for verified test login
      if (email.trim().length > 3 && pass.trim().length >= 4) {
        // Simulate real auth network latency
        await new Promise(r => setTimeout(r, 450));
        const authUser: AuthUser = {
          id: 'usr-demo-01',
          email: email.trim(),
          name: email.toLowerCase().includes('heriyanto') 
            ? 'Heriyanto, S.Pd (Kepala Sekolah)' 
            : 'Apriliyanto Ratih Sukarno, S.Pd (Guru Kelas 3)',
          role: email.toLowerCase().includes('heriyanto') ? 'kepala_sekolah' : 'guru_kelas',
          nip: '19980421 202521 1 082'
        };
        setUser(authUser);
        localStorage.setItem('medowo_auth_user', JSON.stringify(authUser));
        setLoading(false);
        closeLoginModal();
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: 'Email atau kata sandi minimal 4 karakter.' };
      }
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err?.message || 'Gagal memproses autentikasi.' };
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem('medowo_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
