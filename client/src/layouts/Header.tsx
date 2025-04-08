import { Link, NavLink } from 'react-router';

import { useAuthStore } from '@store/auth';

import Avatar from '@shared/base/Avatar';

function Header() {
  const { isLogin, user } = useAuthStore();
  console.log('🚀 ~ Header ~ user:', user);
  const activeLinkClass = 'font-bold text-primary-active';

  return (
    <header className='bg-white border-b border-border sticky top-0 p-4 z-(--header-z)'>
      <div className='container h-full mx-auto flex items-center justify-between'>
        {/* 로고 */}
        <div>
          <Link to='/'>
            <h1 className='font-bold text-xl text-primary'>WeStudy</h1>
          </Link>
        </div>

        {/* 내비게이션 */}
        <nav>
          <ul className='flex gap-x-6 items-center'>
            <li>
              <NavLink
                to='/study'
                end
                className={({ isActive }) =>
                  isActive
                    ? activeLinkClass
                    : 'hover:text-turquoise-400 font-bold'
                }
              >
                스터디
              </NavLink>
            </li>
            {isLogin && (
              <li>
                <NavLink
                  to='/study/new'
                  className={({ isActive }) =>
                    isActive
                      ? activeLinkClass
                      : 'hover:text-turquoise-400 font-bold'
                  }
                >
                  스터디 모집
                </NavLink>
              </li>
            )}

            {isLogin && (
              <li>
                <Link to='/my'>
                  <Avatar size='sm' />
                </Link>
              </li>
            )}

            {!isLogin && (
              <li>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    isActive
                      ? activeLinkClass
                      : 'hover:text-turquoise-400 font-bold'
                  }
                >
                  로그인
                </NavLink>
              </li>
            )}
            {!isLogin && (
              <li>
                <NavLink
                  to='/signup'
                  className={({ isActive }) =>
                    isActive
                      ? activeLinkClass
                      : 'hover:text-turquoise-400 font-bold'
                  }
                >
                  회원가입
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
