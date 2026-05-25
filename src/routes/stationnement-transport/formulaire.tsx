import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/formulaire')({
  validateSearch: (search: Record<string, unknown>) => ({
    reason: search.reason != null ? String(search.reason) : undefined,
  }),
  component: FormulaireStationnement,
  head: () => ({
    meta: [
      { title: "Réserver un stationnement — Aéroport N'djili FIH" },
      { name: 'description', content: "Réservez votre stationnement officiel à l'Aéroport International de N'djili. Moins cher en ligne, place garantie." },
    ],
  }),
});

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

const WHY_ITEMS = [
  { label: 'Moins cher en ligne',       bg: 'bg-[#c0392b]', icon: '💰' },
  { label: 'Prix incluant les taxes',    bg: 'bg-[#c0392b]', icon: '🏷️' },
  { label: 'Processus simple et rapide', bg: 'bg-[#c0392b]', icon: '⚡' },
  { label: 'Place garantie',             bg: 'bg-[#c0392b]', icon: '🅿️' },
];

function FormulaireStationnement() {
  const navigate = useNavigate();
  const { reason } = Route.useSearch();

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate,   setEndDate]   = useState('');
  const [endTime,   setEndTime]   = useState('');
  const [promo,     setPromo]     = useState('');
  const [caa,       setCaa]       = useState('');
  const [error,     setError]     = useState(
    reason === 'min4h' ? '1 — Vous devez réserver pour un séjour minimum de 4 heures' : ''
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!startDate || !startTime || !endDate || !endTime) {
      setError('Veuillez remplir toutes les dates et heures.');
      return;
    }

    const hStart = startTime.includes(':') ? startTime : `${startTime}:00`;
    const hEnd   = endTime.includes(':')   ? endTime   : `${endTime}:00`;
    const start  = new Date(`${startDate}T${hStart.padStart(5, '0')}`);
    const end    = new Date(`${endDate}T${hEnd.padStart(5, '0')}`);

    if (end <= start) {
      setError('La date de sortie doit être après la date d\'entrée.');
      return;
    }
    const diffH = (end.getTime() - start.getTime()) / 3_600_000;
    if (diffH < 4) {
      setError('1 — Vous devez réserver pour un séjour minimum de 4 heures');
      return;
    }

    void navigate({
      to: '/stationnement-transport/stationnement-fih' as never,
      search: {
        start: start.toISOString(),
        end:   end.toISOString(),
        promo: promo.trim() || undefined,
      } as never,
    });
  }

  const inputCls =
    'w-full border border-[#d0d5dd] bg-white px-4 py-3 text-sm text-[#1a1a1a] focus:border-[#003DA5] focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 transition-colors';
  const labelCls = 'mb-1 block text-sm font-medium text-[#333]';

  return (
    <main id="main-content">

      {/* ── Bannière d'erreur style YUL ──────────────────────────────── */}
      {error && (
        <div className="flex items-center justify-between gap-3 bg-[#fde8e8] px-5 py-3 text-sm text-[#c0392b] border-b border-[#f5c6c6]">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError('')}
            aria-label="Fermer"
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Hero image + onglet STATIONNEMENT ───────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Aéroport International de N'djili"
          className="h-56 sm:h-72 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#2d2d2d] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white">
            Stationnement
          </span>
        </div>
      </div>

      {/* ── Formulaire de réservation ────────────────────────────────── */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-2xl px-5 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Ligne 1 : dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Date d'entrée</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">📅</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Heure d'entrée</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">🕐</span>
                  <select
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className={`${inputCls} pl-9 appearance-none`}
                  >
                    <option value="">-- Heure --</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Ligne 2 : sortie */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Date de sortie</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">📅</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={`${inputCls} pl-9`}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Heure de sortie</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">🕐</span>
                  <select
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className={`${inputCls} pl-9 appearance-none`}
                  >
                    <option value="">-- Heure --</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Code promotionnel */}
            <div>
              <label className={labelCls}>
                Code promotionnel <span className="font-normal text-[#888]">(Optionnel)</span>
              </label>
              <input
                type="text"
                value={promo}
                onChange={e => setPromo(e.target.value.toUpperCase())}
                placeholder="Code promotionnel"
                className={inputCls}
              />
            </div>

            {/* Numéro CAA */}
            <div>
              <label className={labelCls}>
                Numéro CAA <span className="font-normal text-[#888]">(Optionnel)</span>
              </label>
              <input
                type="text"
                value={caa}
                onChange={e => setCaa(e.target.value)}
                placeholder="Numéro CAA"
                className={inputCls}
              />
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-[#003DA5] py-3.5 text-sm font-bold text-white hover:bg-[#002a7a] active:scale-[0.99] transition-colors"
            >
              Obtenir une soumission
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* ── Pourquoi réserver en ligne ? ─────────────────────────────── */}
      <section className="bg-white border-t border-[#eee] py-12">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <h2 className="mb-8 text-xl font-bold text-[#1a1a1a]">
            Pourquoi réserver en ligne&nbsp;?
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {WHY_ITEMS.map(({ label, bg, icon }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${bg} text-2xl shadow`}>
                  {icon}
                </div>
                <p className="text-xs font-semibold text-[#1a1a1a] leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bandeau sombre bas ───────────────────────────────────────── */}
      <section className="bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:gap-10">
          <div className="flex-1 text-center sm:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-black text-xl text-[#1a1a1a]">
                P
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">FIH Parking</span>
            </div>
            <p className="text-xl font-bold leading-snug text-white sm:text-2xl">
              Des stationnements pour <span className="font-extrabold">tous les besoins</span>
              {' '}et <span className="font-extrabold">tous les budgets</span>
            </p>
          </div>
          <div className="w-full sm:w-80 shrink-0 overflow-hidden rounded-xl">
            <img
              src="/images/fih-hero-2.jpg"
              alt="Parking FIH"
              className="h-40 w-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

    </main>
  );
}
