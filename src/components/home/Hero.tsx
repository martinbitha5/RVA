import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Slides ─────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src: '/images/fih-hero-1.jpg',
    alt: 'Tarmac FIH — Ethiopian Airlines Star Alliance A350, MG Airlines A320',
    caption: 'Ethiopian Airlines A350 · Star Alliance · Kinshasa FIH',
    position: 'object-center',
  },
  {
    src: '/images/fih-hero-2.jpg',
    alt: 'Tarmac FIH — flotte internationale au sol, terminal RVA',
    caption: 'Opérations au sol · Régie des Voies Aériennes · FIH',
    position: 'object-center',
  },
] as const;

const STATS = [
  { value: '2M+',  label: 'Passagers par an' },
  { value: '34',   label: 'Destinations' },
  { value: '17',   label: 'Compagnies' },
  { value: '24/7', label: 'Opérations' },
];

const SLIDE_DURATION = 7000; // 7 secondes par slide

/* ─── Component ──────────────────────────────────────────────────────── */
export function Hero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(i => (i + 1) % SLIDES.length);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#060D1E]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Photo slides — crossfade ──────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            className={`h-full w-full object-cover ${SLIDES[current].position}`}
            style={{ filter: 'brightness(0.52) contrast(1.12) saturate(1.25)' }}
            loading={current === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              // Fallback gradient if image missing
              const el = e.currentTarget.parentElement as HTMLElement;
              e.currentTarget.style.display = 'none';
              el.style.background = 'linear-gradient(155deg, #060D1E 0%, #0A1628 35%, #0D2144 55%, #003DA5 100%)';
            }}
          />
          {/* Cinematic vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/60" />
          {/* Left/right darkening for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Diagonal runway stripe pattern (subtle) ──────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(-45deg, rgba(255,206,0,0.05) 0, rgba(255,206,0,0.05) 1px, transparent 0, transparent 28px)',
        }}
      />

      {/* ── Flying plane silhouette ───────────────────────────────── */}
      <motion.div
        initial={{ x: '-10%', y: '5%', opacity: 0 }}
        animate={{ x: '110%', y: '-8%', opacity: [0, 0.18, 0.18, 0] }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatDelay: 10 }}
        className="absolute top-1/4 left-0 pointer-events-none z-[2]"
      >
        <Plane size={28} className="text-white -rotate-12" />
      </motion.div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="container py-28 md:py-36 lg:py-40">
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
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
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

            {/* Right: stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:grid grid-cols-2 gap-px bg-white/10"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-black/30 backdrop-blur-sm p-8">
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

      {/* ── Slide controls ───────────────────────────────────────── */}
      <div className="absolute bottom-16 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 pointer-events-none">

        {/* Left: photo caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex items-center gap-3"
          >
            <div className="h-px w-8 bg-rdc-yellow/50" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {SLIDES[current].caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right: dots + arrows */}
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Photo précédente"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
                className="relative h-0.5 overflow-hidden transition-all"
                style={{ width: i === current ? 32 : 16, background: 'rgba(255,255,255,0.25)' }}
              >
                {i === current && !paused && (
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-rdc-yellow"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    key={current}
                  />
                )}
                {i === current && (
                  <div className="absolute inset-0 bg-white/60" />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Photo suivante"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 opacity-25">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Découvrir</span>
          <div className="h-10 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* ── Bottom RDC flag accent bar ───────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-gradient-rdc" />
    </section>
  );
}
