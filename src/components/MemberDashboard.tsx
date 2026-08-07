import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { NewsArticle, ResourceItem, Appointment } from '../types';
import { 
  User, 
  Bookmark, 
  Calendar, 
  Sparkles, 
  Check, 
  Sliders, 
  Clock, 
  Building2, 
  ShieldCheck, 
  LogOut,
  ExternalLink
} from 'lucide-react';

interface MemberDashboardProps {
  onOpenAI: (prompt?: string) => void;
  onOpenHelpArticle: (id: string) => void;
}

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ onOpenAI, onOpenHelpArticle }) => {
  const { currentUser, updateUserInterests, savedNewsIds, savedResourceIds, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [savedNews, setSavedNews] = useState<NewsArticle[]>([]);
  const [savedResources, setSavedResources] = useState<ResourceItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'appointments' | 'preferences'>('overview');

  const allInterests = [
    'Immigration', 'Visa', 'Residency', 'Nationality', 'Jobs',
    'Healthcare', 'Education', 'Housing', 'Family', 'Portuguese Language', 'Business'
  ];

  useEffect(() => {
    if (currentUser) {
      fetchMemberData(currentUser.id);
    }
  }, [currentUser?.id, savedNewsIds, savedResourceIds]);

  const fetchMemberData = async (userId: string) => {
    try {
      const resNews = await fetch(`/api/saved/news/${userId}`);
      if (resNews.ok) setSavedNews(await resNews.json());

      const resRes = await fetch(`/api/saved/resources/${userId}`);
      if (resRes.ok) setSavedResources(await resRes.json());

      const resApts = await fetch(`/api/appointments?memberId=${userId}`);
      if (resApts.ok) setAppointments(await resApts.json());
    } catch (e) {
      console.error('Fetch member data error:', e);
    }
  };

  const toggleInterest = (interest: string) => {
    if (!currentUser) return;
    const current = currentUser.interests || [];
    const updated = current.includes(interest)
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateUserInterests(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-lg">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser?.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-2xl text-white">{currentUser?.name}</h1>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Email: {currentUser?.email} | Municipality: <strong className="text-stone-200">{currentUser?.municipality}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-xl border border-stone-700 transition flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Dashboard Subtabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'overview' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Overview & Recommendations
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'saved' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Saved News ({savedNews.length}) & Resources ({savedResources.length})
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'appointments' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          My Appointments ({appointments.length})
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'preferences' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Interest Preferences
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick AI Trigger */}
            <div className="p-6 bg-gradient-to-r from-emerald-950 to-stone-900 text-white rounded-2xl border border-emerald-800 shadow-lg flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">Personal Assistant</span>
                <h3 className="font-serif font-bold text-lg text-white">Need help with your AIMA file or NIF?</h3>
                <p className="text-stone-300 text-xs mt-1">
                  Ask TheDesi AI to summarize requirements or guide you step-by-step.
                </p>
              </div>
              <button
                onClick={() => onOpenAI()}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs rounded-xl shadow shrink-0 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-stone-950" />
                <span>Launch AI</span>
              </button>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                My Upcoming Appointments
              </h3>

              {appointments.length === 0 ? (
                <div className="p-6 bg-stone-50 rounded-2xl text-center border border-stone-200">
                  <p className="text-stone-500 text-xs">No active appointments booked yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-white border border-stone-200 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                          {apt.status}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900 mt-1">{apt.serviceType}</h4>
                        <p className="text-xs text-stone-500">
                          Helper: {apt.helperName} | Date: {apt.date} at {apt.timeSlot}
                        </p>
                      </div>
                      <span className="text-xs text-stone-400 font-mono">{apt.timeSlot} WET</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interests Box */}
            <div className="p-5 bg-white border border-stone-200 rounded-2xl">
              <h4 className="font-serif font-bold text-sm text-stone-900 mb-2">My Selected Interests</h4>
              <div className="flex flex-wrap gap-1.5">
                {(currentUser?.interests || []).map((i) => (
                  <span key={i} className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                    ✓ {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SAVED TAB */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">Saved News Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedNews.map((news) => (
                <div key={news.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase text-emerald-700">{news.category}</span>
                  <h4 className="font-bold text-sm text-stone-900">{news.title}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2">{news.summary60}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-3">Saved Resources & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedResources.map((res) => (
                <div key={res.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold uppercase text-stone-500">{res.category}</span>
                  <h4 className="font-bold text-sm text-stone-900">{res.name}</h4>
                  <p className="text-xs text-stone-600">{res.address} ({res.municipality})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PREFERENCES TAB */}
      {activeTab === 'preferences' && (
        <div className="p-6 bg-white border border-stone-200 rounded-2xl max-w-2xl">
          <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">Personal Interest Preferences</h3>
          <p className="text-xs text-stone-500 mb-4">
            Select the topics you care about to personalize news and Help Centre suggestions on your home feed.
          </p>

          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => {
              const isSelected = (currentUser?.interests || []).includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{interest}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
