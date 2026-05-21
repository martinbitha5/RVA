export type ConcessionCategory =
  | 'restaurant'
  | 'boutique'
  | 'bar'
  | 'duty_free'
  | 'lounge'
  | 'exchange'
  | 'bank'
  | 'medical';

export type ZoneKey =
  | 'public-arrivees'
  | 'public-departs'
  | 'reglementee-int'
  | 'reglementee-dom';

export const ZONE_LABELS: Record<ZoneKey, string> = {
  'public-arrivees': 'Zone publique — Hall des arrivées',
  'public-departs':  'Zone publique — Hall des départs',
  'reglementee-int': 'Zone réglementée — International',
  'reglementee-dom': 'Zone réglementée — Domestique',
};

export const CATEGORY_LABELS: Record<ConcessionCategory, string> = {
  restaurant: 'Aliments et boissons',
  boutique:   'Boutiques',
  bar:        'Aliments et boissons',
  duty_free:  'Boutiques',
  lounge:     'Salons',
  exchange:   'Services',
  bank:       'Services',
  medical:    'Services',
};

export const FILTER_TABS = [
  { key: 'all',       label: 'Toutes les boutiques et restaurants' },
  { key: 'food',      label: 'Aliments et boissons' },
  { key: 'boutique',  label: 'Boutiques' },
  { key: 'services',  label: 'Services' },
  { key: 'lounge',    label: 'Salons' },
] as const;

export type FilterTab = (typeof FILTER_TABS)[number]['key'];

export interface Concession {
  id: number;
  slug: string;
  name: string;
  category: ConcessionCategory;
  zoneKey: ZoneKey;
  porte: string;
  hours: string;
  phone?: string;
  website?: string;
  description: string;
  tags: string[];
  image?: string;
  gradient: string;
  logo?: string;
  relatedIds?: number[];
}

