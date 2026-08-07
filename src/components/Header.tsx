import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LanguageCode, UserRole } from '../types';
import { 
  Newspaper, 
  ShieldCheck, 
  HelpCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  User as UserIcon, 
  LogOut, 
  Globe, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAI, onOpenSearch }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isLoggedIn, activeRole, switchDemoRole, logout } = useAuth();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isStaffOrAdmin = ['SUPER_ADMIN', 'EDITOR', 'SUPPORT_STAFF', 'HELPER', 'HELP_CENTRE_MANAGER'].includes(activeRole);

  const navItems = [
    { id: 'news', label: t('news'), icon: Newspaper },
    { id: 'immigration', label: t('immigration'), icon: ShieldCheck },
    { id: 'help', label: t('helpCentre'), icon: HelpCircle },
    { id: 'directory', label: t('directory'), icon: MapPin },
    { id: 'events', label: t('events'), icon: Calendar },
    { id: 'community', label: t('community'), icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-lg">
      {/* Top Bar: Role Switcher & Language Bar */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-stone-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-stone-300">TheDesi.news</span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-stone-400">Independent Portugal Desi Community Platform</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded border border-stone-800">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="bg-stone-900 text-stone-200">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Role Switcher for Demo/Testing */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 transition font-medium border border-stone-700"
              title="Test RBAC roles instantly"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Role: <strong className="text-emerald-400">{activeRole}</strong></span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-1 w-56 bg-stone-900 border border-stone-700 rounded-lg shadow-2xl p-2 z-50">
                <div className="px-2 py-1 text-[10px] uppercase font-bold text-stone-400 border-b border-stone-800 mb-1">
                  Switch Role Persona
                </div>
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchDemoRole(r.role);
                      setShowRoleSelector(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between hover:bg-stone-800 transition ${
                      activeRole === r.role ? 'bg-stone-800 font-bold text-emerald-400' : 'text-stone-300'
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

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('news')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-stone-950 text-xl tracking-tighter">TD</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black text-2xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                TheDesi<span className="text-emerald-400 font-sans font-normal">.news</span>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                PORTUGAL
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Search & TheDesi AI Quick Action */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-4">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 text-stone-400 text-xs text-left transition shadow-inner"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="truncate">{t('searchPlaceholder')}</span>
          </button>
        </div>

        {/* AI Assistant Button & Member Actions */}
        <div className="flex items-center gap-2.5">
          {/* TheDesi AI Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-bold text-xs shadow-md shadow-emerald-950/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-stone-950 animate-bounce" />
            <span className="hidden sm:inline">{t('theDesiAI')}</span>
            <span className="bg-emerald-950/30 text-stone-950 px-1.5 py-0.5 rounded text-[10px]">ASK</span>
          </button>

          {/* Member Area / Dashboard / CMS Access */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                }`}
              >
                <UserIcon className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline">{currentUser?.name.split(' ')[0]}</span>
              </button>

              {isStaffOrAdmin && (
                <button
                  onClick={() => setActiveTab('cms')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                    activeTab === 'cms'
                      ? 'bg-purple-950 border-purple-500 text-purple-300'
                      : 'bg-purple-900/40 border-purple-800 text-purple-200 hover:bg-purple-900/60'
                  }`}
                >
                  <span className="hidden md:inline">{t('cmsPortal')}</span>
                  <span className="bg-purple-500 text-stone-950 px-1.5 py-0.5 rounded font-extrabold text-[10px]">CMS</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('login')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition"
            >
              <UserIcon className="w-4 h-4 text-amber-400" />
              <span>{t('login')}</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-400 hover:text-stone-100 bg-stone-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="bg-stone-900 border-t border-stone-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 shadow-inner'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 text-stone-400 hover:text-emerald-400"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 p-4 space-y-3">
          <div className="p-2">
            <button
              onClick={() => { onOpenSearch(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search News, AIMA, NIF & Help...</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900 text-stone-200 text-xs font-medium hover:bg-stone-800"
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
