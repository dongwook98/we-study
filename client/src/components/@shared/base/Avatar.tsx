import classNames from 'classnames';
import { ImagePlusIcon } from 'lucide-react';

import defaultAvatar from '@icons/default-avatar.png';

interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg';
  mode?: 'edit' | 'default';
  imageUrl?: string;
}

function Avatar({ size = 'md', mode = 'default', imageUrl }: AvatarProps) {
  const baseStyles =
    'rounded-full overflow-hidden border border-gray-300 bg-gray-200 flex items-center justify-center';

  const sizeStyles = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className='relative inline-block'>
      {' '}
      {/* 다른 요소와의 배치를 위해 inline-block 사용 */}
      {/* 프로필 이미지 표시 영역 */}
      <div className={classNames(sizeStyles[size], baseStyles)}>
        <img
          src={imageUrl || defaultAvatar}
          alt='프로필 이미지'
          className='h-full w-full object-cover' // 이미지가 영역을 꽉 채우도록 object-cover 사용
        />
      </div>
      {/* 편집 버튼 (카메라 아이콘) - label 사용 */}
      {mode === 'edit' && (
        <>
          <label
            htmlFor='profileImageInput'
            className='group absolute right-0.5 bottom-0.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white shadow-md transition-colors hover:bg-gray-100'
          >
            <ImagePlusIcon size={16} />
          </label>
          <input
            type='file'
            id='profileImageInput'
            // ref={fileInputRef}
            accept='image/*' // 이미지 파일만 받도록 설정
            // onChange={handleFileChange}
            hidden
          />
        </>
      )}
    </div>
  );
}

export default Avatar;
