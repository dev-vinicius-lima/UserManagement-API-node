import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
class User {
  async findAll() {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    const idInt = parseInt(id, 10);
    try {
      const result = await prisma.user.findUnique({
        where: { id: idInt },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      if (result !== null) {
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
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
  async findEmail(email) {
    try {
      const result = await prisma.user.findUnique({ where: { email: email } });
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(id, name, email, role) {
    const user = await this.findById(id);
    if (user != undefined) {
      const editUser = {};
      if (email != undefined) {
        if (email != user.email) {
          const result = await this.findEmail(email);
          if (result == false) {
            editUser.email = email;
          } else {
            return {
              status: 400,
              message: 'Email ja existe!',
            };
          }
        }
      }
      if (name != undefined) {
        editUser.name = name;
      }
      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await prisma.user.update({
          where: { id: id },
          data: editUser,
        });
        return {
          status: 200,
          message: 'Usário atualizado com sucesso!',
        };
      } catch (error) {
        console.log(error);
      }
    } else {
      return {
        status: 404,
        message: 'Usário não encontrado!',
      };
    }
  }

  async delete(id) {
    const user = await findById(id);
    if (user != undefined) {
      try {
        await prisma.user.delete({
          where: { id: id },
        });
      } catch (error) {
        return {
          status: 400,
          message: 'Erro ao deletar o usário!',
        };
      }
    } else {
      return {
        status: 404,
        message: 'Usário não encontrado!',
      };
    }

    return {
      status: 200,
      message: 'Usário deletado com sucesso!',
    };
  }
}

export default new User();
