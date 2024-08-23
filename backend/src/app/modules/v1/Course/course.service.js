import httpStatus from 'http-status';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';
import { sendImageToCloudinary } from '../../../utils/sendImageToCloudinary.js';
const CreateCategory = async (payload) => {
  const result = await prisma.courseCategory.create({ data: payload });
  return result;
};
const CreateCourse = async (file, payload) => {
  const catgory = await prisma.courseCategory.findFirst({
    where: { id: payload.catId },
  });
  if (!catgory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Catgory not found!');
  }
  // Upload main blog image if it exists
  if (file) {
    const imageName = `${payload?.title}-main`;
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.img = secure_url;
  }
  const result = await prisma.course.create({ data: payload });
  return result;
};
const EditCourse = async (params, file, payload) => {
  const catgory = await prisma.courseCategory.findFirst({
    where: { id: payload.catId },
  });
  if (!catgory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Catgory not found!');
  }
  // Upload main blog image if it exists
  if (file) {
    const imageName = `${payload?.title}-main`;
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    payload.img = secure_url;
  }
  const result = await prisma.course.update({
    where: { id: params.id },
    data: payload,
  });
  return result;
};
const GetAllCategory = async () => {
  const result = await prisma.courseCategory.findMany();
  return result;
};
const GetAllCourses = async (query) => {
  const id = query.id;
  const result = await prisma.course.findMany({
    where: { id: id, status: 'ACTIVE' },
    include: {
      category: true,
    },
  });
  return result;
};
export const CourseService = {
  GetAllCategory,
  CreateCategory,
  CreateCourse,
  GetAllCourses,
  EditCourse,
};
