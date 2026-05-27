import { createFileRoute } from '@tanstack/react-router';
import { Phone, MapPin, Globe, ArrowRight, AlertTriangle, FileText, Car } from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/location-voitures')({
  component: LocationVoituresPage,
  head: () => ({
    meta: [
      { title: "Location de voitures — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Louez une voiture à l'arrivée à Kinshasa. Agences internationales et locales disponibles au Terminal International de l'Aéroport de N'djili." },
    ],
  }),
});

const AGENCIES_INTL = [
  {
    name: 'Avis',
    logo: null,
    website: 'avis.com',
    phone: '+243 81 XXX XXXX',
    counter: 'Hall Arrivées — T. International',
    hours: '06h00 – 23h00',
    from: 'dès 60 USD/j',
    note: 'Réservation en ligne disponible',
  },
  {
    name: 'Europcar',
    logo: null,
    website: 'europcar.com',
    phone: '+243 89 XXX XXXX',
    counter: 'Hall Arrivées — T. International',
    hours: '06h00 – 22h00',
    from: 'dès 55 USD/j',
    note: 'Avec ou sans chauffeur',
  },
  {
    name: 'Hertz',
    logo: null,
    website: 'hertz.com',
    phone: '+243 97 XXX XXXX',
    counter: 'Hall Arrivées — T. International',
    hours: '07h00 – 22h00',
    from: 'dès 65 USD/j',
    note: 'Flotte premium disponible',
  },
];

const AGENCIES_LOCAL = [
  {
    name: 'Loxea CD',
    logo: null,
    website: 'loxea.cd',
    phone: '+243 81 XXX XXXX',
    counter: 'Hall Arrivées — T. International',
    hours: '07h00 – 21h00',
    from: 'dès 45 USD/j',
    note: 'Agence congolaise de référence',
  },
  {
    name: 'KinCar Location',
    logo: null,
    website: '',
    phone: '+243 99 XXX XXXX',
    counter: 'Parking P1 — Sortie Terminal',
    hours: '07h00 – 20h00',
    from: 'dès 35 USD/j',
    note: 'Tarifs négociables pour longue durée',
  },
];

const DOCS = [
  { icon: FileText, label: 'Permis de conduire valide', detail: 'Permis national congolais ou international accepté' },
  { icon: FileText, label: 'Passeport ou pièce d\'identité', detail: 'Document valide obligatoire pour toute location' },
  { icon: FileText, label: 'Carte de paiement', detail: 'Visa ou Mastercard pour la caution (USD uniquement)' },
  { icon: FileText, label: 'Dépôt de garantie', detail: 'Entre 200 et 500 USD selon l\'agence et le véhicule' },
];

const DRIVE_TIPS = [
  { title: 'Boulevard Lumumba', desc: 'Axe principal FIH ↔ Centre-ville. Embouteillages importants entre 07h00–09h00 et 16h30–19h30.' },
  { title: 'Code de la route RDC', desc: 'Conduite à droite. Vigilance aux motos (wewa), aux nids de poule et aux carrefours non signalisés.' },
  { title: 'Carburant', desc: 'Stations Total et Cobil disponibles sur le Boulevard Lumumba. Préférez payer en USD.' },
  { title: 'Chauffeur recommandé', desc: 'Pour les visiteurs non familiers de Kinshasa, plusieurs agences proposent un chauffeur local à faible surcoût.' },
];

