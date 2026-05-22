import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ScrollText, AlertTriangle, CheckCircle, ExternalLink,
  ChevronRight, FileText, ShieldCheck, BadgeAlert,
} from 'lucide-react';

export const Route = createFileRoute('/guide/douanes-immigration')({
  component: DouanesImmigrationPage,
  head: () => ({
    meta: [
      { title: "Douanes & Immigration — Guide FIH Kinshasa" },
      { name: 'description', content: "Formalités douanières (DGDA) et d'immigration (DGM) à l'Aéroport International de N'djili. Visa, eVisa, déclarations." },
    ],
  }),
});

const VISA_TYPES = [
  { region: 'Union Européenne',           type: 'Visa obligatoire',    note: 'eVisa disponible — evisa.gouv.cd',  badge: 'amber' },
  { region: 'États-Unis & Canada',        type: 'Visa obligatoire',    note: 'eVisa ou ambassade RDC',            badge: 'amber' },
  { region: 'Royaume-Uni',                type: 'Visa obligatoire',    note: 'eVisa ou ambassade RDC',            badge: 'amber' },
  { region: 'CEDEAO (Afrique de l\'O.)',  type: 'Visa à l\'arrivée',   note: '30 jours · 85 USD',                badge: 'green' },
  { region: 'Angola & Zambie',            type: 'Visa à l\'arrivée',   note: '30 jours · 85 USD',                badge: 'green' },
  { region: 'Rwanda · Burundi · Ouganda', type: 'Visa à l\'arrivée',   note: '30 jours · 85 USD',                badge: 'green' },
  { region: 'RDC (ressortissants)',        type: 'Libre accès',         note: 'Passeport ou CNI valide',          badge: 'blue' },
];

const BADGE = {
  amber: 'bg-amber-50 text-amber-700 border border-amber-200',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  blue:  'bg-rdc-blue/10 text-rdc-blue border border-rdc-blue/20',
};

const DGM_STEPS = [
  { n: '01', label: 'Préparez votre passeport', desc: 'Valide au moins 6 mois après la date d\'entrée. Visa requis selon nationalité.' },
  { n: '02', label: 'File de contrôle DGM',     desc: 'Présentez-vous au guichet DGM. Délai moyen : 15–25 min. Arrivées internationales uniquement.' },
  { n: '03', label: 'Biométrie & empreintes',   desc: 'Prise d\'empreintes digitales et photo pour les ressortissants étrangers.' },
  { n: '04', label: 'Tampon d\'entrée',          desc: 'Votre passeport est tamponné. Durée de séjour indiquée par l\'agent DGM.' },
];

const DGDA_RULES = [
  'Déclarez tout montant en espèces supérieur à 10 000 USD (ou équivalent devises)',
  'Marchandises commerciales importées soumises aux droits de douane DGDA',
  'Médicaments en grande quantité : ordonnance médicale requise',
  'Objets d\'art, antiquités et faune/flore protégée (CITES) : déclaration obligatoire',
  'Véhicules et équipements lourds : droits de douane applicables',
  'Produits alimentaires en grandes quantités peuvent faire l\'objet d\'un contrôle OCC',
];

