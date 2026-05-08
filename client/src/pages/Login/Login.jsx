import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from "../../api";
import toast from "react-hot-toast";

export default function Login() {
   const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);

      // token aur user save karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      navigate("/profile");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex font-body" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#1a3a6e 60%,#0a1628 100%)' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] p-14 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 -left-40 -top-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 -left-20 -top-20" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5 -right-60 bottom-0" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-cobalt flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-display text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>Eventara</span>
        </Link>

        {/* Center copy */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse inline-block" />
            Trusted by 12,000+ event-goers
          </div>
          <h2 className="font-display text-5xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            Your next<br/>
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg,#60a5fa,#93c5fd)' }}>
              unforgettable
            </span><br/>
            experience awaits.
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Sign in to manage your bookings, discover personalised events, and never miss a moment that matters.
          </p>

          {/* Stat pills */}
          <div className="flex gap-4 mt-10 flex-wrap">
            {[['🎵','500+ Events'],['🌆','40+ Cities'],['⚡','Instant Booking']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-2 text-white/70 text-sm backdrop-blur-sm">
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom event cards */}
        <div className="flex gap-4 relative z-10">
          {[
            { img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80', name: 'Neon Horizons', date: 'Aug 14' },
            { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80', name: 'Tech Summit',   date: 'Sep 5'  },
            { img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80', name: 'Food & Vine',   date: 'Oct 3'  },
          ].map(({ img, name, date }) => (
            <div key={name} className="flex-1 rounded-2xl overflow-hidden relative h-28 shadow-xl">
              <img src={img} alt={name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent flex items-end p-3">
                <div>
                  <div className="text-white text-xs font-semibold">{name}</div>
                  <div className="text-white/50 text-xs">{date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden w-fit">
            <div className="w-8 h-8 rounded-lg bg-cobalt flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-display text-xl font-black text-white">Eventara</span>
          </Link>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-black text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                Welcome back
              </h1>
              <p className="text-navy/50 text-sm">Sign in to your Eventara account</p>
            </div>

            {/* Social login */}
            <button className="w-full flex items-center justify-center gap-3 border border-navy/12 rounded-xl py-3 text-navy text-sm font-semibold hover:bg-navy/3 transition-colors mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-navy/10" />
              <span className="text-navy/30 text-xs font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-navy/10" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-navy text-sm font-semibold mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <input
                    type="email" name="email" value={form.email} onChange={handle}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-navy text-sm font-semibold">Password</label>
                  <a href="#" className="text-cobalt text-xs font-medium hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handle}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors">
                    {showPass
                      ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                      : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Signing in…</>
                  : 'Sign In →'
                }
              </button>
            </form>

            <p className="text-center text-navy/40 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cobalt font-semibold hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}