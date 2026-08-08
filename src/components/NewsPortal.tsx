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
  User, 
  HelpCircle,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Flame,
  TrendingUp,
  Eye,
  LayoutGrid,
  List,
  Grid,
  Send,
  Calculator,
  Volume2,
  VolumeX,
  ArrowRight,
  RefreshCw
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
  
  // Layout mode: 'grid' | 'magazine' | 'list'
  const [layoutMode, setLayoutMode] = useState<'grid' | 'magazine' | 'list'>('magazine');
  
  // Audio state simulation in modal
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Currency Converter State for Sidebar Widget
  const [eurAmount, setEurAmount] = useState<number>(100);
  const [targetCurrency, setTargetCurrency] = useState<'BDT' | 'INR' | 'PKR' | 'NPR' | 'LKR'>('BDT');
  const rates = {
    BDT: 132.50,
    INR: 91.20,
    PKR: 302.50,
    NPR: 148.10,
    LKR: 350.20
  };

  // Newsletter email state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // AI Sidebar Question State
  const [aiQuickQuery, setAiQuickQuery] = useState('');

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
    setIsPlayingAudio(false);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const handleAiSidebarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuickQuery.trim() && onOpenAI) {
      onOpenAI(aiQuickQuery);
      setAiQuickQuery('');
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

  // Top Lead Article & Side Hero Tiles for TagDiv Asymmetric Hero Grid
  const leadArticle = articles.length > 0 ? articles[0] : null;
  const secondaryHeroArticles = articles.length > 1 ? articles.slice(1, 4) : [];
  const remainingArticles = articles.length > 4 ? articles.slice(4) : (articles.length <= 4 ? articles : []);

  // Most Read Ranking List (Top 5)
  const mostReadArticles = [...articles].sort((a, b) => (b.viewsCount || 500) - (a.viewsCount || 500)).slice(0, 5);

  return (
    <div className="bg-white text-stone-900 min-h-screen font-sans">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

        {/* ========================================================================= */}
        {/* SECTION 1: FRESH STORIES (4-COLUMN EDITOR PICK GRID MATCHING REFERENCE) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-2 border-stone-200 pb-2">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">Fresh stories</h2>
            <p className="text-[#cc0000] font-extrabold text-xs uppercase tracking-wider mt-0.5">
              TODAY: BROWSE OUR EDITOR'S HAND PICKED ARTICLES!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Column 1: Text list (3 cols) */}
            <div className="lg:col-span-3 space-y-4 flex flex-col justify-between border-r border-stone-200 pr-4">
              <div className="space-y-4">
                <div className="border-b border-stone-100 pb-3 cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">EXCLUSIVE</span>
                    <span className="text-[10px] text-stone-400">Sep 29, 2021</span>
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug">
                    Things to Look For in a Financial Trading Platform Environment
                  </h3>
                </div>

                <div className="border-b border-stone-100 pb-3 cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">POLITICS</span>
                    <span className="text-[10px] text-stone-400">Sep 29, 2021</span>
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug">
                    The Politics Behind Morocco's Stock Market Turbulence Last Year
                  </h3>
                </div>

                <div className="border-b border-stone-100 pb-3 cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">MARKETING</span>
                    <span className="text-[10px] text-stone-400">Sep 29, 2021</span>
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug">
                    Expanding Peaceful Political Climate Gears up for this Election
                  </h3>
                </div>

                <div className="cursor-pointer group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">EXCLUSIVE</span>
                    <span className="text-[10px] text-stone-400">Sep 29, 2021</span>
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug">
                    New Harvard Student Candidates Presented Minutes Before Results
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 pt-2">
                <button className="p-1 rounded bg-stone-100 border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-200">&lt;</button>
                <button className="p-1 rounded bg-stone-100 border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-200">&gt;</button>
              </div>
            </div>

            {/* Column 2: Center Featured Hero Image (4 cols) */}
            <div className="lg:col-span-4 relative group cursor-pointer overflow-hidden rounded-xl bg-stone-900 min-h-[360px] flex flex-col justify-end p-5 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Marketing"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="relative z-10 space-y-2 text-white">
                <span className="bg-[#cc0000] text-white font-black text-[9px] uppercase px-2 py-0.5 rounded">
                  MARKETING
                </span>
                <h2 className="font-serif font-black text-xl leading-tight group-hover:text-amber-300 transition-colors">
                  Social Media Marketing for Franchises is Meant for Women
                </h2>
                <p className="text-stone-300 text-xs line-clamp-2">
                  Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you have for yourself...
                </p>
              </div>
            </div>

            {/* Column 3: Stacked Feature Tiles (2.5 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="group cursor-pointer space-y-2">
                <div className="h-28 rounded-lg overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
                    alt="Finance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">
                    FINANCE
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug line-clamp-2">
                  A Look at How Social Media & Mobile Gaming Can Increase Sales
                </h3>
              </div>

              <div className="group cursor-pointer space-y-2">
                <div className="h-28 rounded-lg overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
                    alt="Finance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#cc0000] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">
                    FINANCE
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] leading-snug line-clamp-2">
                  The Secret to Your Company's Financial Health is Very Important
                </h3>
              </div>
            </div>

            {/* Column 4: Popular Sidebar (2.5 cols) */}
            <div className="lg:col-span-3 border-l border-stone-200 pl-4 space-y-3">
              <h3 className="font-serif font-black text-base text-stone-900 border-b border-stone-200 pb-1">
                Popular
              </h3>

              <div className="space-y-3">
                <div className="flex gap-2 cursor-pointer group">
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase text-[#cc0000] block">MARKETING</span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                      Social Media Marketing for Franchises is Meant for Women
                    </h4>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer group">
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase text-[#cc0000] block">FINANCE</span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                      A Look at How Social Media & Mobile Gaming Can Increase Sales
                    </h4>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer group">
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase text-[#cc0000] block">MAKE-UP</span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                      Cover Girl Announces Star Shine Makeup Line Is Due for Next December
                    </h4>
                  </div>
                </div>

                <div className="flex gap-2 cursor-pointer group">
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase text-[#cc0000] block">MARKETING</span>
                    <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                      Customer Engagement: New Strategy for the Economy
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: JOIN OUR SOCIAL MEDIA BANNER */}
        {/* ========================================================================= */}
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-sm text-stone-900 uppercase">JOIN OUR SOCIAL MEDIA</span>
            <span className="text-xs text-stone-600 font-semibold">For even more exclusive content!</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center font-black text-xs hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] transition cursor-pointer">f</span>
            <span className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center font-black text-xs hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] transition cursor-pointer">o</span>
            <span className="w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center font-black text-xs hover:bg-[#cc0000] hover:text-white hover:border-[#cc0000] transition cursor-pointer">x</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: BREAKING SECTION (4 TOP GRID CARDS + 6 COMPACT ITEMS) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="inline-block bg-[#cc0000] text-white font-black text-xs uppercase px-3 py-1 rounded-t">
            Breaking
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80"
                alt="Instagram"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">CELEBRITY</span>
                <h3 className="font-serif font-bold text-xs mt-1 leading-snug">
                  The Definitive Guide To Marketing Your Business On Instagram
                </h3>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
                alt="Tech"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">FINANCE</span>
                <h3 className="font-serif font-bold text-xs mt-1 leading-snug">
                  Dell Will Invest $125 Billion in China's Tech in the Next 5 Years
                </h3>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
                alt="Smartphones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">TECH</span>
                <h3 className="font-serif font-bold text-xs mt-1 leading-snug">
                  Discover the Newest Waterproof Smartphones That Come on Sale
                </h3>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
                alt="Business"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded">CELEBRITY</span>
                <h3 className="font-serif font-bold text-xs mt-1 leading-snug">
                  Now is the Time to Think About Your Small-Business Success
                </h3>
              </div>
            </div>
          </div>

          {/* 6 Compact Grid Items below */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[
              { tag: 'POLITICS', title: 'Things You Didn\'t Know About American Past Politicians', img: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=200&q=80' },
              { tag: 'CELEBRITY', title: 'Customer Engagement: New Strategy for the Economy', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
              { tag: 'TECH', title: 'Boxtrade Lands $50 Million in New Funding Round', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80' },
              { tag: 'FINANCE', title: 'How Nancy Reagan Gave Glamour and Class to White House', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
              { tag: 'MARKETING', title: 'Mobile Marketing Said to Be Future of E-Commerce', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=200&q=80' },
              { tag: 'MAKE-UP', title: 'Cover Girl Announces Star Shine Makeup Line', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center group cursor-pointer p-2 bg-stone-50 rounded-lg border border-stone-200 hover:border-stone-300">
                <img src={item.img} alt={item.title} className="w-16 h-16 rounded object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="bg-[#cc0000] text-white font-black text-[8px] uppercase px-1 py-0.2 rounded">{item.tag}</span>
                    <span className="text-[9px] text-stone-400">Sep 29, 2021</span>
                  </div>
                  <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: POLITICS SECTION WITH WATERMARK & SUBSCRIBE SIDEBAR */}
        {/* ========================================================================= */}
        <section className="relative space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2 relative z-10">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">Politics</h2>
            <button className="text-[#cc0000] font-black text-xs uppercase hover:underline">
              VIEW ALL →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: 3 Feature Cards + 2 Headline Columns */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="group cursor-pointer space-y-2">
                  <div className="h-32 rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80" alt="Pol" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                    Dell Will Invest $125 Billion in China's Tech in Next 5 Years
                  </h3>
                </div>

                <div className="group cursor-pointer space-y-2">
                  <div className="h-32 rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=400&q=80" alt="Pol" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                    Boxtrade Lands $50 Million in Another New Funding Round with IBM
                  </h3>
                </div>

                <div className="group cursor-pointer space-y-2">
                  <div className="h-32 rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80" alt="Pol" className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                    A Look at How Social Media & Mobile Gaming Can Increase Sales
                  </h3>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Newspaper Theme Banner + Subscribe Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#1e3a8a] text-white p-4 rounded-xl text-center space-y-2 shadow">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">NEWSPAPER THEME</span>
                <p className="font-serif font-bold text-sm">Newspaper Magazine Demo</p>
                <button className="bg-white text-blue-900 font-extrabold text-xs uppercase px-4 py-2 rounded hover:bg-stone-100">
                  DISCOVER MORE
                </button>
              </div>

              {/* Subscribe Widget */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                <h3 className="font-serif font-black text-sm text-stone-900 uppercase">Subscribe</h3>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#cc0000]"
                  />
                  <button className="w-full bg-[#cc0000] text-white font-extrabold text-xs uppercase py-2.5 rounded hover:bg-black transition">
                    I WANT IN →
                  </button>
                  <label className="flex items-start gap-2 text-[10px] text-stone-500 cursor-pointer pt-1">
                    <input type="checkbox" className="mt-0.5 rounded text-[#cc0000]" defaultChecked />
                    <span>I've read and accept the Privacy Policy.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CELEBRITY SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-2 border-stone-200 pb-2">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">Celebrity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" alt="Celeb" className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">EXCLUSIVE</span>
                <h3 className="font-serif font-black text-lg mt-1 leading-tight">
                  Kristen Stewart Visits the Toronto Film Festival with New Boyfriend
                </h3>
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" alt="Celeb" className="w-full h-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">CELEBRITY</span>
                <h3 className="font-serif font-black text-lg mt-1 leading-tight">
                  Celebrity Make-up Artist Gary Meyers Shows you His Beauty Tricks
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FOOD & TRAVEL */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">Food & travel</h2>
            <button className="text-[#cc0000] font-black text-xs uppercase hover:underline">
              VIEW ALL →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Easy Food Survey: Salad Voted As One of Most Satisfying Meals', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80' },
              { title: 'This Week in Houston Food Blogs: High-Protein Recipes', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80' },
              { title: 'Moroccan Salmon with Garlic Mayonnaise Common in Spain', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80' },
              { title: 'EXCLUSIVE Best Places to Get Your Mexican Food Fix in Mexico City', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80' }
            ].map((f, i) => (
              <div key={i} className="group cursor-pointer space-y-2">
                <div className="h-36 rounded-xl overflow-hidden">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 className="font-serif font-bold text-xs text-stone-900 group-hover:text-[#cc0000] line-clamp-2">
                  {f.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: RECENT POSTS */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-2 border-stone-200 pb-2">
            <h2 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">Recent posts</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group cursor-pointer space-y-2">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80" alt="Eyebrows" className="w-full h-48 rounded-xl object-cover" />
                  <h3 className="font-serif font-black text-base text-stone-900 group-hover:text-[#cc0000]">
                    Take a Stroll Through the Pros and Cons of Permanent Eyebrows Tattoos
                  </h3>
                </div>

                <div className="group cursor-pointer bg-[#0f172a] text-white p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">MARKETING</span>
                    <h3 className="font-serif font-black text-lg mt-2 leading-tight">
                      Customer Engagement: New Strategy for the Economy
                    </h3>
                  </div>
                  <span className="text-xs text-stone-400 mt-4">Sep 29, 2021</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-3">
              <span className="bg-[#cc0000] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">MARKETING</span>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" alt="Marketing" className="w-full h-40 object-cover rounded-lg" />
              <h4 className="font-serif font-bold text-xs text-stone-900">
                Entrepreneurial Advertising: The Future Of Marketing
              </h4>
            </div>
          </div>
        </section>

      </div>

      {/* ARTICLE MODAL IF OPEN */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-6">
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
              <span className="bg-[#cc0000] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                {selectedArticle.category}
              </span>
              <button onClick={() => setSelectedArticle(null)} className="p-1 rounded text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <h1 className="font-serif font-black text-2xl text-stone-900">{selectedArticle.title}</h1>
              <p className="text-stone-700 text-sm">{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

