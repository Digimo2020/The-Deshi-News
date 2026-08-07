import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Sparkles, FileText, HeartPulse, Scale, GraduationCap, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface HelpBannerProps {
  onSearch: (query: string) => void;
  onOpenAI: (initialPrompt?: string) => void;
  onSelectTopic: (topicId: string) => void;
}

export const ThirtySecondHelpBanner: React.FC<HelpBannerProps> = ({ onSearch, onOpenAI, onSelectTopic }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const quickPills = [
    { id: 'aima', label: 'AIMA & Visa Renewal', icon: ShieldCheck, query: 'AIMA renewal residence permit' },
    { id: 'nif-niss', label: 'NIF & NISS Tax Numbers', icon: FileText, query: 'How to get NIF and NISS' },
    { id: 'sns', label: 'SNS Health Centre Reg.', icon: HeartPulse, query: 'SNS Health Number registration' },
    { id: 'legal', label: 'Legal & Contract Help', icon: Scale, query: 'Legal support and work contracts' },
    { id: 'pla', label: 'Free Portuguese Classes', icon: GraduationCap, query: 'Free PLA Portuguese A2 classes' },
  ];

  return (
    <div className="relative bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-stone-800 shadow-xl overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Second Portugal Immigrant Solution Hub</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-stone-100 leading-tight">
            “I am an immigrant in Portugal and I need help.”
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base font-medium">
            Find verified step-by-step guides, official government sources, local help centers, or ask <strong className="text-emerald-400">TheDesi AI</strong> instantly.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center shadow-2xl rounded-2xl bg-stone-950/90 border-2 border-emerald-600/50 focus-within:border-emerald-400 transition-all p-1.5">
            <Search className="w-5 h-5 text-emerald-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you need help with? (e.g. NIF, NISS, AIMA appointment, SNS, Legal support)"
              className="w-full bg-transparent text-stone-100 text-sm px-3 py-2.5 focus:outline-none placeholder-stone-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <span className="text-stone-400 text-xs font-medium mr-1">Popular Topics:</span>
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  onSelectTopic(pill.id);
                  onSearch(pill.query);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:border-emerald-500/50 text-xs transition shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-400" />
                <span>{pill.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => onOpenAI('How do I renew my residence permit with AIMA in Portugal?')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-600/80 hover:bg-emerald-900 text-xs font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ask TheDesi AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
