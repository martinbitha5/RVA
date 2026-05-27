import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Wifi, Signal, CheckCircle, ChevronRight,
  Zap, Globe, ShieldCheck, MapPin, Info,
  MonitorSmartphone, PlaneTakeoff, PlaneLanding,
  Luggage, DoorOpen, Star, Building2,
} from 'lucide-react';

export const Route = createFileRoute('/guide/wifi-connectivite')({
  component: WifiConnectivitePage,
  head: () => ({
    meta: [
      { title: "Wi-Fi & Connectivité — Guide FIH Kinshasa" },
      { name: 'description', content: "RAM WiFi gratuit et illimité à l'Aéroport International de N'djili. Couverture complète, opérateurs mobiles Vodacom, Airtel, Orange, Africell." },
    ],
  }),
});

/* ─── Data ───────────────────────────────────────────────────────────────── */

const WIFI_ZONES = [
  {
    id: 'departs-int',
    label: 'Zone de départ — International',
    desc: 'Salles d\'embarquement, portes A et B, zone réglementée après sécurité',
    level: 'excellent',
    Icon: PlaneTakeoff,
  },
  {
    id: 'departs-dom',
    label: 'Zone de départ — Domestique',
    desc: 'Terminal domestique, salles d\'attente vols intérieurs (Lubumbashi, Goma, Bukavu…)',
    level: 'excellent',
    Icon: PlaneTakeoff,
  },
  {
    id: 'arrivees',
    label: 'Zone d\'arrivées internationales',
    desc: 'Couloir arrivées, contrôle passeports DGM, douanes DGDA',
    level: 'excellent',
    Icon: PlaneLanding,
  },
  {
    id: 'bagages',
    label: 'Retrait des bagages',
    desc: 'Tapis bagages internationaux et domestiques, livraison fret',
    level: 'good',
    Icon: Luggage,
  },
  {
    id: 'sortie-nationale',
    label: 'Sortie vols nationaux',
    desc: 'Zone de sortie et hall d\'accueil des vols domestiques',
    level: 'good',
    Icon: DoorOpen,
  },
  {
    id: 'salon-diplomatique',
    label: 'Salon diplomatique national',
    desc: 'Salon VIP officiel, espace presse et autorités de la RDC',
    level: 'excellent',
    Icon: Star,
  },
];

const LEVEL_STYLE = {
  excellent: {
    bar:   'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    label: 'Excellent',
    icon:  'text-emerald-500',
  },
  good: {
    bar:   'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    label: 'Bon',
    icon:  'text-amber-500',
  },
};

const WIFI_STEPS = [
  { n: '01', label: 'Activez le Wi-Fi',   desc: 'Sur votre appareil, activez le Wi-Fi et sélectionnez le réseau RAM WiFi disponible dans tout l\'aéroport.' },
  { n: '02', label: 'Portail captif',      desc: 'Votre navigateur s\'ouvre automatiquement sur le portail de connexion ARPTC RAM WiFi.' },
  { n: '03', label: 'Entrez votre email',  desc: 'Renseignez votre adresse email et acceptez les conditions d\'utilisation du service.' },
  { n: '04', label: 'Connexion établie',   desc: 'Vous êtes connecté — Wi-Fi gratuit, rapide et sécurisé, sans aucune limite de durée.' },
];

const OPERATORS = [
  {
    name: 'Vodacom Congo',
    short: 'VC',
    tech: '4G LTE / 3G',
    coverage: 'Excellente — les deux terminaux',
    roaming: true,
    note: 'Meilleure couverture de Kinshasa · Partenaire M-Pesa',
    color: '#D50000',
    simKiosk: true,
  },
  {
    name: 'Airtel Congo',
    short: 'AT',
    tech: '4G / 3G',
    coverage: 'Très bonne — terminal international',
    roaming: true,
    note: 'Partenaire Airtel Money · ~17M abonnés RDC',
    color: '#CC0000',
    simKiosk: true,
  },
  {
    name: 'Orange Congo',
    short: 'OR',
    tech: '4G / 3G',
    coverage: 'Bonne — les deux terminaux',
    roaming: true,
    note: 'Réseau Orange International · Roaming Europe',
    color: '#E05000',
    simKiosk: true,
  },
  {
    name: 'Africell Congo',
    short: 'AF',
    tech: '3G / 2G',
    coverage: 'Correcte — hall public et arrivées',
    roaming: false,
    note: 'Réseau local · ~3,6M abonnés RDC',
    color: '#1553A0',
    simKiosk: true,
  },
];

