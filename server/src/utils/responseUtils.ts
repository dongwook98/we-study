import { Response } from 'express';

/**
 * 성공 응답을 생성하는 함수
 */
export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * 실패 응답을 생성하는 함수
 */
export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 400
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
