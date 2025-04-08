import apiClient from '../apiClient';

export const postLogout = async () => {
  return apiClient.post('/auth/logout', {});
};
