import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  Car, Zap, Accessibility, CheckCircle, ArrowLeft,
  Calendar, Clock, Shield, Bus, Loader2, Lock, Tag,
  Download, MapPin, Phone, Mail, User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParkingAvailability } from '@/lib/queries';
import { supabase } from '@/lib/supabase';
import type { ParkingLot } from '@/types/database';

// ── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/stationnement-transport/reservation')({
  validateSearch: (search: Record<string, unknown>) => ({
    start: String(search.start ?? ''),
    end: String(search.end ?? ''),
    promo: search.promo != null ? String(search.promo) : undefined,
    lotId: search.lotId != null ? String(search.lotId) : undefined,
  }),
  component: ReservationPage,
  head: () => ({
    meta: [
      { title: "Réservation stationnement — Aéroport N'djili FIH" },
      { name: 'description', content: "Réservez votre place de stationnement en ligne à FIH. Paiement Mobile Money accepté. Place garantie." },
    ],
  }),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `FIH-${s.slice(0, 4)}-${s.slice(4)}`;
}

function fmtLong(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    weekday: 'long', day: '2-digit', month: 'long',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtShort(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function calcHours(start: string, end: string): number {
  return (new Date(end).getTime() - new Date(start).getTime()) / 3_600_000;
}

function durationLabel(hours: number): string {
  const d = Math.floor(hours / 24);
  const h = Math.round(hours % 24);
  if (d === 0) return `${h}h`;
  if (h === 0) return `${d} jour${d > 1 ? 's' : ''}`;
  return `${d}j ${h}h`;
}

function calcPrice(lot: ParkingLot, hours: number) {
  const days = Math.max(1, Math.ceil(hours / 24));
  const guichet = days * (lot.daily_rate_usd ?? 10);
  return {
    guichet: Math.round(guichet * 100) / 100,
    online: Math.round(guichet * 0.85 * 100) / 100,
    days,
  };
}

// ── Static fallback lots ──────────────────────────────────────────────────────

const STATIC_LOTS: ParkingLot[] = [
  {
    id: 'static-p1', code: 'P1',
    name: 'Parking P1 — Court séjour',
    description_fr: 'Parking de proximité idéal pour les courts séjours. Accès direct au terminal international en moins de 2 minutes à pied.',
    description_en: null,
    total_spots: 120, available_spots: null,
    hourly_rate_usd: 2, daily_rate_usd: 15, weekly_rate_usd: 80, monthly_rate_usd: null,
    distance_terminal: '50 m', shuttle_available: false,
    ev_charging: false, covered: false, pmr_spots: 4,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p2', code: 'P2',
    name: 'Parking P2 — Long séjour',
    description_fr: 'Parking économique pour les séjours prolongés. Navette gratuite et régulière vers le terminal toutes les 15 minutes.',
    description_en: null,
    total_spots: 250, available_spots: null,
    hourly_rate_usd: 1, daily_rate_usd: 10, weekly_rate_usd: 55, monthly_rate_usd: null,
    distance_terminal: '400 m', shuttle_available: true,
    ev_charging: false, covered: false, pmr_spots: 8,
    security_level: 'cctv_24h', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
  {
    id: 'static-p3', code: 'P3',
    name: 'Parking P3 — Premium couvert',
    description_fr: 'Parking couvert avec surveillance premium. Idéal pour protéger votre véhicule. Bornes de recharge pour véhicules électriques disponibles.',
    description_en: null,
    total_spots: 60, available_spots: null,
    hourly_rate_usd: 3, daily_rate_usd: 22, weekly_rate_usd: 110, monthly_rate_usd: null,
    distance_terminal: '100 m', shuttle_available: false,
    ev_charging: true, covered: true, pmr_spots: 6,
    security_level: 'premium', latitude: null, longitude: null,
    active: true, created_at: '', updated_at: '',
  },
];

// ── Payment methods ───────────────────────────────────────────────────────────

const PAY_METHODS = [
  {
    id: 'airtel_money' as const,
    name: 'Airtel Money', color: 'bg-red-600',
    ussd: '*500*4*1*{NUMERO}*{MONTANT}#',
    hint: 'Composez le code sur votre téléphone Airtel.',
  },
  {
    id: 'mpesa' as const,
    name: 'M-Pesa Vodacom', color: 'bg-green-600',
    ussd: '*150*01*{MONTANT}*{NUMERO}#',
    hint: 'Composez le code sur votre téléphone Vodacom.',
  },
  {
    id: 'orange_money' as const,
    name: 'Orange Money', color: 'bg-orange-500',
    ussd: '#144# puis suivre les instructions',
    hint: 'Sélectionnez "Paiement marchand" et saisissez le code.',
  },
];

// ── Security label ────────────────────────────────────────────────────────────

function securityLabel(level: ParkingLot['security_level']): string {
  if (level === 'cctv_24h') return 'CCTV 24h/24';
  if (level === 'premium') return 'Sécurité premium';
  if (level === 'standard') return 'Sécurisé';
  return 'Sécurisé';
}

// ── Main component ────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

const STEP_LABELS = ['Choisir les dates', 'Choisir le produit', 'Vos renseignements', 'Confirmation'];

function ReservationPage() {
  const { start, end, promo, lotId } = Route.useSearch();
  const { data: dbLots = [] } = useParkingAvailability();
  const lots = dbLots.length > 0 ? dbLots : STATIC_LOTS;

  const hours = start && end ? calcHours(start, end) : 0;

  const preselected = lotId ? (lots.find(l => l.id === lotId) ?? null) : null;
  const [step, setStep] = useState<Step>(preselected ? 2 : 1);
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(preselected);
  const [billing, setBilling] = useState({
    firstName: '', lastName: '', email: '', confirmEmail: '',
    phone: '', plate: '', airline: '', destination: '',
  });
  const [payMethod, setPayMethod] = useState<'airtel_money' | 'mpesa' | 'orange_money'>('airtel_money');
  const [payPhone, setPayPhone] = useState('');
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [authEmail, setAuthEmail] = useState('');

  useEffect(() => {
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session?.user);
      if (session?.user?.email) {
        const email = session.user.email;
        setAuthEmail(email);
        setBilling(b => ({ ...b, email, confirmEmail: email }));
      }
    })();
  }, []);

  // ── Invalid params guard ────────────────────────────────────────────────────

  if (!start || !end || hours < 4) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-4">Paramètres de réservation invalides.</p>
        <Link to={'/stationnement-transport/formulaire' as never}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
          <ArrowLeft size={13} /> Retour au stationnement
        </Link>
      </div>
    );
  }

  // ── Derived values ──────────────────────────────────────────────────────────

  const selectedPrice = selectedLot ? calcPrice(selectedLot, hours) : null;

  const activePayMethod = PAY_METHODS.find(m => m.id === payMethod)!;
  const ussdCode = activePayMethod.ussd
    .replace('{NUMERO}', payPhone || '0XXXXXXXXX')
    .replace('{MONTANT}', selectedPrice ? String(selectedPrice.online) : '0');

  const qrUrl = code
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=FIH-RSVP-${code}&color=003DA5&bgcolor=F7F7F2`
    : '';

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleSelectLot(lot: ParkingLot) {
    setSelectedLot(lot);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validate
    if (!billing.firstName.trim() || !billing.lastName.trim()) {
      setError('Le prénom et le nom sont requis.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billing.email)) {
      setError('Adresse courriel invalide.'); return;
    }
    if (billing.email !== billing.confirmEmail) {
      setError('Les adresses courriel ne correspondent pas.'); return;
    }
    if (!billing.phone.trim()) {
      setError('Le numéro WhatsApp est requis.'); return;
    }
    if (!billing.plate.trim()) {
      setError("La plaque d'immatriculation est requise."); return;
    }
    if (!payPhone.trim()) {
      setError('Le numéro de paiement Mobile Money est requis.'); return;
    }
    if (!terms || !privacy) {
      setError("Vous devez accepter les conditions d'utilisation et la politique de confidentialité."); return;
    }
    if (!selectedLot) {
      setError('Aucun parking sélectionné.'); return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setError('Vous devez être connecté pour finaliser la réservation.');
      return;
    }

    setLoading(true);
    try {
      const newCode = generateCode();
      const newQr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FIH-RSVP-${newCode}&color=003DA5&bgcolor=F7F7F2`;
      const price = calcPrice(selectedLot, hours);

      await supabase.from('parking_reservations').insert({
        user_id: session.user.id,
        parking_lot_id: selectedLot.id,
        vehicle_plate: billing.plate.toUpperCase().trim(),
        start_at: start,
        end_at: end,
        total_amount_usd: price.online,
        payment_method: payMethod,
        payment_status: 'paid',
        reservation_code: newCode,
        qr_code_url: newQr,
        notes: [
          billing.airline ? `Vol: ${billing.airline}` : '',
          billing.destination ? `Destination: ${billing.destination}` : '',
        ].filter(Boolean).join(' — ') || null,
      } as never);

      setCode(newCode);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  // ── UI helpers ──────────────────────────────────────────────────────────────

  const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground';
  const inputClass = 'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue';

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <main id="main-content" className="min-h-screen bg-muted/30">

      {/* ── Progress stepper — style YUL ──────────────────────────────── */}
      <div className="border-b border-border bg-white">
        <div className="container py-5">
          {/* Labels */}
          <div className="flex mb-2">
            {STEP_LABELS.map((label, idx) => {
              const isComplete = idx < step;
              const isActive   = idx === step;
              return (
                <div key={idx} className="flex-1 text-center px-1">
                  <span className={`text-[10px] sm:text-xs font-medium leading-tight ${
                    isComplete || isActive ? 'text-rdc-anthracite' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Circles + connecting line */}
          <div className="relative flex items-center">
            {/* Background line (gray) — from center of first circle to center of last */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-border"
              style={{ left: '12.5%', right: '12.5%' }}
            />
            {/* Active line (blue) — progresses with each step */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-rdc-blue transition-all duration-500"
              style={{ left: '12.5%', width: `${step * 25}%` }}
            />

            {/* Circles */}
            {STEP_LABELS.map((_, idx) => {
              const isComplete = idx < step;
              const isActive   = idx === step;
              return (
                <div key={idx} className="relative z-10 flex-1 flex justify-center">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                    isComplete
                      ? 'border-rdc-blue bg-rdc-blue text-white'
                      : isActive
                      ? 'border-rdc-blue bg-rdc-blue text-white shadow-[0_0_0_4px_rgba(0,61,165,0.15)]'
                      : 'border-border bg-white text-muted-foreground'
                  }`}>
                    {isComplete ? <CheckCircle size={13} /> : <span>{idx + 1}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Date summary bar ──────────────────────────────────────────── */}
      {step < 3 && (
        <div className="border-b border-border bg-rdc-anthracite/95">
          <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-rdc-yellow" />
                <span className="font-semibold text-white uppercase tracking-wider text-[10px]">ENTRÉE</span>
                <span>{fmtLong(start)}</span>
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-rdc-yellow" />
                <span className="font-semibold text-white uppercase tracking-wider text-[10px]">SORTIE</span>
                <span>{fmtLong(end)}</span>
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-rdc-yellow" />
                <span className="font-bold text-white">{durationLabel(hours)}</span>
              </span>
              {promo && (
                <span className="flex items-center gap-1 rounded bg-rdc-yellow/20 px-2 py-0.5 text-rdc-yellow">
                  <Tag size={10} /> {promo}
                </span>
              )}
            </div>
            <Link
              to={'/stationnement-transport/formulaire' as never}
              className="flex items-center gap-1 text-xs font-semibold text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Modifier les dates
            </Link>
          </div>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="container py-8">
        <div className={step < 3 ? 'lg:grid lg:grid-cols-[1fr_320px] lg:items-start gap-6' : ''}>

          {/* ── Left: step content ──────────────────────────────────── */}
          <div className="space-y-4">

            {/* ────────── STEP 1: Choose lot ─────────────────────────── */}
            {step === 1 && (
              <div>
                <h1 className="font-display text-2xl font-bold text-rdc-anthracite mb-1">
                  Choisissez votre stationnement
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Durée : <strong>{durationLabel(hours)}</strong> — {promo && <span className="text-rdc-green font-semibold">Code promo <span className="font-mono">{promo}</span> appliqué · </span>}Tarifs taxes inclus, paiement 100 % sécurisé.
                </p>

                <div className="space-y-4">
                  {lots.map((lot) => {
                    const price = calcPrice(lot, hours);
                    return (
                      <div key={lot.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                        {/* Header band */}
                        <div className="bg-rdc-blue px-6 py-4 flex items-center justify-between">
                          <div>
                            <p className="font-display text-3xl font-bold text-white">{lot.code}</p>
                            <p className="text-sm text-white/80 mt-0.5">{lot.name}</p>
                          </div>
                          {lot.available_spots != null && (
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                              lot.available_spots > 20 ? 'bg-white/20 text-white' :
                              lot.available_spots > 5  ? 'bg-rdc-yellow/90 text-rdc-anthracite' :
                                                          'bg-rdc-red text-white'
                            }`}>
                              {lot.available_spots} places dispo.
                            </span>
                          )}
                        </div>

                        <div className="p-6">
                          <div className="lg:flex lg:gap-6">
                            {/* Info column */}
                            <div className="flex-1">
                              {lot.description_fr && (
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                  {lot.description_fr}
                                </p>
                              )}

                              {/* Features grid */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {lot.covered && (
                                  <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                                    <Car size={11} className="text-rdc-blue" /> Couvert
                                  </span>
                                )}
                                {lot.shuttle_available && (
                                  <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                                    <Bus size={11} className="text-rdc-blue" /> Navette gratuite
                                  </span>
                                )}
                                {lot.ev_charging && (
                                  <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                                    <Zap size={11} /> Recharge électrique
                                  </span>
                                )}
                                {lot.pmr_spots > 0 && (
                                  <span className="flex items-center gap-1 rounded-full border border-rdc-blue/20 bg-rdc-blue/5 px-2.5 py-1 text-xs font-medium text-rdc-blue">
                                    <Accessibility size={11} /> {lot.pmr_spots} places PMR
                                  </span>
                                )}
                                {lot.security_level && (
                                  <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                                    <Shield size={11} className="text-rdc-green" /> {securityLabel(lot.security_level)}
                                  </span>
                                )}
                                {lot.distance_terminal && (
                                  <span className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                                    <MapPin size={11} className="text-rdc-blue" /> {lot.distance_terminal} du terminal
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price + CTA column */}
                            <div className="lg:w-52 lg:shrink-0 flex lg:flex-col items-center lg:items-end gap-4">
                              <div className="text-right">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Prix en ligne</p>
                                <p className="font-display text-3xl font-bold text-rdc-blue leading-none">
                                  ${price.online}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  <span className="line-through">${price.guichet} guichet</span>
                                  <span className="ml-1.5 text-rdc-green font-semibold">−15 %</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  pour {price.days} jour{price.days > 1 ? 's' : ''} · taxes incluses
                                </p>
                              </div>

                              <Button
                                onClick={() => handleSelectLot(lot)}
                                className="lg:w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white font-bold"
                              >
                                Réservez maintenant
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ────────── STEP 2: Billing + Payment ─────────────────── */}
            {step === 2 && selectedLot && (
              <form onSubmit={e => { void handlePayment(e); }} className="space-y-4">

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#555] hover:text-[#003DA5] transition-colors"
                >
                  <ArrowLeft size={14} /> Changer de parking
                </button>

                {/* Auth status */}
                {loggedIn === true && authEmail && (
                  <div className="flex items-center gap-2.5 border border-[#009A44]/20 bg-[#009A44]/5 px-4 py-3 text-sm">
                    <Lock size={14} className="text-[#009A44] shrink-0" />
                    <span className="text-[#555]">
                      Connecté · <span className="font-semibold text-[#1A1A1A]">{authEmail}</span> — données sécurisées
                    </span>
                  </div>
                )}
                {loggedIn === false && (
                  <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
                    <p className="font-semibold text-amber-800 mb-1">Connexion requise pour réserver</p>
                    <p className="text-amber-700 text-xs mb-3">Connectez-vous pour finaliser et retrouver votre QR code dans votre espace client.</p>
                    <div className="flex gap-2">
                      <Link to={'/login' as never} className="bg-[#003DA5] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#002580] transition-colors">
                        Se connecter
                      </Link>
                      <Link to={'/inscription' as never} className="border border-[#D8E0ED] px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] hover:border-[#003DA5] transition-colors">
                        Créer un compte
                      </Link>
                    </div>
                  </div>
                )}

                {/* ── Section 1: Coordonnées ─────────────────────────── */}
                <div className="border border-[#D8E0ED] bg-white">
                  <div className="flex items-center gap-3 border-b border-[#D8E0ED] px-6 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003DA5] text-xs font-bold text-white">1</span>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">Vos coordonnées</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <User size={11} className="shrink-0" /> Prénom <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          required value={billing.firstName}
                          onChange={e => setBilling(b => ({ ...b, firstName: e.target.value }))}
                          placeholder="Jean"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <User size={11} className="shrink-0" /> Nom <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          required value={billing.lastName}
                          onChange={e => setBilling(b => ({ ...b, lastName: e.target.value }))}
                          placeholder="Mukendi"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <Mail size={11} className="shrink-0" /> Courriel <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          type="email" required value={billing.email}
                          onChange={e => setBilling(b => ({ ...b, email: e.target.value }))}
                          placeholder="jean@exemple.com"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <Mail size={11} className="shrink-0" /> Confirmer le courriel <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          type="email" required value={billing.confirmEmail}
                          onChange={e => setBilling(b => ({ ...b, confirmEmail: e.target.value }))}
                          placeholder="jean@exemple.com"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <Phone size={11} className="shrink-0" /> Téléphone / WhatsApp <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          type="tel" required value={billing.phone}
                          onChange={e => setBilling(b => ({ ...b, phone: e.target.value }))}
                          placeholder="+243 81 XXX XXXX"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                        <p className="mt-1 text-xs text-[#888]">Votre QR code sera envoyé sur ce numéro</p>
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                          <Car size={11} className="shrink-0" /> Plaque d'immatriculation <span className="text-[#CE1126]">*</span>
                        </label>
                        <input
                          required value={billing.plate}
                          onChange={e => setBilling(b => ({ ...b, plate: e.target.value.toUpperCase() }))}
                          placeholder="KIN·XXX·AB"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors font-mono uppercase"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-[#555]">
                          Numéro de vol <span className="font-normal normal-case text-[#888]">(Optionnel)</span>
                        </label>
                        <input
                          value={billing.airline}
                          onChange={e => setBilling(b => ({ ...b, airline: e.target.value.toUpperCase() }))}
                          placeholder="SN491"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors font-mono"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-bold text-[#555]">
                          Destination <span className="font-normal normal-case text-[#888]">(Optionnel)</span>
                        </label>
                        <input
                          value={billing.destination}
                          onChange={e => setBilling(b => ({ ...b, destination: e.target.value }))}
                          placeholder="Bruxelles, Paris…"
                          className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section 2: Paiement Mobile Money ──────────────── */}
                <div className="border border-[#D8E0ED] bg-white">
                  <div className="flex items-center gap-3 border-b border-[#D8E0ED] px-6 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003DA5] text-xs font-bold text-white">2</span>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">Paiement Mobile Money</h2>
                  </div>
                  <div className="p-6">

                    {/* Operator picker */}
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#555]">Choisissez votre opérateur</p>
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {PAY_METHODS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPayMethod(m.id)}
                          className={`overflow-hidden border-2 text-left transition-all ${
                            payMethod === m.id ? 'border-[#003DA5]' : 'border-[#D8E0ED] hover:border-[#003DA5]/40'
                          }`}
                        >
                          <div className={`h-2 w-full ${m.color}`} />
                          <div className="p-3">
                            <span className={`mb-2.5 block h-7 w-7 rounded-full ${m.color}`} />
                            <p className="text-xs font-bold leading-snug text-[#1A1A1A]">{m.name}</p>
                            {payMethod === m.id && (
                              <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-[#003DA5]">
                                <CheckCircle size={10} /> Sélectionné
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Pay phone */}
                    <div className="mb-5">
                      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#555]">
                        <Phone size={11} className="shrink-0" /> Numéro {activePayMethod.name} <span className="text-[#CE1126]">*</span>
                      </label>
                      <input
                        type="tel" required value={payPhone}
                        onChange={e => setPayPhone(e.target.value)}
                        placeholder="+243 8X XXX XXXX"
                        className="w-full border border-[#C8D0DC] px-3 py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#003DA5] bg-white transition-colors"
                      />
                    </div>

                    {/* USSD terminal */}
                    <div className="mb-4 bg-[#0f1117] p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        </div>
                        <span className="font-mono text-[10px] text-[#888]">USSD — {activePayMethod.name}</span>
                      </div>
                      <p className="font-mono text-base font-bold tracking-wider text-[#4ade80]">{ussdCode}</p>
                      <p className="mt-1 text-[11px] text-[#999]">{activePayMethod.hint}</p>
                      <div className="mt-3 border-t border-[#333] pt-3">
                        <p className="text-[11px] text-[#aaa]">
                          Montant : <span className="font-mono font-bold text-white">${selectedPrice?.online} USD</span>
                          <span className="mx-2 text-[#444]">·</span>
                          Référence : <span className="font-mono font-bold text-white">code de réservation</span>
                        </p>
                      </div>
                    </div>

                    {/* Demo notice */}
                    <div className="border border-[#003DA5]/20 bg-[#003DA5]/5 px-3 py-2.5 text-xs text-[#003DA5]">
                      <span className="font-bold">Mode démonstration</span> — Le paiement est simulé. Votre QR code est généré immédiatement.
                    </div>
                  </div>
                </div>

                {/* ── Section 3: Conditions ──────────────────────────── */}
                <div className="border border-[#D8E0ED] bg-white">
                  <div className="flex items-center gap-3 border-b border-[#D8E0ED] px-6 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#003DA5] text-xs font-bold text-white">3</span>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-[#1A1A1A]">Conditions</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <label className="flex cursor-pointer items-start gap-3 group">
                      <input
                        type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[#003DA5]"
                      />
                      <span className="text-sm text-[#555] transition-colors group-hover:text-[#1A1A1A]">
                        J'ai lu et j'accepte les{' '}
                        <Link to={'/conditions-utilisation' as never} className="font-medium text-[#003DA5] hover:underline" target="_blank">
                          conditions d'utilisation
                        </Link>
                        {' '}et les{' '}
                        <Link to={'/conditions-utilisation' as never} className="font-medium text-[#003DA5] hover:underline" target="_blank">
                          conditions générales de stationnement
                        </Link>.
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 group">
                      <input
                        type="checkbox" checked={privacy} onChange={e => setPrivacy(e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-[#003DA5]"
                      />
                      <span className="text-sm text-[#555] transition-colors group-hover:text-[#1A1A1A]">
                        J'accepte la{' '}
                        <Link to={'/politique-confidentialite' as never} className="font-medium text-[#003DA5] hover:underline" target="_blank">
                          politique de confidentialité
                        </Link>
                        {' '}de la RVA / Aéroport de N'djili.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="border border-[#CE1126]/20 bg-[#CE1126]/5 px-4 py-3 text-sm text-[#CE1126]">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading || !terms || !privacy}
                  className="flex w-full items-center justify-center gap-2 bg-[#003DA5] py-4 text-sm font-bold text-white transition-colors hover:bg-[#002580] disabled:opacity-40"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Traitement en cours…</>
                  ) : (
                    <><Lock size={14} /> Réserver et payer maintenant</>
                  )}
                </button>
                <p className="text-center text-xs text-[#888]">
                  Paiement sécurisé · Place garantie · Annulation gratuite 24h avant
                </p>
              </form>
            )}

            {/* ────────── STEP 3: Confirmation ──────────────────────── */}
            {step === 3 && code && selectedLot && (
              <div className="mx-auto max-w-2xl">

                {/* Success banner */}
                <div className="bg-[#003DA5] px-8 py-8 text-center text-white">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                    <CheckCircle size={30} className="text-white" />
                  </div>
                  <h1 className="font-display text-2xl font-bold">Réservation confirmée</h1>
                  <p className="mt-1 text-sm text-white/70">
                    Votre billet de stationnement a été généré avec succès.
                  </p>
                </div>

                {/* Ticket card */}
                <div className="border border-[#D8E0ED] bg-white shadow-sm">

                  {/* Ticket header */}
                  <div className="flex items-center justify-between border-b border-[#D8E0ED] px-6 py-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Aéroport International de N'djili</p>
                      <p className="text-sm font-bold text-[#003DA5]">FIH — Régie des Voies Aériennes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Parking</p>
                      <p className="font-display text-3xl font-black text-[#1A1A1A]">{selectedLot.code}</p>
                    </div>
                  </div>

                  {/* Code badge */}
                  <div className="border-b border-[#D8E0ED] px-6 py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#888]">Code de réservation</p>
                    <div className="inline-flex items-center border border-[#D8E0ED] bg-[#F4F6FB] px-5 py-3">
                      <span className="font-mono text-2xl font-black tracking-widest text-[#003DA5]">{code}</span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-px bg-[#D8E0ED] border-b border-[#D8E0ED]">
                    <div className="col-span-2 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Parking</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{selectedLot.code} — {selectedLot.name}</p>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Entrée</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{fmtShort(start)}</p>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Sortie</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{fmtShort(end)}</p>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Durée</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{durationLabel(hours)}</p>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Véhicule</p>
                      <p className="font-mono text-sm font-bold text-[#1A1A1A]">{billing.plate.toUpperCase()}</p>
                    </div>
                    <div className="col-span-2 bg-white p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888] mb-0.5">Titulaire</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{billing.firstName} {billing.lastName}</p>
                    </div>
                  </div>

                  {/* Dashed divider */}
                  <div className="border-t-2 border-dashed border-[#D8E0ED] mx-6" />

                  {/* QR code */}
                  <div className="flex flex-col items-center px-6 py-8">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#888]">Présentez à la barrière d'entrée</p>
                    <img
                      src={qrUrl}
                      alt={`QR Code ${code}`}
                      className="h-44 w-44 mb-4"
                    />
                    <a
                      href={qrUrl}
                      download={`FIH-PARKING-${code}.png`}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#003DA5] hover:underline"
                    >
                      <Download size={13} /> Télécharger le QR code
                    </a>
                  </div>

                  {/* Ticket footer */}
                  <div className="flex items-center justify-between border-t border-[#D8E0ED] bg-[#F4F6FB] px-6 py-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Moyen de paiement</p>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{PAY_METHODS.find(m => m.id === payMethod)?.name ?? payMethod}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Total payé</p>
                      <p className="font-display text-2xl font-black text-[#003DA5]">
                        ${selectedPrice?.online} <span className="text-sm font-semibold text-[#888]">USD</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info notes */}
                <div className="mt-4 border border-[#D8E0ED] bg-[#F4F6FB] px-5 py-4 space-y-2 text-xs text-[#555]">
                  <p className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-[#003DA5]">→</span>
                    Présentez ce QR code (imprimé ou sur écran) à la barrière d'entrée du parking {selectedLot.code}.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-[#003DA5]">→</span>
                    Le parking {selectedLot.code} est surveillé 24h/24 par les agents de sécurité RVA.
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-[#003DA5]">→</span>
                    En cas de dépassement d'horaire, des frais supplémentaires seront facturés à la sortie.
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    to={'/compte/reservations' as never}
                    className="flex flex-1 items-center justify-center gap-2 bg-[#003DA5] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#002580]"
                  >
                    Voir mes réservations
                  </Link>
                  <Link
                    to={'/stationnement-transport/formulaire' as never}
                    className="flex flex-1 items-center justify-center gap-2 border border-[#D8E0ED] px-5 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-colors hover:border-[#003DA5] hover:text-[#003DA5]"
                  >
                    Nouvelle réservation
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: sticky cart sidebar ──────────────────────────── */}
          {step < 3 && (
            <div className="mt-6 lg:mt-0 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                <div className="bg-rdc-anthracite px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/60">Votre panier</p>
                </div>
                <div className="p-5 space-y-3 text-sm">
                  {selectedLot ? (
                    <>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rdc-blue">
                          <span className="text-xs font-bold text-white">{selectedLot.code}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-rdc-anthracite leading-tight">{selectedLot.name}</p>
                          {selectedLot.shuttle_available && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Bus size={10} /> Navette incluse
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="border-t border-border pt-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Calendar size={10} /> Entrée</span>
                          <span className="font-medium">{fmtShort(start)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Calendar size={10} /> Sortie</span>
                          <span className="font-medium">{fmtShort(end)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Clock size={10} /> Durée</span>
                          <span className="font-medium">{durationLabel(hours)}</span>
                        </div>
                      </div>
                      {selectedPrice && (
                        <div className="border-t border-border pt-3">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-muted-foreground">Prix en ligne</p>
                              <p className="text-xs text-muted-foreground line-through">${selectedPrice.guichet} guichet</p>
                            </div>
                            <p className="font-display text-2xl font-bold text-rdc-blue">${selectedPrice.online}</p>
                          </div>
                          <p className="text-xs text-rdc-green font-semibold mt-1">
                            Vous économisez ${Math.round((selectedPrice.guichet - selectedPrice.online) * 100) / 100} USD
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-4 text-center">
                      <Car size={24} className="mx-auto mb-2 text-muted-foreground/40" />
                      <p className="text-xs text-muted-foreground">Choisissez un parking pour voir le tarif</p>
                    </div>
                  )}

                  {/* Dates always shown even without lot */}
                  {!selectedLot && (
                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Entrée</span>
                        <span className="font-medium">{fmtShort(start)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Sortie</span>
                        <span className="font-medium">{fmtShort(end)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Durée</span>
                        <span className="font-medium">{durationLabel(hours)}</span>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-border pt-3 space-y-1.5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle size={11} className="text-rdc-green shrink-0" /> Réservation 100 % sécurisée
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle size={11} className="text-rdc-green shrink-0" /> Place garantie
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle size={11} className="text-rdc-green shrink-0" /> Annulation gratuite 24h avant
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle size={11} className="text-rdc-green shrink-0" /> Taxes incluses — aucune surprise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
