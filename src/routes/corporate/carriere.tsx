import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Briefcase, Users, Heart, TrendingUp, BookOpen, Search,
  ChevronRight, ArrowRight, CheckCircle, GraduationCap, Wrench, Shield, BarChart3, Globe,
} from 'lucide-react';

export const Route = createFileRoute('/corporate/carriere')({
  component: CarrierePage,
  head: () => ({
    meta: [
      { title: "Carrières à la RVA — Rejoignez l'équipe FIH · Kinshasa" },
      { name: 'description', content: "Rejoignez la Régie des Voies Aériennes et l'Aéroport International de N'djili (FIH). Offres d'emploi, stages et carrières dans l'aviation congolaise." },
    ],
  }),
});

const NUMBERS = [
  { value: '1 200+', label: 'Employés directs RVA', sub: 'Kinshasa et réseau national' },
  { value: '3 500+', label: 'Emplois indirects FIH', sub: 'Compagnies, commerces, services' },
  { value: '15+',    label: 'Familles de métiers',  sub: "De l'AVSEC au fret cargo" },
  { value: '60%',    label: 'Moins de 40 ans',      sub: 'Une équipe jeune et dynamique' },
];

const VALUES = [
  { title: 'Intégrité',   desc: 'Agir avec honnêteté et responsabilité dans toutes nos missions de service public.' },
  { title: 'Excellence',  desc: 'Viser les standards internationaux OACI dans chaque fonction et chaque service.' },
  { title: 'Engagement',  desc: "Servir Kinshasa, la RDC et l'ensemble de l'Afrique centrale avec fierté et détermination." },
  { title: 'Innovation',  desc: "Moderniser l'aéroport de N'djili pour les générations futures du Congo." },
];

const JOB_FAMILIES = [
  { name: 'Opérations aéroportuaires',     Icon: Globe,         desc: "Coordination des mouvements d'aéronefs, assistance escale, accueil passagers." },
  { name: 'Sécurité & Sûreté (AVSEC)',     Icon: Shield,        desc: 'Agents de sûreté, contrôle passagers, bagages et accès zones réservées.' },
  { name: 'Maintenance & Technique',       Icon: Wrench,        desc: 'Électriciens, techniciens équipements aéroportuaires, balisage lumineux, pistes.' },
  { name: 'Finance & Comptabilité',        Icon: BarChart3,     desc: 'Comptables, contrôleurs financiers, gestionnaires budgets RVA.' },
  { name: 'Commerce & Partenariats',       Icon: Briefcase,     desc: 'Chargés de concessions, responsables commerciaux, marketing institutionnel.' },
  { name: 'Ressources Humaines',           Icon: Users,         desc: 'Gestion du personnel, formation, paie et relations sociales.' },
  { name: 'Informatique & Numérique',      Icon: Globe,         desc: 'Développeurs, administrateurs systèmes, intégration Smart Airport.' },
  { name: 'Environnement & Durabilité',    Icon: CheckCircle,   desc: 'Responsables environnement, conformité OACI Annexe 14, gestion faune aviaire.' },
] as const;

const SUB_SECTIONS = [
  { href: '/corporate/carriere/communaute-fih',     Icon: Users,     label: 'La communauté FIH',          desc: "Découvrez la diversité des équipes qui font vivre l'aéroport de N'djili au quotidien, 24h/24." },
  { href: '/corporate/carriere/engagement-talents',  Icon: Heart,     label: 'Engagement envers les talents', desc: 'Notre promesse employeur : formation continue, évolution de carrière, bien-être.' },
  { href: '/corporate/carriere/se-developper',       Icon: TrendingUp,label: 'Se développer à la RVA',    desc: 'Parcours professionnels, mobilité interne et programmes de mentorat.' },
  { href: '/corporate/carriere/programmes-politiques',Icon: BookOpen, label: 'Programmes & Politiques',   desc: "Stages, alternances, politiques d'égalité, programmes de leadership." },
  { href: '/corporate/carriere/offres-emploi',       Icon: Search,    label: "Offres d'emploi",           desc: 'Consultez toutes nos offres actuelles et postulez directement en ligne.' },
] as const;

const OFFRES_SAMPLE = [
  { titre: 'Agent de sûreté aéroportuaire (AVSEC)', dept: 'Direction Sûreté', contrat: 'CDI', lieu: 'FIH — Kinshasa' },
  { titre: 'Technicien maintenance balisage lumineux', dept: 'Direction Technique', contrat: 'CDI', lieu: 'FIH — Kinshasa' },
  { titre: 'Ingénieur systèmes informatiques', dept: 'Direction SI', contrat: 'CDI', lieu: 'FIH — Kinshasa' },
  { titre: 'Chargé de relations commerciales', dept: 'Direction Commerciale', contrat: 'CDI', lieu: 'FIH — Kinshasa' },
  { titre: 'Stage — Gestion opérations aéroportuaires', dept: 'Direction Exploitation', contrat: 'Stage 6 mois', lieu: 'FIH — Kinshasa' },
  { titre: 'Responsable environnement et durabilité', dept: 'Direction Environnement', contrat: 'CDI', lieu: 'FIH — Kinshasa' },
];

