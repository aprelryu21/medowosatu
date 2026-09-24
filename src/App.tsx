import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { FloatingNavbar } from './components/navigation/FloatingNavbar';
import { LoginModal } from './components/modal/LoginModal';
import { HeroSection } from './sections/hero/HeroSection';
import { SchoolIdentitySection } from './sections/school/SchoolIdentitySection';
import { VisionSection } from './sections/vision/VisionSection';
import { MissionSection } from './sections/mission/MissionSection';
import { PrincipalWelcomeSection } from './sections/principal/PrincipalWelcomeSection';
import { FacilitiesGallerySection } from './sections/facilities/FacilitiesGallerySection';
import { StaffShowcaseSection } from './sections/teachers/StaffShowcaseSection';
import { ExtracurricularSection } from './sections/extracurricular/ExtracurricularSection';
import { PresenseaShowcaseSection } from './sections/presensea/PresenseaShowcaseSection';
import { NewsSection } from './sections/news/NewsSection';
import { InnovationMediaSection } from './sections/innovation/InnovationMediaSection';
import { AdmissionSPMBSection } from './sections/admission/AdmissionSPMBSection';
import { SocialMediaSection } from './sections/social/SocialMediaSection';
import { FooterSection } from './sections/footer/FooterSection';

// Dedicated Standalone Pages
import { NewsListPage } from './pages/NewsListPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { MediaListPage } from './pages/MediaListPage';
import { MediaDetailPage } from './pages/MediaDetailPage';
import { AdminPage } from './pages/admin/AdminPage';

import {
  SchoolProfile,
  Facility,
  Staff,
  Extracurricular,
  NewsArticle,
  InnovationMedia
} from './types';

import {
  getSchoolProfile,
  getFacilities,
  getStaffList,
  getExtracurriculars,
  getNews,
  getInnovationMedia
} from './lib/supabase';

import {
  initialSchoolProfile,
  initialFacilities,
  initialStaff,
  initialExtracurriculars,
  initialNews,
  initialInnovationMedia
} from './data/seedData';

function MainAppContent() {
  const [profile, setProfile] = useState<SchoolProfile>(initialSchoolProfile);
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(initialExtracurriculars);
  const [newsList, setNewsList] = useState<NewsArticle[]>(initialNews);
  const [mediaList, setMediaList] = useState<InnovationMedia[]>(initialInnovationMedia);
  const [isLoading, setIsLoading] = useState(true);

  const { isHome, isNewsList, isNewsDetail, isMediaList, isMediaDetail, isAdmin, newsSlugOrId, mediaSlugOrId } = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const [
          fetchedProfile,
          fetchedFacilities,
          fetchedStaff,
          fetchedExtra,
          fetchedNews,
          fetchedMedia
        ] = await Promise.all([
          getSchoolProfile(),
          getFacilities(),
          getStaffList(),
          getExtracurriculars(),
          getNews(),
          getInnovationMedia()
        ]);

        if (fetchedProfile) setProfile(fetchedProfile);
        if (fetchedFacilities?.length) setFacilities(fetchedFacilities);
        if (fetchedStaff?.length) setStaffList(fetchedStaff);
        if (fetchedExtra?.length) setExtracurriculars(fetchedExtra);
        if (fetchedNews?.length) setNewsList(fetchedNews);
        if (fetchedMedia?.length) setMediaList(fetchedMedia);
      } catch (err) {
        console.warn('Menggunakan fallback data lokal:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Seamless Floating Navigation Bar */}
      <FloatingNavbar onNavigate={scrollToSection} />

      {/* Main Content Area based on Client Route */}
      <main className="flex-1 w-full">
        {/* Route 1: News Archive Page (/berita) */}
        {isNewsList && (
          <NewsListPage newsArticles={newsList} />
        )}

        {/* Route 2: News Detail Page (/berita/:slug or /berita/:id) */}
        {isNewsDetail && (
          <NewsDetailPage newsArticles={newsList} slugOrId={newsSlugOrId} />
        )}

        {/* Route 3: Media Inovasi Archive Page (/media) */}
        {isMediaList && (
          <MediaListPage mediaItems={mediaList} />
        )}

        {/* Route 4: Media Inovasi Detail Page (/media/:id or /media/:slug) */}
        {isMediaDetail && (
          <MediaDetailPage mediaItems={mediaList} slugOrId={mediaSlugOrId} />
        )}

        {/* Route 5: Default Homepage (/) */}
        {isHome && (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onExplore={() => scrollToSection('profil')}
              onPresensea={() => scrollToSection('presensea')}
            />

            {/* 2. School Identity Section */}
            <SchoolIdentitySection
              profile={profile}
              staffList={staffList}
            />

            {/* 3. Vision Section */}
            <VisionSection visionText={profile.vision} />

            {/* 4. Mission Section */}
            <MissionSection />

            {/* 5. Principal's Welcome Section */}
            <PrincipalWelcomeSection
              name={profile.principal_name}
              nip={profile.principal_nip}
              welcomeText={profile.principal_welcome}
            />

            {/* 6. Facilities Showcase */}
            <FacilitiesGallerySection facilities={facilities} />

            {/* 7. Staff & Educators Showcase */}
            <StaffShowcaseSection staffList={staffList} />

            {/* 8. Extracurriculars Showcase */}
            <ExtracurricularSection extracurriculars={extracurriculars} />

            {/* 9. PRESENSEA — Premium SaaS Product Experience */}
            <PresenseaShowcaseSection />

            {/* 10. News & School Publications */}
            <NewsSection newsArticles={newsList} />

            {/* 11. Media Inovasi Portfolio */}
            <InnovationMediaSection mediaItems={mediaList} />

            {/* 12. SPMB Admission CTA */}
            <AdmissionSPMBSection profile={profile} />

            {/* 13. Social Media Section */}
            <SocialMediaSection />
          </>
        )}
      </main>

      {/* Deep Navy Premium Footer */}
      <FooterSection profile={profile} />

      {/* Portal Guru Login Modal */}
      <LoginModal />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider>
          <MainAppContent />
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
