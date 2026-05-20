import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { User, Plane, Car, Bell, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export const Route = createFileRoute('/compte/')({
  component: ComptePage,
  head: () => ({ meta: [{ title: "Mon espace client — FIH" }] }),
});

const ACCOUNT_LINKS = [
  { key: 'profil',         href: '/compte/profil',          Icon: User,  label: 'Mon profil' },
  { key: 'reservations',   href: '/compte/reservations',     Icon: Car,   label: 'Mes réservations' },
  { key: 'vols-suivis',    href: '/compte/vols-suivis',      Icon: Plane, label: 'Vols suivis' },
  { key: 'preferences',    href: '/compte/preferences',      Icon: Bell,  label: 'Préférences' },
] as const;

function ComptePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    return <div className="container py-20 text-center text-sm text-muted-foreground">{t('common.loading')}</div>;
  }

  const displayName = (user?.user_metadata?.['full_name'] as string | undefined) ?? user?.email ?? 'Utilisateur';

  return (
    <div className="container py-10 md:py-14 max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rdc-blue text-xl font-bold text-white">
            {displayName[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="font-display font-bold text-xl text-rdc-anthracite">{displayName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => { void handleLogout(); }} className="flex items-center gap-2">
          <LogOut size={14} /> {t('auth.logout')}
        </Button>
      </div>

      {/* Navigation */}
      <div className="space-y-3">
        {ACCOUNT_LINKS.map(({ key, href, Icon, label }) => (
          <Link key={key} to={href as never}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 hover:border-rdc-blue/30 hover:shadow-md transition-all group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rdc-blue/10">
              <Icon size={18} className="text-rdc-blue" />
            </div>
            <p className="flex-1 font-medium text-rdc-anthracite group-hover:text-rdc-blue transition-colors">{t(`auth.${key.replace('-', '') as 'profil'}`) || label}</p>
            <ChevronRight size={16} className="text-muted-foreground" />
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-center text-muted-foreground">
        Espace client sécurisé · RVA — Régie des Voies Aériennes
      </p>
    </div>
  );
}