const TIPS = [
  {
    Icon: Zap,
    title: 'RAM WiFi — 100% Gratuit',
    text: 'Le RAM WiFi de l\'ARPTC est gratuit et sans limite de durée. Aucun paiement, aucune SIM congolaise requise.',
  },
  {
    Icon: Globe,
    title: 'Roaming international',
    text: 'Vodacom, Airtel et Orange proposent le roaming. Activez les données RDC auprès de votre opérateur avant le départ.',
  },
  {
    Icon: MonitorSmartphone,
    title: 'SIM locale sur place',
    text: 'Des kiosques des 4 opérateurs sont présents dans le hall arrivées pour acheter une SIM locale dès l\'atterrissage.',
  },
  {
    Icon: ShieldCheck,
    title: 'Sécurité réseau',
    text: 'Sur un Wi-Fi public, utilisez un VPN pour protéger vos données. Évitez les opérations bancaires sur réseau partagé.',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */
function WifiConnectivitePage() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0A1628]">
        <img
          src="/images/fih-checkin.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#0A1628]"
          style={{ clipPath: 'polygon(0 0, 58% 0, 72% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Wi-Fi & Connectivité</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5 bg-rdc-blue"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Guide de l'Aéroport</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            Wi-Fi &amp;<br />Connectivité
          </h1>
          <p className="mt-3 max-w-sm text-white/60">
            Restez connecté à FIH — RAM WiFi gratuit dans tout l'aéroport, opérateurs mobiles et kiosques SIM sur place.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { Icon: Wifi,      label: 'RAM WiFi — Gratuit & Illimité' },
              { Icon: Signal,    label: '4 opérateurs mobiles couverts'  },
              { Icon: Building2, label: 'ARPTC — Depuis mai 2022'        },
            ].map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Icon size={11} className="text-[#FFCE00]" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">

        {/* ── RAM WiFi featured card ──────────────────────────────────────── */}
        <div className="mb-14 overflow-hidden shadow-lg">
          <div
            className="relative px-6 py-6 md:px-8"
            style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2A4A 55%, #0A3A6B 100%)' }}
          >
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(circle, #FFCE00 1px, transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-[#FFCE00]">
                  <Wifi size={26} className="text-[#0A1628]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00]">ARPTC · Registre des Appareils Mobiles</span>
                  <h2 className="font-display text-2xl font-bold text-white">RAM WiFi</h2>
                  <p className="text-sm text-white/60">Wi-Fi gratuit, rapide, fluide et sécurisé</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                <span className="inline-flex items-center gap-1.5 border border-emerald-400/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-300">
                  <CheckCircle size={11} /> 100% GRATUIT
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/70">
                  Illimité · Sans expiration
                </span>
              </div>
            </div>
          </div>

          <div className="grid bg-white md:grid-cols-2">
            {/* Étapes */}
            <div className="border-b border-[#F0F0F0] p-6 md:border-b-0 md:border-r">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">Comment se connecter</p>
              <div className="space-y-0">
                {WIFI_STEPS.map((step, i) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[#003DA5] text-[10px] font-black text-white">
                        {step.n}
                      </div>
                      {i < WIFI_STEPS.length - 1 && <div className="w-px flex-1 bg-[#E0E0E0] my-1" />}
                    </div>
                    <div className="pb-5">
                      <p className="font-semibold text-rdc-anthracite text-sm">{step.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spécifications */}
            <div className="p-6">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#999]">Spécifications</p>
              <div className="space-y-3">
                {[
                  { label: 'Réseau',           value: 'RAM WiFi (ARPTC)',    highlight: true  },
                  { label: 'Coût',             value: '100% Gratuit',        highlight: true  },
                  { label: 'Durée',            value: 'Illimitée',           highlight: false },
                  { label: 'Authentification', value: 'Portail captif · Email', highlight: false },
                  { label: 'Débit estimé',     value: '5 – 25 Mbps',        highlight: false },
                  { label: 'Multi-appareils',  value: 'Oui',                highlight: false },
                  { label: 'Lancement FIH',    value: 'Mai 2022',           highlight: false },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="flex items-center justify-between border-b border-[#F5F5F5] pb-3">
                    <span className="text-xs text-[#777]">{label}</span>
                    <span className={`text-xs font-bold ${highlight ? 'text-rdc-blue' : 'text-[#1A1A1A]'}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2.5 border border-[#003DA5]/15 bg-[#003DA5]/5 p-3">
                <Info size={12} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                <p className="text-[11px] text-[#444] leading-relaxed">
                  Service public financé par l'ARPTC via les recettes du Registre des Appareils Mobiles (RAM), autorité de régulation des télécommunications en RDC.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Zones de couverture ─────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Couverture RAM WiFi</p>
          </div>
          <h2 className="font-display mb-2 text-2xl font-bold text-rdc-anthracite">Zones couvertes à FIH</h2>
          <p className="mb-8 max-w-xl text-sm text-muted-foreground">
            Couverture complète de l'Aéroport International de N'djili depuis mai 2022 — terminaux international et domestique.
          </p>

          <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3" style={{ background: '#E8E8E8' }}>
            {WIFI_ZONES.map((zone) => {
              const s = LEVEL_STYLE[zone.level as keyof typeof LEVEL_STYLE];
              return (
                <div key={zone.id} className="flex flex-col bg-white">
                  <div className={`h-1 w-full ${s.bar}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-start gap-3">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-[#F5F5F5]">
                        <zone.Icon size={15} className="text-rdc-blue" />
                      </div>
                      <p className="pt-1 text-sm font-bold text-rdc-anthracite leading-snug">{zone.label}</p>
                    </div>
                    <p className="mb-4 text-[11px] text-muted-foreground leading-relaxed">{zone.desc}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#F0F0F0] pt-3">
                      <div className="flex items-center gap-1.5">
                        <Wifi size={11} className={s.icon} />
                        <span className="text-[10px] font-semibold text-[#555]">RAM WiFi disponible</span>
                      </div>
                      <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${s.badge}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Opérateurs mobiles ──────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Réseau mobile</p>
          </div>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-rdc-anthracite">Opérateurs mobiles à FIH</h2>
            <span className="hidden text-xs text-muted-foreground sm:block">Kiosques SIM disponibles à l'arrivée</span>
          </div>

          <div className="grid gap-0.5 sm:grid-cols-2" style={{ background: '#E8E8E8' }}>
            {OPERATORS.map((op) => (
              <div key={op.name} className="flex flex-col bg-white">
                {/* Barre couleur */}
                <div className="h-1 w-full" style={{ backgroundColor: op.color }} />

                <div className="flex flex-1 flex-col p-5">
                  {/* Header opérateur */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center text-sm font-black text-white"
                      style={{ backgroundColor: op.color }}
                    >
                      {op.short}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-rdc-anthracite">{op.name}</p>
                      <p className="text-[11px] text-muted-foreground">{op.tech}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {op.roaming && (
                        <span className="whitespace-nowrap border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Roaming
                        </span>
                      )}
                      <span className="whitespace-nowrap border border-[#E0E0E0] bg-[#F8F8F8] px-2 py-0.5 text-[10px] text-[#666]">
                        Kiosque SIM
                      </span>
                    </div>
                  </div>

                  {/* Détails */}
                  <div className="space-y-2 border-t border-[#F0F0F0] pt-4">
                    <div className="flex items-start gap-2">
                      <Signal size={12} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                      <p className="text-xs text-[#444]">{op.coverage}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      <p className="text-xs text-muted-foreground">{op.note}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                      <p className="text-xs text-muted-foreground">Hall arrivées internationales · FIH</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conseils ────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Conseils connectivité</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Pour rester connecté</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIPS.map(({ Icon, title, text }) => (
              <div key={title} className="border border-[#E8E8E8] bg-white p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center bg-rdc-blue/10">
                  <Icon size={16} className="text-rdc-blue" />
                </div>
                <p className="mb-2 text-sm font-bold text-rdc-anthracite">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Note bas de page ─────────────────────────────────────────────── */}
        <div className="flex items-start gap-3 border border-[#003DA5]/20 bg-[#003DA5]/5 p-5 text-sm text-[#003DA5]/80">
          <Wifi size={15} className="mt-0.5 flex-shrink-0" />
          <p>
            Le RAM WiFi est un service public de l'État congolais opéré par l'ARPTC.
            Pour toute assistance technique sur site, renseignez-vous aux points d'information FIH ou auprès du personnel de l'aéroport.
          </p>
        </div>
      </div>
    </main>
  );
}
