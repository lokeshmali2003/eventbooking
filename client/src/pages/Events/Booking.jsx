import React, { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// ── Sample event data (in real app, comes from router state / API) ──
const EVENT = {
  id: 2,
  category: 'tech',
  name: 'Future Forward Tech Summit',
  date: 'Sep 5, 2025',
  time: '9:00 AM – 6:00 PM',
  location: 'Moscone Center, SF',
  city: 'San Francisco',
  tag: '💻 Tech',
  img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  description: 'Cutting-edge technology conference with industry leaders and innovators shaping tomorrow.',
  organizer: 'TechForward Inc.',
  totalSeats: 820,
  seatsLeft: 243,
};

// ── Ticket tiers ────────────────────────────────────────────────────
const TICKET_TIERS = [
  {
    id: 'general',
    name: 'General Admission',
    price: 299,
    perks: ['Full conference access', 'Welcome kit', 'Lunch included', 'Digital recordings'],
    color: 'cobalt',
    available: true,
  },
  {
    id: 'vip',
    name: 'VIP Pass',
    price: 549,
    perks: ['Everything in General', 'VIP lounge access', 'Speaker meet & greet', 'Priority seating', 'Exclusive swag bag'],
    color: 'amber',
    available: true,
    badge: 'Popular',
  },
  {
    id: 'workshop',
    name: 'Workshop Add-on',
    price: 149,
    perks: ['Hands-on AI workshop (3 hrs)', 'Small group (max 20)', 'Workshop materials'],
    color: 'teal',
    available: true,
    note: 'Add to any ticket',
  },
];

// ── Steps ───────────────────────────────────────────────────────────
const STEPS = ['Tickets', 'Details', 'Review', 'Confirm'];

// ── Helpers ─────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${i < current ? 'bg-cobalt text-white' : i === current ? 'bg-navy text-white ring-4 ring-navy/20' : 'bg-navy/10 text-navy/40'}`}
            >
              {i < current ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs mt-1.5 font-semibold ${i === current ? 'text-navy' : 'text-navy/40'}`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all duration-500 ${i < current ? 'bg-cobalt' : 'bg-navy/10'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Step 1: Ticket Selection ─────────────────────────────────────────
function TicketStep({ selections, onChange }) {
  const toggleTier = (tierId) => {
    if (tierId === 'workshop') {
      // Workshop is an add-on toggle
      onChange(prev => ({ ...prev, workshop: prev.workshop ? 0 : 1 }));
      return;
    }
    // General / VIP are exclusive
    onChange(prev => {
      const qty = prev[tierId] > 0 ? 0 : 1;
      return {
        ...prev,
        general: tierId === 'general' ? qty : 0,
        vip: tierId === 'vip' ? qty : 0,
      };
    });
  };

  const changeQty = (tierId, delta) => {
    onChange(prev => {
      const next = Math.max(0, Math.min(10, (prev[tierId] || 0) + delta));
      // If base ticket goes to 0, also remove workshop
      if ((tierId === 'general' || tierId === 'vip') && next === 0) {
        return { ...prev, [tierId]: 0, workshop: 0 };
      }
      return { ...prev, [tierId]: next };
    });
  };

  const hasBase = (selections.general || 0) + (selections.vip || 0) > 0;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-black text-navy mb-1">Choose Your Tickets</h2>
      <p className="text-navy/50 text-sm mb-6">{EVENT.seatsLeft} seats remaining — book yours today.</p>

      {TICKET_TIERS.map(tier => {
        const qty = selections[tier.id] || 0;
        const isWorkshop = tier.id === 'workshop';
        const isSelected = qty > 0;
        const isDisabled = isWorkshop && !hasBase;

        return (
          <div
            key={tier.id}
            onClick={() => !isDisabled && toggleTier(tier.id)}
            className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200
              ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-md'}
              ${isSelected
                ? 'border-cobalt bg-cobalt/5 shadow-lg shadow-cobalt/10'
                : 'border-navy/10 bg-white hover:border-navy/25'
              }`}
          >
            {/* Badge */}
            {tier.badge && (
              <span className="absolute -top-3 left-5 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                {tier.badge}
              </span>
            )}
            {isWorkshop && (
              <span className="absolute -top-3 left-5 bg-teal-400 text-teal-900 text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">
                Add-on
              </span>
            )}

            <div className="flex items-start justify-between gap-4">
              {/* Left: info */}
              <div className="flex items-start gap-3 flex-1">
                {/* Checkbox */}
                <div
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${isSelected ? 'bg-cobalt border-cobalt' : 'border-navy/20'}`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy text-base leading-tight">{tier.name}</h3>
                  {tier.note && <p className="text-navy/40 text-xs mt-0.5">{tier.note}</p>}
                  <ul className="mt-2 space-y-1">
                    {tier.perks.map(p => (
                      <li key={p} className="flex items-center gap-1.5 text-navy/60 text-xs">
                        <span className="text-cobalt">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: price + qty */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <span className="text-navy/40 text-xs">per ticket</span>
                  <div className="font-display text-2xl font-black text-navy">${tier.price}</div>
                </div>

                {isSelected && (
                  <div
                    className="flex items-center gap-2 bg-white border border-navy/10 rounded-xl p-1 shadow-sm"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => changeQty(tier.id, -1)}
                      className="w-7 h-7 rounded-lg bg-navy/5 hover:bg-navy/10 text-navy font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-navy text-sm">{qty}</span>
                    <button
                      onClick={() => changeQty(tier.id, 1)}
                      className="w-7 h-7 rounded-lg bg-cobalt hover:bg-sky text-white font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {!hasBase && (
        <p className="text-center text-navy/40 text-sm pt-2">Select a base ticket to unlock the Workshop Add-on.</p>
      )}
    </div>
  );
}

// ── Step 2: User Details ─────────────────────────────────────────────
function DetailsStep({ form, onChange, errors }) {
  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">{label}</label>
      <input
        type={type}
        value={form[name] || ''}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-navy text-sm font-medium placeholder-navy/30
          focus:outline-none focus:ring-2 focus:ring-cobalt transition-all
          ${errors[name] ? 'border-red-400 bg-red-50' : 'border-navy/10 bg-white hover:border-navy/20'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="font-display text-2xl font-black text-navy mb-1">Your Details</h2>
      <p className="text-navy/50 text-sm mb-7">All fields are required for ticket issuance.</p>

      <div className="space-y-5">
        {/* Name row */}
        <div className="grid sm:grid-cols-2 gap-4">
          {field('firstName', 'First Name', 'text', 'Ada')}
          {field('lastName', 'Last Name', 'text', 'Lovelace')}
        </div>

        {field('email', 'Email Address', 'email', 'ada@example.com')}
        {field('phone', 'Phone Number', 'tel', '+1 (555) 000-0000')}

        <div className="grid sm:grid-cols-2 gap-4">
          {field('company', 'Company / Organization', 'text', 'Acme Corp')}
          {field('jobTitle', 'Job Title', 'text', 'Software Engineer')}
        </div>

        {/* Dietary preferences */}
        <div>
          <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Dietary Preferences
          </label>
          <select
            value={form.dietary || ''}
            onChange={e => onChange('dietary', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white text-navy text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cobalt"
          >
            <option value="">No preference</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="halal">Halal</option>
            <option value="kosher">Kosher</option>
          </select>
        </div>

        {/* Special needs */}
        <div>
          <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
            Special Requirements <span className="normal-case text-navy/30 font-normal">(optional)</span>
          </label>
          <textarea
            value={form.notes || ''}
            onChange={e => onChange('notes', e.target.value)}
            placeholder="Accessibility needs, questions for speakers, etc."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white text-navy text-sm font-medium placeholder-navy/30 focus:outline-none focus:ring-2 focus:ring-cobalt resize-none"
          />
        </div>

        {/* Newsletter opt-in */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => onChange('newsletter', !form.newsletter)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all
              ${form.newsletter ? 'bg-cobalt border-cobalt' : 'border-navy/20 group-hover:border-cobalt/50'}`}
          >
            {form.newsletter && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-navy/60 text-sm leading-snug">
            Keep me updated on future TechForward events and early-bird discounts.
          </span>
        </label>
      </div>
    </div>
  );
}

