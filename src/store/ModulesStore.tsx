import { create } from 'zustand';
import { GetAllModules } from '../index.ts';

type moduleType = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
  icon: string;
  link: string;
};

export const useModulosStore = create((set) => ({
  dataModulos: [],
  getAllModules: async () => {
    const data = await GetAllModules();
    return set({
      dataModulos: data as moduleType[],
    });
    /*
    El instructor sugiere:
    set({
      dataModulos: data as moduleType[],
    });
    return data as moduleType[]; // Retorna los datos obtenidos
    */
  },
}));
