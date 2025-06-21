// import { supabase } from "./supabase.config";
import { supabase } from '../index.ts';

export async function InsertCategory(category: {
  name: string;
  color: string;
  icon: string;
  description: string;
  id_company: number;
  file: string;
}) {
  const { data, error } = await supabase.rpc('fnc_category_insert', category);
  // const { data, error } = await supabase
  //   .from("categories")
  //   .insert(category)
  //   .select();

  // if (error) {
  //   throw new Error(`Error inserting category: ${error.message}`);
  // }
  // return data;
  console.log('InsertCategory', data, error);
}
