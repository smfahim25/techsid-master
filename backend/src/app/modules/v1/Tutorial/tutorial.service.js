import httpStatus from 'http-status';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';
import { sendImageToCloudinary } from '../../../utils/sendImageToCloudinary.js';
const CreateCategory = async (payload) => {
  const result = await prisma.tutorialCategory.create({ data: payload });
  return result;
};
const CreateTutorial = async (file, payload) => {
  const catgory = await prisma.tutorialCategory.findFirst({
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
  const result = await prisma.tutorial.create({ data: payload });
  return result;
};
const EditTutorial = async (params, file, payload) => {
  const catgory = await prisma.tutorialCategory.findFirst({
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
  const result = await prisma.tutorial.update({
    where: { id: params.id },
    data: payload,
  });
  return result;
};
const GetAllCategory = async () => {
  const result = await prisma.tutorialCategory.findMany();
  return result;
};
const GetAllTutorials = async (query) => {
  const id = query.id;
  const result = await prisma.tutorial.findMany({
    where: { id: id },
    include: {
      category: true,
    },
  });
  return result;
};
export const TutorialService = {
  GetAllCategory,
  CreateCategory,
  CreateTutorial,
  GetAllTutorials,
  EditTutorial,
};
