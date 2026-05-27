import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { Users, School, Stethoscope, Hammer, Palette, Leaf, CheckCircle, ArrowRight, Calendar, MessageSquare } from 'lucide-react';

export const Route = createFileRoute('/communaute/relations-communaute')({
  component: RelationsCommunauteLayout,
  head: () => ({
    meta: [
      { title: "Relations communautaires — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Initiatives locales de la RVA dans les communes riveraines de Nsele, Masina et Kimbanseke — écoles, santé, formation, FIH Art." },
    ],
  }),
});

function RelationsCommunauteLayout() {
  const matches = useMatches();
  const isLeaf = matches.at(-1)?.routeId === '/communaute/relations-communaute';
  return isLeaf ? <RelationsCommunautePage /> : <Outlet />;
}

const IMPACT_STATS = [
  { value: '25 000+', label: 'Bénéficiaires directs 2023', sub: 'Nsele, Masina, Kimbanseke' },
  { value: '5',       label: 'Programmes actifs',          sub: 'Éducation, santé, emploi, art' },
  { value: '3 M USD', label: 'Investissements 2023',       sub: 'Actions communautaires RVA' },
  { value: '12',      label: 'Partenariats ONG locales',   sub: 'Associations kinoisses' },
];

const INITIATIVES = [
  {
    name: 'Programme Écoles de Nsele',
    commune: 'Nsele',
    Icon: School,
    color: '#003DA5',
    desc: "Réhabilitation de 8 écoles primaires dans la commune de Nsele (commune hôte de FIH). Fourniture de matériel scolaire pour 4 200 élèves. Bourses d'excellence pour les lycéens méritants des filières sciences et techniques.",
    status: 'active' as const,
    beneficiaries: '4 200 élèves',
    year: '2021–actif',
    budget: '450 000 USD',
  },
  {
    name: 'Centre de Santé Masina',
    commune: 'Masina',
    Icon: Stethoscope,
    color: '#CE1126',
    desc: "Construction d'un centre de santé communautaire de 30 lits dans la commune de Masina (principale zone d'impact sonore). Service de maternité, pédiatrie, soins généraux et pharmacie subventionnée. Plus de 15 000 patients reçus par an.",
    status: 'active' as const,
    beneficiaries: '15 000 patients/an',
    year: '2022–actif',
    budget: '820 000 USD',
  },
  {
    name: 'Formation Professionnelle FIH',
    commune: 'Kimbanseke',
    Icon: Hammer,
    color: '#d97706',
    desc: "Formation aux métiers de l'aéroport (sûreté AVSEC, accueil passagers, maintenance piste, manutention bagages, restauration) pour les jeunes de 18–30 ans des communes riveraines. Certificat RVA reconnu. 200 places par an.",
    status: 'active' as const,
    beneficiaries: '200 jeunes/an',
    year: '2020–actif',
    budget: '380 000 USD',
  },
  {
    name: 'Programme FIH Art',
    commune: 'Kinshasa',
    Icon: Palette,
    color: '#7C1B28',
    desc: "Exposition permanente des artistes congolais dans les terminaux internationaux — Chéri Samba, Moke, Bodo (Baudouin Douma), sculpteurs Mbongo et jeunes talents de l'Académie des Beaux-Arts de Kinshasa. Commandes d'œuvres originales et mécénat.",
    status: 'active' as const,
    beneficiaries: '25 artistes exposés',
    year: '2019–actif',
    budget: '200 000 USD',
  },
  {
    name: 'Reboisement Nsele — 10 000 arbres',
    commune: "N'djili / Nsele",
    Icon: Leaf,
    color: '#009A44',
    desc: "Plantation de 10 000 arbres endémiques du bassin congolais sur les terrains RVA et dans les communes riveraines pour réduire l'empreinte environnementale. Espèces sélectionnées avec l'INERA (Institut National d'Étude et de Recherche Agronomique).",
    status: 'planned' as const,
    beneficiaries: '10 000 arbres plantés',
    year: '2024–2026',
    budget: '150 000 USD',
  },
] as const;

