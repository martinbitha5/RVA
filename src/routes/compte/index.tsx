import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Plane, Car, Bell, Award, ChevronRight,
  CalendarDays, Clock, TrendingUp, Zap,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

export const Route = createFileRoute('/compte/')({
  component: Dashboard,
  head: () => ({ meta: [{ title: 'Tableau de bord â€” Espace Client FIH' }] }),
});

interface Reservation {
  id: string;
  reservation_code: string;
  start_at: string;
  end_at: string;
  total_amount_usd: number;
  payment_status: string;
  vehicle_plate: string;
  parking_lots?: { name: string; code: string } | null;
}

interface Stats {
  reservations: number;
  volsSuivis: number;
  nextResa: Reservation | null;
  points: number;
  level: 'Bronze' | 'Silver' | 'Gold';
}

const LEVEL_CONFIG = {
  Bronze: { color: 'from-amber-700 to-amber-500', text: 'text-amber-700', bg: 'bg-amber-50', next: 500 },
  Silver: { color: 'from-slate-500 to-slate-400', text: 'text-slate-600', bg: 'bg-slate-50', next: 1500 },
  Gold:   { color: 'from-rdc-yellow to-amber-400', text: 'text-amber-600', bg: 'bg-amber-50/60', next: null },
};

function getLevel(points: number): 'Bronze' | 'Silver' | 'Gold' {
  if (points >= 1500) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bon matin';
  if (h < 18) return 'Bon aprÃ¨s-midi';
  return 'Bonsoir';
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function Dashboard() {
  const { user } = useUser();
  const [stats, setStats] = useState<Stats>({
    reservations: 0, volsSuivis: 0, nextResa: null, points: 0, level: 'Bronze',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const [resaRes, alertsRes] = await Promise.all([
        supabase
          .from('parking_reservations')
          .select('*, parking_lots(name, code)')
          .eq('user_id', user.id)
          .order('start_at', { ascending: true }),
        supabase
          .from('flight_alerts')
          .select('id')
          .eq('user_id', user.id)
          .eq('active', true),
      ]);

      const resas = (resaRes.data as Reservation[] | null) ?? [];
      const alertCount = (alertsRes.data?.length ?? 0);
      const now = new Date();
      const nextResa = resas.find(r => new Date(r.start_at) > now) ?? null;
      const points = resas.length * 100 + alertCount * 20;
      const level = getLevel(points);

      setStats({ reservations: resas.length, volsSuivis: alertCount, nextResa, points, level });
      setLoading(false);
    })();
  }, [user]);

  const displayName =
    (user?.user_metadata?.['full_name'] as string | undefined)?.split(' ')[0] ??
    user?.email?.split('@')[0] ??
    'vous';

  const lvl = LEVEL_CONFIG[stats.level];
  const nextPts = lvl.next ? lvl.next - stats.points : 0;
  const progress = lvl.next ? Math.min((stats.points / lvl.next) * 100, 100) : 100;

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-28 rounded-2xl bg-muted" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-24 rounded-2xl bg-muted" />)}
        </div>
        <div className="h-40 rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {/* â”€â”€ Welcome banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rdc-blue to-rdc-blue/80 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <p className="text-sm text-white/70 mb-1">{greeting()},</p>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-1 capitalize">{displayName} ðŸ‘‹</h1>
          <p className="text-sm text-white/70">Bienvenue dans votre espace client FIH Â· AÃ©roport de N'djili</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 top-8 h-24 w-24 rounded-full bg-white/5" />
        <div className="absolute right-16 -bottom-6 h-20 w-20 rounded-full bg-rdc-yellow/20" />
      </div>

      {/* â”€â”€ 4 Stat cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: 'RÃ©servations',
            value: stats.reservations,
            Icon: Car,
            color: 'text-rdc-blue',
            bg: 'bg-rdc-blue/10',
            href: '/compte/reservations',
          },
          {
            label: 'Vols suivis',
            value: stats.volsSuivis,
            Icon: Plane,
            color: 'text-rdc-green',
            bg: 'bg-rdc-green/10',
            href: '/compte/vols-suivis',
          },
          {
            label: 'Alertes WhatsApp',
            value: stats.volsSuivis,
            Icon: Bell,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            href: '/compte/preferences',
          },
          {
            label: 'Points fidÃ©litÃ©',
            value: stats.points,
            Icon: Award,
            color: 'text-rdc-yellow',
            bg: 'bg-rdc-yellow/10',
            href: '/compte/fidelite',
          },
        ].map(({ label, value, Icon, color, bg, href }) => (
          <Link
            key={label}
            to={href as never}
            className="rounded-2xl border border-border bg-card p-4 hover:shadow-md hover:border-rdc-blue/20 transition-all group"
          >
            <div className={`h-9 w-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={17} className={color} />
            </div>
            <p className="font-bold text-2xl text-rdc-anthracite">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* â”€â”€ FidÃ©litÃ© progress â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${lvl.color} flex items-center justify-center`}>
              <Award size={15} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-rdc-anthracite">Membre {stats.level}</p>
              <p className="text-xs text-muted-foreground">{stats.points} points accumulÃ©s</p>
            </div>
          </div>
          <Link to={'/compte/fidelite' as never} className="text-xs text-rdc-blue hover:underline flex items-center gap-1">
            Voir ma carte <ChevronRight size={12} />
          </Link>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${lvl.color} transition-all duration-700`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {lvl.next && (
          <p className="text-xs text-muted-foreground mt-1.5">
            <span className="font-medium text-rdc-anthracite">{nextPts} points</span> avant le niveau supÃ©rieur
          </p>
        )}
      </div>

      {/* â”€â”€ Next reservation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-rdc-blue" />
            <h2 className="font-semibold text-sm text-rdc-anthracite">Prochaine rÃ©servation</h2>
          </div>
          <Link to={'/compte/reservations' as never} className="text-xs text-rdc-blue hover:underline flex items-center gap-1">
            Tout voir <ChevronRight size={12} />
          </Link>
        </div>

        {stats.nextResa ? (
          <div className="rounded-xl bg-rdc-blue/5 border border-rdc-blue/15 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-rdc-anthracite">{stats.nextResa.parking_lots?.name ?? 'Parking FIH'}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  Code : {stats.nextResa.reservation_code}
                </p>
              </div>
              <span className="rounded-full bg-rdc-green/10 px-2.5 py-0.5 text-xs font-semibold text-rdc-green shrink-0">
                ConfirmÃ©e
              </span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {fmt(stats.nextResa.start_at)}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {new Date(stats.nextResa.start_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <Car size={28} className="mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">Aucune rÃ©servation Ã  venir</p>
            <Link
              to={'/stationnement-transport/formulaire' as never}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-rdc-blue px-3 py-1.5 text-xs font-medium text-white hover:bg-rdc-blue/85 transition-colors"
            >
              RÃ©server un parking <ChevronRight size={12} />
            </Link>
          </div>
        )}
      </div>

      {/* â”€â”€ Quick actions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-rdc-yellow" />
          <h2 className="font-semibold text-sm text-rdc-anthracite">Actions rapides</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { label: 'RÃ©server un parking',    href: '/stationnement-transport/formulaire', Icon: Car,     color: 'bg-rdc-blue/10 text-rdc-blue' },
            { label: 'Suivre un vol',           href: '/vols/alertes-whatsapp',                     Icon: Plane,   color: 'bg-rdc-green/10 text-rdc-green' },
            { label: 'Mes prÃ©fÃ©rences',         href: '/compte/preferences',                         Icon: Bell,    color: 'bg-amber-50 text-amber-600' },
            { label: 'Carte fidÃ©litÃ©',          href: '/compte/fidelite',                            Icon: Award,   color: 'bg-rdc-yellow/10 text-amber-600' },
            { label: 'Historique',              href: '/compte/historique',                          Icon: TrendingUp, color: 'bg-muted text-muted-foreground' },
            { label: 'SÃ©curitÃ©',                href: '/compte/securite',                            Icon: TrendingUp, color: 'bg-muted text-muted-foreground' },
          ].map(({ label, href, Icon, color }) => (
            <Link
              key={href}
              to={href as never}
              className="flex items-center gap-2.5 rounded-xl border border-border p-3 text-sm hover:border-rdc-blue/20 hover:shadow-sm transition-all"
            >
              <span className={`h-7 w-7 rounded-lg ${color} flex items-center justify-center shrink-0`}>
                <Icon size={13} />
              </span>
              <span className="text-xs font-medium text-rdc-anthracite leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
