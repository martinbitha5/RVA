import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Leaf, Users, Paintbrush2, ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Leaf,
    titleKey: 'home.community.environment.title',
    descKey: 'home.community.environment.desc',
    href: '/communaute/environnement-durabilite',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600 bg-emerald-100',
  },
  {
    icon: Users,
    titleKey: 'home.community.relations.title',
    descKey: 'home.community.relations.desc',
    href: '/communaute/relations-communaute/initiatives',
    bg: 'bg-blue-50',
    iconColor: 'text-rdc-blue bg-rdc-blue/10',
  },
  {
    icon: Paintbrush2,
    titleKey: 'home.community.art.title',
    descKey: 'home.community.art.desc',
    href: '/communaute/relations-communaute/fih-art',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600 bg-amber-100',
  },
];

export function CommunityHighlight() {
  const { t } = useTranslation();

  return (
    <section className="container py-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-green">
          {t('home.community.eyebrow')}
        </p>
        <h2 className="font-display mt-1 text-2xl font-bold text-rdc-anthracite md:text-3xl">
          {t('home.community.title')}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {t('home.community.subtitle')}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <Link
            key={h.href}
            to={h.href as never}
            className={`group rounded-2xl p-6 transition-shadow hover:shadow-lg ${h.bg}`}
          >
            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${h.iconColor}`}>
              <h.icon size={20} />
            </div>
            <h3 className="font-display font-semibold text-rdc-anthracite">{t(h.titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(h.descKey)}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-rdc-anthracite/70 transition-colors group-hover:text-rdc-anthracite">
              {t('common.learnMore')} <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      {/* Communes ribbon */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 rounded-xl border border-rdc-green/20 bg-rdc-green/5 px-5 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-rdc-green">
          {t('home.community.communes')}
        </p>
        {['Nsele', 'Masina', 'Kimbanseke'].map((c) => (
          <span
            key={c}
            className="rounded-full bg-rdc-green/10 px-3 py-1 text-xs font-medium text-rdc-green"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
