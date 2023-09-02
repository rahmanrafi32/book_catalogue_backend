import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { orderService } from './order.service';

const createOrder = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrders = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders(req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const singleOrderById = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await orderService.singleOrderById(req.params.id, req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  singleOrderById,
};
