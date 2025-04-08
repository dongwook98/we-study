import { ApiResponse } from '../../types/api';
import { User } from '../../types/user';
import apiClient from '../apiClient';

export const postLogin = async (payload: {
  email: string;
  password: string;
}) => {
  return apiClient.post<ApiResponse<User>>('/auth/login', payload);
};
