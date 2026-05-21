import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  PlaneTakeoff, PlaneLanding, ShieldCheck, Globe,
  Luggage, Coffee, ShoppingBag, Banknote, Car,
  Wifi, Accessibility, Info, ChevronRight, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/vols/plans-aerogares')({
  component: PlansAerogares,
  head: () => ({
    meta: [
      { title: "Plans des aérogares — Aéroport N'djili · FIH" },
      { name: 'description', content: "Plans interactifs des terminaux International et Domestique de l'Aéroport International de N'djili (FIH)." },
    ],
  }),
});

/* ─── Types ─────────────────────────────────────────────────────────── */
type Terminal = 'international' | 'domestic';
type Floor    = 'departures' | 'arrivals';
type Category = 'gate' | 'security' | 'immigration' | 'customs' | 'lounge' | 'food' | 'shop' | 'bank' | 'transport' | 'services';

interface POI {
  id: string;
  label: string;
  sublabel?: string;
  category: Category;
  x: number;
  y: number;
  details: string;
  icon: React.ElementType;
}

/* ─── Category config ────────────────────────────────────────────────── */
const CATEGORIES: { id: Category; label: string; color: string; bg: string }[] = [
  { id: 'gate',        label: 'Portes',        color: '#003DA5', bg: '#DBEAFE' },
  { id: 'security',    label: 'Sécurité',      color: '#EA580C', bg: '#FEF3C7' },
  { id: 'immigration', label: 'Immigration',   color: '#7C3AED', bg: '#EDE9FE' },
  { id: 'customs',     label: 'Douanes',       color: '#0F766E', bg: '#CCFBF1' },
  { id: 'lounge',      label: 'Salons VIP',    color: '#B45309', bg: '#FEF9C3' },
  { id: 'food',        label: 'Restauration',  color: '#DC2626', bg: '#FEE2E2' },
  { id: 'shop',        label: 'Boutiques',     color: '#9333EA', bg: '#F3E8FF' },
  { id: 'bank',        label: 'Banques / ATM', color: '#15803D', bg: '#DCFCE7' },
  { id: 'transport',   label: 'Transport',     color: '#374151', bg: '#F3F4F6' },
  { id: 'services',    label: 'Services',      color: '#0369A1', bg: '#E0F2FE' },
];

const CAT = Object.fromEntries(CATEGORIES.map(c => [c.id, c])) as Record<Category, typeof CATEGORIES[0]>;

