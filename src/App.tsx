import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { ThirtySecondHelpBanner } from './components/ThirtySecondHelpBanner';
import { NewsPortal } from './components/NewsPortal';
import { HelpCentre } from './components/HelpCentre';
import { ResourceDirectory } from './components/ResourceDirectory';
import { EventsSystem } from './components/EventsSystem';
import { CommunityHub } from './components/CommunityHub';
import { MemberDashboard } from './components/MemberDashboard';
import { AdminDashboard } from './components/CMS/AdminDashboard';
import { TheDesiAIModal } from './components/TheDesiAIModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';

function MainApp() {
  const { isLoggedIn, activeRole } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('news');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const handleOpenAI = (prompt?: string) => {
    if (prompt) setAiPrompt(prompt);
    setIsAiOpen(true);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveTab('news');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'login') {
      setIsLoginOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-[#cc0000] selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAI={() => handleOpenAI()}
        onOpenSearch={handleOpenSearch}
      />

      {/* 30-Second Solution Help Banner (shown on main public views) */}
      {['news', 'immigration', 'help', 'directory'].includes(activeTab) && (
        <ThirtySecondHelpBanner
          onSearch={handleSearchSubmit}
          onOpenAI={handleOpenAI}
          onSelectTopic={(topicId) => {
            if (topicId === 'aima') setActiveTab('immigration');
            else if (topicId === 'sns' || topicId === 'nif-niss') setActiveTab('help');
            else setActiveTab('directory');
          }}
        />
      )}

      {/* Main Body View Switching */}
      <main className="flex-1">
        {activeTab === 'news' && (
          <NewsPortal
            searchQuery={searchQuery}
            onOpenAI={handleOpenAI}
            onOpenHelpArticle={(helpId) => setActiveTab('help')}
          />
        )}

        {activeTab === 'immigration' && (
          <NewsPortal
            searchQuery="AIMA"
            onOpenAI={handleOpenAI}
            onOpenHelpArticle={(helpId) => setActiveTab('help')}
          />
        )}

        {activeTab === 'help' && (
          <HelpCentre
            onOpenAI={handleOpenAI}
            onBookAppointment={() => setIsAppointmentOpen(true)}
          />
        )}

        {activeTab === 'directory' && (
          <ResourceDirectory />
        )}

        {activeTab === 'events' && (
          <EventsSystem />
        )}

        {activeTab === 'community' && (
          <CommunityHub
            onOpenAI={handleOpenAI}
            onBookAppointment={() => setIsAppointmentOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <MemberDashboard
            onOpenAI={handleOpenAI}
            onOpenHelpArticle={(id) => setActiveTab('help')}
          />
        )}

        {activeTab === 'cms' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} onOpenAI={() => handleOpenAI()} />

      {/* Modals */}
      <TheDesiAIModal
        isOpen={isAiOpen}
        onClose={() => {
          setIsAiOpen(false);
          setAiPrompt('');
        }}
        initialPrompt={aiPrompt}
        onBookAppointment={() => setIsAppointmentOpen(true)}
      />

      <AppointmentBookingModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        onSuccess={() => setIsAppointmentOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNews={(news) => {
          setActiveTab('news');
        }}
        onSelectHelp={(helpId) => {
          setActiveTab('help');
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
