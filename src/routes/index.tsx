import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();

  return (
    <section className="container py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rdc-blue">
        {t('welcome')}
      </p>
      <h1 className="font-display mt-4 text-5xl font-bold leading-[1.05] text-rdc-anthracite md:text-7xl">
        {t('home.hero.title').split(' ').slice(0, 3).join(' ')}
        <br />
        <span className="text-rdc-blue">
          {t('home.hero.title').split(' ').slice(3).join(' ')}
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rdc-anthracite/75">
        {t('home.hero.subtitle')}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/vols/departs"
          className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rdc-blue-dark"
        >
          {t('home.hero.cta')}
        </a>
        <a
          href="/guide/quitter-kinshasa"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-rdc-anthracite shadow-sm transition-colors hover:bg-muted"
        >
          {t('home.hero.ctaSecondary')}
        </a>
      </div>

      <div className="mt-16 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
          ⚠️ {t('guide.yellowFeverAlert').replace('⚠️ ', '')}
        </p>
        <p className="mt-1 text-sm text-amber-800/80">{t('guide.yellowFeverDetails')}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <PaletteCard label="Bleu RDC" hex="#003DA5" textClass="text-white" bgClass="bg-rdc-blue" />
        <PaletteCard label="Jaune solaire" hex="#FFCE00" textClass="text-rdc-anthracite" bgClass="bg-rdc-yellow" />
        <PaletteCard label="Rouge sang" hex="#CE1126" textClass="text-white" bgClass="bg-rdc-red" />
        <PaletteCard label="Vert drapeau" hex="#009A44" textClass="text-white" bgClass="bg-rdc-green" />
      </div>

      <div className="mt-10 rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">ÉTAPE 1-2 complètes ✅</strong> — Header mega-menu, Footer 5 colonnes, i18n FR/EN, 15 tables Supabase avec RLS, 17 compagnies, 34 destinations, seeds.
        Prochaine étape : Page d'accueil complète (§6.1).
      </div>
    </section>
  );
}

function PaletteCard({
  label,
  hex,
  bgClass,
  textClass,
}: {
  label: string;
  hex: string;
  bgClass: string;
  textClass: string;
}) {
  return (
    <div className={`rounded-lg ${bgClass} ${textClass} p-5 transition-transform hover:-translate-y-1`}>
      <p className="font-display text-lg font-semibold">{label}</p>
      <p className="mt-1 font-mono text-xs opacity-75">{hex}</p>
    </div>
  );
}
