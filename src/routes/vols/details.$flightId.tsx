import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ArrowLeft, RefreshCw, Bell, CheckCircle,
  AlertTriangle, MapPin, Luggage, ShieldCheck, Globe,
  DoorOpen, PlaneTakeoff, PlaneLanding, Banknote, Car,
} from 'lucide-react';
import { FlightStatusBadge } from '@/components/flights/FlightStatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { useFlightById } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { FlightStatus } from '@/types/database';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/vols/details/$flightId')({
  component: FlightDetailPage,
  head: () => ({ meta: [{ title: "Détails vol — FIH · Aéroport de N'djili" }] }),
});

/* ─── Airline badge colors ──────────────────────────────────────────── */
const AIRLINE_BG: Record<string, string> = {
  '4H':'#CE1126',  // Air Congo — rouge RDC
  ET: '#009A44', SN: '#003DA5', AF: '#002F6C', KQ: '#B22222',
  QR: '#5C0632', TK: '#E30A17', MS: '#003580', AT: '#006400',
  WB: '#00529B', '8T': '#00B0CA', BC: '#003DA5', EK: '#C60C30',
};

/* ─── City name lookup ──────────────────────────────────────────────── */
const CITIES: Record<string, string> = {
  ADD: 'Addis-Abeba',  BZV: 'Brazzaville',  LBV: 'Libreville',
  DLA: 'Douala',       LOS: 'Lagos',         ABJ: 'Abidjan',
  ACC: 'Accra',        DSS: 'Dakar',         NBO: 'Nairobi',
  JNB: 'Johannesburg', CPT: 'Le Cap',        LUN: 'Lusaka',
  HRE: 'Harare',       DAR: 'Dar es Salaam', EBB: 'Entebbe',
  KGL: 'Kigali',       MRU: 'Île Maurice',
  DXB: 'Dubaï',        DOH: 'Doha',          IST: 'Istanbul',
  BRU: 'Bruxelles',    CDG: 'Paris',          AMS: 'Amsterdam',
  LHR: 'Londres',      CAI: 'Le Caire',       CMN: 'Casablanca',
  FBM: 'Lubumbashi',   GOM: 'Goma',           BKY: 'Bukavu',
  MJM: 'Mbuji-Mayi',  FKI: 'Kisangani',      KGA: 'Kananga',
  FIH: "Kinshasa N'djili",
};

function cityLabel(iata: string | null | undefined): string {
  if (!iata) return '—';
  const city = CITIES[iata];
  return city ? `${city} (${iata})` : iata;
}

function fmt(iso: string | null | undefined, pattern = 'HH:mm'): string {
  if (!iso) return '—';
  return format(new Date(iso), pattern, { locale: fr });
}

/* ─── Itinerary step type ───────────────────────────────────────────── */
interface Step {
  icon: React.ElementType;
  title: string;
  desc: string;
  info?: string;
  time?: string;
  done?: boolean;
}

