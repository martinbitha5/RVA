import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  X, ArrowRight, Calendar, Clock,
  DollarSign, Tag, Zap, ShieldCheck,
} from 'lucide-react';

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
  return `${h.toString().padStart(2, '0')}:${m}`;
});

const WHY_ITEMS = [
  { label: 'Moins cher en ligne',        Icon: DollarSign },
  { label: 'Prix incluant les taxes',     Icon: Tag        },
  { label: 'Processus simple et rapide',  Icon: Zap        },
  { label: 'Place garantie',              Icon: ShieldCheck},
];

/* ─── SVG voiture latérale ─────────────────────────────────────────── */
function CarSVG() {
  return (
    <svg
      viewBox="0 0 580 210"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[110px] w-auto drop-shadow-lg"
    >
      {/* Carrosserie principale */}
      <path
        d="M 80,155 L 48,155 Q 32,155 32,140 L 32,122
           Q 32,112 44,108 L 92,102
           L 152,64 Q 167,52 186,50
           L 390,50 Q 410,50 426,64
           L 486,102 L 530,108
           Q 544,112 544,122 L 544,140
           Q 544,155 528,155 L 498,155"
        fill="rgba(255,255,255,0.10)"
        stroke="white"
        strokeWidth="4.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Vitres */}
      <path
        d="M 102,100 L 156,66 Q 168,58 186,56
           L 362,56 Q 380,56 394,66
           L 447,100 Z"
        fill="rgba(255,255,255,0.18)"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Séparation montant central */}
      <line x1="284" y1="58" x2="286" y2="152" stroke="white" strokeWidth="2.5" strokeOpacity="0.35"/>

      {/* Poignées de portes */}
      <rect x="175" y="116" width="22" height="7" rx="3.5" fill="white" fillOpacity="0.45"/>
      <rect x="345" y="116" width="22" height="7" rx="3.5" fill="white" fillOpacity="0.45"/>

      {/* Phare avant */}
      <ellipse cx="50" cy="124" rx="12" ry="8" fill="white" fillOpacity="0.80"/>
      <ellipse cx="50" cy="124" rx="7"  ry="5" fill="white" fillOpacity="0.40"/>

      {/* Feu arrière */}
      <ellipse cx="525" cy="120" rx="10" ry="7" fill="white" fillOpacity="0.80"/>
      <ellipse cx="525" cy="120" rx="5"  ry="4" fill="white" fillOpacity="0.35"/>

      {/* Roue avant — arc de passage */}
      <path d="M 80,155 Q 80,185 112,185 Q 144,185 144,155"
        fill="rgba(10,10,10,0.50)" />
      {/* Roue avant */}
      <circle cx="112" cy="163" r="30" fill="rgba(255,255,255,0.08)" stroke="white" strokeWidth="5"/>
      <circle cx="112" cy="163" r="14" fill="rgba(255,255,255,0.20)"/>
      <circle cx="112" cy="163" r="5"  fill="white" fillOpacity="0.50"/>

      {/* Roue arrière — arc */}
      <path d="M 432,155 Q 432,185 464,185 Q 496,185 496,155"
        fill="rgba(10,10,10,0.50)" />
      {/* Roue arrière */}
      <circle cx="464" cy="163" r="30" fill="rgba(255,255,255,0.08)" stroke="white" strokeWidth="5"/>
      <circle cx="464" cy="163" r="14" fill="rgba(255,255,255,0.20)"/>
      <circle cx="464" cy="163" r="5"  fill="white" fillOpacity="0.50"/>

      {/* Bas de caisse */}
      <line x1="144" y1="155" x2="432" y2="155" stroke="white" strokeWidth="3" strokeOpacity="0.25"/>
    </svg>
  );
}

