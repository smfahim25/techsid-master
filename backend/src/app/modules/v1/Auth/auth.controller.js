import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync.js';
import { AuthService } from './auth.service.js';

const SignUp = catchAsync(async (req, res) => {
  const result = await AuthService.SignUp(req.body);
  return res.status(httpStatus.OK).json({
    result: result,
  });
});

export const AuthController = { SignUp };
