import React, { useState } from 'react';
import AdminNav from '../../components/Navbar/AdminNav';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

// ── Mock Dashboard Data ────────────────────────────────────
const stats = [
  { label: 'Total Bookings', value: '12,847', change: '+18%', trend: 'up', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { label: 'Revenue', value: '$284,900', change: '+24%', trend: 'up', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Active Events', value: '47', change: '+12', trend: 'up', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Avg. Ticket Price', value: '$22.17', change: '+5%', trend: 'up', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
];

const upcomingEvents = [
  { id: 1, name: 'Neon Horizons Music Festival', date: 'Aug 14, 2025', location: 'Golden Gate Park', sold: 1600, capacity: 4000, category: 'Music', color: 'bg-purple-500' },
  { id: 2, name: 'Future Forward Tech Summit', date: 'Sep 5, 2025', location: 'Moscone Center', sold: 680, capacity: 1500, category: 'Tech', color: 'bg-blue-500' },
  { id: 3, name: 'Luminary Art Gala', date: 'Sep 22, 2025', location: 'SFMOMA', sold: 340, capacity: 490, category: 'Art', color: 'bg-pink-500' },
  { id: 4, name: 'Harvest & Vine Food Expo', date: 'Oct 3, 2025', location: 'Fort Mason', sold: 520, capacity: 1120, category: 'Food', color: 'bg-orange-500' },
  { id: 5, name: 'Mindful Living Retreat', date: 'Oct 11, 2025', location: 'Esalen Institute', sold: 48, capacity: 108, category: 'Wellness', color: 'bg-green-500' },
];

const recentBookings = [
  { id: 1, user: 'Sarah Martinez', event: 'Neon Horizons Festival', time: '2 min ago', amount: '$180', avatar: 'SM' },
  { id: 2, user: 'David Chen', event: 'Tech Summit', time: '8 min ago', amount: '$95', avatar: 'DC' },
  { id: 3, user: 'Emily Watson', event: 'Art Gala', time: '15 min ago', amount: '$150', avatar: 'EW' },
  { id: 4, user: 'Michael Brown', event: 'Food Expo', time: '22 min ago', amount: '$45', avatar: 'MB' },
  { id: 5, user: 'Jessica Liu', event: 'Wellness Retreat', time: '35 min ago', amount: '$320', avatar: 'JL' },
];

const revenueData = [
  { month: 'Jan', amount: 18000 },
  { month: 'Feb', amount: 22000 },
  { month: 'Mar', amount: 28000 },
  { month: 'Apr', amount: 24000 },
  { month: 'May', amount: 32000 },
  { month: 'Jun', amount: 38000 },
  { month: 'Jul', amount: 42000 },
];

// ── Dashboard Component ────────────────────────────────────
function Dashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  return (
    <div className="bg-pearl min-h-screen">
      <AdminNav />

      {/* ── HEADER ── */}
      <section className="hero-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.03em' }}>
                Dashboard
              </h1>
              <p className="text-white/65 text-lg">Welcome back! Here's what's happening with your events.</p>
            </div>
            <div className="flex gap-3">
              {['7days', '30days', '90days'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${timeRange === range
                      ? 'bg-white text-navy shadow-lg'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                >
                  {range === '7days' ? 'Last 7 Days' : range === '30days' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* ── STATS GRID ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
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

      {/* ── MAIN CONTENT ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* ── LEFT COLUMN: Revenue Chart & Recent Bookings ── */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Revenue Chart */}
              <div className="bg-white rounded-3xl p-8 border border-navy/5 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-navy mb-1">Revenue Overview</h2>
                    <p className="text-navy/50 text-sm">Monthly revenue trends</p>
                  </div>
                  <div className="text-right">
                    <div className="text-cobalt text-sm font-semibold">This Month</div>
                    <div className="font-display text-2xl font-black text-navy">$42,000</div>
                  </div>
                </div>
                
                {/* Simple Bar Chart */}
                <div className="flex items-end justify-between gap-3 h-56">
                  {revenueData.map((data, i) => {
                    const height = (data.amount / maxRevenue) * 100;
                    return (
                      <div key={data.month} className="flex-1 flex flex-col items-center gap-3">
                        <div className="w-full relative group">
                          <div
                            className="w-full bg-gradient-to-t from-cobalt to-sky rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ${(data.amount / 1000).toFixed(0)}k
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-navy/50">{data.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-3xl p-8 border border-navy/5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-bold text-navy">Recent Bookings</h2>
                  <button className="text-cobalt text-sm font-semibold hover:text-sky transition-colors">
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-ice/50 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cobalt to-sky flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {booking.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-navy text-sm truncate">{booking.user}</div>
                        <div className="text-navy/50 text-xs truncate">{booking.event}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-navy text-sm">{booking.amount}</div>
                        <div className="text-navy/40 text-xs">{booking.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Upcoming Events ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border border-navy/5 shadow-sm sticky top-24">
                <h2 className="font-display text-2xl font-bold text-navy mb-6">Upcoming Events</h2>
                <div className="space-y-5">
                  {upcomingEvents.map((event) => {
                    const soldPercentage = (event.sold / event.capacity) * 100;
                    return (
                      <div key={event.id} className="group">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-2 h-2 rounded-full ${event.color} mt-1.5 flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-navy text-sm leading-snug mb-1 group-hover:text-cobalt transition-colors truncate">
                              {event.name}
                            </h3>
                            <div className="flex items-center gap-2 text-navy/50 text-xs mb-1">
                              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2 text-navy/50 text-xs">
                              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                              {event.location}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="ml-5">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-navy/60 font-medium">{event.sold.toLocaleString()} / {event.capacity.toLocaleString()} sold</span>
                            <span className="text-navy font-semibold">{soldPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="h-2 bg-ice rounded-full overflow-hidden">
                            <div
                              className={`h-full ${event.color} transition-all duration-500 rounded-full`}
                              style={{ width: `${soldPercentage}%` }}
                            />
                          </div>
                        </div>

                        {event.id !== upcomingEvents.length && (
                          <div className="h-px bg-navy/5 mt-5" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-gradient-to-br from-navy to-cobalt rounded-3xl p-10 text-center">
            <h2 className="font-display text-3xl font-black text-white mb-3">Ready to create your next event?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Set up a new event in minutes and start selling tickets right away.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-navy px-8 py-3.5 rounded-full font-semibold hover:bg-ice transition-colors shadow-lg">
                <Link to="/ManageEvents"> Create Event</Link>
               
              </button>
              <button className="bg-white/10 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Dashboard;