// ── Step 3: Review ───────────────────────────────────────────────────
function ReviewStep({ selections, form, total, breakdown }) {
  const InfoRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-navy/5 last:border-0">
      <span className="text-navy/50 text-sm">{label}</span>
      <span className="text-navy text-sm font-semibold">{value}</span>
    </div>
  );

  return (
    <div>
      <h2 className="font-display text-2xl font-black text-navy mb-1">Review Your Order</h2>
      <p className="text-navy/50 text-sm mb-7">Please verify everything before confirming.</p>

      {/* Ticket breakdown */}
      <div className="bg-navy/3 rounded-2xl p-5 mb-5 border border-navy/8">
        <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-3">Tickets</h3>
        {breakdown.map(b => (
          <div key={b.id} className="flex items-center justify-between py-2 border-b border-navy/5 last:border-0">
            <div>
              <span className="text-navy font-semibold text-sm">{b.name}</span>
              <span className="text-navy/40 text-xs ml-2">× {b.qty}</span>
            </div>
            <span className="text-navy font-bold text-sm">${(b.price * b.qty).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-navy/10">
          <span className="font-display font-black text-navy">Total</span>
          <span className="font-display text-2xl font-black text-cobalt">${total.toLocaleString()}</span>
        </div>
      </div>

      {/* Attendee info */}
      <div className="bg-white rounded-2xl p-5 border border-navy/8 mb-5">
        <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-3">Attendee</h3>
        <InfoRow label="Name" value={`${form.firstName} ${form.lastName}`} />
        <InfoRow label="Email" value={form.email} />
        <InfoRow label="Phone" value={form.phone} />
        {form.company && <InfoRow label="Company" value={form.company} />}
        {form.jobTitle && <InfoRow label="Title" value={form.jobTitle} />}
        {form.dietary && <InfoRow label="Dietary" value={form.dietary} />}
      </div>

      {/* Event info */}
      <div className="bg-white rounded-2xl p-5 border border-navy/8">
        <h3 className="font-bold text-navy text-sm uppercase tracking-wider mb-3">Event</h3>
        <InfoRow label="Event" value={EVENT.name} />
        <InfoRow label="Date" value={EVENT.date} />
        <InfoRow label="Time" value={EVENT.time} />
        <InfoRow label="Venue" value={EVENT.location} />
        <InfoRow label="Organizer" value={EVENT.organizer} />
      </div>

      <p className="text-navy/40 text-xs text-center mt-5 leading-relaxed">
        By confirming, you agree to our <span className="underline cursor-pointer hover:text-navy">Terms of Service</span> and{' '}
        <span className="underline cursor-pointer hover:text-navy">Refund Policy</span>.
      </p>
    </div>
  );
}

// ── Step 4: Confirmation ─────────────────────────────────────────────
function ConfirmationStep({ form, total, bookingRef }) {
  return (
    <div className="text-center py-6">
      {/* Success icon */}
      <div className="w-20 h-20 bg-cobalt/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="font-display text-3xl font-black text-navy mb-2">You're In!</h2>
      <p className="text-navy/50 text-base mb-8 leading-relaxed max-w-sm mx-auto">
        Booking confirmed for <strong className="text-navy">{form.firstName}</strong>. Check your inbox at{' '}
        <strong className="text-cobalt">{form.email}</strong> for your e-tickets.
      </p>

      {/* Ticket stub */}
      <div className="relative max-w-sm mx-auto mb-8">
        {/* Notches */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-pearl rounded-r-full z-10" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-pearl rounded-l-full z-10" />

        <div className="bg-gradient-to-br from-navy to-cobalt rounded-3xl p-6 text-left shadow-2xl shadow-cobalt/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Event Ticket</span>
              <h3 className="font-display text-xl font-black text-white leading-tight mt-1">{EVENT.name}</h3>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg">{EVENT.tag}</span>
          </div>

          <div className="border-t border-white/15 my-4" />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-white/50 text-xs">Date</p>
              <p className="text-white text-sm font-bold">{EVENT.date}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Time</p>
              <p className="text-white text-sm font-bold">{EVENT.time}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Venue</p>
              <p className="text-white text-sm font-bold">{EVENT.location}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs">Total Paid</p>
              <p className="text-white text-sm font-bold">${total.toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-white/15 my-4 border-dashed" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-xs">Booking Ref</p>
              <p className="text-white font-mono font-bold text-base tracking-widest">{bookingRef}</p>
            </div>
            {/* Barcode visual */}
            <div className="flex items-end gap-0.5 h-10">
              {[3,5,2,7,4,6,3,5,4,6,2,7,5,3,6].map((h, i) => (
                <div
                  key={i}
                  className="bg-white/60 rounded-sm w-1"
                  style={{ height: `${h * 5}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <button className="flex-1 bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-semibold text-sm transition-colors">
          Download PDF Ticket
        </button>
        <button className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
          Add to Calendar
        </button>
      </div>
    </div>
  );
}

// ── Order Summary Sidebar ────────────────────────────────────────────
function OrderSummary({ breakdown, total }) {
  return (
    <div className="bg-white rounded-2xl border border-navy/8 p-6 sticky top-24">
      {/* Event snapshot */}
      <div className="rounded-xl overflow-hidden mb-5">
        <img src={EVENT.img} alt={EVENT.name} className="w-full h-36 object-cover" />
      </div>
      <span className="bg-cobalt/10 text-cobalt text-xs font-bold px-3 py-1 rounded-full">{EVENT.tag}</span>
      <h3 className="font-display font-black text-navy text-lg mt-3 mb-1 leading-snug">{EVENT.name}</h3>
      <div className="flex items-center gap-1.5 text-navy/50 text-xs mb-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        {EVENT.date} · {EVENT.time}
      </div>
      <div className="flex items-center gap-1.5 text-navy/50 text-xs mb-5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        {EVENT.location}
      </div>

      {/* Breakdown */}
      {breakdown.length > 0 && (
        <>
          <div className="border-t border-navy/8 pt-4 space-y-2 mb-4">
            {breakdown.map(b => (
              <div key={b.id} className="flex justify-between text-sm">
                <span className="text-navy/60">{b.name} × {b.qty}</span>
                <span className="text-navy font-semibold">${(b.price * b.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-navy/10 pt-3 flex justify-between">
            <span className="font-display font-black text-navy">Total</span>
            <span className="font-display text-xl font-black text-cobalt">${total.toLocaleString()}</span>
          </div>
        </>
      )}

      {breakdown.length === 0 && (
        <p className="text-center text-navy/30 text-sm py-4">No tickets selected yet</p>
      )}

      {/* Trust badges */}
      <div className="mt-6 pt-5 border-t border-navy/8 space-y-2">
        {[
          ['🔒', 'Secure payment'],
          ['✉️', 'Instant e-ticket delivery'],
          ['↩️', '7-day refund policy'],
        ].map(([icon, text]) => (
          <div key={text} className="flex items-center gap-2 text-navy/40 text-xs">
            <span>{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Booking Component ───────────────────────────────────────────
function Booking() {
  const [step, setStep] = useState(0);

  const [selections, setSelections] = useState({ general: 0, vip: 0, workshop: 0 });
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', jobTitle: '', dietary: '', notes: '', newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef] = useState(() =>
    'TF-' + Math.random().toString(36).toUpperCase().slice(2, 8)
  );

  const updateForm = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  // Compute breakdown & total
  const breakdown = useMemo(() => {
    return TICKET_TIERS
      .filter(t => (selections[t.id] || 0) > 0)
      .map(t => ({ ...t, qty: selections[t.id] }));
  }, [selections]);

  const total = useMemo(() =>
    breakdown.reduce((sum, b) => sum + b.price * b.qty, 0),
  [breakdown]);

  // Validation
  const validateDetails = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.lastName.trim()) errs.lastName = 'Last name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Valid email is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canAdvance = () => {
    if (step === 0) return breakdown.length > 0;
    if (step === 1) return true; // validation on next click
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && !validateDetails()) return;

    if (step === 2) {
      // Simulate API submission
      setIsSubmitting(true);
      await new Promise(r => setTimeout(r, 1800));
      setIsSubmitting(false);
    }

    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(s => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-bg pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <a href="/events" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to Events
            </a>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm font-medium mb-4 backdrop-blur-sm">
              {EVENT.tag} &nbsp;·&nbsp; {EVENT.seatsLeft} seats left
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-black text-white leading-tight" style={{ letterSpacing: '-0.03em' }}>
              {EVENT.name}
            </h1>
            <p className="text-white/60 text-base mt-3 leading-relaxed">{EVENT.description}</p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT: FORM ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-navy/5 p-8">
                <StepIndicator current={step} />

                {/* Step content */}
                <div>
                  {step === 0 && (
                    <TicketStep selections={selections} onChange={setSelections} />
                  )}
                  {step === 1 && (
                    <DetailsStep form={form} onChange={updateForm} errors={errors} />
                  )}
                  {step === 2 && (
                    <ReviewStep selections={selections} form={form} total={total} breakdown={breakdown} />
                  )}
                  {step === 3 && (
                    <ConfirmationStep form={form} total={total} bookingRef={bookingRef} />
                  )}
                </div>

                {/* Navigation buttons */}
                {step < 3 && (
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy/8">
                    <button
                      onClick={handleBack}
                      disabled={step === 0}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all
                        ${step === 0
                          ? 'text-navy/20 cursor-not-allowed'
                          : 'text-navy border border-navy/15 hover:bg-navy/5'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                      </svg>
                      Back
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={!canAdvance() || isSubmitting}
                      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all
                        ${!canAdvance() || isSubmitting
                          ? 'bg-navy/20 text-navy/40 cursor-not-allowed'
                          : 'bg-cobalt hover:bg-sky text-white shadow-lg shadow-cobalt/25'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          Processing…
                        </>
                      ) : step === 2 ? (
                        <>Confirm & Pay →</>
                      ) : (
                        <>Continue →</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: SUMMARY ── */}
            <div className="lg:col-span-1">
              <OrderSummary breakdown={breakdown} total={total} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Booking;