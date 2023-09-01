import { Book } from '@prisma/client';
import prisma from '../../shared/prismaClient';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import calculatePagination from '../../../helper/calculatePagination';
import { IFilterOptions } from '../../../interfaces/filterOptions';
import { searchableFields } from './book.constant';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';

const createNewBook = async (payload: Book) => {
  return prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
};

const getAllBooks = async (
  paginationOptions: IPaginationOptions,
  filteringOptions: IFilterOptions
) => {
  const { limit, page, skip } = calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filteringOptions;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => {
        if (key === 'maxPrice') {
          return { price: { lt: Number(value) } };
        } else if (key === 'minPrice') {
          return { price: { gt: Number(value) } };
        } else {
          return {
            [key]: value,
          };
        }
      }),
    });
  }

  const whereConditions: any =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: Number(limit),
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBookByCategory = async (
  id: string,
  paginationOptions: IPaginationOptions
) => {
  const { limit, page, skip } = calculatePagination(paginationOptions);

  const result = await prisma.book.findMany({
    where: { categoryId: id },
    include: {
      category: true,
    },
    skip,
    take: Number(limit),
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : { title: 'desc' },
  });

  const total = await prisma.book.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBookById = async (id: string) => {
  return prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

const updateBook = async (id: string, payload: Partial<Book>) => {
  const existingBook = await prisma.book.findUnique({ where: { id } });

  if (!existingBook)
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not found.');

  return prisma.book.update({
    where: { id },
    data: payload,
    include: {
      category: true,
    },
  });
};

const deleteBook = async (id: string) => {
  const existingBook = await prisma.book.findUnique({ where: { id } });

  if (!existingBook)
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not found.');

  return prisma.book.delete({
    where: { id },
  });
};

export const bookService = {
  createNewBook,
  getAllBooks,
  getBookByCategory,
  getBookById,
  updateBook,
  deleteBook,
};
