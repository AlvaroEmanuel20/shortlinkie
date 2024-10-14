import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Minimum 3 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Minimum 8 characters'),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .union([z.string().min(3, 'Minimum 3 characters'), z.string().length(0)])
      .nullish(),
    email: z
      .union([z.string().email('Invalid email'), z.string().length(0)])
      .nullish(),
    password: z
      .union([z.string().min(8, 'Minimum 8 characters'), z.string().length(0)])
      .nullish(),
  }),
});

export const resetPassSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email'),
  }),
});

export const confirmResetPassSchema = z.object({
  body: z.object({
    newPassword: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Minimum 8 characters'),
  }),
});
