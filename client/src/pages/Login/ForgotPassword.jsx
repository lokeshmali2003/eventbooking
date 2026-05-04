import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep]         = useState(1); // 1: email, 2: otp, 3: new password, 4: success
  const [email, setEmail]       = useState('');
  const [otp, setOtp]           = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [timer, setTimer]       = useState(60);
  const otpRefs = useRef([]);

  // OTP timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleEmailSubmit = e => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email address.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return; }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setTimer(60);
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = e => {
    e.preventDefault();
    setError('');
    const otpValue = otp.join('');
    if (otpValue.length !== 6) { setError('Please enter the complete 6-digit code.'); return; }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handlePasswordSubmit = e => {
    e.preventDefault();
    setError('');
    if (!password || !confirmPass) { setError('Please fill in both password fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters long.'); return; }
    if (password !== confirmPass) { setError('Passwords do not match.'); return; }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const resendOtp = () => {
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    otpRefs.current[0]?.focus();
  };

  const stepConfig = [
    { num: 1, label: 'Email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { num: 2, label: 'Verify', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { num: 3, label: 'Reset', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
  ];

  return (
    <div className="min-h-screen flex font-body" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#1a3a6e 60%,#0a1628 100%)' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] p-14 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 -left-40 -top-40" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 -left-20 -top-20" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/5 -right-60 bottom-0" />

        <Link to="/" className="flex items-center gap-2.5 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-cobalt flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-display text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>Eventara</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sky animate-pulse inline-block" />
            Secure password recovery
          </div>
          <h2 className="font-display text-5xl font-black text-white leading-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            {step === 1 && <>Reset your<br/>password</>}
            {step === 2 && <>Verify it's<br/>really <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg,#60a5fa,#93c5fd)' }}>you</span></>}
            {step === 3 && <>Choose a<br/><span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg,#60a5fa,#93c5fd)' }}>strong</span> password</>}
            {step === 4 && <>All set!<br/>You're <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg,#60a5fa,#93c5fd)' }}>good to go</span></>}
          </h2>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            {step === 1 && "Don't worry — we'll help you regain access to your account in just a few simple steps."}
            {step === 2 && "We've sent a 6-digit verification code to your email. Enter it below to continue."}
            {step === 3 && "Create a new password that's at least 8 characters long. Make it unique and memorable."}
            {step === 4 && "Your password has been successfully updated. You can now sign in with your new credentials."}
          </p>

          <div className="flex gap-4 mt-10 flex-wrap">
            {[['🔐','256-bit Encryption'],['⚡','Instant Verification'],['✉️','Email Protected']].map(([icon, label]) => (
              <div key={label} className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-2 text-white/70 text-sm backdrop-blur-sm">
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/8 border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-1">Your security matters</div>
                <div className="text-white/50 text-xs leading-relaxed">
                  All password resets are logged and monitored. We'll notify you of any suspicious activity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14">
        <div className="w-full max-w-md">

          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden w-fit">
            <div className="w-8 h-8 rounded-lg bg-cobalt flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-display text-xl font-black text-white">Eventara</span>
          </Link>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-between mb-8">
              {stepConfig.map((s, idx) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step >= s.num ? 'bg-cobalt text-white shadow-lg shadow-cobalt/25' : 'bg-white/10 text-white/30'
                    }`}>
                      {step > s.num ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs font-medium mt-2 ${step >= s.num ? 'text-white' : 'text-white/30'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < stepConfig.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-all ${step > s.num ? 'bg-cobalt' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            
            {/* Step 1: Email */}
            {step === 1 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-2xl font-black text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                    Enter your email
                  </h1>
                  <p className="text-navy/50 text-sm">We'll send you a verification code</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">Email address</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Sending…</>
                      : 'Continue →'
                    }
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-navy/8">
                  <Link to="/login" className="flex items-center justify-center gap-2 text-navy/60 hover:text-navy text-sm font-medium transition-colors group">
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to login
                  </Link>
                </div>
              </>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-2xl font-black text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                    Enter verification code
                  </h1>
                  <p className="text-navy/50 text-sm">Sent to <span className="text-navy font-semibold">{email}</span></p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div>
                    <label className="block text-navy text-sm font-semibold mb-3">6-digit code</label>
                    <div className="flex gap-2 justify-between">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={el => otpRefs.current[idx] = el}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={e => handleOtpChange(idx, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(idx, e)}
                          className="w-full aspect-square text-center text-2xl font-bold border border-navy/12 rounded-xl text-navy focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    {timer > 0 ? (
                      <span className="text-navy/40">Code expires in <span className="text-navy font-semibold">{timer}s</span></span>
                    ) : (
                      <button type="button" onClick={resendOtp} className="text-cobalt font-semibold hover:underline">
                        Resend code
                      </button>
                    )}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Verifying…</>
                      : 'Verify code →'
                    }
                  </button>
                </form>

                <div className="mt-5 pt-5 border-t border-navy/8">
                  <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 text-navy/60 hover:text-navy text-sm font-medium transition-colors group w-full">
                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Use different email
                  </button>
                </div>
              </>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <>
                <div className="mb-6">
                  <h1 className="font-display text-2xl font-black text-navy mb-2" style={{ letterSpacing: '-0.02em' }}>
                    Create new password
                  </h1>
                  <p className="text-navy/50 text-sm">Make it strong and unique</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">New password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                      </div>
                      <input
                        type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full pl-10 pr-11 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors">
                        {showPass ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy text-sm font-semibold mb-1.5">Confirm password</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <input
                        type={showConfirm ? 'text' : 'password'} value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full pl-10 pr-11 py-3 border border-navy/12 rounded-xl text-navy text-sm placeholder-navy/30 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/10 transition-all"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy/60 transition-colors">
                        {showConfirm ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-sky/10 border border-sky/20 rounded-xl p-3 text-xs text-navy/70">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-sky flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <div className="leading-relaxed">
                        Use a mix of letters, numbers, and symbols for a stronger password.
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-cobalt hover:bg-sky text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25 flex items-center justify-center gap-2 disabled:opacity-70 mt-2">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg> Updating…</>
                      : 'Reset password →'
                    }
                  </button>
                </form>
              </>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                
                <h2 className="font-display text-2xl font-black text-navy mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Password reset successful!
                </h2>
                
                <p className="text-navy/60 text-sm mb-8 max-w-sm mx-auto">
                  Your password has been updated. You can now sign in with your new credentials.
                </p>

                <Link to="/login" 
                  className="inline-flex items-center justify-center gap-2 bg-cobalt hover:bg-sky text-white py-3.5 px-8 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-cobalt/25">
                  Continue to login →
                </Link>

                <p className="text-navy/40 text-xs mt-6">
                  If you didn't request this change,{' '}
                  <a href="#" className="text-navy/60 hover:text-navy underline">contact support immediately</a>
                </p>
              </div>
            )}
          </div>

          {step < 4 && (
            <p className="text-center text-white/40 text-xs mt-6">
              Having trouble?{' '}
              <a href="#" className="text-white/60 hover:text-white underline">Contact support</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}