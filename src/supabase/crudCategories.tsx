import { supabase } from '../index.ts';
import Swal from 'sweetalert2';

const tableName = 'categories';

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
    // retorna directamente `urlData.publicUrl`
    const imageUrl = await uploadImage(new_category_id as string, imageFile);
    const updateCategory = {
      id: new_category_id,
      icon: imageUrl || '', // Provide a default empty string if imageUrl is null or undefined
    };
    await changeCategoryIcon(updateCategory);
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

async function changeCategoryIcon(category: { id: number; icon: string }) {
  const { error } = await supabase
    .from(tableName)
    .update(category)
    .eq('id', category.id);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
}

export async function GetCategoriesByCompanyId(id_company: number) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id_company', id_company)
    .order('name', { ascending: true });
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return [];
  }
  return data;
}

// eslint-disable-next-line react-refresh/only-export-components
export async function GetCategoriesByCompanyId_n_name(
  id_company: number,
  name: string
) {
  const { data, error } = await supabase
    .from(tableName)
    .select('id, name')
    .eq('id_company', id_company)
    .ilike('name', `%${name}%`)
    .order('name', { ascending: true });
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return [];
  }
  return data;
}

export async function DeleteCategory(id: number, icon: string) {
  // Elimina la categoría de la tabla
  const { error } = await supabase.from(tableName).delete().eq('id', id);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }

  // Elimina la imagen asociada si no es el icono por defecto '-'
  if (icon != '-') {
    const pathFile = 'categories/' + id;
    const { error: storageError } = await supabase.storage
      .from('images')
      .remove([pathFile]);
    if (storageError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: storageError.message,
      });
      return null;
    }
  }
  return true;
}

export async function UpdateCategory( 
  category: {
    id: number;
    name: string;
    color: string;
    description: string;
    id_company: number;
  },
  imageFileOld: File | null,
  imageFileNew: File | null
) {
  const { data, error } = await supabase.rpc('fnc_category_update', category);
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
    return null;
  }
  if (imageFileOld && imageFileNew) {
    const fileSize = imageFileNew.size; 
    if (fileSize != undefined) {
      // retorna directamente `urlData.publicUrl`
      const imageUrl = await uploadImage(category.id.toString(), imageFileNew);
      const updateCategory = {
        id: category.id,
        icon: imageUrl || '', // Provide a default empty string if imageUrl is null or undefined
      };
      await changeCategoryIcon(updateCategory);
    }
  }
  return data;

}
