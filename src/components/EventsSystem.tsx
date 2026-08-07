import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { SEO } from './SEO';
import { Calendar, Clock, MapPin, Users, Globe, Video, CheckCircle2, Ticket } from 'lucide-react';

export const EventsSystem: React.FC = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!isLoggedIn || !currentUser) {
      setMessage('Please log in or register to book event seats.');
      return;
    }

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email
        })
      });

      if (res.ok) {
        setRegisteredIds(prev => [...prev, eventId]);
        setMessage('Seat confirmed successfully! Confirmation sent to your email.');
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Community Events & Information Sessions in Portugal',
    'itemListElement': events.map((eventItem, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'item': {
        '@type': 'Event',
        'name': eventItem.title,
        'description': eventItem.description,
        'startDate': `${eventItem.date}T${eventItem.time}`,
        'location': {
          '@type': eventItem.locationType === 'online' ? 'VirtualLocation' : 'Place',
          'name': eventItem.location
        }
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Expat Events & Community Workshops in Portugal"
        description="Join upcoming AIMA information sessions, Portuguese language workshops, housing seminars, and South Asian community gatherings in Lisbon and Porto."
        keywords={['Portugal expat events', 'AIMA info session', 'Portuguese language workshop', 'Lisbon community meetup']}
        jsonLd={eventsJsonLd}
      />

      {/* Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 mb-8 border border-stone-800 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Desi Community Workshops & Legal Seminars</span>
          </div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white">
            Upcoming Workshops & Events in Portugal
          </h1>
          <p className="mt-2 text-stone-300 text-sm leading-relaxed">
            Attend free AIMA immigration workshops, intensive Portuguese A2 language prep, legal seminars, and business networking meetups across Lisbon, Sintra, and online.
          </p>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-emerald-900/90 text-emerald-200 border border-emerald-700 rounded-xl text-xs font-semibold flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => {
          const isRegistered = registeredIds.includes(evt.id);
          const isFull = evt.registeredCount >= evt.capacity;

          return (
            <div
              key={evt.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 bg-stone-100 overflow-hidden">
                  <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase backdrop-blur-sm">
                    {evt.category}
                  </div>

                  {evt.isOnline && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1 shadow">
                      <Video className="w-3 h-3" />
                      Zoom / Online
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Date:</strong> {evt.date} ({evt.time})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Location:</strong> {evt.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Speaker:</strong> {evt.speaker}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Languages:</strong> {evt.language}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0 flex items-center justify-between">
                <div className="text-[11px] text-stone-500 font-medium">
                  Seats: <strong className="text-stone-800">{evt.registeredCount}/{evt.capacity}</strong> booked
                </div>

                <button
                  onClick={() => handleRegister(evt.id)}
                  disabled={isRegistered || isFull}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 shadow ${
                    isRegistered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isFull
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered</span>
                    </>
                  ) : isFull ? (
                    <span>Event Full</span>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Reserve Free Seat</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
