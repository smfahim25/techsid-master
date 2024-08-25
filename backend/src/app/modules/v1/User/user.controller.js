import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import sendResponse from '../../../utils/sendResponse.js';
import { UserService } from './user.service.js';

const GetAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.GetAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Users Successfully!',
    data: result,
  });
});

const EditUser = catchAsync(async (req, res) => {
  const result = await UserService.EditUser(req.params, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Edited Successfully!',
    data: result,
  });
});

export const UserController = {
  EditUser,
  GetAllUsers,
};
