import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000,
    timeout: 10000,
  },
});
export default prisma;
