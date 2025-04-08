import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/responseUtils';

// @desc    사용자 프로필 조회
// @route   GET /api/users/profile/:id
// @access  Public
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password -refreshToken');
    if (user) {
      return successResponse(
        res,
        '사용자 프로필을 성공적으로 조회했습니다',
        user
      );
    } else {
      return errorResponse(res, '사용자를 찾을 수 없습니다', 404);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    사용자 프로필 수정
// @route   PUT /api/users/profile
// @access  Protected
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, '사용자를 찾을 수 없습니다', 404);
    }

    // 제공된 필드 업데이트
    if (req.body.nickname) user.nickname = req.body.nickname;
    if (req.body.profileImage !== undefined)
      user.profileImage = req.body.profileImage;
    if (req.body.introduction !== undefined)
      user.introduction = req.body.introduction;

    // 비밀번호가 제공된 경우에만 업데이트
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return successResponse(
      res,
      '사용자 프로필이 성공적으로 업데이트되었습니다',
      {
        _id: updatedUser._id,
        email: updatedUser.email,
        nickname: updatedUser.nickname,
        profileImage: updatedUser.profileImage,
        introduction: updatedUser.introduction,
        mannerTemperature: updatedUser.mannerTemperature,
      }
    );
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
