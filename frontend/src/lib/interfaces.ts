export interface ApiError {
  statusCode: number;
  message: string;
  context: string;
}

export interface User {
  name: string;
  email: string;
  userId: string;
  avatarUrl: string;
}

export interface UserId {
  userId: string;
}

export interface Totals {
  totalClicks: number;
  totalUrls: number;
}

export interface ShortUrl {
  shortId: string;
  title: string;
  originalUrl: string;
  clicks: number;
  userId: string;
  createdAt: Date;
  Source: {
    name: string;
    clicks: number;
  }[];
}

export interface ShortId {
  shortId: string;
}
