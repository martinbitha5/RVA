import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Shield, Globe, Flame, ClipboardList, CheckCircle, ChevronRight, ArrowRight, Lock } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

export const Route = createFileRoute('/corporate/surete-securite')({
  component: SureteSecuritePage,
  head: () => ({ meta: [{ title: "Sûreté & Sécurité — Aéroport International de N'djili · FIH" }] }),
});

const SUB_SECTIONS = [
  {
    href: '/corporate/surete/ecosysteme',
    Icon: Globe,
    label: 'Écosystème de la sûreté',
    desc: 'Acteurs, réglementation et cadre légal de la sûreté aéroportuaire à FIH : AAC, DGM, ANR, Police Aéroportuaire.',
    accent: 'bg-rdc-blue',
  },
  {
    href: '/corporate/surete/engagement',
    Icon: Shield,
    label: 'Engagement sécurité',
    desc: 'Politique de sécurité RVA, normes OACI Annexe 17, audits USAP et programme de formation continue.',
    accent: 'bg-rdc-green',
  },
  {
    href: '/corporate/surete/pompiers',
    Icon: Flame,
    label: 'Service incendie SSLIA',
    desc: 'Service de sauvetage et de lutte contre l\'incendie (SSLIA) catégorie 8 — capacité B747, A380.',
    accent: 'bg-rdc-red',
  },
  {
    href: '/corporate/surete/sms-sst',
    Icon: ClipboardList,
    label: 'SMS & SST',
    desc: 'Système de management de la sécurité (SMS) aviation et système de gestion de la santé-sécurité au travail.',
    accent: 'bg-amber-500',
  },
] as const;

const COMMITMENTS = [
  'Conformité OACI Annexe 17 — Sûreté de l\'aviation civile',
  'Conformité OACI Annexe 14 — Aérodromes (conception et exploitation)',
  'Programme National de Sûreté de l\'Aviation Civile (PNSAC)',
  'Inspections régulières par l\'Autorité de l\'Aviation Civile (AAC)',
  'Coopération INTERPOL, services douaniers DGDA, immigration DGM',
  'Certification SSLIA Catégorie 8 (aéronefs ≥ 100 tonnes MTOW)',
  'SMS conforme OACI Doc. 9859 (4ᵉ édition)',
  'Contrôle 100% des bagages de soute par rayons X',
  'Formation sécurité annuelle obligatoire pour tout le personnel de piste',
];

const STATS = [
  { value: 'Cat. 8',    label: 'Certification SSLIA',       sub: 'Niveau A380 / B747-8' },
  { value: 'OACI A17', label: 'Conformité sûreté',         sub: 'Annexe 17 — à jour' },
  { value: '24/7',      label: 'Surveillance aéroportuaire', sub: 'Police aéroportuaire' },
  { value: '100%',      label: 'Contrôle bagages soute',    sub: 'Rayons X + détection' },
];

function SureteSecuritePage() {
  const { t } = useTranslation();
  return (
    <main id="main-content">
      <PageHero
        image="/images/fih-bagages.jpg"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Corporate', href: '/corporate' },
          { label: 'Sûreté & Sécurité' },
        ]}
        eyebrow="Corporate · Sécurité"
        title={t('corporate.safetyAndSecurity')}
        subtitle={t('corporate.safetySubtitle')}
      />

      {/* Stats band */}
      <div className="bg-[#060D1E]">
        <div className="container py-12 md:py-14">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map(s => (
              <div key={s.label} className="border border-white/10 p-6 text-center">
                <p className="font-display text-2xl font-bold text-rdc-yellow">{s.value}</p>
                <p className="mt-2 text-xs font-semibold text-white/70">{s.label}</p>
                <p className="mt-0.5 text-[10px] text-white/35">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment banner */}
      <div className="bg-rdc-blue/5 border-y border-rdc-blue/20">
        <div className="container py-10 md:py-12">
          <div className="flex gap-5 items-start">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-rdc-blue">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <p className="font-display text-xl font-bold text-rdc-anthracite mb-2">Notre engagement : zéro compromis</p>
              <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                La RVA et l'Aéroport International de N'djili placent la sûreté et la sécurité au premier rang de leurs priorités opérationnelles. Chaque procédure, chaque équipement et chaque membre du personnel contribuent à garantir la protection des passagers, des équipages, des tiers et des infrastructures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-sections */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Domaines de sûreté</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite md:text-3xl">
            Organisation sécurité FIH
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SUB_SECTIONS.map(({ href, Icon, label, desc, accent }) => (
              <Link
                key={href}
                to={href as never}
                className="group flex items-start gap-5 border border-border bg-card p-6 hover:border-rdc-blue/40 hover:shadow-lg transition-all"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center ${accent}`}>
                  <Icon size={20} className="text-white" />
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

      {/* Compliance list */}
      <div className="bg-muted/40">
        <div className="container py-12 md:py-14">
          <div className="mb-2 flex items-center gap-4">
            <div className="h-px w-8 bg-rdc-blue" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Normes & conformités</p>
          </div>
          <h2 className="font-display mb-8 text-2xl font-bold text-rdc-anthracite">Standards appliqués à FIH</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {COMMITMENTS.map(c => (
              <div key={c} className="flex items-start gap-3 border border-border bg-background px-5 py-4">
                <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-rdc-green" />
                <p className="text-sm text-rdc-anthracite">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-rdc-anthracite">
        <div className="container py-10 md:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">Signaler un incident de sécurité</p>
              <p className="text-sm text-white/60 mt-1">Notre équipe sûreté est disponible 24h/24 pour tout signalement.</p>
            </div>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-rdc-red px-6 py-3 text-sm font-bold text-white hover:bg-rdc-red/80 transition-colors whitespace-nowrap"
            >
              Contacter la sûreté <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
