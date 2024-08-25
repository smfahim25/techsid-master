import bcrypt from 'bcrypt';
import config from '../../../config/index.js';
import prisma from '../../../utils/prismaClient.js';
const SignUp = async (payload) => {
  const bcryptPassword = bcrypt.hashSync(payload.password, Number(config.SALT));

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

export const AuthService = {
  SignUp,
};
