import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../shared/prismaClient';

const getProfile = async (user: JwtPayload) => {
  const { user: email } = user;

  return prisma.user.findUnique({
    where: {
      email,
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

export const profileService = {
  getProfile,
};
