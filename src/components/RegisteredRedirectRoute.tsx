import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';

function RegisteredRedirectRoute() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}

export default RegisteredRedirectRoute;
