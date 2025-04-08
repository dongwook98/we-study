import { ApiResponse } from '../../types/api';
import { User } from '../../types/user';
import apiClient from '../apiClient';

export const postSignup = async (payload: {
  email: string;
  password: string;
  nickname: string;
}) => {
  return apiClient.post<ApiResponse<User>>('/auth/signup', payload);
};
