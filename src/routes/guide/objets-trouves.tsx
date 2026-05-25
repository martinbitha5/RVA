import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PackageSearch, Phone, Mail, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/guide/objets-trouves')({
  component: ObjetsTrouvesPage,
  head: () => ({ meta: [{ title: "Objets trouvés — Aéroport N'djili · FIH" }] }),
});

const CATEGORIES = [
  'Téléphones portables', 'Ordinateurs / tablettes', 'Documents (passeport, visa)',
  'Bagages / sacs', 'Lunettes / bijoux', 'Vêtements', 'Jouets / peluches', 'Autres',
];

const STEPS = [
  'Vérifiez d\'abord auprès de votre compagnie aérienne (objet laissé dans l\'avion)',
  'Signalez la perte au bureau des objets trouvés du terminal concerné',
  'Remplissez le formulaire de déclaration avec description précise et coordonnées',
  'Conservez votre récépissé de déclaration — référence pour tout suivi',
  'Si retrouvé, FIH vous contacte par téléphone ou email dans les 72h',
];

function ObjetsTrouvesPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-rdc-blue">{t('guide.title')}</p>
      <h1 className="font-display mt-1 text-3xl font-bold text-rdc-anthracite md:text-4xl mb-3">{t('guide.lostFound')}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{t('guide.lostFoundSubtitle')}</p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Info */}
        <div>
          {/* Contact */}
          <h2 className="font-display mb-4 text-lg font-bold text-rdc-anthracite">Bureau des objets trouvés</h2>
          <div className="mb-6 rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-start gap-3">
              <PackageSearch size={16} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
              <div className="text-sm">
                <p className="font-medium text-rdc-anthracite">Terminal International</p>
                <p className="text-muted-foreground text-xs">Niveau 0 — Adjacent au bureau de l'information voyageurs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PackageSearch size={16} className="mt-0.5 flex-shrink-0 text-rdc-blue" />
              <div className="text-sm">
                <p className="font-medium text-rdc-anthracite">Terminal Domestique</p>
                <p className="text-muted-foreground text-xs">Hall principal — Guichet information</p>
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Clock size={11} /> Lun–Ven : 07h00–20h00 · Sam–Dim : 08h00–18h00</p>
              <a href="tel:+243810000000" className="flex items-center gap-2 text-rdc-blue hover:underline">
                <Phone size={11} /> +243 81 XXX XXXX
              </a>
              <a href="mailto:lostnfound@fih-rva.com" className="flex items-center gap-2 text-rdc-blue hover:underline">
                <Mail size={11} /> lostnfound@fih-rva.com
              </a>
            </div>
          </div>

          {/* Steps */}
          <h2 className="font-display mb-3 text-lg font-bold text-rdc-anthracite">Procédure à suivre</h2>
          <ul className="space-y-2.5">
            {STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rdc-blue text-[10px] font-bold text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Declare form */}
        <div>
          <h2 className="font-display mb-4 text-lg font-bold text-rdc-anthracite">Déclarer un objet perdu</h2>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-rdc-green/30 bg-rdc-green/5 p-8 text-center">
              <CheckCircle size={32} className="text-rdc-green" />
              <p className="font-semibold text-rdc-anthracite">{t('guide.lostFoundSuccess')}</p>
              <p className="text-sm text-muted-foreground">{t('guide.lostFoundSuccessDesc')}</p>
              <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">Nouvelle déclaration</Button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundName')}</label>
                  <Input required placeholder="Jean Mukendi" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundPhone')}</label>
                  <Input required type="tel" placeholder="+243 81 XXX XXXX" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundEmail')}</label>
                <Input type="email" placeholder="jean@exemple.com" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundCategory')}</label>
                <select required className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option value="">Sélectionner une catégorie</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundDescription')}</label>
                <textarea required rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none"
                  placeholder="Décrivez l'objet (couleur, marque, contenu, date/lieu de perte...)" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">{t('guide.lostFoundLocation')}</label>
                <Input placeholder="Ex: Terminal International, Zone embarquement" />
              </div>
              <Button type="submit" className="w-full bg-rdc-blue hover:bg-rdc-blue/85 text-white">
                <PackageSearch size={14} className="mr-2" /> Envoyer la déclaration
              </Button>
            </form>
          )}

          <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
            <AlertTriangle size={11} className="mt-0.5 flex-shrink-0 text-amber-500" />
            {t('guide.lostFoundNote')}
          </div>
        </div>
      </div>
    </div>
  );
}
