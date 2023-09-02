import asyncTryCatch from '../../shared/asyncTryCatch';
import { Request, Response } from 'express';
import { profileService } from './profile.service';
import customResponse from '../../shared/customResponse';
import httpStatus from 'http-status';

const getProfile = asyncTryCatch(async (req: Request, res: Response) => {
  const result = await profileService.getProfile(req.user);

  customResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

export const profileController = {
  getProfile,
};