function AgencyCard({ agency }: { agency: typeof AGENCIES_INTL[0] }) {
  return (
    <div className="border border-[#e8e8e8] bg-white overflow-hidden group hover:border-[#003DA5]/40 transition-colors">
      <div className="px-5 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/8">
            <Car size={16} className="text-[#003DA5]" />
          </div>
          <p className="font-bold text-[#1a1a1a] text-base">{agency.name}</p>
        </div>
        <span className="text-sm font-bold text-[#003DA5]">{agency.from}</span>
      </div>
      <div className="p-5 space-y-2.5 text-xs text-[#555]">
        <div className="flex items-center gap-2">
          <Phone size={12} className="shrink-0 text-[#003DA5]" />
          <a href={`tel:${agency.phone}`} className="hover:text-[#003DA5] transition-colors font-medium">
            {agency.phone}
          </a>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={12} className="shrink-0 mt-0.5 text-[#003DA5]" />
          <span>{agency.counter}</span>
        </div>
        {agency.website && (
          <div className="flex items-center gap-2">
            <Globe size={12} className="shrink-0 text-[#003DA5]" />
            <a href={`https://${agency.website}`} target="_blank" rel="noopener noreferrer"
              className="hover:text-[#003DA5] transition-colors">
              {agency.website}
            </a>
          </div>
        )}
        {agency.note && (
          <p className="mt-3 pt-3 border-t border-[#f0f0f0] text-[#888] italic">{agency.note}</p>
        )}
      </div>
    </div>
  );
}

function LocationVoituresPage() {
  return (
    <main id="main-content">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Location de voitures — Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">
            Stationnement &amp; Transport
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            Location de voitures
          </h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Transport
          </span>
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-5xl px-5 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-[#555] max-w-xl leading-relaxed">
            Des agences internationales et locales sont disponibles directement au hall des arrivées du Terminal International. Réservez à l'avance pour garantir la disponibilité de votre véhicule.
          </p>
          <a
            href="#agences"
            className="shrink-0 flex items-center gap-2 bg-[#003DA5] px-5 py-3 text-sm font-bold text-white hover:bg-[#002a7a] transition-colors"
          >
            Voir les agences <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-16">

        {/* ── Agences internationales ───────────────────────────── */}
        <section id="agences">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Agences internationales
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Présentes au Terminal International
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AGENCIES_INTL.map((a) => <AgencyCard key={a.name} agency={a} />)}
          </div>
        </section>

        {/* ── Agences locales ───────────────────────────────────── */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">
            Agences congolaises
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
            Opérateurs locaux à l'aéroport
          </h2>
          <p className="text-sm text-[#666] mb-8">
            Les agences locales proposent souvent des tarifs plus compétitifs et une meilleure connaissance du terrain kinois. Elles peuvent aussi organiser un chauffeur à la journée.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {AGENCIES_LOCAL.map((a) => <AgencyCard key={a.name} agency={a} />)}
          </div>
        </section>

        {/* ── Documents requis ──────────────────────────────────── */}
        <section className="bg-[#f7f7f2] border border-[#e8e8e8] p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Documents
          </p>
          <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
            Ce qu'il faut prévoir à la prise en charge
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DOCS.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex items-start gap-3 bg-white border border-[#e8e8e8] p-4">
                <div className="shrink-0 flex h-8 w-8 items-center justify-center bg-[#003DA5]/8">
                  <Icon size={14} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">{label}</p>
                  <p className="text-xs text-[#666] mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conduire à Kinshasa ───────────────────────────────── */}
        <section>
          <div className="flex items-start gap-3 mb-8 p-4 border border-amber-200 bg-amber-50">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">À savoir avant de conduire à Kinshasa —</span>{' '}
              La circulation à Kinshasa est dense et les règles de priorité parfois approximatives. Pour les visiteurs non habitués, nous recommandons fortement de recourir à un chauffeur local.
            </p>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">
            Mobilité
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">
            Conduire à Kinshasa — ce qu'il faut savoir
          </h2>
          <div className="grid gap-px bg-[#e8e8e8] sm:grid-cols-2 border border-[#e8e8e8]">
            {DRIVE_TIPS.map(({ title, desc }) => (
              <div key={title} className="bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight size={13} className="text-[#003DA5] shrink-0" />
                  <p className="font-bold text-[#1a1a1a] text-sm">{title}</p>
                </div>
                <p className="text-xs text-[#666] leading-relaxed pl-5">{desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
