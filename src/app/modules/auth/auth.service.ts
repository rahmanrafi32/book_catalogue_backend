import { User } from '@prisma/client';
import prisma from '../../shared/prismaClient';
import bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../errorHandlers/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';

const signUp = async (payload: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser)
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User is already exist with this email.'
    );

  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.salt_round)
  );

  await prisma.user.create({
    data: payload,
  });

  return prisma.user.findUnique({
    where: {
      email: payload.email,
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

const signIn = async (payload: User) => {
  const { email, password } = payload;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or Password mismatched.'
    );

  const { email: user, role } = existingUser;

  const accessToken = jwtHelpers.createToken(
    { user, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const authService = {
  signUp,
  signIn,
};
