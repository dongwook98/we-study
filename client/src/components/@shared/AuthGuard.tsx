import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../../store/auth';

function AuthGuard() {
  const { isLogin } = useAuthStore();

  if (isLogin) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthGuard;
