import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// ── Mock User ────────────────────────────────────────────────────────
const USER = {
  name: 'Ada Lovelace',
  email: 'ada@techforward.io',
  phone: '+1 (415) 000-1234',
  company: 'Acme Corp',
  jobTitle: 'Software Engineer',
  avatar: 'AL',
  memberSince: 'March 2024',
  totalSpent: 1342,
  eventsAttended: 5,
  upcomingCount: 2,
};

// ── Mock Bookings ────────────────────────────────────────────────────
const BOOKINGS = [
  {
    id: 'TF-A8K2P1',
    event: 'Future Forward Tech Summit',
    category: 'tech',
    tag: '💻 Tech',
    date: 'Sep 5, 2025',
    time: '9:00 AM – 6:00 PM',
    location: 'Moscone Center, SF',
    ticket: 'VIP Pass',
    qty: 1,
    total: 549,
    status: 'approved',
    bookedOn: 'Jul 12, 2025',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    id: 'TF-C3NX72',
    event: 'Neon Horizons Music Festival',
    category: 'music',
    tag: '🎵 Music',
    date: 'Aug 14–16, 2025',
    time: 'Gates open 4:00 PM',
    location: 'Golden Gate Park, SF',
    ticket: 'General Admission',
    qty: 2,
    total: 298,
    status: 'pending',
    bookedOn: 'Jul 18, 2025',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  {
    id: 'TF-B7YW34',
    event: 'AI & Machine Learning Workshop',
    category: 'tech',
    tag: '💻 Tech',
    date: 'Aug 20, 2025',
    time: '10:00 AM – 1:00 PM',
    location: 'Stanford Campus, Palo Alto',
    ticket: 'Workshop Pass',
    qty: 1,
    total: 199,
    status: 'approved',
    bookedOn: 'Jun 30, 2025',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
  },
  {
    id: 'TF-D1MQ89',
    event: 'Luminary Art Gala',
    category: 'art',
    tag: '🎨 Art',
    date: 'Sep 22, 2025',
    time: '7:00 PM – 11:00 PM',
    location: 'SFMOMA, San Francisco',
    ticket: 'General Admission',
    qty: 2,
    total: 190,
    status: 'cancelled',
    bookedOn: 'Jun 15, 2025',
    img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80',
  },
  {
    id: 'TF-E9ZR55',
    event: 'Mindful Living Retreat',
    category: 'wellness',
    tag: '🧘 Wellness',
    date: 'Oct 11–13, 2025',
    time: 'All day',
    location: 'Esalen Institute, Big Sur',
    ticket: 'Full Retreat',
    qty: 1,
    total: 450,
    status: 'pending',
    bookedOn: 'Jul 22, 2025',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
  },
];

const TABS = ['All', 'Upcoming', 'Pending', 'Cancelled'];

// ── Status Badge ─────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    approved: {
      label: 'Confirmed',
      cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
    },
    pending: {
      label: 'Pending',
      cls: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-400 animate-pulse',
    },
    cancelled: {
      label: 'Cancelled',
      cls: 'bg-red-50 text-red-600 border-red-200',
      dot: 'bg-red-400',
    },
  };
  const s = map[status] || map.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ── Booking Card ─────────────────────────────────────────────────────
