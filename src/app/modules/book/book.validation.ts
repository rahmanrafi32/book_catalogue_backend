import { z } from 'zod';

export const createBook = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Book title is required.',
    }),
    author: z.string({
      required_error: 'Author name is required.',
    }),
    genre: z.string({
      required_error: 'Genre is required.',
    }),
    price: z.number({
      required_error: 'Book price is required.',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required.',
    }),
    categoryId: z.string({
      required_error: 'Category id is required.',
    }),
  }),
});
