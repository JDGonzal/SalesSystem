import { Route, Routes } from 'react-router-dom';
import {
  Configurations,
  Home,
  Login,
  ProtectedRoutes,
  useAuthContext,
} from '../index.ts';

export function MyRoutes() {
  const { authState } = useAuthContext();
  // console.info('MyRoutes authState:', authState);
  return (
    <Routes>
      <Route
        element={<ProtectedRoutes authState={authState} redirectTo='/login' />}
      >
        <Route path='/' element={<Home />} />
        <Route path='/config' element={<Configurations />} />
      </Route>

      <Route path='*' element={<div>404 Not Found</div>} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}
