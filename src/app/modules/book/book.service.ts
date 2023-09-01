import { Book, Prisma } from '@prisma/client';
import prisma from '../../shared/prismaClient';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import calculatePagination from '../../../helper/calculatePagination';
import { IFilterOptions } from '../../../interfaces/filterOptions';
import { searchableFields } from './book.constant';

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

export const bookService = {
  createNewBook,
  getAllBooks,
  getBookByCategory,
};
