# CLAUDE.md — Projet Site Web Aéroport International de N'djili (FIH)

> Document de référence complet pour la construction du site web officiel de l'Aéroport International de N'djili (Kinshasa, RDC), inspiré de la structure et de l'expérience utilisateur de **admtl.com** (Aéroports de Montréal), adapté à la **réalité congolaise et kinoise**.

---

## 1. Vue d'ensemble du projet

### 1.1 Objectif
Construire un **portail web institutionnel et de service** de grande envergure pour l'Aéroport International de N'djili (code IATA : **FIH**, code OACI : **FZAA**), géré par la **Régie des Voies Aériennes (RVA)** de la République Démocratique du Congo.

Le site doit offrir :
- Information temps réel sur les vols (arrivées/départs)
- Services aux passagers (avant, pendant, après le vol)
- Information corporate (RVA, gouvernance, carrières, partenariats)
- Engagement communautaire (environnement, communautés riveraines de Nsele/Masina/Kimbanseke)
- Espace client connecté (réservation stationnement, alertes SMS, fidélité)

### 1.2 Identité visuelle (à respecter)
- **Couleurs principales** : Bleu RDC (#003DA5), Jaune solaire (#FFCE00), Rouge sang (#CE1126), accents verts (#009A44 — drapeau)
- **Couleurs secondaires** : Blanc cassé (#F7F7F2), Anthracite (#1A1A1A), Sable (#D9C7A7)
- **Typographies** : Inter (UI), Playfair Display ou Söhne (titres éditoriaux)
- **Ton** : Institutionnel, fiable, moderne, fier de l'identité kinoise

### 1.3 Langues
- **Français** (par défaut — langue officielle RDC)
- **Anglais** (international)
- **Lingala** (optionnel phase 2 — différenciation locale forte)

Routes i18n : `/fr/...`, `/en/...`, `/ln/...`

---

## 2. Stack technique

### 2.1 Frontend
- **Framework** : React 18 + **TanStack Router** (file-based routing typé)
- **State serveur** : TanStack Query (cache, sync, optimistic updates)
- **State client** : Zustand (léger, pour UI state)
- **Tables** : TanStack Table (vols, horaires, répertoires)
- **Forms** : TanStack Form + Zod (validation)
- **Styling** : Tailwind CSS v4 + shadcn/ui (composants accessibles)
- **Animations** : Framer Motion (transitions douces, pas d'excès)
- **Icons** : Lucide React
- **Cartes** : MapLibre GL JS (open-source, pour plans aéroport et localisation)
- **Build** : Vite

### 2.2 Backend / Données
- **Supabase** :
  - PostgreSQL (base de données)
  - Auth (email/mot de passe, OAuth Google, OTP SMS via Twilio pour le marché congolais)
  - Storage (images, PDF, documents officiels)
  - Edge Functions (logique métier : intégration FlightAware, paiements Mobile Money)
  - Realtime (vols en direct, notifications)
  - Row Level Security (RLS) sur toutes les tables sensibles

### 2.3 Intégrations tierces
- **FlightAware** ou **AviationStack** API → données vols temps réel
- **OpenWeatherMap** → météo Kinshasa
- **Mobile Money** : Airtel Money, M-Pesa Vodacom, Orange Money (paiement stationnement, services)
- **SMS** : Africa's Talking ou Twilio (alertes vols)
- **Email transactionnel** : Resend ou Postmark
- **Analytics** : Plausible (RGPD-friendly) ou PostHog
- **CMS éditorial** (news, actualités) : Sanity.io ou Strapi (auto-hébergé)

### 2.4 Hébergement
- Frontend : **Vercel** ou **Netlify** (CDN global, edge functions)
- Supabase : cloud Supabase (région la plus proche : Europe-West)
- DNS : Cloudflare (protection DDoS, cache, important pour la stabilité réseau africain)

---

## 3. Architecture du site — Plan complet (inspiré de admtl.com)

> Structure hiérarchique de toutes les pages et sous-pages. Chaque section principale apparaît dans le **header**, les éléments secondaires/légaux dans le **footer**.

### 3.1 NAVIGATION PRINCIPALE (Header)

#### A. **VOLS** (`/vols`)
- `/vols/departs` — Départs en temps réel (TanStack Table avec filtres : compagnie, destination, heure, statut, terminal/porte)
- `/vols/arrivees` — Arrivées en temps réel
- `/vols/compagnies-aeriennes` — Liste des compagnies opérant à FIH
  - Sous-pages dynamiques `/vols/compagnies-aeriennes/[slug]` (Congo Airways, CAA, Ethiopian Airlines, Brussels Airlines, Air France, Kenya Airways, Qatar Airways, EgyptAir, Turkish Airlines, ASKY, Royal Air Maroc, RwandAir, South African Airways, TAAG, Uganda Airlines)
- `/vols/alertes-sms` — Inscription aux alertes SMS (utilisation Mobile Money/n° local)
- `/vols/temps-attente` — Temps d'attente sécurité/immigration estimés
- `/vols/plans-aerogares` — Plans interactifs des terminaux (Terminal International + Terminal Domestique)

#### B. **STATIONNEMENT & TRANSPORT** (`/stationnement-transport`)
- `/stationnement-transport/stationnement-fih` — Stationnement officiel RVA
- `/stationnement-transport/offres` — Tarifs et abonnements
- `/stationnement-transport/mobilite-reduite` — Accès PMR
- `/stationnement-transport/depose-recuperation` — Dépose-minute et récupération passagers
- `/stationnement-transport/travaux` — Avis travaux/perturbations
- `/stationnement-transport/services-transport` — Services de transport
  - `/stationnement-transport/taxis` — Taxis officiels agréés RVA (lutte contre taxis informels)
  - `/stationnement-transport/transcom-bus` — Lignes Transco/Esprit de Vie depuis Kinshasa
  - `/stationnement-transport/navettes` — Navettes hôtels et tour-opérateurs
  - `/stationnement-transport/covoiturage` — Covoiturage agréé
  - `/stationnement-transport/limousines` — Services premium
  - `/stationnement-transport/location-voitures` — Avis, Europcar, Hertz, locales (Loxea)
  - `/stationnement-transport/boulevard-lumumba` — Information accès via Boulevard Lumumba (route principale depuis le centre-ville)

#### C. **BOUTIQUES & RESTAURANTS** (`/boutiques-restaurants`)
- `/boutiques-restaurants/repertoire` — Répertoire complet filtrable
- `/boutiques-restaurants/restaurants` — Restaurants (cuisine congolaise : Chez Tante, fast-food, internationaux)
- `/boutiques-restaurants/boutiques` — Boutiques (artisanat, souvenirs, presse)
- `/boutiques-restaurants/bars-cafes` — Bars et cafés
- `/boutiques-restaurants/echange-devises` — Bureaux de change (USD/CDF/EUR — essentiel en RDC)
- `/boutiques-restaurants/hors-taxes` — Duty Free
- `/boutiques-restaurants/salons` — Salons VIP (Pearl Lounge, Brussels Airlines Lounge, etc.)

#### D. **GUIDE DE L'AÉROPORT** (`/guide`)
- `/guide/quitter-kinshasa` — Procédure départ (enregistrement, sécurité, immigration)
- `/guide/fih-express` — Service prioritaire d'enregistrement (équivalent YULExpress)
- `/guide/securite-bagages` — Règles sécurité, objets interdits, bagages
- `/guide/atterrir-kinshasa` — Arrivée à FIH (visa, vaccination — fièvre jaune obligatoire, change)
- `/guide/douanes-immigration` — Douanes (DGDA) et immigration (DGM)
- `/guide/correspondances` — Vols en correspondance
- `/guide/salons` — Accès salons
- `/guide/depose-recuperation` — Recup passager côté arrivées
- `/guide/sante` — Centre médical, vaccinations (fièvre jaune, COVID si applicable)
- `/guide/wifi-connectivite` — Wi-Fi gratuit, opérateurs mobiles (Vodacom, Airtel, Orange)
- `/guide/services-bancaires` — ATM, banques (Rawbank, Equity BCDC, TMB)
- `/guide/objets-trouves` — Objets perdus/trouvés
- `/guide/passagers-mineurs` — Voyage mineurs non accompagnés
- `/guide/passagers-handicap` — Assistance personnes à mobilité réduite

#### E. **CORPORATE** (`/corporate`) — submenu mega-menu
- `/corporate/a-propos` — À propos de la RVA et de FIH
- `/corporate/gouvernance` — Gouvernance
  - `/corporate/gouvernance/conseil-administration` — Conseil d'administration
  - `/corporate/gouvernance/comite-consultatif` — Comité consultatif communautaire (Nsele, Masina)
  - `/corporate/gouvernance/comite-direction` — Comité de direction
  - `/corporate/gouvernance/directions` — Directions
- `/corporate/projets-avenir` — Projets d'avenir (reconstruction terminal, modernisation piste)
- `/corporate/historique` — Histoire (depuis 1953, Sabena, Air Congo, Air Zaïre)
- `/corporate/carriere` — Carrières
  - `/corporate/carriere/communaute-fih` — La communauté FIH
  - `/corporate/carriere/engagement-talents` — Engagement envers les talents
  - `/corporate/carriere/se-developper` — Se développer à la RVA
  - `/corporate/carriere/programmes-politiques` — Programmes et politiques
  - `/corporate/carriere/offres-emploi` — Offres d'emploi (page dynamique)
- `/corporate/partenariats-commerciaux` — Partenariats commerciaux
  - `/corporate/partenariats/apercu-fih` — Aperçu FIH (statistiques trafic)
  - `/corporate/partenariats/concessions` — Concessions disponibles
  - `/corporate/partenariats/visibilite` — Perspectives de visibilité/publicité
  - `/corporate/partenariats/immobilier` — Immobilier aéroportuaire
- `/corporate/services-aeriens` — Services aériens
  - `/corporate/services-aeriens/fret` — Transport de fret/cargo
  - `/corporate/services-aeriens/aviation-generale` — Aviation générale
  - `/corporate/services-aeriens/aviation-commerciale` — Aviation commerciale
- `/corporate/surete-securite` — Sûreté et sécurité
  - `/corporate/surete/ecosysteme` — Écosystème de la sûreté aéroportuaire
  - `/corporate/surete/engagement` — Engagement sécurité
  - `/corporate/surete/pompiers` — Service de lutte contre l'incendie (SSLIA)
  - `/corporate/surete/sms-sst` — Systèmes de gestion sécurité et SST

#### F. **COMMUNAUTÉ** (`/communaute`)
- `/communaute/environnement-durabilite` — Environnement et durabilité
  - `/communaute/environnement/gestion` — Gestion environnementale
  - `/communaute/environnement/protection-habitat` — Protection habitat (Pool Malebo, fleuve Congo)
  - `/communaute/environnement/faune` — Gestion de la faune (oiseaux, péril aviaire)
  - `/communaute/environnement/durabilite` — Mission, engagements, certifications
- `/communaute/environnement-sonore` — Gestion environnement sonore
  - `/communaute/sonore/comprendre` — Comprendre l'environnement sonore
  - `/communaute/sonore/responsabilites` — Responsabilités
  - `/communaute/sonore/attenuation` — Atténuation du bruit
  - `/communaute/sonore/indicateurs` — Indicateurs
  - `/communaute/sonore/comite-consultatif` — Comité consultatif
  - `/communaute/sonore/plaintes` — Plaintes (formulaire connecté Supabase)
  - `/communaute/sonore/bulletin` — Bulletin environnement sonore
- `/communaute/travaux-pistes` — Travaux sur pistes et voies de circulation
- `/communaute/relations-communaute` — Relations communautaires
  - `/communaute/relations/consultations` — Consultations publiques
  - `/communaute/relations/assemblee` — Assemblée annuelle
  - `/communaute/relations/implication` — Implication communautaire
  - `/communaute/relations/initiatives` — Initiatives locales (Nsele, Masina, Kimbanseke)
  - `/communaute/relations/partenariats-dons` — Partenariats, dons, mécénat
  - `/communaute/relations/fih-art` — Programme FIH Art (artistes congolais : Chéri Samba, Moke, jeunes talents)

### 3.2 ÉLÉMENTS PERSISTANTS

#### Header (toutes pages)
- Logo RVA + FIH (gauche)
- Sélecteur de langue (FR / EN / LN)
- Barre de recherche globale (Supabase Full-Text Search)
- Menu principal (mega-menu sur desktop, drawer mobile)
- Bouton **Espace Client** (`/compte`) — Auth Supabase
- Bandeau d'alerte global (travaux, événements majeurs)

#### Footer (toutes pages)
- **Colonne 1 — FIH** : À propos, Histoire, Projets d'avenir, Carrières
- **Colonne 2 — Services** : Vols, Stationnement, Boutiques, Guide
- **Colonne 3 — Corporate** : Gouvernance, Partenariats, Sûreté
- **Colonne 4 — Communauté** : Environnement, Sonore, Initiatives
- **Colonne 5 — Contact** :
  - Adresse : Boulevard Lumumba, Commune de Nsele, Kinshasa, RDC
  - Tél : +243 XX XXX XXXX
  - Email : contact@fih-rva.com / info@fih-rva.com
  - Standard : 24/7
- **Réseaux sociaux** : Facebook, X (Twitter), Instagram, LinkedIn, YouTube
- **Bas de page (légal)** :
  - `/plan-de-site` — Plan du site
  - `/conditions-utilisation` — Conditions d'utilisation
  - `/politique-confidentialite` — Politique de confidentialité
  - `/cookies` — Politique cookies
  - `/accessibilite` — Accessibilité
  - `/medias` — Salle de presse / médias
  - `/contact` — Contactez-nous
  - `/faq` — Foire aux questions
  - © Régie des Voies Aériennes — République Démocratique du Congo

### 3.3 ESPACE CLIENT (auth requise — Supabase Auth)
- `/compte` — Tableau de bord
- `/compte/profil` — Profil utilisateur
- `/compte/reservations` — Mes réservations stationnement
- `/compte/vols-suivis` — Vols suivis (alertes)
- `/compte/historique` — Historique transactions
- `/compte/preferences` — Préférences notifications (SMS/email)
- `/login`, `/inscription`, `/mot-de-passe-oublie`

---

## 4. Schéma de base de données (Supabase / PostgreSQL)

### 4.1 Tables principales

```sql
-- Utilisateurs (lié à auth.users de Supabase)
profiles (
  id uuid PK references auth.users,
  email text,
  phone text,
  full_name text,
  preferred_language text default 'fr',
  notification_sms boolean default false,
  notification_email boolean default true,
  created_at timestamptz,
  updated_at timestamptz
)

-- Compagnies aériennes
airlines (
  id uuid PK,
  iata_code text unique, -- ex: SN, ET, KQ
  icao_code text unique,
  name text,
  slug text unique,
  logo_url text,
  website text,
  description_fr text,
  description_en text,
  hub_at_fih boolean default false,
  active boolean default true
)

-- Destinations / aéroports liés
destinations (
  id uuid PK,
  iata_code text unique,
  city text,
  country text,
  country_code text,
  timezone text
)

-- Vols (alimentés par API + admin)
flights (
  id uuid PK,
  flight_number text,
  airline_id uuid FK airlines,
  type text check (type in ('departure','arrival')),
  origin_iata text,
  destination_iata text,
  scheduled_time timestamptz,
  estimated_time timestamptz,
  actual_time timestamptz,
  status text check (status in ('scheduled','boarding','departed','arrived','delayed','cancelled','diverted')),
  terminal text,
  gate text,
  baggage_claim text,
  aircraft_type text,
  created_at timestamptz default now()
)
-- Index sur scheduled_time, status, airline_id

-- Concessions (boutiques, restaurants, services)
concessions (
  id uuid PK,
  name text,
  slug text,
  category text check (category in ('restaurant','boutique','bar','cafe','duty_free','lounge','exchange','bank','medical','other')),
  terminal text,
  zone text, -- before/after security
  description_fr text,
  description_en text,
  hours jsonb, -- {monday: "06:00-22:00", ...}
  phone text,
  logo_url text,
  cover_image_url text,
  gallery jsonb,
  active boolean default true
)

-- Salons VIP
lounges (
  id uuid PK,
  name text,
  operator text,
  location text,
  description_fr text,
  description_en text,
  access_conditions text,
  amenities jsonb,
  hours jsonb,
  image_url text
)

-- Parkings
parking_lots (
  id uuid PK,
  code text, -- P1, P2, etc.
  name text,
  description text,
  total_spots int,
  hourly_rate_usd numeric,
  daily_rate_usd numeric,
  weekly_rate_usd numeric,
  ev_charging boolean,
  pmr_spots int,
  active boolean
)

-- Réservations stationnement
parking_reservations (
  id uuid PK,
  user_id uuid FK profiles,
  parking_lot_id uuid FK parking_lots,
  vehicle_plate text,
  start_at timestamptz,
  end_at timestamptz,
  total_amount_usd numeric,
  payment_method text, -- airtel_money, mpesa, orange_money, card
  payment_status text,
  reservation_code text unique,
  created_at timestamptz
)

-- Articles / actualités / news
news_articles (
  id uuid PK,
  slug text unique,
  title_fr text,
  title_en text,
  excerpt_fr text,
  excerpt_en text,
  body_fr text,
  body_en text,
  cover_image_url text,
  category text, -- corporate, community, ops, environment
  author text,
  published_at timestamptz,
  status text -- draft, published
)

-- Offres d'emploi
job_postings (
  id uuid PK,
  title text,
  department text,
  location text default 'FIH - Kinshasa',
  contract_type text, -- CDI, CDD, stage
  description_fr text,
  requirements_fr text,
  application_deadline date,
  apply_url text,
  active boolean,
  posted_at timestamptz
)

-- Candidatures
job_applications (
  id uuid PK,
  job_posting_id uuid FK,
  full_name text,
  email text,
  phone text,
  cv_url text, -- Supabase Storage
  cover_letter text,
  status text,
  submitted_at timestamptz
)

-- Plaintes environnement sonore
noise_complaints (
  id uuid PK,
  user_id uuid FK profiles nullable,
  full_name text,
  email text,
  phone text,
  address text,
  commune text, -- Nsele, Masina, Kimbanseke
  incident_date timestamptz,
  description text,
  status text default 'received',
  response text,
  created_at timestamptz
)

-- Alertes SMS / abonnements vols
flight_alerts (
  id uuid PK,
  user_id uuid FK profiles,
  flight_id uuid FK flights,
  alert_types text[], -- ['status_change', 'gate_change', 'delay']
  active boolean default true
)

-- Contenu CMS pages statiques
pages (
  id uuid PK,
  slug text unique,
  title_fr text,
  title_en text,
  body_fr text,
  body_en text,
  meta_description_fr text,
  meta_description_en text,
  updated_at timestamptz
)
```

### 4.2 Row Level Security (RLS) — exemples
- `profiles` : un user ne lit/écrit que ses propres données
- `parking_reservations` : un user ne voit que ses réservations
- `flights`, `airlines`, `concessions` : lecture publique, écriture admin
- `noise_complaints` : insertion publique anonyme possible, lecture admin uniquement
- `job_applications` : insertion publique, lecture admin

---

## 5. Structure des dossiers (TanStack Router file-based)

```
src/
├── routes/
│   ├── __root.tsx                    # Layout racine (Header + Footer + Outlet)
│   ├── index.tsx                     # Home (/)
│   ├── vols/
│   │   ├── index.tsx
│   │   ├── departs.tsx
│   │   ├── arrivees.tsx
│   │   ├── compagnies-aeriennes.tsx
│   │   ├── compagnies-aeriennes.$slug.tsx
│   │   ├── alertes-sms.tsx
│   │   ├── temps-attente.tsx
│   │   └── plans-aerogares.tsx
│   ├── stationnement-transport/
│   │   ├── index.tsx
│   │   ├── stationnement-fih.tsx
│   │   ├── offres.tsx
│   │   ├── mobilite-reduite.tsx
│   │   ├── depose-recuperation.tsx
│   │   ├── travaux.tsx
│   │   ├── taxis.tsx
│   │   ├── transcom-bus.tsx
│   │   ├── navettes.tsx
│   │   ├── covoiturage.tsx
│   │   ├── limousines.tsx
│   │   └── location-voitures.tsx
│   ├── boutiques-restaurants/
│   │   ├── index.tsx
│   │   ├── repertoire.tsx
│   │   ├── restaurants.tsx
│   │   ├── boutiques.tsx
│   │   ├── bars-cafes.tsx
│   │   ├── echange-devises.tsx
│   │   ├── hors-taxes.tsx
│   │   └── salons.tsx
│   ├── guide/
│   │   ├── index.tsx
│   │   ├── quitter-kinshasa.tsx
│   │   ├── fih-express.tsx
│   │   ├── securite-bagages.tsx
│   │   ├── atterrir-kinshasa.tsx
│   │   ├── douanes-immigration.tsx
│   │   ├── correspondances.tsx
│   │   ├── salons.tsx
│   │   ├── sante.tsx
│   │   ├── wifi-connectivite.tsx
│   │   ├── services-bancaires.tsx
│   │   └── objets-trouves.tsx
│   ├── corporate/
│   │   ├── index.tsx
│   │   ├── a-propos.tsx
│   │   ├── gouvernance/
│   │   ├── projets-avenir.tsx
│   │   ├── historique.tsx
│   │   ├── carriere/
│   │   ├── partenariats-commerciaux/
│   │   ├── services-aeriens/
│   │   └── surete-securite/
│   ├── communaute/
│   │   ├── index.tsx
│   │   ├── environnement-durabilite/
│   │   ├── environnement-sonore/
│   │   └── relations-communaute/
│   ├── compte/
│   │   ├── index.tsx                 # protected
│   │   ├── profil.tsx
│   │   ├── reservations.tsx
│   │   ├── vols-suivis.tsx
│   │   └── preferences.tsx
│   ├── login.tsx
│   ├── inscription.tsx
│   ├── plan-de-site.tsx
│   ├── conditions-utilisation.tsx
│   ├── politique-confidentialite.tsx
│   ├── contact.tsx
│   └── faq.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── AlertBanner.tsx
│   ├── flights/
│   │   ├── FlightTable.tsx
│   │   ├── FlightCard.tsx
│   │   ├── FlightStatusBadge.tsx
│   │   └── FlightFilters.tsx
│   ├── ui/                           # shadcn/ui components
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── QuickAccess.tsx
│   │   ├── FlightSearch.tsx
│   │   ├── NewsCarousel.tsx
│   │   └── ServicesGrid.tsx
│   └── forms/
├── lib/
│   ├── supabase.ts                   # client Supabase
│   ├── queries.ts                    # TanStack Query hooks
│   ├── i18n.ts
│   └── utils.ts
├── hooks/
├── stores/                           # Zustand stores
├── types/
│   └── database.ts                   # types générés Supabase
└── styles/
    └── globals.css
```

---

## 6. Spécifications détaillées par page clé

### 6.1 Page d'accueil (`/`)
**Sections (de haut en bas)** :
1. **Bandeau d'alerte** (conditionnel — travaux, événements)
2. **Hero** : grand visuel de l'aérogare ou pistes de N'djili avec slogan ("Votre porte d'entrée vers le Congo"), CTA principal "Vol en temps réel"
3. **Recherche vol rapide** (composant central proéminent : numéro vol OU compagnie + date)
4. **Accès rapides** (grille 4-6 cards) : Stationnement, Plan aérogare, Mobile Money, Taxis, Visa & Vaccins, Contact
5. **Vols en direct** (preview 6 prochains départs + 6 prochaines arrivées)
6. **Services aux passagers** (grille thématique avec icônes)
7. **Actualités FIH** (3 dernières news)
8. **Communauté & Environnement** (mise en avant initiatives Nsele/Masina)
9. **CTA newsletter / alertes SMS**

### 6.2 Page Départs/Arrivées
- TanStack Table avec colonnes : Heure prévue | Vol | Compagnie | Destination/Origine | Porte | Statut
- Filtres : compagnie, statut, plage horaire, terminal
- Realtime updates via Supabase Realtime channel
- Recherche par numéro de vol
- Pagination ou virtualisation (TanStack Virtual)
- Export PDF/CSV (admin)

### 6.3 Page Compagnie aérienne dynamique
- Header : Logo + nom + IATA/ICAO codes
- Description, hub status, destinations desservies depuis FIH
- Tableau de vols actifs (départs + arrivées)
- Comptoir d'enregistrement, horaires
- Lien site officiel, téléphone, salon VIP s'il y en a
- Conditions bagages (lien)

### 6.4 Plan aérogare interactif
- Composant MapLibre custom ou SVG zoomable
- Couches : portes, sécurité, douanes, boutiques, restaurants, toilettes, ATM, PMR
- Filtres par catégorie
- Sélection d'un POI → fiche détaillée latérale

### 6.5 Page Stationnement
- Disponibilité temps réel par parking
- Tarification claire en USD + équivalent CDF
- Bouton "Réserver" → flow de réservation 4 étapes
- Paiement : intégration Mobile Money (Airtel Money, M-Pesa, Orange Money) + carte
- QR code de confirmation envoyé par SMS et email

---

## 7. Spécificités congolaises à intégrer

### 7.1 Réalité opérationnelle locale
- **Vaccination fièvre jaune** : information obligatoire et visible (carnet jaune OMS exigé)
- **Visa** : explications visa électronique RDC, visas à l'arrivée pour certains pays
- **Change de devises** : USD principal, CDF secondaire, taux indicatifs
- **Boulevard Lumumba** : route principale → information embouteillages, alternatives
- **Vol intérieurs** : importance Lubumbashi, Goma, Bukavu, Mbuji-Mayi, Kisangani, Kananga, Mbandaka, Matadi
- **Liste noire UE** : transparence sur la situation, efforts de modernisation
- **Mobile Money** : moyen de paiement principal (intégration prioritaire)
- **Connectivité** : optimisation pour réseaux 3G/4G instables (PWA, offline-first sur pages critiques)

### 7.2 Identité culturelle
- Section #FIH Art : artistes congolais (Chéri Samba, Moke, sculpteurs Mbongo)
- Rumba congolaise (UNESCO) en sourdine optionnelle sur certaines pages
- Photographie : montrer Kinshasa moderne (Gombe, Boulevard du 30-Juin) ET l'identité locale
- Mots Lingala intégrés naturellement : "Mbote" en accueil, "Boyei malamu" (bienvenue), "Tongo" (départ), "Kozonga" (retour)

### 7.3 Communes riveraines
- Comité consultatif communautaire : représentants de **Nsele**, **Masina**, **Kimbanseke**, **N'sele**
- Plaintes bruit géolocalisées par commune
- Initiatives locales mises en avant (écoles, hôpitaux, formations)

---

## 8. Performance, SEO, accessibilité

### 8.1 Performance
- **Lighthouse ≥ 90** sur Performance, SEO, Accessibilité, Best Practices
- Images : WebP/AVIF, lazy loading, srcset responsive
- Code splitting par route (TanStack Router automatique)
- Préchargement intelligent au survol
- Cache TanStack Query agressif sur données stables (compagnies, concessions)
- SSR ou SSG pour pages contenu (Vite + plugin SSR)

### 8.2 SEO
- Meta tags dynamiques par page (title, description, OG, Twitter cards)
- Sitemap.xml généré automatiquement
- Schema.org Airport markup sur home
- URLs lisibles, françaises, avec slugs
- hreflang FR/EN/LN

### 8.3 Accessibilité (WCAG 2.1 AA minimum)
- Contraste suffisant
- Navigation clavier complète
- ARIA labels appropriés
- Focus visible
- Tailles de police ajustables
- Lecteurs d'écran testés (NVDA, VoiceOver)

---

## 9. Sécurité

- HTTPS partout (HSTS)
- CSP strict
- Rate limiting (Supabase + Cloudflare)
- Validation côté client (Zod) ET côté serveur (Edge Functions)
- Sanitisation des inputs
- RLS Supabase sur toutes les tables
- 2FA optionnelle pour comptes utilisateurs
- Audit logs admin
- RGPD-compliant (notice cookies, droit à l'oubli)
- Protection contre les injections, XSS, CSRF

---

## 10. Phasage / Roadmap de développement

### Phase 1 — MVP (4-6 semaines)
- Setup projet (Vite + TanStack Router + Tailwind + Supabase)
- Schéma DB + RLS
- Header, Footer, Layout racine, i18n FR/EN
- Page d'accueil
- Pages Vols (Départs/Arrivées) avec données mockées puis API
- Pages Compagnies aériennes
- Pages statiques essentielles (À propos, Contact, Mentions légales)

### Phase 2 — Services (4-6 semaines)
- Stationnement + réservation + Mobile Money
- Boutiques/Restaurants + répertoire
- Guide complet (toutes sous-pages)
- Espace client (auth, profil, vols suivis)
- Alertes SMS

### Phase 3 — Corporate & Communauté (3-4 semaines)
- Corporate (gouvernance, carrières, partenariats)
- Communauté (environnement, sonore, relations)
- CMS news / actualités
- Formulaire candidatures

### Phase 4 — Optimisation (2-3 semaines)
- Plan aérogare interactif
- Lingala (3e langue)
- PWA / mode hors-ligne
- Performance audit
- Sécurité audit
- Tests utilisateurs Kinshasa

---

## 11. Conventions de code

- **TypeScript strict** partout
- **ESLint + Prettier** (configuration TanStack)
- **Conventional Commits** (feat:, fix:, chore:, docs:)
- **Branches** : `main`, `develop`, `feature/*`, `fix/*`
- **PR reviews** obligatoires
- **Tests** : Vitest (unitaires) + Playwright (E2E sur parcours critiques : réservation, recherche vol)
- **Documentation composants** : Storybook (phase 2+)

---

## 12. Variables d'environnement

```bash
# .env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_FLIGHTAWARE_API_KEY=
VITE_MAPLIBRE_KEY=
VITE_PLAUSIBLE_DOMAIN=fih-rva.com

# Edge Functions
SUPABASE_SERVICE_ROLE_KEY=
AIRTEL_MONEY_API_KEY=
MPESA_API_KEY=
ORANGE_MONEY_API_KEY=
AFRICASTALKING_API_KEY=
RESEND_API_KEY=
FLIGHTAWARE_API_KEY=
```

---

## 13. Domaine
- `fih-rva.com` (**domaine principal — déjà acquis**)

---

## 14. Maintenance & Évolution

- Monitoring : UptimeRobot ou BetterStack
- Logs : Supabase Logs + Sentry (frontend errors)
- Backups Supabase quotidiens (rétention 30 jours)
- Plan de continuité (failover Cloudflare)
- Mises à jour dépendances : Renovate Bot
- Documentation vivante (ce CLAUDE.md + Notion/Confluence interne)

---

**FIN DU DOCUMENT — Version 1.0**

> Ce document est la référence unique pour tous les développeurs travaillant sur le projet. Toute déviation doit être discutée et documentée ici.
