import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Wifi, Smartphone, Signal, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/guide/wifi-connectivite')({
  component: WifiConnectivitePage,
  head: () => ({ meta: [{ title: "Wi-Fi & Connectivité — Aéroport N'djili · FIH" }] }),
});

const OPERATORS = [
  {
    name: 'Vodacom Congo',
    tech: '4G LTE / 3G',
    coverage: 'Excellente dans les deux terminaux',
    roaming: true,
    note: 'Meilleure couverture de Kinshasa',
    color: 'bg-red-600',
  },
  {
    name: 'Airtel Congo',
    tech: '4G / 3G',
    coverage: 'Bonne dans le terminal international',
    roaming: true,
    note: 'Partenaire Mobile Money Airtel Money',
    color: 'bg-rdc-red',
  },
  {
    name: 'Orange Congo',
    tech: '4G / 3G',
    coverage: 'Correcte dans les deux terminaux',
    roaming: true,
    note: 'Réseau Orange International',
    color: 'bg-orange-500',
  },
  {
    name: 'Africell Congo',
    tech: '3G',
    coverage: 'Zone d\'arrivées uniquement',
    roaming: false,
    note: 'Réseau local uniquement',
    color: 'bg-blue-500',
  },
];

const WIFI_STEPS = [
  'Connectez-vous au réseau "FIH-Free-WiFi"',
  'Ouvrez votre navigateur — portail captif auto-détecté',
  'Entrez votre numéro de téléphone (n° congolais ou international)',
  'Recevez le code OTP par SMS',
  'Validez pour obtenir 1h gratuite (30 min en période chargée)',
  'Prolongement disponible : 2 USD/heure supplémentaire via Mobile Money',
];

function WifiConnectivitePage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.wifiConnectivity')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('guide.wifiSubtitle')}</p>

      {/* Free WiFi */}
      <div className="mb-10 rounded-2xl border-2 border-rdc-blue/30 bg-rdc-blue/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rdc-blue">
            <Wifi size={22} className="text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-rdc-anthracite">Wi-Fi Gratuit FIH</p>
            <p className="text-xs text-muted-foreground">Réseau : FIH-Free-WiFi · Disponible dans les deux terminaux</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-rdc-anthracite mb-3">Comment se connecter :</p>
            <ol className="space-y-2">
              {WIFI_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue text-[9px] font-bold text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl bg-white border border-border p-4">
              <p className="text-xs font-semibold text-rdc-anthracite mb-2">Détails connexion</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>📶 SSID : <strong>FIH-Free-WiFi</strong></p>
                <p>🔑 Mot de passe : aucun (portail captif)</p>
                <p>⏱️ Durée gratuite : 1 heure</p>
                <p>💰 Extension : 2 USD/h (Mobile Money)</p>
                <p>📡 Débit : ~5–20 Mbps selon fréquentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile operators */}
      <h2 className="font-display mb-5 text-xl font-bold text-rdc-anthracite flex items-center gap-2">
        <Signal size={18} className="text-rdc-blue" /> Opérateurs mobiles à FIH
      </h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {OPERATORS.map(op => (
          <div key={op.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${op.color}`}>
                <Smartphone size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-rdc-anthracite">{op.name}</p>
                <p className="text-xs text-muted-foreground">{op.tech}</p>
              </div>
              {op.roaming && (
                <span className="ml-auto rounded-full bg-rdc-green/10 px-2 py-0.5 text-[10px] font-medium text-rdc-green">Roaming</span>
              )}
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><Signal size={9} /> {op.coverage}</p>
              <p className="flex items-center gap-1.5"><CheckCircle size={9} className="text-rdc-green" /> {op.note}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{t('guide.wifiNote')}</p>
    </div>
  );
}
