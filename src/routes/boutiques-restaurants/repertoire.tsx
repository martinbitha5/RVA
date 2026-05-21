import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import {
  CONCESSIONS,
  FILTER_TABS,
  ZONE_LABELS,
  filterByTab,
  type FilterTab,
  type ZoneKey,
} from '@/lib/concessions-data';

export const Route = createFileRoute('/boutiques-restaurants/repertoire')({
  component: RepertoirePage,
  head: () => ({
    meta: [{ title: 'Répertoire boutiques & restaurants — FIH Kinshasa' }],
  }),
});

/* ─── Zone filter keys ───────────────────────────────────────────────── */
const ZONE_KEYS = Object.keys(ZONE_LABELS) as ZoneKey[];

/* ─── Card ───────────────────────────────────────────────────────────── */
function ConcessionCard({ c }: { c: (typeof CONCESSIONS)[number] }) {
  return (
    <Link
      to={`/boutiques-restaurants/repertoire/${c.slug}` as never}
      className="group flex flex-col bg-white border border-[#E8E8E8] hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Photo / gradient illustration */}
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
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            style={{ background: c.gradient }}
          >
            {/* Subtle initials overlay */}
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl font-black text-white/10 select-none">
                {c.name.charAt(0)}
              </span>
            </div>
          </div>
        )}
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {/* Name */}
        <h3 className="font-bold text-[#1A1A1A] text-base leading-snug group-hover:text-[#003DA5] transition-colors line-clamp-1">
          {c.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#666] leading-relaxed line-clamp-2 flex-1">
          {c.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {c.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-block bg-[#F2F2F2] px-2 py-0.5 text-[10px] font-medium text-[#555]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Zone + Porte */}
        <div className="mt-2 pt-3 border-t border-[#F0F0F0] space-y-1">
          <p className="flex items-center gap-1.5 text-[11px] text-[#777]">
            <MapPin size={10} className="flex-shrink-0 text-[#003DA5]" />
            {ZONE_LABELS[c.zoneKey]}
          </p>
          <p className="text-[11px] font-semibold text-[#003DA5]">{c.porte}</p>
        </div>
      </div>

      {/* Bottom CTA */}
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
function RepertoirePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [activeZones, setActiveZones] = useState<ZoneKey[]>([]);

  const toggleZone = (z: ZoneKey) =>
    setActiveZones(prev =>
      prev.includes(z) ? prev.filter(x => x !== z) : [...prev, z]
    );

  const results = useMemo(() => {
    let items = filterByTab(activeTab, CONCESSIONS);
    if (activeZones.length > 0)
      items = items.filter(c => activeZones.includes(c.zoneKey));
    if (search.trim())
      items = items.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      );
    return items;
  }, [activeTab, activeZones, search]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — style ADMTL dark header ── */}
      <div className="relative bg-[#3D4B5C] overflow-hidden">
        {/* Diagonal accent */}
        <div
          className="absolute right-0 top-0 h-full w-2/5 hidden md:block"
          style={{
            background: 'linear-gradient(135deg,#4A5568 0%,#2D3748 100%)',
            clipPath: 'polygon(12% 0,100% 0,100% 100%,0 100%)',
          }}
        />
        {/* RDC accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />

        <div className="container relative z-10 py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/boutiques-restaurants' as never} className="hover:text-white transition-colors">
              Boutiques et restaurants
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Répertoire</span>
          </nav>

          {/* Eyebrow + Title */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-5 w-0.5 bg-[#FFCE00]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFCE00]">
              Boutiques et restaurants
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Répertoire
          </h1>
          <p className="mt-3 text-sm text-white/50 max-w-lg">
            {results.length} établissement{results.length > 1 ? 's' : ''} disponible{results.length > 1 ? 's' : ''} à l'Aéroport International de N'djili
          </p>
        </div>
      </div>

      {/* ── Filter tabs (ADMTL style) ── */}
      <div className="border-b border-[#E8E8E8] bg-white sticky top-[72px] z-30">
        <div className="container">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {FILTER_TABS.map(tab => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as FilterTab)}
                  className={`
                    flex-shrink-0 flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap
                    ${active
                      ? 'border-[#003DA5] text-[#003DA5] bg-[#003DA5]/5'
                      : 'border-transparent text-[#555] hover:text-[#1A1A1A] hover:border-[#CCC]'}
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main layout: sidebar + grid ── */}
      <div className="container py-8 md:py-10">
        <div className="flex gap-8 lg:gap-12">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher dans le répertoire..."
                className="w-full border border-[#E0E0E0] bg-white pl-9 pr-4 py-2.5 text-sm placeholder:text-[#BBB] focus:outline-none focus:border-[#003DA5] transition-colors"
              />
            </div>

            {/* Zone filter */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#333]">Zone</p>
              <div className="space-y-2">
                {ZONE_KEYS.map(zk => (
                  <label key={zk} className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={activeZones.includes(zk)}
                      onChange={() => toggleZone(zk)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#003DA5]"
                    />
                    <span className="text-xs text-[#555] leading-snug group-hover:text-[#1A1A1A] transition-colors">
                      {ZONE_LABELS[zk]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(activeZones.length > 0 || search) && (
              <button
                onClick={() => { setActiveZones([]); setSearch(''); }}
                className="text-xs font-bold text-[#003DA5] hover:underline text-left"
              >
                Réinitialiser les filtres
              </button>
            )}
          </aside>

          {/* ── MOBILE search ── */}
          <div className="relative mb-4 lg:hidden w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full border border-[#E0E0E0] pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#003DA5]"
            />
          </div>

          {/* ── CARDS GRID ── */}
          <div className="flex-1 min-w-0">
            {results.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-2xl font-bold text-[#1A1A1A]">Aucun résultat</p>
                <p className="mt-2 text-sm text-[#888]">Essayez d'élargir vos critères de recherche.</p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-xs text-[#888]">
                  {results.length} résultat{results.length > 1 ? 's' : ''}
                </p>
                <div className="grid gap-0.5 sm:grid-cols-2 xl:grid-cols-3" style={{ background: '#E8E8E8' }}>
                  {results.map(c => (
                    <ConcessionCard key={c.id} c={c} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
