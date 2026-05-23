import { createFileRoute, Link } from '@tanstack/react-router';
import {
  School, Stethoscope, Hammer, Palette, Leaf,
  Users, CheckCircle, ArrowLeft, ArrowRight, MapPin,
} from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/communaute/relations-communaute/initiatives')({
  component: InitiativesPage,
  head: () => ({
    meta: [
      { title: "Initiatives locales — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "FIH investit dans les communes riveraines de Nsele, Masina, Kimbanseke — éducation, santé, formation, culture et environnement." },
    ],
  }),
});

const INITIATIVES = [
  {
    id: 'ecoles-nsele',
    name: 'Programme Écoles de Nsele',
    commune: 'Nsele',
    icon: School,
    bg: 'bg-rdc-blue',
    text: 'text-rdc-blue',
    status: 'active' as const,
    beneficiaries: '4 200 élèves',
    budget: '800 000 USD',
    period: '2021 – actif',
    description: "Réhabilitation de 8 écoles primaires dans la commune de Nsele, fourniture de matériel scolaire pour 4 200 élèves et mise en place de bourses d'excellence pour les lycéens méritants de la zone riveraine de l'aéroport.",
    achievements: [
      '8 écoles primaires réhabilitées et équipées',
      '4 200 kits scolaires distribués chaque année',
      "45 bourses d'excellence accordées aux lycéens",
      '12 enseignants formés en pédagogie moderne',
    ],
  },
  {
    id: 'sante-masina',
    name: 'Centre de Santé Masina',
    commune: 'Masina',
    icon: Stethoscope,
    bg: 'bg-rdc-red',
    text: 'text-rdc-red',
    status: 'active' as const,
    beneficiaries: '15 000 patients/an',
    budget: '1 200 000 USD',
    period: '2022 – actif',
    description: "Construction et équipement d'un centre de santé communautaire de 30 lits avec service de maternité, pédiatrie et pharmacie subventionnée. Ce centre dessert les habitants de Masina directement exposés aux nuisances de l'aéroport.",
    achievements: [
      "30 lits d'hospitalisation opérationnels",
      'Service maternité — 200 naissances par an',
      'Pharmacie subventionnée à 60% pour les riverains',
      '15 000 consultations annuelles',
    ],
  },
  {
    id: 'formation-kimbanseke',
    name: 'Formation Professionnelle FIH',
    commune: 'Kimbanseke',
    icon: Hammer,
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    status: 'active' as const,
    beneficiaries: '200 jeunes/an',
    budget: '400 000 USD',
    period: '2020 – actif',
    description: "Formation gratuite aux métiers de l'aéroport — sûreté, accueil, maintenance, manutention — pour les jeunes des communes riveraines. Priorité accordée aux résidents de Kimbanseke, Masina et Nsele âgés de 18 à 30 ans.",
    achievements: [
      '600 jeunes formés depuis le lancement en 2020',
      "68% d'insertion professionnelle dans le secteur aérien",
      '8 filières de formation certifiantes disponibles',
      'Partenariat avec 12 entreprises aéroportuaires locales',
    ],
  },
  {
    id: 'fih-art',
    name: 'Programme FIH Art',
    commune: 'Kinshasa',
    icon: Palette,
    bg: 'bg-[#1A1500]',
    text: 'text-rdc-yellow',
    status: 'active' as const,
    beneficiaries: '25 artistes exposés',
    budget: '250 000 USD',
    period: '2019 – actif',
    description: "Exposition permanente des artistes congolais dans les espaces des terminaux internationaux de FIH. Peintures, sculptures et installations signées par les maîtres et les jeunes talents de Kinshasa, célébrant la richesse culturelle de la RDC.",
    achievements: [
      '25 artistes exposés en permanence dans les terminaux',
      '120 œuvres originales acquises par la RVA',
      'Chéri Samba, Moke, Bodo — maîtres exposés',
      "8 jeunes talents de l'Académie des Beaux-Arts soutenus",
    ],
  },
  {
    id: 'reboisement-nsele',
    name: 'Reboisement Nsele',
    commune: "N'djili / Nsele",
    icon: Leaf,
    bg: 'bg-rdc-green',
    text: 'text-rdc-green',
    status: 'planned' as const,
    beneficiaries: '10 000 arbres',
    budget: '350 000 USD',
    period: '2024 – 2026',
    description: "Plantation de 10 000 arbres endémiques du bassin du Congo sur les terrains RVA et dans les communes riveraines, afin de réduire l'empreinte environnementale de l'aéroport et améliorer le cadre de vie des habitants.",
    achievements: [
      "10 000 arbres à planter d'ici fin 2026",
      'Espèces endémiques du bassin du Congo uniquement',
      '15 ha de terrains RVA reboisés',
      '500 volontaires locaux impliqués dans la plantation',
    ],
  },
];

