import React, { useState } from 'react';
import AdminNav from '../../components/Navbar/AdminNav';
import Footer from '../../components/Footer/Footer';

// ── Mock User Data ─────────────────────────────────────────
const userStats = [
  { label: 'Total Users', value: '8,342', change: '+14%', trend: 'up', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Active Today', value: '1,204', change: '+8%', trend: 'up', icon: 'M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z' },
  { label: 'Blocked Users', value: '37', change: '-3', trend: 'down', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
  { label: 'New This Month', value: '623', change: '+31%', trend: 'up', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
];

const allUsers = [
  { id: 1, name: 'Sarah Martinez', email: 'sarah.m@email.com', avatar: 'SM', role: 'Organizer', joined: 'Jan 12, 2025', bookings: 24, spent: '$1,840', status: 'active', lastSeen: '2 min ago', avatarColor: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'David Chen', email: 'david.chen@email.com', avatar: 'DC', role: 'Attendee', joined: 'Feb 3, 2025', bookings: 8, spent: '$420', status: 'active', lastSeen: '1 hr ago', avatarColor: 'from-blue-500 to-cyan-500' },
  { id: 3, name: 'Emily Watson', email: 'emily.w@email.com', avatar: 'EW', role: 'Organizer', joined: 'Dec 20, 2024', bookings: 41, spent: '$3,220', status: 'active', lastSeen: '5 min ago', avatarColor: 'from-pink-500 to-rose-500' },
  { id: 4, name: 'Michael Brown', email: 'm.brown@email.com', avatar: 'MB', role: 'Attendee', joined: 'Mar 8, 2025', bookings: 3, spent: '$135', status: 'blocked', lastSeen: '2 days ago', avatarColor: 'from-orange-500 to-amber-500' },
  { id: 5, name: 'Jessica Liu', email: 'jess.liu@email.com', avatar: 'JL', role: 'Attendee', joined: 'Mar 15, 2025', bookings: 12, spent: '$980', status: 'active', lastSeen: '30 min ago', avatarColor: 'from-green-500 to-teal-500' },
  { id: 6, name: 'Ryan Patel', email: 'ryan.p@email.com', avatar: 'RP', role: 'Organizer', joined: 'Nov 5, 2024', bookings: 56, spent: '$5,600', status: 'active', lastSeen: '10 min ago', avatarColor: 'from-indigo-500 to-blue-500' },
  { id: 7, name: 'Chloe Anderson', email: 'chloe.a@email.com', avatar: 'CA', role: 'Attendee', joined: 'Apr 1, 2025', bookings: 1, spent: '$50', status: 'pending', lastSeen: '1 day ago', avatarColor: 'from-fuchsia-500 to-purple-500' },
  { id: 8, name: 'Omar Khalid', email: 'omar.k@email.com', avatar: 'OK', role: 'Attendee', joined: 'Jan 28, 2025', bookings: 7, spent: '$310', status: 'blocked', lastSeen: '5 days ago', avatarColor: 'from-red-500 to-orange-500' },
  { id: 9, name: 'Priya Nair', email: 'priya.n@email.com', avatar: 'PN', role: 'Organizer', joined: 'Feb 18, 2025', bookings: 29, spent: '$2,140', status: 'active', lastSeen: 'Just now', avatarColor: 'from-teal-500 to-green-500' },
  { id: 10, name: 'Lucas Ferreira', email: 'lucas.f@email.com', avatar: 'LF', role: 'Attendee', joined: 'Mar 30, 2025', bookings: 4, spent: '$195', status: 'active', lastSeen: '3 hr ago', avatarColor: 'from-sky-500 to-blue-500' },
];

const statusConfig = {
  active:  { label: 'Active',  bg: 'bg-green-500/15',  text: 'text-green-400',  dot: 'bg-green-400' },
  blocked: { label: 'Blocked', bg: 'bg-red-500/15',    text: 'text-red-400',    dot: 'bg-red-400'   },
  pending: { label: 'Pending', bg: 'bg-yellow-500/15', text: 'text-yellow-400', dot: 'bg-yellow-400'},
};

// ── Confirmation Modal ─────────────────────────────────────
function ConfirmModal({ user, action, onConfirm, onCancel }) {
  const isBlock = action === 'block';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-navy/10 animate-fade-in">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6
          ${isBlock ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
          <svg className={`w-8 h-8 ${isBlock ? 'text-red-500' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {isBlock
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
          </svg>
        </div>
        <h3 className="font-display text-xl font-black text-navy text-center mb-2">
          {isBlock ? 'Block User?' : 'Unblock User?'}
        </h3>
        <p className="text-navy/55 text-sm text-center mb-8 leading-relaxed">
          {isBlock
            ? `${user.name} will lose access to all events and won't be able to make bookings.`
            : `${user.name} will regain full access to the platform.`}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-3 rounded-2xl border border-navy/15 text-navy font-semibold text-sm hover:bg-ice/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-5 py-3 rounded-2xl text-white font-semibold text-sm transition-all shadow-lg
              ${isBlock ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isBlock ? 'Block User' : 'Unblock'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User Detail Drawer ─────────────────────────────────────
function UserDrawer({ user, onClose, onToggleBlock }) {
  if (!user) return null;
  const sc = statusConfig[user.status];
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col">
        {/* Drawer Header */}
        <div className="hero-bg p-8 pb-10">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">User Profile</span>
            <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
              {user.avatar}
            </div>
            <div>
              <h2 className="font-display text-2xl font-black text-white mb-1">{user.name}</h2>
              <p className="text-white/60 text-sm">{user.email}</p>
              <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                {sc.label}
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-8 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Role', value: user.role },
              { label: 'Joined', value: user.joined },
              { label: 'Last Seen', value: user.lastSeen },
              { label: 'Total Spent', value: user.spent },
            ].map(item => (
              <div key={item.label} className="bg-ice/60 rounded-2xl p-4">
                <div className="text-navy/45 text-xs font-semibold uppercase tracking-wide mb-1">{item.label}</div>
                <div className="text-navy font-bold text-sm">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Bookings */}
          <div className="bg-gradient-to-br from-cobalt/10 to-sky/5 rounded-2xl p-5 border border-cobalt/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-navy/50 text-xs font-semibold uppercase tracking-wide mb-1">Total Bookings</div>
                <div className="font-display text-4xl font-black text-navy">{user.bookings}</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-cobalt/15 flex items-center justify-center">
                <svg className="w-7 h-7 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onToggleBlock(user)}
              className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2
                ${user.status === 'blocked'
                  ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                {user.status === 'blocked'
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                }
              </svg>
              {user.status === 'blocked' ? 'Unblock User' : 'Block User'}
            </button>
            <button className="w-full py-3.5 rounded-2xl font-semibold text-sm bg-navy/5 text-navy hover:bg-navy/10 border border-navy/10 transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
function Users() {
  const [users, setUsers] = useState(allUsers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null); // { user, action }
  const [sortBy, setSortBy] = useState('name');

  // ── Derived list ──
  const filtered = users
    .filter(u => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || u.status === filterStatus;
      const matchRole   = filterRole   === 'all' || u.role   === filterRole;
      return matchSearch && matchStatus && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === 'name')     return a.name.localeCompare(b.name);
      if (sortBy === 'bookings') return b.bookings - a.bookings;
      if (sortBy === 'spent')    return parseFloat(b.spent.replace(/[$,]/g,'')) - parseFloat(a.spent.replace(/[$,]/g,''));
      return 0;
    });

  const handleToggleBlock = (user) => {
    const action = user.status === 'blocked' ? 'unblock' : 'block';
    setConfirmModal({ user, action });
    setSelectedUser(null);
  };

  const handleConfirm = () => {
    const { user, action } = confirmModal;
    setUsers(prev => prev.map(u =>
      u.id === user.id ? { ...u, status: action === 'block' ? 'blocked' : 'active' } : u
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
                User Management
              </h1>
              <p className="text-white/65 text-lg">Monitor, manage, and moderate your platform users.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/70 text-sm font-medium">
                {filtered.length} of {users.length} users
              </div>
            </div>
          </div>

          {/* ── STATS GRID ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
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
                  placeholder="Search users…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy placeholder-navy/35 focus:outline-none focus:ring-2 focus:ring-cobalt/30 transition"
                />
              </div>

              {/* Filters + Sort */}
              <div className="flex flex-wrap gap-3">
                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                  <option value="pending">Pending</option>
                </select>

                {/* Role Filter */}
                <select
                  value={filterRole}
                  onChange={e => setFilterRole(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Attendee">Attendee</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-ice/60 rounded-xl text-sm text-navy font-medium focus:outline-none focus:ring-2 focus:ring-cobalt/30 cursor-pointer"
                >
                  <option value="name">Sort: Name</option>
                  <option value="bookings">Sort: Bookings</option>
                  <option value="spent">Sort: Spent</option>
                </select>
              </div>
            </div>

            {/* ── TABLE HEADER ── */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-ice/40 border-b border-navy/5">
              {['User', '', 'Role', 'Joined', 'Bookings', 'Spent', 'Status', 'Actions'].map((h, i) => (
                <div key={i}
                  className={`text-xs font-semibold text-navy/45 uppercase tracking-wide
                    ${i === 0 ? 'col-span-3' : i === 1 ? 'col-span-1 hidden' : 'col-span-1'}
                    ${h === 'Actions' ? 'col-span-2 text-right' : ''}`}>
                  {h}
                </div>
              ))}
            </div>

            {/* ── USER ROWS ── */}
            <div className="divide-y divide-navy/5">
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-ice mx-auto flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <p className="text-navy/40 font-medium">No users found</p>
                </div>
              ) : (
                filtered.map((user) => {
                  const sc = statusConfig[user.status];
                  return (
                    <div
                      key={user.id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-ice/30 transition-colors items-center group"
                    >
                      {/* Avatar + Name (col-span-4) */}
                      <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
                          {user.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-navy text-sm truncate">{user.name}</div>
                          <div className="text-navy/45 text-xs truncate">{user.email}</div>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="hidden md:flex col-span-2 items-center">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full
                          ${user.role === 'Organizer'
                            ? 'bg-cobalt/10 text-cobalt'
                            : 'bg-navy/8 text-navy/60'}`}>
                          {user.role}
                        </span>
                      </div>

                      {/* Joined */}
                      <div className="hidden md:block col-span-2 text-navy/55 text-sm">{user.joined}</div>

                      {/* Bookings */}
                      <div className="hidden md:block col-span-1 text-navy font-semibold text-sm">{user.bookings}</div>

                      {/* Spent */}
                      <div className="hidden md:block col-span-1 text-navy font-semibold text-sm">{user.spent}</div>

                      {/* Status */}
                      <div className="hidden md:flex col-span-1 items-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="hidden md:flex col-span-1 items-center justify-end gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-9 h-9 rounded-xl bg-ice/80 hover:bg-cobalt/10 hover:text-cobalt text-navy/45 flex items-center justify-center transition-all"
                          title="View profile"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        </button>
                        {/* Block / Unblock */}
                        <button
                          onClick={() => handleToggleBlock(user)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                            ${user.status === 'blocked'
                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
                          title={user.status === 'blocked' ? 'Unblock user' : 'Block user'}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            {user.status === 'blocked'
                              ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              : <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            }
                          </svg>
                        </button>
                      </div>

                      {/* Mobile: tap row */}
                      <div className="md:hidden col-span-12 flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedUser(user)} className="px-3 py-1.5 rounded-lg bg-cobalt/10 text-cobalt text-xs font-semibold">View</button>
                          <button
                            onClick={() => handleToggleBlock(user)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                              ${user.status === 'blocked' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-400'}`}
                          >
                            {user.status === 'blocked' ? 'Unblock' : 'Block'}
                          </button>
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
                Showing <span className="font-semibold text-navy">{filtered.length}</span> users
              </p>
              <div className="flex gap-2">
                {['all', 'active', 'blocked'].map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                      ${filterStatus === s
                        ? 'bg-navy text-white'
                        : 'bg-ice/60 text-navy/55 hover:bg-ice'}`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS BANNER ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-br from-navy to-cobalt rounded-3xl p-10 text-center">
            <h2 className="font-display text-3xl font-black text-white mb-3">Need to reach your users?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Send announcements, manage roles, or export your user data in one click.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-ice transition-colors shadow-lg">
                Export Users
              </button>
              <button className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── USER DRAWER ── */}
      {selectedUser && (
        <UserDrawer
          user={users.find(u => u.id === selectedUser.id)}
          onClose={() => setSelectedUser(null)}
          onToggleBlock={handleToggleBlock}
        />
      )}

      {/* ── CONFIRM MODAL ── */}
      {confirmModal && (
        <ConfirmModal
          user={confirmModal.user}
          action={confirmModal.action}
          onConfirm={handleConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}
    </div>
  );
}

export default Users;