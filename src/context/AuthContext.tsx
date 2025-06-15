import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../supabase/supabase.config';
import type { User } from '@supabase/supabase-js';

const AuthContext = createContext<null | unknown>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<unknown | User>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user == null) {
          setAuthState([]);
          return;
        }
        setAuthState(session?.user);
      } catch (error) {
        console.info('Event:', event);
        console.error('Error in auth state change:', error);
      }
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.subscription; // Instructor
      // data?.subscription?.unsubscribe(); // Copilot
    };
  }, []);
  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
};
