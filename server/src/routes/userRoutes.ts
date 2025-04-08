import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// 대시보드 라우트 (보호됨)
// router.get('/dashboard', protect, getUserDashboard);

// 프로필 라우트
router.get('/profile/:id', getUserProfile); // 공개 - 누구나 프로필 볼 수 있음
router.put('/profile', protect, updateUserProfile); // 보호됨 - 인증된 사용자만 업데이트 가능

export default router;
