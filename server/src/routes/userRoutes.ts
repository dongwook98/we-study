import express from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

// 회원가입 라우트
router.post('/signup', registerUser);

// 로그인 라우트
router.post('/login', loginUser);

// 토큰 갱신 라우트
router.post('/refresh-token', refreshToken);

// 로그아웃 라우트 (인증 필요)
router.post('/logout', protect, logoutUser);

export default router;