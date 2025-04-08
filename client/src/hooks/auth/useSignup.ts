import { useNavigate } from 'react-router';

import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@store/auth';
import { useToastStore } from '@store/toastStore';

import { postSignup } from '@apis/auth/postSignup';

import { User } from '@AppTypes/user';

export function useSignup() {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (formData: {
      email: string;
      password: string;
      nickname: string;
    }) => postSignup(formData),
    onSuccess: (data) => {
      // zustand 유저 상태, 인증 상태 업데이트
      login(data.data as User);
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/');
      addToast({
        message:
          '회원가입에 성공했습니다. WeStudy에 회원이 되어주셔서 감사합니다.',
        type: 'success',
      });
    },
  });
}
