import useStudy from '@hooks/study/useStudy';

import { formatCreatedAt } from '@utils/formatCreatedAt';

import Avatar from '@shared/base/Avatar';

function StudyList() {
  const { data: studies } = useStudy();
  console.clear();
  console.log('🚀 ~ StudyList ~ studies:', studies);

  return (
    <ul className='flex-1 flex flex-col gap-2'>
      {studies?.map((study) => (
        <li
          key={study._id}
          className='bg-bg-card shadow-sm rounded hover:shadow-md transition-shadow p-4'
        >
          {/* 리스트 헤딩 */}
          <div className='flex items-center justify-between mb-4'>
            {/* 스터디 리더 정보*/}
            <div className='flex items-center gap-x-2'>
              <Avatar imageUrl={study.leader.profileImage} size='xs' />
              <span className='sub-text'>{study.leader.nickname}</span>
              <span className='meta-text'>
                {formatCreatedAt(study.createdAt)}
              </span>
            </div>
            <span className='sub-text'>
              전체 {study.maxParticipants}명 중에 {study.currentParticipants}명
              참여중
            </span>
          </div>

          <h3 className='text-xl font-semibold mb-2'>{study.title}</h3>

          {/* 태그 섹션 */}
          <div className='flex flex-wrap gap-2'>
            {study.tags.map((tag) => (
              <span
                key={tag}
                className='text-sm border-primary border-1 px-2 py-1 rounded-md'
              >
                #{tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default StudyList;
