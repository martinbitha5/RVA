import { createFileRoute, Link } from '@tanstack/react-router';
import {
  PlaneTakeoff, PlaneLanding, Shield, Stethoscope, Wifi,
  Banknote, PackageSearch, Accessibility, Shuffle,
  ScrollText, Users, ArrowRight, ChevronRight,
  CheckCircle, Syringe,
} from 'lucide-react';

export const Route = createFileRoute('/guide/')({
  component: GuideHub,
  head: () => ({
    meta: [
      { title: "Guide de l'Aéroport — N'djili · FIH" },
      { name: 'description', content: "Tout ce qu'il faut savoir avant, pendant et après votre passage à l'Aéroport International de N'djili (FIH), Kinshasa." },
    ],
  }),
});

/* ─── Data ───────────────────────────────────────────────────────────────── */

const DEPART_STEPS = [
  'Enregistrement & bagages',
  'Contrôle de sécurité',
  'Formalités DGM — passeport',
  'Zone réglementée & embarquement',
];

const ARRIVEE_STEPS = [
  'Carnet jaune OMS — contrôle santé',
  'Contrôle passeport DGM',
  'Récupération des bagages',
  'Douanes DGDA & sortie',
];

const JOURNEY = [
  {
    phase: '01',
    label: 'Quitter Kinshasa',
    href: '/guide/quitter-kinshasa',
    Icon: PlaneTakeoff,
    desc: 'Enregistrement, sécurité, immigration DGM — procédures de départ pas à pas.',
    color: '#003DA5',
    colorLight: '#003DA510',
  },
  {
    phase: '02',
    label: 'Sécurité & Bagages',
    href: '/guide/securite-bagages',
    Icon: Shield,
    desc: 'Objets interdits, liquides, bagages en soute et règles en vigueur à FIH.',
    color: '#CE1126',
    colorLight: '#CE112610',
  },
  {
    phase: '03',
    label: 'Atterrir à Kinshasa',
    href: '/guide/atterrir-kinshasa',
    Icon: PlaneLanding,
    desc: 'Contrôle passeport DGM, douanes DGDA, réclamation bagages et sortie.',
    color: '#009A44',
    colorLight: '#009A4410',
  },
  {
    phase: '04',
    label: 'Douanes & Immigration',
    href: '/guide/douanes-immigration',
    Icon: ScrollText,
    desc: "Formalités DGM et DGDA — déclarations, visa à l'arrivée, carnet jaune OMS.",
    color: '#B8940A',
    colorLight: '#FFCE0015',
  },
] as const;

const SERVICES = [
  { Icon: Shuffle,        href: '/guide/correspondances',     label: 'Correspondances',          desc: 'Transiter à FIH — procédures et délais minimum de connexion.' },
  { Icon: Stethoscope,   href: '/guide/sante',               label: 'Santé & Vaccination',       desc: 'Centre médical FIH, fièvre jaune, carnet OMS, paludisme.' },
  { Icon: Wifi,           href: '/guide/wifi-connectivite',   label: 'Wi-Fi & Connectivité',      desc: 'RAM WiFi gratuit et illimité, Vodacom / Airtel / Orange.' },
  { Icon: Banknote,       href: '/guide/services-bancaires',  label: 'Services bancaires',        desc: 'ATM Rawbank, Equity BCDC, TMB et bureaux de change USD/CDF.' },
  { Icon: PackageSearch,  href: '/guide/objets-trouves',      label: 'Objets trouvés',            desc: 'Déclarez un objet perdu ou récupérez un bien trouvé à FIH.' },
  { Icon: Users,          href: '/guide/passagers-mineurs',   label: 'Mineurs non accompagnés',   desc: 'Service UM — procédures et accompagnement sécurisé.' },
  { Icon: Accessibility,  href: '/guide/passagers-handicap',  label: 'Mobilité réduite (PMR)',    desc: 'Assistance fauteuil, accès adapté et services spécialisés.' },
] as const;

