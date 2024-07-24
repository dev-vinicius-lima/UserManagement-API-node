import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';
const router = express.Router();

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.showUser);
router.put('/user', UserController.edit);
router.delete('/user/:id', UserController.remove);

export default router;
