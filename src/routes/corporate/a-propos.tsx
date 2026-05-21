import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Building2, Plane, Users, Globe, Award } from 'lucide-react';

export const Route = createFileRoute('/corporate/a-propos')({
  component: AProposPage,
  head: () => ({ meta: [
    { title: "À propos — Aéroport International de N'djili · FIH" },
    { name: 'description', content: "Présentation de l'Aéroport International de N'djili (FIH/FZAA), Kinshasa, RDC — géré par la Régie des Voies Aériennes (RVA)." },
  ] }),
});

const STATS = [
  { value: '1953',    label: 'Inauguré en',             Icon: Building2 },
  { value: '4 700 m', label: 'Piste 06/24 (asphalt)',   Icon: Plane },
  { value: '1 M+',   label: 'Passagers / an (capacité)', Icon: Users },
  { value: '313 m',  label: 'Altitude (1 027 ft)',       Icon: Globe },
];

const MISSIONS = [
  'Gestion et développement des infrastructures aéroportuaires de la RDC',
  'Garantir la sécurité, la sûreté et la fluidité du trafic aérien',
  'Offrir aux passagers et compagnies aériennes un service de qualité internationale',
  'Contribuer au développement économique de Kinshasa et de la RDC',
  'Modernisation continue des équipements conformément aux normes OACI',
  'Engagement envers les communautés riveraines (Nsele, Masina, Kimbanseke)',
];

const CERTIFICATIONS = [
  { name: 'OACI — Conforme aux normes internationales', status: 'active' },
  { name: 'IATA — Membre actif depuis 1974', status: 'active' },
  { name: 'UEMOA — Accord de libre circulation aérien', status: 'active' },
  { name: 'ISO 9001 — Certification qualité (en cours)', status: 'pending' },
];

function AProposPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('corporate.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('corporate.about')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('corporate.aboutSubtitle')}</p>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(({ value, label, Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
              <Icon size={18} className="text-rdc-blue" />
            </div>
            <p className="font-display text-3xl font-bold text-rdc-blue">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* RVA description */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">L'Aéroport International de N'djili</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>L'Aéroport International de N'djili (code IATA : <strong className="text-rdc-anthracite">FIH</strong>, code OACI : <strong className="text-rdc-anthracite">FZAA</strong>) est le principal aéroport de la République Démocratique du Congo et le hub aérien majeur de l'Afrique centrale. Il est situé dans la Commune de Nsele, à environ 25 km à l'est du centre-ville de Kinshasa.</p>
            <p>Inauguré en 1953 comme base secondaire de la Sabena belge, il accueille aujourd'hui <strong className="text-rdc-anthracite">plus de 17 compagnies aériennes internationales</strong>. Le nouveau terminal international, ouvert en juin 2015, offre une capacité d'<strong className="text-rdc-anthracite">un million de passagers par an</strong>.</p>
            <p>L'aéroport est géré par la <strong className="text-rdc-anthracite">Régie des Voies Aériennes (RVA)</strong>, entreprise publique congolaise fondée en 1970, qui administre l'ensemble du réseau aéroportuaire national — plus de 20 aéroports et aérodromes, dont Lubumbashi (FBM), Goma (GOM), Bukavu (BKY) et Mbuji-Mayi (MJM).</p>
          </div>
        </div>
        <div>
          <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Notre mission</h2>
          <ul className="space-y-2.5">
            {MISSIONS.map(m => (
              <li key={m} className="flex items-start gap-2 text-sm">
                <Award size={13} className="mt-0.5 flex-shrink-0 text-rdc-yellow" /> {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Certifications */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Certifications & Affiliations</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {CERTIFICATIONS.map(c => (
          <div key={c.name} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${c.status === 'active' ? 'bg-rdc-green' : 'bg-amber-400'}`} />
            <p className="text-sm">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
