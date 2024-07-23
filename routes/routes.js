import express from 'express';
import HomeController from '../controllers/HomeController.js';
import UserController from '../controllers/UserController.js';
const router = express.Router();

router.get('/', HomeController.index);
router.post('/user', UserController.create);

export default router;
