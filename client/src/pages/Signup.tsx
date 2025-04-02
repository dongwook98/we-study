function SignupPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8'>
        <div>
          <h2 className='mt-2 text-center text-3xl font-extrabold text-gray-900'>
            회원가입
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            We Study와 함께 성장하세요
          </p>
        </div>
        <form className='mt-8 space-y-6'>
          <div className='space-y-5'>
            <div>
              <label
                htmlFor='email-address'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                이메일
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='이메일 주소'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                비밀번호
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='비밀번호'
              />
            </div>

            <div>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                비밀번호 확인
              </label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='비밀번호 확인'
              />
            </div>

            <div>
              <label
                htmlFor='nickname'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                닉네임
              </label>
              <input
                id='nickname'
                name='nickname'
                type='text'
                autoComplete='nickname'
                required
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='닉네임'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm'
            >
              회원가입
            </button>
          </div>

          <div className='text-center text-sm'>
            <span className='text-gray-600'>이미 계정이 있으신가요?</span>{' '}
            <a
              href='/login'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              로그인
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