const STATS = [
  { value: '25 000+', label: 'Bénéficiaires directs', accent: 'text-rdc-blue' },
  { value: '5',       label: 'Programmes actifs',     accent: 'text-rdc-blue' },
  { value: '3 M $',   label: 'Investi en 2023',       accent: 'text-rdc-blue' },
  { value: '12',      label: 'Partenaires ONG',        accent: 'text-rdc-blue' },
];

function InitiativesPage() {
  return (
    <main id="main-content">

      <PageHero
        image="/images/fih-hero-2.jpg"
        eyebrow="Communauté"
        title="Initiatives locales"
        subtitle="FIH investit concrètement dans les communes de Nsele, Masina, Kimbanseke et N'djili — éducation, santé, formation, culture et environnement."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Communauté', href: '/communaute' },
          { label: 'Relations communautaires', href: '/communaute/relations-communaute' },
          { label: 'Initiatives locales' },
        ]}
      />

      {/* Stats rapides */}
      <div className="border-b border-border bg-white">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center justify-center py-7 text-center">
                <span className={`font-display text-3xl font-black ${s.accent}`}>{s.value}</span>
                <span className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-14 md:py-20">

        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-blue">Nos programmes</p>
          </div>
          <h2 className="font-display text-2xl font-bold text-rdc-anthracite md:text-3xl">
            5 initiatives en cours dans les communes riveraines
          </h2>
        </div>

        {/* Initiatives — alternance image/contenu */}
        <div className="space-y-16">
          {INITIATIVES.map((init, idx) => (
            <article key={init.id} className="grid gap-8 lg:grid-cols-2 lg:items-stretch">

              {/* Panneau coloré */}
              <div className={`flex flex-col justify-between p-8 md:p-10 ${init.bg} ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div>
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center bg-white/20">
                      <init.icon size={26} className="text-white" />
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      init.status === 'active' ? 'bg-white/20 text-white' : 'bg-black/20 text-white'
                    }`}>
                      {init.status === 'active' ? '● Actif' : '○ Planifié'}
                    </span>
                  </div>
                  <h3 className="font-display mb-1 text-xl font-bold text-white">{init.name}</h3>
                  <div className="mb-6 flex items-center gap-2 text-white/60 text-sm">
                    <MapPin size={12} />
                    <span>{init.commune} · {init.period}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 p-4 text-center">
                    <p className="font-display text-lg font-bold text-white leading-tight">{init.beneficiaries}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/55">Bénéficiaires</p>
                  </div>
                  <div className="bg-white/10 p-4 text-center">
                    <p className="font-display text-lg font-bold text-white leading-tight">{init.budget}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/55">Budget</p>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className={`flex flex-col justify-center ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <p className="mb-6 leading-relaxed text-muted-foreground">{init.description}</p>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-rdc-anthracite">Réalisations clés</p>
                  {init.achievements.map(a => (
                    <div key={a} className="flex items-start gap-3">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${init.text}`} />
                      <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 flex flex-col gap-6 border border-border bg-muted/30 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 font-bold text-rdc-anthracite">Vous souhaitez en savoir plus ou participer ?</p>
            <p className="text-sm text-muted-foreground">
              Contactez le service Relations Communautaires de la RVA pour toute information sur nos programmes locaux.
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-rdc-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rdc-blue/85"
            >
              Nous contacter <ArrowRight size={13} />
            </Link>
            <Link
              to="/communaute/relations-communaute"
              className="flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-semibold text-rdc-anthracite transition-colors hover:bg-muted"
            >
              <ArrowLeft size={13} /> Retour
            </Link>
          </div>
        </div>

        {/* Liens connexes */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { to: '/communaute/relations-communaute/fih-art', label: 'Programme FIH Art', desc: 'Artistes congolais dans les terminaux', icon: Palette },
            { to: '/communaute/environnement-sonore', label: 'Environnement sonore', desc: 'Gestion des nuisances acoustiques', icon: Users },
            { to: '/communaute/environnement-durabilite', label: 'Durabilité', desc: 'Engagements environnementaux FIH', icon: Leaf },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to as never}
              className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:border-rdc-blue/30 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue/8 text-rdc-blue transition-colors group-hover:bg-rdc-blue group-hover:text-white">
                <link.icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="mb-0.5 text-sm font-semibold text-rdc-anthracite">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
              <ArrowRight size={14} className="mt-1 flex-shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-rdc-blue" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
