import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { CONCESSIONS, ZONE_LABELS } from '@/lib/concessions-data';
import type { Concession, ZoneKey } from '@/lib/concessions-data';

export const Route = createFileRoute('/boutiques-restaurants/restaurants')({
  component: RestaurantsPage,
  head: () => ({
    meta: [
      { title: "Restaurants — Aéroport N'djili · FIH" },
      { name: 'description', content: "Restauration et cuisine congolaise authentique à l'Aéroport International de N'djili FIH." },
    ],
  }),
});

const PAGE_DATA = CONCESSIONS.filter((c) => c.category === 'restaurant');

const AVAILABLE_ZONES = [...new Set(PAGE_DATA.map((c) => c.zoneKey))] as ZoneKey[];

/* ─── Card ───────────────────────────────────────────────────────────── */
function RestaurantCard({ c }: { c: Concession }) {
  return (
    <Link
      to={`/boutiques-restaurants/repertoire/${c.slug}` as never}
      className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {c.image ? (
          <img
            src={c.image}
            alt={c.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-500 group-hover:scale-105 flex items-center justify-center"
            style={{ background: c.gradient }}
          >
            <span className="text-6xl font-black text-white/10 select-none">
              {c.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors line-clamp-1">
          {c.name}
        </h3>
        <p className="text-xs text-[#666] leading-relaxed line-clamp-2 flex-1">
          {c.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {c.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="bg-[#F2F2F2] px-2 py-0.5 text-[10px] font-medium text-[#555]">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 pt-3 border-t border-[#F0F0F0] space-y-1">
          <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
            <MapPin size={10} className="flex-shrink-0 text-[#003DA5]" />
            {ZONE_LABELS[c.zoneKey]}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
            <Clock size={10} className="flex-shrink-0 text-[#003DA5]" />
            {c.hours}
          </p>
          <p className="text-[11px] font-semibold text-[#003DA5]">{c.porte}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-[#F0F0F0] flex items-center justify-between bg-[#FAFAFA] group-hover:bg-[#003DA5] transition-colors duration-300">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#003DA5] group-hover:text-white transition-colors">
          En savoir plus
        </span>
        <ChevronRight size={13} className="text-[#003DA5] group-hover:text-white transition-colors" />
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
function RestaurantsPage() {
  const [zone, setZone] = useState<'all' | ZoneKey>('all');

  const filtered = zone === 'all' ? PAGE_DATA : PAGE_DATA.filter((c) => c.zoneKey === zone);

  return (
    <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#0F2A1E]">
        <img
          src="/images/fih-checkin.jpg"
          loading="eager"
          className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
          alt=""
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[#0F2A1E]"
          style={{ clipPath: 'polygon(0 0, 58% 0, 72% 100%, 0 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-14 md:py-20">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/boutiques-restaurants' as never} className="hover:text-white transition-colors">
              Boutiques et restaurants
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Restaurants</span>
          </nav>
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className="inline-block h-4 w-5 bg-rdc-green"
              style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
            />
            <span className="text-sm font-semibold tracking-wider text-white/70">Boutiques &amp; Restaurants</span>
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">Restaurants</h1>
          <p className="mt-3 max-w-sm text-white/60">
            Cuisine congolaise authentique, fast-food et gastronomie fusion au cœur de FIH.
          </p>
          <p className="mt-4 text-sm font-medium text-rdc-green">
            {PAGE_DATA.length} établissement{PAGE_DATA.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* ── Zone filter ─────────────────────────────────────────── */}
      <div className="border-b border-[#E8E8E8] bg-white">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => setZone('all')}
              className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold transition-colors ${
                zone === 'all' ? 'bg-[#003DA5] text-white' : 'text-[#555] hover:bg-[#F5F5F5]'
              }`}
            >
              Toutes les zones
            </button>
            {AVAILABLE_ZONES.map((zk) => (
              <button
                key={zk}
                onClick={() => setZone(zk)}
                className={`flex-shrink-0 px-3 py-1.5 text-xs font-semibold transition-colors ${
                  zone === zk ? 'bg-[#003DA5] text-white' : 'text-[#555] hover:bg-[#F5F5F5]'
                }`}
              >
                {ZONE_LABELS[zk]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards ───────────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        <p className="mb-5 text-xs text-[#888]">
          {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
        </p>
        <div
          className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ background: '#E8E8E8' }}
        >
          {filtered.map((c) => <RestaurantCard key={c.id} c={c} />)}
        </div>
      </div>
    </main>
  );
}
