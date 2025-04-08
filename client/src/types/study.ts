export interface Study {
  _id: string;
  title: string;
  description: string;
  category: string;
  studyLevel: string;
  studyType: string;
  tags: string[];
  thumbnail: string;
  location: string;
  region: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  leader: {
    _id: string;
    profileImage: string;
    nickname: string;
  };
  participants: string[];
  currentParticipants: number;
  __v: number;
}
