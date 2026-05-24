import { supabaseAnon } from './supabaseClient';
import type { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const { error } = await supabaseAnon.auth.signInWithPassword({
      email: username,
      password,
    });
    if (error) throw new Error(error.message);
  },

  logout: async () => {
    await supabaseAnon.auth.signOut();
  },

  checkAuth: async () => {
    const { data: { session } } = await supabaseAnon.auth.getSession();
    if (!session) throw new Error('Non authentifié');
  },

  checkError: async (error) => {
    if (error?.status === 401 || error?.status === 403) {
      throw new Error('Non autorisé');
    }
  },

  getIdentity: async () => {
    const { data: { user } } = await supabaseAnon.auth.getUser();
    if (!user) throw new Error('Non authentifié');
    return {
      id: user.id,
      fullName: user.user_metadata?.full_name ?? user.email ?? 'Administrateur',
      avatar: user.user_metadata?.avatar_url,
    };
  },

  getPermissions: async () => {
    const { data: { user } } = await supabaseAnon.auth.getUser();
    return user?.role ?? 'authenticated';
  },
};
