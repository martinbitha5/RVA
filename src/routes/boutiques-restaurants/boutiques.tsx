import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, MapPin, Clock, Tag } from 'lucide-react';

export const Route = createFileRoute('/boutiques-restaurants/boutiques')({
  component: BoutiquesPage,
  head: () => ({ meta: [{ title: "Boutiques — Aéroport N'djili · FIH" }] }),
});

const BOUTIQUES = [
  {
    name: 'Artisanat du Congo',
    type: 'Artisanat & Souvenirs',
    terminal: 'International',
    zone: 'after',
    hours: '07:00–21:00',
    tags: ['Masques', 'Sculptures Mbongo', 'Tissus Kanga', 'Bijoux'],
    highlight: true,
    description: 'La plus grande sélection d\'artisanat congolais authentique. Sculptures, masques cérémoniels, tissus imprimés et bijoux faits main.',
  },
  {
    name: 'Makeba Souvenirs',
    type: 'Souvenirs',
    terminal: 'International',
    zone: 'before',
    hours: '08:00–20:00',
    tags: ['T-shirts', 'Cartes postales', 'Magnets', 'Livres'],
    highlight: false,
    description: 'Souvenirs de Kinshasa et de la RDC : vêtements, objets décoratifs, cartes postales et ouvrages sur le Congo.',
  },
  {
    name: 'Kiosque Presse FIH',
    type: 'Presse & Librairie',
    terminal: 'Domestique',
    zone: 'before',
    hours: '05:30–21:00',
    tags: ['Journaux', 'Magazines', 'Livres', 'Snacks'],
    highlight: false,
    description: 'Journaux nationaux (Le Phare, Potentiel, Forum des As) et internationaux, magazines, livres et petite épicerie.',
  },
  {
    name: 'Congo Arts & Crafts',
    type: 'Art contemporain',
    terminal: 'International',
    zone: 'after',
    hours: '08:00–22:00',
    tags: ['Peintures', 'Chéri Samba', 'Moke', 'Jeunes artistes'],
    highlight: true,
    description: 'Galerie boutique présentant des reproductions d\'artistes congolais de renom et des œuvres originales de jeunes talents.',
  },
  {
    name: 'Pharmacie FIH',
    type: 'Pharmacie & Santé',
    terminal: 'International',
    zone: 'before',
    hours: '24h/24',
    tags: ['Médicaments', 'Anti-paludéens', 'Vaccins voyage', 'Hygiène'],
    highlight: false,
    description: 'Pharmacie agréée proposant médicaments courants, antipaludéens, produits d\'hygiène et conseils santé-voyage.',
  },
];

function BoutiquesPage() {
  const { t } = useTranslation();
  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('shops.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('shops.shops')}</h1>
      <p className="mb-10 max-w-xl text-sm text-muted-foreground">{t('shops.shopsSubtitle')}</p>

      <div className="grid gap-5 lg:grid-cols-2">
        {BOUTIQUES.map(b => (
          <div key={b.name} className={`rounded-2xl border bg-card overflow-hidden ${b.highlight ? 'border-rdc-yellow/40 shadow-md' : 'border-border'}`}>
            {b.highlight && <div className="h-1 bg-rdc-yellow" />}
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${b.highlight ? 'bg-rdc-yellow/20' : 'bg-rdc-blue/10'}`}>
                  <ShoppingBag size={18} className={b.highlight ? 'text-rdc-anthracite' : 'text-rdc-blue'} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-rdc-anthracite">{b.name}</p>
                    {b.highlight && <span className="rounded-full bg-rdc-yellow px-2 py-0.5 text-[10px] font-bold text-rdc-anthracite">Sélection FIH</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{b.type}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3">{b.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {b.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Tag size={8} /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={10} /> {b.terminal}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {b.hours}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${b.zone === 'after' ? 'bg-rdc-green/10 text-rdc-green' : 'bg-muted text-muted-foreground'}`}>
                  {b.zone === 'after' ? t('shops.afterSecurity') : t('shops.beforeSecurity')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
