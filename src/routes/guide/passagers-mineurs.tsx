import { createFileRoute, Link } from '@tanstack/react-router';
import {
  CheckCircle, AlertTriangle, Phone,
  Clock, MapPin, ArrowRight, ChevronRight,
  Info,
} from 'lucide-react';

export const Route = createFileRoute('/guide/passagers-mineurs')({
  component: PassagersMineurs,
  head: () => ({
    meta: [
      { title: "Mineurs non accompagnés — UM Service · FIH" },
      { name: 'description', content: "Service UM pour mineurs non accompagnés à l'Aéroport International de N'djili (FIH). Procédures, documents requis, contacts." },
    ],
  }),
});

const AGE_RULES = [
  {
    age: 'Moins de 5 ans',
    rule: 'Ne peut voyager seul en aucun cas',
    detail: 'Accompagnement obligatoire d\'un adulte sur toute la durée du voyage.',
    level: 'red',
  },
  {
    age: '5 à 11 ans',
    rule: 'Service UM obligatoire',
    detail: 'L\'enfant est pris en charge dès l\'enregistrement jusqu\'à la remise à la personne désignée à l\'arrivée.',
    level: 'amber',
  },
  {
    age: '12 à 15 ans',
    rule: 'Service UM recommandé',
    detail: 'Selon la compagnie aérienne. Certaines compagnies l\'exigent, d\'autres le proposent en option.',
    level: 'blue',
  },
  {
    age: '16 à 17 ans',
    rule: 'Voyage seul possible',
    detail: 'Avec autorisation parentale notariée obligatoire pour les vols internationaux hors RDC.',
    level: 'green',
  },
] as const;

