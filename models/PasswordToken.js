import { PrismaClient } from '@prisma/client';
import User from './User.js';
const prisma = new PrismaClient();

class PasswordToken {
  async create(email) {}
}

export default new PasswordToken();
