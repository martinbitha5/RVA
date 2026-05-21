import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  /** Main large heading */
  title: string;
  /** Subtitle displayed below title */
  subtitle?: string;
  /** Small label/eyebrow above title */
  eyebrow?: string;
  /** Breadcrumb trail */
  breadcrumbs?: BreadcrumbItem[];
  /** Background image URL (optional — uses gradient if omitted) */
  image?: string;
  /** Gradient preset when no image */
  gradient?: 'night' | 'blue' | 'dark';
  /** Additional className on the outer section */
  className?: string;
  /** Compact version (shorter height) */
  compact?: boolean;
  /** Content rendered to the right of the title (desktop only) */
  aside?: React.ReactNode;
  /** CTAs rendered below subtitle */
  cta?: React.ReactNode;
}

const GRADIENTS = {
  night: 'linear-gradient(135deg, #080F1E 0%, #0D1B3E 40%, #001E6E 100%)',
  blue:  'linear-gradient(135deg, #003DA5 0%, #001E6E 100%)',
  dark:  'linear-gradient(160deg, #0D0D14 0%, #1A1A2E 100%)',
};

export function PageHero({
  title, subtitle, eyebrow, breadcrumbs, image, gradient = 'night',
  className, compact = false, aside, cta,
}: PageHeroProps) {
  const bg = image
    ? undefined
    : { background: GRADIENTS[gradient] };

  return (
    <section
      className={cn('relative overflow-hidden', compact ? 'min-h-[240px] md:min-h-[300px]' : 'min-h-[360px] md:min-h-[440px]', className)}
      style={bg}
    >
      {/* Background image */}
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </>
      )}

      {/* Runway diagonal stripes */}
      {!image && (
        <div className="absolute inset-0 runway-pattern opacity-40" />
      )}

      {/* Bottom RDC flag line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-rdc" />

      {/* Content */}
      <div className="relative container pt-32 pb-12 md:pt-36 md:pb-16 flex flex-col lg:flex-row lg:items-end gap-8">
        <div className="flex-1 min-w-0">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Fil d'Ariane" className="mb-5 flex items-center gap-1.5 flex-wrap">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={11} className="text-white/30" />}
                  {crumb.href ? (
                    <Link to={crumb.href as never}
                      className="text-xs text-white/50 hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-xs text-white/80">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Eyebrow */}
          {eyebrow && (
            <div className="flex items-center gap-3 mb-4">
              <div className="accent-line" />
              <p className="eyebrow text-rdc-yellow">{eyebrow}</p>
            </div>
          )}

          {/* Title */}
          <h1 className={cn(
            'font-display font-bold text-white leading-none tracking-tight',
            compact
              ? 'text-3xl md:text-4xl lg:text-5xl'
              : 'text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.5rem]',
          )}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(
              'mt-4 leading-relaxed text-white/65',
              compact ? 'text-sm max-w-xl' : 'text-base md:text-lg max-w-2xl',
            )}>
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          {cta && <div className="mt-7">{cta}</div>}
        </div>

        {/* Aside (desktop only) */}
        {aside && (
          <div className="hidden lg:block shrink-0">{aside}</div>
        )}
      </div>
    </section>
  );
}
