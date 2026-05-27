import { createFileRoute, Link } from '@tanstack/react-router';
import {
  PlaneTakeoff, PlaneLanding, Clock, MapPin,
  AlertTriangle, CheckCircle, Car, ArrowRight, ShieldCheck,
} from 'lucide-react';

export const Route = createFileRoute('/stationnement-transport/depose-recuperation')({
  component: DeposeRecuperationPage,
  head: () => ({
    meta: [
      { title: "Dépose & Récupération — Aéroport N'djili · FIH" },
      { name: 'description', content: "Zones de dépose-minute et de récupération des passagers à l'Aéroport International de N'djili (FIH). Instructions et règles." },
    ],
  }),
});

function DeposeRecuperationPage() {
  return (
    <main id="main-content">

      {/* Hero */}
      <div className="relative select-none">
        <img
          src="/images/fih-hero-1.jpg"
          alt="Zone de dépose à l'Aéroport de N'djili"
          className="h-64 sm:h-80 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">Stationnement & Transport</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">Dépose & Récupération</h1>
        </div>
        <div className="absolute bottom-0 left-0">
          <span className="inline-block bg-[#003DA5] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Gratuit · Règles à respecter
          </span>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="bg-white border-b border-[#e8e8e8]">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid grid-cols-3 divide-x divide-[#e8e8e8]">
            {[
              { valeur: '15 min', label: 'Durée max. dépose', couleur: 'text-[#003DA5]' },
              { valeur: '30 min', label: 'Durée max. récupération', couleur: 'text-[#009A44]' },
              { valeur: '3 voies', label: 'Voies dépose-minute', couleur: 'text-[#003DA5]' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-6 text-center">
                <span className={`text-2xl sm:text-3xl font-bold ${s.couleur}`}>{s.valeur}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#888]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12 space-y-14">

        {/* Note trafic Boulevard Lumumba */}
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 p-5">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 mb-1">Embouteillages Boulevard Lumumba — prévoyez large</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Le Boulevard Lumumba, seule route d'accès à FIH, est régulièrement saturé aux heures de pointe
              (7h–10h et 16h–20h). Pour un départ matinal ou un vol en soirée, anticipez et partez
              <strong> 30 à 60 minutes supplémentaires</strong> pour ne pas manquer votre vol.
              Consultez la <Link to={'/stationnement-transport/boulevard-lumumba' as never} className="text-amber-800 underline font-semibold">page trafic Boulevard Lumumba</Link>.
            </p>
          </div>
        </div>

        {/* Zone dépose-minute */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Départs</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Zone de Dépose-Minute</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {/* Étapes */}
              {[
                { num: '01', titre: 'Rejoignez la zone de dépose', desc: 'Depuis le Boulevard Lumumba, suivez la signalisation "Départs" puis "Dépose-Minute". La zone se trouve directement devant l\'entrée principale du Terminal International, Niveau 0.' },
                { num: '02', titre: 'Déposez vos passagers', desc: 'Arrêtez-vous dans l\'une des 3 voies dédiées. Aidez vos passagers à descendre et à récupérer leurs bagages. Durée maximale autorisée : 15 minutes.' },
                { num: '03', titre: 'Quittez immédiatement', desc: 'Ne stationnez pas dans la zone dépose-minute. Des agents RVA sont présents pour faire circuler les véhicules. Un dépassement de durée entraîne une amende immédiate.' },
              ].map((e) => (
                <div key={e.num} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5] text-white font-bold text-sm">{e.num}</div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1a1a] mb-1">{e.titre}</p>
                    <p className="text-xs text-[#666] leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}

              {/* Alerte amende */}
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                <AlertTriangle size={14} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 leading-relaxed">
                  <strong>Attention :</strong> Tout véhicule stationné au-delà de 15 minutes dans la zone dépose-minute
                  est passible d'une amende de <strong>20 USD</strong>, et peut être immédiatement mis en fourrière.
                  Les agents RVA patrouillent en permanence.
                </p>
              </div>
            </div>

            {/* Info pratique */}
            <div className="border border-[#e8e8e8] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <PlaneTakeoff size={18} className="text-[#003DA5]" />
                <h3 className="font-bold text-[#1a1a1a]">Zone Dépose-Minute</h3>
              </div>
              <div className="space-y-3 text-sm text-[#555]">
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="flex-shrink-0 text-[#003DA5] mt-0.5" />
                  Devant l'entrée principale — Terminal International, Niveau 0
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock size={14} className="flex-shrink-0 text-[#003DA5]" />
                  15 minutes maximum autorisées — Gratuit
                </p>
                <p className="flex items-center gap-2.5">
                  <Car size={14} className="flex-shrink-0 text-[#003DA5]" />
                  3 voies de dépose disponibles en simultané
                </p>
                <p className="flex items-center gap-2.5">
                  <ShieldCheck size={14} className="flex-shrink-0 text-[#009A44]" />
                  Agents RVA présents 24h/24
                </p>
              </div>
              <div className="mt-5 pt-5 border-t border-[#f0f0f0]">
                <p className="text-xs font-bold text-[#1a1a1a] mb-2">Bagages volumineux ?</p>
                <p className="text-xs text-[#666] leading-relaxed">
                  Si vous avez besoin de plus de temps pour charger des bagages encombrants, utilisez le
                  <strong> Parking P1 Court Séjour</strong> à 200 m du terminal (2 $/h).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zone récupération */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#009A44] mb-2">Arrivées</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Zone de Récupération des Passagers</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Info pratique */}
            <div className="border border-[#e8e8e8] bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <PlaneLanding size={18} className="text-[#009A44]" />
                <h3 className="font-bold text-[#1a1a1a]">Zone de Récupération</h3>
              </div>
              <div className="space-y-3 text-sm text-[#555]">
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="flex-shrink-0 text-[#009A44] mt-0.5" />
                  Côté arrivées — Sortie Hall Arrivées, Niveau 0 (côté gauche en sortant)
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock size={14} className="flex-shrink-0 text-[#009A44]" />
                  30 minutes maximum autorisées — Gratuit
                </p>
                <p className="flex items-center gap-2.5">
                  <Car size={14} className="flex-shrink-0 text-[#009A44]" />
                  4 voies de récupération disponibles
                </p>
              </div>
              <div className="mt-5 pt-5 border-t border-[#f0f0f0]">
                <p className="text-xs text-[#666] leading-relaxed">
                  <strong>Conseil :</strong> Attendez que votre passager soit sorti du hall arrivées avant de vous
                  avancer dans la zone. Suivez l'arrivée de son vol en temps réel sur{' '}
                  <Link to={'/vols/arrivees' as never} className="text-[#003DA5] font-semibold hover:underline">
                    le tableau des arrivées
                  </Link>.
                </p>
              </div>
            </div>

            {/* Étapes */}
            <div className="space-y-6">
              {[
                { num: '01', titre: 'Suivez le vol en temps réel', desc: 'Avant de partir de chez vous, consultez le tableau des arrivées FIH pour vérifier que le vol est bien atterri. Évitez d\'attendre inutilement dans la zone.', couleur: 'bg-[#009A44]' },
                { num: '02', titre: 'Rejoignez la zone récupération', desc: 'Depuis le Boulevard Lumumba, suivez "Arrivées" puis "Récupération passagers". Stationnez dans l\'une des 4 voies côté gauche de la sortie du hall arrivées.', couleur: 'bg-[#009A44]' },
                { num: '03', titre: 'Récupérez votre passager', desc: 'Votre passager doit récupérer ses bagages (20–40 min après atterrissage), passer douanes et immigration. Soyez patient — comptez 45 à 90 minutes après l\'atterrissage.', couleur: 'bg-[#009A44]' },
              ].map((e) => (
                <div key={e.num} className="flex gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center ${e.couleur} text-white font-bold text-sm`}>{e.num}</div>
                  <div>
                    <p className="font-bold text-sm text-[#1a1a1a] mb-1">{e.titre}</p>
                    <p className="text-xs text-[#666] leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-3 bg-green-50 border border-green-200 p-4">
                <CheckCircle size={14} className="text-[#009A44] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-700 leading-relaxed">
                  <strong>Bon à savoir :</strong> Si vous devez attendre plus de 30 minutes, garez-vous au Parking P1
                  Court Séjour (2 $/h, 200 m). Vous y serez plus à l'aise qu'à bloquer une voie de récupération.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Règles */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-2">Réglementation</p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">Règles importantes à respecter</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: AlertTriangle, couleur: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', texte: 'Ne stationnez jamais dans la zone dépose-minute plus de 15 minutes. Une amende de 20 USD est appliquée immédiatement par les agents RVA.' },
              { icon: Car, couleur: 'text-[#003DA5]', bg: 'bg-blue-50 border-blue-200', texte: 'Le moteur doit rester allumé dans la zone de dépose. Ne quittez pas votre véhicule sans surveillance dans les zones de dépose et récupération.' },
              { icon: CheckCircle, couleur: 'text-[#009A44]', bg: 'bg-green-50 border-green-200', texte: 'Signalez immédiatement tout véhicule abandonné ou bagage suspect aux agents de sécurité RVA. La sûreté de FIH est une responsabilité partagée.' },
              { icon: ShieldCheck, couleur: 'text-[#003DA5]', bg: 'bg-blue-50 border-blue-200', texte: 'Respectez la signalisation routière et les instructions des agents de circulation. Le non-respect peut entraîner une immobilisation immédiate du véhicule.' },
            ].map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className={`flex items-start gap-4 border p-5 ${r.bg}`}>
                  <Icon size={18} className={`flex-shrink-0 mt-0.5 ${r.couleur}`} />
                  <p className="text-sm text-[#1a1a1a] leading-relaxed">{r.texte}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Liens connexes */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { to: '/stationnement-transport/taxis', icon: Car, label: 'Taxis officiels', desc: 'Taxis agréés RVA à la sortie arrivées' },
            { to: '/stationnement-transport/stationnement-fih', icon: Car, label: 'Parkings FIH', desc: 'P1, P2, P3 — tarifs et réservation' },
            { to: '/vols/arrivees', icon: PlaneLanding, label: 'Arrivées en temps réel', desc: 'Suivi des vols arrivant à FIH' },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.to} to={link.to as never} className="group flex items-start gap-4 border border-[#e8e8e8] bg-white p-5 hover:border-[#003DA5]/30 transition-all">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#003DA5]/10 group-hover:bg-[#003DA5] transition-colors">
                  <Icon size={18} className="text-[#003DA5] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1a1a1a] group-hover:text-[#003DA5] transition-colors">{link.label}</p>
                  <p className="text-xs text-[#888]">{link.desc}</p>
                </div>
                <ArrowRight size={14} className="ml-auto shrink-0 text-[#ccc] group-hover:text-[#003DA5] transition-colors mt-0.5" />
              </Link>
            );
          })}
        </div>

      </div>
    </main>
  );
}
