import React, { useState, useEffect } from 'react';
import { HelpArticle } from '../types';
import { useAuth } from '../context/AuthContext';
import { SEO } from './SEO';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  Search, 
  HelpCircle, 
  Calendar, 
  Lock, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  Info
} from 'lucide-react';

interface HelpCentreProps {
  onOpenAI: (prompt?: string) => void;
  onBookAppointment: () => void;
}

export const HelpCentre: React.FC<HelpCentreProps> = ({ onOpenAI, onBookAppointment }) => {
  const { isLoggedIn } = useAuth();
  const [articles, setArticles] = useState<HelpArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  const categories = [
    'All',
    'Finanças & Tax',
    'Segurança Social',
    'AIMA & Visas',
    'SNS & Healthcare',
    'Portuguese Language',
    'Legal & Rights'
  ];

  useEffect(() => {
    fetchHelp();
  }, [selectedCategory, search]);

  const fetchHelp = async () => {
    try {
      const q = new URLSearchParams();
      if (selectedCategory !== 'All') q.append('category', selectedCategory);
      if (search) q.append('search', search);

      const res = await fetch(`/api/help?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error('Failed fetch help:', e);
    }
  };

  // Dynamic SEO metadata calculation
  const seoTitle = selectedArticle
    ? `${selectedArticle.title} | Portugal Help Guide`
    : selectedCategory !== 'All'
    ? `${selectedCategory} Guides & Official Procedures Portugal`
    : search
    ? `Search Help: "${search}" | Portugal Official Help`
    : 'Portugal Help Centre | Official NIF, NISS, AIMA & Healthcare Guides';

  const seoDesc = selectedArticle
    ? selectedArticle.summary
    : selectedCategory !== 'All'
    ? `Verified step-by-step ${selectedCategory} guides for expats and immigrants in Portugal.`
    : 'Step-by-step verified procedures for NIF, NISS, SNS health card, AIMA renewals, tax clearance, and Portuguese legal rights.';

  const seoKeywords = [
    'Portugal help centre',
    'NIF Portugal guide',
    'NISS social security',
    'AIMA renewal steps',
    'SNS health card Portugal',
    selectedCategory !== 'All' ? selectedCategory : 'government procedures',
    'immigrant rights Portugal'
  ];

  const seoJsonLd = selectedArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': selectedArticle.title,
        'description': selectedArticle.summary,
        'step': (selectedArticle.content || []).map((stepText, idx) => ({
          '@type': 'HowToStep',
          'position': idx + 1,
          'text': stepText
        }))
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': articles.slice(0, 10).map((art) => ({
          '@type': 'Question',
          'name': art.title,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': art.summary
          }
        }))
      };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        ogType="article"
        jsonLd={seoJsonLd}
      />

      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 mb-8 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Portugal Immigration & Government Knowledge Base</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
            Immigration & Public Services Help Centre
          </h1>
          <p className="mt-2 text-stone-300 text-sm leading-relaxed">
            Step-by-step guides for NIF, NISS, SNS Health Number, AIMA renewals, tax clearance, Portuguese language courses, and official government procedures.
          </p>
        </div>

        {/* Search */}
        <div className="mt-6 max-w-xl relative z-10">
          <div className="flex items-center bg-stone-950/90 border border-stone-700 rounded-xl px-3.5 py-2.5 shadow-inner">
            <Search className="w-4 h-4 text-emerald-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help topics (e.g. NIF, NISS, AIMA renewal, SNS, Junta)..."
              className="bg-transparent w-full text-stone-100 text-xs focus:outline-none placeholder-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified: {item.lastVerifiedDate}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-800 transition line-clamp-2">
                {item.title}
              </h3>

              <p className="mt-2 text-stone-600 text-xs leading-relaxed line-clamp-3">
                {item.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span className="flex items-center gap-1">
                View Step-by-Step Guide
              </span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED GUIDE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
            {/* Header */}
            <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {selectedArticle.category}
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-100 mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Summary */}
              <div className="p-4 bg-stone-50 border-l-4 border-emerald-500 rounded-r-xl text-stone-800 text-sm">
                {selectedArticle.summary}
              </div>

              {/* Public vs Member Logic Banner */}
              {!isLoggedIn && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-amber-900">Member Exclusive Features Available</h5>
                      <p className="text-[11px] text-amber-800">
                        Log in to view complete interactive document checklists, personalized AI help, and book a helper.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Steps Checklist */}
              {selectedArticle.steps && selectedArticle.steps.length > 0 && (
                <div>
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Step-by-Step Procedure
                  </h4>
                  <div className="space-y-2">
                    {selectedArticle.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required Documents Checklist */}
              {selectedArticle.requiredDocuments && selectedArticle.requiredDocuments.length > 0 && (
                <div>
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Required Documents Checklist
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedArticle.requiredDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-stone-800 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Text Guidance */}
              <div className="prose prose-stone max-w-none text-xs text-stone-800 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl">
                {selectedArticle.content}
              </div>

              {/* Official Source & Verification Info */}
              <div className="p-4 bg-stone-100 rounded-xl flex flex-wrap items-center justify-between gap-3 border border-stone-200">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-500 block">Verified Source Provider</span>
                  <span className="text-xs font-bold text-stone-800">{selectedArticle.officialSourceTitle}</span>
                  <span className="text-[10px] text-stone-500 block mt-0.5">Last Verified: {selectedArticle.lastVerifiedDate}</span>
                </div>

                <a
                  href={selectedArticle.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
                >
                  <span>Go to Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-stone-400 italic">
                Disclaimer: {selectedArticle.disclaimer}
              </p>

              {/* Actions Footer */}
              <div className="border-t border-stone-200 pt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onOpenAI(`I need help understanding the guide: "${selectedArticle.title}"`);
                  }}
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold text-xs"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Ask TheDesi AI about this guide</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    onBookAppointment();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  Book Appointment with Helper
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
