export interface ApiError {
  statusCode: number;
  message: string;
}

export interface User {
  name: string;
  email: string;
  userId: string;
  avatarUrl: string;
}
