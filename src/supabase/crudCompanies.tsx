import { supabase } from '../index.ts';
import Swal from 'sweetalert2';

const tableName = 'companies';

export async function InsertCompany(company: {
  name: string;
  cnpj: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  id_auth: string;
}) {
  const { data, error } = await supabase.from(tableName).insert(company).select().maybeSingle();
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
  return data;
}