/* ─── POI data ───────────────────────────────────────────────────────── */
const POIS_INT_DEP: POI[] = [
  // Gates (airside top)
  { id:'A1', label:'Porte A1', category:'gate', x:115, y:80, icon:PlaneTakeoff,
    details:'Porte d\'embarquement A1. Vols régionaux Afrique centrale. Accès par couloir sécurisé depuis la zone internationale.' },
  { id:'A2', label:'Porte A2', category:'gate', x:215, y:80, icon:PlaneTakeoff,
    details:'Porte A2. Vols vers l\'Afrique de l\'Est et l\'Afrique Australe (Nairobi, Johannesburg).' },
  { id:'A3', label:'Porte A3', category:'gate', x:355, y:80, icon:PlaneTakeoff,
    details:'Porte A3. Vols intercontinentaux — Europe et Moyen-Orient (Bruxelles, Paris, Doha, Istanbul).' },
  { id:'A4', label:'Porte A4', category:'gate', x:495, y:80, icon:PlaneTakeoff,
    details:'Porte A4. Vols intercontinentaux — Europe et Moyen-Orient.' },
  { id:'A5', label:'Porte A5', category:'gate', x:635, y:80, icon:PlaneTakeoff,
    details:'Porte A5. Vols Afrique de l\'Ouest et Afrique du Nord (Casablanca, Le Caire, Lagos).' },
  { id:'A6', label:'Porte A6', category:'gate', x:745, y:80, icon:PlaneTakeoff,
    details:'Porte A6. Vols Air Congo, Congo Airways et charters.' },
  // Airside services
  { id:'vip', label:'Salon VIP', sublabel:'RVA Départ', category:'lounge', x:130, y:195,  icon:Coffee,
    details:'Salon VIP Départ RVA. Accès payant ou sur invitation. Boissons, snacks, Wi-Fi, prises électriques. Ouvert 2h avant chaque vol international.' },
  { id:'sn',  label:'SN Lounge', sublabel:'Brussels Airlines', category:'lounge', x:270, y:195, icon:Coffee,
    details:'Brussels Airlines Business & Gold Lounge. Accès réservé aux membres Miles & More Gold/Senator et passagers Business SN. Buffet chaud, bar, douches.' },
  { id:'caf', label:'Cafétéria RVA', category:'food', x:450, y:185, icon:Coffee,
    details:'Cafétéria exploitée par la RVA côté airside. Plats chauds congolais et internationaux, boissons froides et chaudes. Tarifs modérés en USD.' },
  { id:'dtf', label:'Duty Free', sublabel:'Zone sécurisée', category:'shop', x:660, y:185, icon:ShoppingBag,
    details:'Boutique Duty-Free. Parfums, cosmétiques, alcools, tabacs, produits locaux congolais (artisanat, café). Paiement USD, EUR, cartes internationales.' },
  { id:'dgm_dep', label:'DGM', sublabel:'Émigration', category:'immigration', x:380, y:235, icon:Globe,
    details:'Direction Générale de Migration — Contrôle Départs. Présentez passeport + carnet de vaccination jaune. File réservée aux diplomates et CEDEAO.' },
  // Security
  { id:'anr', label:'Contrôle de sécurité', sublabel:'ANR', category:'security', x:450, y:280, icon:ShieldCheck,
    details:'Agence Nationale de Renseignements. Portiques de détection, scanner bagages. Retirez appareils électroniques, liquides > 100 ml. File prioritaire: familles + PMR.' },
  // Landside
  { id:'cc',  label:'Comptoirs enregistrement', sublabel:'Counters 1–12', category:'services', x:450, y:360, icon:Luggage,
    details:'12 comptoirs d\'enregistrement. Comptoir 1-3: Ethiopian Airlines (ET). 4-5: Brussels Airlines (SN). 6-7: Air France (AF). 8-9: Turkish Airlines (TK). 10-12: autres compagnies + Air Congo. Ouvrent 3h avant le départ.' },
  { id:'rwb', label:'Rawbank', sublabel:'ATM + Change', category:'bank', x:155, y:430, icon:Banknote,
    details:'Rawbank — Distributeur automatique USD/EUR 24h/24. Bureau de change avec taux officiel affiché. Cartes Visa/Mastercard acceptées.' },
  { id:'biac', label:'Equity BCDC', sublabel:'ATM', category:'bank', x:295, y:430, icon:Banknote,
    details:'Equity BCDC (ex-BIAC) — Distributeur automatique USD. Taux de change compétitifs. Dépôts et retraits comptes locaux.' },
  { id:'tmb', label:'TMB', sublabel:'ATM', category:'bank', x:435, y:430, icon:Banknote,
    details:'Trust Merchant Bank — ATM USD. Transferts MoneyGram disponibles au guichet.' },
  { id:'info', label:'Information RVA', category:'services', x:630, y:400, icon:Info,
    details:'Bureau d\'information RVA. Assistants disponibles en français, anglais et lingala. Plans imprimés gratuits. Assistance PMR sur demande.' },
  { id:'wifi', label:'Wi-Fi gratuit', sublabel:'FIH-Free-WiFi', category:'services', x:760, y:430, icon:Wifi,
    details:'Réseau Wi-Fi gratuit FIH-Free-WiFi. 1h offerte par appareil. Extension disponible au comptoir RVA Information. Couverture hall des départs et zone airside.' },
  { id:'pmr_d', label:'Assistance PMR', category:'services', x:155, y:490, icon:Accessibility,
    details:'Point d\'assistance PMR (Personnes à Mobilité Réduite). Fauteuils roulants disponibles. Accompagnement jusqu\'à la porte d\'embarquement. Prévenez votre compagnie au moins 48h à l\'avance.' },
];