const COMMITTEE_MEMBERS = [
  { commune: 'Nsele',       rep: '3 représentants', role: 'Commune hôte — voix prépondérante au CCC' },
  { commune: 'Masina',      rep: '2 représentants', role: "Principale zone d'impact sonore et trafic" },
  { commune: 'Kimbanseke',  rep: '2 représentants', role: "Sous les trajectoires d'approche ILS" },
  { commune: "N'djili",     rep: '2 représentants', role: "Commune éponyme de l'aéroport" },
  { commune: 'RVA',         rep: 'Direction',       role: 'Secrétariat, présidence et comptes rendus' },
];

const PROCHAINES_ASSEMBLEES = [
  { date: 'Juin 2026', sujet: 'Bilan programme reboisement 2024–2026 et plan 2027', lieu: 'Mairie de Nsele' },
  { date: 'Sept 2026', sujet: 'Impact sonore post-travaux piste 01/19 — résultats sonomètres', lieu: 'Centre de Santé Masina' },
  { date: 'Déc 2026',  sujet: 'Assemblée annuelle — bilan et perspectives 2027', lieu: 'Terminal FIH' },
];

const ART_ARTISTS = [
  { name: 'Chéri Samba',                                   note: 'Maître de la peinture populaire congolaise' },
  { name: 'Moke',                                          note: 'Chroniqueur de la vie kinoise (1950–2001) — hommage' },
  { name: 'Bodo (Baudouin Douma)',                         note: 'Peintre figuratif, Kinshasa' },
  { name: 'Sculpteurs Mbongo',                             note: 'Sculpture bois et bronze, traditions congolaises' },
  { name: 'Jeunes talents — Académie des Beaux-Arts',      note: 'Sélection annuelle, Kinshasa-Gombe' },
];

function RelationsCommunautePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-2.jpg" alt="Communes riveraines de l'Aéroport N'djili — Kinshasa" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Communauté · FIH et ses voisins</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Relations communautaires — La RVA agit</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#009A44] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Initiatives locales</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {IMPACT_STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-3xl font-bold text-[#FFCE00] leading-none">{s.value}</p>
                <p className="mt-1.5 text-xs font-bold text-[#1a1a1a]">{s.label}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Présentation communes */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Communes riveraines</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">FIH et ses 4 communes voisines</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-3xl">
            L'Aéroport International de N'djili est entouré de 4 communes de Kinshasa — Nsele, Masina, Kimbanseke et N'djili — qui totalisent plus de 2,4 millions d'habitants. La RVA s'engage à leur bénéfice par des programmes concrets et un dialogue permanent.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: 'Nsele',      pop: '~300 000 hab.', role: 'Commune hôte — siège physique de FIH', detail: "Communes hôtes bénéficient d'une voix prépondérante au CCC et des premières priorités d'embauche à la RVA." },
              { name: 'Masina',     pop: '~850 000 hab.', role: "Principale zone d'impact sonore", detail: 'Zone B du PEB (65–75 dB Lden). Programme isolation acoustique prioritaire et Centre de Santé en opération.' },
              { name: 'Kimbanseke', pop: '~600 000 hab.', role: "Sous les trajectoires d'approche ILS", detail: 'Zone C du PEB (55–65 dB). Programme Formation Professionnelle FIH prioritaire pour les jeunes de cette commune.' },
              { name: "N'djili",    pop: '~700 000 hab.', role: "Commune éponyme de l'aéroport", detail: "Impact culturel fort — l'aéroport porte son nom. Consultation régulière via représentants au Comité CCC." },
            ].map(c => (
              <div key={c.name} className="border border-[#e8e8e8] bg-white p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-[#1a1a1a]">{c.name}</p>
                  <span className="text-xs font-bold text-[#003DA5] bg-[#003DA5]/10 px-2 py-0.5">{c.pop}</span>
                </div>
                <p className="text-xs font-semibold text-gray-600 mb-2">{c.role}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Initiatives */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Nos programmes</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Initiatives locales RVA</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {INITIATIVES.map(init => (
              <div key={init.name} className="flex flex-col border border-[#e8e8e8] bg-white overflow-hidden">
                <div className="h-1" style={{ background: init.color }} />
                <div className="flex-1 p-5">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center" style={{ background: init.color }}>
                      <init.Icon size={16} className="text-white" />
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 text-[10px] font-bold ${init.status === 'active' ? 'bg-[#009A44]/10 text-[#009A44]' : 'bg-amber-100 text-amber-700'}`}>
                      {init.status === 'active' ? '● Actif' : '○ Planifié'}
                    </span>
                  </div>
                  <p className="font-bold text-[#1a1a1a] mb-1 leading-snug">{init.name}</p>
                  <p className="text-xs font-semibold mb-3" style={{ color: init.color }}>{init.commune} · {init.year}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{init.desc}</p>
                  <p className="text-[10px] text-gray-400">Budget : <strong className="text-gray-600">{init.budget}</strong></p>
                </div>
                <div className="flex items-center gap-2 border-t border-[#e8e8e8] px-5 py-3 bg-gray-50">
                  <Users size={11} className="text-[#009A44] shrink-0" />
                  <p className="text-xs font-semibold text-[#009A44]">{init.beneficiaries}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FIH Art */}
        <section className="bg-[#1a1a1a] p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Culture congolaise</p>
          <h2 className="text-2xl font-bold text-white mb-3">
            <Palette size={20} className="inline mr-2 text-[#FFCE00]" />
            Programme FIH Art
          </h2>
          <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-2xl">
            FIH Art valorise les artistes congolais dans les espaces des terminaux internationaux — une vitrine unique pour la créativité kinoise vue par des millions de voyageurs. Peintures, sculptures et installations signées par les maîtres et les jeunes talents accueillent chaque voyageur à son arrivée et son départ.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {ART_ARTISTS.map(a => (
              <div key={a.name} className="flex items-start gap-3 border border-white/10 bg-white/5 px-4 py-3">
                <CheckCircle size={12} className="shrink-0 text-[#FFCE00] mt-0.5" />
                <div>
                  <p className="text-sm text-white font-semibold">{a.name}</p>
                  <p className="text-[10px] text-white/40">{a.note}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to={'/communaute/relations-communaute/fih-art' as never}
            className="inline-flex items-center gap-2 border border-[#FFCE00]/40 px-5 py-2.5 text-sm font-bold text-[#FFCE00] hover:bg-[#FFCE00] hover:text-[#1a1a1a] transition-colors"
          >
            Découvrir FIH Art <ArrowRight size={13} />
          </Link>
        </section>

        {/* Comité consultatif */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Gouvernance communautaire</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Comité Consultatif Communautaire (CCC)</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
            Le CCC est l'instance officielle de dialogue entre la RVA et les communes riveraines. Il se réunit trimestriellement pour examiner les questions d'impact sonore, d'emploi local, d'environnement et de développement communautaire. Ses recommandations sont consignées dans un procès-verbal public.
          </p>
          <div className="space-y-2.5 mb-6">
            {COMMITTEE_MEMBERS.map(m => (
              <div key={m.commune} className="flex flex-wrap items-center gap-4 border border-[#e8e8e8] bg-white px-5 py-4">
                <span className="font-bold text-[#1a1a1a] w-28 shrink-0">{m.commune}</span>
                <span className="text-xs font-semibold text-[#003DA5]">{m.rep}</span>
                <span className="text-xs text-gray-500">{m.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prochaines assemblées */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Agenda</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Prochaines assemblées communautaires</h2>
          <div className="space-y-3">
            {PROCHAINES_ASSEMBLEES.map(a => (
              <div key={a.date} className="flex items-start gap-4 border border-[#e8e8e8] bg-white px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10">
                  <Calendar size={16} className="text-[#003DA5]" />
                </div>
                <div>
                  <p className="font-bold text-[#003DA5] text-sm">{a.date}</p>
                  <p className="text-sm text-[#1a1a1a] mt-0.5">{a.sujet}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.lieu}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Pour participer ou obtenir les procès-verbaux des assemblées passées : <a href="mailto:communaute@fih-rva.com" className="text-[#003DA5] font-semibold hover:underline">communaute@fih-rva.com</a>
          </p>
        </section>

        {/* CTA */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-2">Nuisance sonore ?</p>
              <h2 className="text-xl font-bold text-white mb-1">Signalez une nuisance bruit à la RVA</h2>
              <p className="text-sm text-white/55 max-w-lg">Vous résidez dans une commune riveraine et souffrez du bruit de l'aéroport ? Utilisez notre formulaire de plainte en ligne.</p>
            </div>
            <Link to="/communaute/environnement-sonore/plaintes" className="shrink-0 flex items-center gap-2 bg-[#FFCE00] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-white transition-colors">
              <MessageSquare size={14} /> Déposer une plainte
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
