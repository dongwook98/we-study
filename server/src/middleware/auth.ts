import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 헤더에서 토큰 가져오기
      token = req.headers.authorization.split(' ')[1];

      // 토큰 검증
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      // 토큰에서 사용자 정보 가져오기
      req.user = await User.findById(decoded.id).select('-password -refreshToken');

      next();
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: '토큰이 만료되었습니다',
          isExpired: true
        });
      }
      
      console.error(error);
      res.status(401).json({ message: '인증 실패, 토큰이 유효하지 않습니다' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '인증 실패, 토큰이 없습니다' });
  }
};