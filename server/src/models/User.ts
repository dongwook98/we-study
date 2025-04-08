import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  /**
   * 사용자 이메일 주소
   * 고유한 식별자로 사용됨
   */
  email: string;

  /**
   * 사용자 비밀번호
   * 저장 전에 bcrypt로 해싱됨
   */
  password: string;

  /**
   * 사용자 닉네임
   */
  nickname: string;

  /**
   * 프로필 이미지 URL
   */
  profileImage?: string;

  /**
   * 자기소개
   * 최대 200자까지 작성 가능
   */
  introduction?: string;

  /**
   * 매너 온도
   * 사용자의 신뢰도/평판을 나타내는 지표
   * 기본값: 36.5, 범위: 0-100
   */
  mannerTemperature: number;

  /**
   * JWT 리프레시 토큰
   * 자동 로그인 및 액세스 토큰 갱신에 사용
   */
  refreshToken?: string | null;

  createdAt: Date;
  updatedAt: Date;

  /**
   * 입력된 비밀번호와 저장된 해시 비밀번호를 비교
   * @param enteredPassword 사용자가 입력한 비밀번호
   * @returns 비밀번호 일치 여부
   */
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, '이메일은 필수 항목입니다'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        '유효한 이메일 주소를 입력해주세요',
      ],
    },
    password: {
      type: String,
      required: [true, '비밀번호는 필수 항목입니다'],
      minlength: [6, '비밀번호는 최소 6자 이상이어야 합니다'],
    },
    nickname: {
      type: String,
      required: [true, '닉네임은 필수 항목입니다'],
      trim: true,
      minlength: [2, '닉네임은 최소 2자 이상이어야 합니다'],
      maxlength: [20, '닉네임은 최대 20자까지 가능합니다'],
    },
    profileImage: { type: String, default: null },
    introduction: {
      type: String,
      maxlength: [200, '자기소개는 최대 200자까지 작성 가능합니다'],
      trim: true,
    },
    mannerTemperature: {
      type: Number,
      default: 36.5,
      min: [0, '매너 온도는 0도 미만이 될 수 없습니다'],
      max: [100, '매너 온도는 100도를 초과할 수 없습니다'],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// 비밀번호 저장 전 해싱
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
