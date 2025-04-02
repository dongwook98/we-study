import { Request, Response, NextFunction } from 'express';
import Study, {
  StudyType,
  StudyCategory,
  StudyRegion,
  StudyLevel,
  StudyStatus,
} from '../models/Study';

// @desc    스터디 생성
// @route   POST /api/studies
// @access  Private
export const createStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      category,
      maxParticipants,
      startDate,
      endDate,
      studyType,
      studyLevel,
      status,
      tags,
      thumbnail,
      location,
      region,
    } = req.body;

    // 스터디 생성
    const study = await Study.create({
      title,
      description,
      category,
      maxParticipants: maxParticipants || 10,
      currentParticipants: 1,
      leader: req.user._id,
      participants: [req.user._id],
      startDate,
      endDate,
      studyType,
      studyLevel,
      status: status || 'open',
      tags: tags || [],
      thumbnail: thumbnail || '',
      location: location || '',
      region,
    });

    res.status(201).json(study);
  } catch (error: any) {
    // Mongoose 유효성 검사 오류 처리
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: messages[0] });
    }
    next(error);
  }
};

// @desc    모든 스터디 조회
// @route   GET /api/studies
// @access  Public
export const getStudies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studies = await Study.find({})
      .populate('leader', 'nickname email')
      .sort({ createdAt: -1 });
    res.json(studies);
  } catch (error) {
    next(error);
  }
};

// @desc    스터디 상세 조회
// @route   GET /api/studies/:id
// @access  Public
export const getStudyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const study = await Study.findById(req.params.id)
      .populate('leader', 'nickname email')
      .populate('participants', 'nickname email');

    if (study) {
      res.json(study);
    } else {
      res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    스터디 수정
// @route   PUT /api/studies/:id
// @access  Private
export const updateStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      category,
      maxParticipants,
      startDate,
      endDate,
      studyType,
      studyLevel,
      status,
      tags,
      thumbnail,
      location,
      region,
    } = req.body;

    const study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }

    // 스터디 리더만 수정 가능
    if (study.leader.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: '스터디 리더만 수정할 수 있습니다' });
    }

    // 스터디 정보 업데이트
    study.title = title || study.title;
    study.description = description || study.description;
    study.category = (category as StudyCategory) || study.category;
    study.maxParticipants = maxParticipants || study.maxParticipants;
    study.startDate = startDate || study.startDate;
    study.endDate = endDate || study.endDate;
    study.studyType = (studyType as StudyType) || study.studyType;
    study.studyLevel = (studyLevel as StudyLevel) || study.studyLevel;

    if (status) {
      study.status = status as StudyStatus;
    }

    if (tags) {
      study.tags = tags;
    }

    if (thumbnail !== undefined) {
      study.thumbnail = thumbnail;
    }

    study.location = location !== undefined ? location : study.location;
    study.region = (region as StudyRegion) || study.region;

    const updatedStudy = await study.save();
    res.json(updatedStudy);
  } catch (error: any) {
    // Mongoose 유효성 검사 오류 처리
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: messages[0] });
    }
    next(error);
  }
};

// @desc    스터디 삭제
// @route   DELETE /api/studies/:id
// @access  Private
export const deleteStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }

    // 스터디 리더만 삭제 가능
    if (study.leader.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: '스터디 리더만 삭제할 수 있습니다' });
    }

    await Study.deleteOne({ _id: req.params.id });
    res.json({ message: '스터디가 삭제되었습니다' });
  } catch (error) {
    next(error);
  }
};

// @desc    스터디 참가
// @route   POST /api/studies/:id/join
// @access  Private
export const joinStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }

    // 이미 참가한 경우
    if (
      study.participants.some(
        (participant) => participant.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json({ message: '이미 참가한 스터디입니다' });
    }

    // 정원 초과 확인
    if (study.currentParticipants >= study.maxParticipants) {
      return res.status(400).json({ message: '스터디 정원이 초과되었습니다' });
    }

    // 참가자 추가
    study.participants.push(req.user._id);
    study.currentParticipants += 1;

    const updatedStudy = await study.save();
    res.json(updatedStudy);
  } catch (error) {
    next(error);
  }
};

// @desc    스터디 탈퇴
// @route   POST /api/studies/:id/leave
// @access  Private
export const leaveStudy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const study = await Study.findById(req.params.id);

    if (!study) {
      return res.status(404).json({ message: '스터디를 찾을 수 없습니다' });
    }

    // 리더는 탈퇴할 수 없음
    if (study.leader.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: '스터디 리더는 탈퇴할 수 없습니다' });
    }

    // 참가하지 않은 경우
    if (
      !study.participants.some(
        (participant) => participant.toString() === req.user._id.toString()
      )
    ) {
      return res.status(400).json({ message: '참가하지 않은 스터디입니다' });
    }

    // 참가자 제거
    study.participants = study.participants.filter(
      (participant) => participant.toString() !== req.user._id.toString()
    );
    study.currentParticipants -= 1;

    const updatedStudy = await study.save();
    res.json(updatedStudy);
  } catch (error) {
    next(error);
  }
};
