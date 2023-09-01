import { Book } from '@prisma/client';
import prisma from '../../shared/prismaClient';

const createNewBook = async (payload: Book) => {
  return prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
};

const getAllBooks = async () => {
  return prisma.book.findMany({
    include: {
      category: true,
    },
  });
};

export const bookService = {
  createNewBook,
  getAllBooks,
};
