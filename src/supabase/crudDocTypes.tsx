import { supabase } from '../index.ts';

const tableName = 'doc_types';

export async function GetDocType(companyId: string): Promise<unknown> {
  if (!companyId) {
    throw new Error('User ID is required');
  }
  const { data } = await supabase
    .from(tableName)
    .select('*')
    .eq('id_company', companyId)
    .maybeSingle();

  return data;
}
