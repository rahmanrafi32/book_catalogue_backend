import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';
import { categoryService } from './category.service';

const createCategory = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New category created successfully.',
    data: result,
  });
});

const getAllCategories = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategories();

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully.',
    data: result,
  });
});

// const getSingleCategory = asyncTryCatch(async (req: Request, res: Response) => {
//   const result = await categoryService.getSingleCategory(req.params.id);
//
//   customResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category fetched successfully.',
//     data: result,
//   });
// });
//
// const updateCategory = asyncTryCatch(async (req: Request, res: Response) => {
//   const result = await categoryService.updateCategory(req.params.id, req.body);
//
//   customResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category updated successfully.',
//     data: result,
//   });
// });
//
// const deleteCategory = asyncTryCatch(async (req: Request, res: Response) => {
//   const result = await categoryService.deleteCategory(req.params.id);
//
//   customResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully.',
//     data: result,
//   });
// });

export const categoryController = {
  createCategory,
  getAllCategories,
  // getSingleCategory,
  // updateCategory,
  // deleteCategory,
};