function DouanesImmigrationPage() {
  return (
    <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0D1626]">
        <img
          src="/images/fih-bagages.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#0D1626]"
          style={{ clipPath: 'polygon(0 0, 58% 0, 72% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/guide' as never} className="hover:text-white transition-colors">Guide de l'aéroport</Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Douanes &amp; Immigration</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5 bg-rdc-blue"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Guide de l'aéroport</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">
            Douanes &amp;<br />Immigration
          </h1>
          <p className="mt-3 max-w-sm text-white/60">
            Préparez votre passage aux contrôles DGM et DGDA à l'Aéroport International de N'djili.
          </p>

          {/* Authority chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { label: 'DGM — Direction Générale des Migrations', Icon: ScrollText },
              { label: 'DGDA — Douanes et Accises', Icon: ShieldCheck },
            ].map(({ label, Icon }) => (
              <span key={label} className="inline-flex items-center gap-1.5 border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Icon size={11} className="text-rdc-yellow" /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* ── LEFT : DGM — Immigration ──────────────────────── */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#003DA5]">
                <ScrollText size={16} className="text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-rdc-anthracite">DGM — Immigration</h2>
                <p className="text-xs text-muted-foreground">Contrôle passeports et visas</p>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-8 space-y-0">
              {DGM_STEPS.map((step, i) => (
                <div key={step.n} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-[#003DA5] text-xs font-black text-white">
                      {step.n}
                    </div>
                    {i < DGM_STEPS.length - 1 && <div className="w-px flex-1 bg-[#E0E0E0] my-1" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-rdc-anthracite text-sm">{step.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visa table */}
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#888]">
              Conditions de visa selon nationalité
            </h3>
            <div className="mb-5 overflow-hidden border border-[#E8E8E8]">
              {VISA_TYPES.map((v, i) => (
                <div
                  key={v.region}
                  className={`grid grid-cols-[1fr_auto] gap-3 px-4 py-3 text-sm ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'
                  } ${i < VISA_TYPES.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
                >
                  <div>
                    <p className="font-medium text-[#1A1A1A]">{v.region}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{v.note}</p>
                  </div>
                  <span className={`self-start rounded-full px-2.5 py-1 text-[10px] font-bold whitespace-nowrap ${BADGE[v.badge as keyof typeof BADGE]}`}>
                    {v.type}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://evisa.gouv.cd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-rdc-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-rdc-blue/90 transition-colors"
            >
              <FileText size={12} /> Demander un eVisa RDC <ExternalLink size={10} />
            </a>
          </div>

          {/* ── RIGHT : DGDA — Douanes ────────────────────────── */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-amber-600">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-rdc-anthracite">DGDA — Douanes</h2>
                <p className="text-xs text-muted-foreground">Contrôle douanier et accises</p>
              </div>
            </div>

            {/* Alert */}
            <div className="mb-6 flex items-start gap-3 border-l-4 border-amber-400 bg-amber-50 p-4">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-900">Déclaration obligatoire</p>
                <p className="mt-0.5 text-xs text-amber-700">
                  Tout voyageur entrant ou sortant avec plus de 10 000 USD (ou équivalent) en espèces doit remplir un formulaire de déclaration douanière.
                </p>
              </div>
            </div>

            {/* Rules */}
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#888]">
              Ce que vous devez déclarer
            </h3>
            <div className="mb-8 space-y-2.5">
              {DGDA_RULES.map((r) => (
                <div key={r} className="flex items-start gap-2.5 border-b border-[#F0F0F0] pb-2.5">
                  <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
                  <p className="text-sm text-[#444]">{r}</p>
                </div>
              ))}
            </div>

            {/* Green / Red channels */}
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#888]">
              Couloirs douaniers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 p-4 text-center">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center bg-emerald-500">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Couloir vert</p>
                <p className="mt-1 text-[11px] text-emerald-700">Rien à déclarer</p>
              </div>
              <div className="bg-red-50 p-4 text-center">
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center bg-red-500">
                  <BadgeAlert size={14} className="text-white" />
                </div>
                <p className="text-xs font-bold text-red-800 uppercase tracking-wide">Couloir rouge</p>
                <p className="mt-1 text-[11px] text-red-700">Marchandises à déclarer</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom note ──────────────────────────────────────── */}
        <div className="mt-12 flex items-start gap-3 border border-[#003DA5]/20 bg-[#003DA5]/5 p-5 text-sm text-[#003DA5]/80">
          <ScrollText size={15} className="mt-0.5 flex-shrink-0" />
          <p>
            Les règlements douaniers et les conditions de visa peuvent évoluer.
            Vérifiez les informations officielles auprès de l'ambassade compétente ou sur{' '}
            <a href="https://evisa.gouv.cd" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              evisa.gouv.cd
            </a>{' '}
            avant votre voyage.
          </p>
        </div>
      </div>
    </main>
  );
}
