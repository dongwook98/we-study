import { Link } from 'react-router';
import GradientBanner from '../components/shared/GradientBanner';

function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <GradientBanner
        title='함께 성장하는 스터디, WeStudy에서 찾아보세요!'
        description='원하는 스터디를 찾거나 직접 생성하여 목표를 달성해보세요'
        CTA={
          <div className='max-w-6xl mx-auto text-center flex gap-6 justify-center'>
            <Link
              to='/study'
              className='inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all'
            >
              스터디 찾아보기
            </Link>
            <Link
              to='/study/new'
              className='inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all'
            >
              스터디 모집하기
            </Link>
          </div>
        }
      />

      {/* How It Works Section */}
      <section className='py-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>How it Works</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: '가입하기', desc: '간단한 회원가입으로 시작하세요' },
              {
                title: '스터디 찾기/생성',
                desc: '원하는 스터디를 찾거나 직접 생성하세요',
              },
              { title: '참여하기', desc: '스터디에 참여하여 함께 학습하세요' },
            ].map((step, index) => (
              <div key={index} className='p-6 bg-white rounded-xl shadow-lg'>
                <div className='text-blue-600 mb-4'>
                  <svg
                    className='w-12 h-12'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M6 2a1 1 0 00-.707 1.707L6 4.414v4.647a6 6 0 01-.879 3.121l-1.027 1.628a.5.5 0 00.434.75h11.94a.5.5 0 00.434-.75l-1.027-1.628A6 6 0 0114 9.06V4.414l.707-.707A1 1 0 0014 2H6zm4 10.414a1 1 0 00-1 1v.586a1 1 0 102 0v-.586a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                <p className='text-gray-600'>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-gray-50 py-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            WeStudy의 장점
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[
              {
                title: '다양한 분야',
                desc: '개발, 디자인, 언어 학습 등 다양한 분야의 스터디',
              },
              {
                title: '체계적인 관리',
                desc: '스터디 진행을 위한 도구와 가이드 제공',
              },
              {
                title: '활발한 커뮤니티',
                desc: '열정적인 동료들과의 소통 기회',
              },
            ].map((feature, index) => (
              <div key={index} className='p-6 bg-white rounded-lg shadow-md'>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-gray-600'>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-16 px-4 bg-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>지금 바로 시작하세요</h2>
          <p className='text-gray-600 mb-8 text-lg'>
            목표를 달성할 동료들을 만나보세요
          </p>
          <div className='flex justify-center gap-4'>
            <a
              href='/signup'
              className='bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all'
            >
              무료로 가입하기
            </a>
            <a
              href='/studies'
              className='bg-gray-100 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all'
            >
              스터디 둘러보기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
