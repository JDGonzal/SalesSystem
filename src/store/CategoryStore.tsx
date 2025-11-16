import { create } from 'zustand';
import {
  DeleteCategory,
  GetCategoriesByCompanyId,
  InsertCategory,
  UpdateCategory,
  type categoryType,
} from '../index.ts'; //crudCategories.tsx

interface CategoryStore {
  finder: string;
  setFinder: (value: string) => void;
  dataCategory: categoryType[];
  categoryItemSelected?: categoryType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameterSelected?: { [key: string]: any };
  showCategory: (id_Compomy: number) => void;
  selectCategory?: (category: categoryType) => void;
  insertCategory?: (category: categoryType, ImageFile: File) => void;
  deleteCategory?: (id: number) => void;
  updateCategory?: (category: categoryType) => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  finder: '',
  setFinder: (value: string) => set({ finder: value }),
  dataCategory: [],
  categoryItemSelected: [],
  parameterSelected: {},
  showCategory: async (id_Company: number) => {
    const data = await GetCategoriesByCompanyId(id_Company);
    if (data) {
      set({ dataCategory: data });
      set({ parameterSelected: { id_company: id_Company } });
      set({ categoryItemSelected: data[0] });
      return data;
    }
    return null;
  },
  selectCategory: (category: categoryType) => {
    set({ categoryItemSelected: [category] });
  },
  insertCategory: async (category: categoryType, imageFile: File) => {
    await InsertCategory(category, imageFile);
    const { showCategory, parameterSelected } = get();
    if (parameterSelected?.id_company) {
      await showCategory(parameterSelected.id_company);
    }
  },
  deleteCategory: async (id: number) => {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const response: any = await fetch(
    //   import.meta.env.VITE_API_URL + '/categories/' + id,
    //   {
    //     method: 'DELETE',
    //   }
    // );
    // const data = await response.json();
    // if (data) {
    //   const {showCategory, parameterSelected} = get();
    //   if (parameterSelected?.id_company) {
    //     await showCategory(parameterSelected.id_company);
    //   }
    //   return data;
    // }
    // return null;
    await DeleteCategory(id);
    const { showCategory, parameterSelected } = get();
    if (await parameterSelected?.id_company) {
      await showCategory(parameterSelected?.id_company);
    }
  },
  updateCategory: async (category: categoryType) => {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const response: any = await fetch(
    //   import.meta.env.VITE_API_URL + '/categories/' + category.id,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(category),
    //   }
    // );
    // const data = await response.json();
    // if (data) {
    //   const {showCategory, parameterSelected} = get();
    //   if (parameterSelected?.id_company) {
    //     await showCategory(parameterSelected.id_company);
    //   }
    //   return data;
    // }
    // return null;
    await UpdateCategory(category);
    const { showCategory, parameterSelected } = get();
    if (await parameterSelected?.id_company) {
      await showCategory(parameterSelected?.id_company);
    }
  },
  GetCategory: async (id: number) => {
    const data = await GetCategoriesByCompanyId(id);
    set({ dataCategory: data });
    return data;
  },
}));
