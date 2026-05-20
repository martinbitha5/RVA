import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Plane, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-rdc-anthracite">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #003DA5 0, #003DA5 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Accent gradient */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-rdc-blue via-rdc-yellow to-rdc-green" />

      <div className="container relative py-20 md:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-rdc-blue/40 bg-rdc-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rdc-blue">
              <Plane size={11} className="-rotate-45" />
              Mbote · Bienvenue
            </p>

            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
              {t('home.hero.title').split(' ').slice(0, 3).join(' ')}
              <br />
              <span className="text-rdc-yellow">
                {t('home.hero.title').split(' ').slice(3).join(' ')}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={'/vols/departs' as never}
                className="inline-flex items-center gap-2 rounded-lg bg-rdc-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-rdc-blue/80 hover:shadow-rdc-blue/30"
              >
                <Plane size={15} className="-rotate-45" />
                {t('home.hero.cta')}
              </Link>
              <Link
                to={'/guide/quitter-kinshasa' as never}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                {t('home.hero.ctaSecondary')}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Real-time badge */}
            <div className="mt-8 flex items-center gap-2 text-xs text-white/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rdc-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rdc-green" />
              </span>
              <Clock size={11} />
              {t('home.liveFlights.updatedLabel')}
            </div>
          </motion.div>

          {/* Stats block */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { value: '2M+', label: 'Passagers / an' },
  { value: '17', label: 'Compagnies aériennes' },
  { value: '34', label: 'Destinations' },
  { value: '24/7', label: 'Opérations' },
];
