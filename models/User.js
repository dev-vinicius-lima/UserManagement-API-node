import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
class User {
  async newUser(email, password, name) {
    const salt = bcrypt.genSaltSync(10);
    try {
      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, salt),
          role: 0,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return this.newUser;
  }
}

export default new User();
