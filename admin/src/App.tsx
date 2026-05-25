import {
  Admin, Resource, Layout, AppBar, Menu, MenuItemLink,
  List, Datagrid, TextField, DateField, BooleanField, NumberField, UrlField,
  Edit, SimpleForm, TextInput, DateTimeInput, BooleanInput, NumberInput, SelectInput,
  Create, Show, SimpleShowLayout,
  useRecordContext,
  DeleteWithConfirmButton,
  EditButton, ShowButton,
  TopToolbar, FilterButton, CreateButton, ExportButton,
} from 'react-admin';
import {
  Flight, LocalParking, People, Article,
  Work, NotificationsActive, AirlineStops,
  Store, VolumeUp, MeetingRoom,
} from '@mui/icons-material';
import { Box, Chip } from '@mui/material';
import { dataProvider }          from './dataProvider';
import { authProvider }          from './authProvider';
import { rvaTheme }              from './theme';
import { SupabaseImageInput }    from './components/SupabaseImageInput';
import { Dashboard }             from './components/Dashboard';

// ── CHAMPS COMMUNS ────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  scheduled:'#2196F3', boarding:'#FF9800', departed:'#4CAF50',
  arrived:'#4CAF50', delayed:'#FF5722', cancelled:'#F44336',
  diverted:'#9C27B0', on_time:'#4CAF50',
  pending:'#FF9800', paid:'#4CAF50', failed:'#F44336', refunded:'#9C27B0',
  published:'#4CAF50', draft:'#FF9800', archived:'#9E9E9E',
  received:'#2196F3', in_review:'#FF9800', responded:'#4CAF50', closed:'#9E9E9E',
  active:'#4CAF50', inactive:'#9E9E9E',
};

function StatusField({ source }: { source: string }) {
  const record = useRecordContext();
  if (!record) return null;
  const val = String(record[source] ?? '');
  const color = statusColors[val] ?? '#9E9E9E';
  return (
    <Chip label={val} size="small"
      sx={{ bgcolor: color + '20', color, border: `1px solid ${color}50`, fontWeight: 700, fontSize: 11 }} />
  );
}