function BookingCard({ booking, onCancel, onView }) {
  const isCancelled = booking.status === 'cancelled';

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-200 hover:shadow-md
      ${isCancelled ? 'border-navy/5 opacity-70' : 'border-navy/8 hover:border-cobalt/20'}`}>
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={booking.img}
            alt={booking.event}
            className={`w-full h-full object-cover transition-transform duration-500 ${!isCancelled ? 'hover:scale-105' : 'grayscale'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <span className="absolute bottom-3 left-3 bg-white/90 text-navy text-xs font-bold px-2.5 py-1 rounded-full">
            {booking.tag}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-navy/40 text-xs font-mono mb-1">{booking.id}</p>
              <h3 className="font-display font-black text-navy text-base leading-snug">{booking.event}</h3>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4 mt-1">
            {[
              ['📅', booking.date],
              ['🕐', booking.time],
              ['📍', booking.location],
              ['🎟', `${booking.ticket} × ${booking.qty}`],
            ].map(([icon, val]) => (
              <div key={val} className="flex items-center gap-1.5 text-navy/50 text-xs">
                <span className="text-base leading-none">{icon}</span>
                <span className="truncate">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-navy/5">
            <div>
              <span className="text-navy/40 text-xs">Total paid</span>
              <div className="font-display text-xl font-black text-navy">${booking.total.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              {!isCancelled && (
                <>
                  <button
                    onClick={() => onView(booking)}
                    className="text-cobalt hover:text-sky text-xs font-semibold px-3 py-2 rounded-lg hover:bg-cobalt/5 transition-colors"
                  >
                    View Ticket →
                  </button>
                  {booking.status !== 'cancelled' && (
                    <button
                      onClick={() => onCancel(booking.id)}
                      className="text-navy/40 hover:text-red-500 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </>
              )}
              {isCancelled && (
                <span className="text-navy/30 text-xs">Refund processed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white rounded-2xl border border-navy/8 p-5 flex items-center gap-4">
      <div className="w-11 h-11 bg-cobalt/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl font-black text-navy leading-none">{value}</div>
        <div className="text-navy/50 text-xs mt-0.5">{label}</div>
        {sub && <div className="text-cobalt text-xs font-semibold mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ── Ticket Modal ─────────────────────────────────────────────────────
function TicketModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-36 overflow-hidden">
          <img src={booking.img} alt={booking.event} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-navy/20" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div className="absolute bottom-4 left-5">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Ticket body */}
        <div className="p-6">
          <p className="font-mono text-cobalt text-xs font-bold mb-1">{booking.id}</p>
          <h3 className="font-display text-xl font-black text-navy mb-4 leading-snug">{booking.event}</h3>

          <div className="space-y-2.5 mb-5">
            {[
              ['Date', booking.date],
              ['Time', booking.time],
              ['Venue', booking.location],
              ['Ticket', `${booking.ticket} × ${booking.qty}`],
              ['Booked on', booking.bookedOn],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-navy/40 text-sm">{k}</span>
                <span className="text-navy text-sm font-semibold text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>

          {/* Divider with notches */}
          <div className="relative my-5">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-10 bg-pearl rounded-r-full" />
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-10 bg-pearl rounded-l-full" />
            <div className="border-t-2 border-dashed border-navy/10" />
          </div>

          {/* Barcode + total */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-navy/40 text-xs">Total Paid</p>
              <p className="font-display text-2xl font-black text-cobalt">${booking.total.toLocaleString()}</p>
            </div>
            <div className="flex items-end gap-0.5 h-10">
              {[3,5,2,7,4,6,3,5,4,6,2,7,5,3,6,4,5].map((h, i) => (
                <div key={i} className="bg-navy/25 rounded-sm w-1" style={{ height: `${h * 5}px` }} />
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors">
              Download PDF
            </button>
            <button className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Edit Profile Modal ───────────────────────────────────────────────
function EditModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({ ...user });

  const field = (key, label, type = 'text') => (
    <div>
      <label className="text-navy/50 text-xs font-semibold uppercase tracking-wider mb-1.5 block">{label}</label>
      <input
        type={type}
        value={form[key] || ''}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        className="w-full px-4 py-2.5 rounded-xl border border-navy/10 bg-white text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cobalt"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl font-black text-navy">Edit Profile</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center transition-colors">
            <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {field('firstName', 'First Name')}
            {field('lastName', 'Last Name')}
          </div>
          {field('email', 'Email', 'email')}
          {field('phone', 'Phone', 'tel')}
          {field('company', 'Company')}
          {field('jobTitle', 'Job Title')}
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={onClose} className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="flex-1 bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Profile Component ───────────────────────────────────────────
function Profile() {
  const [user, setUser] = useState({
    ...USER,
    firstName: 'Ada',
    lastName: 'Lovelace',
  });
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState(BOOKINGS);
  const [viewedBooking, setViewedBooking] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleCancel = (id) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
    );
    showToast('Booking cancelled. Refund will be processed in 5–7 days.', 'info');
  };

  const filtered = bookings.filter(b => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming') return b.status === 'approved';
    if (activeTab === 'Pending') return b.status === 'pending';
    if (activeTab === 'Cancelled') return b.status === 'cancelled';
    return true;
  });

  const counts = {
    All: bookings.length,
    Upcoming: bookings.filter(b => b.status === 'approved').length,
    Pending: bookings.filter(b => b.status === 'pending').length,
    Cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Navbar />

      {/* ── PROFILE HERO ── */}
      <section className="hero-bg pt-28 pb-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cobalt/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cobalt to-sky flex items-center justify-center shadow-2xl shadow-cobalt/40">
                <span className="font-display text-3xl font-black text-white">{user.avatar}</span>
              </div>
              {/* Online dot */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
            </div>

            {/* Name / meta */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white/60 text-xs font-medium mb-3 backdrop-blur-sm">
                Member since {user.memberSince}
              </div>
              <h1 className="font-display text-4xl font-black text-white leading-none" style={{ letterSpacing: '-0.03em' }}>
                {user.name}
              </h1>
              <p className="text-white/60 text-sm mt-1.5">{user.jobTitle} · {user.company}</p>
            </div>

            {/* Edit button */}
            <button
              onClick={() => setEditOpen(true)}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT: SIDEBAR ── */}
            <div className="space-y-5">
              {/* Contact info */}
              <div className="bg-white rounded-2xl border border-navy/8 p-6">
                <h2 className="font-display font-black text-navy text-sm uppercase tracking-wider mb-4">Contact Info</h2>
                <div className="space-y-3">
                  {[
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      ),
                      val: user.email,
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      ),
                      val: user.phone,
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                        </svg>
                      ),
                      val: user.company,
                    },
                  ].map(({ icon, val }) => (
                    <div key={val} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-navy/5 rounded-lg flex items-center justify-center text-navy/50 flex-shrink-0">
                        {icon}
                      </div>
                      <span className="text-navy/70 text-sm truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <StatCard icon="🎟" label="Events Attended" value={user.eventsAttended} />
                <StatCard icon="⏳" label="Upcoming" value={user.upcomingCount} />
                <StatCard icon="💳" label="Total Spent" value={`$${user.totalSpent.toLocaleString()}`} />
                <StatCard icon="⭐" label="Member Status" value="Gold" sub="Top 10%" />
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl border border-navy/8 p-5">
                <h2 className="font-display font-black text-navy text-sm uppercase tracking-wider mb-4">Quick Links</h2>
                <div className="space-y-1">
                  {[
                    ['🔍', 'Browse Events', '/events'],
                    ['🔔', 'Notifications', '/notifications'],
                    ['💳', 'Payment Methods', '/payments'],
                    ['🔒', 'Privacy & Security', '/security'],
                    ['📧', 'Email Preferences', '/preferences'],
                  ].map(([icon, label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-navy/60 hover:text-navy hover:bg-navy/5 transition-all group"
                    >
                      <span className="text-base">{icon}</span>
                      <span className="text-sm font-medium flex-1">{label}</span>
                      <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: BOOKINGS ── */}
            <div className="lg:col-span-2">
              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display text-2xl font-black text-navy">My Bookings</h2>
                <a href="/events" className="text-cobalt hover:text-sky text-sm font-semibold transition-colors">
                  Browse Events →
                </a>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-navy/5 rounded-2xl p-1.5 mb-6">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-semibold transition-all
                      ${activeTab === tab
                        ? 'bg-white text-navy shadow-sm'
                        : 'text-navy/50 hover:text-navy'
                      }`}
                  >
                    {tab}
                    {counts[tab] > 0 && (
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full
                        ${activeTab === tab
                          ? tab === 'Pending' ? 'bg-amber-100 text-amber-700'
                            : tab === 'Cancelled' ? 'bg-red-100 text-red-600'
                            : 'bg-cobalt/10 text-cobalt'
                          : 'bg-navy/10 text-navy/40'
                        }`}
                      >
                        {counts[tab]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Pending notice */}
              {activeTab !== 'Cancelled' && counts.Pending > 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
                  <span className="text-amber-500 mt-0.5 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-amber-800 text-sm font-semibold">
                      {counts.Pending} booking{counts.Pending > 1 ? 's' : ''} awaiting confirmation
                    </p>
                    <p className="text-amber-700/70 text-xs mt-0.5">
                      You'll receive an email once the organizer confirms your spot.
                    </p>
                  </div>
                </div>
              )}

              {/* Booking list */}
              {filtered.length > 0 ? (
                <div className="space-y-4">
                  {filtered.map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancel}
                      onView={setViewedBooking}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-navy/5">
                  <div className="text-5xl mb-4">🎟</div>
                  <h3 className="font-display text-xl font-black text-navy mb-2">No bookings here</h3>
                  <p className="text-navy/40 text-sm mb-6">
                    {activeTab === 'Upcoming'
                      ? "You don't have any confirmed bookings yet."
                      : activeTab === 'Pending'
                      ? "No pending bookings."
                      : "No cancelled bookings."}
                  </p>
                  <a
                    href="/events"
                    className="inline-flex items-center gap-2 bg-cobalt hover:bg-sky text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
                  >
                    Browse Events →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}
      <TicketModal booking={viewedBooking} onClose={() => setViewedBooking(null)} />
      {editOpen && (
        <EditModal
          user={user}
          onClose={() => setEditOpen(false)}
          onSave={data => {
            setUser(prev => ({ ...prev, ...data, name: `${data.firstName} ${data.lastName}`, avatar: `${data.firstName?.[0] || ''}${data.lastName?.[0] || ''}` }));
            showToast('Profile updated successfully!');
          }}
        />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300
          ${toast.type === 'info' ? 'bg-amber-600' : 'bg-navy'} text-white`}
        >
          <span>{toast.type === 'info' ? '↩️' : '✓'}</span>
          {toast.msg}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Profile;