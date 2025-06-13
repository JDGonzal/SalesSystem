import { create } from 'zustand';
import { supabase } from '../supabase/supabase.config';

interface AuthStore {
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAuthStore = create<AuthStore>((set) => ({
  loginGoogle: async () => {
    // signInWithOAuth - this method is used to sign in with Google OAuth
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  },
  logout: async () => {
    // signOut - this method is used to sign out the user
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Error signing out:', error.message);
    }
  },
}));
