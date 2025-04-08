import { Request, Response, NextFunction } from 'express';
import Study from '../models/Study';

/**
 * 스터디 리더 확인 미들웨어
 * 현재 로그인한 사용자가 해당 스터디의 리더인지 확인
 */
export const isStudyLeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studyId = req.params.id;

    // 타입 가드 추가
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: '인증되지 않은 사용자입니다' });
    }

    const userId = req.user._id;

    const study = await Study.findById(studyId);

    if (!study) {
      return res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }

    // 문자열 비교를 위해 toString() 사용
    if (study.leader.toString() !== userId.toString()) {
      return res.status(403).json({
        message: '스터디 리더만 이 작업을 수행할 수 있습니다',
      });
    }

    next();
  } catch (error) {
    console.error('스터디 리더 확인 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다' });
  }
};
