import { Order } from '@prisma/client';
import prisma from '../../shared/prismaClient';

const createOrder = async (payload: Order) => {
  const newOrder: any = {
    userId: payload.userId,
    orderedBooks: payload.orderedBooks,
  };

  return prisma.order.create({
    data: newOrder,
  });
};

export const orderService = {
  createOrder,
};
