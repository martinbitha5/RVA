import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Search, MapPin, Clock, UtensilsCrossed, ShoppingBag, Coffee, ArrowRightLeft, Package, Crown, Banknote, Stethoscope } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/boutiques-restaurants/repertoire')({
  component: RepertoirePage,
  head: () => ({ meta: [{ title: "Répertoire boutiques & restaurants — FIH" }] }),
});

type Category = 'all' | 'restaurant' | 'boutique' | 'bar' | 'duty_free' | 'lounge' | 'exchange' | 'bank' | 'medical';

const CATEGORY_META: Record<Category, { label: string; Icon: React.ElementType; color: string }> = {
  all:        { label: 'Tout',          Icon: MapPin,          color: 'bg-muted text-foreground' },
  restaurant: { label: 'Restaurants',   Icon: UtensilsCrossed, color: 'bg-rdc-green/15 text-rdc-green' },
  boutique:   { label: 'Boutiques',     Icon: ShoppingBag,     color: 'bg-rdc-blue/15 text-rdc-blue' },
  bar:        { label: 'Bars & Cafés',  Icon: Coffee,          color: 'bg-amber-100 text-amber-700' },
  duty_free:  { label: 'Duty Free',     Icon: Package,         color: 'bg-purple-100 text-purple-700' },
  lounge:     { label: 'Salons VIP',    Icon: Crown,           color: 'bg-rdc-yellow/30 text-rdc-anthracite' },
  exchange:   { label: 'Change',        Icon: ArrowRightLeft,  color: 'bg-emerald-100 text-emerald-700' },
  bank:       { label: 'Banques/ATM',   Icon: Banknote,        color: 'bg-cyan-100 text-cyan-700' },
  medical:    { label: 'Médical',       Icon: Stethoscope,     color: 'bg-red-100 text-red-700' },
};

const CONCESSIONS = [
  { id: 1,  name: 'Chez Tante Marie',       category: 'restaurant' as Category, terminal: 'International', zone: 'after',  hours: '06:00–22:00' },
  { id: 2,  name: 'Le Gourmet Congolais',   category: 'restaurant' as Category, terminal: 'International', zone: 'after',  hours: '07:00–23:00' },
  { id: 3,  name: 'KFC Express',            category: 'restaurant' as Category, terminal: 'International', zone: 'after',  hours: '06:00–22:00' },
  { id: 4,  name: 'Saveur de Kinshasa',     category: 'restaurant' as Category, terminal: 'Domestique',    zone: 'after',  hours: '06:00–20:00' },
  { id: 5,  name: 'Artisanat du Congo',     category: 'boutique'   as Category, terminal: 'International', zone: 'after',  hours: '07:00–21:00' },
  { id: 6,  name: 'Makeba Souvenirs',       category: 'boutique'   as Category, terminal: 'International', zone: 'before', hours: '08:00–20:00' },
  { id: 7,  name: 'Kiosque Presse FIH',    category: 'boutique'   as Category, terminal: 'Domestique',    zone: 'before', hours: '05:30–21:00' },
  { id: 8,  name: 'Sky Bar FIH',           category: 'bar'        as Category, terminal: 'International', zone: 'after',  hours: '08:00–00:00' },
  { id: 9,  name: 'Café Congo',            category: 'bar'        as Category, terminal: 'International', zone: 'before', hours: '05:00–22:00' },
  { id: 10, name: 'Duty Free FIH',         category: 'duty_free'  as Category, terminal: 'International', zone: 'after',  hours: '06:00–22:00' },
  { id: 11, name: 'Pearl Lounge',          category: 'lounge'     as Category, terminal: 'International', zone: 'after',  hours: '05:00–23:00' },
  { id: 12, name: 'Brussels Airlines Lounge', category: 'lounge'  as Category, terminal: 'International', zone: 'after',  hours: 'Horaires vols SN' },
  { id: 13, name: 'Rawbank Change',        category: 'exchange'   as Category, terminal: 'International', zone: 'before', hours: '07:00–21:00' },
  { id: 14, name: 'Bureau de Change FIH',  category: 'exchange'   as Category, terminal: 'International', zone: 'after',  hours: '06:00–22:00' },
  { id: 15, name: 'ATM Equity BCDC',       category: 'bank'       as Category, terminal: 'International', zone: 'before', hours: '24h/24' },
  { id: 16, name: 'ATM TMB',              category: 'bank'       as Category, terminal: 'Domestique',    zone: 'before', hours: '24h/24' },
  { id: 17, name: 'Centre Médical FIH',   category: 'medical'    as Category, terminal: 'International', zone: 'before', hours: '24h/24' },
];

const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

function RepertoirePage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = CONCESSIONS.filter(c => {
    const matchCat = activeCategory === 'all' || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.terminal.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.directory')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('shops.directorySubtitle')}</p>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)}
          placeholder={t('shops.searchPlaceholder')} className="pl-9" />
      </div>

      {/* Category pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const { label, Icon } = CATEGORY_META[cat];
          const active = activeCategory === cat;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active ? 'border-rdc-blue bg-rdc-blue text-white' : 'border-border bg-card hover:border-rdc-blue/40'
              )}>
              <Icon size={11} /> {label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">{t('shops.noResults')}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => {
            const { Icon, color } = CATEGORY_META[c.category];
            return (
              <div key={c.id} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-rdc-anthracite truncate">{c.name}</p>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={10} /> {c.terminal}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {c.hours}</span>
                  </div>
                  <span className={cn(
                    'mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium',
                    c.zone === 'after' ? 'bg-rdc-green/10 text-rdc-green' : 'bg-muted text-muted-foreground'
                  )}>
                    {c.zone === 'after' ? t('shops.afterSecurity') : t('shops.beforeSecurity')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="mt-6 text-xs text-muted-foreground">{t('shops.directoryNote')}</p>
    </div>
  );
}
