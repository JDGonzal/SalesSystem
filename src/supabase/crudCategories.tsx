import { supabase } from '../index.ts';
import Swal from 'sweetalert2';

export async function InsertCategory(
  category: {
    name: string;
    color: string;
    icon: string;
    description: string;
    id_company: number;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file: string
) {
  const { data, error } = await supabase.rpc('fnc_category_insert', category);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const new_category_id = data;//data?.[0]?.new_category_id;
}
