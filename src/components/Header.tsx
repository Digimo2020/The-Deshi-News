import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LanguageCode, UserRole } from '../types';
import { TheDesiNewsLogo } from './TheDesiNewsLogo';
import { 
  Newspaper, 
  ShieldCheck, 
  HelpCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  User as UserIcon, 
  Globe, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  Sun,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAI, onOpenSearch }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isLoggedIn, activeRole, switchDemoRole } = useAuth();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  ];

  const roles: { role: UserRole | 'GUEST'; label: string; color: string }[] = [
    { role: 'GUEST', label: 'Public Reader', color: 'bg-slate-600' },
    { role: 'MEMBER', label: 'Community Member', color: 'bg-emerald-600' },
    { role: 'SUPER_ADMIN', label: 'Super Admin', color: 'bg-purple-600' },
    { role: 'EDITOR', label: 'News Editor', color: 'bg-blue-600' },
    { role: 'SUPPORT_STAFF', label: 'Support Staff', color: 'bg-amber-600' },
    { role: 'HELPER', label: 'Community Helper', color: 'bg-teal-600' },
    { role: 'HELP_CENTRE_MANAGER', label: 'Help Centre Mgr', color: 'bg-rose-600' },
  ];

  const categoryItems = [
    { id: 'news', label: 'Music' },
    { id: 'celebrity', label: 'Celebrity' },
    { id: 'politics', label: 'Politics' },
    { id: 'finance', label: 'Finance' },
    { id: 'travel', label: 'Travel' },
    { id: 'food', label: 'Food' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'tech', label: 'Tech' },
    { id: 'makeup', label: 'Make-up' },
    { id: 'immigration', label: 'AIMA & Immigration' },
    { id: 'help', label: 'Help Centre' },
    { id: 'directory', label: 'Directory' }
  ];

  // Current formatted date
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="z-40 bg-white text-stone-900 font-sans">
      {/* Newspaper Top Utility Bar (Image 3 - kept as it is) */}
      <div className="bg-stone-50 px-4 py-1.5 text-[11px] border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-stone-600">
        
        {/* Left: Date, Weather & Breaking Ticker */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="font-semibold text-stone-800 hidden md:inline">{todayDate} • Lisbon, PT</span>
          <span className="hidden md:inline text-stone-300">|</span>
          
          <div className="hidden lg:flex items-center gap-1.5 text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 shadow-none">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Lisbon 24°C</span>
          </div>

          <span className="hidden lg:inline text-stone-300">|</span>

          {/* Breaking News Ticker */}
          <div className="flex items-center gap-2 max-w-md sm:max-w-lg overflow-hidden">
            <span className="bg-[#cc0000] text-white font-black text-[10px] uppercase px-2 py-0.5 rounded flex items-center gap-1 shrink-0 tracking-wider">
              <Flame className="w-3 h-3 fill-white" />
              BREAKING
            </span>
            <span className="truncate text-stone-800 font-semibold text-[11px]">
              AIMA launches digital residence permit renewal stream for CPLP & Article 88/89
            </span>
          </div>
        </div>

        {/* Right: Currency Rates, Language & Role Persona */}
        <div className="flex items-center gap-2.5 ml-auto">
          {/* Live Currency Snippet */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>1 EUR = 132.5 BDT</span>
            <span className="text-stone-300">•</span>
            <span>91.2 INR</span>
            <span className="text-stone-300">•</span>
            <span>302.5 PKR</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
            <Globe className="w-3 h-3 text-emerald-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-stone-800 text-[11px] focus:outline-none cursor-pointer font-medium"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-white text-stone-800">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Role Switcher for Testing */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition font-medium border border-stone-200 text-[11px]"
              title="Test RBAC roles instantly"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-600" />
              <span>Role: <strong className="text-emerald-700">{activeRole}</strong></span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-1 w-56 bg-white border border-stone-200 rounded-lg shadow-xl p-2 z-50">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-stone-500 border-b border-stone-100 mb-1">
                  Switch Role Persona
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchDemoRole(r.role);
                      setShowRoleSelector(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between hover:bg-stone-50 transition ${
                      activeRole === r.role ? 'bg-stone-100 font-bold text-emerald-700' : 'text-stone-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className={`w-2 h-2 rounded-full ${r.color}`}></span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Top Header Container */}
      <div className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm transition-all duration-300">
        {isScrolled ? (
          /* Image 2: Floating Sticky Header Bar on Scroll */
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-6 animate-in fade-in duration-200">
            {/* Left: Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer select-none shrink-0" 
              onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span className="font-serif text-2xl font-black text-[#cc0000] tracking-tight italic">
                The Desi News
              </span>
            </div>

            {/* Right: Category Links Nav */}
            <nav className="hidden md:flex items-center space-x-6 overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
              {categoryItems.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`py-1 whitespace-nowrap transition-colors border-b-2 font-black ${
                      isActive
                        ? 'text-[#cc0000] border-[#cc0000]'
                        : 'text-stone-800 border-transparent hover:text-[#cc0000]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>

            {/* Compact Action Items for Floating Header */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenSearch}
                className="p-1.5 text-stone-700 hover:text-[#cc0000] transition"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center gap-1 text-stone-900 font-bold text-xs border border-stone-300 px-2.5 py-1 rounded"
              >
                <Menu className="w-4 h-4" />
                <span>MENU</span>
              </button>

              <button
                onClick={() => setActiveTab('login')}
                className="hidden sm:inline-block bg-[#cc0000] hover:bg-black text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow transition-all duration-200"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        ) : (
          /* Image 1: Main Home Page Unscrolled Menu Layout */
          <>
            {/* Main Newspaper Masthead */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 border-b border-stone-200 relative">
              
              {/* Left Controls: MENU button & SEARCH button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#cc0000] border border-stone-300 rounded hover:border-[#cc0000] transition-colors"
                >
                  <Menu className="w-4 h-4" />
                  <span>MENU</span>
                </button>

                <button
                  onClick={onOpenSearch}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-[#cc0000] border border-stone-200 rounded hover:border-stone-300 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>

              {/* Center: Main Logo - The Desi News */}
              <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setActiveTab('news')}>
                <div className="flex flex-col items-center text-center">
                  <span className="font-serif text-3xl sm:text-5xl font-black text-[#cc0000] tracking-tight italic leading-none">
                    The Desi News
                  </span>
                  <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-stone-500 uppercase mt-1">
                    PORTUGAL IMMIGRATION & EXPAT EDITION
                  </span>
                </div>
              </div>

              {/* Right Controls: My Account & SUBSCRIBE red pill button */}
              <div className="flex items-center gap-3">
                {/* Ask AI Button */}
                <button
                  onClick={onOpenAI}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>Ask AI</span>
                </button>

                {/* Member Login / Profile */}
                {isLoggedIn ? (
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="flex items-center gap-1.5 text-xs font-bold text-stone-800 hover:text-[#cc0000]"
                  >
                    <UserIcon className="w-4 h-4 text-stone-700" />
                    <span className="hidden sm:inline">{currentUser?.name.split(' ')[0]}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab('login')}
                    className="flex items-center gap-1 text-xs font-bold text-stone-800 hover:text-[#cc0000]"
                  >
                    <UserIcon className="w-4 h-4 text-stone-700" />
                    <span className="hidden sm:inline">My account</span>
                  </button>
                )}

                {/* Red SUBSCRIBE pill button */}
                <button
                  onClick={() => setActiveTab('login')}
                  className="bg-[#cc0000] hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2 rounded-full shadow transition-all duration-200"
                >
                  SUBSCRIBE
                </button>
              </div>

            </div>

            {/* TagDiv Newspaper Style Category Navigation Bar */}
            <nav className="bg-white border-b border-stone-200 px-4 py-2">
              <div className="max-w-7xl mx-auto flex items-center justify-center overflow-x-auto no-scrollbar">
                <div className="flex items-center space-x-6 min-w-max text-xs font-bold uppercase tracking-wider">
                  {categoryItems.map((cat) => {
                    const isActive = activeTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`py-1 transition-colors border-b-2 font-black ${
                          isActive
                            ? 'text-[#cc0000] border-[#cc0000]'
                            : 'text-stone-800 border-transparent hover:text-[#cc0000]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </>
        )}
      </div>

      {/* Top Carousel / Ticker Strip matching reference image (Only shown when unscrolled) */}
      {!isScrolled && (
        <div className="bg-stone-100/80 border-b border-stone-200 py-2 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar text-xs">
              <div className="flex items-center gap-2 shrink-0 bg-white border border-stone-200 p-1.5 pr-3 rounded">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Eyebrows"
                  className="w-7 h-7 rounded object-cover"
                />
                <span className="font-bold text-stone-800 truncate max-w-[200px]">
                  Take a Stroll Through the Pros and Cons of Permanent Eyebrows Tattoos
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-white border border-stone-200 p-1.5 pr-3 rounded">
                <span className="bg-[#cc0000] text-white font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded shrink-0">EXCLUSIVE</span>
                <span className="font-bold text-stone-800 truncate max-w-[220px]">
                  10 Outfits Inspired by Famous Art are Sold in London
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-white border border-stone-200 p-1.5 pr-3 rounded">
                <span className="bg-amber-600 text-white font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded shrink-0">TECH</span>
                <span className="font-bold text-stone-800 truncate max-w-[220px]">
                  10 Cool Startups that Will Change Your Perspective on Clothes & Fashion
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-white border border-stone-200 p-1.5 pr-3 rounded">
                <span className="bg-[#cc0000] text-white font-extrabold text-[9px] uppercase px-1.5 py-0.5 rounded shrink-0">MAKE-UP</span>
                <span className="font-bold text-stone-800 truncate max-w-[220px]">
                  The Make-up Conference in New York this Winter Unveils Hot Innovations
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <button className="p-1 rounded bg-white border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-bold">
                &lt;
              </button>
              <button className="p-1 rounded bg-white border border-stone-300 hover:bg-stone-200 text-stone-700 text-xs font-bold">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Slide-Over Navigation Drawer (Mobile, Tablet & Desktop) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)} 
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-stone-900 text-white shadow-2xl h-full flex flex-col z-50 animate-in slide-in-from-left duration-300 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
              <div>
                <span className="font-serif text-2xl font-black text-[#cc0000] tracking-tight italic">
                  The Desi News
                </span>
                <span className="block text-[9px] font-sans font-bold tracking-[0.2em] text-stone-400 uppercase mt-0.5">
                  PORTUGAL IMMIGRATION & EXPAT EDITION
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-[#cc0000] transition"
                title="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-4 bg-stone-900 border-b border-stone-800 space-y-2">
              <button
                onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold hover:border-stone-500 transition"
              >
                <Search className="w-4 h-4 text-[#cc0000]" />
                <span>Search News, AIMA, NIF & Guides...</span>
              </button>

              <button
                onClick={() => { onOpenAI(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#cc0000] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow transition"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span>Ask TheDesi AI Assistant</span>
              </button>
            </div>

            {/* Drawer Navigation Sections */}
            <div className="p-5 space-y-6 flex-1">
              {/* Category News Links */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#cc0000]"></span>
                  News Categories
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {categoryItems.map((cat) => {
                    const isActive = activeTab === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveTab(cat.id); setMobileMenuOpen(false); }}
                        className={`flex items-center justify-between px-3 py-2 rounded text-xs font-bold uppercase transition text-left ${
                          isActive 
                            ? 'bg-[#cc0000] text-white font-black' 
                            : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expat Public Services & Portals */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Expat Services & Tools
                </h4>
                <div className="space-y-1.5">
                  {[
                    { id: 'immigration', label: 'AIMA & Visa News Stream', desc: 'Latest residence permit rules & updates' },
                    { id: 'help', label: '30-Sec Solution Desk', desc: 'NIF, Tax Representative, SNS Healthcare' },
                    { id: 'directory', label: 'Verified Directory', desc: 'English-speaking Lawyers & Accountants' },
                    { id: 'events', label: 'Expat Events & Meetups', desc: 'Community gatherings across Lisbon & Porto' },
                    { id: 'community', label: 'Discussion Board', desc: 'Ask questions & share experiences' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      className={`w-full text-left p-2.5 rounded-lg transition border ${
                        activeTab === item.id 
                          ? 'bg-stone-800 border-[#cc0000] text-white' 
                          : 'bg-stone-800/40 border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center justify-between">
                        <span>{item.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                      </div>
                      <div className="text-[11px] text-stone-400 font-normal mt-0.5 line-clamp-1">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 text-xs text-stone-400 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-300">Language</span>
                <div className="flex items-center gap-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        language === l.code ? 'bg-[#cc0000] text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {l.flag} {l.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-stone-500 text-center pt-1 border-t border-stone-900">
                © 2026 The Desi News. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};



