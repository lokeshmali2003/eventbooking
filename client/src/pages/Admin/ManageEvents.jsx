import React, { useState, useRef, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// ── Initial Seed Data (mirrors Events.jsx) ─────────────────────────
const seedEvents = [
  {
    id: 1, category: 'music',
    name: 'Neon Horizons Music Festival',
    date: '2025-08-14', location: 'Golden Gate Park, SF',
    seats: 2400, price: 149, tag: '🎵 Music',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    description: 'Three days of electronic music featuring world-class DJs',
    city: 'San Francisco',
  },
  {
    id: 2, category: 'tech',
    name: 'Future Forward Tech Summit',
    date: '2025-09-05', location: 'Moscone Center, SF',
    seats: 820, price: 299, tag: '💻 Tech',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    description: 'Cutting-edge technology conference with industry leaders',
    city: 'San Francisco',
  },
  {
    id: 3, category: 'art',
    name: 'Luminary Art Gala',
    date: '2025-09-22', location: 'SFMOMA, San Francisco',
    seats: 150, price: 95, tag: '🎨 Art',
    img: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80',
    description: 'An evening celebrating contemporary art and culture',
    city: 'San Francisco',
  },
  {
    id: 4, category: 'food',
    name: 'Harvest & Vine Food Expo',
    date: '2025-10-03', location: 'Fort Mason, SF',
    seats: 600, price: 75, tag: '🍷 Food',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    description: 'Taste the finest wines and culinary creations',
    city: 'San Francisco',
  },
  {
    id: 5, category: 'wellness',
    name: 'Mindful Living Retreat',
    date: '2025-10-11', location: 'Esalen Institute, Big Sur',
    seats: 60, price: 450, tag: '🧘 Wellness',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    description: 'Three-day wellness retreat in breathtaking Big Sur',
    city: 'Big Sur',
  },
];

const CATEGORIES = [
  { id: 'music',   label: '🎵 Music' },
  { id: 'tech',    label: '💻 Tech' },
  { id: 'food',    label: '🍷 Food' },
  { id: 'art',     label: '🎨 Art' },
  { id: 'wellness',label: '🧘 Wellness' },
];

const CITIES = ['San Francisco', 'Oakland', 'Palo Alto', 'Big Sur', 'Los Angeles', 'New York'];

const EMPTY_FORM = {
  name: '', category: 'music', date: '', location: '',
  city: 'San Francisco', seats: '', price: '',
  description: '', img: '', tag: '🎵 Music',
};

// ── Tiny helpers ───────────────────────────────────────────────────
const nextId = (events) => Math.max(0, ...events.map(e => e.id)) + 1;
const categoryTag = (id) => CATEGORIES.find(c => c.id === id)?.label ?? id;

// ── Stat Card ──────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-navy/5 shadow-sm flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-navy/50 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="font-display text-2xl font-black text-navy">{value}</p>
      </div>
    </div>
  );
}

// ── Image Upload Zone ──────────────────────────────────────────────
function ImageUploader({ value, onChange }) {
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  }, [onChange]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">
        Event Image
      </label>

      {value ? (
        <div className="relative rounded-2xl overflow-hidden h-44 group">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              className="bg-white text-navy text-xs font-bold px-4 py-2 rounded-xl hover:bg-sky hover:text-white transition-colors"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-white/20 border border-white text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-500/80 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current.click()}
          className={`h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
            ${dragging ? 'border-cobalt bg-cobalt/5 scale-[1.01]' : 'border-navy/15 bg-navy/2 hover:border-cobalt/50 hover:bg-cobalt/3'}`}
        >
          <div className="w-12 h-12 bg-cobalt/10 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-cobalt" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
            </svg>
          </div>
          <p className="text-navy/60 text-sm font-medium">Drop image or <span className="text-cobalt font-semibold">browse</span></p>
          <p className="text-navy/30 text-xs mt-1">PNG, JPG, WEBP — or paste a URL below</p>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />

      {/* URL fallback */}
      <input
        type="url"
        placeholder="…or paste an image URL"
        value={value && value.startsWith('http') ? value : ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full px-4 py-2.5 rounded-xl bg-navy/5 text-navy placeholder-navy/30 border border-navy/10 focus:outline-none focus:ring-2 focus:ring-cobalt text-sm"
      />
    </div>
  );
}

