import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import sendResponse from '../../../utils/sendResponse.js';
import { AuthService } from './auth.service.js';

const SignUp = catchAsync(async (req, res) => {
  const result = await AuthService.SignUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User SignUp Successfully!',
    data: result,
  });
});

const Login = catchAsync(async (req, res) => {
  const result = await AuthService.Login(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In Successfully!',
    data: result,
  });
});

const SocialSignUpJWT = catchAsync(async (req, res) => {
  const result = await AuthService.SocialSignUpJWT(req.body);
  const { accessToken, user } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User SignUp Successfully!',
    data: { accessToken, user },
  });
});

export const AuthController = { SignUp, Login, SocialSignUpJWT };
