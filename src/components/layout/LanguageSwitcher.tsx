import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const LANGS = [
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'en', label: 'EN', full: 'English' },
] as const;

type LangCode = (typeof LANGS)[number]['code'];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const current = i18n.language.slice(0, 2) as LangCode;

  function switchLang(code: LangCode) {
    i18n.changeLanguage(code);
  }

  if (variant === 'mobile') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {LANGS.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLang(lang.code)}
            aria-label={`Passer en ${lang.full}`}
            aria-pressed={current === lang.code}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              current === lang.code
                ? 'bg-rdc-blue text-white'
                : 'text-foreground hover:bg-muted',
            )}
          >
            {lang.full}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center rounded-full border border-border p-0.5', className)}
      role="group"
      aria-label="Sélecteur de langue"
    >
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLang(lang.code)}
          aria-label={`Passer en ${lang.full}`}
          aria-pressed={current === lang.code}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-all',
            current === lang.code
              ? 'bg-rdc-blue text-white shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
