import { supabase } from '../index.ts';

const tableName = 'modules';

export interface modulesInterface {
  id: number;
  name: string;
  description: string;
  checked: boolean;
  icon: string;
  link: string;
}

export async function GetAllModules(): Promise<unknown> {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    return null;
  }
  return data as modulesInterface[];
}
