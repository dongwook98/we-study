import { Link } from 'react-router';

function LoginPage() {
  return (
    <div className='fixed inset-0 bg-opacity-50 backdrop-blur-[2px] flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-md relative p-8'>
        {/* Close Button */}
        <button className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Login Content */}
        <div className='space-y-6'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900'>WeStudy</h2>
            <p className='mt-2 text-gray-600'>로그인</p>
          </div>

          <form className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                이메일
              </label>
              <input
                type='email'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='email@example.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                비밀번호
              </label>
              <input
                type='password'
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='••••••••'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
            >
              로그인
            </button>
          </form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>간편 로그인</span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <button className='flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors'>
              <svg className='w-5 h-5' viewBox='0 0 48 48'>
                <path
                  fill='#EA4335'
                  d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                />
                <path
                  fill='#4285F4'
                  d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
                />
                <path
                  fill='#FBBC05'
                  d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
                />
                <path
                  fill='#34A853'
                  d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                />
                <path fill='none' d='M0 0h48v48H0z' />
              </svg>
              <span>Google</span>
            </button>
            <button className='flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors'>
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <p className='text-center text-sm text-gray-600'>
            계정이 없으신가요?{' '}
            <Link
              to='/signup'
              className='text-blue-600 hover:text-blue-500 font-medium'
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
