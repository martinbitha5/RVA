import { useState } from 'react';
import { useController } from 'react-hook-form';
import { useNotify } from 'react-admin';
import { Box, Button, Typography, CircularProgress, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../supabaseClient';

interface Props {
  source: string;
  label?: string;
  folder?: string; // ex: "news", "concessions", "airlines"
}

export function SupabaseImageInput({ source, label = 'Image', folder = 'general' }: Props) {
  const { field } = useController({ name: source });
  const [uploading, setUploading] = useState(false);
  const notify = useNotify();

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifie la taille (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      notify('Image trop lourde (max 5 MB)', { type: 'error' });
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      // Crée le bucket s'il n'existe pas encore
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.some(b => b.name === 'fih-media')) {
        await supabase.storage.createBucket('fih-media', { public: true });
      }

      const { error: uploadError } = await supabase.storage
        .from('fih-media')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('fih-media')
        .getPublicUrl(filename);

      field.onChange(publicUrl);
      notify('Image uploadée avec succès ✓', { type: 'success' });
    } catch (err) {
      notify(err instanceof Error ? err.message : "Erreur lors de l'upload", { type: 'error' });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <Box sx={{ mb: 2.5, width: '100%' }}>
      <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 11 }}>
        {label}
      </Typography>

      {/* Aperçu de l'image */}
      {field.value && (
        <Box sx={{ mb: 1.5, position: 'relative', display: 'inline-block' }}>
          <img
            src={field.value}
            alt="Aperçu"
            style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8, border: '2px solid #e0e0e0', display: 'block' }}
          />
          <Chip
            label="En ligne"
            size="small"
            sx={{ position: 'absolute', top: 6, right: 6, bgcolor: '#4CAF5090', color: '#fff', fontSize: 10 }}
          />
        </Box>
      )}

      {/* Boutons */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button
          component="label"
          variant="outlined"
          size="small"
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={13} /> : <CloudUploadIcon />}
          sx={{ borderColor: '#003DA5', color: '#003DA5', '&:hover': { bgcolor: '#003DA510' } }}
        >
          {uploading ? 'Envoi...' : (field.value ? "Changer l'image" : 'Choisir une image')}
          <input type="file" hidden accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFile} />
        </Button>

        {field.value && (
          <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => field.onChange('')}
          >
            Supprimer
          </Button>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
        Formats acceptés : JPG, PNG, WebP · Max 5 MB
      </Typography>
    </Box>
  );
}
