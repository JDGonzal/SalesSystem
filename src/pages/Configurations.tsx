import { useQuery } from '@tanstack/react-query';
import { ConfigurationsTemplate, Spinner, useModulesStore } from '../index.ts';

function Configurations() {
  // Replace 'YourStoreType' with the actual type/interface of your store
  const { getAllModules } = useModulesStore() as {
    getAllModules: () => unknown;
  };

  const { /*data,*/ isLoading, error } = useQuery({
    queryKey: ['showModules'],
    queryFn: getAllModules,
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <span>error...</span>;
  }
  // console.log('data: ', data);
  return <ConfigurationsTemplate />;
}

export default Configurations;
