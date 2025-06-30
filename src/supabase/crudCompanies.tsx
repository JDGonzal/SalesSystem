import { supabase } from '../index.ts';

const tableName = 'companies';

export interface CompanyInterface {
  id: number;
  name: string;
  tax_id: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  id_auth: string;
}

export async function InsertCompany(company: {
  name: string;
  tax_id: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  id_auth: string;
}) {
  const { data, error } = await supabase.from(tableName).insert(company).select().maybeSingle();
  if (error) {
    console.error('Error inserting company:', error);
    return null;
  }
  return data as CompanyInterface;
}