/* ─── Departure steps (adapted for FIH / Congo) ────────────────────── */
function buildDepartureSteps(scheduledTime: string | null, gate: string | null, checkinCounter: string | null): Step[] {
  const schedMs = scheduledTime ? new Date(scheduledTime).getTime() : null;
  const now = Date.now();

  const t2h  = schedMs ? fmt(new Date(schedMs - 2 * 3600_000).toISOString()) : null;
  const t45m = schedMs ? fmt(new Date(schedMs - 45 * 60_000).toISOString()) : null;
  const sched = scheduledTime ? fmt(scheduledTime) : null;

  const steps: Step[] = [
    {
      icon: PlaneTakeoff,
      title: 'Avant le départ',
      desc: "Préparez votre voyage : vérifiez la validité de votre passeport, votre carnet de vaccination (fièvre jaune obligatoire pour certaines destinations) et provisionnez-vous en USD.",
      done: true,
    },
    {
      icon: Luggage,
      title: 'Enregistrement & dépôt des bagages',
      desc: `Comptoir ${checkinCounter ?? 'RVA — Hall des départs'}. Arrivez au moins 2 h avant (3 h pour les vols intercontinentaux). Limite bagage cabine : 7 kg.`,
      time: t2h ? `À partir de ${t2h}` : undefined,
      done: schedMs ? now > schedMs - 2.5 * 3600_000 : false,
    },
    {
      icon: ShieldCheck,
      title: 'Contrôle de sécurité — ANR',
      desc: "Agence Nationale de Renseignements. Retirez vos appareils électroniques et liquides de votre bagage cabine. Port de ceinture ou de ceinture magnétique à éviter.",
      done: schedMs ? now > schedMs - 1.75 * 3600_000 : false,
    },
    {
      icon: Globe,
      title: 'Immigration — Direction Générale de Migration (DGM)',
      desc: "Présentez votre passeport valide, votre visa pour la destination et votre carnet de vaccination jaune si requis. Contrôle systématique des listes de surveillance.",
      done: schedMs ? now > schedMs - 1.5 * 3600_000 : false,
    },
    {
      icon: MapPin,
      title: 'Zone internationale côté piste',
      desc: "Boutiques duty-free, restaurants congolais et internationaux, bureaux de change USD/CDF/EUR. Wi-Fi gratuit disponible (réseau : FIH-Free-WiFi, 1 h offerte).",
      done: false,
    },
    {
      icon: DoorOpen,
      title: `Porte d'embarquement${gate ? ` ${gate}` : ''}`,
      desc: `Présentez-vous à votre porte au moins 45 min avant le départ. L'embarquement peut être avancé sans préavis.`,
      time: t45m ? `Rendez-vous à ${t45m}` : undefined,
      done: false,
    },
    {
      icon: PlaneTakeoff,
      title: 'Départ prévu',
      desc: "Bon voyage depuis Kinshasa N'djili (FIH) — Porte vers le Congo et l'Afrique.",
      time: sched ?? undefined,
      done: schedMs ? now > schedMs : false,
    },
  ];
  return steps;
}

/* ─── Arrival steps (adapted for FIH / Congo) ──────────────────────── */
function buildArrivalSteps(actualTime: string | null, estimatedTime: string | null, baggage: string | null): Step[] {
  const landingTime = actualTime ?? estimatedTime;
  const now = Date.now();
  const landMs = landingTime ? new Date(landingTime).getTime() : null;

  const steps: Step[] = [
    {
      icon: PlaneLanding,
      title: "Atterrissage à FIH — Kinshasa N'djili",
      desc: "Aéroport International de N'djili. Restez assis jusqu'à l'arrêt complet de l'appareil. Réglez votre montre sur l'heure locale (UTC+2).",
      time: landingTime ? fmt(landingTime) : undefined,
      done: landMs ? now > landMs : false,
    },
    {
      icon: Globe,
      title: 'Immigration — Direction Générale de Migration (DGM)',
      desc: "Présentez votre passeport, votre visa RDC (ou e-visa) et votre carnet de vaccination international. La fièvre jaune est OBLIGATOIRE. File dédiée pour ressortissants CEDEAO.",
      info: "Délai moyen : 20–40 min",
      done: landMs ? now > landMs + 20 * 60_000 : false,
    },
    {
      icon: Luggage,
      title: 'Récupération des bagages',
      desc: `Carrousel ${baggage ?? 'annoncé à l\'écran'}. En cas de bagage non livré, signalez-le immédiatement au comptoir RVA Bagages (hall arrivées, côté droit).`,
      done: landMs ? now > landMs + 50 * 60_000 : false,
    },
    {
      icon: ShieldCheck,
      title: 'Douanes — DGDA (Direction Générale des Douanes et Accises)',
      desc: "Remplissez votre fiche de déclaration douanière. Tout montant en espèces supérieur à 10 000 USD doit être déclaré. Présentation obligatoire des bagages à la machine de contrôle.",
      done: false,
    },
    {
      icon: AlertTriangle,
      title: 'Sortie — Hall des arrivées',
      desc: "Utilisez exclusivement les taxis agréés RVA (guérite jaune en sortie). Évitez les chauffeurs non identifiés à l'intérieur du terminal. Service officiel : redevance affichée.",
      info: "Taxis agréés RVA · Bus Transco (ligne FIH–Gare centrale) · Location voitures (hall arrivées)",
      done: false,
    },
    {
      icon: Banknote,
      title: 'Change de devises & services',
      desc: "Banques agréées dans le hall arrivées : Rawbank, TMB, Equity BCDC. Distributeurs USD disponibles 24h/24. Taux affiché en temps réel. Évitez les changeurs informels.",
      done: false,
    },
  ];
  return steps;
}

