import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Package, TrendingUp, Thermometer, AlertTriangle, Clock,
  CheckCircle, ArrowLeft, ArrowRight, Truck, FileText, Globe,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/services-aeriens/fret')({
  component: FretPage,
  head: () => ({
    meta: [
      { title: "Fret & Cargo — Services aériens · Aéroport International de N'djili" },
      { name: 'description', content: "Transport de fret et cargo à l'aéroport FIH de Kinshasa — 45 000 tonnes/an, zone froide, transit 24h/24, intégration DGDA." },
    ],
  }),
});

const CARGO_STATS = [
  { value: '45 000 T', label: 'Volume total 2023', growth: '+22%', color: 'text-amber-500' },
  { value: '18 200 T', label: 'Exportations',      growth: '+18%', color: 'text-amber-500' },
  { value: '26 800 T', label: 'Importations',      growth: '+25%', color: 'text-amber-500' },
  { value: '8',        label: 'Compagnies fret',   growth: '+2',   color: 'text-amber-500' },
];

const SERVICES = [
  {
    icon: Package,
    title: 'Fret général import/export',
    desc: "Traitement des marchandises générales : textiles, équipements industriels, matériaux de construction, produits manufacturés. Zone de stockage de 12 000 m² avec accès 24h/24.",
    highlights: ['12 000 m² entrepôts', 'Accès 24h/24 — 7j/7', 'Pesée certifiée IATA'],
  },
  {
    icon: Thermometer,
    title: "Chaîne du froid (cold chain)",
    desc: "Installation frigorifique dédiée pour les denrées périssables, produits pharmaceutiques et vaccins. Capacité 800 m³ à température contrôlée entre -20°C et +15°C.",
    highlights: ['-20°C à +15°C', '800 m³ de capacité', 'Certifié GDP pharmaceutique'],
  },
  {
    icon: AlertTriangle,
    title: 'Matières dangereuses (DGR)',
    desc: "Traitement des marchandises dangereuses selon la réglementation IATA DGR. Personnel certifié, zone de stockage séparée et documentation complète MSDS.",
    highlights: ['Certifié IATA DGR Cat. 6', 'Personnel habilité', 'Zone DGR séparée'],
  },
  {
    icon: FileText,
    title: 'Dédouanement DGDA intégré',
    desc: "Bureau de douane (DGDA) intégré à la zone fret pour un traitement accéléré. Système SYDONIA++ en usage. Guichet unique import/export opérationnel sur le site.",
    highlights: ['DGDA sur site 24h/24', 'Système SYDONIA++', 'Guichet unique douanier'],
  },
  {
    icon: Truck,
    title: 'Fret express & courrier',
    desc: "Partenariat avec FedEx Express et DHL Aviation pour le traitement prioritaire du fret express. Livraison centre-ville Kinshasa en 2h après dédouanement.",
    highlights: ['FedEx & DHL sur site', 'Express 24h/24', 'Tracking en temps réel'],
  },
  {
    icon: Globe,
    title: 'Transit international',
    desc: "FIH est un hub de transit régional pour l'Afrique centrale. Entrepôt de transit sous douane avec connexions directes vers Lubumbashi, Goma, Mbuji-Mayi et les villes intérieures.",
    highlights: ['Hub Afrique centrale', 'Transit sous douane', '10 destinations domestiques'],
  },
];

const CARGO_AIRLINES = [
  { name: 'Ethiopian Cargo',       code: 'ET', freq: '5×/sem' },
  { name: 'Turkish Cargo',         code: 'TK', freq: '3×/sem' },
  { name: 'Brussels Airlines Cargo', code: 'SN', freq: '4×/sem' },
  { name: 'Air France Cargo',      code: 'AF', freq: '3×/sem' },
  { name: 'Kenya Airways Cargo',   code: 'KQ', freq: '4×/sem' },
  { name: 'EgyptAir Cargo',        code: 'MS', freq: '2×/sem' },
  { name: 'FedEx Express',         code: 'FX', freq: 'quotidien' },
  { name: 'DHL Aviation',          code: 'DH', freq: 'quotidien' },
];