export const CONCESSIONS: Concession[] = [
  /* ── RESTAURANTS ─────────────────────────────────────────────── */
  {
    id: 1,
    slug: 'chez-tante-marie',
    name: 'Chez Tante Marie',
    category: 'restaurant',
    zoneKey: 'reglementee-int',
    porte: 'Porte B12',
    hours: 'Tous les jours 06 h 00 à 22 h 00',
    phone: '+243 81 234 5678',
    description:
      "Cuisine traditionnelle congolaise — poulet moambe, saka-saka, fumbwa. Le goût de Kinshasa avant votre envol.",
    tags: ['Cuisine congolaise', 'Déjeuners', 'Dîners', 'À emporter'],
    gradient: 'linear-gradient(135deg,#7C2D12,#9A3412)',
    relatedIds: [2, 4, 8],
  },
  {
    id: 2,
    slug: 'le-gourmet-congolais',
    name: 'Le Gourmet Congolais',
    category: 'restaurant',
    zoneKey: 'reglementee-int',
    porte: 'Porte B14',
    hours: 'Tous les jours 07 h 00 à 23 h 00',
    phone: '+243 82 345 6789',
    description:
      "Gastronomie congolaise revisitée dans un cadre moderne. Spécialités de poisson du fleuve Congo et grillades.",
    tags: ['Gastronomie', 'Poissons', 'Déjeuners', 'Dîners'],
    gradient: 'linear-gradient(135deg,#14532D,#166534)',
    relatedIds: [1, 4, 8],
  },
  {
    id: 3,
    slug: 'kfc-express',
    name: 'KFC Express',
    category: 'restaurant',
    zoneKey: 'reglementee-int',
    porte: 'Porte B8',
    hours: 'Tous les jours 06 h 00 à 22 h 00',
    website: 'https://kfc.cd',
    description:
      "Poulet croustillant, burgers et formules rapides. Le choix idéal pour les voyageurs pressés.",
    tags: ['Fast-food', 'Hamburgers', 'À emporter', 'Collations'],
    gradient: 'linear-gradient(135deg,#7C0000,#991B1B)',
    relatedIds: [1, 2, 9],
  },
  {
    id: 4,
    slug: 'saveur-de-kinshasa',
    name: 'Saveur de Kinshasa',
    category: 'restaurant',
    zoneKey: 'reglementee-dom',
    porte: 'Terminal Domestique',
    hours: 'Tous les jours 06 h 00 à 20 h 00',
    phone: '+243 99 456 7890',
    description:
      "Snacks et plats chauds congolais pour les vols intérieurs. Brochettes, beignets et boissons fraîches.",
    tags: ['Snacks', 'Cuisine locale', 'Boissons', 'Collations'],
    gradient: 'linear-gradient(135deg,#78350F,#92400E)',
    relatedIds: [1, 2, 9],
  },

  /* ── BOUTIQUES ────────────────────────────────────────────────── */
  {
    id: 5,
    slug: 'artisanat-du-congo',
    name: "Artisanat du Congo",
    category: 'boutique',
    zoneKey: 'reglementee-int',
    porte: 'Porte B10',
    hours: 'Tous les jours 07 h 00 à 21 h 00',
    phone: '+243 81 567 8901',
    description:
      "Masques Kuba, sculptures Mbongo, batiks et bijoux traditionnels. L'artisanat congolais authentique pour vos proches.",
    tags: ['Cadeaux', 'Souvenirs', 'Artisanat', 'Bijoux'],
    gradient: 'linear-gradient(135deg,#003DA5,#1D4ED8)',
    relatedIds: [6, 7, 10],
  },
  {
    id: 6,
    slug: 'makeba-souvenirs',
    name: 'Makeba Souvenirs',
    category: 'boutique',
    zoneKey: 'public-departs',
    porte: 'Niveau 1',
    hours: 'Tous les jours 08 h 00 à 20 h 00',
    phone: '+243 82 678 9012',
    description:
      "Figurines, textiles wax, musique congolaise et souvenirs de Kinshasa pour emporter le Congo avec vous.",
    tags: ['Cadeaux', 'Souvenirs', 'Textiles', 'Musique'],
    gradient: 'linear-gradient(135deg,#5B21B6,#6D28D9)',
    relatedIds: [5, 7, 10],
  },
  {
    id: 7,
    slug: 'kiosque-presse-fih',
    name: 'Kiosque Presse FIH',
    category: 'boutique',
    zoneKey: 'public-arrivees',
    porte: 'Niveau 0',
    hours: 'Tous les jours 05 h 30 à 21 h 00',
    description:
      "Journaux, magazines, livres et accessoires de voyage. Presse internationale et titres kinois du jour.",
    tags: ['Presse', 'Livres', 'Accessoires voyage'],
    gradient: 'linear-gradient(135deg,#1A1A1A,#374151)',
    relatedIds: [5, 6, 10],
  },
  {
    id: 10,
    slug: 'duty-free-fih',
    name: 'Duty Free FIH',
    category: 'duty_free',
    zoneKey: 'reglementee-int',
    porte: 'Porte B1',
    hours: 'Tous les jours 06 h 00 à 22 h 00',
    description:
      "Parfums, cosmétiques, alcools, tabac et confiseries hors taxes. Économisez sur vos marques préférées.",
    tags: ['Parfums', 'Alcools', 'Tabac', 'Cosmétiques', 'Hors taxes'],
    gradient: 'linear-gradient(135deg,#1E3A5F,#2E4E7E)',
    relatedIds: [5, 6, 11],
  },

  /* ── BARS & CAFÉS ─────────────────────────────────────────────── */
  {
    id: 8,
    slug: 'sky-bar-fih',
    name: 'Sky Bar FIH',
    category: 'bar',
    zoneKey: 'reglementee-int',
    porte: 'Porte B16',
    hours: 'Tous les jours 08 h 00 à 00 h 00',
    phone: '+243 81 789 0123',
    description:
      "Bar panoramique avec vue sur le tarmac. Cocktails, bières Primus et Skol, vins et spiritueux sélectionnés.",
    tags: ['Bar', 'Cocktails', 'Bières', 'Vue tarmac'],
    gradient: 'linear-gradient(135deg,#0C4A6E,#0369A1)',
    relatedIds: [9, 1, 11],
  },
  {
    id: 9,
    slug: 'cafe-congo',
    name: 'Café Congo',
    category: 'bar',
    zoneKey: 'public-departs',
    porte: 'Niveau 1',
    hours: 'Tous les jours 05 h 00 à 22 h 00',
    description:
      "Café congolais de spécialité, thés, jus tropicaux et viennoiseries fraîches. Le café du fleuve, en altitude.",
    tags: ['Café', 'Thé', 'Jus', 'Pâtisseries', 'Collations'],
    gradient: 'linear-gradient(135deg,#451A03,#78350F)',
    relatedIds: [8, 3, 4],
  },

  /* ── SALONS VIP ──────────────────────────────────────────────── */
  {
    id: 11,
    slug: 'pearl-lounge',
    name: 'Pearl Lounge',
    category: 'lounge',
    zoneKey: 'reglementee-int',
    porte: 'Porte B6',
    hours: 'Tous les jours 05 h 00 à 23 h 00',
    phone: '+243 81 890 1234',
    website: 'https://pearllounge.cd',
    description:
      "Salon VIP indépendant ouvert à tous les passagers. Buffet chaud, bar open, Wi-Fi haut débit, douches et zone repos.",
    tags: ['Salon VIP', 'Buffet', 'Wi-Fi', 'Douches', 'Accès payant'],
    gradient: 'linear-gradient(135deg,#78350F,#A16207)',
    relatedIds: [12, 10, 8],
  },
  {
    id: 12,
    slug: 'brussels-airlines-lounge',
    name: 'Brussels Airlines Lounge',
    category: 'lounge',
    zoneKey: 'reglementee-int',
    porte: 'Porte B4',
    hours: 'Selon horaires des vols Brussels Airlines',
    website: 'https://brusselsairlines.com',
    description:
      "Salon réservé aux passagers Business et titulaires Miles & More. Snacks, boissons, Wi-Fi et sièges confortables.",
    tags: ['Salon VIP', 'Business', 'Brussels Airlines', 'Accès compagnie'],
    gradient: 'linear-gradient(135deg,#1D2856,#2D3A6E)',
    relatedIds: [11, 10, 8],
  },

  /* ── CHANGE & BANQUES ────────────────────────────────────────── */
  {
    id: 13,
    slug: 'rawbank-change',
    name: 'Rawbank Change',
    category: 'exchange',
    zoneKey: 'public-arrivees',
    porte: 'Niveau 0',
    hours: 'Tous les jours 07 h 00 à 21 h 00',
    phone: '+243 81 901 2345',
    website: 'https://rawbank.cd',
    description:
      "Bureau de change agréé Rawbank. Échange USD / EUR / GBP vers CDF et inversement. Taux compétitifs affichés.",
    tags: ['Change', 'USD', 'EUR', 'CDF', 'Banque'],
    gradient: 'linear-gradient(135deg,#064E3B,#065F46)',
    relatedIds: [14, 15, 16],
  },
  {
    id: 14,
    slug: 'bureau-de-change-fih',
    name: 'Bureau de Change FIH',
    category: 'exchange',
    zoneKey: 'reglementee-int',
    porte: 'Porte B2',
    hours: 'Tous les jours 06 h 00 à 22 h 00',
    description:
      "Change devises côté zone réglementée. USD, EUR, GBP, XAF disponibles. Sans commission sur les billets neufs.",
    tags: ['Change', 'Devises', 'USD', 'EUR', 'XAF'],
    gradient: 'linear-gradient(135deg,#134E4A,#0F766E)',
    relatedIds: [13, 15, 16],
  },
  {
    id: 15,
    slug: 'atm-equity-bcdc',
    name: 'ATM Equity BCDC',
    category: 'bank',
    zoneKey: 'public-arrivees',
    porte: 'Niveau 0',
    hours: '24 h / 24',
    website: 'https://equitybcdc.cd',
    description:
      "Distributeur Equity BCDC. Retraits en USD et CDF, compatible Visa, Mastercard et cartes locales.",
    tags: ['ATM', 'Visa', 'Mastercard', 'USD', 'CDF'],
    gradient: 'linear-gradient(135deg,#0C4A6E,#075985)',
    relatedIds: [16, 13, 14],
  },
  {
    id: 16,
    slug: 'atm-tmb',
    name: 'ATM TMB',
    category: 'bank',
    zoneKey: 'public-arrivees',
    porte: 'Terminal Domestique',
    hours: '24 h / 24',
    website: 'https://tmb.cd',
    description:
      "Guichet automatique Trust Merchant Bank. Retraits USD / CDF, virements et consultation de solde.",
    tags: ['ATM', 'Trust Merchant Bank', 'USD', 'CDF'],
    gradient: 'linear-gradient(135deg,#1E3A5F,#1D4ED8)',
    relatedIds: [15, 13, 14],
  },

  /* ── MÉDICAL ─────────────────────────────────────────────────── */
  {
    id: 17,
    slug: 'centre-medical-fih',
    name: 'Centre Médical FIH',
    category: 'medical',
    zoneKey: 'public-departs',
    porte: 'Niveau 1',
    hours: '24 h / 24',
    phone: '+243 81 012 3456',
    description:
      "Service médical aéroportuaire 24 h/24. Soins d'urgence, vaccinations (fièvre jaune), certificats médicaux de voyage.",
    tags: ['Médical', 'Urgences', 'Vaccinations', 'Fièvre jaune', '24h/24'],
    gradient: 'linear-gradient(135deg,#7F1D1D,#991B1B)',
    relatedIds: [13, 7, 6],
  },
];

/** Map slug → concession for O(1) lookup */
export const CONCESSIONS_BY_SLUG = Object.fromEntries(
  CONCESSIONS.map(c => [c.slug, c])
);

/** Helper: filter by tab key */
export function filterByTab(tab: string, items: Concession[]): Concession[] {
  if (tab === 'all') return items;
  if (tab === 'food')     return items.filter(c => c.category === 'restaurant' || c.category === 'bar');
  if (tab === 'boutique') return items.filter(c => c.category === 'boutique'   || c.category === 'duty_free');
  if (tab === 'services') return items.filter(c => c.category === 'exchange'   || c.category === 'bank' || c.category === 'medical');
  if (tab === 'lounge')   return items.filter(c => c.category === 'lounge');
  return items;
}
