import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Clock, Phone, Globe, ChevronRight } from 'lucide-react';
import {
  CONCESSIONS,
  CONCESSIONS_BY_SLUG,
  ZONE_LABELS,
  CATEGORY_LABELS,
  type Concession,
} from '@/lib/concessions-data';

export const Route = createFileRoute('/boutiques-restaurants/repertoire/$slug')({
  component: ConcessionsDetailPage,
  loader: ({ params }) => {
    const item = CONCESSIONS_BY_SLUG[params.slug];
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? 'Boutique'} — Boutiques FIH Kinshasa` },
      { name: 'description', content: loaderData?.description ?? '' },
    ],
  }),
});

/* ─── Related card ───────────────────────────────────────────────────── */
function RelatedCard({ c }: { c: Concession }) {
  return (
    <Link
      to={`/boutiques-restaurants/repertoire/${c.slug}` as never}
      className="group flex flex-col overflow-hidden border border-[#E8E8E8] bg-white hover:shadow-md transition-shadow"
    >
      {/* Illustration */}
      <div
        className="h-36 transition-transform duration-500 group-hover:scale-105 overflow-hidden"
        style={{ background: c.gradient }}
      >
        {c.image && (
          <img
            src={c.image}
            alt={c.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#003DA5] transition-colors line-clamp-1">
          {c.name}
        </p>
        <p className="text-[11px] text-[#888] line-clamp-2">{c.description}</p>
        <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#003DA5] group-hover:gap-2 transition-all">
          En savoir plus <ChevronRight size={11} />
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
function ConcessionsDetailPage() {
  const item = Route.useLoaderData();
  const relatedItems = (item.relatedIds ?? [])
    .map(id => CONCESSIONS.find(c => c.id === id))
    .filter(Boolean) as Concession[];

  const categoryLabel = CATEGORY_LABELS[item.category];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO — diagonal style ADMTL ─────────────────────────── */}
      <div className="relative overflow-hidden bg-[#3D4B5C]" style={{ minHeight: 260 }}>

        {/* Left content */}
        <div className="container relative z-10 py-10 md:py-14 md:pr-[45%]">
          {/* Back link */}
          <Link
            to={'/boutiques-restaurants/repertoire' as never}
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Retour au répertoire
          </Link>

          {/* Category badge */}
          <div className="mb-3">
            <span className="inline-block border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60">
              {categoryLabel}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {item.name}
          </h1>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: photo or gradient — diagonal clip */}
        <div
          className="absolute right-0 top-0 h-full w-5/12 hidden md:block overflow-hidden"
          style={{ clipPath: 'polygon(10% 0,100% 0,100% 100%,0 100%)' }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              style={{ filter: 'brightness(0.75) saturate(1.1)' }}
            />
          ) : (
            <div className="h-full w-full" style={{ background: item.gradient }} />
          )}
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4B5C]/60 to-transparent" />
        </div>

        {/* Bottom accent RDC flag */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#003DA5] via-[#FFCE00] to-[#CE1126]" />
      </div>

      {/* ── INFO BLOCK ──────────────────────────────────────────── */}
      <div className="border-b border-[#E8E8E8]">
        <div className="container py-8 md:py-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">

            {/* Left: table infos */}
            <div className="flex-1">
              {/* Zone badge — top right on desktop */}
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div /> {/* spacer */}
                <span className="inline-flex items-center gap-1.5 border border-[#003DA5]/20 bg-[#003DA5]/6 px-3 py-1.5 text-xs font-semibold text-[#003DA5]">
                  <MapPin size={11} />
                  {ZONE_LABELS[item.zoneKey]}
                </span>
              </div>

              {/* Table */}
              <table className="w-full border-collapse">
                <tbody>
                  {/* Porte proche */}
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-4 pr-8 text-sm font-medium text-[#555] w-40">
                      Porte proche
                    </td>
                    <td className="py-4">
                      <span className="inline-block bg-[#1A1A1A] px-3 py-1 text-xs font-bold text-white tracking-wide">
                        {item.porte}
                      </span>
                    </td>
                  </tr>

                  {/* Heures */}
                  <tr className="border-b border-[#F0F0F0]">
                    <td className="py-4 pr-8 text-sm font-medium text-[#555]">
                      Heures d'ouverture
                    </td>
                    <td className="py-4">
                      <span className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                        <Clock size={13} className="text-[#003DA5]" />
                        {item.hours}
                      </span>
                    </td>
                  </tr>

                  {/* Contact */}
                  {(item.phone || item.website) && (
                    <tr>
                      <td className="py-4 pr-8 text-sm font-medium text-[#555]">
                        Informations de contact
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-3">
                          {/* Phone button */}
                          {item.phone && (
                            <a
                              href={`tel:${item.phone.replace(/\s/g, '')}`}
                              className="inline-flex items-center gap-2 border border-[#1A1A1A] bg-white px-4 py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                            >
                              <Phone size={12} />
                              {item.phone}
                            </a>
                          )}
                          {/* Website button */}
                          {item.website && (
                            <a
                              href={item.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 border border-[#003DA5] bg-[#003DA5] px-4 py-2 text-xs font-bold text-white hover:bg-[#002580] transition-colors"
                            >
                              <Globe size={12} />
                              Site web
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Right: mini location badge (desktop) */}
            <div className="hidden md:flex flex-col items-center justify-center w-48 flex-shrink-0">
              <div
                className="h-20 w-20 flex items-center justify-center"
                style={{ background: item.gradient }}
              >
                <span className="text-3xl font-black text-white/20">
                  {item.name.charAt(0)}
                </span>
              </div>
              <p className="mt-3 text-center text-xs text-[#888] leading-snug max-w-[10rem]">
                {item.porte}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION SECTION — 50/50 ─────────────────────────── */}
      <div className="border-b border-[#E8E8E8]">
        <div
          className="grid md:grid-cols-2"
          style={{ minHeight: 300 }}
        >
          {/* Left: illustration / image */}
          <div
            className="relative min-h-56 md:min-h-0 overflow-hidden"
            style={{ background: item.gradient }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
                style={{ filter: 'brightness(0.8) saturate(1.15)' }}
              />
            )}
          </div>

          {/* Right: text */}
          <div className="flex flex-col justify-center px-8 py-10 md:px-14 md:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003DA5] mb-4">
              À propos
            </p>
            <p className="text-lg leading-relaxed text-[#333]">
              {item.description}
            </p>
            {/* Tags repeat */}
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#F2F2F2] px-2.5 py-1 text-[11px] font-medium text-[#555]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RELATED / ELEVEZ VOTRE EXPÉRIENCE FIH ───────────────── */}
      {relatedItems.length > 0 && (
        <div className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
          <div className="container py-10 md:py-14">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-4 w-0.5 bg-[#CE1126]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#CE1126]">
                FIH
              </p>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-8">
              Élevez votre expérience{' '}
              <span className="text-[#003DA5]">FIH</span>
            </h2>

            {/* Related cards */}
            <div
              className="grid gap-0.5 sm:grid-cols-2 md:grid-cols-3"
              style={{ background: '#E8E8E8' }}
            >
              {relatedItems.map(rel => (
                <RelatedCard key={rel.id} c={rel} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BACK LINK ────────────────────────────────────────────── */}
      <div className="container py-8">
        <Link
          to={'/boutiques-restaurants/repertoire' as never}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#003DA5] hover:underline"
        >
          <ArrowLeft size={14} />
          Retour au répertoire
        </Link>
      </div>
    </div>
  );
}
