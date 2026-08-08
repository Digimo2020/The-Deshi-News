import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Sparkles, FileText, HeartPulse, Scale, GraduationCap, ArrowRight, Clock, ShieldCheck, X, LifeBuoy, ChevronLeft } from 'lucide-react';

interface HelpBannerProps {
  onSearch: (query: string) => void;
  onOpenAI: (initialPrompt?: string) => void;
  onSelectTopic: (topicId: string) => void;
}

export const ThirtySecondHelpBanner: React.FC<HelpBannerProps> = ({ onSearch, onOpenAI, onSelectTopic }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsOpen(false);
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
    <>
      {/* Floating Trigger Button: Sleek, compact responsive button */}
      {!isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-0 z-40 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#cc0000] hover:bg-stone-900 text-white shadow-xl transition-all duration-300 flex items-center gap-1.5 border border-white/30 group p-2 sm:py-2.5 sm:px-1.5 rounded-xl sm:rounded-l-xl sm:rounded-r-none sm:flex-col"
            title="Open Portugal Immigrant Help Hub"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#cc0000] shrink-0">
              <LifeBuoy className="w-3.5 h-3.5 text-white" />
            </div>
            
            {/* Mobile label: horizontal text */}
            <span className="sm:hidden text-[10px] font-black uppercase tracking-wider text-white pr-0.5">
              HELP HUB
            </span>

            {/* Desktop label: compact vertical rotated text */}
            <span className="hidden sm:inline-block [writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-wider text-white select-none py-0.5">
              HELP HUB
            </span>
            
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
          </button>
        </div>
      )}

      {/* Floating Right Slide-Over Panel / Drawer with Backdrop Click to Dismiss */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl border-l border-stone-200 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cc0000] flex items-center justify-center text-white">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm text-white">Portugal Immigrant Help Hub</h3>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">30-Second Solution Desk</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[#cc0000] text-[11px] font-bold">
                  <Clock className="w-3 h-3 text-[#cc0000]" />
                  <span>Instant Immigrant Guidance</span>
                </div>
                <h2 className="text-xl font-serif font-black text-stone-900 leading-tight pt-1">
                  “I am an immigrant in Portugal and I need help.”
                </h2>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Find verified step-by-step guides, government sources, local help centers, or ask <strong className="text-[#cc0000]">TheDesi AI</strong>.
                </p>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSubmit} className="space-y-2">
                <label className="text-xs font-black uppercase text-stone-700 block">
                  Search Verified Help Topics
                </label>
                <div className="relative flex items-center shadow-xs rounded-xl bg-stone-50 border border-stone-300 focus-within:border-[#cc0000] focus-within:bg-white transition-all p-1">
                  <Search className="w-4 h-4 text-stone-400 ml-2.5 shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. NIF, NISS, AIMA appointment, SNS..."
                    className="w-full bg-transparent text-stone-900 text-xs px-2 py-2 focus:outline-none placeholder-stone-400 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#cc0000] hover:bg-black text-white font-extrabold text-xs rounded-lg transition flex items-center gap-1 shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Quick Topic Pills */}
              <div className="space-y-2.5 pt-2 border-t border-stone-100">
                <span className="text-xs font-black uppercase text-stone-700 block">
                  Popular Quick Solutions
                </span>
                <div className="space-y-2">
                  {quickPills.map((pill) => {
                    const Icon = pill.icon;
                    return (
                      <button
                        key={pill.id}
                        onClick={() => {
                          onSelectTopic(pill.id);
                          onSearch(pill.query);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-bold transition text-left group"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#cc0000]" />
                          <span>{pill.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#cc0000] transition" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ask AI Card */}
              <div className="bg-stone-900 text-white rounded-xl p-4 space-y-2 shadow-md">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-xs uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Ask TheDesi AI Assistant</span>
                </div>
                <p className="text-xs text-stone-300">
                  Get instant answers regarding AIMA renewals, NIF, NISS, or SNS health registrations.
                </p>
                <button
                  onClick={() => {
                    onOpenAI('How do I renew my residence permit with AIMA in Portugal?');
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-[#cc0000] hover:bg-[#b30000] text-white font-black text-xs rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-500 hover:text-stone-800 text-xs font-bold flex items-center justify-center gap-1 mx-auto"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Minimize Help Hub</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

