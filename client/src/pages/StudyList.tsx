import GradientBanner from '../components/shared/GradientBanner';

function StudyListPage() {
  const studies = [
    {
      id: 1,
      title: 'React 심화 스터디',
      category: '프론트드',
      currentMembers: 3,
      maxMembers: 5,
      startDate: '2025-04-10',
      duration: '8주',
      meeting: '주 2회 온라인',
      tags: ['초급자 환영', '포트리오 제작'],
    },
    {
      id: 2,
      title: 'AWS 루션 아키트',
      category: '백드',
      currentMembers: 2,
      maxMembers: 4,
      startDate: '2025-04-15',
      duration: '6주',
      meeting: '주 1회 오프라인',
      tags: ['자격증 준비', '실습 중심'],
    },
    {
      id: 3,
      title: '영어 회화 마스터',
      category: '언어',
      currentMembers: 5,
      maxMembers: 5,
      startDate: '2025-04-12',
      duration: '10주',
      meeting: '매일 온라인',
      tags: ['초중급', '토플 준비'],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <GradientBanner
        title='참여 가능한 스터디'
        description='당신에게 맞는 스터디를 찾아보세요'
      />
      <div>
        <input
          type='text'
          placeholder='관심 분야를 검색해보세요...'
          className='w-full px-6 py-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white'
        />
      </div>

      {/* Filter Section */}
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='flex flex-wrap gap-4 mb-8'>
          {['전체', '프론트드', '백드', '디자인', '언어'].map((category) => (
            <button
              key={category}
              className='px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors'
            >
              {category}
            </button>
          ))}
        </div>

        {/* Study List Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {studies.map((study) => (
            <div
              key={study.id}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow'
            >
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full'>
                    {study.category}
                  </span>
                  <span className='text-sm text-gray-500'>
                    {study.currentMembers}/{study.maxMembers}명
                  </span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{study.title}</h3>
                <div className='space-y-2 mb-4'>
                  <p className='flex items-center text-gray-600'>
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z' />
                    </svg>
                    {study.startDate} 시작
                  </p>
                  <p className='flex items-center text-gray-600'>
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {study.duration} 과정
                  </p>
                  <p className='flex items-center text-gray-600'>
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                    </svg>
                    {study.meeting}
                  </p>
                </div>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className='text-sm bg-gray-100 px-2 py-1 rounded'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  className={`w-full py-2 rounded-lg font-medium ${
                    study.currentMembers === study.maxMembers
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}
                  disabled={study.currentMembers === study.maxMembers}
                >
                  {study.currentMembers === study.maxMembers
                    ? '모집 완료'
                    : '여하기'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudyListPage;
