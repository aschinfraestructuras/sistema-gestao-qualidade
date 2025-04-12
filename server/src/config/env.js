// server/src/config/env.js

/**
 * Configurações de ambiente para o servidor
 */
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gestao-qualidade',
  JWT_SECRET: process.env.JWT_SECRET || 'segredo_muito_secreto_para_desenvolvimento',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@sistema-qualidade.com',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
};
