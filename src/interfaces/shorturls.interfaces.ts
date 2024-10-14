export interface CreateShortUrlData {
  title: string;
  originalUrl: string;
}

export interface UpdateShortUrlData {
  title?: string;
  originalUrl?: string;
  shortId?: string;
}
