import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  supabase,
  GetUser,
  InsertCompany,
  InsertAdminUser,
  GetDocType,
  type docTypeInterface,
  GetRoleByName,
  type rolesInterface,
  type CompanyInterface,
} from '../index.ts';
import type { User } from '@supabase/supabase-js';

export interface SessionInterface {
  provider_token: string;
  access_token: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  token_type: string;
  user: SessionUserInterface;
}
export interface SessionUserInterface {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: Date;
  phone: string;
  confirmed_at: Date;
  last_sign_in_at: Date;
  app_metadata: SessionAppMetadataInterface;
  user_metadata: SessionDataInterface;
  identities: SessionIdentityInterface[];
  created_at: Date;
  updated_at: Date;
  is_anonymous: boolean;
}

export interface SessionAppMetadataInterface {
  provider: string;
  providers: string[];
}

export interface SessionIdentityInterface {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: SessionDataInterface;
  provider: string;
  last_sign_in_at: Date;
  created_at: Date;
  updated_at: Date;
  email: string;
}

export interface SessionDataInterface {
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
    const resUser = await GetUser(session?.user?.id || '');
    if (!resUser) {
      const resCompany = (await InsertCompany({
        name: session?.user.user_metadata?.full_name || session?.user?.id,
        tax_id: session?.user?.id.slice(-12),
        logo: session?.user.user_metadata?.picture || '',
        address: '',
        phone: session?.user?.phone || '',
        email: session?.user?.email || '',
        id_auth: session?.user?.id,
      })) as CompanyInterface;

      if (resCompany) {
        const resDocType = (await GetDocType(
          resCompany.id
        )) as docTypeInterface;

        const resRole = (await GetRoleByName('admin')) as rolesInterface;

        await InsertAdminUser({
          email: resCompany?.email || session?.user?.email,
          password_hash: '', // Password hash should be handled securely
          name: resCompany?.name || session?.user.user_metadata?.full_name,
          id_type: resDocType?.id || 1, // Assuming docType has an id field
          document: resCompany?.tax_id || session?.user?.id.slice(-12), // Example document
          phone: resCompany?.phone || session?.user?.phone,
          id_role: resRole?.id || 1, // Assuming 1 is the ID for 'admin'
          address: resCompany?.address || '', // Address can be added later
          id_auth: resCompany?.id_auth || session?.user?.id,
          is_active: true,
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
};
