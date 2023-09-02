import { Order, Prisma } from '@prisma/client';
import prisma from '../../shared/prismaClient';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = async (payload: Order) => {
  const newOrder: any = {
    userId: payload.userId,
    orderedBooks: payload.orderedBooks,
  };

  return prisma.order.create({
    data: newOrder,
  });
};

const getAllOrders = async (user: JwtPayload) => {
  const { user: email } = user;

  const condition: Prisma.OrderWhereInput = {
    user: {
      email: email,
    },
  };

  return prisma.order.findMany({
    where: condition,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });
};

const singleOrderById = async (id: string, user: JwtPayload) => {
  const { user: email } = user;

  const condition: Prisma.OrderWhereInput = {
    AND: {
      user: {
        email: email,
      },
      id,
    },
  };

  return prisma.order.findMany({
    where: condition,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });
};
export const orderService = {
  createOrder,
  getAllOrders,
  singleOrderById,
};
