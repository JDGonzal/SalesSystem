import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase, GetUser, InsertCompany, InsertAdminUser } from '../index.ts';
import type { User } from '@supabase/supabase-js';

export interface SessionInterface {
  provider_token: string;
  access_token: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  token_type: string;
  user: UserInterface;
}

export interface UserInterface {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: AppMetadataInterface;
  user_metadata: DataInterface;
  identities: IdentityInterface[];
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
}

export interface AppMetadataInterface {
  provider: string;
  providers: string[];
}

export interface IdentityInterface {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: DataInterface;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}

export interface DataInterface {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

type AuthContextType = {
  authState: User | null | [];
};
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
        setAuthState(session?.user || null);
        insertUser(session as unknown as SessionInterface);
      }
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data.subscription; // Instructor
      // data?.subscription?.unsubscribe(); // Copilot
    };
  }, []);

  const insertUser = async (session: SessionInterface) => {
    const response = await GetUser(session?.user?.id || '');
    if (response) {
      console.info('User already exists:', response);
    } else {
      await InsertCompany({
        name: session?.user.user_metadata?.full_name || session?.user?.id,
        cnpj: session?.user?.id.slice(-12),
        logo: session?.user.user_metadata?.picture || '',
        address: '',
        phone: session?.user?.phone || '',
        email: session?.user?.email || '',
        id_auth: session?.user?.id,
      });
      

      await InsertAdminUser({
        username: session?.user?.email || session?.user?.id,
        email: session?.user?.email || '',
        password_hash: '', // Password hash should be handled securely
        name: session?.user.user_metadata?.full_name || '',
        id_type: 1, // Assuming 1 is the ID for 'company'
        document: session?.user?.id.slice(-12), // Example document
        phone: session?.user?.phone || '',
        id_role: 1, // Assuming 1 is the ID for 'admin'
        address: '', // Address can be added later
        id_auth: session?.user?.id,
        is_active: true,
      });

    }
  };

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
};
