import { Route, Routes } from 'react-router-dom';
import { Home, Login } from '../index.ts';

function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='*' element={<div>404 Not Found</div>} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default MyRoutes;
