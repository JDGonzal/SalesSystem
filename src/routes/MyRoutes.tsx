import { Route, Routes } from 'react-router-dom';
import { Home, Login, ProtectedRoutes, useAuthContext } from '../index.ts';

export function MyRoutes() {
  const { authState } = useAuthContext();
  console.info('MyRoutes authState:', authState);
  return (
    <Routes>
      <Route element={<ProtectedRoutes authState={authState} redirectTo='/login' />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path='*' element={<div>404 Not Found</div>} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}
