import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, scrollToTop?: boolean) => void;
  isHome: boolean;
  isNewsList: boolean;
  isNewsDetail: boolean;
  isMediaList: boolean;
  isMediaDetail: boolean;
  isAdmin: boolean;
  newsSlugOrId: string | null;
  mediaSlugOrId: string | null;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, scrollToTop: boolean = true) => {
    // If target starts with '#' only, handle section scrolling on home
    if (to.startsWith('#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/' + to);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(to.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(to.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Normal path navigation
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
    }
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matchers
  // Normalize path without trailing slash (unless root)
  const normalized = currentPath.length > 1 && currentPath.endsWith('/') 
    ? currentPath.slice(0, -1) 
    : currentPath;

  const isHome = normalized === '/' || normalized === '';
  const isNewsList = normalized === '/berita';
  const isMediaList = normalized === '/media' || normalized === '/inovasi-media';
  const isAdmin = normalized === '/admin' || normalized.startsWith('/admin/');

  // Check /berita/:id or /berita/:slug
  let isNewsDetail = false;
  let newsSlugOrId: string | null = null;
  if (normalized.startsWith('/berita/')) {
    const segment = normalized.replace('/berita/', '').trim();
    if (segment.length > 0) {
      isNewsDetail = true;
      newsSlugOrId = decodeURIComponent(segment);
    }
  }

  // Check /media/:id or /media/:slug
  let isMediaDetail = false;
  let mediaSlugOrId: string | null = null;
  if (normalized.startsWith('/media/') || normalized.startsWith('/inovasi-media/')) {
    const segment = normalized.startsWith('/media/') 
      ? normalized.replace('/media/', '').trim()
      : normalized.replace('/inovasi-media/', '').trim();
    if (segment.length > 0) {
      isMediaDetail = true;
      mediaSlugOrId = decodeURIComponent(segment);
    }
  }

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        isHome,
        isNewsList,
        isNewsDetail,
        isMediaList,
        isMediaDetail,
        isAdmin,
        newsSlugOrId,
        mediaSlugOrId
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
