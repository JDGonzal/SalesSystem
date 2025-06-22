/* eslint-disable react-refresh/only-export-components */
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
  imageFile: File
) {
  const { data, error } = await supabase.rpc('fnc_category_insert', category);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
  const fileSize = imageFile.size;
  if (fileSize != undefined) {
    const new_category_id = data; //data?.[0]?.new_category_id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imageUrl = await uploadImage(new_category_id as string, imageFile);
  }
}

async function uploadImage(category_id: string, imageFile: File) {
  // const avatarFile = event.target.files[0]
  const pathFile = 'categories/' + category_id;
  const { data, error } = await supabase.storage
    .from('images')
    .upload(pathFile, imageFile, {
      cacheControl: '2', // '3600' -> 1 hora,
      upsert: true, // El archivo se reemplaza si ya existe
    });
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
  if (data) {
    const { data: urlData } = await supabase.storage
      .from('images')
      .getPublicUrl(pathFile);
    return urlData.publicUrl;
  }
}