const POIS_INT_ARR: POI[] = [
  { id:'dgm_a', label:'DGM', sublabel:'Immigration Arrivées', category:'immigration', x:450, y:95, icon:Globe,
    details:'DGM Immigration — Arrivées. Passeport + carnet vaccin jaune OBLIGATOIRE. E-visa RDC accepté. Délai moyen : 20–40 min. File diplomates à gauche.' },
  { id:'b1',   label:'Carrousel B1', category:'services', x:270, y:205, icon:Luggage,
    details:'Carrousel à bagages B1 — vols régionaux et Afrique centrale. En cas de bagage non livré : Comptoir RVA Bagages en fond de hall (côté droit).' },
  { id:'b2',   label:'Carrousel B2', category:'services', x:620, y:205, icon:Luggage,
    details:'Carrousel à bagages B2 — vols intercontinentaux (Europe, Moyen-Orient). En cas de retard : bulletin PIR remis par la compagnie.' },
  { id:'dgda', label:'DGDA', sublabel:'Douanes', category:'customs', x:450, y:295, icon:ShieldCheck,
    details:'Direction Générale des Douanes et Accises. Remplissez la fiche de déclaration (distribuée en avion). Déclaration obligatoire > 10 000 USD en espèces. Scanner bagages obligatoire.' },
  { id:'rch',  label:'Rawbank Change', category:'bank', x:185, y:390, icon:Banknote,
    details:'Rawbank — Bureau de change et ATM. Taux officiel affiché. USD, EUR, CDF. Ouvert à chaque atterrissage international.' },
  { id:'tch',  label:'TMB Change', category:'bank', x:395, y:390, icon:Banknote,
    details:'Trust Merchant Bank — Change et retrait USD. Évitez les changeurs informels dans le hall.' },
  { id:'eqb',  label:'Equity BCDC', category:'bank', x:605, y:390, icon:Banknote,
    details:'Equity BCDC — ATM et change. Cartes Visa/Mastercard acceptées.' },
  { id:'tax',  label:'Taxis agréés RVA', category:'transport', x:155, y:475, icon:Car,
    details:'Taxis officiels agréés RVA — Guérite jaune à la sortie du terminal. Tarif affiché par zone. Refusez les chauffeurs non identifiés à l\'intérieur. Paiement USD ou CDF.' },
  { id:'tco',  label:'Bus Transco', category:'transport', x:390, y:475, icon:Car,
    details:'Transco — Ligne FIH → Gare centrale de Kinshasa. Départs réguliers. Tarif préférentiel vs taxi. Idéal pour voyageurs avec peu de bagages.' },
  { id:'lvc',  label:'Location voitures', category:'transport', x:640, y:475, icon:Car,
    details:'Location de voitures agréées RVA — Hall arrivées, côté droit. Hertz, Avis et opérateurs locaux. Réservation recommandée. Permis international requis.' },
  { id:'pmr_a', label:'Assistance PMR', category:'services', x:770, y:380, icon:Accessibility,
    details:'Assistance PMR arrivées. Accompagnement depuis l\'avion jusqu\'au hall. Prévenez la compagnie 48h avant.' },
];

