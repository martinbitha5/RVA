import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ScrollText, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

export const Route = createFileRoute('/guide/douanes-immigration')({
  component: DouanesImmigrationPage,
  head: () => ({ meta: [{ title: "Douanes & Immigration — FIH" }] }),
});

const VISA_TYPES = [
  { country: 'Union Européenne',         type: 'Visa obligatoire',        note: 'eVisa disponible sur evisa.gouv.cd', color: 'bg-amber-100 text-amber-800' },
  { country: 'États-Unis',              type: 'Visa obligatoire',        note: 'eVisa ou ambassade', color: 'bg-amber-100 text-amber-800' },
  { country: 'CEDEAO (Afrique de l\'O)',type: 'Visa à l\'arrivée',       note: '30 jours — 85 USD', color: 'bg-emerald-100 text-emerald-800' },
  { country: 'Angola',                  type: 'Visa à l\'arrivée',       note: '30 jours — 85 USD', color: 'bg-emerald-100 text-emerald-800' },
  { country: 'Rwanda / Burundi',        type: 'Visa à l\'arrivée',       note: '30 jours — 85 USD', color: 'bg-emerald-100 text-emerald-800' },
  { country: 'RDC (ressortissants)',    type: 'Libre accès',             note: 'Passeport ou CNI', color: 'bg-rdc-green/20 text-rdc-green' },
];

const DGDA_RULES = [
  'Déclarez tout montant en espèces supérieur à 10 000 USD (ou équivalent)',
  'Produits commerciaux et marchandises importées soumis aux droits de douane',
  'Médicaments en grande quantité : ordonnance médicale requise',
  'Objets d\'art, antiquités et faune/flore protégée (CITES) : déclaration obligatoire',
  'Véhicules importés : droits de douane applicables',
  'Produits alimentaires en grandes quantités peuvent faire l\'objet d\'un contrôle',
];

function DouanesImmigrationPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.customsImmigration')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.customsSubtitle')}</p>

      {/* DGM Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
            <ScrollText size={18} className="text-rdc-blue" />
          </div>
          <div>
            <h2 className="font-display font-bold text-rdc-anthracite">DGM — Direction Générale des Migrations</h2>
            <p className="text-xs text-muted-foreground">Contrôle passeports et visas</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nationalité / Région</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type de visa</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {VISA_TYPES.map((v, i) => (
                <tr key={v.country} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                  <td className="px-4 py-3 font-medium text-rdc-anthracite">{v.country}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${v.color}`}>{v.type}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden sm:table-cell">{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <a href="https://evisa.gouv.cd" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-rdc-blue hover:underline">
          <ExternalLink size={13} /> Demander un eVisa RDC — evisa.gouv.cd
        </a>
      </div>

      {/* DGDA Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <AlertTriangle size={18} className="text-amber-600" />
          </div>
          <div>
            <h2 className="font-display font-bold text-rdc-anthracite">DGDA — Direction Générale des Douanes et Accises</h2>
            <p className="text-xs text-muted-foreground">Contrôle douanier et accises</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-2.5">
            {DGDA_RULES.map(r => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <CheckCircle size={13} className="mt-0.5 flex-shrink-0 text-rdc-blue" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-rdc-blue/20 bg-rdc-blue/5 p-4 text-sm text-rdc-blue/80">
        <ScrollText size={14} className="mt-0.5 flex-shrink-0" />
        {t('guide.customsNote')}
      </div>
    </div>
  );
}
