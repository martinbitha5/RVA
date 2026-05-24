import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Award, Star, Zap, CheckCircle, ChevronRight, Car, Plane } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte/fidelite')({
  component: FidelitePage,
  head: () => ({ meta: [{ title: 'Fidélité FIH — Espace Client' }] }),
});

type Level = 'Bronze' | 'Silver' | 'Gold';

const LEVELS: Record<Level, {
  gradient: string; border: string; textColor: string; minPts: number; maxPts: number | null;
  perks: string[];
}> = {
  Bronze: {
    gradient: 'from-amber-800 via-amber-600 to-amber-500',
    border: 'border-amber-400/40',
    textColor: 'text-amber-700',
    minPts: 0, maxPts: 499,
    perks: ['Réservation parking en ligne', 'Alertes SMS vols', 'Newsletter exclusive FIH'],
  },
  Silver: {
    gradient: 'from-slate-600 via-slate-400 to-slate-300',
    border: 'border-slate-400/40',
    textColor: 'text-slate-600',
    minPts: 500, maxPts: 1499,
    perks: ['Tous les avantages Bronze', 'Tarif préférentiel parking (−10%)', 'Accès file prioritaire enregistrement', 'Support dédié'],
  },
  Gold: {
    gradient: 'from-rdc-yellow via-amber-400 to-yellow-300',
    border: 'border-yellow-400/40',
    textColor: 'text-amber-600',
    minPts: 1500, maxPts: null,
    perks: ['Tous les avantages Silver', 'Accès Pearl Lounge offert (1×/mois)', 'Parking gratuit 1 jour/trimestre', 'Conciergerie VIP', 'Invitation événements RVA'],
  },
};

function getLevel(pts: number): Level {
  if (pts >= 1500) return 'Gold';
  if (pts >= 500) return 'Silver';
  return 'Bronze';
}

function nextLevel(l: Level): Level | null {
  if (l === 'Bronze') return 'Silver';
  if (l === 'Silver') return 'Gold';
  return null;
}

