import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// ── Sample Event Data (in real app, this would come from props/router) ────
const eventData = {
  id: 1,
  category: 'music',
  name: 'Neon Horizons Music Festival',
  date: 'Aug 14–16, 2025',
  dateObj: new Date('2025-08-14'),
  location: 'Golden Gate Park, San Francisco',
  venue: 'Golden Gate Park Main Stage',
  city: 'San Francisco',
  state: 'CA',
  address: '501 Stanyan St, San Francisco, CA 94117',
  seats: 2400,
  tag: '🎵 Music',
  img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80',
  description: 'Get ready for three unforgettable days of electronic music at the Neon Horizons Music Festival. Featuring world-class DJs, stunning visual productions, and an incredible atmosphere in the heart of San Francisco.',
  longDescription: 'Neon Horizons returns for its fifth year, bringing together the biggest names in electronic music for an immersive three-day experience. From sunrise sets to late-night performances, this festival showcases the full spectrum of electronic music genres including house, techno, trance, and bass music. With multiple stages, interactive art installations, and gourmet food vendors, Neon Horizons is more than just a music festival—it\'s a celebration of creativity, community, and culture.',
  
  highlights: [
    '3 days of non-stop music across 4 stages',
    '50+ international and local DJs',
    'Immersive light shows and visual art installations',
    'Gourmet food trucks and craft beverage selection',
    'VIP lounge with exclusive viewing areas',
    'After-hours programming and workshops',
  ],
  
  schedule: [
    { day: 'Friday, Aug 14', time: '4:00 PM - 2:00 AM', headline: 'Opening Night ft. Above & Beyond' },
    { day: 'Saturday, Aug 15', time: '2:00 PM - 2:00 AM', headline: 'Main Event ft. Armin van Buuren' },
    { day: 'Sunday, Aug 16', time: '2:00 PM - 12:00 AM', headline: 'Sunset Sessions ft. RÜFÜS DU SOL' },
  ],
  
  ticketTiers: [
    {
      name: 'General Admission',
      price: 149,
      features: [
        'Access to all 4 stages',
        'Festival grounds access',
        'Standard entry times',
        'Food & beverage vendors',
      ],
      available: true,
    },
    {
      name: 'VIP Pass',
      price: 299,
      features: [
        'All General Admission perks',
        'Exclusive VIP lounge access',
        'Premium viewing areas',
        'Expedited entry',
        'Complimentary drink tickets',
        'VIP restrooms',
      ],
      available: true,
      popular: true,
    },
    {
      name: 'Platinum Experience',
      price: 599,
      features: [
        'All VIP Pass perks',
        'Meet & greet opportunities',
        'Backstage tour access',
        'Premium parking pass',
        'Exclusive merchandise package',
        'Private bar and lounge',
      ],
      available: true,
    },
  ],
  
  organizer: {
    name: 'Neon Entertainment Group',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    verified: true,
    eventsHosted: 42,
    rating: 4.8,
  },
  
  venue: {
    name: 'Golden Gate Park',
    capacity: 5000,
    type: 'Outdoor',
    parking: 'Available',
    accessibility: 'Wheelchair accessible',
  },
  
  policies: [
    'All attendees must be 18+ with valid ID',
    'No outside food or beverages permitted',
    'Professional cameras and recording devices not allowed',
    'Rain or shine event - no refunds for weather',
    'Tickets are non-transferable',
  ],
};

// Related events
const relatedEvents = [
  {
    id: 6,
    name: 'Jazz Under the Stars',
    date: 'Nov 1, 2025',
    location: 'Stern Grove, SF',
    price: 55,
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
  },
  {
    id: 8,
    name: 'Classical Symphony Night',
    date: 'Aug 28, 2025',
    location: 'Davies Symphony Hall',
    price: 85,
    img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80',
  },
  {
    id: 11,
    name: 'Yoga & Meditation Day',
    date: 'Sep 18, 2025',
    location: 'Golden Gate Park',
    price: 35,
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
  },
];

