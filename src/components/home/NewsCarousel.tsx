import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight, Newspaper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLatestNews } from '@/lib/queries';
import { cn } from '@/lib/utils';

const CATEGORY_STYLES: Record<string, string> = {
  corporate:   'bg-rdc-blue/10 text-rdc-blue',
  community:   'bg-rdc-green/10 text-rdc-green',
  ops:         'bg-amber-100 text-amber-700',
  environment: 'bg-emerald-100 text-emerald-700',
};

export function NewsCarousel() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'fr' ? fr : undefined;
  const { data: articles, isLoading } = useLatestNews(3);

  return (
    <section className="bg-muted/30 py-14">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">
              {t('home.news.eyebrow')}
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold text-rdc-anthracite md:text-3xl">
              {t('home.news.title')}
            </h2>
          </div>
          <Link
            to={'/medias' as never}
            className="hidden items-center gap-1 text-sm font-semibold text-rdc-blue hover:text-rdc-blue/80 sm:inline-flex"
          >
            {t('home.news.viewAll')} <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <Skeleton className="h-48 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-5 w-full rounded" />
                  <Skeleton className="h-5 w-4/5 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(articles ?? []).map((article) => {
              const title = i18n.language === 'fr' ? article.title_fr : (article.title_en ?? article.title_fr);
              const excerpt = i18n.language === 'fr' ? article.excerpt_fr : (article.excerpt_en ?? article.excerpt_fr);
              return (
                <article
                  key={article.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground/30">
                        <Newspaper size={48} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {article.category && (
                      <span
                        className={cn(
                          'inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          CATEGORY_STYLES[article.category] ?? 'bg-gray-100 text-gray-500',
                        )}
                      >
                        {article.category}
                      </span>
                    )}
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug text-rdc-anthracite line-clamp-2">
                      {title}
                    </h3>
                    {excerpt && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {excerpt}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                      {article.published_at
                        ? format(new Date(article.published_at), 'd MMM yyyy', { locale })
                        : ''}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            to={'/medias' as never}
            className="inline-flex items-center gap-1 text-sm font-semibold text-rdc-blue"
          >
            {t('home.news.viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
