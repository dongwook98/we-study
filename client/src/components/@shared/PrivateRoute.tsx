import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../store/auth';

function PrivateRoute() {
  const { isLogin } = useAuthStore();

  if (!isLogin) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
}

export default PrivateRoute;
