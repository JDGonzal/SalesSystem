import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../supabase/supabase.config';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  authState: User | null | [];
}
const AuthContext = createContext<AuthContextType>({ authState: null });

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<User | null | []>([]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.info('Event:', event, 'session:', session);
      if (session == null) {
        setAuthState(null);
      } else {
        setAuthState(session?.user);
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
