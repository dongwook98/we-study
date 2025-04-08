import { STUDY_CATEGORIES, STUDY_REGIONS, STUDY_TYPES } from '@constants/study';

import GradientBanner from '@components/@shared/GradientBanner';
import Button from '@components/@shared/base/Button';
import Input from '@components/@shared/base/Input';
import Select from '@components/@shared/base/Select';
import Textarea from '@components/@shared/base/Textarea';

function StudyCreatePage() {
  return (
    <>
      {/* Hero Section */}
      <GradientBanner
        title='새로운 스터디 생성'
        description=' 함께 성장할 스터디를 직접 만들어보세요'
      />

      {/* Create Form Section */}
      <form className='max-w-4xl mx-auto px-4 py-12'>
        <div className='space-y-8'>
          {/* Study Title */}
          <Input label='스터디 이름' required placeholder='스터디 제목' />

          {/* Category & Study Type */}
          <div className='grid md:grid-cols-2 gap-6'>
            <Select required label='카테고리' options={STUDY_CATEGORIES} />
            <Select required label='스터디 유형' options={STUDY_TYPES} />
          </div>

          {/* Description */}
          <Textarea
            label='스터디 상세 설명'
            required
            placeholder='스터디 목표, 진행 방식 등을 상세히 작성해주세요'
            rows={5}
          />

          {/* Meeting Info */}
          <div className='grid md:grid-cols-2 gap-6'>
            <Select required label='모임 지역' options={STUDY_REGIONS} />
            <Input label='모임 장소' required placeholder='서울' />
            <Input label='모임 주기' required placeholder='주 2회' />
            <Input
              label='모집 인원'
              type='number'
              min='2'
              max='10'
              required
              placeholder='2~10명 사이로 입력 (숫자만 입력)'
            />
          </div>

          {/* Submit Button */}
          <Button variant='gradient' type='submit' fullWidth size='lg'>
            스터디 생성하기
          </Button>
        </div>
      </form>
    </>
  );
}

export default StudyCreatePage;
