import { Link } from 'react-router';

import GradientBanner from '@shared/GradientBanner';
import Button from '@shared/base/Button';

function HomePage() {
  return (
    <>
      <GradientBanner
        title='함께 성장하는 스터디, WeStudy에서 찾아보세요!'
        description='원하는 스터디를 찾거나 직접 생성하여 목표를 달성해보세요'
        CTA={
          <div className='max-w-6xl mx-auto text-center flex gap-6 justify-center'>
            <Button variant='gradient' size='lg'>
              <Link to='/study'>스터디 찾아보기</Link>
            </Button>
            <Button variant='gradient' size='lg'>
              <Link to='/study/new'>스터디 모집하기</Link>
            </Button>
          </div>
        }
      />

      {/* 마감 임박 스터디 */}

      {/* 인기 스터디 */}
    </>
  );
}

export default HomePage;
