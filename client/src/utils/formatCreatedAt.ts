import { format } from 'date-fns';

export const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}분 전`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}시간 전`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days}일 전`;
  }

  return format(date, 'yyyy-MM-dd');
};
