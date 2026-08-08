import React, { useState, useEffect } from 'react';
import { Search, X, Newspaper, HelpCircle, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { NewsArticle, HelpArticle, ResourceItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNews: (news: NewsArticle) => void;
  onSelectHelp: (helpId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectNews, onSelectHelp }) => {
  const [query, setQuery] = useState('');
  const [newsResults, setNewsResults] = useState<NewsArticle[]>([]);
  const [helpResults, setHelpResults] = useState<HelpArticle[]>([]);
  const [resourceResults, setResourceResults] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length > 1) {
      performSearch(query);
    } else {
      setNewsResults([]);
      setHelpResults([]);
      setResourceResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  const performSearch = async (q: string) => {
    setLoading(true);
    try {
      const [resN, resH, resR] = await Promise.all([
        fetch(`/api/news?search=${encodeURIComponent(q)}`),
        fetch(`/api/help?search=${encodeURIComponent(q)}`),
        fetch(`/api/resources?search=${encodeURIComponent(q)}`)
      ]);

      if (resN.ok) setNewsResults(await resN.json());
      if (resH.ok) setHelpResults(await resH.json());
      if (resR.ok) setResourceResults(await resR.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-start justify-center p-4 pt-16">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden border border-stone-200 max-h-[80vh] flex flex-col">
        {/* Search Header */}
        <div className="p-4 bg-[#cc0000] text-white flex items-center gap-3 border-b border-stone-200 shadow-md">
          <Search className="w-5 h-5 text-white shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, AIMA, NIF, NISS, SNS, healthcare, legal support..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-stone-200 font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-200 hover:text-white text-xs font-bold uppercase">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-lg text-stone-200 hover:text-white hover:bg-stone-800/30">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {loading && (
            <div className="text-center py-8 text-stone-500 text-xs italic">
              Searching verified Portugal portal database...
            </div>
          )}

          {!loading && query && newsResults.length === 0 && helpResults.length === 0 && resourceResults.length === 0 && (
            <div className="text-center py-8 text-stone-500 text-xs">
              No direct matches found for "{query}". Try keywords like "AIMA", "NIF", "Sintra", "Lisbon", "SNS".
            </div>
          )}

          {/* Help Results */}
          {helpResults.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                Help Centre Guides ({helpResults.length})
              </h4>
              <div className="space-y-2">
                {helpResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectHelp(item.id);
                    }}
                    className="p-3 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-700">{item.category}</span>
                      <h5 className="font-bold text-xs text-stone-900">{item.title}</h5>
                      <p className="text-[11px] text-stone-600 line-clamp-1">{item.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Results */}
          {newsResults.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                <Newspaper className="w-4 h-4 text-stone-700" />
                News Articles ({newsResults.length})
              </h4>
              <div className="space-y-2">
                {newsResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectNews(item);
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-stone-500">{item.category}</span>
                      <h5 className="font-bold text-xs text-stone-900">{item.title}</h5>
                      <p className="text-[11px] text-stone-600 line-clamp-1">{item.summary60}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resource Directory Results */}
          {resourceResults.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5 mb-2">
                <MapPin className="w-4 h-4 text-stone-700" />
                Resource Directory ({resourceResults.length})
              </h4>
              <div className="space-y-2">
                {resourceResults.map((item) => (
                  <div key={item.id} className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <span className="text-[10px] font-bold uppercase text-stone-500">{item.category}</span>
                    <h5 className="font-bold text-xs text-stone-900">{item.name}</h5>
                    <p className="text-[11px] text-stone-600">{item.address} ({item.municipality})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
