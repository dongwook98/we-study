import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { successResponse, errorResponse } from '../utils/responseUtils';

// @desc    새 사용자 등록 (회원가입)
// @route   POST /api/auth/signup
// @access  Public
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, nickname } = req.body;

    // 이미 존재하는 사용자인지 확인
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, '이미 등록된 이메일입니다', 400);
    }

    // 사용자 생성
    const user = await User.create({
      email,
      password,
      nickname,
      profileImage: req.body.profileImage || null,
      introduction: req.body.introduction || '',
    });

    if (user) {
      // 토큰 생성
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // 리프레시 토큰 저장
      user.refreshToken = refreshToken;
      await user.save();

      // 리프레시 토큰을 HTTP-only 쿠키에 저장
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS에서만 쿠키 전송
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
      });

      return successResponse(
        res,
        '회원가입이 성공적으로 완료되었습니다',
        {
          _id: user._id,
          email: user.email,
          nickname: user.nickname,
          accessToken,
        },
        201
      );
    } else {
      return errorResponse(res, '유효하지 않은 사용자 정보입니다', 400);
    }
  } catch (error: any) {
    // 유효성 검사 오류 처리
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return errorResponse(res, messages[0], 400);
    }
    next(error);
  }
};

// @desc    사용자 로그인
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // 이메일로 사용자 찾기
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(
        res,
        '이메일 또는 비밀번호가 일치하지 않습니다',
        401
      );
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(
        res,
        '이메일 또는 비밀번호가 일치하지 않습니다',
        401
      );
    }

    // 토큰 생성
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // 리프레시 토큰 저장
    user.refreshToken = refreshToken;
    await user.save();

    // 리프레시 토큰을 HTTP-only 쿠키에 저장
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    return successResponse(res, '로그인이 성공적으로 완료되었습니다', {
      _id: user._id,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,
      introduction: user.introduction,
      mannerTemperature: user.mannerTemperature,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    사용자 로그아웃
// @route   POST /api/auth/logout
// @access  Protected
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // 쿠키에서 리프레시 토큰 제거
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return successResponse(res, '로그아웃 되었습니다', null);
  } catch (error) {
    next(error);
  }
};

// @desc    액세스 토큰 갱신
// @route   POST /api/auth/refresh-token
// @access  Protected
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 쿠키에서 리프레시 토큰 가져오기
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return errorResponse(res, '리프레시 토큰이 필요합니다', 401);
    }

    // 이 리프레시 토큰을 가진 사용자 찾기
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return errorResponse(res, '유효하지 않은 리프레시 토큰입니다', 401);
    }

    // 리프레시 토큰 검증
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      // 유효하지 않은 리프레시 토큰 제거
      user.refreshToken = null;
      await user.save();
      return errorResponse(
        res,
        '만료되거나 유효하지 않은 리프레시 토큰입니다',
        401
      );
    }

    // 새 토큰 생성
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // 데이터베이스에 리프레시 토큰 업데이트
    user.refreshToken = newRefreshToken;
    await user.save();

    // 새 리프레시 토큰을 쿠키에 저장
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    return successResponse(res, '액세스 토큰이 성공적으로 갱신되었습니다', {
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};