const POIS_DOM_DEP: POI[] = [
  { id:'C1', label:'Porte C1', sublabel:'Lubumbashi', category:'gate', x:105, y:75, icon:PlaneTakeoff,
    details:'Porte C1 — Vols vers Lubumbashi (FBM). Congo Airways et Air Congo.' },
  { id:'C2', label:'Porte C2', sublabel:'Goma / Bukavu', category:'gate', x:255, y:75, icon:PlaneTakeoff,
    details:'Porte C2 — Vols vers Goma (GOM) et Bukavu (BKY). Congo Airways.' },
  { id:'C3', label:'Porte C3', sublabel:'Mbuji-Mayi', category:'gate', x:435, y:75, icon:PlaneTakeoff,
    details:'Porte C3 — Vols vers Mbuji-Mayi (MJM) et Kananga (KGA).' },
  { id:'C4', label:'Porte C4', sublabel:'Kisangani', category:'gate', x:615, y:75, icon:PlaneTakeoff,
    details:'Porte C4 — Vols vers Kisangani (FKI) et Mbandaka (MDK).' },
  { id:'C5', label:'Porte C5', sublabel:'Matadi / autres', category:'gate', x:775, y:75, icon:PlaneTakeoff,
    details:'Porte C5 — Vols vers Matadi (MAT) et destinations secondaires.' },
  { id:'sec_d', label:'Contrôle sécurité', category:'security', x:450, y:255, icon:ShieldCheck,
    details:'Contrôle sécurité terminal domestique. Portique de détection + scanner bagages.' },
  { id:'cc_d', label:'Comptoirs domestiques', sublabel:'Counters D1–D6', category:'services', x:450, y:360, icon:Luggage,
    details:'6 comptoirs d\'enregistrement. Congo Airways (D1-D2), Air Congo (D3-D4), charters et taxis-brousse aériens (D5-D6). Présenter pièce d\'identité nationale ou passeport.' },
  { id:'atm_d', label:'ATM Rawbank', category:'bank', x:180, y:440, icon:Banknote,
    details:'ATM Rawbank terminal domestique. USD uniquement. Fonctionne 24h/24.' },
  { id:'snk',  label:'Snack-Bar', category:'food', x:690, y:440, icon:Coffee,
    details:'Snack-Bar terminal domestique. Boissons froides, sandwichs, plats chauds locaux. Paiement USD ou CDF.' },
];

/* ─── SVG ZONES BACKGROUNDS ─────────────────────────────────────────── */
function ZonesIntDep() {
  return (
    <g>
      {/* Tarmac / Apron */}
      <rect x="0" y="0" width="900" height="40" fill="#94A3B8"/>
      <text x="450" y="26" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600" letterSpacing="3" fontFamily="Inter, sans-serif">TARMAC — APRON</text>

      {/* Gate fingers */}
      {[115,215,355,495,635,745].map(cx => (
        <rect key={cx} x={cx-32} y="0" width="64" height="115" rx="3" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1"/>
      ))}

      {/* Airside zone */}
      <rect x="30" y="40" width="840" height="220" fill="#EFF6FF"/>
      <text x="42" y="58" fontSize="9" fill="#3B82F6" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">ZONE SÉCURISÉE — AIRSIDE</text>

      {/* ANR security band */}
      <rect x="30" y="258" width="840" height="20" fill="#FEF3C7" stroke="#F97316" strokeWidth="1.5"/>
      <text x="450" y="272" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">CONTRÔLE DE SÉCURITÉ — ANR / DGM</text>

      {/* Landside / Departure hall */}
      <rect x="30" y="278" width="840" height="240" fill="#F0FDF4"/>
      <text x="42" y="296" fontSize="9" fill="#15803D" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">HALL DES DÉPARTS — ZONE PUBLIQUE</text>

      {/* Check-in counter band */}
      <rect x="60" y="315" width="780" height="65" rx="3" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1"/>
      <text x="450" y="351" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600" fontFamily="Inter, sans-serif">COMPTOIRS D'ENREGISTREMENT — CC 1 à 12</text>

      {/* Terminal outer wall */}
      <rect x="30" y="40" width="840" height="478" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="2.5"/>
    </g>
  );
}

