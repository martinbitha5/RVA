import { createFileRoute, Link } from '@tanstack/react-router';
import { Shield, Globe, Flame, ClipboardList, CheckCircle, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/surete-securite')({
  component: SureteSecuritePage,
  head: () => ({
    meta: [
      { title: "Sûreté & Sécurité — Aéroport International de N'djili · FIH" },
      { name: 'description', content: "Programme de sûreté et de sécurité de l'Aéroport de N'djili (FIH) — certifications OACI, AVSEC, SSLIA catégorie 8, surveillance 24h/24." },
    ],
  }),
});

const STATS = [
  { value: 'Cat. 8',   label: 'Certification SSLIA',         sub: 'Niveau A380 / B747-8 / B777X' },
  { value: 'OACI A17', label: 'Conformité sûreté',           sub: 'Annexe 17 — mise à jour 2023' },
  { value: '24/7',     label: 'Surveillance aéroportuaire',  sub: 'Police nationale aéroportuaire' },
  { value: '100%',     label: 'Contrôle bagages soute',      sub: 'Rayons X + EDS + détection' },
];

const CERTIFICATIONS = [
  { name: "OACI Annexe 17 — Sûreté de l'aviation civile internationale", active: true },
  { name: 'OACI Annexe 14 — Normes conception et exploitation aérodromes', active: true },
  { name: "Programme National de Sûreté de l'Aviation Civile (PNSAC)", active: true },
  { name: "Inspections régulières par l'Autorité de l'Aviation Civile (AAC-RDC)", active: true },
  { name: 'Coopération INTERPOL, DGDA (douanes) et DGM (immigration)', active: true },
  { name: 'Certification SSLIA Catégorie 8 — aéronefs ≥ 100 tonnes MTOW', active: true },
  { name: 'SMS conforme OACI Doc. 9859 (4ᵉ édition 2018)', active: true },
  { name: 'Contrôle 100% des bagages de soute par rayons X EDS', active: true },
  { name: 'Formation sécurité annuelle obligatoire tout personnel piste', active: true },
  { name: 'IATA ISAGO (Ground Handling Audit) — dossier en cours', active: false },
];

const DOMAINS = [
  {
    href: '/corporate/surete/ecosysteme',
    Icon: Globe,
    label: 'Écosystème de la sûreté',
    desc: "Acteurs et cadre légal : Autorité de l'Aviation Civile (AAC), DGM, ANR, Police Nationale Aéroportuaire, ANS.",
    color: '#003DA5',
  },
  {
    href: '/corporate/surete/engagement',
    Icon: Shield,
    label: 'Engagement sécurité',
    desc: 'Politique de sécurité RVA, normes OACI Annexe 17, audits USAP et programme de formation continue des agents.',
    color: '#009A44',
  },
  {
    href: '/corporate/surete/pompiers',
    Icon: Flame,
    label: 'Service incendie SSLIA',
    desc: "Service de sauvetage et de lutte contre l'incendie (SSLIA) catégorie 8 — capacité B747-8, A380, B777X.",
    color: '#CE1126',
  },
  {
    href: '/corporate/surete/sms-sst',
    Icon: ClipboardList,
    label: 'SMS & SST',
    desc: 'Système de management de la sécurité (SMS) aviation et système de gestion de la santé-sécurité au travail.',
    color: '#d97706',
  },
];

