import express from 'express';
import {
  signUpUser,
  loginUser,
  logoutUser,
  refreshToken,
} from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// 공개 라우트
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

// 인증 필요 라우트
router.post('/logout', protect, logoutUser);

export default router;