function ZonesIntArr() {
  return (
    <g>
      {/* Tarmac */}
      <rect x="0" y="0" width="900" height="40" fill="#94A3B8"/>
      <text x="450" y="26" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600" letterSpacing="3" fontFamily="Inter, sans-serif">TARMAC — APRON</text>

      {/* Immigration zone */}
      <rect x="30" y="40" width="840" height="140" fill="#EDE9FE"/>
      <text x="42" y="58" fontSize="9" fill="#6D28D9" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">DGM — IMMIGRATION ARRIVÉES</text>

      {/* Baggage zone */}
      <rect x="30" y="160" width="840" height="100" fill="#F0FDF4"/>
      <text x="42" y="178" fontSize="9" fill="#15803D" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">RÉCUPÉRATION DES BAGAGES</text>
      {/* Carousels visual */}
      <ellipse cx="270" cy="210" rx="110" ry="28" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5"/>
      <ellipse cx="620" cy="210" rx="110" ry="28" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5"/>

      {/* Customs band */}
      <rect x="30" y="260" width="840" height="20" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="1.5"/>
      <text x="450" y="274" textAnchor="middle" fontSize="9" fill="#0F766E" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">DGDA — DOUANES / CUSTOMS</text>

      {/* Arrivals public hall */}
      <rect x="30" y="280" width="840" height="240" fill="#FFF7ED"/>
      <text x="42" y="298" fontSize="9" fill="#92400E" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">HALL DES ARRIVÉES — ZONE PUBLIQUE</text>

      {/* Currency row */}
      <rect x="60" y="360" width="780" height="50" rx="3" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1"/>
      <text x="450" y="389" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600" fontFamily="Inter, sans-serif">BANQUES & CHANGE — RAWBANK · TMB · EQUITY BCDC</text>

      {/* Transport row */}
      <rect x="60" y="450" width="780" height="50" rx="3" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1"/>
      <text x="450" y="479" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600" fontFamily="Inter, sans-serif">TRANSPORT — TAXIS RVA · BUS TRANSCO · LOCATION</text>

      <rect x="30" y="40" width="840" height="478" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="2.5"/>
    </g>
  );
}

function ZonesDomDep() {
  return (
    <g>
      <rect x="0" y="0" width="900" height="40" fill="#94A3B8"/>
      <text x="450" y="26" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600" letterSpacing="3" fontFamily="Inter, sans-serif">TARMAC — APRON</text>

      {[105,255,435,615,775].map(cx => (
        <rect key={cx} x={cx-35} y="0" width="70" height="110" rx="3" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="1"/>
      ))}

      <rect x="30" y="40" width="840" height="200" fill="#EFF6FF"/>
      <text x="42" y="58" fontSize="9" fill="#3B82F6" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">ZONE SÉCURISÉE — AIRSIDE DOMESTIQUE</text>

      <rect x="30" y="238" width="840" height="18" fill="#FEF3C7" stroke="#F97316" strokeWidth="1.5"/>
      <text x="450" y="251" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">CONTRÔLE DE SÉCURITÉ</text>

      <rect x="30" y="256" width="840" height="262" fill="#F0FDF4"/>
      <text x="42" y="274" fontSize="9" fill="#15803D" fontWeight="700" letterSpacing="2" fontFamily="Inter, sans-serif">HALL DES DÉPARTS DOMESTIQUES</text>

      <rect x="60" y="310" width="780" height="65" rx="3" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1"/>
      <text x="450" y="346" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600" fontFamily="Inter, sans-serif">COMPTOIRS DOMESTIQUES — D1 à D6</text>

      <rect x="30" y="40" width="840" height="478" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="2.5"/>
    </g>
  );
}

/* ─── POI Marker ──────────────────────────────────────────────────────── */
function PoiMarker({ poi, active, filtered, onClick }: {
  poi: POI;
  active: boolean;
  filtered: boolean;
  onClick: () => void;
}) {
  const cat = CAT[poi.category];
  if (!filtered) return null;

  return (
    <g
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      opacity={active ? 1 : 0.85}
    >
      {active && (
        <circle cx={poi.x} cy={poi.y} r="22" fill={cat.color} opacity="0.2"/>
      )}
      <circle
        cx={poi.x} cy={poi.y} r="14"
        fill={active ? cat.color : '#fff'}
        stroke={cat.color}
        strokeWidth="2.5"
      />
      {active && (
        <circle cx={poi.x} cy={poi.y} r="16" fill="none" stroke={cat.color} strokeWidth="1" opacity="0.5"/>
      )}
      <text
        x={poi.x} y={poi.y + 4}
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill={active ? '#fff' : cat.color}
        fontFamily="Inter, sans-serif"
      >
        {poi.id.length <= 2 ? poi.id : poi.category.slice(0,1).toUpperCase()}
      </text>
    </g>
  );
}

