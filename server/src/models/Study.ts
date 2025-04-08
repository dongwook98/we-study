import mongoose, { Document, Schema } from 'mongoose';

const studyCategories = [
  'development_it',
  'language_learning',
  'career_development',
  'certification_exam',
  'finance_investment',
  'hobby_culture',
  'etc',
] as const;
export type StudyCategory = (typeof studyCategories)[number];

const studyRegions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
] as const;
export type StudyRegion = (typeof studyRegions)[number];

const studyTypes = ['online', 'offline', 'hybrid'] as const;
export type StudyType = (typeof studyTypes)[number];

const studyLevels = ['beginner', 'intermediate', 'advanced'] as const;
export type StudyLevel = (typeof studyLevels)[number];

const studyStatuses = ['open', 'in_progress', 'closed'] as const;
export type StudyStatus = (typeof studyStatuses)[number];

export interface IStudy extends Document {
  /**
   * 스터디 제목
   */
  title: string;
  
  /**
   * 스터디 설명
   * 최대 1000자까지 작성 가능
   */
  description: string;
  
  /**
   * 스터디 카테고리
   * @example 'development_it', 'language_learning', 'career_development'
   */
  category: StudyCategory;
  
  /**
   * 최대 참가자 수
   * 2명 이상 100명 이하로 설정 가능
   */
  maxParticipants: number;
  
  /**
   * 현재 참가자 수
   * 기본값은 1명(스터디 생성자)
   */
  currentParticipants: number;
  
  /**
   * 스터디 리더의 사용자 ID
   */
  leader: mongoose.Types.ObjectId;
  
  /**
   * 스터디 참가자들의 사용자 ID 배열
   */
  participants: mongoose.Types.ObjectId[];
  
  /**
   * 스터디 시작 날짜
   * 현재 날짜 이후여야 함
   */
  startDate: Date;
  
  /**
   * 스터디 종료 날짜
   * 시작 날짜 이후여야 함
   */
  endDate: Date;
  
  /**
   * 스터디 진행 방식
   * @example 'online', 'offline', 'hybrid'
   */
  studyType: StudyType;
  
  /**
   * 스터디 난이도
   * @example 'beginner', 'intermediate', 'advanced'
   */
  studyLevel: StudyLevel;
  
  /**
   * 모집 상태
   * @example 'open', 'in_progress', 'closed'
   */
  status: StudyStatus;
  
  /**
   * 스터디 관련 태그
   * 최대 10개까지 추가 가능
   * @example ['코딩테스트', '취업준비']
   */
  tags: string[];
  
  /**
   * 썸네일 이미지 URL
   */
  thumbnail?: string;
  
  /**
   * 광역시도
   * 오프라인/하이브리드 스터디인 경우 필수
   * @example '서울특별시'
   */
  region?: StudyRegion;
  
  /**
   * 상세 스터디 주소
   * 오프라인/하이브리드 스터디인 경우 필수
   * @example '서울특별시 강남구 행복 카페'
   */
  location?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const studySchema = new Schema<IStudy>(
  {
    title: {
      type: String,
      required: [true, '제목은 필수 항목입니다'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, '설명은 필수 항목입니다'],
      maxlength: [1000, '설명은 1000자를 초과할 수 없습니다'],
    },
    category: {
      type: String,
      required: [true, '카테고리는 필수 항목입니다'],
      enum: {
        values: studyCategories,
        message: '유효하지 않은 카테고리입니다',
      },
      trim: true,
    },
    maxParticipants: {
      type: Number,
      required: [true, '최대 참가자 수는 필수 항목입니다'],
      default: 10,
      min: [2, '최대 참가자 수는 최소 2명 이상이어야 합니다'],
      max: [100, '최대 참가자 수는 100명을 초과할 수 없습니다'],
    },
    currentParticipants: {
      type: Number,
      default: 1,
      min: [1, '현재 참가자 수는 최소 1명 이상이어야 합니다'],
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '스터디 리더는 필수 항목입니다'],
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    startDate: {
      type: Date,
      required: [true, '시작 날짜는 필수 항목입니다'],
      validate: {
        validator: function(this: IStudy, value: Date) {
          return value >= new Date();
        },
        message: '시작 날짜는 현재 날짜 이후여야 합니다',
      },
    },
    endDate: {
      type: Date,
      required: [true, '종료 날짜는 필수 항목입니다'],
      validate: {
        validator: function(this: IStudy, value: Date) {
          return this.startDate && value > this.startDate;
        },
        message: '종료 날짜는 시작 날짜 이후여야 합니다',
      },
    },
    studyType: { 
      type: String, 
      enum: {
        values: studyTypes,
        message: '유효하지 않은 스터디 타입입니다',
      },
      required: [true, '스터디 타입은 필수 항목입니다'],
    },
    studyLevel: { 
      type: String, 
      enum: {
        values: studyLevels,
        message: '유효하지 않은 스터디 레벨입니다',
      },
      required: [true, '스터디 레벨은 필수 항목입니다'],
    },
    status: {
      type: String,
      enum: {
        values: studyStatuses,
        message: '유효하지 않은 스터디 상태입니다',
      },
      required: true,
      default: 'open',
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags: string[]) {
          return tags.length <= 10;
        },
        message: '태그는 최대 10개까지만 추가할 수 있습니다',
      },
    },
    thumbnail: {
      type: String,
      default: '',
    },
    // 오프라인이면 location 필수
    location: {
      type: String,
      required: function (this: IStudy) {
        return this.studyType === 'offline' || this.studyType === 'hybrid';
      },
      validate: {
        validator: function(this: IStudy, value: string) {
          if (this.studyType === 'offline' || this.studyType === 'hybrid') {
            return value && value.length > 0;
          }
          return true;
        },
        message: '오프라인/하이브리드 스터디는 상세 주소가 필요합니다',
      },
    },
    // 오프라인이면 region 필수
    region: {
      type: String,
      enum: {
        values: studyRegions,
        message: '유효하지 않은 지역입니다',
      },
      required: function (this: IStudy) {
        return this.studyType === 'offline' || this.studyType === 'hybrid';
      },
      validate: {
        validator: function(this: IStudy, value: string) {
          if (this.studyType === 'offline' || this.studyType === 'hybrid') {
            return value && value.length > 0;
          }
          return true;
        },
        message: '오프라인/하이브리드 스터디는 지역(광역시도) 정보가 필요합니다',
      },
    },
  },
  {
    timestamps: true,
  }
);

// 검색 성능 향상을 위한 인덱스 추가
studySchema.index({ category: 1 });
studySchema.index({ studyType: 1 });
studySchema.index({ region: 1 });
studySchema.index({ status: 1 });
studySchema.index({ tags: 1 });
studySchema.index({ startDate: 1 });
studySchema.index({ leader: 1 });

const Study = mongoose.model<IStudy>('Study', studySchema);

export default Study;
