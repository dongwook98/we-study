import GradientBanner from '../components/shared/GradientBanner';

function StudyCreatePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <GradientBanner
        title='새로운 스터디 생성'
        description=' 함께 성장할 스터디를 직접 만들어보세요'
      />

      {/* Create Form Section */}
      <div className='max-w-4xl mx-auto px-4 py-12'>
        <form className='bg-white rounded-xl shadow-lg p-8'>
          <div className='space-y-8'>
            {/* Study Title */}
            <div>
              <label className='block text-lg font-medium mb-2'>
                스터디 이름
              </label>
              <input
                type='text'
                required
                className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='예) React 심화 스터디'
              />
            </div>

            {/* Category & Study Type */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  카테고리
                </label>
                <select
                  required
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>선택해주세요</option>
                  <option>프론트엔드</option>
                  <option>백엔드</option>
                  <option>디자인</option>
                  <option>언어</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  스터디 유형
                </label>
                <select
                  required
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>선택해주세요</option>
                  <option>온라인</option>
                  <option>오프라인</option>
                  <option>혼합</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className='block text-lg font-medium mb-2'>
                상세 설명
              </label>
              <textarea
                required
                rows={5}
                className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                placeholder='스터디 목표, 진행 방식 등을 상세히 작성해주세요'
              />
            </div>

            {/* Meeting Info */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  모임 주기
                </label>
                <input
                  type='text'
                  required
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  placeholder='예) 주 2회'
                />
              </div>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  예상 기간
                </label>
                <input
                  type='text'
                  required
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  placeholder='예) 8주'
                />
              </div>
            </div>

            {/* Member & Tags */}
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  모집 인원
                </label>
                <input
                  type='number'
                  min='2'
                  max='10'
                  required
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  placeholder='2~10명 사이로 입력'
                />
              </div>
              <div>
                <label className='block text-lg font-medium mb-2'>
                  태그 설정
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500'
                  placeholder='엔터로 태그 추가 (예: #초급자환영 #포트폴리오)'
                />
                <div className='flex flex-wrap gap-2 mt-2'>
                  {['#온라인', '#주2회'].map((tag) => (
                    <span
                      key={tag}
                      className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              스터디 생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudyCreatePage;
