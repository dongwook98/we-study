import express from 'express';
import {
  createStudy,
  getStudies,
  getStudyById,
  updateStudy,
  deleteStudy,
  joinStudy,
  leaveStudy,
} from '../controllers/studyController';
import { protect } from '../middleware/auth';

const router = express.Router();

// 공개 라우트
router.get('/', getStudies);
router.get('/:id', getStudyById);

// 인증 필요 라우트
router.post('/', protect, createStudy);
router.put('/:id', protect, updateStudy);
router.delete('/:id', protect, deleteStudy);
router.post('/:id/join', protect, joinStudy);
router.post('/:id/leave', protect, leaveStudy);

export default router;