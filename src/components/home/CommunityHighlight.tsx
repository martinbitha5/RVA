import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Leaf, Users, Paintbrush2, ArrowRight } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Leaf,
    href: '/communaute/environnement-durabilite',
    titleKey: 'community.environmentSustainability',
    desc: 'Gestion de l\'impact environnemental autour de FIH — Pool Malebo, fleuve Congo, faune aviaire.',
    accent: '#009A44',
  },
  {
    icon: Users,
    href: '/communaute/relations-communaute',
    titleKey: 'community.relations',
    desc: 'Dialogue permanent avec les communes de Nsele, Masina et Kimbanseke.',
    accent: '#FFCE00',
  },
  {
    icon: Paintbrush2,
    href: '/communaute/relations-communaute',
    titleKey: 'community.fihArt',
    desc: 'Programme FIH Art — Chéri Samba, Moke et la nouvelle génération d\'artistes kinois.',
    accent: '#CE1126',
  },
] as const;

const COMMUNES = ['Nsele', 'Masina', 'Kimbanseke', 'N\'djili'];

export function CommunityHighlight() {
  const { t } = useTranslation();

  return (
    <section className="section-night overflow-hidden">
      <div className="container py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] items-start">

          {/* Left: text + highlights */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-yellow">{t('community.title')}</p>
            </div>

            <h2 className="display-sub text-white mb-6">
              {t('community.homeTitle')}
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-12 max-w-lg">
              {t('community.homeSubtitle')}
            </p>

            {/* Highlight items */}
            <div className="space-y-0 border-t border-white/10">
              {HIGHLIGHTS.map((h) => (
                <Link key={h.href} to={h.href as never}
                  className="group flex items-start gap-5 py-7 border-b border-white/10 hover:border-white/20 transition-colors">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center transition-all group-hover:scale-105"
                    style={{ background: `${h.accent}20`, border: `1px solid ${h.accent}30` }}>
                    <h.icon size={18} style={{ color: h.accent }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-white text-base leading-snug group-hover:text-rdc-yellow transition-colors">
                      {t(h.titleKey)}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/40 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                  <ArrowRight size={14}
                    className="mt-1 shrink-0 text-white/20 group-hover:text-rdc-yellow group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: communes panel */}
          <div className="border border-white/10 bg-white/3 p-8">
            <p className="eyebrow text-rdc-yellow mb-6">{t('community.riverineCommunesTitle')}</p>
            <p className="text-sm text-white/50 leading-relaxed mb-8">
              {t('community.riverineCommunesDesc')}
            </p>

            {/* Commune list */}
            <div className="space-y-px">
              {COMMUNES.map((commune, i) => (
                <div key={commune}
                  className="flex items-center justify-between px-5 py-4 bg-white/4 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-sm font-bold text-rdc-yellow/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-white">{commune}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/25">
                    Commune
                  </span>
                </div>
              ))}
            </div>

            {/* Noise complaint CTA */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-white/40 mb-3">Nuisances sonores ?</p>
              <Link to={'/communaute/environnement-sonore' as never}
                className="btn-outline-white w-full justify-center text-xs">
                Déposer une plainte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