/* ─── Composant principal ──────────────────────────────────────────── */
function FormulaireStationnement() {
  const navigate  = useNavigate();
  const { reason } = Route.useSearch();

  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate,   setEndDate]   = useState('');
  const [endTime,   setEndTime]   = useState('');
  const [promo,     setPromo]     = useState('');
  const [error,     setError]     = useState(
    reason === 'min4h' ? '1 — Vous devez réserver pour un séjour minimum de 4 heures' : '',
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!startDate || !startTime || !endDate || !endTime) {
      setError('Veuillez remplir toutes les dates et heures.');
      return;
    }

    const start = new Date(`${startDate}T${startTime.padStart(5, '0')}`);
    const end   = new Date(`${endDate}T${endTime.padStart(5, '0')}`);

    if (end <= start) {
      setError('La date de sortie doit être après la date d\'entrée.');
      return;
    }
    if ((end.getTime() - start.getTime()) / 3_600_000 < 4) {
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

  const fieldCls =
    'w-full border border-[#d0d5dd] bg-white px-4 py-3 text-sm text-[#1a1a1a] ' +
    'focus:border-[#003DA5] focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 transition-colors';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#555]';

  return (
    <main id="main-content">

      {/* ── Bannière d'erreur ──────────────────────────────────────── */}
      {error && (
        <div className="flex items-center justify-between gap-3 bg-[#fde8e8] px-5 py-3 text-sm text-[#c0392b] border-b border-[#f5c6c6]">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')} aria-label="Fermer"
            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Hero image ───────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Aéroport International de N'djili"
          className="h-56 sm:h-72 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#1a1a1a] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            Stationnement
          </span>
        </div>
      </div>

      {/* ── Formulaire ───────────────────────────────────────────── */}
      <div className="bg-white shadow-sm border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <form onSubmit={handleSubmit}>

            {/* Ligne 1 : dates + heures + bouton */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">

              {/* Date d'entrée */}
              <div>
                <label className={labelCls}>Date d'entrée</label>
                <div className="relative">
                  <Calendar size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                  <input type="date" value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className={`${fieldCls} pl-9`} />
                </div>
              </div>

              {/* Heure d'entrée */}
              <div>
                <label className={labelCls}>Heure d'entrée</label>
                <div className="relative">
                  <Clock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                  <select value={startTime} onChange={e => setStartTime(e.target.value)}
                    className={`${fieldCls} pl-9 appearance-none`}>
                    <option value="">-- Heure --</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Date de sortie */}
              <div>
                <label className={labelCls}>Date de sortie</label>
                <div className="relative">
                  <Calendar size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                  <input type="date" value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className={`${fieldCls} pl-9`} />
                </div>
              </div>

              {/* Heure de sortie */}
              <div>
                <label className={labelCls}>Heure de sortie</label>
                <div className="relative">
                  <Clock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                  <select value={endTime} onChange={e => setEndTime(e.target.value)}
                    className={`${fieldCls} pl-9 appearance-none`}>
                    <option value="">-- Heure --</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Bouton */}
              <button type="submit"
                className="flex items-center justify-center gap-2 bg-[#003DA5] px-7 py-3 text-sm font-bold text-white hover:bg-[#002a7a] active:scale-[0.98] transition-colors whitespace-nowrap h-[46px]">
                Obtenir une soumission
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Ligne 2 : code promo */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
              <div>
                <label className={labelCls}>
                  Code promotionnel <span className="normal-case font-normal text-[#999]">(Optionnel)</span>
                </label>
                <input type="text" value={promo}
                  onChange={e => setPromo(e.target.value.toUpperCase())}
                  placeholder="Ex : FIHVIP25"
                  className={fieldCls} />
              </div>
              {/* Espaceur invisible pour aligner sur la grille lg */}
              <div className="hidden lg:block" />
              <div className="hidden lg:block w-[calc(7rem+56px)]" />
            </div>

          </form>
        </div>
      </div>

      {/* ── Pourquoi réserver en ligne ? ────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <h2 className="mb-10 text-2xl font-bold tracking-tight text-[#1a1a1a]">
            Pourquoi réserver en ligne&nbsp;?
          </h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {WHY_ITEMS.map(({ label, Icon }) => (
              <div key={label} className="flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#c0392b] shadow-md shadow-[#c0392b]/20">
                  <Icon size={28} className="text-white" strokeWidth={1.8} />
                </div>
                <p className="text-sm font-semibold leading-snug text-[#1a1a1a]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bandeau bas : voiture + photo ────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 h-[240px]">

        {/* Colonne gauche — sombre : voiture à gauche, texte à droite */}
        <div className="relative flex flex-row items-center overflow-hidden bg-[#111827] px-6 py-8 gap-4">
          {/* Halo de fond */}
          <div className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-[#003DA5]/20 blur-3xl" />

          {/* Voiture — côté gauche, légèrement sortante */}
          <div className="relative shrink-0 -ml-4 opacity-90">
            <CarSVG />
          </div>

          {/* Texte — côté droit */}
          <div className="relative flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-black text-sm text-[#111827] shadow">
                P
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                FIH Parking
              </span>
            </div>
            <p className="text-lg font-bold leading-snug text-white sm:text-xl">
              Des stationnements pour{' '}
              <span className="text-[#FFCE00]">tous les besoins</span>
              {' '}et{' '}
              <span className="text-[#FFCE00]">tous les budgets</span>
            </p>
          </div>
        </div>

        {/* Colonne droite — photo parking */}
        <div className="relative overflow-hidden">
          <img
            src="/images/fih-hero-2.jpg"
            alt="Parking Aéroport de N'djili FIH"
            className="h-full w-full object-cover object-center"
            onError={e => {
              const el = e.currentTarget.parentElement as HTMLElement;
              e.currentTarget.style.display = 'none';
              el.style.background = 'linear-gradient(135deg,#0d2144 0%,#003DA5 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-7 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-0.5">
              Terminal International · FIH
            </p>
            <p className="text-base font-bold text-white leading-snug">
              Parking sécurisé 24h/24 · Accès direct terminal
            </p>
          </div>
        </div>

      </section>

    </main>
  );
}
