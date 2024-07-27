import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';
import { AdminAuth } from '../middleware/AdminAuth.js';
const router = express.Router();

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.showUser);
router.put('/user', AdminAuth, UserController.edit);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

export default router;
