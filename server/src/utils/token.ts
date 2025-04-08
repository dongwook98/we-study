import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

/**
 * 액세스 토큰 생성
 * @param userId 사용자 ID
 * @returns 생성된 액세스 토큰
 */
export const generateAccessToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1h', // 액세스 토큰 유효 기간: 1시간
  });
};

/**
 * 리프레시 토큰 생성
 * @param userId 사용자 ID
 * @returns 생성된 리프레시 토큰
 */
export const generateRefreshToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d', // 리프레시 토큰 유효 기간: 7일
  });
};