/* ─── Page ───────────────────────────────────────────────────────────────── */
function GuideHub() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0D1626]">
        <img
          src="/images/fih-hero-1.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-center pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#0D1626]"
          style={{ clipPath: 'polygon(0 0, 55% 0, 68% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-16 md:py-24">
          <nav className="mb-5 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Guide de l'Aéroport</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5 bg-rdc-yellow"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Guide de l'Aéroport</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Votre passage<br />à FIH, simplifié
          </h1>
          <p className="mt-4 max-w-md text-white/60 md:text-lg">
            Tout ce qu'il faut savoir avant, pendant et après votre vol depuis ou vers Kinshasa N'djili.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={'/guide/quitter-kinshasa' as never}
              className="inline-flex items-center gap-2 bg-[#003DA5] px-5 py-3 text-sm font-bold text-white hover:bg-[#003DA5]/90 transition-colors"
            >
              <PlaneTakeoff size={15} /> Je pars de Kinshasa
            </Link>
            <Link
              to={'/guide/atterrir-kinshasa' as never}
              className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <PlaneLanding size={15} /> J'arrive à Kinshasa
            </Link>
          </div>
        </div>
      </div>

      {/* ── Alerte fièvre jaune ──────────────────────────────────────────── */}
      <div className="border-b-2 border-red-300 bg-red-50">
        <div className="container py-4">
          <div className="flex items-start gap-3">
            <Syringe size={16} className="mt-0.5 flex-shrink-0 text-red-600" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-900">Vaccination contre la fièvre jaune — OBLIGATOIRE</p>
              <p className="mt-0.5 text-xs text-red-700">
                Le carnet de vaccination international (carnet jaune OMS) est exigé à l'entrée ET à la sortie de RDC. Vérifiez votre carnet avant de voyager.
              </p>
            </div>
            <Link
              to={'/guide/sante' as never}
              className="flex-shrink-0 text-xs font-bold text-red-700 underline hover:no-underline"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>

      {/* ── Deux parcours (Départ / Arrivée) ────────────────────────────── */}
      <section className="bg-[#F7F7F7] py-12 md:py-16">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Votre parcours</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Deux parcours, un seul guide
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {/* Départ */}
            <div className="overflow-hidden bg-white shadow-sm">
              <div className="flex items-center gap-4 bg-[#003DA5] px-6 py-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-white/20">
                  <PlaneTakeoff size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">Je pars de Kinshasa</p>
                  <p className="text-xs text-white/60">Procédures de départ — Terminal International</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-3">
                  {DEPART_STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-[#003DA5] text-[10px] font-black text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-[#333]">{step}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={'/guide/quitter-kinshasa' as never}
                  className="inline-flex items-center gap-2 bg-[#003DA5] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#003DA5]/90 transition-colors"
                >
                  Voir le guide départ <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Arrivée */}
            <div className="overflow-hidden bg-white shadow-sm">
              <div className="flex items-center gap-4 bg-[#009A44] px-6 py-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-white/20">
                  <PlaneLanding size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">J'arrive à Kinshasa</p>
                  <p className="text-xs text-white/60">Procédures d'arrivée — de l'avion à la sortie</p>
                </div>
              </div>
              <div className="p-6">
                <ul className="mb-6 space-y-3">
                  {ARRIVEE_STEPS.map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-[#009A44] text-[10px] font-black text-white">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-[#333]">{step}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={'/guide/atterrir-kinshasa' as never}
                  className="inline-flex items-center gap-2 bg-[#009A44] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#009A44]/90 transition-colors"
                >
                  Voir le guide arrivée <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Étapes clés ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Guides détaillés</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Les étapes clés à FIH
          </h2>

          <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4" style={{ background: '#E8E8E8' }}>
            {JOURNEY.map((step) => (
              <Link
                key={step.href}
                to={step.href as never}
                className="group relative flex flex-col gap-4 overflow-hidden bg-white p-7 transition-colors hover:bg-[#FAFAFA]"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: step.color }}
                />
                <span
                  className="font-display text-6xl font-bold leading-none select-none"
                  style={{ color: `${step.color}14` }}
                >
                  {step.phase}
                </span>
                <div
                  className="flex h-11 w-11 items-center justify-center border"
                  style={{ background: step.colorLight, borderColor: `${step.color}25` }}
                >
                  <step.Icon size={20} style={{ color: step.color }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-rdc-anthracite leading-snug transition-colors group-hover:text-rdc-blue">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs font-bold text-rdc-blue">
                  Lire le guide
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0D1626] py-12 md:py-16">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-[#FFCE00]">À votre service</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-white md:text-3xl">
            Tous les services disponibles
          </h2>

          <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-4" style={{ background: '#1A2535' }}>
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group relative flex flex-col gap-4 overflow-hidden bg-[#0D1626] p-6 transition-colors hover:bg-[#0A1F40]"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FFCE00] transition-all duration-500 group-hover:w-full" />
                <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/5">
                  <s.Icon size={18} className="text-white/50" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white transition-colors group-hover:text-[#FFCE00]">
                    {s.label}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/40">{s.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold text-white/25 transition-colors group-hover:text-white/60">
                  Voir <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Checklist rapide ─────────────────────────────────────────────── */}
      <section className="bg-[#F7F7F7] py-12 md:py-16">
        <div className="container">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Avant de voyager</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Checklist essentielle
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Carnet jaune OMS — fièvre jaune (OBLIGATOIRE)', href: '/guide/sante',               urgent: true  },
              { label: 'Passeport valide 6 mois minimum',               href: '/guide/douanes-immigration',  urgent: false },
              { label: 'Visa ou eVisa RDC selon nationalité',           href: '/guide/douanes-immigration',  urgent: false },
              { label: 'Assurance voyage avec rapatriement médical',    href: '/guide/sante',                urgent: false },
              { label: 'Prophylaxie antipaludéenne recommandée',        href: '/guide/sante',                urgent: false },
              { label: 'Monnaie : USD fortement conseillé en RDC',      href: '/guide/services-bancaires',   urgent: false },
            ].map(({ label, href, urgent }) => (
              <Link
                key={label}
                to={href as never}
                className="group flex items-start gap-3 border border-[#E0E0E0] bg-white p-4 transition-colors hover:border-rdc-blue/30 hover:bg-[#F0F4FF]"
              >
                <CheckCircle
                  size={15}
                  className={`mt-0.5 flex-shrink-0 ${urgent ? 'text-red-500' : 'text-rdc-green'}`}
                />
                <span className={`text-sm leading-snug transition-colors group-hover:text-rdc-blue ${urgent ? 'font-bold text-red-900' : 'text-[#333]'}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: '#E0E0E0' }}>
        {[
          { value: '2',    label: 'Terminaux',  sub: 'International + Domestique' },
          { value: '24h',  label: 'Ouverture',  sub: 'Opérations non-stop'        },
          { value: '50+',  label: 'Services',   sub: 'Commerces et assistance'    },
          { value: '1953', label: 'Fondation',  sub: 'Histoire de N\'djili'       },
        ].map((s) => (
          <div key={s.label} className="bg-white px-8 py-10 text-center">
            <p className="font-display text-4xl font-bold text-rdc-blue">{s.value}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-rdc-anthracite">{s.label}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