/* ─── Main page component ───────────────────────────────────────────── */
function FlightDetailPage() {
  const { t } = useTranslation();
  const { flightId } = Route.useParams();
  const { data: flight, isLoading, dataUpdatedAt, refetch, isFetching, isError } = useFlightById(flightId);

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <main id="main-content">
        <div className="bg-[#1C2F4A] py-12">
          <div className="container">
            <Skeleton className="mb-3 h-4 w-48 bg-white/10" />
            <Skeleton className="mb-2 h-12 w-80 bg-white/10" />
            <Skeleton className="h-4 w-64 bg-white/10" />
          </div>
        </div>
        <div className="container py-10">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="mt-8 h-80 w-full" />
        </div>
      </main>
    );
  }

  /* ─── Not found / error ─── */
  if (isError || !flight) {
    return (
      <main id="main-content">
        <div className="container py-20 text-center">
          <AlertTriangle size={40} className="mx-auto mb-4 text-rdc-red" />
          <h1 className="font-display text-2xl font-bold text-rdc-anthracite">{t('common.noResults')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('common.error')}
          </p>
          <Link
            to="/vols/departs"
            search={{ q: '' }}
            className="mt-6 inline-flex items-center gap-2 bg-rdc-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-rdc-blue/85"
          >
            <ArrowLeft size={14} /> {t('common.back')}
          </Link>
        </div>
      </main>
    );
  }

  const isDeparture = flight.type === 'departure';
  const iata = flight.airlines?.iata_code ?? '';
  const bgColor = AIRLINE_BG[iata] ?? '#1A1A1A';
  const origin  = cityLabel(flight.origin_iata);
  const dest    = cityLabel(flight.destination_iata);
  const route   = isDeparture ? `Kinshasa N'djili (FIH) vers ${dest}` : `${origin} vers Kinshasa N'djili (FIH)`;

  const steps = isDeparture
    ? buildDepartureSteps(flight.scheduled_time, flight.gate, flight.airlines?.checkin_counter ?? null)
    : buildArrivalSteps(flight.actual_time, flight.estimated_time, flight.baggage_claim);

  const schedDate = flight.scheduled_time
    ? format(new Date(flight.scheduled_time), 'd MMMM yyyy', { locale: fr })
    : '—';
  const schedTime = fmt(flight.scheduled_time);
  const actualTime = flight.actual_time ?? flight.estimated_time;
  const realTime   = fmt(actualTime);
  const isLate     = !!(actualTime && flight.scheduled_time && new Date(actualTime) > new Date(flight.scheduled_time));

  return (
    <main id="main-content">

      {/* ─── ADMTL-style header ──────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#2C3E50] py-10 md:py-14">
        {/* Diagonal accent shape */}
        <div
          className="absolute right-0 top-0 h-full w-1/3 bg-white/5"
          style={{ clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        />
        <div className="container relative z-10">
          {/* Back link */}
          <Link
            to={isDeparture ? '/vols/departs' : '/vols/arrivees'}
            search={{ q: '' }}
            className="mb-6 flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {t('common.back')} — {isDeparture ? t('flights.departures') : t('flights.arrivals')}
          </Link>

          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
            {flight.airlines?.name} {flight.flight_number}
          </h1>
          <p className="mt-2 text-white/60">{route}</p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* ─── Left: flight card + itinerary ─────────────────── */}
          <div className="space-y-8">

            {/* Flight card */}
            <div className="border border-border bg-white">
              {/* Card header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5">
                <div className="flex items-center gap-3">
                  {/* Airline badge */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: bgColor }}
                  >
                    {iata || '—'}
                  </div>
                  <div>
                    <p className="font-bold text-rdc-anthracite">
                      {flight.airlines?.name} {flight.flight_number}
                    </p>
                    {updatedAt && (
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        Mis à jour à {updatedAt}
                        <button
                          onClick={() => void refetch()}
                          disabled={isFetching}
                          aria-label="Actualiser"
                          className="text-muted-foreground hover:text-foreground disabled:opacity-40"
                        >
                          <RefreshCw size={11} className={isFetching ? 'animate-spin' : ''} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <Link
                  to="/vols/alertes-sms"
                  className="flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80"
                >
                  <Bell size={13} /> {t('flights.smsAlerts')}
                </Link>
              </div>

              {/* Card body — flight fields */}
              <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
                <div className="bg-white px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('flights.origin')}</p>
                  <p className="text-sm font-semibold text-rdc-anthracite">{origin}</p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('flights.destination')}</p>
                  <p className="text-sm font-semibold text-rdc-anthracite">{dest}</p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Statut</p>
                  <FlightStatusBadge status={flight.status as FlightStatus} />
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {isDeparture ? 'Date de départ' : "Date d'arrivée"}
                  </p>
                  <p className="text-sm font-semibold text-rdc-anthracite">{schedDate}</p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {isDeparture ? 'Heure de départ' : "Heure d'arrivée"}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-lg font-bold text-rdc-anthracite">
                      {realTime !== '—' ? realTime : schedTime}
                    </p>
                    {isLate && realTime !== schedTime && (
                      <p className="font-mono text-xs text-muted-foreground line-through">{schedTime}</p>
                    )}
                  </div>
                </div>
                {flight.gate && (
                  <div className="bg-white px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('flights.gate')}</p>
                    <p className="font-mono text-lg font-bold text-rdc-anthracite">{flight.gate}</p>
                  </div>
                )}
                {flight.terminal && (
                  <div className="bg-white px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('flights.terminal')}</p>
                    <p className="text-sm font-semibold text-rdc-anthracite">{flight.terminal}</p>
                  </div>
                )}
                {flight.aircraft_type && (
                  <div className="bg-white px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Appareil</p>
                    <p className="text-sm font-semibold text-rdc-anthracite">{flight.aircraft_type}</p>
                  </div>
                )}
                {flight.baggage_claim && (
                  <div className="bg-white px-5 py-4">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Carrousel bagages</p>
                    <p className="font-mono text-lg font-bold text-rdc-anthracite">{flight.baggage_claim}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ─── Itinerary ──────────────────────────────────────── */}
            <div>
              <h2 className="font-display mb-6 text-xl font-bold text-rdc-anthracite">
                Votre itinéraire à FIH
              </h2>
              <div className="relative">
                {steps.map((step, i) => {
                  const isLast = i === steps.length - 1;
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="flex gap-4">
                      {/* Timeline column */}
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                            step.done
                              ? 'border-rdc-blue bg-rdc-blue text-white'
                              : 'border-border bg-white text-muted-foreground',
                          )}
                        >
                          {step.done
                            ? <CheckCircle size={14} />
                            : <Icon size={14} />
                          }
                        </div>
                        {!isLast && (
                          <div className={cn('mt-1 w-px flex-1', step.done ? 'bg-rdc-blue/30' : 'bg-border')} style={{ minHeight: '2rem' }} />
                        )}
                      </div>

                      {/* Step content */}
                      <div className={cn('pb-8 flex-1', isLast && 'pb-0')}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className={cn('font-semibold', step.done ? 'text-rdc-anthracite' : 'text-rdc-anthracite')}>
                            {step.title}
                          </p>
                          {step.time && (
                            <span className="font-mono text-xs font-bold text-rdc-blue">{step.time}</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                        {step.info && (
                          <div className="mt-2 border-l-2 border-rdc-blue/30 bg-rdc-blue/5 px-3 py-2 text-xs text-muted-foreground">
                            {step.info}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── Right sidebar: info boxes ─────────────────────── */}
          <aside className="space-y-4">

            {/* Airline info */}
            <div className="border border-border bg-white p-5">
              <p className="mb-3 text-sm font-bold text-rdc-anthracite">Informations compagnie</p>
              {/* Logo with IATA fallback */}
              <div
                className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden border border-border bg-white"
              >
                {flight.airlines?.logo_url ? (
                  <img
                    src={flight.airlines.logo_url}
                    alt={flight.airlines.name ?? iata}
                    className="h-full w-full object-contain p-1"
                    onError={e => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      el.parentElement!.style.backgroundColor = bgColor;
                      el.parentElement!.style.border = 'none';
                      el.insertAdjacentHTML('afterend', `<span style="color:white;font-weight:700;font-size:1rem">${iata}</span>`);
                    }}
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center text-base font-bold text-white"
                    style={{ backgroundColor: bgColor }}
                  >
                    {iata}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-rdc-anthracite">{flight.airlines?.name ?? '—'}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Code IATA : {iata}</p>
              {flight.airlines?.website && (
                <a
                  href={flight.airlines.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-xs text-rdc-blue hover:underline"
                >
                  Site officiel de la compagnie
                </a>
              )}
              {flight.airlines?.checkin_counter && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Comptoir enregistrement : <strong>{flight.airlines.checkin_counter}</strong>
                </p>
              )}
            </div>

            {/* Congo-specific alert for arrivals */}
            {!isDeparture && (
              <div className="border border-amber-200 bg-amber-50 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-600" />
                  <p className="text-sm font-bold text-amber-800">Entrée en RDC</p>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-700">
                  <li>• Carnet de vaccination fièvre jaune <strong>obligatoire</strong></li>
                  <li>• Visa RDC requis pour la plupart des nationalités (e-visa disponible)</li>
                  <li>• Déclaration DGDA obligatoire (&gt; 10 000 USD en espèces)</li>
                  <li>• Change officiel uniquement (Rawbank, TMB, Equity BCDC)</li>
                </ul>
              </div>
            )}

            {/* Departure checklist */}
            {isDeparture && (
              <div className="border border-rdc-blue/20 bg-rdc-blue/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-rdc-blue" />
                  <p className="text-sm font-bold text-rdc-blue">Documents requis</p>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-rdc-green flex-shrink-0" />
                    Passeport valide ≥ 6 mois
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-rdc-green flex-shrink-0" />
                    Visa pays de destination (si requis)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-rdc-green flex-shrink-0" />
                    Carnet jaune (fièvre jaune)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-rdc-green flex-shrink-0" />
                    Billet imprimé ou e-ticket
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-rdc-green flex-shrink-0" />
                    Taxe d'aéroport payée (USD)
                  </li>
                </ul>
              </div>
            )}

            {/* Transport from/to airport */}
            <div className="border border-border bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <Car size={14} className="text-rdc-blue" />
                <p className="text-sm font-bold text-rdc-anthracite">Transport</p>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <strong className="text-rdc-anthracite">Taxis agréés RVA</strong><br />
                  Guérite jaune à la sortie du terminal. Tarif affiché.
                </li>
                <li>
                  <strong className="text-rdc-anthracite">Bus Transco</strong><br />
                  Ligne FIH — Gare centrale de Kinshasa.
                </li>
                <li>
                  <strong className="text-rdc-anthracite">Location de voitures</strong><br />
                  Hall des arrivées — Comptoirs agréés RVA.
                </li>
              </ul>
              <Link
                to={'/stationnement-transport/taxis' as never}
                className="mt-3 text-xs font-semibold text-rdc-blue hover:underline"
              >
                {t('common.seeAll')}
              </Link>
            </div>

            {/* Contact FIH */}
            <div className="border border-border bg-muted/40 p-5">
              <p className="mb-2 text-sm font-bold text-rdc-anthracite">Besoin d'aide ?</p>
              <p className="text-xs text-muted-foreground">
                Centre d'information FIH — Hall principal<br />
                Ouvert 24h/24 · 7j/7<br />
                Tél&nbsp;: <a href="tel:+243000000000" className="text-rdc-blue">+243 XX XXX XXXX</a><br />
                Email&nbsp;: <a href="mailto:info@rva.cd" className="text-rdc-blue">info@rva.cd</a>
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
