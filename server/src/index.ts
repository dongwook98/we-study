import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import studyRoutes from './routes/studyRoutes';
import cookieParser from 'cookie-parser';
import { errorResponse } from './utils/responseUtils';

// 환경 변수 로드
dotenv.config();

// 데이터베이스 연결
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
// CORS 설정 - 다른 도메인에서의 API 요청 허용
app.use(cors());
// JSON 파싱 - 요청 본문을 JSON으로 파싱
app.use(express.json());
// URL 인코딩 - HTML 폼 데이터 파싱
app.use(express.urlencoded({ extended: false }));
// 쿠키 파싱 - 리프레시 토큰을 위한 쿠키 처리
app.use(cookieParser());

// 라우트
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/studies', studyRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API가 실행 중입니다...');
});

// 404 에러 처리 - 요청한 리소스가 없을 때
app.use((req: Request, res: Response) => {
  return errorResponse(res, '요청한 리소스를 찾을 수 없습니다', 404);
});

// 글로벌 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  console.error(err.stack);
  return errorResponse(res, '서버 오류가 발생했습니다', 500);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다`);
});
