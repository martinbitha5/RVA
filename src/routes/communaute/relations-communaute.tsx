import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Users, School, Stethoscope, Hammer, Palette, Heart, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/communaute/relations-communaute')({
  component: RelationsCommunautePage,
  head: () => ({ meta: [{ title: "Relations communautaires — FIH · RVA" }] }),
});

const INITIATIVES = [
  {
    name: 'Programme Écoles de Nsele',
    commune: 'Nsele',
    icon: School,
    color: 'bg-rdc-blue/10 text-rdc-blue',
    desc: 'Réhabilitation de 8 écoles primaires, fourniture de matériel scolaire pour 4 200 élèves, bourses d\'excellence pour les lycéens.',
    status: 'active',
    beneficiaries: '4 200 élèves',
  },
  {
    name: 'Centre de Santé Masina',
    commune: 'Masina',
    icon: Stethoscope,
    color: 'bg-rdc-red/10 text-rdc-red',
    desc: 'Construction d\'un centre de santé communautaire de 30 lits avec service de maternité et pharmacie. Accueil de plus de 15 000 patients/an.',
    status: 'active',
    beneficiaries: '15 000 patients/an',
  },
  {
    name: 'Formation Professionnelle FIH',
    commune: 'Kimbanseke',
    icon: Hammer,
    color: 'bg-amber-100 text-amber-700',
    desc: 'Programme de formation aux métiers de l\'aéroport (sécurité, accueil, maintenance) pour les jeunes des communes riveraines. 200 places/an.',
    status: 'active',
    beneficiaries: '200 jeunes/an',
  },
  {
    name: 'Programme FIH Art',
    commune: 'Kinshasa',
    icon: Palette,
    color: 'bg-rdc-yellow/20 text-rdc-anthracite',
    desc: 'Exposition permanente des artistes congolais dans les terminaux (Chéri Samba, Moke, Moké, jeunes talents). Commandes d\'oeuvres aux artistes locaux.',
    status: 'active',
    beneficiaries: '25 artistes exposés',
  },
  {
    name: 'Reboisement Nsele',
    commune: "N'djili / Nsele",
    icon: Heart,
    color: 'bg-rdc-green/10 text-rdc-green',
    desc: 'Plantation de 10 000 arbres endémiques sur les terrains RVA et dans les communes riveraines pour réduire l\'impact environnemental.',
    status: 'planned',
    beneficiaries: '10 000 arbres',
  },
];

const COMMITTEE_MEMBERS = [
  { commune: 'Nsele',      rep: '3 représentants', role: 'Commune hôte — voix prépondérante' },
  { commune: 'Masina',     rep: '2 représentants', role: 'Zone de bruit principale' },
  { commune: 'Kimbanseke', rep: '2 représentants', role: 'Zone trajectoires d\'approche' },
  { commune: "N'djili",    rep: '2 représentants', role: 'Commune éponyme' },
  { commune: 'RVA',        rep: 'Direction',       role: 'Secrétariat & Présidence' },
];

function RelationsCommunautePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('community.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('community.communityRelations')}</h1>
      <p className="mb-10 max-w-2xl text-sm text-muted-foreground">{t('community.communitySubtitle')}</p>

      {/* Initiatives grid */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite">Initiatives locales</h2>
      <div className="mb-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {INITIATIVES.map(init => (
          <div key={init.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${init.color}`}>
                <init.icon size={18} />
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${init.status === 'active' ? 'bg-rdc-green/10 text-rdc-green' : 'bg-amber-100 text-amber-700'}`}>
                {init.status === 'active' ? 'Actif' : 'Planifié'}
              </span>
            </div>
            <p className="font-semibold text-rdc-anthracite mb-1">{init.name}</p>
            <p className="text-xs text-rdc-blue font-medium mb-2">{init.commune}</p>
            <p className="text-xs text-muted-foreground mb-3">{init.desc}</p>
            <div className="flex items-center gap-1.5 text-xs text-rdc-green font-medium">
              <Users size={10} /> {init.beneficiaries}
            </div>
          </div>
        ))}
      </div>

      {/* Consultative committee */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Comité consultatif communautaire</h2>
      <p className="mb-4 text-sm text-muted-foreground">{t('community.committeeDesc')}</p>
      <div className="space-y-2.5 mb-8">
        {COMMITTEE_MEMBERS.map(m => (
          <div key={m.commune} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3">
            <span className="font-semibold text-rdc-anthracite min-w-[120px]">{m.commune}</span>
            <span className="text-xs text-rdc-blue font-medium">{m.rep}</span>
            <span className="text-xs text-muted-foreground">{m.role}</span>
          </div>
        ))}
      </div>

      {/* FIH Art section */}
      <div className="rounded-2xl border-2 border-rdc-yellow/40 bg-rdc-yellow/5 p-6">
        <div className="mb-3 flex items-center gap-3">
          <Palette size={20} className="text-rdc-anthracite" />
          <h2 className="font-display font-bold text-rdc-anthracite text-lg">Programme FIH Art</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          FIH Art est le programme culturel de l'Aéroport de N'djili, dédié à la valorisation des artistes congolais dans les terminaux. Des oeuvres originales de Chéri Samba, Moke, et de jeunes talents kinois ornent les espaces publics des terminaux.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Chéri Samba', 'Moke', 'Sculpteurs Mbongo', 'Jeunes talents Académie des Beaux-Arts'].map(a => (
            <span key={a} className="flex items-center gap-1 rounded-full bg-rdc-yellow/30 px-3 py-1 text-xs font-medium text-rdc-anthracite">
              <CheckCircle size={9} className="text-rdc-green" /> {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
