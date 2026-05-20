import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Stethoscope, Syringe, AlertTriangle, CheckCircle, Phone, Clock } from 'lucide-react';

export const Route = createFileRoute('/guide/sante')({
  component: SantePage,
  head: () => ({ meta: [{ title: "Santé & Vaccination — Guide FIH" }] }),
});

const VACCINATIONS = [
  { vaccine: 'Fièvre jaune',      status: 'obligatoire', validity: 'À vie',       note: 'Carnet jaune OMS exigé à l\'entrée/sortie' },
  { vaccine: 'Paludisme',         status: 'recommandé',  validity: 'Préventif',   note: 'Prophylaxie antipaludéenne recommandée' },
  { vaccine: 'Typhoïde',          status: 'recommandé',  validity: '3 ans (inj)', note: 'Surtout hors de Kinshasa' },
  { vaccine: 'Hépatite A',        status: 'recommandé',  validity: '20 ans',      note: 'Toute durée de séjour' },
  { vaccine: 'Hépatite B',        status: 'recommandé',  validity: 'À vie',       note: '3 injections si non immunisé' },
  { vaccine: 'Méningite ACYW',    status: 'recommandé',  validity: '5 ans',       note: 'Surtout si contact avec population locale' },
  { vaccine: 'COVID-19',          status: 'selon pays',  validity: 'Variable',    note: 'Vérifiez les exigences du pays de destination' },
];

function SantePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.health')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.healthSubtitle')}</p>

      {/* Yellow fever mandatory alert */}
      <div className="mb-8 flex items-start gap-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-200">
          <Syringe size={22} className="text-amber-700" />
        </div>
        <div>
          <p className="font-semibold text-amber-900 text-base mb-1">Fièvre jaune — Vaccination OBLIGATOIRE</p>
          <p className="text-sm text-amber-800">Le carnet international de vaccination contre la fièvre jaune (carnet jaune OMS) est obligatoire en RDC. Il est systématiquement vérifié à l'arrivée et au départ. Validité : à vie pour les vaccins administrés après l'âge de 1 an depuis 2016.</p>
        </div>
      </div>

      {/* Vaccinations table */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Syringe size={18} className="text-rdc-blue" /> Vaccinations recommandées / exigées
      </h2>
      <div className="mb-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Vaccin</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden sm:table-cell">Validité</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground hidden md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {VACCINATIONS.map((v, i) => (
              <tr key={v.vaccine} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                <td className="px-4 py-3 font-semibold text-rdc-anthracite">{v.vaccine}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.status === 'obligatoire' ? 'bg-rdc-red/10 text-rdc-red' :
                    v.status === 'recommandé' ? 'bg-amber-100 text-amber-700' :
                    'bg-muted text-muted-foreground'
                  }`}>{v.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{v.validity}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">{v.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Medical center */}
      <h2 className="font-display mb-4 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Stethoscope size={18} className="text-rdc-blue" /> Centre Médical FIH
      </h2>
      <div className="rounded-2xl border border-border bg-card p-5 mb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-rdc-anthracite mb-2">Services disponibles 24h/24</p>
            <ul className="space-y-1.5">
              {['Soins d\'urgence', 'Vaccination jaune (30 USD)', 'Tests de paludisme', 'Premiers secours', 'Consultation médicale', 'Pharmacie de garde'].map(s => (
                <li key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={10} className="text-rdc-green flex-shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-rdc-anthracite mb-2">Contact</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><Clock size={10} /> Ouvert 24h/24, 7j/7</p>
              <a href="tel:+243810000000" className="flex items-center gap-1.5 text-rdc-blue hover:underline">
                <Phone size={10} /> +243 81 XXX XXXX
              </a>
              <p>Localisation : Terminal International, Niveau 0 (avant sécurité)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-rdc-blue/20 bg-rdc-blue/5 p-4">
        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
        <p className="text-sm text-rdc-blue/80">{t('guide.healthNote')}</p>
      </div>
    </div>
  );
}
