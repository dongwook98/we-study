import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// JWT 토큰 생성
// JWT 액세스 토큰 생성 (짧은 만료 시간)
const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '15m', // 15분 만료
  });
};

// JWT 리프레시 토큰 생성 (긴 만료 시간)
const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: '7d', // 7일 만료
  });
};

// @desc    새 사용자 등록 (회원가입)
// @route   POST /api/users/signup
// @access  Public
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, nickname } = req.body;

    // 필수 필드 확인
    if (!email || !password || !nickname) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요' });
    }

    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '유효한 이메일 주소를 입력해주세요' });
    }

    // 비밀번호 길이 확인
    if (password.length < 6) {
      return res.status(400).json({ message: '비밀번호는 최소 6자 이상이어야 합니다' });
    }

    // 사용자 존재 여부 확인
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: '이미 등록된 이메일입니다' });
    }

    // 사용자 생성
    const user = await User.create({
      email,
      password,
      nickname,
    });

    if (user) {
      // 토큰 생성
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      
      // 리프레시 토큰 저장
      user.refreshToken = refreshToken;
      await user.save();
      
      res.status(201).json({
        _id: user._id,
        email: user.email,
        nickname: user.nickname,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({ message: '유효하지 않은 사용자 데이터입니다' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    사용자 로그인
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 필수 필드 확인
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 모두 입력해주세요' });
    }

    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });

    // 사용자가 존재하지 않는 경우
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' });
    }

    // 비밀번호 확인
    const isPasswordMatch = await user.comparePassword(password);

    if (isPasswordMatch) {
      // 토큰 생성
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      
      // 리프레시 토큰 저장
      user.refreshToken = refreshToken;
      await user.save();
      
      res.json({
        _id: user._id,
        email: user.email,
        nickname: user.nickname,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    토큰 갱신
// @route   POST /api/users/refresh-token
// @access  Public
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ message: '리프레시 토큰이 필요합니다' });
    }
    
    // 리프레시 토큰 검증
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
      const user = await User.findById(decoded.id);
      
      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: '유효하지 않은 리프레시 토큰입니다' });
      }
      
      // 새 액세스 토큰 발급
      const accessToken = generateAccessToken(user._id);
      
      res.json({ accessToken });
    } catch (error) {
      return res.status(403).json({ message: '리프레시 토큰이 만료되었습니다. 다시 로그인해주세요' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    사용자 로그아웃
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 리프레시 토큰 무효화
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    
    res.json({ message: '로그아웃 성공' });
  } catch (error) {
    next(error);
  }
};