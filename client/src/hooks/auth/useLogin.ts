import { useNavigate } from 'react-router';

import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '@store/auth';

import { postLogin } from '@apis/auth/postLogin';

import { User } from '@AppTypes/user';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log('🚀 ~ useLogin ~ data:', data);
      login(data.data as User);
      navigate('/');
    },
    onError: (error) => {
      console.log('🚀 ~ useLogin ~ error:', error);
    },
  });
}
