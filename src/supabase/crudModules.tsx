import { supabase } from '../index.ts';
import Swal from 'sweetalert2';

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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
  return data as modulesInterface[];
}
