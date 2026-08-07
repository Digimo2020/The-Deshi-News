import React, { useState, useEffect } from 'react';
import { NewsArticle, HelpArticle } from '../types';
import { useAuth } from '../context/AuthContext';
import { SEO } from './SEO';
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  ShieldCheck, 
  Tag, 
  User, 
  HelpCircle,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface NewsPortalProps {
  searchQuery?: string;
  onOpenHelpArticle?: (helpId: string) => void;
  onOpenAI?: (prompt?: string) => void;
}

export const NewsPortal: React.FC<NewsPortalProps> = ({ searchQuery = '', onOpenHelpArticle, onOpenAI }) => {
  const { savedNewsIds, toggleSaveNews, isLoggedIn } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [relatedHelp, setRelatedHelp] = useState<HelpArticle[]>([]);

  const categories = [
    'All',
    'AIMA',
    'Immigration',
    'Residency',
    'Healthcare',
    'Jobs',
    'Education',
    'Community',
    'Bangladesh',
    'India',
    'Pakistan',
    'Nepal',
    'Sri Lanka',
    'Legal',
    'Business'
  ];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
      if (searchQuery) queryParams.append('search', searchQuery);

      const res = await fetch(`/api/news?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error('Failed to fetch news:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenArticle = async (article: NewsArticle) => {
    setSelectedArticle(article);
    // Fetch related help guides
    try {
      const res = await fetch('/api/help');
      if (res.ok) {
        const allHelp: HelpArticle[] = await res.json();
        setRelatedHelp(allHelp.slice(0, 2));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Dynamic SEO metadata calculation
  const seoTitle = selectedArticle
    ? selectedArticle.title
    : selectedCategory !== 'All'
    ? `${selectedCategory} News & Updates Portugal`
    : searchQuery
    ? `Search Results for "${searchQuery}" | News`
    : 'Verified Portugal News & Official AIMA Immigration Updates';

  const seoDesc = selectedArticle
    ? selectedArticle.summary
    : selectedCategory !== 'All'
    ? `Latest verified ${selectedCategory} news, regulations, and community updates for expats in Portugal.`
    : 'Stay informed with verified news on Portugal immigration, AIMA policies, residency permits, healthcare, and South Asian expat community stories.';

  const seoKeywords = [
    'Portugal news',
    'AIMA immigration',
    'residency Portugal',
    selectedCategory !== 'All' ? selectedCategory : 'community news',
    'South Asian expats Portugal',
    ...(selectedArticle?.tags || [])
  ];

  const seoJsonLd = selectedArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': selectedArticle.title,
        'description': selectedArticle.summary,
        'image': [selectedArticle.imageUrl],
        'datePublished': selectedArticle.publishedAt,
        'author': {
          '@type': 'Organization',
          'name': selectedArticle.source || 'Portugal Community News'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Portugal Community Portal'
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Portugal Community News & Immigration Updates',
        'description': seoDesc,
        'mainEntity': {
          '@type': 'ItemList',
          'itemListElement': articles.slice(0, 10).map((art, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': art.title,
            'description': art.summary
          }))
        }
      };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        ogType={selectedArticle ? 'article' : 'website'}
        ogImage={selectedArticle?.imageUrl}
        publishedTime={selectedArticle?.publishedAt}
        author={selectedArticle?.source}
        jsonLd={seoJsonLd}
      />

      {/* Categories Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-2 overflow-x-auto no-scrollbar border-b border-stone-200">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-xs font-bold uppercase text-stone-500 mr-2">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-stone-100 shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-stone-100 h-80 rounded-2xl"></div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
          <Newspaper className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-800">No news articles found</h3>
          <p className="text-stone-500 text-sm mt-1">Try selecting a different category or clearing search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const isSaved = savedNewsIds.includes(article.id);
            return (
              <div
                key={article.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-stone-900/90 text-stone-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                      {article.category}
                    </span>
                    {article.isOfficialUpdate && (
                      <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                        <ShieldCheck className="w-3 h-3" />
                        AIMA / GOV
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isLoggedIn) toggleSaveNews(article.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      isSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-950/60 text-stone-200 hover:bg-stone-900'
                    }`}
                    title={isSaved ? 'Saved to bookmarks' : 'Save article'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => handleOpenArticle(article)}
                      className="font-serif font-bold text-lg text-stone-900 leading-snug hover:text-emerald-700 cursor-pointer transition line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    {/* 60-Word Summary Box */}
                    <div className="mt-3 p-3 bg-stone-50 border-l-4 border-emerald-500 rounded-r-xl">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>60-Word Quick Summary</span>
                      </div>
                      <p className="text-stone-700 text-xs leading-relaxed line-clamp-3">
                        {article.summary60}
                      </p>
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span className="truncate">{article.authorName}</span>
                    </div>

                    <button
                      onClick={() => handleOpenArticle(article)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 text-xs"
                    >
                      Read Full
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-stone-400">
                  Published: {new Date(selectedArticle.publishedAt).toLocaleDateString('en-GB')}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <h2 className="font-serif font-extrabold text-2xl text-stone-900 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* 60-Word Highlight Box */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  60-Word Key Summary
                </h4>
                <p className="text-stone-800 text-sm font-medium leading-relaxed">
                  {selectedArticle.summary60}
                </p>
              </div>

              {/* Banner Image */}
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-xl border border-stone-200"
              />

              {/* Affected People & Required Actions */}
              {(selectedArticle.affectedPeople || selectedArticle.requiredActions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedArticle.affectedPeople && (
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl">
                      <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Who Is Affected?
                      </h5>
                      <p className="text-xs text-stone-700">{selectedArticle.affectedPeople}</p>
                    </div>
                  )}

                  {selectedArticle.requiredActions && (
                    <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl">
                      <h5 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        Actions You May Need To Take
                      </h5>
                      <p className="text-xs text-stone-700">{selectedArticle.requiredActions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Full Article Content */}
              <div className="prose prose-stone max-w-none text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* Official Source Link */}
              {selectedArticle.officialSourceUrl && (
                <div className="p-4 bg-stone-100 rounded-xl flex items-center justify-between border border-stone-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-stone-500 block">Official Source Verification</span>
                    <span className="text-xs font-bold text-stone-800">{selectedArticle.sourceName}</span>
                  </div>
                  <a
                    href={selectedArticle.officialSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
                  >
                    <span>Visit Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Related Help Centre Guides */}
              {relatedHelp.length > 0 && (
                <div className="border-t border-stone-200 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    Related Immigration & Help Guides
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedHelp.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => {
                          setSelectedArticle(null);
                          if (onOpenHelpArticle) onOpenHelpArticle(guide.id);
                        }}
                        className="p-3 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl cursor-pointer transition"
                      >
                        <h5 className="font-bold text-xs text-stone-900 line-clamp-1">{guide.title}</h5>
                        <p className="text-[11px] text-stone-600 line-clamp-2 mt-1">{guide.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share / Ask AI */}
              <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-xs">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    if (onOpenAI) onOpenAI(`Explain this article: "${selectedArticle.title}"`);
                  }}
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Ask AI about this news</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Article Tags:</span>
                  {selectedArticle.tags.map((t) => (
                    <span key={t} className="bg-stone-100 text-stone-600 text-[10px] px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
