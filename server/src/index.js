// server/src/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./utils/logger');

// Configurações
const config = require('./config/env');

// Inicialização da app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Conexão MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gestao-qualidade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  logger.info('Conectado ao MongoDB');
})
.catch((err) => {
  logger.error('Erro ao conectar ao MongoDB', err);
});

// Rotas
app.use('/api/auth', require('./api/routes/auth'));
app.use('/api/users', require('./api/routes/users'));
app.use('/api/documentos', require('./api/routes/documentos'));
app.use('/api/ensaios', require('./api/routes/ensaios'));
app.use('/api/nc', require('./api/routes/nc'));
app.use('/api/checklists', require('./api/routes/checklists'));
app.use('/api/fornecedores', require('./api/routes/fornecedores'));
app.use('/api/materiais', require('./api/routes/materiais'));
app.use('/api/projetos', require('./api/routes/projetos'));

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    message: 'Ocorreu um erro interno no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
