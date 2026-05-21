import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ParkingCircle, Calendar, ChevronDown, Check, ArrowRight, ExternalLink } from 'lucide-react';

const FEATURES = [
  'Économies',
  'Sécurité 24/7',
  'Accessibilité PMR',
  'Stationnement officiel RVA',
];

export function ParkingWidget() {
  const [entryDate, setEntryDate] = useState('');
  const [exitDate,  setExitDate]  = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime,  setExitTime]  = useState('');

  return (
    <section className="bg-white border-b border-[#E8E8E8]">
      <div className="container py-7 md:py-8">
        <div className="border border-[#D8E0ED] bg-white p-6 md:p-8">

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
                Consulter les options de stationnement
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {/* Date d'entrée */}
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                Date d'entrée <span className="text-[#CE1126]">*</span>
              </label>
              <div className="relative border border-[#C8D0DC] focus-within:border-[#003DA5] transition-colors">
                <input
                  type="date"
                  value={entryDate}
                  onChange={e => setEntryDate(e.target.value)}
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
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                >
                  <option value="">HH:MM</option>
                  {Array.from({ length: 24 }, (_, h) => (
                    ['00', '30'].map(m => (
                      <option key={`${h}:${m}`} value={`${String(h).padStart(2,'0')}:${m}`}>
                        {`${String(h).padStart(2,'0')}:${m}`}
                      </option>
                    ))
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
                  onChange={e => setExitDate(e.target.value)}
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
                  className="w-full px-3 py-2.5 text-sm text-[#1A1A1A] outline-none bg-white appearance-none"
                >
                  <option value="">HH:MM</option>
                  {Array.from({ length: 24 }, (_, h) => (
                    ['00', '30'].map(m => (
                      <option key={`${h}:${m}`} value={`${String(h).padStart(2,'0')}:${m}`}>
                        {`${String(h).padStart(2,'0')}:${m}`}
                      </option>
                    ))
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
              </div>
            </div>
          </div>

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
              <button className="border border-[#003DA5] px-4 py-2.5 text-xs font-bold text-[#003DA5] hover:bg-[#003DA5] hover:text-white transition-colors whitespace-nowrap">
                Promo +
              </button>
              <Link
                to={'/stationnement-transport/offres' as never}
                className="flex items-center gap-2 bg-[#003DA5] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#002580] transition-colors whitespace-nowrap"
              >
                Obtenir une estimation
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
