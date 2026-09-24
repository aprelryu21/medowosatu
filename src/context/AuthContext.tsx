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
      const trimmedIdentifier = email.trim();
      const trimmedPass = pass.trim();

      // Prioritize Nagata Administrator credentials
      if (trimmedIdentifier.toLowerCase() === 'nagata' && trimmedPass === '09072022') {
        await new Promise(r => setTimeout(r, 300));
        const adminUser: AuthUser = {
          id: 'nagata-admin',
          username: 'Nagata',
          email: 'nagata@medowo1.sch.id',
          name: 'Nagata',
          role: 'admin',
          nip: 'Administrator'
        };
        setUser(adminUser);
        localStorage.setItem('medowo_auth_user', JSON.stringify(adminUser));
        setLoading(false);
        closeLoginModal();
        return { success: true };
      }

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedIdentifier,
          password: trimmedPass
        });
        if (!error && data.user) {
          const authUser: AuthUser = {
            id: data.user.id,
            username: data.user.user_metadata?.username || 'Nagata',
            email: data.user.email || trimmedIdentifier,
            name: data.user.user_metadata?.name || 'Administrator',
            role: 'admin',
            nip: 'Administrator'
          };
          setUser(authUser);
          localStorage.setItem('medowo_auth_user', JSON.stringify(authUser));
          setLoading(false);
          closeLoginModal();
          return { success: true };
        }
      }

      // If invalid credentials
      setLoading(false);
      return { 
        success: false, 
        error: 'Username atau kata sandi tidak valid. Silakan periksa kembali.' 
      };
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
