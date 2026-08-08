import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Globe, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAI }) => {
  const { t } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#f8f8f8] text-stone-800 border-t border-stone-300 pt-12 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Logo & Category Nav Bar */}
        <div className="flex flex-col items-center justify-center border-b border-stone-200 pb-8 text-center space-y-4">
          <div className="cursor-pointer select-none" onClick={() => { setActiveTab('news'); scrollToTop(); }}>
            <span className="font-serif text-3xl sm:text-4xl font-black text-[#cc0000] tracking-tight italic">
              The Desi News
            </span>
            <span className="block text-[11px] font-sans font-black uppercase tracking-widest text-stone-600 mt-1">
              PORTUGAL IMMIGRATION & EXPAT NEWS DESK
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase text-stone-700">
            {[
              { label: 'AIMA & Visa', tab: 'news' },
              { label: 'NIF & Tax', tab: 'help' },
              { label: 'Healthcare (SNS)', tab: 'help' },
              { label: 'Legal Support', tab: 'help' },
              { label: 'Resource Directory', tab: 'directory' },
              { label: 'Events & Meetups', tab: 'events' },
              { label: 'Community Hub', tab: 'community' },
              { label: 'AI Assistant', action: onOpenAI },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.tab) {
                    setActiveTab(item.tab);
                    scrollToTop();
                  }
                }} 
                className="hover:text-[#cc0000] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Column Newspaper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          {/* Column 1: About us */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-stone-900 uppercase tracking-wider">ABOUT THE DESI NEWS</h4>
            <p className="text-stone-600 leading-relaxed font-medium">
              TheDesi News (NewsWeek PRO) is an independent news dispatch, verified public service guide, and AI assistance portal empowering South Asian expats and immigrants across Portugal.
            </p>
            <div className="flex items-center gap-2 pt-2 text-stone-700">
              <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-800 hover:bg-[#cc0000] hover:text-white transition cursor-pointer">f</span>
              <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-800 hover:bg-[#cc0000] hover:text-white transition cursor-pointer">x</span>
              <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-800 hover:bg-[#cc0000] hover:text-white transition cursor-pointer">in</span>
              <span className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-800 hover:bg-[#cc0000] hover:text-white transition cursor-pointer">yt</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-stone-900 uppercase tracking-wider">PORTAL SERVICES</h4>
            <ul className="space-y-2 text-stone-600 font-semibold">
              <li>
                <button onClick={() => { setActiveTab('news'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  Verified News & Dispatches
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('help'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  30-Second Solution Desk
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('directory'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  Lawyers & Accountant Directory
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('events'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  Expat Cultural Events
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('community'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  Community Discussion Board
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('dashboard'); scrollToTop(); }} className="hover:text-[#cc0000]">
                  Member Portal & Saved Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The latest */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-stone-900 uppercase tracking-wider">LATEST VERIFIED DISPATCHES</h4>
            <div className="space-y-3">
              <div 
                onClick={() => { setActiveTab('news'); scrollToTop(); }}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">IMMIGRATION</span>
                  <span className="text-[10px] text-stone-400">TODAY</span>
                </div>
                <p className="font-bold text-stone-800 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                  AIMA Launches Online Portal for Residence Permit Extensions
                </p>
              </div>

              <div 
                onClick={() => { setActiveTab('help'); scrollToTop(); }}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">TAX & NIF</span>
                  <span className="text-[10px] text-stone-400">GUIDE</span>
                </div>
                <p className="font-bold text-stone-800 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                  Finanças E-Balcão Tax Representative Removal Guide
                </p>
              </div>

              <div 
                onClick={() => { setActiveTab('help'); scrollToTop(); }}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">HEALTHCARE</span>
                  <span className="text-[10px] text-stone-400">VERIFIED</span>
                </div>
                <p className="font-bold text-stone-800 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                  How to Register for SNS Número de Utente at Local Health Centers
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm text-stone-900 uppercase tracking-wider">IMMIGRATION NEWSLETTER</h4>
            <p className="text-stone-600 font-medium leading-normal">
              Receive instant alerts on official AIMA rule updates, NIF tax alerts, and verified community news directly in your inbox.
            </p>
            
            {subscribed ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! You are subscribed to AIMA alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#cc0000] font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-black hover:bg-[#cc0000] text-white font-black text-xs uppercase tracking-wider py-2.5 rounded transition flex items-center justify-center gap-1.5"
                >
                  <span>GET FREE ALERTS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <label className="flex items-start gap-2 text-[10px] text-stone-500 cursor-pointer pt-1">
                  <input type="checkbox" className="mt-0.5 rounded text-[#cc0000] focus:ring-0" defaultChecked />
                  <span>I agree to receive verified Portugal immigration & legal updates.</span>
                </label>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left font-medium">
            © 2026 The Desi News. Dedicated to South Asian & Expat Community Empowerment in Portugal.
          </p>
          
          <div className="flex items-center gap-4">
            <button onClick={() => { setActiveTab('help'); scrollToTop(); }} className="hover:text-stone-900 font-semibold">
              Legal Disclaimer
            </button>
            <button onClick={() => { setActiveTab('directory'); scrollToTop(); }} className="hover:text-stone-900 font-semibold">
              Verified Directory
            </button>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-[#cc0000] text-white flex items-center justify-center font-black rounded shadow hover:bg-black transition shrink-0"
              title="Back to Top"
            >
              ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

