import { ApiResponse } from '../../types/api';
import { User } from '../../types/user';
import apiClient from '../apiClient';

export async function getUserProfile(userId: string) {
  const data = await apiClient.get<ApiResponse<User>>(
    `/users/profile/${userId}`
  );

  return data.data;
}
