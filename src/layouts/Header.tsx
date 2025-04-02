import { Link, NavLink } from 'react-router';

function Header() {
  const activeLinkClass = 'font-bold text-primary';

  return (
    <header className='h-[60px] bg-bg text-text-black border-b-2 border-primary-sub sticky top-0'>
      <div className='container h-full mx-auto flex items-center justify-between'>
        {/* 로고 */}
        <div>
          <Link to='/'>
            <h1 className='font-bold text-xl'>We Study</h1>
          </Link>
        </div>

        {/* 내비게이션 */}
        <nav>
          <ul className='flex gap-x-6'>
            <li>
              <NavLink
                to='/study'
                end
                className={({ isActive }) =>
                  isActive ? activeLinkClass : 'hover:text-primary'
                }
              >
                스터디
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/study/new'
                className={({ isActive }) =>
                  isActive ? activeLinkClass : 'hover:text-primary'
                }
              >
                스터디 모집
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive ? activeLinkClass : 'hover:text-primary'
                }
              >
                로그인
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/signup'
                className={({ isActive }) =>
                  isActive ? activeLinkClass : 'hover:text-primary'
                }
              >
                회원가입
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
