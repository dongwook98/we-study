import { Outlet } from 'react-router';

import Header from './Header';

function MainLayout() {
  return (
    <>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
