import type { User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({
  authState,
  redirectTo,
  children,
}: {
  authState: User |unknown ;
  redirectTo: string;
  children?: ReactNode;
}) => {
  console.info('ProtectedRoutes user:', authState);
  if (authState === null) {
    return <Navigate to={redirectTo} replace />;
  }
  return children ? children : <Outlet />;
};
