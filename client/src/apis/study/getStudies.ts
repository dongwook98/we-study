import { ApiResponse } from '../../types/api';
import { Study } from '../../types/study';
import apiClient from '../apiClient';

export default async function getStudies() {
  try {
    const data = await apiClient.get<ApiResponse<Study[]>>('/studies');

    return data.data;
  } catch (error) {
    console.error('Error fetching studies:', error);
  }
}
