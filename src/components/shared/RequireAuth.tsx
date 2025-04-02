import { Outlet } from 'react-router';

function RequireAuth() {
  // TODO 인증안된 유저 홈페이지로 리다이렉트

  return (
    <>
      <Outlet />
    </>
  );
}

export default RequireAuth;
