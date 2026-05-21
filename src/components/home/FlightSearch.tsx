import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plane } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export function FlightSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    void navigate({ to: '/vols/departs' as never });
  }

  return (
    <div className="section-night">
      <div className="container">
        <div className="border-t border-white/8 py-8">
          <form onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-stretch gap-0">
            {/* Label */}
            <div className="flex items-center gap-3 bg-rdc-blue px-5 py-4 shrink-0">
              <Plane size={15} className="-rotate-45 text-rdc-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                {t('search.title')}
              </span>
            </div>

            {/* Input */}
            <div className="relative flex-1">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full h-full bg-white/5 border-y border-r border-white/10 text-white placeholder:text-white/25 pl-5 pr-14 py-4 text-sm focus:outline-none focus:border-rdc-yellow/50 transition-colors"
              />
              <button type="submit"
                className="absolute right-0 top-0 h-full px-5 bg-white/5 border-l border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Quick searches */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/20 mr-1">
              Suggérés :
            </span>
            {['SN491', 'Lubumbashi', 'Goma', 'Paris CDG', 'Brussels'].map(s => (
              <button key={s}
                onClick={() => setQuery(s)}
                className="border border-white/12 px-3 py-1 text-xs text-white/40 hover:text-white hover:border-rdc-yellow/40 transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
