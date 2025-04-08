import { useState } from 'react';

import { useAuthStore } from '@store/auth';

import { useUserProfile } from '@hooks/user/useUserProfile';

import Avatar from '@shared/base/Avatar';
import Button from '@shared/base/Button';

import EditProfile from './EditProfile';

function MyProfileTab() {
  const { user } = useAuthStore();
  const { data: userProfile } = useUserProfile(user?._id as string);
  console.log('🚀 ~ MyProfileTab ~ userProfile:', userProfile);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <div className='flex items-center gap-4'>
        {isEditing ? (
          <EditProfile
            profileImage={userProfile?.profileImage as string}
            nickname={userProfile?.nickname as string}
            introduction={userProfile?.introduction as string}
            onEditCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <Avatar size='lg' imageUrl={userProfile?.profileImage as string} />

            <div className='flex-1'>
              <h2 className='mb-1 text-xl font-semibold'>
                {userProfile?.nickname || '아무진 왕자'}
              </h2>
              <p className='mb-3 text-gray-600'>
                {userProfile?.introduction || '한줄 자기소개를 작성해보세요.'}
              </p>
            </div>
          </>
        )}
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant='outline'
            size='sm'
          >
            프로필 편집
          </Button>
        )}
      </div>
    </div>
  );
}

export default MyProfileTab;
