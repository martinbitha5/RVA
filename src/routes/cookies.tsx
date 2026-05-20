import { createFileRoute } from '@tanstack/react-router';
import { Cookie } from 'lucide-react';

export const Route = createFileRoute('/cookies')({
  component: CookiesPage,
  head: () => ({ meta: [{ title: "Politique cookies — FIH · RVA" }] }),
});

const COOKIE_TYPES = [
  {
    category: 'Cookies essentiels',
    required: true,
    color: 'bg-rdc-green/10 text-rdc-green',
    description: 'Indispensables au fonctionnement du site. Ils permettent la gestion de votre session, la sécurité des connexions et la mémorisation de vos préférences de langue.',
    examples: [
      { name: 'sb-auth-token', purpose: 'Authentification Supabase (session utilisateur)', duration: 'Session / 1 heure' },
      { name: 'i18next', purpose: 'Mémorisation de la langue sélectionnée', duration: '1 an' },
      { name: '__cf_bm', purpose: 'Protection Cloudflare (sécurité)', duration: '30 minutes' },
    ],
  },
  {
    category: 'Cookies analytiques',
    required: false,
    color: 'bg-amber-50 text-amber-700',
    description: 'Nous permettent de comprendre comment les visiteurs utilisent le site afin d\'améliorer l\'expérience utilisateur. Ces données sont agrégées et anonymisées (Plausible Analytics, respect RGPD, sans suivi inter-sites).',
    examples: [
      { name: '_plausible', purpose: 'Statistiques de visite anonymisées (Plausible)', duration: 'Session' },
    ],
  },
  {
    category: 'Cookies fonctionnels',
    required: false,
    color: 'bg-rdc-blue/10 text-rdc-blue',
    description: 'Améliorent les fonctionnalités du site en mémorisant vos préférences (par ex. votre aérogare préférée, vos compagnies favorites).',
    examples: [
      { name: 'fih-prefs', purpose: 'Préférences d\'affichage (tableau vols, filtres)', duration: '6 mois' },
    ],
  },
] as const;

function CookiesPage() {
  return (
    <div className="container py-10 md:py-14 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
          <Cookie size={18} className="text-rdc-blue" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">Légal</p>
          <h1 className="font-display font-bold text-3xl text-rdc-anthracite">Politique cookies</h1>
        </div>
      </div>

      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un site web.
        Il permet de reconnaître votre navigateur et de mémoriser certaines informations.
        Cette page vous explique comment et pourquoi nous utilisons des cookies sur le site de l'Aéroport International de N'djili (FIH).
      </p>

      <div className="space-y-8">
        {COOKIE_TYPES.map(type => (
          <section key={type.category} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${type.color}`}>
                {type.required ? 'Requis' : 'Optionnel'}
              </span>
              <h2 className="font-display font-bold text-lg text-rdc-anthracite">{type.category}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{type.description}</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-2 text-left font-semibold text-rdc-anthracite">Nom du cookie</th>
                    <th className="pb-2 text-left font-semibold text-rdc-anthracite">Finalité</th>
                    <th className="pb-2 text-left font-semibold text-rdc-anthracite">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {type.examples.map(ex => (
                    <tr key={ex.name} className="border-b border-border/50 last:border-0">
                      <td className="py-2 font-mono text-rdc-anthracite pr-4">{ex.name}</td>
                      <td className="py-2 text-muted-foreground pr-4">{ex.purpose}</td>
                      <td className="py-2 text-muted-foreground whitespace-nowrap">{ex.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-display font-bold text-lg text-rdc-anthracite mb-3">Gérer vos préférences</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. Voici les liens vers les guides des principaux navigateurs :
        </p>
        <ul className="text-sm space-y-1">
          {[
            { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
            { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent' },
            { name: 'Safari (Apple)', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' },
            { name: 'Microsoft Edge', url: 'https://support.microsoft.com/fr-fr/topic/supprimer-les-cookies-dans-microsoft-edge-63947406' },
          ].map(b => (
            <li key={b.name}>
              <a href={b.url} target="_blank" rel="noopener noreferrer"
                className="text-rdc-blue hover:underline">
                → {b.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Notez que la désactivation de certains cookies essentiels peut affecter le fonctionnement du site et de l'espace client.
        </p>
      </section>
    </div>
  );
}
