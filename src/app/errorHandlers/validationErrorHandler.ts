import { ICommonErrorResponse } from '../../interfaces/commonErrorResponse';
import { Prisma } from '@prisma/client';

const validationErrorHandler = (
  err: Prisma.PrismaClientValidationError
): ICommonErrorResponse => {
  const errors = [
    {
      path: '',
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default validationErrorHandler;
