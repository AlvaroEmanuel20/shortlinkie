export type ApiError = {
  statusCode: number;
  message: string;
  context: string;
};

export type User = {
  name: string;
  email: string;
  userId: string;
  avatarUrl?: string;
  isVerified: boolean;
};

export type QrConfigId = {
  configId: string;
  userId: string;
};

export type QrConfig = {
  configId: string;
  color?: string;
  size?: number;
  logo?: string;
  userId: string;
};

export interface UserId {
  userId: string;
}

export interface UserIdSentMail extends UserId {
  sentMail: boolean;
}

export type ShortUrl = {
  shortId: string;
  title: string;
  originalUrl: string;
  userId: string;
  createdAt: Date;
  _count: {
    clicks: number;
  };
};

export type Click = {
  clickId: string;
  source?: string;
  isQrCode: boolean;
  shortId: string;
  createdAt: Date;
};

export type ClicksBySrc = {
  source: string;
  _count: number;
}[];

export type ClicksByDate = {
  createdAt: string;
  _count: number;
}[];

export type ShortId = {
  shortId: string;
};
