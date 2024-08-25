import httpStatus from 'http-status';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';

const EditUser = async (params, payload) => {
  const getUser = await prisma.user.findFirst({
    where: { id: params.id },
  });
  if (!getUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const result = await prisma.user.update({
    where: { id: params.id },
    data: payload,
  });
  // eslint-disable-next-line no-unused-vars
  const { password, ...rest } = result;
  return rest;
};
const GetAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = {
  GetAllUsers,
  EditUser,
};