const LEVEL_STYLES = {
  red:   { badge: 'bg-red-50 border border-red-200 text-red-700', dot: 'bg-red-500'   },
  amber: { badge: 'bg-amber-50 border border-amber-200 text-amber-700', dot: 'bg-amber-400' },
  blue:  { badge: 'bg-[#003DA5]/10 border border-[#003DA5]/20 text-[#003DA5]', dot: 'bg-[#003DA5]' },
  green: { badge: 'bg-emerald-50 border border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
};

const UM_PROCESS = [
  {
    n: '01',
    label: 'Réservez le service UM',
    desc: 'Contactez votre compagnie aérienne au moment de la réservation du billet. Un supplément UM est généralement applicable (20 à 80 USD selon les compagnies).',
  },
  {
    n: '02',
    label: 'Fournissez les coordonnées complètes',
    desc: 'Nom, adresse et numéro de téléphone de la personne qui récupérera l\'enfant à destination. Ces informations sont obligatoires.',
  },
  {
    n: '03',
    label: 'Présentez-vous en avance au terminal',
    desc: 'Arrivez au comptoir d\'enregistrement au minimum 1 heure avant les autres passagers. Le bureau UM de FIH est situé au Terminal International, niveau 1.',
  },
  {
    n: '04',
    label: 'Remise de l\'enfant à l\'agent UM',
    desc: 'L\'agent UM FIH prend en charge l\'enfant dès l\'enregistrement. Il l\'accompagne jusqu\'à l\'avion et coordonne avec l\'équipage de bord.',
  },
  {
    n: '05',
    label: 'Correspondance et transit',
    desc: 'En cas de correspondance (ex. : Kinshasa → Addis-Abeba → Europe), un agent UM se charge du transfert entre les deux vols. Ne réservez pas des correspondances trop courtes.',
  },
  {
    n: '06',
    label: 'Remise à l\'arrivée',
    desc: 'L\'enfant est remis uniquement à la personne désignée, sur présentation obligatoire d\'une pièce d\'identité valide. Aucune exception n\'est tolérée.',
  },
] as const;

const REQUIRED_DOCS = [
  {
    doc: 'Passeport valide du mineur',
    note: 'Validité min. 6 mois après la date de retour',
    critical: true,
  },
  {
    doc: 'Carnet de vaccination fièvre jaune (carnet jaune OMS)',
    note: 'Obligatoire pour entrer et sortir de RDC',
    critical: true,
  },
  {
    doc: 'Autorisation parentale notariée',
    note: 'Les deux parents ou le tuteur légal — exigée par la DGM congolaise pour les vols internationaux',
    critical: true,
  },
  {
    doc: 'Jugement d\'attribution de garde (si famille monoparentale)',
    note: 'La DGM peut exiger ce document si un seul parent signe l\'autorisation',
    critical: false,
  },
  {
    doc: 'Formulaire UM de la compagnie aérienne',
    note: 'Rempli et signé par le parent/tuteur au comptoir',
    critical: false,
  },
  {
    doc: 'Coordonnées de la personne à la destination',
    note: 'Nom complet, adresse, numéro de téléphone — vérifiés par l\'agent UM',
    critical: false,
  },
] as const;

function PassagersMineurs() {
  return (
    <main id="main-content">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-2.jpg"
          alt="Terminal International FIH — Service UM"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <nav className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={9} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'Aéroport</Link>
            <ChevronRight size={9} />
            <span className="text-white/80">Mineurs non accompagnés</span>
          </nav>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Guide de l'Aéroport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Mineurs non accompagnés (UM)</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Guide</span>
        </div>
      </div>

      {/* ── Alerte DGM ───────────────────────────────────────────────────── */}
      <div className="border-b-2 border-amber-300 bg-amber-50">
        <div className="mx-auto max-w-5xl px-5 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>DGM congolaise :</strong> Pour tout mineur voyageant sans ses deux parents, la Direction Générale des Migrations exige une autorisation parentale notariée. En cas de garde exclusive, le jugement d'attribution est obligatoire.
            </p>
          </div>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Règles par âge */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Réglementation</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Règles selon l'âge de l'enfant</h2>
          <div className="grid gap-px bg-[#e8e8e8] border border-[#e8e8e8] sm:grid-cols-2">
            {AGE_RULES.map((r) => {
              const s = LEVEL_STYLES[r.level];
              return (
                <div key={r.age} className="bg-white p-5 flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`h-3 w-3 rounded-full ${s.dot}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-[#1a1a1a]">{r.age}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${s.badge}`}>{r.rule}</span>
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed">{r.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Procédure UM */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Étapes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Procédure UM — pas à pas</h2>
          <div className="space-y-0 border-t border-[#e8e8e8]">
            {UM_PROCESS.map((step) => (
              <div key={step.n} className="border-b border-[#e8e8e8] flex gap-5 py-5">
                <div className="flex-shrink-0">
                  <span className="flex h-9 w-9 items-center justify-center bg-[#003DA5] text-[11px] font-black text-white">
                    {step.n}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a1a] mb-1">{step.label}</p>
                  <p className="text-sm text-[#555] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Documents requis */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Documents</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Documents requis</h2>
          <div className="border border-[#e8e8e8] bg-white">
            {REQUIRED_DOCS.map((d, i) => (
              <div
                key={d.doc}
                className={`flex items-start gap-4 px-5 py-4 ${i < REQUIRED_DOCS.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}
              >
                <CheckCircle
                  size={15}
                  className={`mt-0.5 flex-shrink-0 ${d.critical ? 'text-red-500' : 'text-[#009A44]'}`}
                />
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${d.critical ? 'text-red-900' : 'text-[#1a1a1a]'}`}>
                    {d.doc}
                    {d.critical && <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5">OBLIGATOIRE</span>}
                  </p>
                  <p className="text-xs text-[#666] mt-0.5">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bureau UM FIH */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Contact</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Bureau UM — FIH</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-[#e8e8e8] bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/10 mb-3">
                <MapPin size={15} className="text-[#003DA5]" />
              </div>
              <p className="font-semibold text-[#1a1a1a] text-sm mb-1">Emplacement</p>
              <p className="text-xs text-[#555] leading-relaxed">Terminal International · Niveau 1, à gauche des comptoirs d'enregistrement</p>
            </div>
            <div className="border border-[#e8e8e8] bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/10 mb-3">
                <Clock size={15} className="text-[#003DA5]" />
              </div>
              <p className="font-semibold text-[#1a1a1a] text-sm mb-1">Horaires</p>
              <p className="text-xs text-[#555] leading-relaxed">Ouvert tous les jours · En fonction des vols · Présent dès 3h avant le 1er départ</p>
            </div>
            <div className="border border-[#e8e8e8] bg-white p-5">
              <div className="flex h-9 w-9 items-center justify-center bg-[#003DA5]/10 mb-3">
                <Phone size={15} className="text-[#003DA5]" />
              </div>
              <p className="font-semibold text-[#1a1a1a] text-sm mb-1">Contact direct</p>
              <a href="tel:+243810000000" className="text-xs text-[#003DA5] hover:underline">+243 81 XXX XXXX</a>
              <p className="text-xs text-[#555] mt-1">RVA — Service assistance passagers</p>
            </div>
          </div>
        </section>

        {/* Note importante */}
        <div className="bg-amber-50 border border-amber-200 p-5 flex items-start gap-3">
          <Info size={15} className="mt-0.5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-amber-900 mb-1">Conseil pratique</p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Réservez le service UM le plus tôt possible — certaines compagnies n'acceptent pas les réservations UM moins de 48 heures avant le départ.
              Vérifiez également les exigences spécifiques de la compagnie pour les vols depuis ou vers la RDC.
            </p>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="grid gap-px bg-[#003DA5] sm:grid-cols-2">
          {[
            { label: 'Sécurité & Bagages', desc: 'Règles bagages pour les mineurs', href: '/guide/securite-bagages' },
            { label: 'Quitter Kinshasa', desc: 'Procédures de départ — Terminal International', href: '/guide/quitter-kinshasa' },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href as never}
              className="group bg-[#003DA5] p-6 flex flex-col gap-2 hover:bg-[#002D8C] transition-colors relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#FFCE00] transition-all duration-500" />
              <p className="font-bold text-white text-base group-hover:text-[#FFCE00] transition-colors">{link.label}</p>
              <p className="text-sm text-white/60">{link.desc}</p>
              <ArrowRight size={14} className="text-white/30 group-hover:text-[#FFCE00] group-hover:translate-x-1 transition-all mt-1" />
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
