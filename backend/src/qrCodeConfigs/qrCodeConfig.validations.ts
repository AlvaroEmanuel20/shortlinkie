import { z } from 'zod';

export const updateQrCodeConfigSchema = z.object({
  body: z.object({
    color: z
      .union([z.string().min(2, 'Invalid color'), z.string().length(0)])
      .nullish(),
    size: z
      .union([
        z.number().int('Only integer number').min(128, 'Min value is 128px'),
        z.string().length(0),
      ])
      .nullish(),
    logo: z.union([z.string().url(), z.string().length(0)]).nullish(),
  }),
});
