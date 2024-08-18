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
const CreateCourse = catchAsync(async (req, res) => {
  const result = await CourseService.CreateCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created Successfully!',
    data: result,
  });
});

export const CourseController = { CreateCourse, CreateCategory };
