import React, { useState, useEffect } from 'react';
import { ResourceItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { SEO } from './SEO';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  ShieldCheck, 
  Search, 
  Bookmark, 
  BookmarkCheck,
  Languages,
  Building2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const ResourceDirectory: React.FC = () => {
  const { savedResourceIds, toggleSaveResource, isLoggedIn } = useAuth();
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const municipalities = ['All', 'Lisbon', 'Sintra', 'Oeiras', 'Amadora', 'Porto', 'Cascais', 'Faro'];
  const categories = ['All', 'Government Office', 'Healthcare', 'Legal Help', 'Language Class', 'Immigration Support'];

  useEffect(() => {
    fetchResources();
  }, [selectedMunicipality, selectedCategory, search]);

  const fetchResources = async () => {
    try {
      const q = new URLSearchParams();
      if (selectedMunicipality !== 'All') q.append('municipality', selectedMunicipality);
      if (selectedCategory !== 'All') q.append('category', selectedCategory);
      if (search) q.append('search', search);

      const res = await fetch(`/api/resources?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      }
    } catch (e) {
      console.error('Failed fetch resources:', e);
    }
  };

  // Dynamic SEO calculation for Resources
  const seoTitle = selectedMunicipality !== 'All' || selectedCategory !== 'All'
    ? `Verified ${selectedCategory !== 'All' ? selectedCategory : 'Services'} in ${selectedMunicipality !== 'All' ? selectedMunicipality : 'Portugal'}`
    : search
    ? `Directory Search: "${search}" | Portugal Resources`
    : 'Verified Service Directory & Government Offices in Portugal';

  const seoDesc = `Find verified government offices, CNAIM centers, Centros de Saúde, legal aid, Lojas do Cidadão, and language schools in ${selectedMunicipality !== 'All' ? selectedMunicipality : 'Lisbon, Porto, Sintra, Oeiras, Faro, and Portugal'}.`;

  const seoKeywords = [
    'Portugal service directory',
    'CNAIM offices Portugal',
    'Centro de Saude Sintra Lisbon',
    'Loja do Cidadao',
    'Portuguese language classes',
    'legal help expats Portugal',
    selectedMunicipality !== 'All' ? selectedMunicipality : 'Lisbon Porto',
    selectedCategory !== 'All' ? selectedCategory : 'government services'
  ];

  const seoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Portugal Verified Services Directory',
    'description': seoDesc,
    'itemListElement': resources.slice(0, 10).map((resItem, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'LocalBusiness',
        'name': resItem.name,
        'description': resItem.description,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': resItem.address,
          'addressLocality': resItem.municipality,
          'addressCountry': 'PT'
        },
        'telephone': resItem.phone
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        ogType="directory"
        jsonLd={seoJsonLd}
      />

      {/* Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 mb-8 border border-stone-800 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Local Organizations & Services Directory</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
            Resource & Service Directory in Portugal
          </h1>
          <p className="mt-2 text-stone-300 text-sm leading-relaxed">
            Find CNAIM offices, Centros de Saúde, Lojas do Cidadão, legal clinics, and free Portuguese language centers near your municipality.
          </p>
        </div>

        {/* Search */}
        <div className="mt-6 max-w-xl">
          <div className="flex items-center bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5">
            <Search className="w-4 h-4 text-emerald-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Try "legal help near Lisbon", "health centre near Sintra", "Portuguese classes"...'
              className="bg-transparent w-full text-stone-100 text-xs focus:outline-none placeholder-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Bars */}
      <div className="space-y-4 mb-6">
        {/* Municipalities */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-stone-500 uppercase mr-2 shrink-0">Municipality:</span>
          {municipalities.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMunicipality(m)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
                selectedMunicipality === m
                  ? 'bg-stone-900 text-stone-100 shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 border-b border-stone-200">
          <span className="text-xs font-bold text-stone-500 uppercase mr-2 shrink-0">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition ${
                selectedCategory === c
                  ? 'bg-emerald-800 text-white shadow'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((item) => {
          const isSaved = savedResourceIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-stone-100 text-stone-800 font-bold text-[10px] px-2.5 py-1 rounded-md uppercase">
                      {item.category}
                    </span>
                    <span className="bg-emerald-50 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified: {item.lastVerifiedDate}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (isLoggedIn) toggleSaveResource(item.id);
                    }}
                    className={`p-1.5 rounded-lg border transition ${
                      isSaved
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                  {item.name}
                </h3>
                <p className="mt-2 text-stone-600 text-xs leading-relaxed">
                  {item.description}
                </p>

                {/* Details List */}
                <div className="mt-4 space-y-2 text-xs text-stone-700 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Address:</strong> {item.address} ({item.municipality})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Phone:</strong> {item.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Hours:</strong> {item.openingHours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      <strong>Languages:</strong>
                      {item.languagesSpoken.map((lang) => (
                        <span key={lang} className="bg-stone-200 text-stone-800 text-[10px] px-1.5 py-0.5 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services Tags */}
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1">Services Offered:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.servicesOffered.map((s) => (
                      <span key={s} className="bg-emerald-50 text-emerald-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer External Website */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">Source: {item.officialSource}</span>
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>Official Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
