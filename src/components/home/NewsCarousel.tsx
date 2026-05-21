import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLatestNews } from '@/lib/queries';

const CATEGORY_LABEL: Record<string, string> = {
  corporate:   'Corporate',
  community:   'Communauté',
  ops:         'Opérations',
  environment: 'Environnement',
};

/* Gradient fallback per category */
const CATEGORY_BG: Record<string, string> = {
  corporate:   'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
  community:   'linear-gradient(135deg, #009A44 0%, #005A28 100%)',
  ops:         'linear-gradient(135deg, #1A1A1A 0%, #0D0D0D 100%)',
  environment: 'linear-gradient(135deg, #0A4A2A 0%, #003DA5 100%)',
};

export function NewsCarousel() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? fr : undefined;
  const { data: articles = [], isLoading } = useLatestNews(3);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-blue">{t('home.news.eyebrow')}</p>
            </div>
            <h2 className="display-sub text-rdc-anthracite">{t('home.news.title')}</h2>
          </div>
          <Link to={'/medias' as never}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-rdc-anthracite hover:text-rdc-blue transition-colors group">
            {t('home.news.viewAll')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-white">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-16 bg-muted animate-pulse" />
                  <div className="h-5 bg-muted animate-pulse" />
                  <div className="h-5 w-3/4 bg-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {articles.map((article, idx) => {
              const title = i18n.language === 'fr'
                ? article.title_fr
                : (article.title_en ?? article.title_fr);
              const excerpt = i18n.language === 'fr'
                ? article.excerpt_fr
                : (article.excerpt_en ?? article.excerpt_fr);
              const cat = article.category ?? 'corporate';
              const isLead = idx === 0;

              return (
                <article
                  key={article.id}
                  className={`group bg-white overflow-hidden flex flex-col ${isLead ? 'sm:col-span-2 sm:row-span-1' : ''}`}
                >
                  {/* Image / gradient placeholder */}
                  <div className={`relative overflow-hidden ${isLead ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                    style={article.cover_image_url ? {} : { background: CATEGORY_BG[cat] }}>
                    {article.cover_image_url && (
                      <img src={article.cover_image_url} alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    {/* Category tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                        {CATEGORY_LABEL[cat] ?? cat}
                      </span>
                    </div>
                    {/* Arrow on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-rdc-yellow w-8 h-8 flex items-center justify-center">
                        <ArrowUpRight size={14} className="text-rdc-anthracite" />
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col flex-1 p-6 border-b border-l border-r border-border">
                    <h3 className={`font-display font-bold leading-snug text-rdc-anthracite group-hover:text-rdc-blue transition-colors line-clamp-2 ${isLead ? 'text-xl md:text-2xl' : 'text-base'}`}>
                      {title}
                    </h3>
                    {excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
                        {excerpt}
                      </p>
                    )}
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      {article.published_at
                        ? format(new Date(article.published_at), 'd MMM yyyy', { locale })
                        : ''}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Placeholder cards when no data */
          <div className="grid gap-0.5 bg-border sm:grid-cols-3">
            {[
              { cat: 'corporate',   title: 'Modernisation du Terminal International de FIH', tag: 'Corporate' },
              { cat: 'ops',         title: 'Nouveaux créneaux horaires — Ethiopian Airlines',  tag: 'Opérations' },
              { cat: 'environment', title: 'Plan de gestion environnementale 2025–2030',       tag: 'Environnement' },
            ].map((item, i) => (
              <article key={i} className={`group bg-white overflow-hidden ${i === 0 ? 'sm:col-span-2' : ''}`}>
                <div className={`relative ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                  style={{ background: CATEGORY_BG[item.cat] }}>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 border-b border-l border-r border-border">
                  <h3 className={`font-display font-bold leading-snug text-rdc-anthracite ${i === 0 ? 'text-xl' : 'text-base'}`}>
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                    Kinshasa, RDC
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden text-center">
          <Link to={'/medias' as never}
            className="inline-flex items-center gap-2 text-sm font-bold text-rdc-anthracite">
            {t('home.news.viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
