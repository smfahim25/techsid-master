import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import sendResponse from '../../../utils/sendResponse.js';
import { TutorialService } from './tutorial.service.js';

const CreateCategory = catchAsync(async (req, res) => {
  const result = await TutorialService.CreateCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created Successfully!',
    data: result,
  });
});
const GetAllCategory = catchAsync(async (req, res) => {
  const result = await TutorialService.GetAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Categories Successfully!',
    data: result,
  });
});

const CreateTutorial = catchAsync(async (req, res) => {
  const result = await TutorialService.CreateTutorial(req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial Created Successfully!',
    data: result,
  });
});
const EditTutorial = catchAsync(async (req, res) => {
  const result = await TutorialService.EditTutorial(
    req.params,
    req.file,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutorial Edited Successfully!',
    data: result,
  });
});
const GetAllTutorials = catchAsync(async (req, res) => {
  const result = await TutorialService.GetAllTutorials(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Tutorials Successfully!',
    data: result,
  });
});
export const TutorialController = {
  EditTutorial,
  CreateTutorial,
  CreateCategory,
  GetAllCategory,
  GetAllTutorials,
};
