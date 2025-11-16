import { create } from 'zustand';
import { InsertCompany } from '../index.ts'; //crudCompanies.tsx

type companyType = {
  name: string;
  tax_id: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  id_auth: string;
};

interface CompanyStore {
  insertCompany: (company: companyType) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCompanyStore = create<CompanyStore>((set) => ({
  insertCompany: async (company: companyType) => {
    const data = await InsertCompany(company);
    console.log('Company inserted:', data);
  },
}));
