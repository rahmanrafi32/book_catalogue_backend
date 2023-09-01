import { z } from 'zod';

export const createCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Category title is required.',
    }),
  }),
});
