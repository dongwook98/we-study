import { STUDY_CATEGORIES, STUDY_REGIONS } from '@constants/study';

import Checkbox from '@shared/base/Checkbox';
import Input from '@shared/base/Input';
import Select from '@shared/base/Select';

function SearchSection() {
  return (
    <div className='flex flex-col gap-4'>
      <Select
        className='w-[200px]!'
        placeholder='지역을 선택하세요'
        options={STUDY_REGIONS}
      />
      <Input type='search' placeholder='관심 분야를 검색해보세요...' />
      <span className='text-xl font-semibold'>검색 필터</span>
      <Checkbox
        name='studyType'
        label='모집중인 스터디만 보기'
        onChange={(checked) => console.log(checked)}
      />

      <div>
        <p className='mb-2 font-semibold'>카테고리</p>
        <div className='flex flex-col gap-4'>
          {STUDY_CATEGORIES.map((category) => (
            <Checkbox
              key={category.value}
              name='category'
              label={category.label}
              onChange={(checked) => console.log(checked)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className='mb-2 font-semibold'>스터디 타입</p>
        <div className='flex flex-col gap-4'>
          <Checkbox
            name='studyType'
            label='온라인'
            onChange={(checked) => console.log(checked)}
          />
          <Checkbox name='studyType' label='오프라인' />
          <Checkbox name='studyType' label='혼합 (온라인 / 오프라인)' />
        </div>
      </div>

      <div>
        <p className='mb-2 font-semibold'>스터디 난이도</p>
        <div className='flex flex-col gap-4'>
          <Checkbox
            name='studyLevel'
            label='초급'
            onChange={(e, checked) => console.log(e.target.name, checked)}
          />
          <Checkbox name='studyLevel' label='중급' />
          <Checkbox name='studyLevel' label='고급' />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
