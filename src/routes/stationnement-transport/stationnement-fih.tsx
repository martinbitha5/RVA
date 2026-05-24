import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Car, Zap, Accessibility, CreditCard, ArrowRight,
  MapPin, Calendar, Clock, CheckCircle, ShieldCheck, Tag,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { useParkingAvailability } from '@/lib/queries';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/stationnement-transport/stationnement-fih')({
  component: StationnementFih,
  head: () => ({ meta: [
    { title: "Stationnement FIH — Aéroport N'djili" },
    { name: 'description', content: 'Réservez votre place de stationnement officiel RVA à FIH. Tarifs USD, Mobile Money accepté. Moins cher en ligne.' },
  ]}),
});

const MOBILE_MONEY = [
  { name: 'Airtel Money',   dot: 'bg-red-600',    desc: 'Paiement instantané' },
  { name: 'M-Pesa Vodacom', dot: 'bg-green-600',  desc: 'Paiement instantané' },
  { name: 'Orange Money',   dot: 'bg-orange-500', desc: 'Paiement instantané' },
];

const WHY_ONLINE = [
  { icon: Tag,          label: 'Moins cher en ligne',     desc: 'Jusqu\'à 15% de rabais vs tarif guichet' },
  { icon: CheckCircle,  label: 'Prix taxes incluses',      desc: 'Aucune surprise au moment de payer' },
  { icon: Clock,        label: 'Processus simple et rapide', desc: 'Réservation en moins de 3 minutes' },
  { icon: ShieldCheck,  label: 'Place garantie',            desc: 'Votre place est sécurisée à l\'avance' },
];

