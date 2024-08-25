import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import sendResponse from '../../../utils/sendResponse.js';
import { CourseService } from './course.service.js';

const CreateCategory = catchAsync(async (req, res) => {
  const result = await CourseService.CreateCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Category Created Successfully!',
    data: result,
  });
});
const GetAllCategory = catchAsync(async (req, res) => {
  const result = await CourseService.GetAllCategory();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Categories Successfully!',
    data: result,
  });
});

const CreateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.CreateCourse(req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created Successfully!',
    data: result,
  });
});
const EditCourse = catchAsync(async (req, res) => {
  const result = await CourseService.EditCourse(req.params, req.file, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Edited Successfully!',
    data: result,
  });
});
const GetAllCourses = catchAsync(async (req, res) => {
  const result = await CourseService.GetAllCourses(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Courses Successfully!',
    data: result,
  });
});
export const CourseController = {
  EditCourse,
  CreateCourse,
  CreateCategory,
  GetAllCategory,
  GetAllCourses,
};
