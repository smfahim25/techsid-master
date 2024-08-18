import httpStatus from 'http-status';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';
const CreateCategory = async (payload) => {
  const result = await prisma.courseCategory.create({ data: payload });
  return result;
};
const CreateCourse = async (payload) => {
  const catgory = await prisma.courseCategory.findFirst({
    where: { id: payload.catId },
  });
  if (!catgory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Catgory not found!');
  }
  const result = await prisma.course.create({ data: payload });
  return result;
};

export const CourseService = {
  CreateCategory,
  CreateCourse,
};
