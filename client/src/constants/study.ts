export const CATEGORY_MAP: Record<string, string> = {
  development_it: '개발 & IT',
  language_learning: '언어 학습',
  career_development: '취업 & 자기계발',
  certification_exam: '자격증 & 시험 대비',
  finance_investment: '금융 & 투자',
  hobby_culture: '취미 & 문화',
  etc: '기타',
};

export const STUDY_CATEGORIES = [
  { value: 'development_it', label: '개발 & IT' },
  { value: 'language_learning', label: '외국어 학습' },
  { value: 'career_development', label: '취업 & 자기계발' },
  { value: 'certification_exam', label: '자격증 & 시험 대비' },
  { value: 'finance_investment', label: '금융 & 투자' },
  { value: 'hobby_culture', label: '취미 & 문화' },
  { value: 'etc', label: '기타' },
];

export const STUDY_REGIONS = [
  { value: '서울특별시', label: '서울특별시' },
  { value: '부산광역시', label: '부산광역시' },
  { value: '대구광역시', label: '대구광역시' },
  { value: '인천광역시', label: '인천광역시' },
  { value: '광주광역시', label: '광주광역시' },
  { value: '대전광역시', label: '대전광역시' },
  { value: '울산광역시', label: '울산광역시' },
  { value: '세종특별자치시', label: '세종특별자치시' },
  { value: '경기도', label: '경기도' },
  { value: '강원도', label: '강원도' },
  { value: '충청북도', label: '충청북도' },
  { value: '충청남도', label: '충청남도' },
  { value: '전라북도', label: '전라북도' },
  { value: '전라남도', label: '전라남도' },
  { value: '경상북도', label: '경상북도' },
  { value: '경상남도', label: '경상남도' },
  { value: '제주특별자치도', label: '제주특별자치도' },
];

export const STUDY_TYPES = [
  { value: 'online', label: '온라인' },
  { value: 'offline', label: '오프라인' },
  {
    value: 'hybrid',
    label: '혼합 (온라인 & 오프라인)',
  },
];