/* ─── POI Detail Panel ───────────────────────────────────────────────── */
function PoiPanel({ poi, onClose }: { poi: POI; onClose: () => void }) {
  const cat = CAT[poi.category];
  const Icon = poi.icon;
  return (
    <div className="absolute inset-x-4 bottom-4 z-20 flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-xl md:right-4 md:left-auto md:w-80">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: cat.bg }}>
        <Icon size={18} style={{ color: cat.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-rdc-anthracite">{poi.label}</p>
        {poi.sublabel && <p className="text-xs text-muted-foreground">{poi.sublabel}</p>}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{poi.details}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0 text-muted-foreground hover:text-foreground">
        <X size={16} />
      </button>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
function PlansAerogares() {
  const [terminal, setTerminal]     = useState<Terminal>('international');
  const [floor, setFloor]           = useState<Floor>('departures');
  const [activeFilter, setActiveFilter] = useState<Category | null>(null);
  const [selectedPoi, setSelectedPoi]   = useState<POI | null>(null);

  const pois = terminal === 'international'
    ? (floor === 'departures' ? POIS_INT_DEP : POIS_INT_ARR)
    : POIS_DOM_DEP;

  const Zones = terminal === 'international'
    ? (floor === 'departures' ? ZonesIntDep : ZonesIntArr)
    : ZonesDomDep;

  function isFiltered(cat: Category) {
    return activeFilter === null || activeFilter === cat;
  }

  function toggleFilter(cat: Category) {
    setActiveFilter(prev => prev === cat ? null : cat);
    setSelectedPoi(null);
  }

  const activeCats = [...new Set(pois.map(p => p.category))];

  return (
    <main id="main-content">

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1C2F4A]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2F4A] via-[#1C2F4A]/80 to-transparent" />
        <div className="container relative z-10 py-12 md:py-16">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="inline-block h-4 w-5 bg-rdc-yellow" style={{ clipPath: 'polygon(20% 0%,100% 0%,80% 100%,0% 100%)' }} />
            <span className="text-sm font-semibold tracking-wider text-white/70">Vols</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">Plans des aérogares</h1>
          <p className="mt-3 max-w-lg text-white/60">
            Plans schématiques interactifs des terminaux de l'Aéroport International de N'djili (FIH) — Kinshasa, RDC.
          </p>
        </div>
      </div>

      <div className="container py-8 md:py-10">

        {/* ─── Terminal & Floor switchers ───────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          {/* Terminal */}
          <div className="flex border border-border">
            {([['international','Terminal International'], ['domestic','Terminal Domestique']] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => { setTerminal(id); setSelectedPoi(null); setActiveFilter(null); }}
                className={cn('px-5 py-2.5 text-sm font-semibold transition-colors',
                  terminal === id
                    ? 'bg-rdc-blue text-white'
                    : 'bg-white text-muted-foreground hover:bg-muted'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Floor selector (international only) */}
          {terminal === 'international' && (
            <div className="flex border border-border">
              <button
                onClick={() => { setFloor('departures'); setSelectedPoi(null); }}
                className={cn('flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors',
                  floor === 'departures' ? 'bg-[#1C2F4A] text-white' : 'bg-white text-muted-foreground hover:bg-muted'
                )}
              >
                <PlaneTakeoff size={13} /> Départs
              </button>
              <button
                onClick={() => { setFloor('arrivals'); setSelectedPoi(null); }}
                className={cn('flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors',
                  floor === 'arrivals' ? 'bg-[#0F2A1E] text-white' : 'bg-white text-muted-foreground hover:bg-muted'
                )}
              >
                <PlaneLanding size={13} /> Arrivées
              </button>
            </div>
          )}
        </div>

        {/* ─── Category filter chips ────────────────────────────── */}
        <div className="mb-5 flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveFilter(null); setSelectedPoi(null); }}
            className={cn('rounded-full px-3.5 py-1 text-xs font-semibold transition-colors border',
              activeFilter === null
                ? 'bg-rdc-anthracite text-white border-rdc-anthracite'
                : 'border-border text-muted-foreground hover:border-rdc-anthracite/40'
            )}
          >
            Tout afficher
          </button>
          {activeCats.map(cat => {
            const c = CAT[cat];
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => toggleFilter(cat)}
                className={cn('flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition-colors border')}
                style={isActive
                  ? { backgroundColor: c.color, color: '#fff', borderColor: c.color }
                  : { backgroundColor: '#fff', color: '#374151', borderColor: '#e2e8f0' }
                }
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: isActive ? '#fff' : c.color }} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* ─── Map + Legend ─────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row">

          {/* SVG Map */}
          <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-slate-50 shadow-sm">
            <svg
              viewBox="0 0 900 560"
              className="w-full"
              role="img"
              aria-label={`Plan ${terminal === 'international' ? 'Terminal International' : 'Terminal Domestique'} FIH`}
            >
              <Zones />
              {pois.map(poi => (
                <PoiMarker
                  key={poi.id}
                  poi={poi}
                  active={selectedPoi?.id === poi.id}
                  filtered={isFiltered(poi.category)}
                  onClick={() => setSelectedPoi(prev => prev?.id === poi.id ? null : poi)}
                />
              ))}
            </svg>

            {/* POI Detail overlay */}
            {selectedPoi && (
              <PoiPanel poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
            )}

            {/* Compass */}
            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow text-xs font-bold text-slate-600">
              N↑
            </div>
          </div>

          {/* POI List sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {activeFilter ? CAT[activeFilter].label : 'Tous les services'}
              <span className="ml-1 font-normal normal-case">
                ({pois.filter(p => isFiltered(p.category)).length})
              </span>
            </p>
            <div className="space-y-px">
              {pois.filter(p => isFiltered(p.category)).map(poi => {
                const cat = CAT[poi.category];
                const Icon = poi.icon;
                const isSelected = selectedPoi?.id === poi.id;
                return (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPoi(prev => prev?.id === poi.id ? null : poi)}
                    className={cn(
                      'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
                      isSelected ? 'bg-slate-100' : 'hover:bg-muted/50'
                    )}
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: cat.bg }}>
                      <Icon size={13} style={{ color: cat.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-rdc-anthracite">{poi.label}</p>
                      {poi.sublabel && <p className="truncate text-[10px] text-muted-foreground">{poi.sublabel}</p>}
                    </div>
                    <ChevronRight size={12} className="flex-shrink-0 text-muted-foreground" />
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Légende zones</p>
              {[
                { color: '#EFF6FF', border: '#93C5FD', label: 'Zone sécurisée (Airside)' },
                { color: '#FEF3C7', border: '#F97316', label: 'Contrôle sécurité ANR' },
                { color: '#F0FDF4', border: '#86EFAC', label: 'Zone publique (Landside)' },
                { color: '#EDE9FE', border: '#8B5CF6', label: 'Immigration DGM' },
                { color: '#CCFBF1', border: '#14B8A6', label: 'Douanes DGDA' },
              ].map(z => (
                <div key={z.label} className="mb-1.5 flex items-center gap-2">
                  <div className="h-3 w-5 flex-shrink-0 rounded-sm border" style={{ backgroundColor: z.color, borderColor: z.border }} />
                  <span className="text-[10px] text-muted-foreground">{z.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* ─── Disclaimer ───────────────────────────────────────── */}
        <p className="mt-6 text-xs text-muted-foreground">
          Plan schématique à titre indicatif. Les emplacements des services peuvent varier. Pour toute assistance, adressez-vous au comptoir d'information RVA dans le hall principal. Dernière mise à jour : mai 2026.
        </p>
      </div>
    </main>
  );
}
