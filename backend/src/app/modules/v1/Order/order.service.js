import httpStatus from 'http-status';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';

const CreateOrder = async (payload) => {
  const getCourse = await prisma.course.findFirst({
    where: { id: payload.courseId },
  });
  const getUser = await prisma.user.findFirst({
    where: { id: payload.userId },
  });
  if (!getCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }
  if (!getUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  payload.price = getCourse.fees;
  const result = await prisma.order.create({ data: payload });
  return result;
};

const GetAllOrder = async () => {
  const result = await prisma.order.findMany({
    include: {
      course: true,
      user: true,
    },
  });
  return result;
};
const GetOrderStatus = async (params) => {
  const result = await prisma.order.findMany({
    where: {
      userId: params.id,
    },
    include: {
      course: true,
      user: true,
    },
  });
  return result;
};
const ChangeOrderStatus = async (payload) => {
  const getOrder = await prisma.order.findFirst({ where: { id: payload.id } });
  if (!getOrder) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }
  const result = await prisma.order.update({
    where: { id: getOrder.id },
    data: { status: payload.status },
  });
  return result;
};
export const OrderService = {
  GetAllOrder,
  CreateOrder,
  ChangeOrderStatus,
  GetOrderStatus,
};
