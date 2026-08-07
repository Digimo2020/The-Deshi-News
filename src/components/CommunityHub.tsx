import React from 'react';
import { Users, Briefcase, Home, Store, MessageSquareQuote, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { SEO } from './SEO';

interface CommunityHubProps {
  onOpenAI: (prompt?: string) => void;
  onBookAppointment: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ onOpenAI, onBookAppointment }) => {
  const associations = [
    { name: 'Bangladesh Association in Portugal (BAP)', location: 'Lisbon (Martim Moniz)', focus: 'Immigration & Cultural Welfare', phone: '+351 218 800 111' },
    { name: 'Indian Community Association of Lisbon', location: 'Lisbon / Loures', focus: 'Business, Cultural & Festival Events', phone: '+351 218 400 222' },
    { name: 'Pakistan Community Council Portugal', location: 'Sintra & Odivelas', focus: 'Social Support & Language Classes', phone: '+351 219 100 333' },
    { name: 'Nepalese Society in Portugal', location: 'Lisbon / Arroios', focus: 'Workplace Rights & Health Assistance', phone: '+351 218 200 444' },
    { name: 'Sri Lankan Friends Association Portugal', location: 'Porto & Lisbon', focus: 'Student & Worker Welfare', phone: '+351 220 300 555' }
  ];

  const futureModules = [
    { title: 'Community Job Board', description: 'Verified employment offers, restaurant staff, tech roles, and agricultural opportunities.', icon: Briefcase, tag: 'Coming Soon' },
    { title: 'Verified Housing & Rooms', description: 'Lease contracts with Junta de Freguesia address proof and registered landlords.', icon: Home, tag: 'Coming Soon' },
    { title: 'Desi Business Marketplace', description: 'Promote South Asian restaurants, grocery stores, accounting firms, and import-export businesses.', icon: Store, tag: 'Coming Soon' },
    { title: 'Community Forum & Q&A', description: 'Peer-to-peer advice on living in Sintra, Lisbon, Porto, and Algarve.', icon: MessageSquareQuote, tag: 'Coming Soon' }
  ];

  const communityJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'South Asian Community Associations in Portugal',
    'itemListElement': associations.map((assoc, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'Organization',
        'name': assoc.name,
        'location': assoc.location,
        'telephone': assoc.phone
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="South Asian Community Associations & Hub in Portugal"
        description="Connect with verified Bangladeshi, Indian, Pakistani, Nepalese, and Sri Lankan community associations in Lisbon, Sintra, Porto, and across Portugal."
        keywords={['Bangladesh Association Portugal', 'Indian Community Lisbon', 'Pakistan Council Sintra', 'Nepalese Society Portugal']}
        jsonLd={communityJsonLd}
      />

      {/* Hero Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Digital Home for South Asian Community in Portugal</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
            Community Hub & Associations Directory
          </h1>
          <p className="mt-2 text-stone-300 text-sm leading-relaxed">
            Connecting Bangladeshi, Indian, Pakistani, Nepalese, and Sri Lankan communities across Greater Lisbon, Sintra, Oeiras, Porto, and the Algarve.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onBookAppointment}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-extrabold text-xs rounded-xl shadow transition"
            >
              Connect with Community Helper
            </button>
            <button
              onClick={() => onOpenAI('What community associations offer legal or food support in Lisbon?')}
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs rounded-xl transition"
            >
              Ask AI About Community Networks
            </button>
          </div>
        </div>
      </div>

      {/* Verified Associations Directory */}
      <div>
        <h2 className="font-serif font-bold text-xl text-stone-900 mb-4 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-emerald-600" />
          Desi Community Associations in Portugal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {associations.map((assoc, idx) => (
            <div key={idx} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm hover:border-emerald-500 transition">
              <h3 className="font-bold text-sm text-stone-900">{assoc.name}</h3>
              <p className="text-xs text-stone-500 mt-1">📍 {assoc.location}</p>
              <p className="text-xs text-stone-700 mt-2 font-medium">Focus: {assoc.focus}</p>
              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span>Contact: {assoc.phone}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Ecosystem Roadmap */}
      <div>
        <h2 className="font-serif font-bold text-xl text-stone-900 mb-4">
          Ecosystem Modules & Future Expansion
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {futureModules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-stone-200/80 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-stone-700" />
                  </div>
                  <h3 className="font-bold text-sm text-stone-900">{m.title}</h3>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">{m.description}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                    {m.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
