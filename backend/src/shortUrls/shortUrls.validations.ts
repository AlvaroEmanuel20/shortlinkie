import { z } from 'zod';

export const createShortUrlSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    originalUrl: z.string().url('Invalid original url'),
  }),
});

export const updateShortUrlSchema = z.object({
  body: z.object({
    title: z.union([z.string(), z.string().length(0)]).nullish(),
    originalUrl: z
      .union([z.string().url('Invalid original url'), z.string().length(0)])
      .nullish(),
    shortId: z.union([z.string(), z.string().length(0)]).nullish(),
  }),
});
