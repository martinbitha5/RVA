import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '2M+', label: 'Passagers par an' },
  { value: '34',  label: 'Destinations' },
  { value: '17',  label: 'Compagnies' },
  { value: '24/7', label: 'Opérations' },
];

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#060D1E]">

      {/* ── Background: airport aerial simulation ────────────── */}
      <div className="absolute inset-0">
        {/* Base gradient — deep night sky over Kinshasa */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(155deg, #060D1E 0%, #0A1628 35%, #0D2144 55%, #003DA5 100%)' }} />

        {/* Runway light rays simulation */}
        <div className="absolute inset-0 opacity-15"
          style={{
            background: `
              radial-gradient(ellipse 180% 60% at 70% 85%, rgba(255,206,0,0.4) 0%, transparent 60%),
              radial-gradient(ellipse 100% 40% at 30% 90%, rgba(0,61,165,0.5) 0%, transparent 50%)
            `,
          }}
        />

        {/* Star field simulation */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 20%, white, transparent),
              radial-gradient(1px 1px at 25% 10%, white, transparent),
              radial-gradient(1px 1px at 40% 30%, white, transparent),
              radial-gradient(1px 1px at 55% 15%, white, transparent),
              radial-gradient(1px 1px at 70% 25%, white, transparent),
              radial-gradient(1px 1px at 85% 8%, white, transparent),
              radial-gradient(1.5px 1.5px at 15% 40%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 90% 35%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.4), transparent)
            `,
          }}
        />

        {/* Diagonal runway stripe pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 opacity-8"
          style={{
            background: 'repeating-linear-gradient(-45deg, rgba(255,206,0,0.06) 0, rgba(255,206,0,0.06) 1px, transparent 0, transparent 28px)',
          }}
        />

        {/* Horizon glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rdc-yellow/30 to-transparent" />
      </div>

      {/* ── Flying plane silhouette ───────────────────────────── */}
      <motion.div
        initial={{ x: '-10%', y: '5%', opacity: 0 }}
        animate={{ x: '110%', y: '-8%', opacity: [0, 0.15, 0.15, 0] }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatDelay: 6 }}
        className="absolute top-1/4 left-0 pointer-events-none"
      >
        <Plane size={32} className="text-white -rotate-12" />
      </motion.div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="container py-24 md:py-32 lg:py-36">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">

            {/* Left: text block */}
            <div>
              {/* Welcome badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2"
              >
                <div className="flex items-center gap-2 border border-rdc-yellow/30 bg-rdc-yellow/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-rdc-yellow">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-rdc-yellow opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rdc-yellow" />
                  </span>
                  Mbote · Bienvenue à FIH
                </div>
              </motion.div>

              {/* Hero title */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="display-hero text-white"
              >
                {t('home.hero.title').split(' ').slice(0, 3).join(' ')}
                <br />
                <span className="text-rdc-yellow">
                  {t('home.hero.title').split(' ').slice(3).join(' ')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/55"
              >
                {t('home.hero.subtitle')}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link to={'/vols/departs' as never} className="btn-primary shadow-blue-lg">
                  <Plane size={14} className="-rotate-45" />
                  {t('home.hero.cta')}
                </Link>
                <Link to={'/guide/quitter-kinshasa' as never} className="btn-outline-white">
                  {t('home.hero.ctaSecondary')}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Live indicator */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/25"
              >
                {t('home.liveFlights.updatedLabel')}
              </motion.p>
            </div>

            {/* Right: stats */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:grid grid-cols-2 gap-px bg-white/8"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white/5 p-8 backdrop-blur-sm">
                  <p className="stat-number text-white">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom: scroll indicator ──────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Découvrir</span>
          <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* ── Bottom accent bar (RDC flag colors) ──────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-rdc" />
    </section>
  );
}
