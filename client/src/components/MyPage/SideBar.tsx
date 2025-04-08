import { useAuthStore } from '@store/auth';

import { useLogout } from '@hooks/auth/useLogout';
import { useUserProfile } from '@hooks/user/useUserProfile';

import Button from '@shared/base/Button';

function SideBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { mutate } = useLogout();
  const { user } = useAuthStore();
  const { data: userProfile } = useUserProfile(user?._id as string);
  console.log('🚀 ~ userProfile:', userProfile);

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className='md:w-1/6'>
      <nav>
        <ul className='space-y-2'>
          <li>
            <Button
              variant={activeTab === 'profile' ? 'primary' : 'outline'}
              fullWidth
              className='justify-start font-bold!'
              onClick={() => setActiveTab('profile')}
            >
              프로필
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'studies' ? 'primary' : 'outline'}
              fullWidth
              className='justify-start font-bold!'
              onClick={() => setActiveTab('studies')}
            >
              내 스터디
            </Button>
          </li>
          <li>
            <Button
              variant={activeTab === 'settings' ? 'primary' : 'outline'}
              fullWidth
              className='justify-start font-bold!'
              onClick={() => setActiveTab('settings')}
            >
              계정 설정
            </Button>
          </li>
          <li className='border-border mt-4 border-t pt-4'>
            <Button
              variant='outline'
              fullWidth
              className='justify-start font-bold!'
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
