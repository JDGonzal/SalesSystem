import { supabase } from '../index.ts';

const tableName = 'users';

export async function getUser(userId: string): Promise<unknown> {
  const { data } = await supabase
    .from(tableName)
    .select('*')
    .eq('id_auth', userId)
    .maybeSingle();

  return data;
}
