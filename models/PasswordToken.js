import { PrismaClient } from '@prisma/client';
import User from './User.js';
const prisma = new PrismaClient();

class PasswordToken {
  async create(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      return { status: 404, message: 'Usário não encontrado!' };
    } else {
      try {
        const token = Date.now().toString();
        await prisma.passwordToken.create({
          data: {
            userId: user.id,
            used: 0,
            token: token,
          },
        });
        return { status: 200, token };
      } catch (error) {
        console.log(error);
        return { status: 400, message: 'Erro ao criar o token!' };
      }
    }
  }

  async validate(token) {
    try {
      const result = await prisma.passwordToken.findFirst({
        where: { token: token },
      });

      if (result.token == null) {
        return { status: false, message: 'Token não encontrado!' };
      }
      if (result.token.length > 0) {
        const tk = result;
        console.log(tk);
        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async setUsed(token) {
    try {
      await prisma.passwordToken.update({
        where: { token: token },
        data: {
          used: 1,
        },
      });
      return { status: 200, message: 'Token usado com sucesso!' };
    } catch (error) {
      console.log('ocoreu um erro :' + error);
    }
  }
}

export default new PasswordToken();
