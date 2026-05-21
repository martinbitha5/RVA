import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { BarChart3, Store, Eye, Building, ChevronRight, ArrowRight, TrendingUp } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/partenariats-commerciaux')({
  component: PartenariatsPage,
  head: () => ({ meta: [{ title: "Partenariats commerciaux — Aéroport International de N'djili · FIH" }] }),
});

const SUB_SECTIONS = [
  {
    href: '/corporate/partenariats/apercu-fih',
    Icon: BarChart3,
    label: 'Aperçu FIH',
    desc: 'Statistiques trafic 2023, données commerciales et perspectives de croissance du marché congolais.',
  },
  {
    href: '/corporate/partenariats/concessions',
    Icon: Store,
    label: 'Concessions',
    desc: 'Appels d\'offres et concessions disponibles pour les espaces commerciaux des terminaux.',
  },
  {
    href: '/corporate/partenariats/visibilite',
    Icon: Eye,
    label: 'Visibilité & Publicité',
    desc: 'Espaces publicitaires, écrans numériques et solutions de branding dans les terminaux internationaux.',
  },
  {
    href: '/corporate/partenariats/immobilier',
    Icon: Building,
    label: 'Immobilier aéroportuaire',
    desc: 'Location d\'espaces bureaux, hangars, entrepôts et locaux commerciaux en zone aéroportuaire.',
  },
] as const;

const TRAFFIC_STATS = [
  { label: 'Passagers 2023',        value: '1,8 M',    unit: '+12%' },
  { label: 'Vols commerciaux',      value: '14 200',   unit: '+8%' },
  { label: 'Tonnes de fret',        value: '45 000',   unit: '+22%' },
  { label: 'Compagnies aériennes',  value: '17',       unit: '+3' },
];

const OPPORTUNITIES = [
  {
    icon: '✈️',
    title: 'Hub stratégique Afrique centrale',
    desc: 'Kinshasa est la 3ᵉ plus grande ville d\'Afrique sub-saharienne. FIH dessert directement 34 destinations sur 4 continents avec 17 compagnies aériennes.',
  },
  {
    icon: '📈',
    title: 'Croissance du marché',
    desc: 'Le trafic passagers a progressé de +12% en 2023. La nouvelle capacité terminale (2027 : 5M pax/an) ouvre des perspectives commerciales uniques.',
  },
  {
    icon: '💳',
    title: 'Intégration Mobile Money',
    desc: 'FIH est le premier aéroport d\'Afrique centrale à intégrer nativement Airtel Money, M-Pesa et Orange Money dans tous ses services commerciaux.',
  },
  {
    icon: '🌐',
    title: '6 200 m² commerciaux',
    desc: 'Surface commerciale actuelle en cours d\'extension à 9 000 m² avec l\'ouverture du nouveau terminal international en 2027.',
  },
];

function PartenariatsPage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-tarmac.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Partenariats commerciaux' },
        ]}
        eyebrow="Corporate · Développement"
        title={t('corporate.partnerships')}
        subtitle={t('corporate.partnershipsSubtitle')}
        cta={
          <a
            href="mailto:partenariats@fih.cd"
            className="inline-flex items-center gap-2 bg-rdc-yellow px-6 py-3 text-sm font-bold text-rdc-anthracite hover:bg-white transition-colors"
          >
            Nous contacter <ArrowRight size={14} />
          </a>
        }
      />

      {/* Traffic stats band */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="mb-8 flex items-center gap-4">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Trafic FIH 2023</p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {TRAFFIC_STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className="font-display text-4xl font-bold text-rdc-yellow">{s.value}</p>
                <p className="mt-2 text-xs text-white/50">{s.label}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-rdc-green">
                  <TrendingUp size={10} /> {s.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why FIH */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Pourquoi FIH ?</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Un marché à fort potentiel
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {OPPORTUNITIES.map(o => (
              <div key={o.title} className="flex gap-4 border border-border bg-card p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-rdc-blue/5 text-2xl">
                  {o.icon}
                </div>
                <div>
                  <p className="font-bold text-rdc-anthracite mb-2">{o.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Opportunités</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Partenariats disponibles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUB_SECTIONS.map(({ href, Icon, label, desc }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-border bg-background p-6 hover:border-rdc-blue/40 hover:shadow-lg transition-all"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-rdc-blue/10">
                  <Icon size={20} className="text-rdc-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-rdc-anthracite group-hover:text-rdc-blue transition-colors mb-1">{label}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0 mt-1 group-hover:text-rdc-blue transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-blue">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Intéressé par un partenariat à FIH ?</p>
              <p className="text-sm text-white/65 mt-1">Notre équipe commerciale vous répond sous 48h ouvrables.</p>
            </div>
            <a
              href="mailto:partenariats@fih.cd"
              className="flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-rdc-blue hover:bg-rdc-yellow transition-colors whitespace-nowrap"
            >
              partenariats@fih.cd <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
