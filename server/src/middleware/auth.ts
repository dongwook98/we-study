import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 헤더에서 토큰 가져오기
      token = req.headers.authorization.split(' ')[1];

      // 토큰 검증
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as DecodedToken;

      // 토큰에서 사용자 정보 가져오기
      const user = await User.findById(decoded.id).select(
        '-password -refreshToken'
      );

      if (!user) {
        return res.status(401).json({ message: '사용자를 찾을 수 없습니다' });
      }

      // 타입 안전성이 향상된 사용자 객체 할당
      req.user = {
        _id: user._id,
        email: user.email,
        nickname: user.nickname,
        profileImage: user.profileImage,
        introduction: user.introduction,
        mannerTemperature: user.mannerTemperature,
      };

      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: '토큰이 만료되었습니다',
          isExpired: true,
        });
      }

      console.error(error);
      return res
        .status(401)
        .json({ message: '인증 실패, 토큰이 유효하지 않습니다' });
    }
  } else {
    return res.status(401).json({ message: '인증 실패, 토큰이 없습니다' });
  }
};
