import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Plane, ChevronLeft, ChevronRight,
  Search, ParkingCircle, Crown, Car,
} from 'lucide-react';
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
    caption: 'Opérations au sol · Terminal International · FIH',
    position: 'object-center',
  },
] as const;

const SUGGESTIONS = ['SN491', 'Lubumbashi', 'Goma', 'Paris CDG', 'Brussels'];

const QUICK_LINKS = [
  { label: 'Stationnement', Icon: ParkingCircle, href: '/stationnement-transport/stationnement-fih' },
  { label: 'Salons VIP',    Icon: Crown,         href: '/boutiques-restaurants/salons' },
  { label: 'Dépose-minute', Icon: Car,           href: '/stationnement-transport/depose-recuperation' },
] as const;

const SLIDE_DURATION = 7000;

/* ─── Component ──────────────────────────────────────────────────────── */
export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Slideshow
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Flight search panel
  const [tab, setTab]       = useState<'departs' | 'arrivees'>('departs');
  const [query, setQuery]   = useState('');

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setCurrent(prev => (prev + 1) % SLIDES.length),
      SLIDE_DURATION
    );
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrent(i => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(i => (i + 1) % SLIDES.length);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    void navigate({
      to: (tab === 'departs' ? '/vols/departs' : '/vols/arrivees') as never,
    });
  }

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#060D1E]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── Photo slides crossfade ───────────────────────────────── */}
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
            style={{ filter: 'brightness(0.72) saturate(1.05)' }}
            loading={current === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              const el = e.currentTarget.parentElement as HTMLElement;
              e.currentTarget.style.display = 'none';
              el.style.background =
                'linear-gradient(155deg,#060D1E 0%,#0A1628 35%,#0D2144 55%,#003DA5 100%)';
            }}
          />
          {/* Léger dégradé bas pour lisibilité du texte, droite transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Diagonal runway stripe ──────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-8"
        style={{
          background:
            'repeating-linear-gradient(-45deg,rgba(255,206,0,0.04) 0,rgba(255,206,0,0.04) 1px,transparent 0,transparent 28px)',
        }}
      />

      {/* ── Flying plane silhouette ─────────────────────────────── */}
      <motion.div
        initial={{ x: '-10%', y: '5%', opacity: 0 }}
        animate={{ x: '110%', y: '-8%', opacity: [0, 0.15, 0.15, 0] }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatDelay: 12 }}
        className="absolute top-1/4 left-0 pointer-events-none z-[2]"
      >
        <Plane size={26} className="text-white -rotate-12" />
      </motion.div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="container py-24 md:py-28 lg:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

            {/* ── LEFT: hero text ── */}
            <div>
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-white/50"
              >
                Vous accueillir
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="display-hero text-white"
              >
                Bienvenue à{' '}
                <span className="text-rdc-red">Kinshasa</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 max-w-lg text-base leading-relaxed text-white/70"
              >
                Porte d&apos;entrée de la République Démocratique du Congo,
                l&apos;aéroport international de N&apos;djili vous accueille 24h/24.
              </motion.p>

              {/* Live indicator */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-white/20"
              >
                {t('home.liveFlights.updatedLabel')}
              </motion.p>
            </div>

            {/* ── RIGHT: flight search panel (style ADMTL) ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <div className="bg-[#0B1628]/92 backdrop-blur-lg border border-white/10 p-6 shadow-2xl">

                {/* Panel header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center bg-rdc-blue">
                    <Search size={15} className="text-white" />
                  </div>
                  <h2 className="text-base font-black text-white tracking-tight">
                    Trouver un vol
                  </h2>
                </div>

                {/* Tabs Départs / Arrivées */}
                <div className="flex mb-5 border border-white/10">
                  {(['departs', 'arrivees'] as const).map(t2 => (
                    <button
                      key={t2}
                      onClick={() => setTab(t2)}
                      className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                        tab === t2
                          ? 'bg-white text-[#1A1A1A]'
                          : 'bg-transparent text-white/50 hover:text-white'
                      }`}
                    >
                      {t2 === 'departs' ? 'Départs' : 'Arrivées'}
                    </button>
                  ))}
                </div>

                {/* Search form */}
                <form onSubmit={handleSearch}>
                  <div className="flex items-center gap-2 border border-white/20 bg-white/6 px-4 py-3 mb-1 focus-within:border-rdc-yellow/50 transition-colors">
                    <Plane size={13} className="-rotate-45 text-white/35 flex-shrink-0" />
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Rechercher un vol, une ville ou une compagnie..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                    />
                  </div>

                  {/* Suggested chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {SUGGESTIONS.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/35 hover:text-white hover:border-white/30 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* See all link */}
                  <Link
                    to={(tab === 'departs' ? '/vols/departs' : '/vols/arrivees') as never}
                    className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-5"
                  >
                    {tab === 'departs' ? 'Voir tous les départs' : 'Voir toutes les arrivées'}
                    <ArrowRight size={13} />
                  </Link>
                </form>

                {/* Divider */}
                <div className="border-t border-white/10 mb-4" />

                {/* Quick action buttons */}
                <div className="flex flex-wrap gap-2">
                  {QUICK_LINKS.map(({ label, Icon, href }) => (
                    <Link
                      key={href}
                      to={href as never}
                      className="flex items-center gap-1.5 bg-rdc-blue/80 hover:bg-rdc-blue border border-rdc-blue/60 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                    >
                      <Icon size={11} />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Slide controls ───────────────────────────────────────── */}
      <div className="absolute bottom-14 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 pointer-events-none">

        {/* Caption */}
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
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
              {SLIDES[current].caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots + arrows */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={prev}
            aria-label="Photo précédente"
            className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Photo ${i + 1}`}
                className="relative h-0.5 overflow-hidden transition-all"
                style={{
                  width: i === current ? 32 : 16,
                  background: 'rgba(255,255,255,0.2)',
                }}
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
                  <div className="absolute inset-0 bg-white/55" />
                )}
              </button>
            ))}
          </div>

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
      <div className="relative z-10 flex justify-center pb-7">
        <div className="flex flex-col items-center gap-2 opacity-20">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">
            Découvrir
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* ── Bottom RDC flag bar ──────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-gradient-rdc" />
    </section>
  );
}