const PROCESS_STEPS = [
  { n: '01', title: 'Réservation & AWB', desc: "Contactez votre compagnie cargo ou agent IATA pour réserver votre espace fret et obtenir la Lettre de Transport Aérien (LTA/AWB)." },
  { n: '02', title: 'Dépôt en entrepôt', desc: "Apportez votre marchandise à l'entrepôt fret de FIH (accès côté piste, route de la Tshangu). Pesée et vérification dimensions IATA." },
  { n: '03', title: 'Déclaration douanière', desc: "Remise des documents DGDA (facture commerciale, liste de colisage, certificats d'origine). Le bureau DGDA est sur site." },
  { n: '04', title: 'Chargement & départ', desc: "Intégration en soute ou sur vol tout-cargo. Confirmation de chargement transmise à l'expéditeur avec numéro de tracking AWB." },
];

function FretPage() {
  return (
    <main id="main-content">

      <PageHero
        image="/images/fih-hero-1.jpg"
        eyebrow="Services aériens · Cargo"
        title="Fret & Cargo"
        subtitle="L'Aéroport de N'djili est le principal hub de fret d'Afrique centrale — 45 000 tonnes traitées en 2023, avec une infrastructure moderne et une intégration complète DGDA."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Services aériens', href: '/corporate/services-aeriens' },
          { label: 'Fret & Cargo' },
        ]}
      />

      {/* Stats */}
      <div className="bg-[#1A0F00]">
        <div className="container py-12 md:py-14">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Volumes fret FIH 2023</p>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {CARGO_STATS.map(s => (
              <div key={s.label} className="border border-white/10 bg-white/5 p-6 text-center">
                <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                  <TrendingUp size={9} /> {s.growth} vs 2022
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Services disponibles</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Infrastructure fret complète
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => (
              <div key={s.title} className="flex flex-col border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-3 bg-amber-500/10 px-5 py-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-amber-500/20">
                    <s.icon size={16} className="text-amber-600" />
                  </div>
                  <p className="font-bold text-rdc-anthracite text-sm">{s.title}</p>
                </div>
                <div className="flex-1 p-5">
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="space-y-1.5">
                    {s.highlights.map(h => (
                      <div key={h} className="flex items-center gap-2">
                        <CheckCircle size={11} className="flex-shrink-0 text-amber-500" />
                        <p className="text-xs text-muted-foreground">{h}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Processus */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Mode opératoire</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">
            Comment expédier via FIH ?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map(s => (
              <div key={s.n} className="border border-border bg-white p-6">
                <p className="font-display mb-4 text-4xl font-black text-amber-500/30 leading-none">{s.n}</p>
                <p className="mb-2 font-bold text-rdc-anthracite">{s.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opérateurs cargo */}
      <div className="bg-background">
        <div className="container py-12 md:py-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Opérateurs</p>
          </div>
          <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite">
            Compagnies cargo opérant à FIH
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {CARGO_AIRLINES.map(a => (
              <div key={a.name} className="flex items-center gap-3 border border-border bg-card px-4 py-3">
                <span className="flex h-8 w-10 flex-shrink-0 items-center justify-center bg-amber-500/10 text-[10px] font-bold text-amber-600">
                  {a.code}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rdc-anthracite truncate">{a.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    <Clock size={9} className="inline mr-0.5" />{a.freq}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-amber-500">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Expédier du fret via FIH ?</p>
              <p className="text-sm text-white/75 mt-1">Contactez notre service cargo pour un devis ou pour réserver votre espace fret.</p>
            </div>
            <a
              href="mailto:cargo@fih.cd"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-amber-700 hover:bg-rdc-anthracite hover:text-white transition-colors whitespace-nowrap"
            >
              cargo@fih.cd <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-muted/30 border-t border-border">
        <div className="container py-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/corporate/services-aeriens"
              className="flex items-center gap-2 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              <ArrowLeft size={13} /> Services aériens
            </Link>
            <Link
              to="/corporate/partenariats-commerciaux"
              className="flex items-center gap-2 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              Partenariats commerciaux <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
