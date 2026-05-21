import { createFileRoute, Link } from '@tanstack/react-router';
import {
  PlaneTakeoff, PlaneLanding, Shield, Stethoscope, Wifi,
  Banknote, PackageSearch, Accessibility, Shuffle,
  ScrollText, Users, ArrowRight, AlertTriangle,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/guide/')({
  component: GuideHub,
  head: () => ({
    meta: [
      { title: "Guide de l'Aéroport — N'djili · FIH" },
      { name: 'description', content: "Tout ce qu'il faut savoir avant, pendant et après votre passage à l'Aéroport International de N'djili (FIH), Kinshasa." },
    ],
  }),
});

const JOURNEY = [
  {
    phase: '01',
    label: 'Quitter Kinshasa',
    href: '/guide/quitter-kinshasa',
    icon: PlaneTakeoff,
    desc: 'Enregistrement, sécurité, immigration DGM — procédures de départ pas à pas.',
    accent: '#003DA5',
  },
  {
    phase: '02',
    label: 'Sécurité & Bagages',
    href: '/guide/securite-bagages',
    icon: Shield,
    desc: 'Objets interdits, liquides, bagages en soute et règles en vigueur à FIH.',
    accent: '#CE1126',
  },
  {
    phase: '03',
    label: 'Atterrir à Kinshasa',
    href: '/guide/atterrir-kinshasa',
    icon: PlaneLanding,
    desc: 'Contrôle passeport DGM, douanes DGDA, réclamation bagages et sortie.',
    accent: '#009A44',
  },
  {
    phase: '04',
    label: 'Douanes & Immigration',
    href: '/guide/douanes-immigration',
    icon: ScrollText,
    desc: "Formalités DGM et DGDA — déclarations, visa à l'arrivée, carnet jaune.",
    accent: '#FFCE00',
  },
] as const;

const SERVICES = [
  { icon: Shuffle, href: '/guide/correspondances', label: 'Correspondances', desc: 'Transiter à FIH — procédures et délais minimum.' },
  { icon: Stethoscope, href: '/guide/sante', label: 'Santé', desc: 'Centre médical, fièvre jaune, carnet OMS.' },
  { icon: Wifi, href: '/guide/wifi-connectivite', label: 'Wi-Fi & Connectivité', desc: 'Wi-Fi gratuit et couverture mobile Vodacom / Airtel / Orange.' },
  { icon: Banknote, href: '/guide/services-bancaires', label: 'Services bancaires', desc: 'ATM Rawbank, Equity BCDC, TMB et change de devises.' },
  { icon: PackageSearch, href: '/guide/objets-trouves', label: 'Objets trouvés', desc: 'Déclarez un objet perdu ou récupérez un bien trouvé à FIH.' },
  { icon: Users, href: '/guide/passagers-mineurs', label: 'Mineurs non accompagnés', desc: 'Service UM — procédures et frais de supervision.' },
  { icon: Accessibility, href: '/guide/passagers-handicap', label: 'Personnes à mobilité réduite', desc: 'Assistance fauteuil, accès PMR et services adaptés.' },
] as const;

function GuideHub() {
  return (
    <>
      <PageHero
        eyebrow="Guide de l'aéroport"
        title="Votre passage à FIH, simplifié"
        subtitle="Tout ce qu'il faut savoir avant, pendant et après votre vol depuis ou vers l'Aéroport International de N'djili — départs, arrivées, correspondances."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: "Guide de l'aéroport" }]}
        cta={
          <div className="flex flex-wrap gap-3">
            <Link to={'/guide/quitter-kinshasa' as never} className="btn-primary">
              <PlaneTakeoff size={15} /> Je pars de Kinshasa
            </Link>
            <Link to={'/guide/atterrir-kinshasa' as never} className="btn-outline-white">
              <PlaneLanding size={15} /> J'arrive à Kinshasa
            </Link>
          </div>
        }
      />

      {/* Yellow fever alert */}
      <div className="bg-rdc-yellow/10 border-b-2 border-rdc-yellow">
        <div className="container py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-rdc-anthracite shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-rdc-anthracite">
                Vaccination contre la fièvre jaune obligatoire
              </p>
              <p className="text-xs text-rdc-anthracite/70 mt-0.5">
                Le carnet de vaccination international (carnet jaune OMS) est exigé pour entrer en RDC.
                Sans ce document, l'accès peut être refusé aux postes de contrôle sanitaire.
              </p>
            </div>
            <Link
              to={'/guide/sante' as never}
              className="shrink-0 text-xs font-bold text-rdc-anthracite underline hover:no-underline"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>

      {/* Journey steps */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Votre parcours</p>
          </div>
          <h2 className="display-sub text-rdc-anthracite mb-12">
            Les étapes clés à FIH
          </h2>

          <div className="grid gap-0.5 bg-border sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((step) => (
              <Link
                key={step.href}
                to={step.href as never}
                className="group relative bg-white p-8 flex flex-col gap-4 overflow-hidden hover:bg-rdc-blue/2 transition-colors"
              >
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: step.accent }}
                />

                <span
                  className="font-display text-6xl font-bold leading-none"
                  style={{ color: `${step.accent}18` }}
                >
                  {step.phase}
                </span>

                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ background: `${step.accent}12`, border: `1px solid ${step.accent}25` }}
                >
                  <step.icon size={22} style={{ color: step.accent }} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-display font-bold text-rdc-anthracite text-lg leading-snug group-hover:text-rdc-blue transition-colors">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-rdc-blue mt-auto">
                  Lire le guide
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="section-night py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Services à bord</p>
          </div>
          <h2 className="display-sub text-white mb-10">
            Tous nos services disponibles
          </h2>

          <div className="grid gap-0.5 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                to={s.href as never}
                className="group bg-rdc-anthracite p-6 flex flex-col gap-4 hover:bg-white/5 transition-colors relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-rdc-yellow transition-all duration-500" />
                <div className="flex h-11 w-11 items-center justify-center bg-white/8 border border-white/10">
                  <s.icon size={20} className="text-white/60" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base group-hover:text-rdc-yellow transition-colors">
                    {s.label}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/40 leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white/20 group-hover:text-white/50 transition-colors mt-auto">
                  Voir <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-border py-0">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4">
          {[
            { value: '2', label: 'Terminaux', sub: 'International + Domestique' },
            { value: '24h', label: 'Ouverture', sub: 'Opérations non-stop' },
            { value: '50+', label: 'Services', sub: 'Commerces et assistance' },
            { value: '1953', label: 'Fondation', sub: 'Histoire de FIH' },
          ].map((s) => (
            <div key={s.label} className="bg-white px-8 py-10 text-center">
              <p className="font-display text-4xl font-bold text-rdc-blue">{s.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-rdc-anthracite">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