const AVSEC_MEASURES = [
  { title: 'Contrôle passagers et bagages cabine', desc: "Portiques détecteurs de métaux, scanners corporels et fouille systématique à tous les points d'accès des zones de sûreté." },
  { title: 'Contrôle 100% bagages soute', desc: 'Chaque bagage enregistré est soumis à un contrôle par rayons X EDS avant chargement en soute. Détection explosifs intégrée.' },
  { title: "Contrôle d'accès zones réservées", desc: "Système de badges d'accès biométriques à toutes les entrées de la zone côté piste. Vérification antécédents du personnel." },
  { title: 'Périmètre de sécurité', desc: 'Clôture périmétrique renforcée, éclairage nocturne permanent, rondes régulières de la police aéroportuaire et caméras CCTV.' },
  { title: "Plan d'urgence aéroportuaire", desc: "Plan d'urgence testé trimestriellement avec les compagnies aériennes, la police, les pompiers SSLIA et les services médicaux." },
  { title: 'Formation AVSEC continue', desc: "Formation annuelle obligatoire pour tous les agents de sûreté, conforme au programme OACI AVSEC et aux directives de l'AAC-RDC." },
];

function SureteSecuritePage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <div className="relative select-none">
        <img src="/images/fih-hero-1.jpg" alt="Sûreté aéroportuaire — Aéroport N'djili" className="h-64 sm:h-80 w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Corporate · Sécurité aéroportuaire</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Sûreté et Sécurité à FIH</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#CE1126] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">Sûreté</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="border border-[#e8e8e8] bg-white p-5 text-center">
                <p className="text-2xl font-bold text-[#FFCE00] leading-none">{s.value}</p>
                <p className="mt-2 text-xs font-bold text-[#1a1a1a]">{s.label}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement zéro compromis */}
        <section>
          <div className="flex items-start gap-5 border border-[#003DA5]/30 bg-[#003DA5]/5 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#003DA5]">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-xl text-[#1a1a1a] mb-2">Notre engagement : zéro compromis sur la sécurité</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                La RVA et l'Aéroport International de N'djili placent la sûreté et la sécurité au premier rang de leurs priorités opérationnelles. Chaque procédure, chaque équipement et chaque membre du personnel — qu'il soit agent AVSEC, pompier SSLIA ou technicien — contribue à garantir la protection des passagers, des équipages, des tiers et des infrastructures, conformément aux normes OACI les plus strictes.
              </p>
            </div>
          </div>
        </section>

        {/* Domaines de sûreté */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Organisation sécurité</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Domaines de sûreté FIH</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {DOMAINS.map(({ href, Icon, label, desc, color }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-[#e8e8e8] bg-white p-6 hover:border-[#003DA5]/40 hover:shadow-md transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center" style={{ background: color }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors mb-1">{label}</p>
                  <p className="text-sm text-gray-500 leading-snug">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mesures AVSEC */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Programme AVSEC</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Mesures de sûreté en vigueur à FIH</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {AVSEC_MEASURES.map(m => (
              <div key={m.title} className="flex gap-4 border border-[#e8e8e8] bg-white p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#009A44]/10">
                  <CheckCircle size={16} className="text-[#009A44]" />
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm mb-1">{m.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Normes & conformités</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Standards appliqués à FIH</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map(c => (
              <div key={c.name} className="flex items-start gap-3 border border-[#e8e8e8] bg-white px-4 py-3">
                <CheckCircle size={14} className={`mt-0.5 shrink-0 ${c.active ? 'text-[#009A44]' : 'text-amber-400'}`} />
                <p className="text-sm text-[#1a1a1a]">{c.name}</p>
                {!c.active && <span className="ml-auto shrink-0 text-[10px] font-bold text-amber-600">En cours</span>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA urgence */}
        <div className="bg-[#1a1a1a] p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[#CE1126] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFCE00] mb-1">Signalement</p>
                <h2 className="text-xl font-bold text-white mb-1">Signaler un incident de sécurité</h2>
                <p className="text-sm text-white/55 max-w-lg">Notre équipe sûreté est disponible 24h/24 pour tout signalement d'incident ou comportement suspect. Ne tardez jamais à signaler.</p>
              </div>
            </div>
            <Link to="/contact" className="shrink-0 flex items-center gap-2 bg-[#CE1126] px-6 py-3 text-sm font-bold text-white hover:bg-[#CE1126]/80 transition-colors">
              Contacter la sûreté <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
