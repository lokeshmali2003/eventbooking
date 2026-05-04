import React, { useState } from 'react';
import AdminNav from '../../components/Navbar/AdminNav';
import Footer from '../../components/Footer/Footer';

// ── Mock Data ──────────────────────────────────────────────
const bookingStats = [
  { label: 'Total Bookings',  value: '12,847', change: '+18%', trend: 'up',   icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { label: 'Revenue Collected', value: '$284,900', change: '+24%', trend: 'up', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Cancelled',       value: '238',    change: '-5%',  trend: 'down', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Refunds Issued',  value: '$9,420', change: '+2%',  trend: 'up',   icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' },
];

const allBookings = [
  { id: 'BK-1001', user: 'Sarah Martinez',  avatar: 'SM', avatarColor: 'from-purple-500 to-pink-500',  event: 'Neon Horizons Music Festival', date: 'Aug 14, 2025', bookedOn: 'Jul 2, 2025',  tickets: 2, amount: '$180', status: 'confirmed', paymentMethod: 'Visa •••• 4242', category: 'Music'   },
  { id: 'BK-1002', user: 'David Chen',      avatar: 'DC', avatarColor: 'from-blue-500 to-cyan-500',    event: 'Future Forward Tech Summit',   date: 'Sep 5, 2025',  bookedOn: 'Jul 5, 2025',  tickets: 1, amount: '$95',  status: 'confirmed', paymentMethod: 'Mastercard •••• 8821', category: 'Tech'    },
  { id: 'BK-1003', user: 'Emily Watson',    avatar: 'EW', avatarColor: 'from-pink-500 to-rose-500',    event: 'Luminary Art Gala',            date: 'Sep 22, 2025', bookedOn: 'Jun 28, 2025', tickets: 2, amount: '$300', status: 'refunded',  paymentMethod: 'Visa •••• 7731', category: 'Art'     },
  { id: 'BK-1004', user: 'Michael Brown',   avatar: 'MB', avatarColor: 'from-orange-500 to-amber-500', event: 'Harvest & Vine Food Expo',     date: 'Oct 3, 2025',  bookedOn: 'Jul 8, 2025',  tickets: 3, amount: '$135', status: 'cancelled', paymentMethod: 'PayPal', category: 'Food'    },
  { id: 'BK-1005', user: 'Jessica Liu',     avatar: 'JL', avatarColor: 'from-green-500 to-teal-500',   event: 'Mindful Living Retreat',       date: 'Oct 11, 2025', bookedOn: 'Jul 10, 2025', tickets: 1, amount: '$320', status: 'confirmed', paymentMethod: 'Amex •••• 0053', category: 'Wellness'},
  { id: 'BK-1006', user: 'Ryan Patel',      avatar: 'RP', avatarColor: 'from-indigo-500 to-blue-500',  event: 'Neon Horizons Music Festival', date: 'Aug 14, 2025', bookedOn: 'Jul 1, 2025',  tickets: 4, amount: '$360', status: 'confirmed', paymentMethod: 'Visa •••• 1109', category: 'Music'   },
  { id: 'BK-1007', user: 'Chloe Anderson',  avatar: 'CA', avatarColor: 'from-fuchsia-500 to-purple-500',event: 'Future Forward Tech Summit',  date: 'Sep 5, 2025',  bookedOn: 'Jul 11, 2025', tickets: 1, amount: '$95',  status: 'pending',   paymentMethod: 'Visa •••• 3341', category: 'Tech'    },
  { id: 'BK-1008', user: 'Omar Khalid',     avatar: 'OK', avatarColor: 'from-red-500 to-orange-500',   event: 'Luminary Art Gala',            date: 'Sep 22, 2025', bookedOn: 'Jul 3, 2025',  tickets: 2, amount: '$300', status: 'cancelled', paymentMethod: 'Mastercard •••• 6612', category: 'Art'  },
  { id: 'BK-1009', user: 'Priya Nair',      avatar: 'PN', avatarColor: 'from-teal-500 to-green-500',   event: 'Harvest & Vine Food Expo',     date: 'Oct 3, 2025',  bookedOn: 'Jul 9, 2025',  tickets: 2, amount: '$90',  status: 'confirmed', paymentMethod: 'PayPal', category: 'Food'    },
  { id: 'BK-1010', user: 'Lucas Ferreira',  avatar: 'LF', avatarColor: 'from-sky-500 to-blue-500',     event: 'Mindful Living Retreat',       date: 'Oct 11, 2025', bookedOn: 'Jul 12, 2025', tickets: 1, amount: '$320', status: 'refunded',  paymentMethod: 'Visa •••• 9901', category: 'Wellness'},
];

const categoryColors = {
  Music:   'bg-purple-500/10 text-purple-600',
  Tech:    'bg-blue-500/10   text-blue-600',
  Art:     'bg-pink-500/10   text-pink-600',
  Food:    'bg-orange-500/10 text-orange-600',
  Wellness:'bg-green-500/10  text-green-600',
};

const statusConfig = {
  confirmed: { label: 'Confirmed', bg: 'bg-green-500/15',  text: 'text-green-500',  dot: 'bg-green-400'  },
  cancelled: { label: 'Cancelled', bg: 'bg-red-500/15',    text: 'text-red-500',    dot: 'bg-red-400'    },
  refunded:  { label: 'Refunded',  bg: 'bg-blue-500/15',   text: 'text-blue-500',   dot: 'bg-blue-400'   },
  pending:   { label: 'Pending',   bg: 'bg-yellow-500/15', text: 'text-yellow-600', dot: 'bg-yellow-400' },
};

// ── Confirm Modal ──────────────────────────────────────────
function ConfirmModal({ booking, action, onConfirm, onCancel }) {
  const isRefund = action === 'refund';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-navy/10">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6
          ${isRefund ? 'bg-blue-500/10' : 'bg-red-500/10'}`}>
          <svg className={`w-8 h-8 ${isRefund ? 'text-blue-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {isRefund
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
          </svg>
        </div>
        <h3 className="font-display text-xl font-black text-navy text-center mb-2">
          {isRefund ? 'Issue Refund?' : 'Cancel Booking?'}
        </h3>
        <p className="text-navy/55 text-sm text-center mb-2 leading-relaxed">
          {isRefund
            ? `Refund ${booking.amount} to ${booking.user} via ${booking.paymentMethod}.`
            : `Cancel booking ${booking.id} for ${booking.user}. This cannot be undone.`}
        </p>
        <p className="text-navy/40 text-xs text-center mb-8">Booking: <span className="font-semibold text-navy/60">{booking.event}</span></p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-5 py-3 rounded-2xl border border-navy/15 text-navy font-semibold text-sm hover:bg-ice/60 transition-colors">
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-all shadow-lg
              ${isRefund ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {isRefund ? 'Issue Refund' : 'Cancel Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Booking Detail Drawer ──────────────────────────────────
function BookingDrawer({ booking, onClose, onCancel, onRefund }) {
  if (!booking) return null;
  const sc = statusConfig[booking.status];
  const catColor = categoryColors[booking.category] || 'bg-navy/10 text-navy/60';
  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';
  const canRefund = booking.status === 'confirmed' || booking.status === 'cancelled';

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col">

        {/* Drawer Hero */}
        <div className="hero-bg p-8 pb-10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">Booking Details</span>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${booking.avatarColor} flex items-center justify-center text-white text-lg font-black shadow-lg flex-shrink-0`}>
              {booking.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="font-display text-xl font-black text-white">{booking.user}</h2>
              </div>
              <p className="text-white/55 text-sm truncate mb-2">{booking.event}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                  {sc.label}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${catColor}`}>{booking.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-8 space-y-6">

          {/* Booking ID */}
          <div className="flex items-center justify-between bg-ice/60 rounded-2xl px-5 py-4">
            <span className="text-navy/50 text-sm font-medium">Booking ID</span>
            <span className="font-display font-black text-navy text-sm tracking-wide">{booking.id}</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Event Date',    value: booking.date },
              { label: 'Booked On',     value: booking.bookedOn },
              { label: 'Tickets',       value: `${booking.tickets} ticket${booking.tickets > 1 ? 's' : ''}` },
              { label: 'Amount Paid',   value: booking.amount },
            ].map(item => (
              <div key={item.label} className="bg-ice/60 rounded-2xl p-4">
                <div className="text-navy/45 text-xs font-semibold uppercase tracking-wide mb-1">{item.label}</div>
                <div className="text-navy font-bold text-sm">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Payment */}
          <div className="bg-gradient-to-br from-cobalt/10 to-sky/5 rounded-2xl p-5 border border-cobalt/10">
            <div className="text-navy/50 text-xs font-semibold uppercase tracking-wide mb-3">Payment Method</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cobalt/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <span className="font-semibold text-navy text-sm">{booking.paymentMethod}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            {canRefund && (
              <button
                onClick={() => onRefund(booking)}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border border-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Issue Refund ({booking.amount})
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => onCancel(booking)}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cancel Booking
              </button>
            )}
            {!canCancel && !canRefund && (
              <div className="w-full py-3.5 rounded-2xl text-center text-sm text-navy/40 bg-ice/50 border border-navy/8">
                No actions available for this booking.
              </div>
            )}
            <button className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-navy/5 text-navy hover:bg-navy/10 border border-navy/10 transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
function ManageBooking() {
  const [bookings, setBookings]       = useState(allBookings);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy]           = useState('bookedOn');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { booking, action }

  // ── Derived list ──
  const filtered = bookings
    .filter(b => {
      const q = search.toLowerCase();
      const matchSearch = b.user.toLowerCase().includes(q) ||
                          b.event.toLowerCase().includes(q) ||
                          b.id.toLowerCase().includes(q);
      const matchStatus   = filterStatus   === 'all' || b.status   === filterStatus;
      const matchCategory = filterCategory === 'all' || b.category === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'amount')   return parseFloat(b.amount.replace(/[$,]/g,'')) - parseFloat(a.amount.replace(/[$,]/g,''));
      if (sortBy === 'tickets')  return b.tickets - a.tickets;
      return 0; // bookedOn keeps natural order
    });

  const openCancel = (booking) => { setSelectedBooking(null); setConfirmModal({ booking, action: 'cancel' }); };
  const openRefund = (booking) => { setSelectedBooking(null); setConfirmModal({ booking, action: 'refund' }); };

  const handleConfirm = () => {
    const { booking, action } = confirmModal;
    setBookings(prev => prev.map(b =>
      b.id === booking.id
        ? { ...b, status: action === 'cancel' ? 'cancelled' : 'refunded' }
        : b
    ));
    setConfirmModal(null);
  };

  return (
    <div className="bg-pearl min-h-screen">
     <AdminNav />

      {/* ── HEADER ── */}
      <section className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
                Booking Management
              </h1>
              <p className="text-white/65 text-lg">Review, cancel, and refund bookings across all events.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/70 text-sm font-medium">
                {filtered.length} of {bookings.length} bookings
              </div>
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingStats.map((stat, i) => (
              <div key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-cobalt/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                    ${stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="font-display text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/50 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN TABLE ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-white rounded-3xl border border-navy/5 shadow-sm overflow-hidden">

            {/* ── TOOLBAR ── */}
            <div className="p-6 border-b border-navy/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search by user, event or ID…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy placeholder-navy/35 focus:outline-none focus:ring-2 focus:ring-cobalt/30 transition"
                />
              </div>

              {/* Filters + Sort */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {['Music','Tech','Art','Food','Wellness'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="bookedOn">Sort: Date</option>
                  <option value="amount">Sort: Amount</option>
                  <option value="tickets">Sort: Tickets</option>
                </select>
              </div>
            </div>

            {/* ── STATUS QUICK FILTERS ── */}
            <div className="px-6 py-3 border-b border-navy/5 flex gap-2 flex-wrap">
              {['all', 'confirmed', 'pending', 'cancelled', 'refunded'].map(s => {
                const count = s === 'all' ? bookings.length : bookings.filter(b => b.status === s).length;
                const cfg   = s !== 'all' ? statusConfig[s] : null;
                return (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all border
                      ${filterStatus === s
                        ? 'bg-navy text-white border-navy shadow-sm'
                        : 'bg-ice/60 text-navy/55 border-navy/10 hover:bg-ice'}`}
                  >
                    {cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs
                      ${filterStatus === s ? 'bg-white/20 text-white' : 'bg-navy/8 text-navy/50'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── TABLE HEADER ── */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-ice/40 border-b border-navy/5">
              {[
                { label: 'Booking',  span: 'col-span-4' },
                { label: 'Event',    span: 'col-span-2' },
                { label: 'Date',     span: 'col-span-1' },
                { label: 'Tickets',  span: 'col-span-1' },
                { label: 'Amount',   span: 'col-span-1' },
                { label: 'Status',   span: 'col-span-1' },
                { label: 'Actions',  span: 'col-span-2 text-right' },
              ].map(h => (
                <div key={h.label} className={`text-xs font-semibold text-navy/45 uppercase tracking-wide ${h.span}`}>
                  {h.label}
                </div>
              ))}
            </div>

            {/* ── ROWS ── */}
            <div className="divide-y divide-navy/5">
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-ice mx-auto flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-navy/40 font-medium">No bookings match your filters</p>
                </div>
              ) : (
                filtered.map((booking) => {
                  const sc = statusConfig[booking.status];
                  const catColor = categoryColors[booking.category] || 'bg-navy/10 text-navy/55';
                  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';
                  const canRefund = booking.status === 'confirmed' || booking.status === 'cancelled';
                  return (
                    <div key={booking.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-ice/25 transition-colors items-center group">

                      {/* User + ID */}
                      <div className="col-span-12 lg:col-span-4 flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${booking.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
                          {booking.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-navy text-sm truncate">{booking.user}</div>
                          <div className="text-navy/40 text-xs font-mono">{booking.id}</div>
                        </div>
                      </div>

                      {/* Event */}
                      <div className="hidden lg:block col-span-2">
                        <div className="text-navy text-sm font-medium leading-snug truncate">{booking.event}</div>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${catColor}`}>
                          {booking.category}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="hidden lg:block col-span-1 text-navy/55 text-sm">{booking.date}</div>

                      {/* Tickets */}
                      <div className="hidden lg:flex col-span-1 items-center gap-1.5 text-navy text-sm font-medium">
                        <svg className="w-4 h-4 text-navy/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                        </svg>
                        {booking.tickets}
                      </div>

                      {/* Amount */}
                      <div className="hidden lg:block col-span-1 font-bold text-navy text-sm">{booking.amount}</div>

                      {/* Status */}
                      <div className="hidden lg:flex col-span-1 items-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="hidden lg:flex col-span-2 items-center justify-end gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="w-9 h-9 rounded-xl bg-ice/80 hover:bg-cobalt/10 hover:text-cobalt text-navy/40 flex items-center justify-center transition-all"
                          title="View details"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        {/* Refund */}
                        {canRefund && (
                          <button
                            onClick={() => openRefund(booking)}
                            className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 flex items-center justify-center transition-all"
                            title="Issue refund"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          </button>
                        )}
                        {/* Cancel */}
                        {canCancel && (
                          <button
                            onClick={() => openCancel(booking)}
                            className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-all"
                            title="Cancel booking"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Mobile Row Extras */}
                      <div className="lg:hidden col-span-12 flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {sc.label}
                          </span>
                          <span className="text-navy font-bold text-sm">{booking.amount}</span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedBooking(booking)} className="px-3 py-1.5 rounded-lg bg-cobalt/10 text-cobalt text-xs font-semibold">View</button>
                          {canRefund && (
                            <button onClick={() => openRefund(booking)} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-semibold">Refund</button>
                          )}
                          {canCancel && (
                            <button onClick={() => openCancel(booking)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-semibold">Cancel</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ── TABLE FOOTER ── */}
            <div className="px-6 py-4 border-t border-navy/5 flex items-center justify-between">
              <p className="text-navy/45 text-sm">
                Showing <span className="font-semibold text-navy">{filtered.length}</span> bookings
                {' · '}
                <span className="text-green-500 font-semibold">
                  {filtered.filter(b => b.status === 'confirmed').length} confirmed
                </span>
                {' · '}
                <span className="text-red-400 font-semibold">
                  {filtered.filter(b => b.status === 'cancelled').length} cancelled
                </span>
              </p>
              <button
                onClick={() => { setSearch(''); setFilterStatus('all'); setFilterCategory('all'); setSortBy('bookedOn'); }}
                className="text-xs text-navy/40 hover:text-cobalt font-semibold transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS BANNER ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-br from-navy to-cobalt rounded-3xl p-10 text-center">
            <h2 className="font-display text-3xl font-black text-white mb-3">Need to export booking data?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Download a full report of all bookings, revenue, and refunds for your records.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-ice transition-colors shadow-lg">
                Export CSV
              </button>
              <button className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── BOOKING DRAWER ── */}
      {selectedBooking && (
        <BookingDrawer
          booking={bookings.find(b => b.id === selectedBooking.id)}
          onClose={() => setSelectedBooking(null)}
          onCancel={openCancel}
          onRefund={openRefund}
        />
      )}

      {/* ── CONFIRM MODAL ── */}
      {confirmModal && (
        <ConfirmModal
          booking={confirmModal.booking}
          action={confirmModal.action}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}

export default ManageBooking;