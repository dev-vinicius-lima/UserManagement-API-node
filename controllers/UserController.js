import User from '../models/User.js';
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
    const emailExists = await User.findEmail(email);
    if (emailExists) {
      res.status(400).json({ message: 'Email ja existe!' });
      return;
    }

    await User.newUser(email, password, name);
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
}
export default new UserController();
