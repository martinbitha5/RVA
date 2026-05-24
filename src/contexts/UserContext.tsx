/**
 * Shares the authenticated user from CompteLayout down to all child pages.
 * Child pages call `useUser()` instead of `supabase.auth.getUser()` —
 * this removes one network round-trip per page navigation inside /compte/*.
 */
import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

interface UserCtxValue {
  user: User | null;
}

export const UserContext = createContext<UserCtxValue>({ user: null });

export function useUser(): UserCtxValue {
  return useContext(UserContext);
}
