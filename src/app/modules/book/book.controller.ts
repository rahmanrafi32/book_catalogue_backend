import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { bookService } from './book.service';

const createNewBook = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookService.createNewBook(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New book added successfully.',
    data: result,
  });
});

export const bookController = {
  createNewBook,
};