export default function FidelitePage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [points, setPoints] = useState(0);
  const [resaCount, setResaCount] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setUser(userData.user);

      const [resaRes, alertRes] = await Promise.all([
        supabase.from('parking_reservations').select('id').eq('user_id', userData.user.id),
        supabase.from('flight_alerts').select('id').eq('user_id', userData.user.id).eq('active', true),
      ]);
      const rc = resaRes.data?.length ?? 0;
      const ac = alertRes.data?.length ?? 0;
      setResaCount(rc);
      setFlightCount(ac);
      setPoints(rc * 100 + ac * 20);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  const level = getLevel(points);
  const lvl = LEVELS[level];
  const nl = nextLevel(level);
  const nextPts = nl ? LEVELS[nl].minPts : null;
  const progress = nextPts ? Math.min((points / nextPts) * 100, 100) : 100;
  const displayName =
    (user?.user_metadata?.['full_name'] as string | undefined) ?? user?.email?.split('@')[0] ?? 'Membre';
  const memberId = user?.id.slice(0, 8).toUpperCase() ?? '--------';
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : '—';

  return (
    <div className="space-y-5 max-w-xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-rdc-anthracite">Fidélité FIH</h1>
        <p className="text-sm text-muted-foreground mt-1">Votre carte membre et vos avantages exclusifs</p>
      </div>

      {/* ── Member Card ─────────────────────────────────────────────────── */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${lvl.gradient} p-6 text-white shadow-xl aspect-[1.6/1]`}>
        {/* Decorative circles */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 top-16 h-24 w-24 rounded-full bg-white/5" />
        <div className="absolute left-32 -bottom-8 h-28 w-28 rounded-full bg-black/10" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Aéroport de N'djili</p>
              <p className="font-display font-bold text-xl mt-0.5">FIH Fidélité</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              <Award size={13} />
              <span className="text-xs font-bold">{level}</span>
            </div>
          </div>

          <div>
            <p className="text-2xl font-bold font-mono tracking-wider mb-1">
              {points.toLocaleString('fr-FR')} pts
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold capitalize">{displayName}</p>
                <p className="text-xs text-white/60">ID · {memberId}</p>
              </div>
              <p className="text-xs text-white/60">Membre depuis {memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Points progress ─────────────────────────────────────────────── */}
      {nl && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-rdc-anthracite">Progression vers {nl}</p>
            <span className={`text-xs font-bold ${lvl.textColor}`}>
              {points} / {nextPts} pts
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${lvl.gradient} transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Plus que <span className="font-semibold text-rdc-anthracite">{(nextPts! - points).toLocaleString()}</span> points pour atteindre le niveau {nl}
          </p>
        </div>
      )}

      {/* ── How to earn points ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={15} className="text-rdc-yellow" />
          <h2 className="font-semibold text-sm text-rdc-anthracite">Gagnez des points</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Car size={15} className="text-rdc-blue" />
              <div>
                <p className="text-sm font-medium text-rdc-anthracite">Réservation parking</p>
                <p className="text-xs text-muted-foreground">{resaCount} réservation{resaCount > 1 ? 's' : ''} effectuée{resaCount > 1 ? 's' : ''}</p>
              </div>
            </div>
            <span className="font-bold text-rdc-blue text-sm">+100 pts</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Plane size={15} className="text-rdc-green" />
              <div>
                <p className="text-sm font-medium text-rdc-anthracite">Vol suivi</p>
                <p className="text-xs text-muted-foreground">{flightCount} vol{flightCount > 1 ? 's' : ''} suivi{flightCount > 1 ? 's' : ''}</p>
              </div>
            </div>
            <span className="font-bold text-rdc-green text-sm">+20 pts</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3 opacity-60">
            <div className="flex items-center gap-3">
              <Star size={15} className="text-amber-500" />
              <div>
                <p className="text-sm font-medium text-rdc-anthracite">Évaluation du service</p>
                <p className="text-xs text-muted-foreground">Bientôt disponible</p>
              </div>
            </div>
            <span className="font-bold text-amber-500 text-sm">+50 pts</span>
          </div>
        </div>
      </div>

      {/* ── Current level perks ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award size={15} className={lvl.textColor} />
          <h2 className="font-semibold text-sm text-rdc-anthracite">Vos avantages — niveau {level}</h2>
        </div>
        <ul className="space-y-2.5">
          {lvl.perks.map(perk => (
            <li key={perk} className="flex items-start gap-2.5 text-sm">
              <CheckCircle size={15} className="text-rdc-green mt-0.5 shrink-0" />
              <span className="text-rdc-anthracite">{perk}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── All levels ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold text-sm text-rdc-anthracite mb-4">Tous les niveaux</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {(['Bronze', 'Silver', 'Gold'] as Level[]).map(l => {
            const cfg = LEVELS[l];
            const isCurrentLevel = l === level;
            return (
              <div key={l} className={`rounded-xl border p-3 text-center ${isCurrentLevel ? cfg.border + ' bg-gradient-to-b ' + cfg.gradient.replace('from-', 'from-').split(' ')[0] + '/5' : 'border-border'}`}>
                <div className={`mx-auto h-8 w-8 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center mb-2`}>
                  <Award size={14} className="text-white" />
                </div>
                <p className={`text-xs font-bold ${isCurrentLevel ? cfg.textColor : 'text-muted-foreground'}`}>{l}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cfg.minPts}+ pts</p>
                {isCurrentLevel && (
                  <span className="mt-1.5 inline-block rounded-full bg-rdc-blue px-2 py-0.5 text-[10px] font-bold text-white">Actuel</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Link
        to={'/stationnement-transport/stationnement-fih' as never}
        className="flex items-center justify-center gap-2 rounded-xl bg-rdc-blue px-4 py-3 text-sm font-semibold text-white hover:bg-rdc-blue/85 transition-colors"
      >
        Réserver pour gagner des points <ChevronRight size={15} />
      </Link>
    </div>
  );
}
