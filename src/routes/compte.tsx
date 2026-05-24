import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard, User, Car, Plane, Bell,
  Shield, History, Award, LogOut,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { UserContext } from '@/contexts/UserContext';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte')({
  component: CompteLayout,
});

const NAV = [
  { to: '/compte/',              label: 'Tableau de bord', Icon: LayoutDashboard },
  { to: '/compte/profil',        label: 'Mon profil',       Icon: User },
  { to: '/compte/reservations',  label: 'Réservations',     Icon: Car },
  { to: '/compte/vols-suivis',   label: 'Vols suivis',      Icon: Plane },
  { to: '/compte/fidelite',      label: 'Fidélité FIH',     Icon: Award },
  { to: '/compte/historique',    label: 'Historique',        Icon: History },
  { to: '/compte/preferences',   label: 'Préférences',      Icon: Bell },
  { to: '/compte/securite',      label: 'Sécurité',         Icon: Shield },
] as const;

function isActive(pathname: string, to: string) {
  if (to === '/compte/') return pathname === '/compte' || pathname === '/compte/';
  return pathname.startsWith(to);
}

function CompteLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { void navigate({ to: '/login' as never }); return; }
      setUser(data.user);
      setLoading(false);
    });
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    void navigate({ to: '/login' as never });
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rdc-blue border-t-transparent" />
      </div>
    );
  }

  const displayName =
    (user?.user_metadata?.['full_name'] as string | undefined) ??
    user?.email?.split('@')[0] ??
    'Utilisateur';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/30">

      {/* ── Mobile: horizontal scrollable tabs ─────────────────────────── */}
      <div className="md:hidden sticky top-16 z-30 bg-background border-b border-border shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide">
          {NAV.map(({ to, label, Icon }) => {
            const active = isActive(pathname, to);
            return (
              <Link
                key={to}
                to={to as never}
                className={`flex shrink-0 items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                  active
                    ? 'border-rdc-blue text-rdc-blue'
                    : 'border-transparent text-muted-foreground hover:text-rdc-anthracite'
                }`}
              >
                <Icon size={13} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Layout ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 md:flex md:gap-8">

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 gap-3 self-start sticky top-24">

          {/* User card */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-rdc-blue to-rdc-blue/70 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-rdc-anthracite truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <button
                onClick={() => { void handleLogout(); }}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-rdc-red transition-colors"
              >
                <LogOut size={12} /> Se déconnecter
              </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="rounded-2xl border border-border bg-card overflow-hidden">
            {NAV.map(({ to, label, Icon }) => {
              const active = isActive(pathname, to);
              return (
                <Link
                  key={to}
                  to={to as never}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-all border-b border-border last:border-0 ${
                    active
                      ? 'bg-rdc-blue/5 text-rdc-blue font-medium pl-3 border-l-2 border-l-rdc-blue'
                      : 'text-muted-foreground hover:text-rdc-anthracite hover:bg-muted/40 pl-4'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Help */}
          <div className="rounded-xl bg-rdc-blue/5 border border-rdc-blue/10 p-3 text-xs">
            <p className="font-semibold text-rdc-anthracite mb-1">Besoin d'aide ?</p>
            <p className="text-muted-foreground leading-relaxed">
              Support 24h/24 ·{' '}
              <a href="mailto:support@aindjili.com" className="text-rdc-blue hover:underline">
                support@aindjili.com
              </a>
            </p>
          </div>
        </aside>

        {/* Main content — user provided via context so child pages skip getUser() */}
        <main className="flex-1 min-w-0">
          <UserContext.Provider value={{ user }}>
            <Outlet />
          </UserContext.Provider>
        </main>
      </div>
    </div>
  );
}
