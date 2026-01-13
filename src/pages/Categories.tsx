import { useQuery } from '@tanstack/react-query';
import { CategoriesTemplate, useCategoryStore, useCompanyStore } from '../index.ts';

function Categories() {
  const {getCategory} = useCategoryStore()
  // const {}= useCompanyStore(); // 03.31
  // const {} = useQuery({queryKey:["GetCategoriesByCompanyId",]}); // 03.31

  return <CategoriesTemplate />;
}

export default Categories;
