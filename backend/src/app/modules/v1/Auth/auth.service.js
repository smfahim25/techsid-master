import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config/index.js';
import AppError from '../../../errors/AppError.js';
import prisma from '../../../utils/prismaClient.js';
import { createToken } from './auth.utils.js';
const SignUp = async (payload) => {
  if (payload.password && payload.password.trim() !== '') {
    const bcryptPassword = bcrypt.hashSync(
      payload.password,
      Number(config.SALT),
    );

    const data = {
      password: bcryptPassword,
      email: payload.email,
      name: payload.name,
    };
    const result = await prisma.user.create({ data: data });
    // eslint-disable-next-line no-unused-vars
    const { password, ...rest } = result;
    return rest;
  }

  const bcryptPassword = bcrypt.hashSync(
    config.JWT_ACCESS_SECRET,
    Number(config.SALT),
  );

  const data = {
    password: bcryptPassword,
    email: payload.email,
    name: payload.name,
  };
  const result = await prisma.user.create({ data: data });

  // eslint-disable-next-line no-unused-vars
  const { password, ...rest } = result;
  return rest;
};

const Login = async (payload) => {
  // checking if the user is exist
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (payload?.password) {
    if (!(await bcrypt.compare(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }
  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET,
    config.JWT_ACCESS_EXPIRES_IN,
  );

  return { accessToken, user };
};

export const AuthService = {
  SignUp,
  Login,
};
