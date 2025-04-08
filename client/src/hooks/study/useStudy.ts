import { useQuery } from '@tanstack/react-query';

import getStudies from '@apis/study/getStudies';

export default function useStudy() {
  return useQuery({
    queryKey: ['studies'],
    queryFn: () => getStudies(),
  });
}
