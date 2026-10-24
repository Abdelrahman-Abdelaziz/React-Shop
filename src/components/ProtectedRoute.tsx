import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../app/hooks';

function ProtectedRoute() {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
