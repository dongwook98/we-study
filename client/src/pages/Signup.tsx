import Form from '@components/Signup/Form';

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
        <Form />
      </div>
    </div>
  );
}

export default SignupPage;
