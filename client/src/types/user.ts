export interface User {
  _id: string;
  nickname: string;
  email: string;
  profileImage: string | null;
  introduction: string;
  mannerTemperature: number;
  accessToken: string;
}
