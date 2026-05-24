import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── Tiles data ─────────────────────────────────────────────────────────── */
const TILES = [
  {
    category: 'Informations de vol',
    title: 'Vols',
    description: 'Départs et arrivées en temps réel, compagnies, alertes WhatsApp.',
    href: '/vols',
    image: '/images/fih-hero-1.jpg',
    gradient: 'from-[#001E6E] via-[#003DA5]/60 to-transparent',
    accent: '#FFCE00',
    size: 'featured', // spans 2 cols + 2 rows on desktop
  },
  {
    category: 'Accès & Mobilité',
    title: 'Stationnement & Transport',
    description: 'Parkings officiels RVA, taxis agréés, bus Transco, location de voitures.',
    href: '/stationnement-transport',
    image: '/images/fih-tarmac.jpg',
    gradient: 'from-[#0D0D0D] via-black/60 to-transparent',
    accent: '#FFCE00',
    size: 'normal',
  },
  {
    category: 'Voyager sereinement',
    title: 'Guide du passager',
    description: "Enregistrement, sécurité, immigration, bagages, arrivée.",
    href: '/guide',
    image: '/images/fih-checkin.jpg',
    gradient: 'from-[#060D1E] via-black/60 to-transparent',
    accent: '#60A5FA',
    size: 'normal',
  },
  {
    category: 'Shopping & Gastronomie',
    title: 'Boutiques & Restaurants',
    description: 'Duty Free, cuisine congolaise, cafés, salons VIP.',
    href: '/boutiques-restaurants',
    image: '/images/fih-checkin-ethiopian.jpg',
    gradient: 'from-[#3D0A00] via-[#7C2D12]/60 to-transparent',
    accent: '#FB923C',
    size: 'normal',
  },
  {
    category: 'Aéroport International de N\'djili',
    title: 'Corporate RVA',
    description: 'Gouvernance, partenariats, carrières, projets de modernisation.',
    href: '/corporate',
    image: '/images/fih-bagages.jpg',
    gradient: 'from-[#001E6E] via-[#003DA5]/50 to-transparent',
    accent: '#FFCE00',
    size: 'normal',
  },
  {
    category: 'Engagement local',
    title: 'Communauté',
    description: 'Environnement, initiatives Nsele · Masina · Kimbanseke.',
    href: '/communaute',
    image: '/images/fih-hero-2.jpg',
    gradient: 'from-[#003D1A] via-[#009A44]/50 to-transparent',
    accent: '#4ADE80',
    size: 'normal',
  },
] as const;

/* ─── Single tile ─────────────────────────────────────────────────────────── */
function Tile({
  tile,
  index,
}: {
  tile: (typeof TILES)[number];
  index: number;
}) {
  const isFeatured = tile.size === 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <Link
        to={tile.href as never}
        className="group relative flex h-full w-full overflow-hidden bg-[#060D1E] block"
        style={{ minHeight: isFeatured ? '640px' : '320px' }}
      >
        {/* Background image */}
        <img
          src={tile.image}
          alt={tile.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: 'brightness(0.55) saturate(1.15)' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Gradient overlay — stronger at bottom */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${tile.gradient} group-hover:opacity-95 transition-opacity`}
        />

        {/* Top left: category eyebrow */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ color: tile.accent }}
          >
            <span
              className="inline-block h-px w-4"
              style={{ background: tile.accent }}
            />
            {tile.category}
          </span>
        </div>

        {/* Bottom: title + description + arrow */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {/* Title */}
          <h3
            className={`font-bold text-white leading-tight transition-transform duration-300 group-hover:-translate-y-1 ${
              isFeatured
                ? 'text-3xl md:text-4xl lg:text-5xl'
                : 'text-xl md:text-2xl'
            }`}
          >
            {tile.title}
          </h3>

          {/* Description — hidden by default, slides up on hover */}
          <p
            className="mt-2 text-sm text-white/55 leading-relaxed max-w-xs
                       opacity-0 translate-y-4
                       group-hover:opacity-100 group-hover:translate-y-0
                       transition-all duration-300"
          >
            {tile.description}
          </p>

          {/* Arrow link */}
          <div
            className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300
                       opacity-0 translate-y-3
                       group-hover:opacity-100 group-hover:translate-y-0"
            style={{ color: tile.accent }}
          >
            Découvrir
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Bottom accent bar on hover */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: tile.accent }}
        />
      </Link>
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export function ExploreGrid() {
  return (
    <section className="section-night">
      {/* Section header */}
      <div className="container">
        <div className="flex flex-col gap-3 py-12 md:py-16 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="accent-line" />
            <p className="eyebrow text-rdc-yellow">Explorer l'aéroport</p>
          </div>
          <h2 className="display-sub text-white max-w-2xl">
            Tout ce dont vous avez besoin,{' '}
            <span className="text-white/40">en un clic</span>
          </h2>
        </div>
      </div>

      {/* Mosaic grid — gap 2px (ADMTL seamless style) */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 bg-white/[0.06]"
        style={{ gap: '2px' }}
      >
        {TILES.map((tile, i) => (
          <Tile key={tile.href} tile={tile} index={i} />
        ))}
      </div>

      {/* Bottom: RDC flag bar */}
      <div className="h-0.5 bg-gradient-rdc" />
    </section>
  );
}
