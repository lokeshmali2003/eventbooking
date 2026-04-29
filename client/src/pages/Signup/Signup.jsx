import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = ['Account', 'Profile', 'Done'];

export default function Signup() {
  const [step, setStep]         = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [form, setForm]         = useState({
    email: '', password: '', confirm: '',
    firstName: '', lastName: '', interests: [],
  });

  const interests = ['🎵 Music','💻 Tech','🎨 Art','🍷 Food','🧘 Wellness','🏃 Sports'];
  const handle    = e => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleInterest = tag =>
    setForm(f => ({
      ...f,
      interests: f.interests.includes(tag)
        ? f.interests.filter(i => i !== tag)
        : [...f.interests, tag],
    }));

  const nextStep = () => {
    setError('');
    if (step === 0) {
      if (!form.email || !form.password || !form.confirm) { setError('Please fill in all fields.'); return; }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
      if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    }
    if (step === 1) {
      if (!form.firstName || !form.lastName) { setError('Please enter your name.'); return; }
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(2); }, 1500);
      return;
    }
    setStep(s => s + 1);
  };

  return (
    <div className="min-h-screen flex font-body" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#1a3a6e 60%,#0a1628 100%)' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] p-14 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 -left-40 -top-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 -left-20 -top-20" />

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
            Free to join — always
          </div>
          <h2 className="font-display text-5xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            Join thousands<br/>
            discovering<br/>
            <span className="">
              great events.
            </span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Create your free account in under 2 minutes and start booking the experiences you'll remember forever.
          </p>

          {/* Benefits */}
          <ul className="mt-10 space-y-3">
            {[
              ['✓','Personalised event recommendations'],
              ['✓','One-tap booking & e-tickets'],
              ['✓','Exclusive early-access deals'],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-3 text-white/70 text-sm">
                <span className="w-6 h-6 rounded-full bg-cobalt/40 flex items-center justify-center text-sky text-xs font-bold flex-shrink-0">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="bg-white/8 border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
          <p className="text-white/70 text-sm leading-relaxed italic mb-3">
            "Eventara made booking the Jazz festival stupidly easy. Got my e-ticket in 20 seconds flat."
          </p>
          <div className="flex items-center gap-2.5">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80"
              alt="User" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <div className="text-white text-xs font-semibold">Priya Sharma</div>
              <div className="text-white/40 text-xs">San Francisco, CA</div>
            </div>
            <div className="ml-auto text-yellow-400 text-xs">★★★★★</div>
          </div>
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

            {/* Step indicator */}
            {step < 2 && (
              <div className="flex items-center gap-2 mb-8">
                {steps.slice(0,2).map((label, i) => (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
                        ${i < step ? 'bg-cobalt text-white' : i === step ? 'bg-cobalt text-white' : 'bg-navy/10 text-navy/30'}`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs font-semibold ${i === step ? 'text-navy' : 'text-navy/30'}`}>{label}</span>
                    </div>
                    {i < 1 && <div className={`flex-1 h-px ${i < step ? 'bg-cobalt' : 'bg-navy/10'}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* ── Step 0: Credentials ── */}
            {step === 0 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-3xl font-black text-navy mb-1" style={{ letterSpacing: '-0.02em' }}>Create account</h1>
                  <p className="text-navy/50 text-sm">Free forever. No credit card required.</p>
                </div>

                {/* Google */}
                <button className="w-full flex items-center justify-center gap-3 border border-navy/12 rounded-xl py-3 text-navy text-sm font-semibold hover:bg-navy/3 transition-colors mb-5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-navy/10" />
                  <span className="text-navy/30 text-xs font-medium">or with email</span>
                  <div className="flex-1 h-px bg-navy/10" />
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">Email address</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <input type="email" name="email" value={form.email} onChange={handle}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">Password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                      </div>
                      <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handle}
                        placeholder="Min. 8 characters"
                        className="w-full pl-10 pr-11 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"/>
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors">
                        {showPass
                          ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                          : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        }
                      </button>
                    </div>
                    {/* Strength bar */}
                    {form.password && (
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className={`flex-1 h-1 rounded-full transition-all ${
                            form.password.length >= i * 3
                              ? form.password.length < 6 ? 'bg-red-400'
                              : form.password.length < 8 ? 'bg-yellow-400' : 'bg-green-400'
                              : 'bg-navy/10'
                          }`}/>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">Confirm password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                      <input type="password" name="confirm" value={form.confirm} onChange={handle}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"/>
                    </div>
                  </div>
                </div>

                <button onClick={nextStep}
                  className="w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 mt-5">
                  Continue →
                </button>

                <p className="text-center text-navy/40 text-sm mt-5">
                  Already have an account?{' '}
                  <Link to="/login" className="text-cobalt font-semibold hover:underline">Sign in</Link>
                </p>
              </>
            )}

            {/* ── Step 1: Profile ── */}
            {step === 1 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-3xl font-black text-navy mb-1" style={{ letterSpacing: '-0.02em' }}>Your profile</h1>
                  <p className="text-navy/50 text-sm">Tell us a bit about yourself</p>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-navy text-sm font-semibold mb-1.5">First name</label>
                      <input type="text" name="firstName" value={form.firstName} onChange={handle}
                        placeholder="Jane"
                        className="w-full px-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"/>
                    </div>
                    <div>
                      <label className="block text-navy text-sm font-semibold mb-1.5">Last name</label>
                      <input type="text" name="lastName" value={form.lastName} onChange={handle}
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy text-sm font-semibold mb-3">
                      Interests <span className="text-navy/30 font-normal">(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(tag => (
                        <button key={tag} type="button" onClick={() => toggleInterest(tag)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all
                            ${form.interests.includes(tag)
                              ? 'bg-cobalt text-white border-cobalt'
                              : 'bg-white text-navy border-navy/12 hover:border-cobalt hover:text-cobalt'}`}>
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)}
                    className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
                    ← Back
                  </button>
                  <button onClick={nextStep} disabled={loading}
                    className="flex-[2] bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Creating…</>
                      : 'Create Account →'
                    }
                  </button>
                </div>
              </>
            )}

            {/* ── Step 2: Done ── */}
            {step === 2 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 rounded-full bg-ice flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 className="font-display text-3xl font-black text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                  You're in, {form.firstName}! 🎉
                </h2>
                <p className="text-navy/50 text-sm mb-8">Your account is ready. Start exploring events now.</p>
                <Link to="/"
                  className="inline-block w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25">
                  Browse Events →
                </Link>
                <p className="text-navy/30 text-xs mt-4">A confirmation email has been sent to <strong className="text-navy/50">{form.email}</strong></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}