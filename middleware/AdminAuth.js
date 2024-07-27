import jwt from 'jsonwebtoken';
const secret = process.env.SECRET;

export function AdminAuth(req, res, next) {
  const authToken = req.headers['authorization'];
  if (authToken !== undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.role !== 1) {
        return res
          .status(401)
          .json({ message: 'Token inválido! você não é um administrador' });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao autenticar o usuário!' });
      return;
    }
  } else {
    res.status(400).json({ message: 'Token inválido!' });
    return;
  }
}
