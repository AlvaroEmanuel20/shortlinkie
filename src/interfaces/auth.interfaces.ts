export interface LoginData {
  email: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
