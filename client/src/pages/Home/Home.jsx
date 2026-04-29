import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
// ── Event Data ────────────────────────────────────────────
const events = [
  {
    id: 1, category: 'music',
    name: 'Neon Horizons Music Festival',
    date: 'Aug 14–16, 2025', location: 'Golden Gate Park, SF',
    seats: '2,400 remaining', tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  {
    id: 2, category: 'tech',
    name: 'Future Forward Tech Summit',
    date: 'Sep 5, 2025', location: 'Moscone Center, SF',
    seats: '820 remaining', tag: '💻 Tech',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    id: 3, category: 'art',
    name: 'Luminary Art Gala',
    date: 'Sep 22, 2025', location: 'SFMOMA, San Francisco',
    seats: '150 remaining', tag: '🎨 Art',
    img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80',
  },
  {
    id: 4, category: 'food',
    name: 'Harvest & Vine Food Expo',
    date: 'Oct 3–4, 2025', location: 'Fort Mason, SF',
    seats: '600 remaining', tag: '🍷 Food',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    id: 5, category: 'wellness',
    name: 'Mindful Living Retreat',
    date: 'Oct 11–13, 2025', location: 'Esalen Institute, Big Sur',
    seats: '60 remaining', tag: '🧘 Wellness',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
  {
    id: 6, category: 'music',
    name: 'Jazz Under the Stars',
    date: 'Nov 1, 2025', location: 'Stern Grove, SF',
    seats: '1,100 remaining', tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
  },
];

const categories = [
  { id: 'all',      label: 'All' },
  { id: 'music',    label: '🎵 Music' },
  { id: 'tech',     label: '💻 Tech' },
  { id: 'food',     label: '🍷 Food' },
  { id: 'art',      label: '🎨 Art' },
  { id: 'wellness', label: '🧘 Wellness' },
];

// ── Event Card ────────────────────────────────────────────
function EventCard({ ev, onBook }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-navy/5 flex flex-col">
      <div className="relative overflow-hidden h-52">
        <img src={ev.img} alt={ev.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <span className="absolute top-4 left-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1 rounded-full">
          {ev.tag}
        </span>
        <span className="absolute top-4 right-4 bg-cobalt/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {ev.seats}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-navy mb-3 leading-snug">{ev.name}</h3>
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center gap-2 text-navy/50 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {ev.date}
          </div>
          <div className="flex items-center gap-2 text-navy/50 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {ev.location}
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onBook(ev.name)}
            className="w-full bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────
function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalEvent,     setModalEvent]     = useState(null);   // null = closed
  const [showToast,      setShowToast]      = useState(false);

  const filtered = activeCategory === 'all'
    ? events
    : events.filter(e => e.category === activeCategory);

  // Modal
  const openModal  = (name) => setModalEvent(name);
  const closeModal = ()     => setModalEvent(null);
  const confirmBooking = () => {
    closeModal();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-bg min-h-screen flex items-center pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-sky animate-pulse inline-block"></span>
                500+ Events happening this season
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-black text-white leading-[1.05] mb-6" style={{ letterSpacing: '-0.03em' }}>
                Book the<br/>
                <span className=" bg-clip-text" >Moments</span><br/>
                That Matter
              </h1>
              <p className="text-white/65 text-lg font-light leading-relaxed max-w-md mb-10">
                Discover concerts, conferences, workshops, and festivals near you. Reserve your seat in seconds — no fuss, all fun.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#events" className="bg-cobalt hover:bg-sky text-white px-8 py-3.5 rounded-full font-semibold transition-colors shadow-lg shadow-cobalt/40">Explore Events</a>
                <a href="#about"  className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold transition-colors backdrop-blur-sm">Learn More</a>
              </div>
              <div className="flex gap-8 mt-12">
                {[['12k+','Happy Guests'],['300+','Events Hosted'],['40+','Cities']].map(([num, label], i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <div className="w-px bg-white/15" />}
                    <div>
                      <div className="font-display text-3xl font-black text-white">{num}</div>
                      <div className="text-white/50 text-xs font-medium uppercase tracking-widest">{label}</div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right visual panel — unchanged */}
            <div className="relative hidden lg:flex justify-end items-center">
              <div className="absolute w-[480px] h-[480px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-white/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative grid grid-cols-2 gap-4 z-10">
                {[
                  { src:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80', label:'Tech Summit 2025',  delay:'0s',   w:180, h:220, mt:0  },
                  { src:'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80', label:'Music Fest Live',   delay:'0.8s', w:180, h:220, mt:32 },
                  { src:'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80', label:'Art Gala Night',    delay:'0.4s', w:180, h:160, mt:-16},
                  { src:'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80', label:'Food & Wine Expo',  delay:'1.2s', w:180, h:160, mt:8  },
                ].map(({ src, label, delay, w, h, mt }) => (
                  <div key={label} className="float rounded-2xl overflow-hidden shadow-2xl relative"
                    style={{ animationDelay: delay, width: w, height: h, marginTop: mt }}>
                    <img src={src} className="w-full h-full object-cover" alt={label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent flex items-end p-3">
                      <span className="text-white text-xs font-semibold">{label}</span>
                    </div>
                  </div>
                ))}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 min-w-[190px]">
                  <div className="w-10 h-10 rounded-xl bg-ice flex items-center justify-center">
                    <svg className="w-5 h-5 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-navy/50 font-medium">Just booked</div>
                    <div className="text-sm text-navy font-semibold">Seat confirmed!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section id="events" className="py-24 bg-pearl">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
            <div>
              <div className="text-cobalt text-sm font-semibold uppercase tracking-widest mb-3">— Don't miss out</div>
              <h2 className="font-display text-4xl lg:text-5xl font-black text-navy">
                Featured<br/><span className="text-cobalt">Events</span>
              </h2>
            </div>
            <p className="text-navy/50 text-base max-w-xs leading-relaxed">
              Handpicked experiences across music, tech, art, and more.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
                  ${activeCategory === cat.id
                    ? 'bg-cobalt text-white'
                    : 'bg-white text-navy border border-navy/10 hover:border-cobalt hover:text-cobalt'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(ev => (
              <EventCard key={ev.id} ev={ev} onBook={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EVENTARA ── */}
      <section id="about" className="py-24" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#1a3a6e 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="text-sky text-sm font-semibold uppercase tracking-widest mb-3">— Why choose us</div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white" style={{ letterSpacing:'-0.03em' }}>
              Booking made{' '}
              <span className="bg-clip-text" >effortless</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title:'Instant Booking', body:'Reserve your seat in under 30 seconds. No accounts needed for casual browsing.',
                icon:'M13 10V3L4 14h7v7l9-11h-7z' },
              { title:'Safe & Secure', body:'Your data and bookings are protected with enterprise-grade security at every step.',
                icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title:'Community First', body:'Join thousands of event-goers and creators who trust Eventara to connect them.',
                icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
            ].map(({ title, body, icon }, i) => (
              <div key={title}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-2xl bg-cobalt/30 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon}/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING MODAL ── */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4"
          onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-2xl font-black text-navy mb-2">Confirm Booking</h3>
            <p className="text-navy/60 mb-6">You're about to book a seat for <strong className="text-navy">{modalEvent}</strong>.</p>
            <div className="flex gap-3">
              <button onClick={closeModal}
                className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
                Cancel
              </button>
              <button onClick={confirmBooking}
                className="flex-1 bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors">
                Confirm →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS TOAST ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-500
        ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <span className="text-green-400">✓</span>
        Booking confirmed! Check your email for details.
      </div>

      <Footer  />
    </div>
  );
}

export default Home;