import { Link } from '@tanstack/react-router';
import { ArrowRight, Plane, Bus, Clock, Map } from 'lucide-react';

const TRANSPORT_LINKS = [
  { label: 'Déposer et récupérer un passager', href: '/stationnement-transport/depose-recuperation' },
  { label: 'Taxis officiels agréés RVA',       href: '/stationnement-transport/taxis' },
  { label: 'Location de voitures',   href: '/stationnement-transport/location-voitures' },
  { label: 'Bus Transco depuis Kinshasa', href: '/stationnement-transport/transcom-bus' },
] as const;

const WAIT_DEPARTS = [
  { label: 'Contrôle de sécurité A',         sub: 'International',       minutes: '~15' },
  { label: 'Contrôle de sécurité B',         sub: 'Domestique',          minutes: '~8'  },
] as const;

const WAIT_ARRIVEES = [
  { label: 'Contrôle immigration DGM',       sub: 'International',       minutes: '~20' },
  { label: 'Contrôle douanier DGDA',         sub: 'International',       minutes: '~12' },
] as const;

export function TransportWaitTime() {
  return (
    <section className="bg-white border-t border-[#E8E8E8]">
      <div className="container py-0">
        <div
          className="grid md:grid-cols-2 gap-0.5"
          style={{ background: '#E8E8E8' }}
        >

          {/* ── LEFT: photo + transport links ── */}
          <div className="flex flex-col gap-0.5">

            {/* Airport photo */}
            <div className="relative h-52 overflow-hidden">
              <img
                src="/images/fih-checkin.jpg"
                alt="Terminal FIH — Hall d'enregistrement"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'brightness(0.8) saturate(1.1)' }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.parentElement as HTMLElement).style.background =
                    'linear-gradient(135deg,#003DA5,#001E6E)';
                }}
              />
              {/* Text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Terminal International FIH · N'djili, Kinshasa
                </p>
              </div>
            </div>

            {/* Transport links card */}
            <div className="flex-1 bg-white p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center bg-[#003DA5]">
                  <Bus size={14} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A]">Transport</h3>
              </div>
              <div className="space-y-0 border-t border-[#F0F0F0]">
                {TRANSPORT_LINKS.map(link => (
                  <Link
                    key={link.href}
                    to={link.href as never}
                    className="group flex items-center justify-between py-3 border-b border-[#F0F0F0] hover:bg-[#FAFAFA] -mx-1 px-1 transition-colors"
                  >
                    <span className="text-sm text-[#003DA5] font-medium group-hover:underline">
                      {link.label}
                    </span>
                    <ArrowRight size={12} className="text-[#003DA5] flex-shrink-0 ml-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: airport photo + temps d'attente ── */}
          <div className="flex flex-col gap-0.5">

            {/* Airport photo 2 */}
            <div className="relative h-52 overflow-hidden">
              <img
                src="/images/fih-tarmac.jpg"
                alt="Tarmac FIH — opérations au sol"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ filter: 'brightness(0.75) saturate(1.15)' }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  (e.currentTarget.parentElement as HTMLElement).style.background =
                    'linear-gradient(135deg,#1A1A1A,#2D3748)';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Tarmac FIH · Aéroport International de N'djili
                </p>
              </div>
            </div>

            {/* Temps d'attente card */}
            <div className="flex-1 bg-white p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center bg-[#003DA5]">
                  <Clock size={14} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-[#1A1A1A]">Temps d'attente</h3>
              </div>

              {/* Départs */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Plane size={12} className="-rotate-45 text-[#555]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#555]">
                    Départs
                  </span>
                </div>
                {WAIT_DEPARTS.map(row => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-[#F0F0F0] py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{row.label}</p>
                      <p className="text-xs text-[#888]">{row.sub}</p>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] flex-shrink-0 ml-4">
                      {row.minutes} min
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrivées */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Plane size={12} className="rotate-[135deg] text-[#555]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#555]">
                    Arrivées
                  </span>
                </div>
                {WAIT_ARRIVEES.map(row => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between border-b border-[#F0F0F0] py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{row.label}</p>
                      <p className="text-xs text-[#888]">{row.sub}</p>
                    </div>
                    <span className="text-sm font-bold text-[#1A1A1A] flex-shrink-0 ml-4">
                      {row.minutes} min
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to={'/vols/plans-aerogares' as never}
                className="mt-4 flex items-center gap-1.5 text-sm text-[#003DA5] hover:underline font-medium"
              >
                <Map size={13} />
                Plans des terminaux
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
