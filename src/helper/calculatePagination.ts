import {
  IPaginationOptions,
  paginationReturn,
} from '../interfaces/paginationOptions';

const calculatePagination = (options: IPaginationOptions): paginationReturn => {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default calculatePagination;
