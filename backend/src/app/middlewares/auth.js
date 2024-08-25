import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import prisma from '../../app/utils/prismaClient.js';
import config from '../config/index.js';
import AppError from '../errors/AppError.js';
import catchAsync from '../utils/catchAsync.js';
const auth = (requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized - token!',
      );
    }

    // checking if the given token is valid

    let decoded;

    try {
      decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized - role!',
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
