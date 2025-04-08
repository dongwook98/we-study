import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../../apis/user/getUserProfile';

export function useUserProfile(id: string) {
  return useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  });
}
