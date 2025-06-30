import { supabase } from '../index.ts';

const tableName = 'doc_types';

export interface docTypeInterface  {
  id: number;
  name: string;
  description: string;
  id_company: string;
};

export async function GetDocType(companyId: number): Promise<unknown> {
  if (!companyId) {
    throw new Error('User ID is required');
  }
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id_company', companyId)
    .maybeSingle(); // El instructor sugiere que sin este método, el resultado puede ser un array o un objeto, pero aquí esperamos un único objeto.
  if (error) {
    return null;
  }
  return data as docTypeInterface;
}
