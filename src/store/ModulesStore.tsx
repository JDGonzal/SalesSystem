import { create } from 'zustand';
import { GetAllModules } from '../index.ts';

export type moduleType = {
  id: number;
  name: string;
  description: string;
  checked: boolean;
  icon: string;
  link: string;
};

export const useModulesStore = create((set) => ({
  dataModules: [],
  getAllModules: async () => {
    /* Lo sugerido por Copilot
    const data = await GetAllModules();
    return set({
      dataModules: data as moduleType[],
    });
    /*
    El instructor sugiere:*/
    const response = await GetAllModules()
    set({dataModules:response})
    return response; // Retorna los datos obtenidos
    /**/
  },
}));
