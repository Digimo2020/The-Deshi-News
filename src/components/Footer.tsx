import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Heart, Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAI }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 flex items-center justify-center font-black text-stone-950 text-lg shadow">
                TD
              </div>
              <span className="font-serif font-black text-xl text-white">
                TheDesi<span className="text-emerald-400 font-sans font-normal">.news</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 max-w-md leading-relaxed">
              An independent media, information, help, and community platform for South Asian immigrants in Portugal. Providing verified immigration news, step-by-step public service guides, and AI assistance.
            </p>

            <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Independent Community Platform</span>
              </div>
              <p>
                Not affiliated with TLG Foundation or any corporate NGO. Operating independently to serve immigrants across Lisbon, Sintra, Oeiras, Porto, and Algarve.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><button onClick={() => setActiveTab('news')} className="hover:text-emerald-400">Public News Portal</button></li>
              <li><button onClick={() => setActiveTab('immigration')} className="hover:text-emerald-400">AIMA & Immigration</button></li>
              <li><button onClick={() => setActiveTab('help')} className="hover:text-emerald-400">Immigration Help Centre</button></li>
              <li><button onClick={() => setActiveTab('directory')} className="hover:text-emerald-400">Resource Directory</button></li>
              <li><button onClick={() => setActiveTab('events')} className="hover:text-emerald-400">Workshops & Events</button></li>
              <li><button onClick={() => setActiveTab('community')} className="hover:text-emerald-400">Community Associations</button></li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Official Portals</h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <a href="https://aima.gov.pt" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  <span>AIMA Portal</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://eportugal.gov.pt" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  <span>ePortugal Services</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://portaldasfinancas.gov.pt" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  <span>Portal das Finanças</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://www.sns.gov.pt" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  <span>SNS Saúde Portal</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} TheDesi.news. Built for the Desi & Immigrant Community in Portugal.</p>
          <div className="flex items-center gap-3">
            <button onClick={onOpenAI} className="text-emerald-400 hover:underline font-bold">Ask TheDesi AI</button>
            <span>•</span>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-stone-300">Member Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
