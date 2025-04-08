import { useState } from 'react';

import Avatar from '@shared/base/Avatar';
import Button from '@shared/base/Button';
import Input from '@shared/base/Input';
import Textarea from '@shared/base/Textarea';

interface EditProfileProps {
  profileImage: string;
  nickname: string;
  introduction: string;
  onEditCancel: () => void;
}

function EditProfile({
  profileImage,
  nickname,
  introduction,
  onEditCancel,
}: EditProfileProps) {
  const [profileImageValue, setProfileImageValue] = useState(profileImage);
  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [introdunctionValue, setIntroductionValue] = useState(introduction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-y-6'>
      {/* 이미지 업로드 */}
      <div className='flex gap-4'>
        <div>
          <Avatar size='lg' mode='edit' />
        </div>

        <div className='flex-1'>
          {/* 닉네임 인풋 */}
          <Input
            id='nickname'
            name='nickname'
            value={nickname}
            placeholder='닉네임'
          />
          {/* 자기소개 */}
          <Textarea
            id='introduction'
            name='introduction'
            placeholder='자기소개'
          />
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <Button type='submit' variant='primary'>
          저장
        </Button>
        <Button type='button' onClick={onEditCancel} variant='outline'>
          취소
        </Button>
      </div>
    </form>
  );
}

export default EditProfile;
