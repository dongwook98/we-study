import { Link } from 'react-router';

import SearchSection from '@components/StudyList/Search';
import StudyList from '@components/StudyList/StudyList';

import GradientBanner from '@shared/GradientBanner';
import Button from '@shared/base/Button';

function StudyListPage() {
  return (
    <>
      {/* Hero Section */}
      <GradientBanner
        title='참여 가능한 스터디'
        description='당신에게 맞는 스터디를 찾아보세요'
        CTA={
          <div>
            <Button variant='gradient' size='md'>
              <Link to='/study/new'>스터디 생성하기</Link>
            </Button>
          </div>
        }
      />

      <div className='container mx-auto mt-4 flex justify-center gap-x-6'>
        <SearchSection />
        <StudyList />
      </div>
    </>
  );
}

export default StudyListPage;