// ── Event Form Modal ───────────────────────────────────────────────
function EventFormModal({ initial, onSave, onClose }) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState(initial ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name = 'Event name is required';
    if (!form.date)              e.date = 'Date is required';
    if (!form.location.trim())   e.location = 'Location is required';
    if (!form.city)              e.city = 'City is required';
    if (!form.seats || form.seats <= 0) e.seats = 'Enter a valid seat count';
    if (!form.price || form.price < 0)  e.price = 'Enter a valid price';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({
      ...form,
      tag: categoryTag(form.category),
      seats: parseInt(form.seats),
      price: parseFloat(form.price),
    });
  };

  const Field = ({ label, error, children }) => (
    <div>
      <label className="text-navy/60 text-xs font-semibold uppercase tracking-wider mb-2 block">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const inputCls = (err) =>
    `w-full px-4 py-2.5 rounded-xl bg-navy/5 text-navy placeholder-navy/30 border focus:outline-none focus:ring-2 text-sm font-medium
    ${err ? 'border-red-400 focus:ring-red-300' : 'border-navy/10 focus:ring-cobalt'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-b border-navy/5 rounded-t-3xl flex items-center justify-between z-10">
          <div>
            <h2 className="font-display text-2xl font-black text-navy">
              {isEdit ? 'Edit Event' : 'Add New Event'}
            </h2>
            <p className="text-navy/40 text-sm mt-0.5">
              {isEdit ? `Editing: ${initial.name}` : 'Fill in the details below'}
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-navy/5 hover:bg-navy/10 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-navy/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Image */}
          <ImageUploader value={form.img} onChange={(v) => set('img', v)} />

          {/* Name */}
          <Field label="Event Name" error={errors.name}>
            <input
              type="text"
              placeholder="e.g. Neon Horizons Music Festival"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className={inputCls(errors.name)}
            />
          </Field>

          {/* Category + City */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" error={errors.category}>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className={inputCls(false)}
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="City" error={errors.city}>
              <select
                value={form.city}
                onChange={e => set('city', e.target.value)}
                className={inputCls(errors.city)}
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          {/* Date + Location */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" error={errors.date}>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className={inputCls(errors.date)}
              />
            </Field>
            <Field label="Venue / Location" error={errors.location}>
              <input
                type="text"
                placeholder="e.g. Moscone Center, SF"
                value={form.location}
                onChange={e => set('location', e.target.value)}
                className={inputCls(errors.location)}
              />
            </Field>
          </div>

          {/* Price + Seats */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ticket Price ($)" error={errors.price}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 font-semibold text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={e => set('price', e.target.value)}
                  className={`${inputCls(errors.price)} pl-8`}
                />
              </div>
            </Field>
            <Field label="Available Seats" error={errors.seats}>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 500"
                  value={form.seats}
                  onChange={e => set('seats', e.target.value)}
                  className={inputCls(errors.seats)}
                />
              </div>
            </Field>
          </div>

          {/* Seat presets */}
          <div className="flex flex-wrap gap-2">
            {[50, 100, 250, 500, 1000, 2500].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => set('seats', n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
                  ${parseInt(form.seats) === n
                    ? 'bg-cobalt text-white border-cobalt'
                    : 'border-navy/15 text-navy/50 hover:border-cobalt/50 hover:text-cobalt'}`}
              >
                {n.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Description */}
          <Field label="Description" error={errors.description}>
            <textarea
              rows={3}
              placeholder="Describe the event in a few sentences…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className={`${inputCls(errors.description)} resize-none`}
            />
          </Field>

          {/* Preview strip */}
          {form.name && (
            <div className="bg-navy/3 border border-navy/8 rounded-2xl p-4 flex items-center gap-4">
              {form.img && (
                <img src={form.img} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-display font-bold text-navy truncate">{form.name}</p>
                <p className="text-navy/40 text-xs mt-0.5">
                  {form.date || '—'} · {form.location || '—'} · ${form.price || '0'} · {form.seats || '0'} seats
                </p>
              </div>
              <span className="ml-auto bg-cobalt/10 text-cobalt text-xs font-bold px-3 py-1 rounded-full flex-shrink-0">
                {categoryTag(form.category)}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-8 py-5 border-t border-navy/5 rounded-b-3xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] bg-cobalt hover:bg-sky text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {isEdit ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
                Save Changes
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
                Publish Event
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ───────────────────────────────────────────
function DeleteModal({ event, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-5 mx-auto">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
        </div>
        <h3 className="font-display text-xl font-black text-navy text-center mb-2">Delete Event?</h3>
        <p className="text-navy/50 text-sm text-center mb-6">
          <strong className="text-navy">{event.name}</strong> will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-navy/15 text-navy py-3 rounded-xl font-semibold text-sm hover:bg-navy/5 transition-colors">
            Keep It
          </button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-colors">
            Delete →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Row in Events Table ────────────────────────────────────────────
function EventRow({ ev, onEdit, onDelete }) {
  const low = ev.seats < 100;
  return (
    <tr className="border-b border-navy/5 hover:bg-cobalt/2 transition-colors group">
      <td className="py-4 pl-6 pr-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-navy/5">
            {ev.img
              ? <img src={ev.img} alt="" className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-xl">{ev.tag?.split(' ')[0]}</div>
            }
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-navy text-sm leading-snug truncate max-w-[200px]">{ev.name}</p>
            <p className="text-navy/40 text-xs truncate max-w-[200px]">{ev.location}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="bg-cobalt/8 text-cobalt text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
          {ev.tag}
        </span>
      </td>
      <td className="py-4 px-4 text-navy/60 text-sm whitespace-nowrap">
        {ev.date}
      </td>
      <td className="py-4 px-4">
        <span className="font-display font-bold text-navy text-base">${ev.price}</span>
      </td>
      <td className="py-4 px-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          low ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {ev.seats.toLocaleString()} {low && '⚠'}
        </span>
      </td>
      <td className="py-4 pl-4 pr-6">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(ev)}
            className="flex items-center gap-1.5 bg-cobalt/10 hover:bg-cobalt text-cobalt hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"/>
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(ev)}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Toast ──────────────────────────────────────────────────────────
function Toast({ message, type, visible }) {
  const color = type === 'delete' ? 'bg-red-500' : 'bg-emerald-500';
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] ${color} text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-500
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}>
      <span>{type === 'delete' ? '🗑' : '✓'}</span>
      {message}
    </div>
  );
}

// ── Main ManageEvents Component ────────────────────────────────────
export default function ManageEvents() {
  const [events, setEvents] = useState(seedEvents);
  const [formModal, setFormModal] = useState(null); // null | 'new' | event-object
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // Derived filtered list
  const visible = events.filter(ev => {
    const matchSearch =
      ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || ev.category === filterCat;
    return matchSearch && matchCat;
  });

  // CRUD handlers
  const handleSave = (data) => {
    if (data.id) {
      setEvents(es => es.map(e => e.id === data.id ? data : e));
      showToast(`"${data.name}" updated successfully`);
    } else {
      const newEvent = { ...data, id: nextId(events) };
      setEvents(es => [...es, newEvent]);
      showToast(`"${newEvent.name}" published!`);
    }
    setFormModal(null);
  };

  const handleDelete = () => {
    const name = deleteTarget.name;
    setEvents(es => es.filter(e => e.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast(`"${name}" deleted`, 'delete');
  };

  // Stats
  const totalSeats   = events.reduce((s, e) => s + e.seats, 0);
  const avgPrice     = events.length ? (events.reduce((s, e) => s + e.price, 0) / events.length).toFixed(0) : 0;
  const lowStock     = events.filter(e => e.seats < 100).length;

  return (
    <div className="min-h-screen bg-pearl">
      <Navbar />

      {/* ── PAGE HEADER ── */}
      <section className="hero-bg pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/70 text-sm font-medium mb-4 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-sky animate-pulse inline-block"></span>
                Admin Dashboard
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-black text-white leading-tight" style={{ letterSpacing: '-0.03em' }}>
                Manage<br /><span className="text-sky">Events</span>
              </h1>
              <p className="text-white/60 text-base mt-3">Add, edit, and delete events from the catalogue.</p>
            </div>
            <button
              onClick={() => setFormModal('new')}
              className="flex items-center gap-2 bg-white text-navy font-bold px-6 py-3.5 rounded-2xl shadow-xl hover:bg-sky hover:text-white transition-all text-sm self-start sm:self-auto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
              Add New Event
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 space-y-8">

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon="🗓" label="Total Events"    value={events.length}             accent="bg-cobalt/10" />
          <StatCard icon="🪑" label="Total Seats"     value={totalSeats.toLocaleString()} accent="bg-sky/10" />
          <StatCard icon="💰" label="Avg. Price"      value={`$${avgPrice}`}            accent="bg-emerald-50" />
          <StatCard icon="⚠️" label="Low Stock"       value={lowStock}                  accent="bg-amber-50" />
        </div>

        {/* ── FILTER BAR ── */}
        <div className="bg-white rounded-2xl border border-navy/5 shadow-sm p-5 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg className="w-4 h-4 text-navy/35 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name or venue…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy/5 text-navy placeholder-navy/30 border border-navy/8 focus:outline-none focus:ring-2 focus:ring-cobalt text-sm font-medium"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCat('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filterCat === 'all' ? 'bg-cobalt text-white' : 'bg-navy/5 text-navy hover:bg-navy/10'}`}
            >
              All
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCat(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filterCat === c.id ? 'bg-cobalt text-white' : 'bg-navy/5 text-navy hover:bg-navy/10'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <span className="text-navy/40 text-xs font-semibold ml-auto">
            {visible.length} of {events.length} shown
          </span>
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-2xl border border-navy/5 shadow-sm overflow-hidden">
          {visible.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy/5 bg-navy/2">
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 pl-6 pr-4">Event</th>
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 px-4">Category</th>
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 px-4">Date</th>
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 px-4">Price</th>
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 px-4">Seats</th>
                    <th className="text-left text-navy/40 text-xs font-bold uppercase tracking-wider py-4 pl-4 pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(ev => (
                    <EventRow
                      key={ev.id}
                      ev={ev}
                      onEdit={(ev) => setFormModal(ev)}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-navy/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <p className="font-display font-bold text-navy text-lg">No events match your filters</p>
              <p className="text-navy/40 text-sm mt-1">Try a different search or category</p>
              <button
                onClick={() => { setSearch(''); setFilterCat('all'); }}
                className="mt-4 text-cobalt text-sm font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* ── EMPTY STATE (no events at all) ── */}
        {events.length === 0 && (
          <div className="text-center py-10">
            <button
              onClick={() => setFormModal('new')}
              className="bg-cobalt hover:bg-sky text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              + Create your first event
            </button>
          </div>
        )}
      </div>

      {/* ── MODALS ── */}
      {formModal !== null && (
        <EventFormModal
          initial={formModal === 'new' ? null : { ...formModal }}
          onSave={handleSave}
          onClose={() => setFormModal(null)}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          event={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}

      {/* ── TOAST ── */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <Footer />
    </div>
  );
}