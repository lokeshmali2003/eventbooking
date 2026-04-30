import React, { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// ── Expanded Event Data ────────────────────────────────────────────
const allEvents = [
  {
    id: 1, category: 'music',
    name: 'Neon Horizons Music Festival',
    date: 'Aug 14–16, 2025', location: 'Golden Gate Park, SF',
    seats: 2400, price: 149, tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    description: 'Three days of electronic music featuring world-class DJs',
    dateObj: new Date('2025-08-14'),
    city: 'San Francisco',
  },
  {
    id: 2, category: 'tech',
    name: 'Future Forward Tech Summit',
    date: 'Sep 5, 2025', location: 'Moscone Center, SF',
    seats: 820, price: 299, tag: '💻 Tech',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    description: 'Cutting-edge technology conference with industry leaders',
    dateObj: new Date('2025-09-05'),
    city: 'San Francisco',
  },
  {
    id: 3, category: 'art',
    name: 'Luminary Art Gala',
    date: 'Sep 22, 2025', location: 'SFMOMA, San Francisco',
    seats: 150, price: 95, tag: '🎨 Art',
    img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80',
    description: 'An evening celebrating contemporary art and culture',
    dateObj: new Date('2025-09-22'),
    city: 'San Francisco',
  },
  {
    id: 4, category: 'food',
    name: 'Harvest & Vine Food Expo',
    date: 'Oct 3–4, 2025', location: 'Fort Mason, SF',
    seats: 600, price: 75, tag: '🍷 Food',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    description: 'Taste the finest wines and culinary creations',
    dateObj: new Date('2025-10-03'),
    city: 'San Francisco',
  },
  {
    id: 5, category: 'wellness',
    name: 'Mindful Living Retreat',
    date: 'Oct 11–13, 2025', location: 'Esalen Institute, Big Sur',
    seats: 60, price: 450, tag: '🧘 Wellness',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    description: 'Three-day wellness retreat in breathtaking Big Sur',
    dateObj: new Date('2025-10-11'),
    city: 'Big Sur',
  },
  {
    id: 6, category: 'music',
    name: 'Jazz Under the Stars',
    date: 'Nov 1, 2025', location: 'Stern Grove, SF',
    seats: 1100, price: 55, tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80',
    description: 'An enchanting evening of jazz in a natural amphitheater',
    dateObj: new Date('2025-11-01'),
    city: 'San Francisco',
  },
  {
    id: 7, category: 'tech',
    name: 'AI & Machine Learning Workshop',
    date: 'Aug 20, 2025', location: 'Stanford Campus, Palo Alto',
    seats: 200, price: 199, tag: '💻 Tech',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    description: 'Hands-on workshop with leading AI researchers',
    dateObj: new Date('2025-08-20'),
    city: 'Palo Alto',
  },
  {
    id: 8, category: 'music',
    name: 'Classical Symphony Night',
    date: 'Aug 28, 2025', location: 'Davies Symphony Hall, SF',
    seats: 450, price: 85, tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80',
    description: 'San Francisco Symphony performs Beethoven and Mozart',
    dateObj: new Date('2025-08-28'),
    city: 'San Francisco',
  },
  {
    id: 9, category: 'food',
    name: 'Street Food Festival',
    date: 'Sep 12–13, 2025', location: 'Oakland Waterfront',
    seats: 800, price: 25, tag: '🍷 Food',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    description: 'International street food from 50+ vendors',
    dateObj: new Date('2025-09-12'),
    city: 'Oakland',
  },
  {
    id: 10, category: 'art',
    name: 'Digital Art Exhibition',
    date: 'Oct 8–10, 2025', location: 'Yerba Buena Center, SF',
    seats: 300, price: 40, tag: '🎨 Art',
    img: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    description: 'Immersive digital art installations and NFT showcase',
    dateObj: new Date('2025-10-08'),
    city: 'San Francisco',
  },
  {
    id: 11, category: 'wellness',
    name: 'Yoga & Meditation Day',
    date: 'Sep 18, 2025', location: 'Golden Gate Park, SF',
    seats: 500, price: 35, tag: '🧘 Wellness',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    description: 'Outdoor yoga sessions with experienced instructors',
    dateObj: new Date('2025-09-18'),
    city: 'San Francisco',
  },
  {
    id: 12, category: 'tech',
    name: 'Blockchain & Web3 Conference',
    date: 'Nov 15, 2025', location: 'SF Convention Center',
    seats: 650, price: 350, tag: '💻 Tech',
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    description: 'Explore the future of decentralized technology',
    dateObj: new Date('2025-11-15'),
    city: 'San Francisco',
  },
];

const categories = [
  { id: 'all', label: 'All Events' },
  { id: 'music', label: '🎵 Music' },
  { id: 'tech', label: '💻 Tech' },
  { id: 'food', label: '🍷 Food' },
  { id: 'art', label: '🎨 Art' },
  { id: 'wellness', label: '🧘 Wellness' },
];

const cities = ['All Cities', 'San Francisco', 'Oakland', 'Palo Alto', 'Big Sur'];

const dateFilters = [
  { id: 'all', label: 'All Dates' },
  { id: 'upcoming', label: 'Next 7 Days' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'nextMonth', label: 'Next Month' },
];

// ── Event Card Component ────────────────────────────────────────────
function EventCard({ ev, onBook, viewMode }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-navy/5 flex flex-col sm:flex-row hover:shadow-md transition-shadow">
        <div className="relative overflow-hidden sm:w-64 h-48 sm:h-auto flex-shrink-0">
          <img src={ev.img} alt={ev.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          <span className="absolute top-4 left-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1 rounded-full">
            {ev.tag}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-display text-xl font-bold text-navy leading-snug flex-1">{ev.name}</h3>
            <span className="bg-cobalt/10 text-cobalt text-sm font-semibold px-3 py-1 rounded-full ml-4">
              {ev.seats.toLocaleString()} left
            </span>
          </div>
          <p className="text-navy/50 text-sm mb-4 line-clamp-2">{ev.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-navy/50 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {ev.date}
            </div>
            <div className="flex items-center gap-2 text-navy/50 text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {ev.location}
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-navy/50 text-xs">From</span>
              <div className="font-display text-2xl font-bold text-navy">${ev.price}</div>
            </div>
            <button
              onClick={() => onBook(ev.name)}
              className="bg-cobalt hover:bg-sky text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Book Now →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-navy/5 flex flex-col hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden h-52">
        <img src={ev.img} alt={ev.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <span className="absolute top-4 left-4 bg-white/90 text-navy text-xs font-semibold px-3 py-1 rounded-full">
          {ev.tag}
        </span>
        <span className="absolute top-4 right-4 bg-cobalt/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {ev.seats.toLocaleString()} left
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold text-navy mb-2 leading-snug">{ev.name}</h3>
        <p className="text-navy/50 text-sm mb-4 line-clamp-2">{ev.description}</p>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-navy/50 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {ev.date}
          </div>
          <div className="flex items-center gap-2 text-navy/50 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {ev.location}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-navy/50 text-xs">From</span>
            <div className="font-display text-2xl font-bold text-navy">${ev.price}</div>
          </div>
          <button
            onClick={() => onBook(ev.name)}
            className="bg-cobalt hover:bg-sky text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            View Details →
          </button>
          <button
            onClick={() => onBook(ev.name)}
            className="bg-cobalt hover:bg-sky text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
          >
            Book →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Events Component ────────────────────────────────────────────
function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // date, price, popularity
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents];

    // Text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        e =>
          e.name.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(e => e.category === activeCategory);
    }

    // City filter
    if (selectedCity !== 'All Cities') {
      filtered = filtered.filter(e => e.city === selectedCity);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);

      filtered = filtered.filter(e => {
        if (dateFilter === 'upcoming') return e.dateObj <= sevenDays && e.dateObj >= now;
        if (dateFilter === 'thisMonth') return e.dateObj <= endOfMonth && e.dateObj >= now;
        if (dateFilter === 'nextMonth') return e.dateObj <= endOfNextMonth && e.dateObj >= now;
        return true;
      });
    }

    // Price range filter
    filtered = filtered.filter(e => e.price >= priceRange[0] && e.price <= priceRange[1]);

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => a.dateObj - b.dateObj);
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.seats - a.seats);
    }

    return filtered;
  }, [searchQuery, activeCategory, selectedCity, dateFilter, sortBy, priceRange]);

  const openModal = name => setModalEvent(name);
  const closeModal = () => setModalEvent(null);
  const confirmBooking = () => {
    closeModal();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Navbar />

      {/* ── HERO / HEADER ── */}
      <section className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-sky animate-pulse inline-block"></span>
              {allEvents.length} events available
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
              Discover Your<br />
              <span className="text-sky">Next Experience</span>
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10">
              Browse all upcoming events. Filter by category, location, and date to find exactly what you're looking for.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search events, venues, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/95 backdrop-blur-sm text-navy placeholder-navy/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-sky shadow-xl"
              />
              <svg className="w-5 h-5 text-navy/40 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS & CONTENT ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-navy/5 p-6 mb-8">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between mb-4 text-navy font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                Filters
              </span>
              <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Category Pills */}
              <div>
                <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-3 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                        ${activeCategory === cat.id
                          ? 'bg-cobalt text-white shadow-lg shadow-cobalt/30'
                          : 'bg-navy/5 text-navy hover:bg-navy/10'
                        }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* City Filter */}
                <div>
                  <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">Location</label>
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy/5 text-navy border border-navy/10 focus:outline-none focus:ring-2 focus:ring-cobalt text-sm font-medium"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">Date Range</label>
                  <select
                    value={dateFilter}
                    onChange={e => setDateFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy/5 text-navy border border-navy/10 focus:outline-none focus:ring-2 focus:ring-cobalt text-sm font-medium"
                  >
                    {dateFilters.map(df => (
                      <option key={df.id} value={df.id}>{df.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy/5 text-navy border border-navy/10 focus:outline-none focus:ring-2 focus:ring-cobalt text-sm font-medium"
                  >
                    <option value="date">Date (Earliest)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div>
                  <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">View</label>
                  <div className="flex gap-2 bg-navy/5 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${viewMode === 'grid' ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'}`}
                    >
                      <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${viewMode === 'list' ? 'bg-white text-navy shadow-sm' : 'text-navy/50 hover:text-navy'}`}
                    >
                      <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-cobalt"
                  />
                  <button
                    onClick={() => setPriceRange([0, 500])}
                    className="text-cobalt text-xs font-semibold hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">
                {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
              </h2>
              {searchQuery && (
                <p className="text-navy/50 text-sm mt-1">
                  Results for "<span className="font-semibold text-navy">{searchQuery}</span>"
                </p>
              )}
            </div>
          </div>

          {/* Events Grid/List */}
          {filteredEvents.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'}>
              {filteredEvents.map(ev => (
                <EventCard key={ev.id} ev={ev} onBook={openModal} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-navy mb-2">No events found</h3>
              <p className="text-navy/50 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setSelectedCity('All Cities');
                  setDateFilter('all');
                  setPriceRange([0, 500]);
                }}
                className="bg-cobalt hover:bg-sky text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── BOOKING MODAL ── */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4" onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-2xl font-black text-navy mb-2">Confirm Booking</h3>
            <p className="text-navy/60 mb-6">
              You're about to book a seat for <strong className="text-navy">{modalEvent}</strong>.
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                Confirm →
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
        Booking confirmed! Check your email for details.
      </div>

      <Footer />
    </div>
  );
}

export default Events;