const HOW_TO_APPLY = [
  { n: '01', title: 'Consultez nos offres', desc: "Parcourez les offres disponibles sur notre page Offres d'emploi ou sur les plateformes partenaires." },
  { n: '02', title: 'Déposez votre candidature', desc: 'Envoyez CV + lettre de motivation à rh@fih-rva.com en précisant la référence du poste.' },
  { n: '03', title: 'Entretien RVA', desc: 'Les candidats présélectionnés sont convoqués pour un entretien à FIH ou en visioconférence.' },
  { n: '04', title: 'Intégration', desc: "Programme d'onboarding de 2 semaines avec formation sécurité aéroportuaire obligatoire (badge d'accès piste)." },
];

function CarrierePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Équipe de l'Aéroport N'djili — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · Rejoindre la RVA</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Carrières à l'Aéroport International de N'djili</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Carrières</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {NUMBERS.map(n => (
              <div key={n.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#FFCE00] leading-none">{n.value}</p>
                <p className="mt-1.5 text-xs font-bold text-[#1a1a1a]">{n.label}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{n.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi rejoindre */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Pourquoi nous rejoindre</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">La RVA — Un employeur de référence en RDC</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-3xl">
            La Régie des Voies Aériennes offre des opportunités uniques dans le secteur aérien congolais — en pleine croissance. Rejoindre la RVA, c'est participer à la modernisation d'un aéroport qui accueille 1,8 million de passagers par an et contribuer au développement économique de Kinshasa et de la RDC.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(v => (
              <div key={v.title} className="border border-[#e8e8e8] bg-white p-5">
                <div className="h-0.5 w-8 bg-[#003DA5] mb-4" />
                <p className="font-bold text-[#1a1a1a] mb-2">{v.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Offres actuelles */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Recrutement en cours</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Offres d'emploi actuelles</h2>
          <div className="space-y-2.5 mb-6">
            {OFFRES_SAMPLE.map(o => (
              <div key={o.titre} className="flex flex-wrap items-center justify-between gap-3 border border-[#e8e8e8] bg-white px-5 py-4 hover:border-[#003DA5]/40 transition-colors">
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">{o.titre}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{o.dept} · {o.lieu}</p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 text-[10px] font-bold ${o.contrat.includes('Stage') ? 'bg-amber-100 text-amber-700' : 'bg-[#003DA5]/10 text-[#003DA5]'}`}>
                  {o.contrat}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Pour postuler : <a href="mailto:rh@fih-rva.com" className="text-[#003DA5] font-semibold hover:underline">rh@fih-rva.com</a> — Précisez le titre du poste en objet de votre email.
          </p>
        </section>

        {/* Familles de métiers */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos métiers</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Familles de métiers à la RVA</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {JOB_FAMILIES.map(({ name, Icon, desc }) => (
              <div key={name} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center bg-[#003DA5]/10 mb-4">
                  <Icon size={16} className="text-[#003DA5]" />
                </div>
                <p className="font-bold text-[#1a1a1a] text-sm mb-2 leading-snug">{name}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stages */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Jeunes talents</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Stages et formations</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border border-[#e8e8e8] bg-white p-6">
              <GraduationCap size={24} className="text-[#003DA5] mb-4" />
              <p className="font-bold text-[#1a1a1a] mb-2">Stages académiques</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                La RVA accueille des stagiaires des universités et instituts supérieurs congolais (UNIKIN, ISC, ISTA, ISP). Durée : 1 à 6 mois selon le cursus. Indemnité mensuelle versée.
              </p>
            </div>
            <div className="border border-[#e8e8e8] bg-white p-6">
              <Wrench size={24} className="text-[#003DA5] mb-4" />
              <p className="font-bold text-[#1a1a1a] mb-2">Formation professionnelle</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Le programme FIH Formation offre 200 places par an aux jeunes des communes riveraines (Nsele, Masina, Kimbanseke) pour apprendre les métiers de l'aéroport.
              </p>
            </div>
          </div>
        </section>

        {/* Comment postuler */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Processus de recrutement</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Comment postuler ?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_TO_APPLY.map(s => (
              <div key={s.n} className="border border-[#e8e8e8] bg-white p-5">
                <p className="text-3xl font-bold text-[#003DA5]/20 mb-3">{s.n}</p>
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rubriques carrière */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Votre parcours</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Explorer les rubriques carrière</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUB_SECTIONS.map(({ href, Icon, label, desc }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex flex-col gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center bg-[#003DA5]/10">
                  <Icon size={18} className="text-[#003DA5]" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors text-sm mb-1">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#003DA5]/60 group-hover:text-[#003DA5] transition-colors">
                  Découvrir <ChevronRight size={11} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Prêt à rejoindre l'équipe ?</p>
              <h2 className="text-xl font-bold text-white mb-1">Postulez dès aujourd'hui à la RVA</h2>
              <p className="text-sm text-white/55 max-w-lg">Envoyez votre CV et lettre de motivation à rh@fih-rva.com — nous vous répondrons dans un délai de 15 jours ouvrés.</p>
            </div>
            <div className="flex gap-3">
              <a href="mailto:rh@fih-rva.com" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
                rh@fih-rva.com <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
