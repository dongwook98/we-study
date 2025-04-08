import { useState } from 'react';

import { useAuthStore } from '@store/auth';

import ProfileTab from '@components/MyPage/ProfileTab';
import SideBar from '@components/MyPage/SideBar';
import StudyTab from '@components/MyPage/StudyTab';

function MyPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'studies':
        return <StudyTab />;
      case 'settings':
        return (
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>계정 설정</h2>
            <p className='text-gray-600'>
              계정 설정 및 개인정보 관리 옵션이 여기에 표시됩니다.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>마이페이지</h1>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Sidebar */}
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main content */}
        <div className='md:w-3/4'>{renderContent()}</div>
      </div>
    </div>
  );
}

export default MyPage;
