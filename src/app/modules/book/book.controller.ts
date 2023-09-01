import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { bookService } from './book.service';
import pick from '../../shared/pick';
import { filterAbleFields, paginationFields } from './book.constant';

const createNewBook = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookService.createNewBook(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New book added successfully.',
    data: result,
  });
});

const getAllBooks = asyncTryCatch(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filteringOptions = pick(req.query, filterAbleFields);
  const result = await bookService.getAllBooks(
    paginationOptions,
    filteringOptions
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getBookByCategory = asyncTryCatch(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const result = await bookService.getBookByCategory(
    req.params.categoryId,
    paginationOptions
  );

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getBookById = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookService.getBookById(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateBook = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookService.updateBook(req.params.id, req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await bookService.deleteBook(req.params.id);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const bookController = {
  createNewBook,
  getAllBooks,
  getBookByCategory,
  getBookById,
  updateBook,
  deleteBook,
};
