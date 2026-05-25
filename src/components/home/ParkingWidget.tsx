import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ParkingCircle, Calendar, ChevronDown, Check, ArrowRight, ExternalLink, Tag, X } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const FEATURES = [
  'Économies',
  'Sécurité 24/7',
  'Accessibilité PMR',
  'Stationnement officiel RVA',
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

function todayStr() {
  return new Date().toISOString().split('T')[0];
}
function tomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function ParkingWidget() {
  const navigate = useNavigate();

  const [entryDate, setEntryDate] = useState(todayStr());
  const [entryTime, setEntryTime] = useState('08:00');
  const [exitDate,  setExitDate]  = useState(tomorrowStr());
  const [exitTime,  setExitTime]  = useState('08:00');
  const [showPromo, setShowPromo] = useState(false);
  const [promo,     setPromo]     = useState('');
  const [error,     setError]     = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!entryDate || !entryTime || !exitDate || !exitTime) {
      // Champs vides → redirige vers le formulaire complet
      void navigate({ to: '/stationnement-transport/formulaire' as never });
      return;
    }

    const start = new Date(`${entryDate}T${entryTime}`);
    const end   = new Date(`${exitDate}T${exitTime}`);

    if (end <= start || (end.getTime() - start.getTime()) / 3_600_000 < 4) {
      // Données invalides → redirige vers le formulaire complet
      void navigate({ to: '/stationnement-transport/formulaire' as never });
      return;
    }

    // Données valides → redirige directement vers la sélection de forfaits
    void navigate({
      to: '/stationnement-transport/stationnement-fih' as never,
      search: {
        start: start.toISOString(),
        end:   end.toISOString(),
        promo: promo.trim() || undefined,
      } as never,
    });
  }

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      <div className="container py-7 md:py-8">
        <form onSubmit={handleSubmit} className="border border-[#D8E0ED] bg-white p-6 md:p-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-[#003DA5]">
                <ParkingCircle size={20} className="text-white" />
              </div>
              <h2 className="text-lg font-black text-[#1A1A1A]">
                Réservez votre stationnement
              </h2>
            </div>
            <div className="flex items-center gap-5 text-sm flex-wrap">
              <Link
                to={'/compte/reservations' as never}
                className="flex items-center gap-1 text-[#003DA5] hover:underline font-medium"
              >
                Gérer mes réservations
                <ExternalLink size={12} />
              </Link>
              <Link
                to={'/stationnement-transport/offres' as never}
                className="flex items-center gap-1 text-[#003DA5] hover:underline font-medium"
              >
                Consulter les tarifs
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Erreur validation */}
          {error && (
            <div className="mb-4 rounded border border-[#CE1126]/30 bg-[#CE1126]/5 px-3 py-2 text-sm text-[#CE1126]">
              {error}
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {/* Date d'entrée */}
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                Date d'entrée <span className="text-[#CE1126]">*</span>
              </label>
              <div className="relative border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <input
                  type="date"
                  value={entryDate}
                  min={todayStr()}
                  onChange={e => setEntryDate(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                />
                <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
              </div>
            </div>

            {/* Heure d'entrée */}
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                Heure d'entrée <span className="text-[#CE1126]">*</span>
              </label>
              <div className="relative border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <select
                  value={entryTime}
                  onChange={e => setEntryTime(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
              </div>
            </div>

            {/* Date de sortie */}
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                Date de sortie <span className="text-[#CE1126]">*</span>
              </label>
              <div className="relative border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <input
                  type="date"
                  value={exitDate}
                  min={entryDate}
                  onChange={e => setExitDate(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                />
                <Calendar size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
              </div>
            </div>

            {/* Heure de sortie */}
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                Heure de sortie <span className="text-[#CE1126]">*</span>
              </label>
              <div className="relative border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <select
                  value={exitTime}
                  onChange={e => setExitTime(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                >
                  {TIME_OPTIONS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Champ code promo (optionnel) */}
          {showPromo && (
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1 max-w-xs border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                <input
                  type="text"
                  value={promo}
                  onChange={e => setPromo(e.target.value.toUpperCase())}
                  placeholder="Code promotionnel"
                  className="w-full pl-8 pr-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white font-mono tracking-wider"
                />
              </div>
              <button type="button" onClick={() => { setShowPromo(false); setPromo(''); }}
                className="text-muted-foreground hover:text-rdc-anthracite">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Bottom row: checkmarks + buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Feature checkmarks */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {FEATURES.map(f => (
                <span key={f} className="flex items-center gap-1.5 text-xs text-[#555]">
                  <Check size={11} className="text-[#009A44] flex-shrink-0" />
                  {f}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!showPromo && (
                <button
                  type="button"
                  onClick={() => setShowPromo(true)}
                  className="border border-[#003DA5] px-4 py-2.5 text-xs font-bold text-[#003DA5] hover:bg-[#003DA5] hover:text-white transition-colors whitespace-nowrap"
                >
                  Promo +
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#003DA5] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#002580] transition-colors whitespace-nowrap"
              >
                Obtenir une estimation
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
