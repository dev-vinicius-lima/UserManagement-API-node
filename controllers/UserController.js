import User from '../models/User.js';
class UserController {
  async index(req, res) {}
  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios!' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'A senha deve ter pelo menos 6 caracteres!' });
      return;
    }
    await User.newUser(email, password, name);
    return res.status(201).json({ message: 'Usário criado com sucesso!' });
  }
}
export default new UserController();
