import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(8686, () => {
  console.log('Servidor rodando na porta 8686');
});
