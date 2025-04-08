import { useNavigate } from 'react-router';

import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toastStore';

import { postLogout } from '@apis/auth/postLogout';

export function useLogout() {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      // zustand store에서 로그아웃 처리
      logout();

      // 토스트 메시지 추가
      addToast({
        type: 'success',
        message: '로그아웃 되었습니다.',
      });

      // 로그아웃 후 홈으로 이동
      navigate('/');
    },
  });
}