// ── Event Details Component ────────────────────────────────────────
function EventDetails() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleBookNow = (tier) => {
    setSelectedTicket(tier);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setShowBookingModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  return (
    <div className="min-h-screen bg-pearl">
      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-navy/5 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <div className="flex items-center gap-2 text-sm text-navy/50">
            <a href="/" className="hover:text-cobalt transition-colors">Home</a>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
            <a href="/events" className="hover:text-cobalt transition-colors">Events</a>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
            <span className="text-navy font-medium">{eventData.name}</span>
          </div>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative">
        <div className="relative h-[500px] overflow-hidden">
          <img 
            src={eventData.img} 
            alt={eventData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
          
          {/* Floating action buttons */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <svg className={`w-6 h-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-navy'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                </svg>
              </button>
              {showShareMenu && (
                <div className="absolute top-14 right-0 bg-white rounded-2xl shadow-2xl p-4 w-48 z-10">
                  <div className="space-y-2">
                    {['Facebook', 'Twitter', 'LinkedIn', 'Copy Link'].map(platform => (
                      <button key={platform} className="w-full text-left px-4 py-2 rounded-lg hover:bg-navy/5 text-navy text-sm font-medium transition-colors">
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event title and quick info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block bg-cobalt text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {eventData.tag}
              </span>
              <h1 className="font-display text-4xl lg:text-6xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
                {eventData.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="font-semibold">{eventData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="font-semibold">{eventData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="font-semibold">{eventData.seats.toLocaleString()} seats remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-4">About This Event</h2>
                <p className="text-navy/70 leading-relaxed mb-6">{eventData.description}</p>
                <p className="text-navy/70 leading-relaxed">{eventData.longDescription}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-6">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {eventData.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-cobalt/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-navy/70 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-6">Event Schedule</h2>
                <div className="space-y-4">
                  {eventData.schedule.map((item, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-navy/5 last:border-0">
                      <div className="w-16 h-16 rounded-2xl bg-cobalt/10 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-cobalt font-bold text-sm">DAY</span>
                        <span className="text-cobalt font-black text-xl">{i + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-navy mb-1">{item.day}</h3>
                        <p className="text-navy/50 text-sm mb-2">{item.time}</p>
                        <p className="text-navy/70 font-medium">{item.headline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Info */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-6">Venue Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-navy mb-2">{eventData.venue.name}</h3>
                    <p className="text-navy/60 text-sm">{eventData.address}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    {[
                      { label: 'Capacity', value: eventData.venue.capacity.toLocaleString() },
                      { label: 'Type', value: eventData.venue.type },
                      { label: 'Parking', value: eventData.venue.parking },
                      { label: 'Accessibility', value: eventData.venue.accessibility },
                    ].map(item => (
                      <div key={item.label} className="bg-navy/5 rounded-xl p-4">
                        <div className="text-navy/50 text-xs font-semibold uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-navy font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  {/* Map placeholder */}
                  <div className="bg-navy/5 rounded-2xl h-64 flex items-center justify-center mt-6">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-navy/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <p className="text-navy/50 text-sm">Map integration would appear here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organizer */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-6">Organized By</h2>
                <div className="flex items-start gap-4">
                  <img 
                    src={eventData.organizer.avatar} 
                    alt={eventData.organizer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xl font-bold text-navy">{eventData.organizer.name}</h3>
                      {eventData.organizer.verified && (
                        <svg className="w-5 h-5 text-cobalt" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-navy/60 mb-4">
                      <span>{eventData.organizer.eventsHosted} events hosted</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        <span className="font-semibold text-navy">{eventData.organizer.rating}</span>
                      </div>
                    </div>
                    <button className="text-cobalt font-semibold text-sm hover:underline">
                      View all events →
                    </button>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-navy/5">
                <h2 className="font-display text-3xl font-bold text-navy mb-6">Important Information</h2>
                <ul className="space-y-3">
                  {eventData.policies.map((policy, i) => (
                    <li key={i} className="flex items-start gap-3 text-navy/70">
                      <svg className="w-5 h-5 text-navy/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-navy/5">
                  <h3 className="font-display text-2xl font-bold text-navy mb-6">Select Tickets</h3>
                  
                  {/* Ticket Options */}
                  <div className="space-y-4 mb-6">
                    {eventData.ticketTiers.map((tier, i) => (
                      <div 
                        key={i}
                        onClick={() => handleBookNow(tier)}
                        className={`relative border-2 rounded-2xl p-5 cursor-pointer transition-all
                          ${tier.popular 
                            ? 'border-cobalt bg-cobalt/5' 
                            : 'border-navy/10 hover:border-cobalt/50'
                          }`}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-4 bg-cobalt text-white text-xs font-bold px-3 py-1 rounded-full">
                            MOST POPULAR
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-display text-lg font-bold text-navy">{tier.name}</h4>
                            <p className="text-navy/50 text-sm">{tier.features.length} features included</p>
                          </div>
                          <div className="text-right">
                            <div className="font-display text-2xl font-black text-navy">${tier.price}</div>
                            <div className="text-navy/50 text-xs">per person</div>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {tier.features.slice(0, 3).map((feature, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-sm text-navy/70">
                              <svg className="w-4 h-4 text-cobalt flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                              </svg>
                              {feature}
                            </li>
                          ))}
                          {tier.features.length > 3 && (
                            <li className="text-sm text-cobalt font-semibold">
                              +{tier.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-navy/10 pt-6">
                    <div className="flex items-center justify-between text-sm text-navy/60 mb-4">
                      <span>🔒 Secure checkout</span>
                      <span>✓ Instant confirmation</span>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 bg-ice/50 rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-6 h-6 text-cobalt flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Safe & Secure</h4>
                      <p className="text-navy/60 text-sm">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-cobalt flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                    </svg>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">Flexible Refunds</h4>
                      <p className="text-navy/60 text-sm">Cancel up to 48 hours before the event</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED EVENTS ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy mb-8">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.map(ev => (
              <div key={ev.id} className="bg-pearl rounded-3xl overflow-hidden shadow-sm border border-navy/5 hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={ev.img} alt={ev.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-navy mb-2 leading-snug">{ev.name}</h3>
                  <div className="flex items-center gap-2 text-navy/50 text-sm mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {ev.date}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-navy">${ev.price}</span>
                    <a href={`/events/${ev.id}`} className="text-cobalt font-semibold text-sm hover:underline">
                      View Details →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING MODAL ── */}
      {showBookingModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-3xl font-black text-navy mb-2">Complete Booking</h3>
            <p className="text-navy/60 mb-6">
              You're booking <strong className="text-navy">{selectedTicket.name}</strong> for <strong className="text-navy">{eventData.name}</strong>
            </p>
            
            {/* Quantity Selector */}
            <div className="bg-navy/5 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-navy font-semibold">Number of tickets</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white border-2 border-navy/10 flex items-center justify-center font-bold text-navy hover:border-cobalt transition-colors"
                  >
                    −
                  </button>
                  <span className="font-display text-2xl font-bold text-navy w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 rounded-full bg-white border-2 border-navy/10 flex items-center justify-center font-bold text-navy hover:border-cobalt transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-navy/10">
                <span className="text-navy/60">Subtotal</span>
                <span className="font-display text-2xl font-bold text-navy">${totalPrice}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 border-2 border-navy/15 text-navy py-3.5 rounded-xl font-semibold hover:bg-navy/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-cobalt/30"
              >
                Confirm Booking →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS TOAST ── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-500
        ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
      >
        <span className="text-green-400">✓</span>
        Booking confirmed! Check your email for tickets.
      </div>

      <Footer />
    </div>
  );
}

export default EventDetails;