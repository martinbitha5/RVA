import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Users, CheckCircle, AlertTriangle, Phone, FileText } from 'lucide-react';

export const Route = createFileRoute('/guide/passagers-mineurs')({
  component: PassagersMineurs,
  head: () => ({ meta: [{ title: "Mineurs non accompagnés — UM Service · FIH" }] }),
});

const AGE_RULES = [
  { age: 'Moins de 5 ans',  rule: 'Ne peut voyager seul en aucun cas', color: 'bg-rdc-red/10 text-rdc-red' },
  { age: '5 à 11 ans',     rule: 'Service UM obligatoire (Unaccompanied Minor)', color: 'bg-amber-100 text-amber-700' },
  { age: '12 à 15 ans',    rule: 'Service UM recommandé — selon compagnie', color: 'bg-blue-100 text-blue-700' },
  { age: '16 à 17 ans',    rule: 'Voyage seul possible avec autorisation parentale notariée', color: 'bg-rdc-green/10 text-rdc-green' },
];

const UM_PROCESS = [
  'Réservez le service UM auprès de votre compagnie aérienne (supplément applicable)',
  'Fournissez les coordonnées du parent/tuteur à l\'arrivée (nom, adresse, téléphone)',
  'Présentez-vous au comptoir d\'enregistrement 1h avant les autres passagers',
  'L\'agent UM prend en charge l\'enfant dès l\'enregistrement jusqu\'à la remise à l\'accompagnant',
  'En cas de correspondance : un agent UM s\'occupe du transfert entre les vols',
  'À l\'arrivée : l\'enfant est remis uniquement à la personne désignée, sur présentation d\'une pièce d\'identité',
];

const REQUIRED_DOCS = [
  'Passeport valide du mineur',
  'Autorisation de voyage notariée des deux parents (si voyage hors RDC)',
  'Coordonnées complètes du parent/tuteur à destination',
  'Formulaire UM de la compagnie aérienne (rempli et signé)',
  'Carnet de vaccination (fièvre jaune)',
];

function PassagersMineurs() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.unaccompaniedMinors')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.minorsSubtitle')}</p>

      {/* Age rules */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite">Âge et règles de voyage</h2>
      <div className="mb-8 space-y-3">
        {AGE_RULES.map(r => (
          <div key={r.age} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3">
            <Users size={15} className="text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-sm min-w-[120px]">{r.age}</span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${r.color}`}>{r.rule}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Process */}
        <div>
          <h2 className="font-display mb-4 text-lg font-bold text-rdc-anthracite">Procédure UM</h2>
          <ul className="space-y-3">
            {UM_PROCESS.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue text-[10px] font-bold text-white">{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Documents */}
        <div>
          <h2 className="font-display mb-4 text-lg font-bold text-rdc-anthracite">Documents requis</h2>
          <div className="rounded-2xl border border-border bg-card p-5 mb-5">
            <ul className="space-y-2.5">
              {REQUIRED_DOCS.map(d => (
                <li key={d} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-green" /> {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-amber-600" />
              <p className="text-xs text-amber-800">{t('guide.minorsNote')}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-4 flex items-start gap-3">
            <FileText size={14} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
            <div className="text-xs">
              <p className="font-semibold text-rdc-anthracite mb-1">Bureau UM — FIH</p>
              <a href="tel:+243810000000" className="flex items-center gap-1 text-rdc-blue hover:underline">
                <Phone size={9} /> +243 81 XXX XXXX
              </a>
              <p className="text-muted-foreground mt-0.5">Terminal International — Niveau 1, Comptoir UM (à gauche des enregistrements)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
