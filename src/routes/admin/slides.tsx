import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Loader2, Image, Check, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/admin/slides')({
  component: AdminSlidesPage,
  head: () => ({ meta: [{ title: 'Backoffice — Slides Hero · FIH' }] }),
});

interface Slide {
  id: string;
  image_url: string;
  sort_order: number;
  active: boolean;
}

function AdminSlidesPage() {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: slides = [], isLoading } = useQuery<Slide[]>({
    queryKey: ['admin-slides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hero_slides')
        .select('id, image_url, sort_order, active')
        .order('sort_order');
      if (error) throw error;
      return data ?? [];
    },
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    setUploadSuccess(false);
    try {
      const ext = file.name.split('.').pop() ?? 'jpg';
      const path = `slides/${Date.now()}.${ext}`;

      const { error: storageError } = await supabase.storage
        .from('hero-images')
        .upload(path, file, { upsert: false });
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(path);

      const maxOrder = slides.length > 0 ? Math.max(...slides.map(s => s.sort_order)) : 0;
      const { error: dbError } = await supabase.from('hero_slides').insert({
        image_url: publicUrl,
        title_fr: 'Slide FIH',
        sort_order: maxOrder + 1,
        active: true,
      } as never);
      if (dbError) throw dbError;

      setUploadSuccess(true);
      void queryClient.invalidateQueries({ queryKey: ['admin-slides'] });
      void queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
      if (fileRef.current) fileRef.current.value = '';
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(slide: Slide) {
    setDeletingId(slide.id);
    try {
      // Supprimer la ligne en DB
      const { error } = await supabase.from('hero_slides').delete().eq('id', slide.id);
      if (error) throw error;

      // Tenter de supprimer le fichier Storage si l'URL est interne
      const url = new URL(slide.image_url);
      const pathParts = url.pathname.split('/hero-images/');
      if (pathParts[1]) {
        await supabase.storage.from('hero-images').remove([pathParts[1]]);
      }

      void queryClient.invalidateQueries({ queryKey: ['admin-slides'] });
      void queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
    } catch (err) {
      console.error('Erreur suppression:', err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F6FB]">

      {/* Barre admin */}
      <div className="border-b border-[#D8E0ED] bg-white">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={'/' as never} className="flex items-center gap-1 text-xs text-[#888] hover:text-[#003DA5] transition-colors">
              <ArrowLeft size={13} /> Retour au site
            </Link>
            <div className="h-4 w-px bg-[#D8E0ED]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Backoffice FIH</p>
              <h1 className="text-base font-bold text-[#1A1A1A]">Slides Hero — Page d'accueil</h1>
            </div>
          </div>

          {/* Bouton ajouter */}
          <label className={`flex cursor-pointer items-center gap-2 bg-[#003DA5] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#002580] ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
            {uploading
              ? <Loader2 size={15} className="animate-spin" />
              : <Plus size={15} />
            }
            Ajouter une photo
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleUpload}
              className="sr-only"
            />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* Feedback */}
        {uploadError && (
          <div className="mb-5 border border-[#CE1126]/20 bg-[#CE1126]/5 px-4 py-3 text-sm text-[#CE1126]">
            {uploadError}
          </div>
        )}
        {uploadSuccess && (
          <div className="mb-5 flex items-center gap-2 border border-[#009A44]/20 bg-[#009A44]/5 px-4 py-3 text-sm text-[#009A44]">
            <Check size={14} /> Photo ajoutée — le slide est maintenant actif sur la page d'accueil.
          </div>
        )}

        {/* Grille de slides */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={24} className="animate-spin text-[#003DA5]" />
          </div>
        ) : slides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center border border-[#D8E0ED] bg-white">
              <Image size={28} className="text-[#C8D0DC]" />
            </div>
            <p className="text-sm font-semibold text-[#1A1A1A]">Aucune photo pour l'instant</p>
            <p className="mt-1 text-xs text-[#888]">Cliquez sur « Ajouter une photo » pour commencer.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((slide, i) => (
              <div key={slide.id} className="group relative overflow-hidden border border-[#D8E0ED] bg-white shadow-sm">
                <img
                  src={slide.image_url}
                  alt={`Slide ${i + 1}`}
                  className="h-48 w-full object-cover"
                />
                {/* Numéro d'ordre */}
                <div className="absolute left-3 top-3 bg-[#003DA5] px-2 py-0.5">
                  <span className="font-mono text-[11px] font-bold text-white">#{i + 1}</span>
                </div>
                {/* Overlay sur survol */}
                <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => { void handleDelete(slide); }}
                    disabled={deletingId === slide.id}
                    className="flex items-center gap-1.5 bg-[#CE1126] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#a00e1e] disabled:opacity-60"
                  >
                    {deletingId === slide.id
                      ? <Loader2 size={12} className="animate-spin" />
                      : <Trash2 size={12} />
                    }
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-[#888]">
          Format recommandé : 1920 × 1080 px, JPG ou WebP. Les photos s'affichent en diaporama sur la page d'accueil.
        </p>
      </div>
    </main>
  );
}
