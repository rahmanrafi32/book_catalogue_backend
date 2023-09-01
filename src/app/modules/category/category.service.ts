import { Category } from '@prisma/client';
import prisma from '../../shared/prismaClient';

const createCategory = async (payload: Category) => {
  return prisma.category.create({
    data: payload,
  });
};

// const getAllCategories = async () => {
//   return prisma.category.findMany();
// };
//
// const getSingleCategory = async (id: string) => {
//   return prisma.category.findUnique({
//     where: { id },
//   });
// };
//
// const updateCategory = async (id: string, payload: Partial<Category>) => {
//   return prisma.category.update({
//     where: { id },
//     data: payload,
//   });
// };
//
// const deleteCategory = async (id: string) => {
//   return prisma.category.delete({
//     where: { id },
//   });
// };

export const categoryService = {
  createCategory,
  // getAllCategories,
  // getSingleCategory,
  // updateCategory,
  // deleteCategory,
};
