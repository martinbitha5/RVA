import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import {
  Search, MapPin, ChevronRight, ChevronDown, ChevronUp,
  UtensilsCrossed, ShoppingBag, Wrench, Crown, X,
} from 'lucide-react';
import {
  CONCESSIONS,
  FILTER_GROUPS,
  ZONE_LABELS,
  filterConcessions,
  type ZoneKey,
  type SubcategoryKey,
  type FilterGroup,
} from '@/lib/concessions-data';

export const Route = createFileRoute('/boutiques-restaurants/repertoire')({
  component: RepertoirePage,
  head: () => ({
    meta: [{ title: 'Répertoire boutiques & restaurants — FIH Kinshasa' }],
  }),
});

/* ─── Group icon map ─────────────────────────────────────────────────── */
const GROUP_ICONS: Record<string, React.ElementType> = {
  food:      UtensilsCrossed,
  boutiques: ShoppingBag,
  services:  Wrench,
  lounges:   Crown,
};

/* ─── Collapsible sidebar group (with "Voir plus") ───────────────────── */
const SHOW_DEFAULT = 5; // show 5 subcats before "Voir plus"

function SidebarGroup({
  group,
  checked,
  onChange,
}: {
  group: FilterGroup;
  checked: SubcategoryKey[];
  onChange: (k: SubcategoryKey) => void;
}) {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const Icon = GROUP_ICONS[group.id] ?? ChevronRight;
  const visible = expanded ? group.subcats : group.subcats.slice(0, SHOW_DEFAULT);
  const hasMore = group.subcats.length > SHOW_DEFAULT;
  const activeCount = group.subcats.filter(s => checked.includes(s.key)).length;

  return (
    <div className="border-b border-[#E8E8E8] py-4">
      {/* Group header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-2 group"
      >
        <div className="flex items-center gap-2">
          <Icon size={13} className="text-[#003DA5] flex-shrink-0" />
          <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors">
            {group.label}
          </span>
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center bg-[#003DA5] text-[9px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp size={13} className="text-[#999]" />
          : <ChevronDown size={13} className="text-[#999]" />}
      </button>

      {/* Subcategory checkboxes */}
      {open && (
        <div className="mt-3 space-y-2">
          {visible.map(sub => {
            const isChecked = checked.includes(sub.key);
            return (
              <label key={sub.key} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChange(sub.key)}
                  className="h-3.5 w-3.5 flex-shrink-0 accent-[#003DA5]"
                />
                <span
                  className={`text-xs leading-snug transition-colors ${
                    isChecked
                      ? 'font-semibold text-[#003DA5]'
                      : 'text-[#555] group-hover:text-[#1A1A1A]'
                  }`}
                >
                  {sub.label}
                </span>
              </label>
            );
          })}

          {/* Voir plus / Voir moins */}
          {hasMore && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#003DA5] hover:underline"
            >
              {expanded
                ? <><ChevronUp size={10} /> Voir moins</>
                : <><ChevronDown size={10} /> Voir plus ({group.subcats.length - SHOW_DEFAULT})</>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────── */
function ConcessionCard({ c }: { c: (typeof CONCESSIONS)[number] }) {
  return (
    <Link
      to={`/boutiques-restaurants/repertoire/${c.slug}` as never}
      className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Illustration */}
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

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors line-clamp-1">
          {c.name}
        </h3>
        <p className="text-xs text-[#666] leading-relaxed line-clamp-2 flex-1">
          {c.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
          {c.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-[#F2F2F2] px-2 py-0.5 text-[10px] font-medium text-[#555]">
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

      {/* CTA bar */}
      <div className="px-5 py-3 border-t border-[#F0F0F0] flex items-center justify-between bg-[#FAFAFA] group-hover:bg-[#003DA5] transition-colors duration-300">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#003DA5] group-hover:text-white transition-colors">
          En savoir plus
        </span>
        <ChevronRight size={13} className="text-[#003DA5] group-hover:text-white transition-colors" />
      </div>
    </Link>
  );
}

/* ─── Active filter chip ─────────────────────────────────────────────── */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#003DA5] px-3 py-1 text-xs font-medium text-white">
      {label}
      <button onClick={onRemove} className="hover:text-[#FFCE00] transition-colors">
        <X size={10} />
      </button>
    </span>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
function RepertoirePage() {
  const [search, setSearch]         = useState('');
  const [zones, setZones]           = useState<ZoneKey[]>([]);
  const [subcats, setSubcats]       = useState<SubcategoryKey[]>([]);

  const toggleZone = (z: ZoneKey) =>
    setZones(prev => prev.includes(z) ? prev.filter(x => x !== z) : [...prev, z]);

  const toggleSubcat = (k: SubcategoryKey) =>
    setSubcats(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  const resetAll = () => { setZones([]); setSubcats([]); setSearch(''); };

  const results = useMemo(
    () => filterConcessions(CONCESSIONS, { zones, subcats, search }),
    [zones, subcats, search]
  );

  // Build label lookup for chips
  const subcatLabelMap = useMemo(() => {
    const map: Record<string, string> = {};
    FILTER_GROUPS.forEach(g => g.subcats.forEach(s => { map[s.key] = s.label; }));
    return map;
  }, []);

  const hasFilters = zones.length > 0 || subcats.length > 0 || search.trim();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative bg-[#3D4B5C] overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-2/5 hidden md:block"
          style={{
            background: 'linear-gradient(135deg,#4A5568,#2D3748)',
            clipPath: 'polygon(12% 0,100% 0,100% 100%,0 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />
        <div className="container relative z-10 py-10 md:py-14">
          <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={10} />
            <Link to={'/boutiques-restaurants' as never} className="hover:text-white transition-colors">
              Boutiques et restaurants
            </Link>
            <ChevronRight size={10} />
            <span className="text-white/70">Répertoire</span>
          </nav>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-5 w-0.5 bg-[#FFCE00]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFCE00]">
              Boutiques et restaurants
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Répertoire</h1>
          <p className="mt-3 text-sm text-white/50 max-w-lg">
            {results.length} établissement{results.length !== 1 ? 's' : ''} à l'Aéroport International de N'djili
          </p>
        </div>
      </div>

      {/* ── Active filter chips ───────────────────────────────────── */}
      {hasFilters && (
        <div className="border-b border-[#E8E8E8] bg-[#F8F8F8]">
          <div className="container py-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#999]">Filtres actifs :</span>
            {zones.map(z => (
              <FilterChip key={z} label={ZONE_LABELS[z]} onRemove={() => toggleZone(z)} />
            ))}
            {subcats.map(s => (
              <FilterChip key={s} label={subcatLabelMap[s]} onRemove={() => toggleSubcat(s)} />
            ))}
            {search && (
              <FilterChip label={`"${search}"`} onRemove={() => setSearch('')} />
            )}
            <button
              onClick={resetAll}
              className="ml-2 text-[11px] font-bold text-[#666] underline hover:text-[#1A1A1A]"
            >
              Tout effacer
            </button>
          </div>
        </div>
      )}

      {/* ── Main layout ──────────────────────────────────────────── */}
      <div className="container py-8 md:py-10">
        <div className="flex gap-10 lg:gap-14">

          {/* ── SIDEBAR ── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">

            {/* Search */}
            <div className="relative mb-2">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBB]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher dans le rép..."
                className="w-full border border-[#E0E0E0] pl-8 pr-3 py-2 text-xs placeholder:text-[#BBB] focus:outline-none focus:border-[#003DA5] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X size={12} className="text-[#AAA] hover:text-[#333]" />
                </button>
              )}
            </div>

            {/* Zone filter */}
            <div className="border-b border-[#E8E8E8] py-4">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                <MapPin size={13} className="text-[#003DA5]" /> Zone
              </p>
              <div className="space-y-2">
                {(Object.keys(ZONE_LABELS) as ZoneKey[]).map(zk => (
                  <label key={zk} className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={zones.includes(zk)}
                      onChange={() => toggleZone(zk)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#003DA5]"
                    />
                    <span
                      className={`text-xs leading-snug transition-colors ${
                        zones.includes(zk)
                          ? 'font-semibold text-[#003DA5]'
                          : 'text-[#555] group-hover:text-[#1A1A1A]'
                      }`}
                    >
                      {ZONE_LABELS[zk]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory groups */}
            {FILTER_GROUPS.map(group => (
              <SidebarGroup
                key={group.id}
                group={group}
                checked={subcats}
                onChange={toggleSubcat}
              />
            ))}

            {/* Reset */}
            {hasFilters && (
              <button
                onClick={resetAll}
                className="mt-4 text-xs font-bold text-[#003DA5] hover:underline"
              >
                Réinitialiser tous les filtres
              </button>
            )}
          </aside>

          {/* ── CARDS ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile search */}
            <div className="relative mb-5 lg:hidden">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBB]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="w-full border border-[#E0E0E0] pl-8 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#003DA5]"
              />
            </div>

            {results.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-2xl font-bold text-[#1A1A1A]">Aucun résultat</p>
                <p className="mt-2 text-sm text-[#888]">
                  Essayez d'élargir vos critères de recherche.
                </p>
                <button
                  onClick={resetAll}
                  className="mt-4 text-sm font-bold text-[#003DA5] underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <p className="mb-5 text-xs text-[#888]">
                  {results.length} résultat{results.length !== 1 ? 's' : ''}
                </p>
                <div
                  className="grid gap-0.5 sm:grid-cols-2 xl:grid-cols-3"
                  style={{ background: '#E8E8E8' }}
                >
                  {results.map(c => <ConcessionCard key={c.id} c={c} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
