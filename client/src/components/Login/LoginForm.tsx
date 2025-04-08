import { useRef } from 'react';

import { useLogin } from '@hooks/auth/useLogin';

import Button from '@shared/base/Button';
import Input from '@shared/base/Input';

function LoginForm() {
  const { mutate, error, isPending } = useLogin();
  console.log('🚀 ~ LoginForm ~ isPending:', isPending);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      mutate({ email, password });
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit} ref={formRef}>
      <Input
        label='이메일'
        id='email-address'
        name='email'
        type='email'
        autoComplete='email'
        required
        placeholder='이메일 주소'
      />
      <Input
        label='비밀번호'
        id='password'
        name='password'
        type='password'
        autoComplete='password'
        required
        placeholder='비밀번호'
      />

      <Button
        type='submit'
        fullWidth
        variant='primary'
        isLoading={isPending}
        disabled={isPending}
      >
        로그인
      </Button>

      <div className='h-[24px]'>
        {error && <p className='text-red-500'>{error.message}</p>}
      </div>
    </form>
  );
}

export default LoginForm;
