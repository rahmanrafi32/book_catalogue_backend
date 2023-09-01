import prisma from '../../shared/prismaClient';
import { User } from '@prisma/client';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';

const getAllUser = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
};

const updateSingleUser = async (id: string, payload: Partial<User>) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  return prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
};

const deleteUser = async (id: string) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');

  return prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
};

export const userService = {
  getAllUser,
  getUserById,
  updateSingleUser,
  deleteUser,
};
