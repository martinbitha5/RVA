import { createFileRoute, Link } from '@tanstack/react-router';
import { Scale, Users, UserCheck, Building2, ChevronRight, ArrowRight, FileText } from 'lucide-react';

export const Route = createFileRoute('/corporate/gouvernance')({
  component: GouvernancePage,
  head: () => ({
    meta: [
      { title: "Gouvernance RVA — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Organisation et gouvernance de la Régie des Voies Aériennes (RVA) — Conseil d'administration, comité de direction, tutelle ministérielle." },
    ],
  }),
});

const PRINCIPES = [
  { title: 'Transparence',      desc: "Publication annuelle des rapports d'activité et financiers de la RVA conformément aux normes OHADA et aux exigences du Ministère des Transports." },
  { title: 'Responsabilité',    desc: "Reddition de comptes au Ministère des Transports et Voies de Communication ainsi qu'aux instances communautaires riveraines de l'aéroport." },
  { title: 'Conformité OACI',   desc: "Application rigoureuse des normes et pratiques recommandées (SARP) de l'Organisation de l'Aviation Civile Internationale — Annexes 14 et 17." },
  { title: 'Engagement local',  desc: "Consultation régulière des communes riveraines (Nsele, Masina, Kimbanseke, N'djili) via le comité consultatif communautaire de la RVA." },
] as const;

const BOARD_MEMBERS = [
  { name: 'Directeur Général',             role: 'Direction Générale RVA',           initial: 'DG', note: 'Nommé par ordonnance présidentielle' },
  { name: 'Directeur Général Adjoint',     role: 'Direction Générale Adjointe',       initial: 'DGA', note: 'Chargé des opérations' },
  { name: 'Secrétaire Général',            role: 'Secrétariat Général',              initial: 'SG', note: 'Administration et juridique' },
  { name: 'Directeur Technique',           role: 'Direction des Infrastructures',    initial: 'DT', note: 'Pistes, bâtiments, équipements' },
  { name: 'Directeur Financier',           role: 'Direction Financière',             initial: 'DF', note: 'Budget, comptabilité, recouvrement' },
  { name: 'Directeur Exploitation',        role: 'Direction des Opérations',         initial: 'DE', note: 'Vols, escales, assistance' },
  { name: 'Directeur Sûreté',             role: 'Direction de la Sûreté Aéroportuaire', initial: 'DS', note: 'AVSEC, SSLIA, sécurité' },
  { name: 'Directeur Ressources Humaines', role: 'Direction des Ressources Humaines', initial: 'DRH', note: 'Gestion du personnel RVA' },
];

const COMMITTEE_MEMBRES = [
  { commune: 'Nsele',      rep: '3 représentants', role: 'Commune hôte — voix prépondérante au comité' },
  { commune: 'Masina',     rep: '2 représentants', role: "Principale zone d'impact sonore" },
  { commune: 'Kimbanseke', rep: '2 représentants', role: "Zone des trajectoires d'approche ILS" },
  { commune: "N'djili",    rep: '2 représentants', role: "Commune éponyme de l'aéroport" },
  { commune: 'RVA',        rep: 'Direction',       role: 'Secrétariat, présidence et comptes rendus' },
];

const TEXTS_LEGAUX = [
  { ref: 'Ordonnance-loi n°70-027', label: 'Création de la RVA (1970)', status: 'active' },
  { ref: 'Décret n°09/37',          label: 'Statuts RVA révisés (2009)', status: 'active' },
  { ref: 'Loi n°98-006',            label: 'Libéralisation du secteur aérien congolais', status: 'active' },
  { ref: 'PNSAC',                    label: "Programme National de Sûreté de l'Aviation Civile", status: 'active' },
];

function GouvernancePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Siège de la RVA — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · RVA</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Gouvernance de la Régie des Voies Aériennes</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#1a1a1a] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Gouvernance</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Introduction */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Tutelle ministérielle</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Organisation de la RVA</h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            La Régie des Voies Aériennes est placée sous la tutelle du <strong className="text-[#1a1a1a]">Ministère des Transports et Voies de Communication</strong> de la République Démocratique du Congo. Son organisation repose sur des principes de transparence, de conformité internationale et d'engagement envers les communautés riveraines de l'aéroport.
          </p>
        </section>

        {/* Principes */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Nos principes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Gouvernance responsable</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPES.map(p => (
              <div key={p.title} className="border border-[#e8e8e8] bg-white p-5">
                <div className="h-0.5 w-8 bg-[#003DA5] mb-4" />
                <p className="font-bold text-[#1a1a1a] text-sm mb-2">{p.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comité de direction */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Direction générale</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Comité de direction RVA</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BOARD_MEMBERS.map(m => (
              <div key={m.name} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-11 w-11 items-center justify-center bg-[#003DA5] text-xs font-bold text-white mb-4">
                  {m.initial}
                </div>
                <p className="font-bold text-sm text-[#1a1a1a] leading-snug">{m.name}</p>
                <p className="text-xs text-[#003DA5] mt-1">{m.role}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{m.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comité consultatif communautaire */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Dialogue communautaire</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Comité consultatif communautaire</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            La RVA maintient un dialogue permanent avec les communes riveraines de l'aéroport via un Comité Consultatif Communautaire (CCC) qui se réunit trimestriellement. Ce comité traite des questions de bruit, de développement local, d'emploi et d'impact environnemental.
          </p>
          <div className="space-y-2.5">
            {COMMITTEE_MEMBRES.map(m => (
              <div key={m.commune} className="flex flex-wrap items-center gap-4 border border-[#e8e8e8] bg-white px-5 py-4">
                <span className="font-bold text-[#1a1a1a] w-28 shrink-0">{m.commune}</span>
                <span className="text-xs font-semibold text-[#003DA5]">{m.rep}</span>
                <span className="text-xs text-gray-500">{m.role}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Prochain comité consultatif communautaire : <strong className="text-gray-600">Juin 2026</strong> — Contact : <a href="mailto:communaute@fih-rva.com" className="text-[#003DA5] hover:underline">communaute@fih-rva.com</a>
          </p>
        </section>

        {/* Instances de gouvernance */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Instances de gouvernance</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Organisation statutaire</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: '/corporate/gouvernance/conseil-administration', Icon: Scale,     label: "Conseil d'administration",    desc: "Composition, rôles et responsabilités du Conseil d'Administration de la RVA, nommé par décret présidentiel." },
              { href: '/corporate/gouvernance/comite-consultatif',     Icon: Users,     label: 'Comité consultatif',           desc: "Comité consultatif communautaire — représentants des communes de Nsele, Masina, Kimbanseke et N'djili." },
              { href: '/corporate/gouvernance/comite-direction',       Icon: UserCheck, label: 'Comité de direction',          desc: 'Direction Générale, Directions métier et organisation opérationnelle de la Régie des Voies Aériennes.' },
              { href: '/corporate/gouvernance/directions',             Icon: Building2, label: 'Directions opérationnelles',   desc: 'Directions Technique, Financière, Exploitation, Sûreté, Ressources Humaines et Commerciale.' },
            ].map(({ href, Icon, label, desc }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-[#e8e8e8] bg-white p-6 hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <Icon size={20} className="text-[#003DA5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors mb-1">{label}</p>
                  <p className="text-sm text-gray-500 leading-snug">{desc}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0 mt-1 group-hover:text-[#003DA5] transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Textes légaux */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Cadre juridique</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Textes légaux et réglementaires</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {TEXTS_LEGAUX.map(t => (
              <div key={t.ref} className="flex items-center gap-4 border border-[#e8e8e8] bg-white px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <FileText size={16} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#003DA5]">{t.ref}</p>
                  <p className="text-sm text-[#1a1a1a]">{t.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">En savoir plus</p>
              <h2 className="text-xl font-bold text-white mb-1">À propos de la RVA et de FIH</h2>
              <p className="text-sm text-white/55 max-w-lg">Consultez notre présentation institutionnelle, notre historique et nos projets de modernisation.</p>
            </div>
            <Link to="/corporate/a-propos" className="shrink-0 flex items-center gap-2 bg-white px-6 py-3 text-sm font-bold text-[#003DA5] hover:bg-[#FFCE00] transition-colors">
              À propos <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
