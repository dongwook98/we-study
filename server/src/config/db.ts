import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB 연결 성공: ${conn.connection.host}`);
  } catch (error) {
    console.error(
      `MongoDB 연결 실패, 에러: ${
        error instanceof Error ? error.message : '알 수 없는 오류'
      }`
    );
    process.exit(1);
  }
};

export default connectDB;
