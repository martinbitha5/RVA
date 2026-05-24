import { createFileRoute, Link } from '@tanstack/react-router';
import {
  TrendingUp, Users, Plane, Package, Globe,
  ArrowLeft, ArrowRight, Building, CreditCard,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/partenariats-commerciaux/apercu-fih')({
  component: ApercuFihPage,
  head: () => ({
    meta: [
      { title: "Aperçu FIH — Partenariats commerciaux · Aéroport International de N'djili" },
      { name: 'description', content: "Statistiques de trafic 2023, données commerciales et perspectives de croissance du marché congolais pour vos décisions de partenariat à FIH." },
    ],
  }),
});

const TRAFFIC_STATS = [
  { value: '1,8 M',   label: 'Passagers 2023',       growth: '+12%', icon: Users,   color: 'text-rdc-blue' },
  { value: '14 200',  label: 'Vols commerciaux',      growth: '+8%',  icon: Plane,   color: 'text-rdc-blue' },
  { value: '45 000 T',label: 'Fret annuel',           growth: '+22%', icon: Package, color: 'text-amber-500' },
  { value: '17',      label: 'Compagnies aériennes',  growth: '+3',   icon: Globe,   color: 'text-rdc-green' },
];

const COMMERCIAL_STATS = [
  { value: '6 200 m²', label: 'Surface commerciale actuelle' },
  { value: '9 000 m²', label: 'Surface après extension 2027' },
  { value: '34',       label: 'Destinations directes' },
  { value: '4',        label: 'Continents desservis' },
];

const GROWTH_YEARS = [
  { year: '2019', pax: 1.4, base: 78 },
  { year: '2020', pax: 0.7, base: 39 },
  { year: '2021', pax: 0.9, base: 50 },
  { year: '2022', pax: 1.6, base: 89 },
  { year: '2023', pax: 1.8, base: 100 },
];

const ADVANTAGES = [
  {
    icon: Users,
    title: '3ᵉ plus grande ville d\'Afrique sub-saharienne',
    desc: "Kinshasa compte 17 millions d'habitants — un bassin de clientèle et d'affaires exceptionnel pour tout partenaire commercial à FIH.",
  },
  {
    icon: TrendingUp,
    title: 'Croissance continue du trafic',
    desc: "Après la reprise post-Covid, FIH affiche +12% de passagers en 2023 et vise 5 millions de passagers annuels à l'horizon 2027 avec le nouveau terminal.",
  },
  {
    icon: CreditCard,
    title: 'Premier aéroport Mobile Money d\'Afrique centrale',
    desc: "FIH intègre nativement Airtel Money, M-Pesa et Orange Money dans tous ses paiements — un avantage unique sur le marché congolais.",
  },
  {
    icon: Building,
    title: 'Extension terminale 2027',
    desc: "Le nouveau terminal international (capacité : 5M pax/an) ouvre 2 800 m² de surface commerciale supplémentaire avec des espaces premium en zone internationale.",
  },
];

const PASSENGER_PROFILE = [
  { label: 'Voyageurs d\'affaires', pct: 42, color: 'bg-rdc-blue' },
  { label: 'Diaspora congolaise',   pct: 31, color: 'bg-rdc-yellow' },
  { label: 'Tourisme & loisirs',    pct: 18, color: 'bg-rdc-green' },
  { label: 'Autres',                pct: 9,  color: 'bg-muted-foreground' },
];

function ApercuFihPage() {
  return (
    <main id="main-content">

      <PageHero
        image="/images/fih-tarmac.jpg"
        eyebrow="Partenariats · Données marché"
        title="Aperçu FIH"
        subtitle="Statistiques de trafic, profil passagers et perspectives commerciales de l'Aéroport International de N'djili — les données clés pour votre décision de partenariat."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Partenariats commerciaux', href: '/corporate/partenariats-commerciaux' },
          { label: 'Aperçu FIH' },
        ]}
      />

      {/* KPI bar */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-rdc-yellow" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-yellow">Trafic FIH 2023</p>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TRAFFIC_STATS.map(s => (
              <div key={s.label} className="border border-white/10 bg-white/5 p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <s.icon size={18} className={s.color} />
                </div>
                <p className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-2 text-xs text-white/50 leading-snug">{s.label}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-rdc-green">
                  <TrendingUp size={9} /> {s.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trafic passagers — évolution */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

            {/* Graphique textuel */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-rdc-blue" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Évolution du trafic</p>
              </div>
              <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite md:text-3xl">
                Passagers 2019 – 2023 (millions)
              </h2>
              <div className="space-y-3">
                {GROWTH_YEARS.map(y => (
                  <div key={y.year} className="flex items-center gap-4">
                    <span className="w-10 text-xs font-bold text-muted-foreground">{y.year}</span>
                    <div className="flex-1 bg-muted rounded-sm h-7 overflow-hidden">
                      <div
                        className="h-full bg-rdc-blue flex items-center pl-3 transition-all"
                        style={{ width: `${y.base}%` }}
                      >
                        <span className="text-xs font-bold text-white">{y.pax}M</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                * Chute 2020 due aux restrictions COVID-19. Reprise complète en 2022.
              </p>
            </div>

            {/* Profil passagers */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8 bg-rdc-blue" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Profil passagers</p>
              </div>
              <h2 className="font-display mb-6 text-2xl font-bold text-rdc-anthracite md:text-3xl">
                Qui voyage à FIH ?
              </h2>
              <div className="space-y-4">
                {PASSENGER_PROFILE.map(p => (
                  <div key={p.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-semibold text-rdc-anthracite">{p.label}</span>
                      <span className="text-sm font-bold text-rdc-blue">{p.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                La forte proportion de voyageurs d'affaires (42%) et de diaspora (31%) représente un pouvoir d'achat élevé — un profil idéal pour les partenaires commerciaux premium.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chiffres commerciaux */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Infrastructure commerciale</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Espaces & capacités</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMERCIAL_STATS.map(s => (
              <div key={s.label} className="border border-border bg-white p-6 text-center">
                <p className="font-display text-3xl font-bold text-rdc-blue">{s.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi investir */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Avantages compétitifs</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Pourquoi investir à FIH ?
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {ADVANTAGES.map(a => (
              <div key={a.title} className="flex gap-4 border border-border bg-card p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-rdc-blue/10">
                  <a.icon size={20} className="text-rdc-blue" />
                </div>
                <div>
                  <p className="font-bold text-rdc-anthracite mb-2">{a.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-blue">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Prêt à explorer un partenariat ?</p>
              <p className="text-sm text-white/70 mt-1">Notre équipe commerciale vous répond sous 48h ouvrables.</p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <a
                href="mailto:partenariats@aindjili.com"
                className="flex items-center gap-2 bg-rdc-yellow px-5 py-2.5 text-sm font-bold text-rdc-anthracite hover:bg-white transition-colors"
              >
                partenariats@aindjili.com <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-muted/30 border-t border-border">
        <div className="container py-8">
          <div className="flex flex-wrap gap-4">
            <Link
              to="/corporate/partenariats-commerciaux"
              className="flex items-center gap-2 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              <ArrowLeft size={13} /> Partenariats commerciaux
            </Link>
            <Link
              to="/corporate/services-aeriens/fret"
              className="flex items-center gap-2 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80 transition-colors"
            >
              Fret & Cargo <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
