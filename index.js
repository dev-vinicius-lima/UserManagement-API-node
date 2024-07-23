import express from 'express';
import router from './routes/routes.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.listen(8686, () => {
  console.log('Servidor rodando na porta 8686');
});
