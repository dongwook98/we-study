import { useState } from 'react';

import { Link } from 'react-router';

import { useSignup } from '@hooks/auth/useSignup';

import Button from '@shared/base/Button';
import Input from '@shared/base/Input';

function Form() {
  const { mutate } = useSignup();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log('🚀 ~ Form ~ errors:', errors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 영문자와 숫자를 포함해야 합니다.';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // Nickname validation
    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      newErrors.nickname = '닉네임은 2자 이상 20자 이하여야 합니다.';
    } else if (!/^[A-Za-z0-9가-힣_]+$/.test(formData.nickname)) {
      newErrors.nickname =
        '닉네임은 한글, 영문, 숫자, 언더스코어(_)만 사용 가능합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    mutate(formData);
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      {errors.form && (
        <div className='p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm'>
          {errors.form}
        </div>
      )}

      <div className='space-y-5'>
        <Input
          label='이메일'
          id='email-address'
          name='email'
          type='email'
          autoComplete='email'
          required
          placeholder='이메일 주소'
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label='비밀번호'
          id='password'
          name='password'
          type='password'
          autoComplete='new-password'
          required
          placeholder='비밀번호'
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText='8자 이상, 영문자와 숫자를 포함해야 합니다.'
        />

        <Input
          label='비밀번호 확인'
          id='confirm-password'
          name='confirmPassword'
          type='password'
          autoComplete='new-password'
          required
          placeholder='비밀번호 확인'
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Input
          label='닉네임'
          id='nickname'
          name='nickname'
          type='text'
          autoComplete='nickname'
          required
          placeholder='닉네임'
          value={formData.nickname}
          onChange={handleChange}
          error={errors.nickname}
          helperText='2-20자, 한글, 영문, 숫자, 언더스코어(_)만 사용 가능'
        />
      </div>

      <div>
        <Button type='submit' variant='primary' fullWidth>
          회원가입
        </Button>
      </div>

      <div className='text-center text-sm'>
        <span className='text-gray-600'>이미 계정이 있으신가요?</span>{' '}
        <Link
          to='/login'
          className='font-medium text-blue-600 hover:text-blue-500'
        >
          로그인
        </Link>
      </div>
    </form>
  );
}

export default Form;
