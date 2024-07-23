import express from 'express';
import HomeController from '../controllers/HomeController.js';
const app = express();
const router = app.Router();

router.get('/', HomeController.index);

export default router;
