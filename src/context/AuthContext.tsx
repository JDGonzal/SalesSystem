import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../supabase/supabase.config';

const AuthContext = createContext<null | unknown>(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authState, setAuthState] = useState([]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      console.log(JSON.stringify(session));
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
