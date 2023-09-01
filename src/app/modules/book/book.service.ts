import { Book } from '@prisma/client';
import prisma from '../../shared/prismaClient';

const createNewBook = async (payload: Book) => {
  return prisma.book.create({
    data: payload,
  });
};

export const bookService = {
  createNewBook,
};
