import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Shield, Globe, Flame, ClipboardList, CheckCircle, ChevronRight } from 'lucide-react';

export const Route = createFileRoute('/corporate/surete-securite')({
  component: SureteSecuritePage,
  head: () => ({ meta: [{ title: "Sûreté & Sécurité — RVA · FIH" }] }),
});

const SUB_SECTIONS = [
  { key: 'safetyEcosystem',  href: '/corporate/surete/ecosysteme', Icon: Globe,         color: 'bg-rdc-blue/10 text-rdc-blue',   desc: 'Acteurs et réglementation de la sûreté aéroportuaire' },
  { key: 'safetyCommitment', href: '/corporate/surete/engagement', Icon: Shield,        color: 'bg-rdc-green/10 text-rdc-green', desc: 'Engagements et normes de sécurité OACI/IATA' },
  { key: 'fireBrigade',      href: '/corporate/surete/pompiers',   Icon: Flame,         color: 'bg-rdc-red/10 text-rdc-red',     desc: 'Service d\'incendie et de sauvetage (SSLIA)' },
  { key: 'safetyManagement', href: '/corporate/surete/sms-sst',    Icon: ClipboardList, color: 'bg-amber-100 text-amber-700',    desc: 'SMS aviation et système de gestion SST' },
] as const;

const COMMITMENTS = [
  'Conformité aux normes OACI Annexe 17 (Sûreté)',
  'Conformité aux normes OACI Annexe 14 (Aérodromes)',
  'Programme National de Sûreté de l\'Aviation Civile (PNSAC)',
  'Inspections régulières par l\'Autorité de l\'Aviation Civile (AAC)',
  'Coopération avec INTERPOL et les services douaniers DRC',
  'Certification SSLIA Cat. 8 (100 tonnes MTOW — B747/A380)',
  'Système de management de la sécurité (SMS) conforme OACI Doc. 9859',
];

function SureteSecuritePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.safetyAndSecurity')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.safetySubtitle')}</p>

      {/* Hero commitment */}
      <div className="mb-10 flex items-start gap-5 rounded-2xl border-2 border-rdc-blue/30 bg-rdc-blue/5 p-6">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-rdc-blue">
          <Shield size={26} className="text-white" />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-rdc-anthracite mb-2">Notre engagement sûreté & sécurité</p>
          <p className="text-sm text-muted-foreground">La RVA et l'Aéroport International de N'djili placent la sûreté et la sécurité au premier rang de leurs priorités. Chaque procédure, chaque équipement et chaque agent contribuent à garantir la sécurité des passagers, des tripulants et des tiers.</p>
        </div>
      </div>

      {/* Sub-sections */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {SUB_SECTIONS.map(({ key, href, Icon, color, desc }) => (
          <Link key={key} to={href as never}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-rdc-blue/30 hover:shadow-md transition-all">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`corporate.${key}`)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Commitments */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Normes et conformités</h2>
      <div className="rounded-2xl border border-border bg-card p-5">
        <ul className="space-y-2.5">
          {COMMITMENTS.map(c => (
            <li key={c} className="flex items-start gap-2 text-sm">
              <CheckCircle size={14} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
