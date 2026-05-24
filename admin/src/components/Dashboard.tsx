import { useGetList } from 'react-admin';
import { Card, CardContent, Grid, Typography, Box, Divider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StoreIcon from '@mui/icons-material/Store';

interface StatCardProps {
  title: string;
  count: number | undefined;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

function StatCard({ title, count, icon, color, subtitle }: StatCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ bgcolor: color + '18', p: 1, borderRadius: 2 }}>
            <Box sx={{ color }}>{icon}</Box>
          </Box>
          <Typography variant="h4" fontWeight={800} color="text.primary">
            {count ?? '—'}
          </Typography>
        </Box>
        <Typography variant="body2" fontWeight={600} color="text.primary">{title}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const { total: flights }      = useGetList('flights',              { pagination: { page: 1, perPage: 1 } });
  const { total: reservations } = useGetList('parking_reservations', { pagination: { page: 1, perPage: 1 } });
  const { total: users }        = useGetList('profiles',             { pagination: { page: 1, perPage: 1 } });
  const { total: news }         = useGetList('news_articles',        { pagination: { page: 1, perPage: 1 } });
  const { total: jobs }         = useGetList('job_postings',         { pagination: { page: 1, perPage: 1 } });
  const { total: alerts }       = useGetList('flight_alerts',        { pagination: { page: 1, perPage: 1 } });
  const { total: complaints }   = useGetList('noise_complaints',     { pagination: { page: 1, perPage: 1 } });
  const { total: concessions }  = useGetList('concessions',          { pagination: { page: 1, perPage: 1 } });

  return (
    <Box sx={{ p: 3 }}>
      {/* En-tête */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} color="#003DA5" gutterBottom>
          Tableau de bord — Aéroport FIH
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bienvenue dans le backoffice RVA. Toutes les modifications sont immédiatement visibles sur le site public aindjili.com
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Statistiques */}
      <Typography variant="overline" color="text.secondary" fontWeight={700} sx={{ display: 'block', mb: 2 }}>
        Vue d'ensemble
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Vols" count={flights} icon={<FlightIcon />} color="#003DA5" subtitle="En base de données" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Réservations parking" count={reservations} icon={<LocalParkingIcon />} color="#009A44" subtitle="Total cumulé" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Comptes clients" count={users} icon={<PeopleIcon />} color="#FF9800" subtitle="Inscrits" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Articles" count={news} icon={<ArticleIcon />} color="#9C27B0" subtitle="Actualités publiées" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Offres d'emploi" count={jobs} icon={<WorkIcon />} color="#F44336" subtitle="Postes ouverts" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Alertes WhatsApp" count={alerts} icon={<NotificationsActiveIcon />} color="#25D366" subtitle="Abonnements actifs" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Plaintes bruit" count={complaints} icon={<VolumeUpIcon />} color="#FF5722" subtitle="Reçues" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard title="Concessions" count={concessions} icon={<StoreIcon />} color="#607D8B" subtitle="Boutiques & Restaurants" />
        </Grid>
      </Grid>

      {/* Note importante */}
      <Card sx={{ borderRadius: 3, bgcolor: '#003DA508', border: '1px solid #003DA520' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} color="#003DA5" gutterBottom>
            ℹ️ Synchronisation automatique avec le site public
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            • <strong>Ajouter</strong> un vol, une boutique, une actualité → apparaît immédiatement sur aindjili.com<br />
            • <strong>Modifier</strong> un statut de vol → mis à jour en temps réel sur le tableau des départs/arrivées<br />
            • <strong>Supprimer</strong> une concession, une offre d'emploi → disparaît du site public instantanément<br />
            • <strong>Images</strong> → stockées dans Supabase Storage, accessibles publiquement sur le site
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
