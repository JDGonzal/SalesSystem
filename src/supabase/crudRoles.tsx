import { supabase } from '../index.ts';

const tableName = 'roles';

export interface rolesInterface  {
  id: number;
  name: string;
  description: string;
};

export async function GetRoleByName(roleName: string): Promise<unknown> {
  if (!roleName) {
    throw new Error('Role Name is required');
  }
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('name', roleName)
    .maybeSingle();
  if (error) {
    return null;
  }
  return data as rolesInterface;
}