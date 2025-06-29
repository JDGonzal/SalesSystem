import { supabase } from '../index.ts';

const tableName = 'users';

export async function GetUser(userId: string): Promise<unknown> {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const { data } = await supabase
    .from(tableName)
    .select('*')
    .eq('id_auth', userId)
    .maybeSingle();

  return data;
}

export async function InsertAdminUser(user: {
  username: string;
  email: string;
  password_hash: string;
  name: string;
  id_type: number;
  document: string;
  phone: string;
  id_role: number;
  address: string;
  id_auth: string;
  is_active: boolean;
}): Promise<unknown> {
  if (!user.id_auth) {
    throw new Error('User ID is required');
  }
  
  const { data, error } = await supabase
    .from(tableName)
    .insert([user])
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
} 
