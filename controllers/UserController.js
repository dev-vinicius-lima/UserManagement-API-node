import User from '../models/User.js';
import PasswordToken from '../models/PasswordToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;
class UserController {
  async index(req, res) {
    const users = await User.findAll();
    res.json(users);
  }

  async showUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user == undefined) {
      return res.status(404).json({ message: 'Usário não encontrado!' });
    } else {
      res.json(user);
    }
  }

  async create(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios!' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'A senha deve ter pelo menos 6 caracteres!' });
      return;
    }
    const emailExists = await User.findEmail(email);
    if (emailExists) {
      res.status(400).json({ message: 'Email ja existe!' });
      return;
    }

    await User.newUser(email, password, name, role);
    return res.status(201).json({ message: 'Usário criado com sucesso!' });
  }

  async edit(req, res) {
    const { id, name, email, role } = req.body;
    const result = await User.update(id, name, email, role);
    if (result != undefined) {
      if (result.status == 400 || result.status == 404) {
        return res.status(400).json({ message: result.message });
      } else {
        return res.status(200).json({ message: result.message });
      }
    } else {
      return res.status(404).json({ message: 'Usário não encontrado!' });
    }
  }

  async remove(req, res) {
    const { id } = req.body;
    const result = User.delete(id);
    if (result.status == 400 || result.status == 404) {
      return res.status(400).json({ message: result.message });
    } else {
      return res.status(200).json({ message: result.message });
    }
  }

  async recoverPassword(req, res) {
    const { email } = req.body;
    const result = await PasswordToken.create(email);
    if (result.status == 400 || result.status == 404) {
      return res.status(400).json({ message: result.message });
    } else {
      console.log(result.token);
      return res.status(200).json({ token: result.token });
    }
  }

  async changePassword(req, res) {
    const { token, password } = req.body;
    const isTokenValid = await PasswordToken.validate(token);
    if (isTokenValid.status) {
      await User.changePassword(
        password,
        isTokenValid.token.userId,
        isTokenValid.token.token,
      );
      res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } else {
      res.status(400).json({ message: 'Token inválido!' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Usário não encontrado!' });
      }
      const result = await bcrypt.compare(password, user.password);
      if (result === true) {
        const token = jwt.sign({ email: user.email, role: user.role }, secret, {
          expiresIn: '1d',
        });
        res.status(200).json(token);
      } else {
        res.status(400).json({ message: 'Senha inválida!' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro ao autenticar o usuário!' });
    }
  }
}
export default new UserController();