function ThumbnailField({ source }: { source: string }) {
  const record = useRecordContext();
  const url = record?.[source] as string | undefined;
  if (!url) return <Box sx={{ width: 56, height: 38, bgcolor: '#f5f5f5', borderRadius: 1 }} />;
  return <img src={url} alt="" style={{ width: 56, height: 38, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />;
}

// ── TOOLBAR ACTIONS ───────────────────────────────────────────────────────────

function ListActions() {
  return (
    <TopToolbar>
      <FilterButton />
      <CreateButton label="Ajouter" />
      <ExportButton label="Exporter" />
    </TopToolbar>
  );
}

function EditActions() {
  return (
    <TopToolbar>
      <ShowButton />
      <DeleteWithConfirmButton
        confirmTitle="Supprimer cet élément ?"
        confirmContent="Cette action est irréversible. L'élément sera supprimé du site public immédiatement."
      />
    </TopToolbar>
  );
}

// ── MENU ──────────────────────────────────────────────────────────────────────

function CustomMenu() {
  return (
    <Menu>
      <MenuItemLink to="/"                     primaryText="📊  Tableau de bord"          leftIcon={<Article />} />
      <MenuItemLink to="/flights"              primaryText="✈️  Vols"                     leftIcon={<Flight />} />
      <MenuItemLink to="/parking_reservations" primaryText="🅿️  Réservations parking"     leftIcon={<LocalParking />} />
      <MenuItemLink to="/profiles"             primaryText="👥  Utilisateurs"              leftIcon={<People />} />
      <MenuItemLink to="/news_articles"        primaryText="📰  Actualités"                leftIcon={<Article />} />
      <MenuItemLink to="/job_postings"         primaryText="💼  Offres d'emploi"           leftIcon={<Work />} />
      <MenuItemLink to="/flight_alerts"        primaryText="🔔  Alertes WhatsApp"          leftIcon={<NotificationsActive />} />
      <MenuItemLink to="/airlines"             primaryText="🏢  Compagnies aériennes"      leftIcon={<AirlineStops />} />
      <MenuItemLink to="/concessions"          primaryText="🛒  Boutiques & Restaurants"   leftIcon={<Store />} />
      <MenuItemLink to="/lounges"              primaryText="🛋️  Salons VIP"                leftIcon={<MeetingRoom />} />
      <MenuItemLink to="/noise_complaints"     primaryText="🔊  Plaintes bruit"            leftIcon={<VolumeUp />} />
      <MenuItemLink to="/parking_lots"         primaryText="🅿️  Gestion parkings"          leftIcon={<LocalParking />} />
    </Menu>
  );
}

function CustomAppBar() {
  return (
    <AppBar>
      <Box sx={{ fontWeight: 800, fontSize: 15, letterSpacing: 1 }}>
        FIH · Backoffice RVA
      </Box>
    </AppBar>
  );
}

function CustomLayout({ children }: { children: React.ReactNode }) {
  return <Layout appBar={CustomAppBar} menu={CustomMenu}>{children}</Layout>;
}

// ══════════════════════════════════════════════════════════════════════════════
// ✈️  VOLS
// ══════════════════════════════════════════════════════════════════════════════

function FlightList() {
  return (
    <List sort={{ field: 'scheduled_time', order: 'DESC' }} perPage={25} actions={<ListActions />}
      filters={[
        <SelectInput key="type" source="type" label="Type" alwaysOn
          choices={[{ id: 'departure', name: 'Départ' }, { id: 'arrival', name: 'Arrivée' }]} />,
        <SelectInput key="status" source="status" label="Statut" alwaysOn
          choices={['scheduled','boarding','departed','arrived','delayed','cancelled','on_time']
            .map(s => ({ id: s, name: s }))} />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="flight_number" label="Vol" />
        <TextField source="type" label="Type" />
        <TextField source="origin_iata" label="Origine" />
        <TextField source="destination_iata" label="Destination" />
        <DateField source="scheduled_time" label="Heure prévue" showTime />
        <TextField source="terminal" label="Terminal" />
        <TextField source="gate" label="Porte" />
        <StatusField source="status" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function FlightEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier le vol">
      <SimpleForm>
        <TextInput source="flight_number" label="Numéro de vol" required />
        <SelectInput source="type" label="Type" required
          choices={[{ id: 'departure', name: 'Départ' }, { id: 'arrival', name: 'Arrivée' }]} />
        <TextInput source="origin_iata" label="IATA Origine" />
        <TextInput source="destination_iata" label="IATA Destination" />
        <DateTimeInput source="scheduled_time" label="Heure prévue" />
        <DateTimeInput source="estimated_time" label="Heure estimée" />
        <DateTimeInput source="actual_time" label="Heure réelle" />
        <SelectInput source="status" label="Statut ⚡" required
          choices={['scheduled','boarding','departed','arrived','delayed','cancelled','diverted','on_time']
            .map(s => ({ id: s, name: s }))} />
        <SelectInput source="terminal" label="Terminal"
          choices={[{ id: 'international', name: 'International' }, { id: 'domestic', name: 'Domestique' }]} />
        <TextInput source="gate" label="Porte / Gate" />
        <TextInput source="baggage_claim" label="Tapis bagages" />
        <TextInput source="aircraft_type" label="Type d'appareil" />
        <TextInput source="remarks_fr" label="Remarques (FR)" fullWidth multiline />
      </SimpleForm>
    </Edit>
  );
}

function FlightCreate() {
  return (
    <Create title="Ajouter un vol">
      <SimpleForm>
        <TextInput source="flight_number" label="Numéro de vol" required />
        <SelectInput source="type" label="Type" required
          choices={[{ id: 'departure', name: 'Départ' }, { id: 'arrival', name: 'Arrivée' }]} />
        <TextInput source="origin_iata" label="IATA Origine" required />
        <TextInput source="destination_iata" label="IATA Destination" required />
        <DateTimeInput source="scheduled_time" label="Heure prévue" />
        <SelectInput source="status" label="Statut" defaultValue="scheduled"
          choices={['scheduled','boarding','departed','arrived','delayed','cancelled','on_time']
            .map(s => ({ id: s, name: s }))} />
        <SelectInput source="terminal" label="Terminal"
          choices={[{ id: 'international', name: 'International' }, { id: 'domestic', name: 'Domestique' }]} />
        <TextInput source="gate" label="Porte / Gate" />
        <TextInput source="aircraft_type" label="Type d'appareil" />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🅿️  RÉSERVATIONS PARKING (lecture seule)
// ══════════════════════════════════════════════════════════════════════════════

function ReservationList() {
  return (
    <List sort={{ field: 'created_at', order: 'DESC' }} perPage={25}
      actions={<TopToolbar><FilterButton /><ExportButton label="Exporter" /></TopToolbar>}
      filters={[
        <SelectInput key="ps" source="payment_status" label="Statut" alwaysOn
          choices={['pending','paid','failed','refunded'].map(s => ({ id: s, name: s }))} />,
        <SelectInput key="pm" source="payment_method" label="Moyen de paiement"
          choices={['airtel_money','mpesa','orange_money','card','cash'].map(s => ({ id: s, name: s }))} />,
      ]}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="reservation_code" label="Code" />
        <TextField source="vehicle_plate" label="Plaque" />
        <DateField source="start_at" label="Entrée" showTime />
        <DateField source="end_at" label="Sortie" showTime />
        <NumberField source="total_amount_usd" label="USD" options={{ style: 'currency', currency: 'USD' }} />
        <TextField source="payment_method" label="Paiement" />
        <StatusField source="payment_status" />
        <DateField source="created_at" label="Créée le" />
        <ShowButton label="" />
      </Datagrid>
    </List>
  );
}

function ReservationShow() {
  return (
    <Show title="Réservation">
      <SimpleShowLayout>
        <TextField source="reservation_code" label="Code de réservation" />
        <TextField source="vehicle_plate" label="Plaque d'immatriculation" />
        <DateField source="start_at" label="Date d'entrée" showTime />
        <DateField source="end_at" label="Date de sortie" showTime />
        <NumberField source="total_amount_usd" label="Montant (USD)" />
        <TextField source="payment_method" label="Moyen de paiement" />
        <StatusField source="payment_status" />
        <UrlField source="qr_code_url" label="QR Code" />
        <TextField source="notes" label="Notes" />
        <DateField source="created_at" label="Créée le" />
      </SimpleShowLayout>
    </Show>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 👥  UTILISATEURS (lecture seule)
// ══════════════════════════════════════════════════════════════════════════════

function ProfileList() {
  return (
    <List sort={{ field: 'created_at', order: 'DESC' }} perPage={25}
      actions={<TopToolbar><ExportButton label="Exporter" /></TopToolbar>}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="full_name" label="Nom complet" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <TextField source="preferred_language" label="Langue" />
        <BooleanField source="notification_email" label="Notif. email" />
        <DateField source="created_at" label="Inscrit le" />
        <ShowButton label="" />
      </Datagrid>
    </List>
  );
}

function ProfileShow() {
  return (
    <Show title="Profil utilisateur">
      <SimpleShowLayout>
        <TextField source="full_name" label="Nom complet" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <TextField source="preferred_language" label="Langue préférée" />
        <BooleanField source="notification_email" label="Notifications email" />
        <BooleanField source="notification_sms" label="Notifications SMS" />
        <DateField source="created_at" label="Inscrit le" showTime />
        <DateField source="updated_at" label="Mis à jour le" showTime />
      </SimpleShowLayout>
    </Show>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 📰  ACTUALITÉS
// ══════════════════════════════════════════════════════════════════════════════

function NewsArticleList() {
  return (
    <List sort={{ field: 'published_at', order: 'DESC' }} perPage={25} actions={<ListActions />}
      filters={[
        <SelectInput key="status" source="status" label="Statut" alwaysOn
          choices={['draft','published','archived'].map(s => ({ id: s, name: s }))} />,
        <SelectInput key="cat" source="category" label="Catégorie"
          choices={['corporate','community','operations','environment','careers','partnership','safety']
            .map(s => ({ id: s, name: s }))} />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ThumbnailField source="cover_image_url" />
        <TextField source="title_fr" label="Titre (FR)" />
        <TextField source="category" label="Catégorie" />
        <TextField source="author" label="Auteur" />
        <DateField source="published_at" label="Publié le" />
        <StatusField source="status" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function NewsArticleEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier l'article">
      <SimpleForm>
        <SupabaseImageInput source="cover_image_url" label="Image de couverture" folder="news" />
        <TextInput source="title_fr" label="Titre (FR)" fullWidth required />
        <TextInput source="title_en" label="Titre (EN)" fullWidth />
        <TextInput source="excerpt_fr" label="Extrait / Résumé (FR)" fullWidth multiline rows={2} />
        <TextInput source="excerpt_en" label="Extrait (EN)" fullWidth multiline rows={2} />
        <TextInput source="body_fr" label="Contenu complet (FR)" fullWidth multiline rows={12} />
        <TextInput source="body_en" label="Contenu (EN)" fullWidth multiline rows={12} />
        <SelectInput source="category" label="Catégorie"
          choices={['corporate','community','operations','environment','careers','partnership','safety']
            .map(s => ({ id: s, name: s }))} />
        <TextInput source="author" label="Auteur" />
        <DateTimeInput source="published_at" label="Date de publication" />
        <SelectInput source="status" label="Statut de publication"
          choices={[
            { id: 'draft',     name: '📝 Brouillon' },
            { id: 'published', name: '✅ Publié' },
            { id: 'archived',  name: '📦 Archivé' },
          ]} />
      </SimpleForm>
    </Edit>
  );
}

function NewsArticleCreate() {
  return (
    <Create title="Nouvel article">
      <SimpleForm>
        <SupabaseImageInput source="cover_image_url" label="Image de couverture" folder="news" />
        <TextInput source="slug" label="Slug URL (ex: inauguration-terminal-2026)" required fullWidth />
        <TextInput source="title_fr" label="Titre (FR)" fullWidth required />
        <TextInput source="title_en" label="Titre (EN)" fullWidth />
        <TextInput source="excerpt_fr" label="Extrait / Résumé (FR)" fullWidth multiline rows={2} />
        <TextInput source="body_fr" label="Contenu complet (FR)" fullWidth multiline rows={12} />
        <SelectInput source="category" label="Catégorie" required
          choices={['corporate','community','operations','environment','careers','partnership','safety']
            .map(s => ({ id: s, name: s }))} />
        <TextInput source="author" label="Auteur" />
        <DateTimeInput source="published_at" label="Date de publication" />
        <SelectInput source="status" label="Statut" defaultValue="draft"
          choices={[
            { id: 'draft',     name: '📝 Brouillon' },
            { id: 'published', name: '✅ Publié' },
            { id: 'archived',  name: '📦 Archivé' },
          ]} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 💼  OFFRES D'EMPLOI
// ══════════════════════════════════════════════════════════════════════════════

function JobPostingList() {
  return (
    <List sort={{ field: 'posted_at', order: 'DESC' }} perPage={25} actions={<ListActions />}
      filters={[
        <BooleanInput key="active" source="active" label="Actif seulement" alwaysOn />,
        <SelectInput key="contract" source="contract_type" label="Contrat"
          choices={['CDI','CDD','stage','freelance','consultant'].map(s => ({ id: s, name: s }))} />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="title" label="Poste" />
        <TextField source="department" label="Département" />
        <TextField source="contract_type" label="Contrat" />
        <DateField source="application_deadline" label="Clôture" />
        <BooleanField source="active" label="Actif" />
        <DateField source="posted_at" label="Publié le" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function JobPostingEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier l'offre">
      <SimpleForm>
        <TextInput source="title" label="Intitulé du poste" fullWidth required />
        <TextInput source="department" label="Département" required />
        <SelectInput source="contract_type" label="Type de contrat"
          choices={['CDI','CDD','stage','freelance','consultant'].map(s => ({ id: s, name: s }))} />
        <SelectInput source="experience_level" label="Niveau d'expérience"
          choices={['junior','mid','senior','manager','executive'].map(s => ({ id: s, name: s }))} />
        <TextInput source="description_fr" label="Description du poste (FR)" fullWidth multiline rows={6} />
        <TextInput source="requirements_fr" label="Profil recherché / Exigences (FR)" fullWidth multiline rows={4} />
        <TextInput source="benefits_fr" label="Avantages (FR)" fullWidth multiline rows={3} />
        <TextInput source="salary_range" label="Fourchette salariale (ex: 800-1200 USD)" />
        <DateTimeInput source="application_deadline" label="Date limite de candidature" />
        <TextInput source="apply_url" label="Lien de candidature (URL)" fullWidth />
        <BooleanInput source="active" label="Poste actif (visible sur le site)" />
      </SimpleForm>
    </Edit>
  );
}

function JobPostingCreate() {
  return (
    <Create title="Nouvelle offre d'emploi">
      <SimpleForm>
        <TextInput source="title" label="Intitulé du poste" fullWidth required />
        <TextInput source="department" label="Département" required />
        <SelectInput source="contract_type" label="Type de contrat" required
          choices={['CDI','CDD','stage','freelance','consultant'].map(s => ({ id: s, name: s }))} />
        <SelectInput source="experience_level" label="Niveau d'expérience"
          choices={['junior','mid','senior','manager','executive'].map(s => ({ id: s, name: s }))} />
        <TextInput source="description_fr" label="Description du poste (FR)" fullWidth multiline rows={6} />
        <TextInput source="requirements_fr" label="Profil recherché (FR)" fullWidth multiline rows={4} />
        <TextInput source="benefits_fr" label="Avantages (FR)" fullWidth multiline rows={3} />
        <TextInput source="salary_range" label="Fourchette salariale" />
        <DateTimeInput source="application_deadline" label="Date limite de candidature" />
        <TextInput source="apply_url" label="Lien de candidature (URL)" fullWidth />
        <BooleanInput source="active" label="Poste actif" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🔔  ALERTES WHATSAPP (lecture seule)
// ══════════════════════════════════════════════════════════════════════════════

function FlightAlertList() {
  return (
    <List sort={{ field: 'created_at', order: 'DESC' }} perPage={25}
      actions={<TopToolbar><FilterButton /><ExportButton label="Exporter" /></TopToolbar>}
      filters={[<BooleanInput key="active" source="active" label="Active seulement" alwaysOn />]}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="user_id" label="Utilisateur (ID)" />
        <TextField source="flight_number" label="Numéro de vol" />
        <BooleanField source="active" label="Active" />
        <DateField source="created_at" label="Créée le" />
      </Datagrid>
    </List>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🏢  COMPAGNIES AÉRIENNES
// ══════════════════════════════════════════════════════════════════════════════

function AirlineList() {
  return (
    <List sort={{ field: 'name', order: 'ASC' }} perPage={50} actions={<ListActions />}
      filters={[
        <BooleanInput key="active" source="active" label="Active" alwaysOn />,
        <BooleanInput key="hub" source="hub_at_fih" label="Hub FIH" />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ThumbnailField source="logo_url" />
        <TextField source="iata_code" label="IATA" />
        <TextField source="name" label="Compagnie" />
        <BooleanField source="hub_at_fih" label="Hub FIH" />
        <TextField source="alliance" label="Alliance" />
        <BooleanField source="active" label="Active" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function AirlineEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier la compagnie">
      <SimpleForm>
        <SupabaseImageInput source="logo_url" label="Logo de la compagnie" folder="airlines" />
        <TextInput source="iata_code" label="Code IATA (ex: SN, ET, AF)" required />
        <TextInput source="icao_code" label="Code ICAO (ex: DAH)" />
        <TextInput source="name" label="Nom de la compagnie" fullWidth required />
        <TextInput source="slug" label="Slug URL (ex: brussels-airlines)" required />
        <TextInput source="website" label="Site web officiel" fullWidth />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="description_en" label="Description (EN)" fullWidth multiline rows={4} />
        <TextInput source="checkin_counter" label="Comptoir d'enregistrement (ex: A1-A4)" />
        <TextInput source="lounge_name" label="Salon VIP associé" />
        <TextInput source="alliance" label="Alliance (Star Alliance, OneWorld...)" />
        <BooleanInput source="hub_at_fih" label="Basée à FIH (Hub)" />
        <BooleanInput source="active" label="Active (visible sur le site)" />
      </SimpleForm>
    </Edit>
  );
}

function AirlineCreate() {
  return (
    <Create title="Ajouter une compagnie">
      <SimpleForm>
        <SupabaseImageInput source="logo_url" label="Logo de la compagnie" folder="airlines" />
        <TextInput source="iata_code" label="Code IATA" required />
        <TextInput source="icao_code" label="Code ICAO" />
        <TextInput source="name" label="Nom de la compagnie" fullWidth required />
        <TextInput source="slug" label="Slug URL" required />
        <TextInput source="website" label="Site web" fullWidth />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="checkin_counter" label="Comptoir d'enregistrement" />
        <BooleanInput source="hub_at_fih" label="Hub à FIH" />
        <BooleanInput source="active" label="Active" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🛒  BOUTIQUES & RESTAURANTS (Concessions)
// ══════════════════════════════════════════════════════════════════════════════

const CONCESSION_CATEGORIES = [
  { id: 'restaurant',  name: '🍽️ Restaurant' },
  { id: 'boutique',    name: '🛍️ Boutique' },
  { id: 'bar',         name: '🍺 Bar' },
  { id: 'cafe',        name: '☕ Café' },
  { id: 'duty_free',   name: '🛫 Duty Free' },
  { id: 'lounge',      name: '🛋️ Salon' },
  { id: 'exchange',    name: '💱 Bureau de change' },
  { id: 'bank',        name: '🏦 Banque / ATM' },
  { id: 'medical',     name: '🏥 Médical' },
  { id: 'pharmacy',    name: '💊 Pharmacie' },
  { id: 'telecom',     name: '📱 Télécom' },
  { id: 'transport',   name: '🚌 Transport' },
  { id: 'other',       name: '📦 Autre' },
];

function ConcessionList() {
  return (
    <List sort={{ field: 'name', order: 'ASC' }} perPage={50} actions={<ListActions />}
      filters={[
        <SelectInput key="cat" source="category" label="Catégorie" alwaysOn choices={CONCESSION_CATEGORIES} />,
        <BooleanInput key="active" source="active" label="Active" alwaysOn />,
        <SelectInput key="terminal" source="terminal" label="Terminal"
          choices={[
            { id: 'international', name: 'International' },
            { id: 'domestic', name: 'Domestique' },
            { id: 'both', name: 'Les deux' },
          ]} />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ThumbnailField source="cover_image_url" />
        <TextField source="name" label="Nom" />
        <TextField source="category" label="Catégorie" />
        <TextField source="terminal" label="Terminal" />
        <TextField source="zone" label="Zone" />
        <BooleanField source="active" label="Active" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function ConcessionEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier la concession">
      <SimpleForm>
        <SupabaseImageInput source="cover_image_url" label="Image principale" folder="concessions" />
        <SupabaseImageInput source="logo_url" label="Logo" folder="concessions/logos" />
        <TextInput source="name" label="Nom de l'établissement" fullWidth required />
        <TextInput source="slug" label="Slug URL" required />
        <SelectInput source="category" label="Catégorie" choices={CONCESSION_CATEGORIES} required />
        <SelectInput source="terminal" label="Terminal"
          choices={[
            { id: 'international', name: 'International' },
            { id: 'domestic', name: 'Domestique' },
            { id: 'both', name: 'Les deux' },
          ]} />
        <SelectInput source="zone" label="Zone (avant/après sécurité)"
          choices={[
            { id: 'before_security', name: 'Avant la sécurité' },
            { id: 'after_security',  name: 'Après la sécurité' },
            { id: 'arrivals',        name: 'Zone arrivées' },
            { id: 'both',            name: 'Toutes zones' },
          ]} />
        <TextInput source="level" label="Niveau / Étage" />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="description_en" label="Description (EN)" fullWidth multiline rows={4} />
        <TextInput source="phone" label="Téléphone" />
        <TextInput source="email" label="Email" />
        <BooleanInput source="active" label="Active (visible sur le site)" />
      </SimpleForm>
    </Edit>
  );
}

function ConcessionCreate() {
  return (
    <Create title="Ajouter une boutique / restaurant / service">
      <SimpleForm>
        <SupabaseImageInput source="cover_image_url" label="Image principale" folder="concessions" />
        <SupabaseImageInput source="logo_url" label="Logo" folder="concessions/logos" />
        <TextInput source="name" label="Nom de l'établissement" fullWidth required />
        <TextInput source="slug" label="Slug URL (ex: chez-tante-restaurant)" required />
        <SelectInput source="category" label="Catégorie" choices={CONCESSION_CATEGORIES} required />
        <SelectInput source="terminal" label="Terminal"
          choices={[
            { id: 'international', name: 'International' },
            { id: 'domestic', name: 'Domestique' },
            { id: 'both', name: 'Les deux' },
          ]} />
        <SelectInput source="zone" label="Zone (avant/après sécurité)"
          choices={[
            { id: 'before_security', name: 'Avant la sécurité' },
            { id: 'after_security',  name: 'Après la sécurité' },
            { id: 'arrivals',        name: 'Zone arrivées' },
            { id: 'both',            name: 'Toutes zones' },
          ]} />
        <TextInput source="level" label="Niveau / Étage" />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="phone" label="Téléphone" />
        <TextInput source="email" label="Email" />
        <BooleanInput source="active" label="Active" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🛋️  SALONS VIP (Lounges)
// ══════════════════════════════════════════════════════════════════════════════

function LoungeList() {
  return (
    <List sort={{ field: 'name', order: 'ASC' }} perPage={25} actions={<ListActions />}
      filters={[<BooleanInput key="active" source="active" label="Actif" alwaysOn />]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ThumbnailField source="image_url" />
        <TextField source="name" label="Nom du salon" />
        <TextField source="operator" label="Opérateur" />
        <TextField source="terminal" label="Terminal" />
        <NumberField source="access_fee_usd" label="Accès (USD)" />
        <BooleanField source="active" label="Actif" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function LoungeEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier le salon VIP">
      <SimpleForm>
        <SupabaseImageInput source="image_url" label="Photo du salon" folder="lounges" />
        <TextInput source="name" label="Nom du salon" fullWidth required />
        <TextInput source="slug" label="Slug URL" required />
        <TextInput source="operator" label="Opérateur (ex: Brussels Airlines, Pearl Lounge)" />
        <SelectInput source="terminal" label="Terminal"
          choices={[{ id: 'international', name: 'International' }, { id: 'domestic', name: 'Domestique' }]} />
        <TextInput source="location" label="Localisation (ex: Porte B12)" />
        <TextInput source="level" label="Niveau / Étage" />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="description_en" label="Description (EN)" fullWidth multiline rows={4} />
        <TextInput source="access_conditions" label="Conditions d'accès" fullWidth multiline rows={3} />
        <NumberInput source="access_fee_usd" label="Frais d'accès (USD) — 0 si gratuit" />
        <NumberInput source="capacity" label="Capacité (nombre de places)" />
        <BooleanInput source="active" label="Actif (visible sur le site)" />
      </SimpleForm>
    </Edit>
  );
}

function LoungeCreate() {
  return (
    <Create title="Ajouter un salon VIP">
      <SimpleForm>
        <SupabaseImageInput source="image_url" label="Photo du salon" folder="lounges" />
        <TextInput source="name" label="Nom du salon" fullWidth required />
        <TextInput source="slug" label="Slug URL (ex: pearl-lounge)" required />
        <TextInput source="operator" label="Opérateur" />
        <SelectInput source="terminal" label="Terminal"
          choices={[{ id: 'international', name: 'International' }, { id: 'domestic', name: 'Domestique' }]} />
        <TextInput source="location" label="Localisation" />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={4} />
        <TextInput source="access_conditions" label="Conditions d'accès" fullWidth multiline rows={3} />
        <NumberInput source="access_fee_usd" label="Frais d'accès (USD)" defaultValue={0} />
        <NumberInput source="capacity" label="Capacité" />
        <BooleanInput source="active" label="Actif" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🔊  PLAINTES BRUIT
// ══════════════════════════════════════════════════════════════════════════════

function NoiseComplaintList() {
  return (
    <List sort={{ field: 'created_at', order: 'DESC' }} perPage={25}
      actions={<TopToolbar><FilterButton /><ExportButton label="Exporter" /></TopToolbar>}
      filters={[
        <SelectInput key="status" source="status" label="Statut" alwaysOn
          choices={['received','in_review','responded','closed'].map(s => ({ id: s, name: s }))} />,
        <SelectInput key="commune" source="commune" label="Commune"
          choices={['Nsele','Masina','Kimbanseke','N_djili','Limete','other'].map(s => ({ id: s, name: s }))} />,
      ]}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="full_name" label="Nom" />
        <TextField source="commune" label="Commune" />
        <DateField source="incident_date" label="Date incident" />
        <StatusField source="status" />
        <DateField source="created_at" label="Reçue le" />
        <EditButton label="Répondre" />
      </Datagrid>
    </List>
  );
}

function NoiseComplaintEdit() {
  return (
    <Edit title="Traiter la plainte">
      <SimpleForm>
        <TextInput source="full_name" label="Nom du plaignant" disabled />
        <TextInput source="commune" label="Commune" disabled />
        <TextInput source="description" label="Description de la plainte" fullWidth multiline rows={4} disabled />
        <SelectInput source="status" label="Changer le statut" required
          choices={[
            { id: 'received',   name: '📨 Reçue' },
            { id: 'in_review',  name: '🔍 En cours d\'examen' },
            { id: 'responded',  name: '✅ Réponse envoyée' },
            { id: 'closed',     name: '🔒 Clôturée' },
          ]} />
        <TextInput source="response" label="Réponse officielle RVA" fullWidth multiline rows={6}
          helperText="Cette réponse sera visible par le plaignant" />
      </SimpleForm>
    </Edit>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 🅿️  GESTION PARKINGS
// ══════════════════════════════════════════════════════════════════════════════

function ParkingLotList() {
  return (
    <List sort={{ field: 'code', order: 'ASC' }}
      actions={<TopToolbar><CreateButton label="Ajouter" /><ExportButton label="Exporter" /></TopToolbar>}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <ThumbnailField source="image_url" />
        <TextField source="code" label="Code" />
        <TextField source="name" label="Nom" />
        <NumberField source="total_spots" label="Capacité" />
        <NumberField source="available_spots" label="Dispo." />
        <NumberField source="daily_rate_usd" label="Tarif/jour USD" />
        <BooleanField source="ev_charging" label="EV" />
        <BooleanField source="shuttle_available" label="Navette" />
        <BooleanField source="active" label="Actif" />
        <EditButton label="" />
      </Datagrid>
    </List>
  );
}

function ParkingLotEdit() {
  return (
    <Edit actions={<EditActions />} title="Modifier le parking">
      <SimpleForm>
        <SupabaseImageInput source="image_url" label="Photo du parking" folder="parking" />
        <TextInput source="code" label="Code (P1, P2…)" required />
        <TextInput source="name" label="Nom du parking" fullWidth required />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={3} />
        <NumberInput source="total_spots" label="Capacité totale" />
        <NumberInput source="available_spots" label="Places disponibles en ce moment" />
        <NumberInput source="hourly_rate_usd" label="Tarif horaire (USD)" />
        <NumberInput source="daily_rate_usd" label="Tarif journalier (USD)" />
        <NumberInput source="weekly_rate_usd" label="Tarif hebdomadaire (USD)" />
        <TextInput source="distance_terminal" label="Distance terminal (ex: 200m)" />
        <BooleanInput source="shuttle_available" label="Navette disponible" />
        <BooleanInput source="ev_charging" label="Recharge électrique" />
        <BooleanInput source="covered" label="Parking couvert" />
        <NumberInput source="pmr_spots" label="Places PMR" />
        <SelectInput source="security_level" label="Niveau de sécurité"
          choices={[
            { id: 'standard', name: 'Standard' },
            { id: 'premium',  name: 'Premium' },
            { id: 'cctv_24h', name: 'CCTV 24h/24' },
          ]} />
        <BooleanInput source="active" label="Actif (visible sur le site)" />
      </SimpleForm>
    </Edit>
  );
}

function ParkingLotCreate() {
  return (
    <Create title="Ajouter un parking">
      <SimpleForm>
        <SupabaseImageInput source="image_url" label="Photo du parking" folder="parking" />
        <TextInput source="code" label="Code (P1, P2…)" required />
        <TextInput source="name" label="Nom du parking" fullWidth required />
        <TextInput source="description_fr" label="Description (FR)" fullWidth multiline rows={3} />
        <NumberInput source="total_spots" label="Capacité totale" required />
        <NumberInput source="daily_rate_usd" label="Tarif journalier (USD)" />
        <NumberInput source="hourly_rate_usd" label="Tarif horaire (USD)" />
        <TextInput source="distance_terminal" label="Distance terminal" />
        <BooleanInput source="shuttle_available" label="Navette disponible" />
        <BooleanInput source="ev_charging" label="Recharge électrique" />
        <BooleanInput source="covered" label="Couvert" />
        <NumberInput source="pmr_spots" label="Places PMR" defaultValue={0} />
        <SelectInput source="security_level" label="Niveau de sécurité" defaultValue="cctv_24h"
          choices={[
            { id: 'standard', name: 'Standard' },
            { id: 'premium',  name: 'Premium' },
            { id: 'cctv_24h', name: 'CCTV 24h/24' },
          ]} />
        <BooleanInput source="active" label="Actif" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════

export default function App() {
  return (
    <Admin
      title="FIH · Backoffice RVA"
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={CustomLayout}
      theme={rvaTheme}
      dashboard={Dashboard}
      requireAuth
    >
      <Resource name="flights"              list={FlightList}        edit={FlightEdit}        create={FlightCreate}        icon={Flight}              options={{ label: 'Vols' }} />
      <Resource name="parking_reservations" list={ReservationList}   show={ReservationShow}                                icon={LocalParking}        options={{ label: 'Réservations parking' }} />
      <Resource name="profiles"             list={ProfileList}       show={ProfileShow}                                    icon={People}              options={{ label: 'Utilisateurs' }} />
      <Resource name="news_articles"        list={NewsArticleList}   edit={NewsArticleEdit}   create={NewsArticleCreate}   icon={Article}             options={{ label: 'Actualités' }} />
      <Resource name="job_postings"         list={JobPostingList}    edit={JobPostingEdit}    create={JobPostingCreate}    icon={Work}                options={{ label: "Offres d'emploi" }} />
      <Resource name="flight_alerts"        list={FlightAlertList}                                                          icon={NotificationsActive} options={{ label: 'Alertes WhatsApp' }} />
      <Resource name="airlines"             list={AirlineList}       edit={AirlineEdit}       create={AirlineCreate}       icon={AirlineStops}        options={{ label: 'Compagnies aériennes' }} />
      <Resource name="concessions"          list={ConcessionList}    edit={ConcessionEdit}    create={ConcessionCreate}    icon={Store}               options={{ label: 'Boutiques & Restaurants' }} />
      <Resource name="lounges"              list={LoungeList}        edit={LoungeEdit}        create={LoungeCreate}        icon={MeetingRoom}         options={{ label: 'Salons VIP' }} />
      <Resource name="noise_complaints"     list={NoiseComplaintList} edit={NoiseComplaintEdit}                            icon={VolumeUp}            options={{ label: 'Plaintes bruit' }} />
      <Resource name="parking_lots"         list={ParkingLotList}    edit={ParkingLotEdit}    create={ParkingLotCreate}    icon={LocalParking}        options={{ label: 'Parkings' }} />
    </Admin>
  );
}