// Generate 30-minute time slot options
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function tomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function StationnementFih() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: lots = [] } = useParkingAvailability();

  const [startDate, setStartDate] = useState(todayStr());
  const [startTime, setStartTime] = useState('08:00');
  const [endDate, setEndDate]     = useState(tomorrowStr());
  const [endTime, setEndTime]     = useState('08:00');
  const [promoCode, setPromoCode] = useState('');
  const [formError, setFormError] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const start = new Date(`${startDate}T${startTime}`);
    const end   = new Date(`${endDate}T${endTime}`);

    if (end <= start) {
      setFormError('La date de sortie doit être après la date d\'entrée.');
      return;
    }
    const diffH = (end.getTime() - start.getTime()) / 3_600_000;
    if (diffH < 4) {
      setFormError('La réservation minimum est de 4 heures.');
      return;
    }
    setFormError('');
    void navigate({
      to: '/stationnement-transport/reservation' as never,
      search: {
        start: start.toISOString(),
        end: end.toISOString(),
        promo: promoCode || undefined,
      } as never,
    });
  }

  return (
    <main id="main-content">
      <PageHero
        eyebrow={t('nav.parkingTransport')}
        title={t('parking.parkingFih')}
        subtitle="Réservez et payez en ligne pour une place garantie au meilleur prix."
        image="/images/fih-bus-cobus.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: t('nav.parkingTransport'), href: '/stationnement-transport' },
          { label: t('parking.parkingFih') },
        ]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/stationnement-transport/offres' as never} className="btn-outline-white">
              <CreditCard size={15} /> {t('parking.offers')}
            </Link>
            <Link to={'/stationnement-transport/depose-recuperation' as never} className="btn-outline-white">
              <MapPin size={15} /> {t('parking.dropOff')}
            </Link>
          </div>
        }
      />

      {/* ── Booking form card ───────────────────────────────────────── */}
      <div className="bg-muted/40 border-b border-border">
        <div className="container py-8">
          <div className="mx-auto max-w-3xl">
            {/* STATIONNEMENT tab (like YUL) */}
            <div className="mb-0">
              <span className="inline-block rounded-t-lg bg-rdc-blue px-5 py-2 text-xs font-bold uppercase tracking-wider text-white">
                Stationnement
              </span>
            </div>

            <form
              onSubmit={handleSearch}
              className="rounded-b-2xl rounded-tr-2xl border border-border bg-white p-6 shadow-md"
            >
              {/* Alert: 4h minimum */}
              {formError ? (
                <div className="mb-4 rounded-lg border border-rdc-red/30 bg-rdc-red/5 px-4 py-2.5 text-sm text-rdc-red">
                  {formError}
                </div>
              ) : (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
                  1 — Vous devez réserver pour un séjour minimum de 4 heures
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Start date */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <Calendar size={12} /> Date d'entrée
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    min={todayStr()}
                    onChange={e => setStartDate(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  />
                </div>

                {/* Start time */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <Clock size={12} /> Heure d'entrée
                  </label>
                  <select
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* End date */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <Calendar size={12} /> Date de sortie
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={e => setEndDate(e.target.value)}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  />
                </div>

                {/* End time */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <Clock size={12} /> Heure de sortie
                  </label>
                  <select
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  >
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Promo code */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Code promotionnel <span className="normal-case font-normal">(Optionnel)</span>
                  </label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Code promotionnel"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:border-rdc-blue focus:outline-none focus:ring-1 focus:ring-rdc-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-rdc-blue py-3 text-sm font-bold text-white transition-colors hover:bg-rdc-blue/85 active:scale-[0.99]"
              >
                Obtenir une soumission
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Why book online ─────────────────────────────────────────── */}
      <section className="container py-12">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-rdc-anthracite">
          Pourquoi réserver en ligne ?
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {WHY_ONLINE.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-5 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rdc-blue/10">
                <Icon size={20} className="text-rdc-blue" />
              </div>
              <p className="text-sm font-semibold text-rdc-anthracite leading-tight">{label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Parking lots overview ────────────────────────────────────── */}
      {lots.length > 0 && (
        <section className="bg-muted/30 border-t border-border">
          <div className="container py-12">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="eyebrow text-rdc-blue mb-2">Nos parkings officiels</p>
                <h2 className="font-display text-2xl font-bold text-rdc-anthracite">
                  Des stationnements pour tous les besoins
                </h2>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lots.map((lot) => (
                <div key={lot.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  {/* Color band */}
                  <div className="bg-rdc-blue px-5 py-5">
                    <p className="font-display text-2xl font-bold text-white">{lot.code}</p>
                    <p className="text-sm text-white/80 mt-0.5">{lot.name}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    {lot.description && (
                      <p className="text-sm text-muted-foreground">{lot.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1"><Car size={12} /> Voitures</span>
                      {lot.ev_charging && <span className="flex items-center gap-1 text-amber-600"><Zap size={12} /> Électrique</span>}
                      {(lot.pmr_spots ?? 0) > 0 && <span className="flex items-center gap-1 text-rdc-blue"><Accessibility size={12} /> PMR</span>}
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3 space-y-1 text-sm">
                      {lot.daily_rate_usd != null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">À partir de</span>
                          <span className="font-bold text-rdc-blue">${lot.daily_rate_usd} USD/jour</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Mobile Money ─────────────────────────────────────────────── */}
      <section className="container py-12">
        <p className="eyebrow text-rdc-blue mb-2">Moyens de paiement acceptés</p>
        <h2 className="font-display text-2xl font-bold text-rdc-anthracite mb-6">
          Paiement Mobile Money
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {MOBILE_MONEY.map((m) => (
            <div key={m.name} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <span className={`flex h-10 w-10 shrink-0 rounded-full ${m.dot}`} />
              <div>
                <p className="font-semibold text-rdc-anthracite">{m.name}</p>
                <p className="text-xs text-rdc-green">✓ {m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Info ──────────────────────────────────────────────────────── */}
      <div className="container pb-12">
        <div className="rounded-2xl border border-border bg-muted/40 p-6">
          <p className="mb-3 font-semibold text-rdc-anthracite">Informations pratiques</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>
              Un code QR vous sera remis à la confirmation. Présentez-le à la barrière d'entrée.
            </li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>
              Les parkings P1 et P2 sont surveillés 24h/24 par les agents de sécurité RVA.
            </li>
            <li className="flex items-start gap-2"><span className="mt-0.5 text-rdc-blue">→</span>
              Places PMR réservées aux personnes à mobilité réduite — accès facilité aux terminaux.
            </li>
          </ul>
          <Link to={'/stationnement-transport/offres' as never}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
            Voir tous les tarifs <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </main>
  );
}
