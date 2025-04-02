import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import studyRoutes from './routes/studyRoutes';

// 환경 변수 로드
dotenv.config();

// 데이터베이스 연결
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우트
app.use('/api/users', userRoutes);
app.use('/api/studies', studyRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API가 실행 중입니다...');
});

// 404 에러 처리 - 요청한 리소스가 없을 때
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: '요청한 리소스를 찾을 수 없습니다' });
});

// 글로벌 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: '서버 오류가 발생했습니다',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다`);
});
